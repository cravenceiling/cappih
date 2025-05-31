import "./globals.css";

import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Geist_Mono } from 'next/font/google'

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Cappih",
  description: "Administra tus finanzas de manera sencilla.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geistMono.className}>
      <body className="bg-white">
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}

