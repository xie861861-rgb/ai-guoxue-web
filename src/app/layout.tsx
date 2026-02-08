import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 国学智慧平台",
  description: "为企业家打造的精神道场",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
