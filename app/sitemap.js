import { getBriefs } from "@/lib/briefs";
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const now = new Date();

  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/product", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/briefs", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/start", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ].map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const briefs = getBriefs().map((b) => ({
    url: `${SITE_URL}/briefs/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...briefs];
}
