import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";

import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import NextAuthSessionProvider from "@/components/session-provider";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProvider from "@/components/progressbar-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "WHX URL Shortener",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "antialiased bg-background px-4 md:px-10",
                    inter.className
                )}
            >
                <NextAuthSessionProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header />
                        {children}
                        {/* <Footer /> */}
                        <Toaster />
                        <ProgressBarProvider />
                    </ThemeProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
