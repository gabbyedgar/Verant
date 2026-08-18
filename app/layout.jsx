import "./globals.css";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

/* Self-hosted at build time: no render-blocking request to Google, no
   layout shift, and the CSS variables below feed the design system. */
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-serif",
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Verant — Know first, not last",
    template: "%s — Verant",
  },
  description:
    "Verant monitors your top three competitors across eight public signal sources and delivers one synthesized brief every Monday at 7am. One page. Strategic implications only.",
  openGraph: {
    title: "Verant — Know first, not last",
    description:
      "Competitive intelligence, on frequency. One synthesized brief every Monday at 7am.",
    type: "website",
    images: ["/uploads/08_verant_social_square.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verant — Know first, not last",
    description:
      "Competitive intelligence, on frequency. One synthesized brief every Monday at 7am.",
    images: ["/uploads/08_verant_social_square.jpg"],
  },
};

export const viewport = {
  themeColor: "#0E1116",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Nav />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
