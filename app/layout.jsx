import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://verant.co"),
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
    images: ["/uploads/08_verant_social_square.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
