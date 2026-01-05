import type { Metadata } from "next";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import BodyAttribute from "./components/BodyAttribute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { siteConfig } from "@/config/site";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: ['news', 'Kashmir', 'India', 'world', 'journalism', 'stories', 'politics', 'current affairs'],
  authors: [{ name: 'The Ground Narrative' }],
  creator: 'The Ground Narrative',
  publisher: 'The Ground Narrative',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: siteConfig.titleTemplate,
    },
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: siteConfig.name,
      template: siteConfig.titleTemplate,
    },
    description: siteConfig.description,
    images: ['/og-image.svg'],
    creator: '@GroundNarrative',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  category: 'news',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={`${merriweather.variable} ${merriweatherSans.variable} antialiased`}>
          <BodyAttribute />
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
