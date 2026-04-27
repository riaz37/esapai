import { teamData } from "./team-data";

export interface AboutNarrativeItem {
    id: string;
    category: string;
    name: string;
    description: string;
    price?: string; // Used as Protocol number/Role
    image: string;
    video?: string;
    colorName: string;
}

const memberVideos = [
    "/members/AK-1.mov",
    "/members/AK-2.mov",
    "/members/AK-3.mov",
    "/members/AK-4b.mov",
    "/members/AK-5b.mov",
    "/members/AK-6b.mov",
    "/members/AK-7.mov",
    "/members/AK-8.mov",
    "/members/AK-9b.mov",
    "/members/AK-10b.mov",
];

export const ABOUT_V2_DATA: AboutNarrativeItem[] = teamData.slice(0, 10).map((member, index) => ({
    id: member.id,
    category: "CORE TEAM MEMBER",
    name: member.name,
    description: member.bio,
    price: member.role,
    image: member.image,
    video: memberVideos[index],
    colorName: index % 2 === 0 ? "LEADERSHIP" : "INNOVATION",
}));
