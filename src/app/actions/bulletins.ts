'use server';

import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

export interface Bulletin {
    id?: string;
    title: string;
    publishDate: string;
    status: '已保存' | '已下載';
    createdAt?: string | null;
    updatedAt?: string | null;
    templateUrl?: string;
    pdfUrl?: string;
    pdfName?: string;
    pdfBase64?: string;
    fullPdfUrl?: string;
    fullPdfName?: string;
    fullPdfBase64?: string;
    contentData?: Record<string, string>;
    lastOperator?: string;
    views?: number;
    hasPdf?: boolean;
    hasFullPdf?: boolean;
}

export async function getBulletins(): Promise<Bulletin[]> {
    try {
        const snapshot = await db.collection('Bulletins')
            .select('title', 'publishDate', 'status', 'createdAt', 'updatedAt', 'pdfUrl', 'pdfName', 'fullPdfUrl', 'fullPdfName', 'lastOperator', 'views', 'hasPdf', 'hasFullPdf')
            .orderBy('publishDate', 'desc')
            .limit(100)
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            const hasPdf = !!data.pdfUrl || data.status === '已下載' || !!data.hasPdf;
            const hasFullPdf = !!data.fullPdfUrl || !!data.fullPdfName || !!data.hasFullPdf;
            return {
                id: doc.id,
                title: data.title,
                publishDate: data.publishDate,
                status: data.status,
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null,
                updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : 
                           (data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null),
                pdfUrl: data.pdfUrl || undefined,
                pdfName: data.pdfName || undefined,
                fullPdfUrl: data.fullPdfUrl || undefined,
                fullPdfName: data.fullPdfName || undefined,
                lastOperator: data.lastOperator || undefined,
                views: data.views || undefined,
                hasPdf: hasPdf,
                hasFullPdf: hasFullPdf,
            } as Bulletin;
        });
    } catch (error) {
        console.error('Failed to fetch Bulletins:', error);
        return [];
    }
}

export async function getBulletinById(id: string): Promise<Bulletin | null> {
    try {
        const doc = await db.collection('Bulletins').doc(id).get();
        if (!doc.exists) return null;

        const data = doc.data();
        
        // 尝试从 BulletinsPdfs 中并发读取 Base64 挂载，旧版直接返回
        const [pdfDoc, fullPdfDoc] = await Promise.all([
            db.collection('BulletinsPdfs').doc(`${id}-lite`).get(),
            db.collection('BulletinsPdfs').doc(`${id}-full`).get()
        ]);

        const pdfBase64 = pdfDoc.exists ? pdfDoc.data()?.pdfBase64 : data?.pdfBase64;
        const fullPdfBase64 = fullPdfDoc.exists ? fullPdfDoc.data()?.fullPdfBase64 : data?.fullPdfBase64;

        return {
            ...data,
            id: doc.id,
            pdfBase64: pdfBase64 || undefined,
            fullPdfBase64: fullPdfBase64 || undefined,
            createdAt: data?.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null,
            updatedAt: data?.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : 
                       (data?.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null)
        } as Bulletin;
    } catch (error) {
        console.error(`Failed to fetch bulletin ${id}:`, error);
        return null;
    }
}

export async function createBulletin(data: Omit<Bulletin, 'id' | 'createdAt'>, operator?: { name: string, email: string }): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
        const cleanedData = { ...data };
        
        // 如果创建时意外带有 Base64 (通常没有)，暂存出来
        const pdfBase64 = cleanedData.pdfBase64;
        const fullPdfBase64 = cleanedData.fullPdfBase64;
        delete cleanedData.pdfBase64;
        delete cleanedData.fullPdfBase64;

        const newbulletin = {
            ...cleanedData,
            hasPdf: !!pdfBase64 || !!cleanedData.pdfUrl,
            hasFullPdf: !!fullPdfBase64 || !!cleanedData.fullPdfUrl,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
            lastOperator: operator?.name || '未知',
        };
        const docRef = await db.collection('Bulletins').add(newbulletin);
        const id = docRef.id;

        // 异步写入 Base64 大字段到子集合中，确保不阻塞且有独立的1MB限制
        const pdfPromises = [];
        if (pdfBase64) {
            pdfPromises.push(
                db.collection('BulletinsPdfs').doc(`${id}-lite`).set({
                    pdfBase64,
                    updatedAt: FieldValue.serverTimestamp()
                })
            );
        }
        if (fullPdfBase64) {
            pdfPromises.push(
                db.collection('BulletinsPdfs').doc(`${id}-full`).set({
                    fullPdfBase64,
                    updatedAt: FieldValue.serverTimestamp()
                })
            );
        }
        if (pdfPromises.length > 0) {
            await Promise.all(pdfPromises);
        }

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '发布周报',
                details: `发布了周报: ${data.title}`
            });
        }

        revalidatePath('/admin/bulletins');
        revalidatePath('/');
        revalidatePath('/api/bulletin/latest');
        return { success: true, id };
    } catch (error) {
        console.error('Failed to create bulletin:', error);
        return { success: false, error: 'Failed to create bulletin' };
    }
}

export async function updateBulletin(id: string, data: Partial<Omit<Bulletin, 'id' | 'createdAt'>>, operator?: { name: string, email: string }): Promise<{ success: boolean; error?: string }> {
    try {
        const cleanedData = { ...data };
        
        // 剥离 PDF base64 大数据字段，并分别持久化到并行集合 BulletinsPdfs
        const pdfPromises = [];
        
        if ('pdfBase64' in cleanedData) {
            const pdfBase64 = cleanedData.pdfBase64;
            delete cleanedData.pdfBase64;
            
            if (pdfBase64) {
                pdfPromises.push(
                    db.collection('BulletinsPdfs').doc(`${id}-lite`).set({
                        pdfBase64,
                        updatedAt: FieldValue.serverTimestamp()
                    })
                );
                cleanedData.hasPdf = true;
            } else {
                pdfPromises.push(
                    db.collection('BulletinsPdfs').doc(`${id}-lite`).delete().catch(() => {})
                );
                cleanedData.hasPdf = false;
            }
        }
        
        if ('fullPdfBase64' in cleanedData) {
            const fullPdfBase64 = cleanedData.fullPdfBase64;
            delete cleanedData.fullPdfBase64;
            
            if (fullPdfBase64) {
                pdfPromises.push(
                    db.collection('BulletinsPdfs').doc(`${id}-full`).set({
                        fullPdfBase64,
                        updatedAt: FieldValue.serverTimestamp()
                    })
                );
                cleanedData.hasFullPdf = true;
            } else {
                pdfPromises.push(
                    db.collection('BulletinsPdfs').doc(`${id}-full`).delete().catch(() => {})
                );
                cleanedData.hasFullPdf = false;
            }
        }

        if (pdfPromises.length > 0) {
            await Promise.all(pdfPromises);
        }

        await db.collection('Bulletins').doc(id).update({
            ...cleanedData,
            updatedAt: FieldValue.serverTimestamp(),
            lastOperator: operator?.name || '未知',
        });

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            let action = '更新周报';
            if (data.status === '已下載') action = '发布/更新周报';
            if (data.status === '已保存') action = '存为草稿周报';

            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action,
                details: `更新了周报: ${id}`
            });
        }

        revalidatePath('/admin/bulletins');
        revalidatePath('/');
        revalidatePath('/api/bulletin/latest');
        return { success: true };
    } catch (error) {
        console.error('Failed to update bulletin:', error);
        return { success: false, error: 'Failed to update bulletin' };
    }
}

export async function deleteBulletin(id: string, operator?: { name: string, email: string }): Promise<{ success: boolean; error?: string }> {
    try {
        const doc = await db.collection('Bulletins').doc(id).get();
        const bulletinData = doc.data();
        const bulletinTitle = bulletinData?.title || '未知标题';

        // 级联删除主文档及对应的精简版、完整版 PDF 并行文档
        await Promise.all([
            db.collection('Bulletins').doc(id).delete(),
            db.collection('BulletinsPdfs').doc(`${id}-lite`).delete().catch(() => {}),
            db.collection('BulletinsPdfs').doc(`${id}-full`).delete().catch(() => {})
        ]);

        if (operator) {
            const { createAdminLog } = await import('@/app/actions/log');
            await createAdminLog({
                adminName: operator.name,
                adminEmail: operator.email,
                action: '删除周报',
                details: `删除了周报: ${bulletinTitle} (${id})`
            });
        }

        revalidatePath('/admin/bulletins');
        revalidatePath('/');
        revalidatePath('/api/bulletin/latest');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete bulletin:', error);
        return { success: false, error: 'Failed to delete bulletin' };
    }
}

export async function getLatestBulletinWithPdf(): Promise<Bulletin | null> {
    try {
        // Step 1: Fetch only metadata for the latest 50 bulletins to avoid loading massive PDF base64 payloads
        const snapshot = await db.collection('Bulletins')
            .select('publishDate', 'pdfUrl', 'status', 'hasPdf')
            .orderBy('publishDate', 'desc')
            .limit(50)
            .get();

        // Step 2: Find the latest one that has a PDF
        const latestMetaDoc = snapshot.docs.find(doc => {
            const data = doc.data();
            return !!data.pdfUrl || data.status === '已下載' || !!data.hasPdf;
        });

        if (!latestMetaDoc) return null;

        // Step 3: Fetch the FULL document metadata only for this specific bulletin
        const fullDoc = await db.collection('Bulletins').doc(latestMetaDoc.id).get();
        if (!fullDoc.exists) return null;

        const data = fullDoc.data()!;
        
        // 从并行集合读取 Lite PDF Base64，兜底从主文档读取以保证向下兼容旧数据
        const pdfDoc = await db.collection('BulletinsPdfs').doc(`${latestMetaDoc.id}-lite`).get();
        const pdfBase64 = pdfDoc.exists ? pdfDoc.data()?.pdfBase64 : data.pdfBase64;

        return {
            ...data,
            id: fullDoc.id,
            pdfBase64: pdfBase64 || undefined,
            createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Bulletin;
    } catch (error) {
        console.error('Failed to fetch latest PDF bulletin:', error);
        return null;
    }
}

export async function getHistoricalBulletins(limitCount: number = 10, lastId?: string): Promise<{ bulletins: Bulletin[], hasMore: boolean }> {
    try {
        let bulletins: Bulletin[] = [];
        let currentLastId = lastId;
        let hasMore = true;
        const internalLimit = 100;

        // Fetch metadata only to maximize performance and minimize bandwidth/memory consumption
        let query = db.collection('Bulletins')
            .select('title', 'publishDate', 'status', 'createdAt', 'updatedAt', 'pdfUrl', 'pdfName', 'hasPdf')
            .orderBy('publishDate', 'desc')
            .limit(internalLimit);

        if (currentLastId) {
            const lastDoc = await db.collection('Bulletins').doc(currentLastId).get();
            if (lastDoc.exists) {
                query = db.collection('Bulletins')
                    .select('title', 'publishDate', 'status', 'createdAt', 'updatedAt', 'pdfUrl', 'pdfName', 'hasPdf')
                    .orderBy('publishDate', 'desc')
                    .startAfter(lastDoc)
                    .limit(internalLimit);
            }
        }

        const snapshot = await query.get();
        const allDocs = snapshot.docs;
        
        const filtered = allDocs
            .map(doc => {
                const data = doc.data();
                const hasPdf = !!data.pdfUrl || data.status === '已下載' || !!data.hasPdf;
                return {
                    id: doc.id,
                    title: data.title,
                    publishDate: data.publishDate,
                    status: data.status,
                    createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : null,
                    updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : null,
                    pdfUrl: data.pdfUrl || undefined,
                    pdfName: data.pdfName || undefined,
                    hasPdf: hasPdf,
                } as Bulletin;
            })
            .filter(b => b.hasPdf);

        bulletins = filtered.slice(0, limitCount);
        hasMore = allDocs.length === internalLimit;

        return { bulletins, hasMore };
    } catch (error) {
        console.error('Failed to fetch historical bulletins:', error);
        return { bulletins: [], hasMore: false };
    }
}

export async function getBulletinPdf(id: string, type: 'lite' | 'full' = 'lite'): Promise<string | null> {
    try {
        // 优先从并行子集合获取，拥有完整的1MB限制，免受主文档大小牵连
        const pdfDoc = await db.collection('BulletinsPdfs').doc(`${id}-${type}`).get();
        if (pdfDoc.exists) {
            const pdfData = pdfDoc.data();
            return type === 'full' ? (pdfData?.fullPdfBase64 || null) : (pdfData?.pdfBase64 || null);
        }
        
        // 兜底：如果未迁移，直接从主文档读取（支持向下兼容旧数据）
        const doc = await db.collection('Bulletins').doc(id).get();
        if (!doc.exists) return null;
        const data = doc.data();
        return type === 'full' ? (data?.fullPdfBase64 || null) : (data?.pdfBase64 || null);
    } catch (error) {
        console.error(`Failed to fetch ${type} PDF for bulletin ${id}:`, error);
        return null;
    }
}
