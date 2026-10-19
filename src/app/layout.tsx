import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata: Metadata = {
  title: "Care4Elder - Elder Assistant, GPS & Health Companion",
  description: "Smart companion for elderly care, safety, GPS tracking, health reminders, and SOS emergency assistance.",
  openGraph: {
    title: "Care4Elder - Elder Assistant App",
    description: "Smart companion for elderly care, safety & well-being.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main className="flex-1 pb-24 md:pb-28">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
