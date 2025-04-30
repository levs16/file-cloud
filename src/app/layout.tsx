import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "PersonalCloud - Private Secure Storage",
  description: "Your personal secure file storage system with multi-language support",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1d1d1f" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="font-sans antialiased bg-white text-apple-gray-800 dark:bg-gray-900 dark:text-white">
        <NextAuthProvider>
          <ThemeProvider>
            <Toaster />
            <main className="min-h-screen flex flex-col">
              {children}
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
