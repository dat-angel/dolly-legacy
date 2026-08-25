import type { Metadata } from "next";
import {
  Libre_Baskerville,
  Source_Sans_3,
  Sacramento,
  Special_Elite,
} from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
  title: "Dolly Legacy — A Tribute to Dolly Parton",
  description:
    "Explore the music, philanthropy, and advocacy of Dolly Parton — from the Imagination Library to her stand with Black and LGBTQ+ communities.",
  openGraph: {
    title: "Dolly Legacy — A Tribute to Dolly Parton",
    description:
      "A living tribute to Dolly's songs, giving, and grace. Ask Dolly a question. Explore every moment.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${sourceSans.variable} ${sacramento.variable} ${typewriter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-burgundy-deep">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
