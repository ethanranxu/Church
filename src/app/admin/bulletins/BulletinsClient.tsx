"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Calendar, ChevronLeft, Save, Loader2, ArrowUpRight, Edit3, Trash2, Download } from "lucide-react";
import clsx from "clsx";
import { Bulletin, createBulletin, updateBulletin, deleteBulletin } from "@/app/actions/bulletins";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTranslation } from "@/i18n/LanguageContext";
import { generateDocx } from "@/utils/docxUtils";

interface BulletinsClientProps {
    initialBulletins: Bulletin[];
}

const DEFAULT_CONTENT_DATA = {
    周报时间: "",
    會前禱告: "",
    敬拜讚美: "",
    兒主祝禱: "",
    讀經1: "",
    讀經2: "",
    信息1: "",
    信息2: "",
    司獻: "",
    家訊: "",
    祝禱: "",
    殿樂1: "",
    殿樂2: "",
    神与你同在标题: "神與你同在",
    神与你同在内容: "",
    家事報告内容: "",
    靈修短文内容: "",
    奉獻資訊内容: "",
    讀經時間範圍: "",
    上週各堂聚會: "",
    日期1: "", 進度1: "", 主題1: "",
    日期2: "", 進度2: "", 主題2: "",
    日期3: "", 進度3: "", 主題3: "",
    日期4: "", 進度4: "", 主題4: "",
    日期5: "", 進度5: "", 主題5: "",
    日期6: "", 進度6: "", 主題6: ""
};

export default function BulletinsClient({ initialBulletins }: BulletinsClientProps) {
    const [view, setView] = useState<"list" | "create" | "edit">("list");
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<("draft" | "published")[]>(["draft", "published"]);
    const [smartParseText, setSmartParseText] = useState("");
    
    const router = useRouter();
    const { profile } = useAuth();
    const { t } = useTranslation();

    const [title, setTitle] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [editId, setEditId] = useState<string | null>(null);
    const [contentData, setContentData] = useState<Record<string, string>>(DEFAULT_CONTENT_DATA);
    
    const [activeTab, setActiveTab] = useState<"basic" | "worship" | "reading">("basic");

    const filteredBulletins = initialBulletins.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            selectedStatus.includes(item.status)
    );

    const handleCreate = () => {
        setTitle("");
        setPublishDate(new Date().toISOString().split('T')[0]);
        setStatus("draft");
        setEditId(null);
        setContentData(DEFAULT_CONTENT_DATA);
        setView("create");
        setActiveTab("basic");
    };

    const handleEdit = (item: Bulletin) => {
        setTitle(item.title);
        setPublishDate(item.publishDate);
        setStatus(item.status);
        setEditId(item.id || null);
        setContentData({ ...DEFAULT_CONTENT_DATA, ...(item.contentData || {}) });
        setView("edit");
        setActiveTab("basic");
    };

    const handleSave = async (saveStatus: 'draft' | 'published' = 'published') => {
        if (!title) {
            alert("請輸入標題");
            return;
        }

        setIsLoading(true);
        try {
            const dataToSave = {
                title,
                publishDate,
                status: saveStatus,
                contentData
            };

            const operator = profile ? { name: profile.name, email: profile.email } : undefined;

            if (view === "edit" && editId) {
                await updateBulletin(editId, dataToSave, operator);
            } else {
                await createBulletin(dataToSave, operator);
            }
            router.refresh();
            setView("list");
        } catch (error) {
            alert("保存失敗");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, itemTitle: string) => {
        if (confirm(`確定要刪除周報 ${itemTitle} 嗎？`)) {
            try {
                const operator = profile ? { name: profile.name, email: profile.email } : undefined;
                await deleteBulletin(id, operator);
                router.refresh();
            } catch (error) {
                alert("刪除失敗");
            }
        }
    };

    const handleGenerateDocx = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/templates/bulletin-template.docx');
            if (!response.ok) throw new Error("無法加載模板");
            const arrayBuffer = await response.arrayBuffer();
            
            await generateDocx(arrayBuffer, contentData, `${title || '周報'}.docx`);
        } catch (error) {
            alert("生成周報失敗，請確保模板存在。");
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const updateContent = (key: string, value: string) => {
        setContentData(prev => ({ ...prev, [key]: value }));
    };

    const handleSmartParse = () => {
        if (!smartParseText.trim()) return;

        const lines = smartParseText.split('\n').filter(line => line.trim());
        const newData = { ...contentData };

        lines.slice(0, 6).forEach((line, index) => {
            const i = index + 1;
            const parts = line.trim().split(/\s+/);
            
            if (parts.length >= 3) {
                // Try to match "Date Progress Title" pattern
                // We assume Date is 2 parts (e.g. 星期一 4/20), Progress is 2 parts (e.g. 創世記 1章), and rest is Title
                // But it might vary, so let's try a few common patterns or just use heuristics.
                
                // If it matches "Day Date Progress1 Progress2 Title..."
                // Example: "星期一 4/20 創世記 1章 創造天地" -> parts: ["星期一", "4/20", "創世記", "1章", "創造天地"]
                if (parts.length >= 5) {
                    newData[`日期${i}`] = `${parts[0]} ${parts[1]}`;
                    newData[`進度${i}`] = `${parts[2]} ${parts[3]}`;
                    newData[`主題${i}`] = parts.slice(4).join(" ");
                } else {
                    // Fallback for 3 or 4 parts
                    newData[`日期${i}`] = parts[0] || "";
                    newData[`進度${i}`] = parts[1] || "";
                    newData[`主題${i}`] = parts.slice(2).join(" ") || "";
                }
            }
        });

        setContentData(newData);
    };

    if (view === "create" || view === "edit") {
        return (
            <div className="space-y-6 max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setView("list")}
                            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {view === "create" ? "發佈新周報" : "編輯周報"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleGenerateDocx}
                            disabled={isGenerating}
                            className="flex items-center rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm transition-all hover:bg-indigo-100 disabled:opacity-70"
                        >
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                            生成下載 DOCX
                        </button>
                        <button
                            onClick={() => handleSave('draft')}
                            disabled={isLoading}
                            className="hidden sm:flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 disabled:opacity-70"
                        >
                            保存草稿
                        </button>
                        <button
                            onClick={() => handleSave('published')}
                            disabled={isLoading}
                            className="flex items-center rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            保存並發佈
                        </button>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
                    <div className="flex border-b border-gray-100 bg-gray-50/50 px-6 overflow-x-auto">
                        <button onClick={() => setActiveTab("basic")} className={clsx("px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap", activeTab === "basic" ? "border-emerald-500 text-emerald-600 bg-white" : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100/50")}>📝 基本與文章</button>
                        <button onClick={() => setActiveTab("worship")} className={clsx("px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap", activeTab === "worship" ? "border-emerald-500 text-emerald-600 bg-white" : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100/50")}>⛪ 主日服事表</button>
                        <button onClick={() => setActiveTab("reading")} className={clsx("px-6 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap", activeTab === "reading" ? "border-emerald-500 text-emerald-600 bg-white" : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100/50")}>📖 讀經進度</button>
                    </div>

                    <div className="p-6">
                        {activeTab === "basic" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            周報標題
                                        </label>
                                        <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-3 px-4 text-sm transition-all outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            出版日期
                                        </label>
                                        <input type="date" className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-3 px-4 text-sm transition-all outline-none" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            周報時間和期數 (如: 2026年4月26日 第1200期)
                                        </label>
                                        <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-3 px-4 text-sm transition-all outline-none" value={contentData['周报时间']} onChange={(e) => updateContent('周报时间', e.target.value)} />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            上週各堂聚會時間範圍
                                        </label>
                                        <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-3 px-4 text-sm transition-all outline-none" value={contentData['上週各堂聚會']} onChange={(e) => updateContent('上週各堂聚會', e.target.value)} />
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            神與你同在標題
                                        </label>
                                        <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-3 px-4 text-sm transition-all outline-none" value={contentData['神与你同在标题']} onChange={(e) => updateContent('神与你同在标题', e.target.value)} />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            神與你同在內容
                                        </label>
                                        <textarea rows={3} className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-3 px-4 text-sm transition-all outline-none" value={contentData['神与你同在内容']} onChange={(e) => updateContent('神与你同在内容', e.target.value)} />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            家事報告內容
                                        </label>
                                        <textarea rows={24} className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-4 px-4 text-sm transition-all outline-none leading-relaxed" value={contentData['家事報告内容']} onChange={(e) => updateContent('家事報告内容', e.target.value)} />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            靈修短文內容
                                        </label>
                                        <textarea rows={24} className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-4 px-4 text-sm transition-all outline-none leading-relaxed" value={contentData['靈修短文内容']} onChange={(e) => updateContent('靈修短文内容', e.target.value)} />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            奉獻資訊內容
                                        </label>
                                        <textarea rows={24} className="w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 focus:bg-white py-4 px-4 text-sm transition-all outline-none leading-relaxed" value={contentData['奉獻資訊内容']} onChange={(e) => updateContent('奉獻資訊内容', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "worship" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {['會前禱告', '敬拜讚美', '兒主祝禱', '讀經1', '讀經2', '信息1', '信息2', '司獻', '家訊', '祝禱', '殿樂1', '殿樂2'].map(field => (
                                    <div key={field} className="space-y-2">
                                        <label className="flex items-center text-sm font-semibold text-emerald-800">
                                            <Edit3 className="mr-2 h-4 w-4" />
                                            {field}
                                        </label>
                                        <input type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 text-sm" value={contentData[field]} onChange={(e) => updateContent(field, e.target.value)} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "reading" && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-semibold text-emerald-800">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        讀經進度表時間範圍（如：2026年4月20日-25日）
                                    </label>
                                    <input type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2.5 px-3 text-sm max-w-md" value={contentData['讀經時間範圍']} onChange={(e) => updateContent('讀經時間範圍', e.target.value)} />
                                </div>

                                <div className="space-y-4 border-b border-gray-100 pb-6">
                                    <div className="flex items-center gap-4">
                                        <h3 className="flex items-center text-sm font-semibold text-emerald-800">
                                            <ArrowUpRight className="mr-2 h-4 w-4 text-emerald-600" />
                                            讀經進度表智能解析
                                        </h3>
                                        <button 
                                            onClick={handleSmartParse}
                                            className="flex items-center rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 transition"
                                        >
                                            <ArrowUpRight className="mr-2 h-4 w-4" />
                                            一鍵智能解析
                                        </button>
                                    </div>
                                    <textarea 
                                        rows={6} 
                                        placeholder="在此粘貼讀經內容，例如：
星期一 4/20 創世記 1章 創造天地
星期二 4/21 創世記 2章 伊甸園" 
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2.5 px-3 text-sm"
                                        value={smartParseText}
                                        onChange={(e) => setSmartParseText(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                                            <div className="flex-1 space-y-1">
                                                <label className="block text-xs font-semibold text-emerald-700">日期 {i}</label>
                                                <input type="text" placeholder={`如: 星期一 4/27`} className="w-full rounded border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-1.5 px-2 text-sm" value={contentData[`日期${i}`]} onChange={(e) => updateContent(`日期${i}`, e.target.value)} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <label className="block text-xs font-semibold text-emerald-700">進度 {i}</label>
                                                <input type="text" placeholder={`如: 創世記 1章`} className="w-full rounded border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-1.5 px-2 text-sm" value={contentData[`進度${i}`]} onChange={(e) => updateContent(`進度${i}`, e.target.value)} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <label className="block text-xs font-semibold text-emerald-700">主題 {i}</label>
                                                <input type="text" placeholder={`如: 創造天地`} className="w-full rounded border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-1.5 px-2 text-sm" value={contentData[`主題${i}`]} onChange={(e) => updateContent(`主題${i}`, e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">教會周報管理</h1>
                    <p className="text-sm text-gray-500">透過填寫表單自動合成周報Word文件</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    發佈新周報
                </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索周報..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">出版日期</th>
                                <th className="px-6 py-4 font-medium">標題</th>
                                <th className="px-6 py-4 font-medium">狀態</th>
                                <th className="px-6 py-4 font-medium text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {filteredBulletins.map((item) => (
                                <tr key={item.id} className="group transition-colors hover:bg-gray-50/50">
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {item.publishDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            onClick={() => handleEdit(item)}
                                            className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors cursor-pointer"
                                        >
                                            {item.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", item.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>
                                            {item.status === "published" ? "已發佈" : "草稿"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button onClick={() => handleEdit(item)} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => item.id && handleDelete(item.id, item.title)} className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredBulletins.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500">
                                        暫無周報記錄
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
