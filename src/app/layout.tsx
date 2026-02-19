import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LanguageProvider } from "@/i18n";
import { UserTracker } from "@/components/analytics/UserTracker";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoIsTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_NAME = "長堤基督教會 East Coast Bays Christian Church";
const SITE_DESCRIPTION =
  "長堤基督教會（East Coast Bays Christian Church）位於新西蘭奧克蘭北岸，下設木槿灣教會、長灣教會。歡迎您來認識我們，一同敬拜、靈修、禱告，在主愛中成長。";

export const metadata: Metadata = {
  metadataBase: new URL("https://efcecb.org.nz"),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "長堤基督教會",
    "长堤教会",
    "East Coast Bays Christian Church",
    "木槿灣基督教會",
    "木槿湾教会",
    "Hibiscus Coast Christian Church",
    "長灣基督教會",
    "長灣教會",
    "长湾教会",
    "Long Bay Christian Church",
    "奧克蘭北岸教會",
    "奥克兰华人教会",
    "Auckland Chinese Church",
    "North Shore Church",
    "新西蘭華人教會",
    "新西兰华人基督教会",
    "靈修",
    "主日崇拜",
    "團契",
  ],
  authors: [{ name: "長堤基督教會" }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: "zh_CN",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "https://efcecb.org.nz",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://efcecb.org.nz",
  },
};

// JSON-LD 結構化數據 — 教會 (Church)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "長堤基督教會 East Coast Bays Christian Church",
  alternateName: ["长堤教会", "EFCECB", "East Coast Bays Christian Church"],
  description: SITE_DESCRIPTION,
  url: "https://efcecb.org.nz",
  email: "efcecbnz@gmail.com",
  telephone: "+64-22-476-9930",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Auckland",
    addressRegion: "Auckland",
    addressCountry: "NZ",
  },
  sameAs: [
    "https://www.facebook.com/efcecb/",
    "https://www.instagram.com/efcecbnz/",
  ],
  subOrganization: [
    {
      "@type": "Church",
      name: "木槿灣基督教會 Hibiscus Coast Christian Church",
      alternateName: ["木槿湾教会"],
      url: "https://efcecb.org.nz/hibiscus-coast",
    },
    {
      "@type": "Church",
      name: "長灣基督教會 Long Bay Christian Church",
      alternateName: ["長灣教會", "长湾教会"],
      url: "https://efcecb.org.nz/long-bay",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="light" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8FTSFRGBY1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-8FTSFRGBY1');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${notoIsTC.variable} antialiased bg-[#f6f7f8] text-[#0d141b] dark:bg-[#101922] dark:text-white transition-colors duration-200`}
      >
        <AuthProvider>
          <LanguageProvider>
            <UserTracker />
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
