import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "The Ground Narrative - Stories That See Beyond Headlines",
    template: "%s | The Ground Narrative",
  },
  description: "Independent news reporting with depth and context. Stories That See Beyond Headlines.",
  openGraph: {
    title: "The Ground Narrative",
    description: "Stories That See Beyond Headlines",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'The Ground Narrative',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Ground Narrative',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ground Narrative',
    description: 'Stories That See Beyond Headlines',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />   {/* global header */}
          {children}
          {/* Footer appears on ALL pages */}
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
