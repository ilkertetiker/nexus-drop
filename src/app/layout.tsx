import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NEXUS DROP // Video Game News & Release Calendar",
  description: "Your ultimate desktop portal for breaking video game news, upcoming game drops, and major patch updates.",
  keywords: ["video games", "gaming news", "game releases", "game drops", "patch notes", "calendar"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-violet-500 selection:text-white antialiased">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
