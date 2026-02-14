import { teamData } from "./team-data";

export interface AboutNarrativeItem {
    id: string;
    category: string;
    name: string;
    description: string;
    price?: string; // Used as Protocol number/Role
    image: string;
    colorName: string;
}

export const ABOUT_V2_DATA: AboutNarrativeItem[] = teamData.slice(0, 6).map((member, index) => ({
    id: member.id,
    category: "CORE TEAM MEMBER",
    name: member.name,
    description: member.bio,
    price: member.role,
    image: member.image,
    colorName: index % 2 === 0 ? "LEADERSHIP" : "INNOVATION",
}));
