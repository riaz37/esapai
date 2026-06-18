import type { SocialLinkItem } from "@/components/shared/social-link";

export const socialMediaLinks = [
  {
    name: "Facebook",
    handle: "esapai.official",
    iconPath: "/contact/cfacebook.svg",
    href: "https://www.facebook.com/esapai.official/",
  },
  {
    name: "X",
    handle: "@esap_ai",
    iconPath: "/contact/xc.svg",
    href: "https://x.com/esap_ai",
  },
  {
    name: "LinkedIn",
    handle: "company/esapai",
    iconPath: "/contact/clinkedin.svg",
    href: "https://www.linkedin.com/company/esapai/",
  },
  {
    name: "Instagram",
    handle: "esapai.official",
    iconPath: "/contact/cinstagram.svg",
    href: "https://www.instagram.com/esapai.official/",
  },
  {
    name: "YouTube",
    handle: "@EsapAI",
    iconPath: "/contact/xyoutube.svg",
    href: "https://www.youtube.com/channel/UC7LyRbfXwb7at1gCQpUMzGg",
  },
] as const satisfies ReadonlyArray<SocialLinkItem>;
