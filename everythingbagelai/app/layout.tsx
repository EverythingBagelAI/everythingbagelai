import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/shell";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "EverythingBagelAI",
  description: "A comprehensive directory of AI applications and automation workflows with specialized chat interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetBrainsMono.className} ${jetBrainsMono.variable} min-h-screen bg-background antialiased`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
