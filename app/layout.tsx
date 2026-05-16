import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
const geist = Geist({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Peblo AI Workspace",
  description: "AI-powered collaborative notes workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider>
  {children}
  <Toaster richColors position="top-right" />
</ThemeProvider>
      </body>
    </html>
  );
}