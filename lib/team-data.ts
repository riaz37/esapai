export interface TeamMember {
    id: string;
    slug: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    /** Original-source video path (kept for backward compatibility). */
    video: string;
    /** Web-optimized H.264 MP4 (~CRF 24, max width 1080, no audio, +faststart). */
    videoMp4: string;
    /** Web-optimized VP9 WebM (~CRF 32, no audio). */
    videoWebm: string;
    /** AV1 WebM — ~30% smaller than VP9, supported by ~92% of browsers in 2026. */
    videoAv1: string;
    /** Poster frame extracted at ~0.5s from the source video. */
    poster: string;
}

const memberVideoExtension = (_name: string): "mov" => "mov";

// Slugs where AV1 encoding is genuinely smaller than H.264 MP4.
// Others fall back to VP9 WebM → H.264 MP4 source chain.
const AV1_MEMBER_SLUGS = new Set([
    "alaa-said",
    "ayed-alanazi",
    "baker-abukhater",
    "hamed-hasan",
    "m-usman-nazir",
    "mohamed-mostafa",
    "omar-abukhater",
    "osama-hassanein",
    "salem-almtaery",
]);

const buildMember = (
    member: Omit<TeamMember, "video" | "videoMp4" | "videoWebm" | "videoAv1" | "poster">,
): TeamMember => {
    const { slug, name } = member;
    return {
        ...member,
        video: `/members-videos/${name}.${memberVideoExtension(name)}`,
        videoMp4: `/members-videos/web/${slug}.mp4`,
        videoWebm: `/members-videos/web/${slug}.webm`,
        videoAv1: AV1_MEMBER_SLUGS.has(slug) ? `/members-videos/web/${slug}.av1.webm` : "",
        poster: `/members-videos/web/${slug}-poster.jpg`,
    };
};

export const teamData: TeamMember[] = [
    buildMember({
        id: "1",
        slug: "baker-abukhater",
        name: "Baker Abukhater",
        role: "Founder",
        bio: "The visionary and dynamic Founder of ESAP AI, driving the mission to build futuristic AI-powered technologies that redefine how institutions, governments, and individuals work.",
        image: "/team/baker-abukhater.jpg",
    }),
    buildMember({
        id: "2",
        slug: "ayed-alanazi",
        name: "Ayed Alanazi",
        role: "People Relations Manager",
        bio: "People Relations Manager at ESAP AI, fostering a culture of collaboration, inclusion, and excellence across the multinational and multi-lingual team.",
        image: "/team/ayed-alanazi.jpg",
    }),
    buildMember({
        id: "3",
        slug: "syed-imam",
        name: "Syed Imam",
        role: "Co-Founder & Team Lead",
        bio: "Enterprise AI Development Pioneer and Co-Founder of ESAP AI, leading engineering teams to deliver scalable agentic AI solutions for enterprises worldwide.",
        image: "/team/syed-imam.jpg",
    }),
    buildMember({
        id: "4",
        slug: "m-usman-nazir",
        name: "M. Usman Nazir",
        role: "Co-Founder & Director of Artificial Intelligence",
        bio: "Director of Artificial Intelligence & Data Solutions at ESAP AI, architecting the intelligence layer that powers ESAP's suite of AI products and frameworks.",
        image: "/team/m-usman-nazir.jpg",
    }),
    buildMember({
        id: "5",
        slug: "abdullah-abukhater",
        name: "Abdullah Abukhater",
        role: "Creative Innovation Director",
        bio: "Creative Innovation Director at ESAP AI, blending design thinking with emerging technology to shape experiences that are as beautiful as they are intelligent.",
        image: "/team/abdullah-abukhater.jpg",
    }),
    buildMember({
        id: "6",
        slug: "omar-abukhater",
        name: "Omar Abukhater",
        role: "Strategy Director",
        bio: "Strategy Director at ESAP AI, charting the go-to-market and growth roadmap that positions ESAP as the leading force in enterprise AI transformation.",
        image: "/team/omar-abukhater.jpg",
    }),
    buildMember({
        id: "7",
        slug: "salem-almtaery",
        name: "Salem Almtaery",
        role: "Human Resources Manager",
        bio: "Human Resources Manager at ESAP AI, dedicated to building and supporting the talented team that drives ESAP's innovation and growth.",
        image: "/team/salem-almtaery.jpg",
    }),
    buildMember({
        id: "8",
        slug: "alaa-said",
        name: "Alaa Said",
        role: "Chief Finance Officer",
        bio: "Chief Finance Officer at ESAP AI, overseeing financial strategy and operations to ensure sustainable growth and investment in cutting-edge AI research.",
        image: "/team/alaa-said.jpg",
    }),
    buildMember({
        id: "9",
        slug: "hamed-hasan",
        name: "Hamed Hasan",
        role: "Senior Software Engineer Lead",
        bio: "Senior Software Engineer Team Lead at ESAP AI, guiding development of robust, high-performance systems that underpin ESAP's AI product portfolio.",
        image: "/team/hamed-hasan.jpg",
    }),
    buildMember({
        id: "10",
        slug: "mohamed-mostafa",
        name: "Mohamed Mostafa",
        role: "Lead Software Engineer & Delivery Manager",
        bio: "Lead Software Engineer & Delivery Manager at ESAP AI, ensuring projects ship on time, at quality, by bridging technical execution with stakeholder alignment.",
        image: "/team/mohamed-mostafa.jpg",
    }),
    buildMember({
        id: "11",
        slug: "osama-hassanein",
        name: "Osama Hassanein",
        role: "Head of Backend & System Architecture",
        bio: "Head of Backend Engineering & System Architecture at ESAP AI, designing the scalable infrastructure and distributed systems that power ESAP's agentic AI platform.",
        image: "/team/osama-hassanein.jpg",
    }),
];
