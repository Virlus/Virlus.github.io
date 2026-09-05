import type {
  FooterConfig,
  LinkConfig,
  ProfileConfig,
  PublicationConfig,
  SiteConfig,
} from "@/types"

export const SITE: SiteConfig = {
  title: "Wenye Yu",
  description:
    "Robotics and Embodied AI. Ph.D. student at Shanghai Jiao Tong University.",
  href: "https://virlus.github.io/",
  author: "Wenye Yu",
  dir: "ltr",
  defaultPageImage: "/images/london_profile.JPG",
  defaultPostImage: "/images/london_profile.JPG",

  locale: {
    lang: "en-US",
    options: {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    },
  },

  // Table of contents depth shared by blog posts and project detail pages.
  tocMaxDepth: 3,

  blog: {
    featuredPostCount: 0,
    postsPerPage: 8,
    shareActions: ["x"],
  },

  home: {
    careerHighlightCount: 0,
    updateCount: 4,
    publicationCount: 3,
  },

  favicon: "/favicon.ico",
  prerender: true,
  npmCDN: "https://cdn.jsdelivr.net/npm",
}

export const PROFILE: ProfileConfig = {
  name: SITE.title,
  tagline: "Robotics & Embodied AI · Ph.D. Student",
  email: "jason.ywy.0422@gmail.com",
  location: "Shanghai, China",
  links: {
    googleScholar: {
      href: "https://scholar.google.com/citations?user=pN95HCsAAAAJ&hl=en",
      label: "Scholar",
    },
    github: { href: "https://github.com/Virlus/", label: "GitHub" },
    twitter: { href: "https://x.com/Jason_ywy", label: "Twitter / X" },
  },
  highlightLinks: ["googleScholar"],
  linksPlacement: { header: false, about: true, footer: false },
}

export const NAV_LINKS: LinkConfig[] = [
  { href: "/projects/", label: "Projects" },
  { href: "/publications/", label: "Publications" },
  { href: "/news/", label: "News" },
]

export const NAVIGATION: LinkConfig[] = NAV_LINKS.map(({ href, label }) => ({
  href,
  label,
}))

export const PUB_CONFIG: PublicationConfig = {
  maxFirstAuthors: 6,
  maxLastAuthors: 1,
  highlightAuthor: {
    firstName: "Wenye",
    lastName: "Yu",
    aliases: ["W. Yu"],
  },
  equalSymbols: {
    first: "*",
    second: "†",
    third: "‡",
    last: "§",
  },
}

export const FOOTER: FooterConfig = {
  credits: true,
  sourceCode: "https://github.com/Virlus/Virlus.github.io",
  footerLinks: [],
}

if (import.meta.env.DEV && typeof window === "undefined") {
  const {
    FooterConfigSchema,
    ProfileConfigSchema,
    PublicationConfigSchema,
    SiteConfigSchema,
  } = await import("@/schemas")
  SiteConfigSchema.parse(SITE)
  ProfileConfigSchema.parse(PROFILE)
  FooterConfigSchema.parse(FOOTER)
  PublicationConfigSchema.parse(PUB_CONFIG)
}
