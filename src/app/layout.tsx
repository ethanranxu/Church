import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthProvider";
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

export const metadata: Metadata = {
  title: "長堤基督教會 - Homepage",
  description: "在奧克蘭北岸建立屬神的家",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${inter.variable} ${notoIsTC.variable} antialiased bg-[#f6f7f8] text-[#0d141b] dark:bg-[#101922] dark:text-white transition-colors duration-200`}
      >
        <AuthProvider>
          <UserTracker />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
