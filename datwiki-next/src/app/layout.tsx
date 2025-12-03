import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatModal from "@/components/AIChatModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DatWiki - Kiến Thức Hiện Đại",
  description: "Nền tảng chia sẻ kiến thức công nghệ hiện đại",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans bg-slate-50 text-slate-800 antialiased`}>
        <Navbar />
        {children}
        <AIChatModal />
        <Footer />
      </body>
    </html>
  );
}
