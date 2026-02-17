import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slingshot - Agentic Research for Indian Markets",
  description:
    "AI-powered deep research, macro analysis, and portfolio management for the Indian stock market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Desktop sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Mobile header */}
              <Header />

              {/* Page content */}
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
