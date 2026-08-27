import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Libre_Baskerville,
  Source_Sans_3,
  Special_Elite,
} from "next/font/google";
import { DollyChatRoot } from "@/components/dolly-chat/DollyChatRoot";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getRootMetadata } from "@/lib/root-metadata";
import { absoluteUrl, AUTHOR, getSiteDescription, SITE } from "@/lib/site";
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

const typewriter = Special_Elite({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = getRootMetadata();

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
  description: getSiteDescription(),
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: absoluteUrl("/"),
  },
  author: {
    "@type": "Person",
    name: AUTHOR.name,
    url: AUTHOR.site,
    sameAs: [AUTHOR.linkedin],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${sourceSans.variable} ${typewriter.variable} h-full antialiased`}
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
