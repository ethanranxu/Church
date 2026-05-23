import { getLatestBulletinWithPdf } from "@/app/actions/bulletins";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const bulletin = await getLatestBulletinWithPdf();
        
        if (!bulletin) {
            return new NextResponse("No bulletin found", { status: 404 });
        }

        if (bulletin.pdfBase64) {
            // Convert base64 back to buffer
            const buffer = Buffer.from(bulletin.pdfBase64, 'base64');
            return new NextResponse(buffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `inline; filename="${encodeURIComponent(bulletin.pdfName || 'bulletin.pdf')}"`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
        } else if (bulletin.pdfUrl) {
            // Redirect to external URL with no-cache headers to prevent redirect caching
            return new NextResponse(null, {
                status: 307,
                headers: {
                    'Location': bulletin.pdfUrl,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            });
        }

        return new NextResponse("No PDF available", { status: 404 });
    } catch (error) {
        console.error("Error serving latest bulletin:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
