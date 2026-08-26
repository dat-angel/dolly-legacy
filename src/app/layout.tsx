import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Libre_Baskerville,
  Source_Sans_3,
  Sacramento,
  Special_Elite,
} from "next/font/google";
import { DollyChatRoot } from "@/components/dolly-chat/DollyChatRoot";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { absoluteUrl, getSiteUrl, SITE } from "@/lib/site";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
});

const sacramento = Sacramento({
  variable: "--font-script-accent",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const typewriter = Special_Elite({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.creator, url: SITE.repository }],
  creator: SITE.creator,
  publisher: SITE.name,
  category: "entertainment",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: absoluteUrl("/"),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.shortDescription,
  },
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "apple-mobile-web-app-title": SITE.name,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: SITE.themeColor,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  alternateName: SITE.title,
  url: absoluteUrl("/"),
  description: SITE.description,
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: absoluteUrl("/"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${sourceSans.variable} ${sacramento.variable} ${typewriter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip font-sans text-burgundy-deep">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <DollyChatRoot>
          <JsonLd data={websiteJsonLd} />
          <SiteHeader />
          <main id="main-content" className="flex-1 pb-24">
            {children}
          </main>
          <SiteFooter />
        </DollyChatRoot>
        <Analytics />
      </body>
    </html>
  );
}
