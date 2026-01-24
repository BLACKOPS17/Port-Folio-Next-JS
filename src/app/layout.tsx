import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { cn } from "@/lib/utils";
import GridBackground from "@/components/GridBackground";
import { AOSProvider } from "@/components/AOSProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Python Full-Stack Developer | Premium Portfolio",
  description: "High-end portfolio of a Python Full-Stack Developer specializing in clean architecture and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased selection:bg-zinc-800 selection:text-white overflow-x-hidden",
          inter.variable,
          outfit.variable
        )}
        suppressHydrationWarning
      >
        <GridBackground />
        <AOSProvider>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </AOSProvider>
      </body>
    </html>
  );
}
