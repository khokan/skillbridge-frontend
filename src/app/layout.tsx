import "./globals.css";
import type { Metadata } from "next";

// app/layout.tsx
export const dynamic = "force-dynamic";

import { Footer } from "@/components/shared/footer";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
  title: "SkillBridge — Connect with Expert Tutors",
  description: "Browse tutors, book sessions instantly, and learn anything.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-170px)]">{children}</main>
        <Footer />
        <Toaster richColors  position="top-right"/>
      </body>
    </html>
  );
}
