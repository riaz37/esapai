import { teamData } from "./team-data";

export interface AboutNarrativeItem {
    id: string;
    category: string;
    name: string;
    description: string;
    price?: string; // Used as Protocol number/Role
    image: string;
    /** Original-source video (kept for backward compatibility). */
    video?: string;
    /** Web-optimized H.264 MP4. */
    videoMp4?: string;
    /** Web-optimized VP9 WebM. */
    videoWebm?: string;
    /** AV1 WebM — smaller than VP9 where encoding won. */
    videoAv1?: string;
    /** Poster frame shown before/while the video loads. */
    poster?: string;
    colorName: string;
}

export const ABOUT_V2_DATA: AboutNarrativeItem[] = teamData.map((member, index) => ({
    id: member.id,
    category: "CORE TEAM MEMBER",
    name: member.name,
    description: member.bio,
    price: member.role,
    image: member.image,
    video: member.video,
    videoMp4: member.videoMp4,
    videoWebm: member.videoWebm,
    videoAv1: member.videoAv1 || undefined,
    poster: member.poster,
    colorName: index % 2 === 0 ? "LEADERSHIP" : "INNOVATION",
}));
