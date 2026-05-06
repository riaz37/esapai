import { client } from "./client";

// Generic type for raw Sanity documents fetched from the API.
// Sanity returns arbitrary JSON, mapped to typed app models in mappers below.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityDoc = Record<string, any>;

// ── Asset Path Helpers ──
/**
 * Ensures a path has the correct prefix and extension for the reorganized public directory.
 */
function ensureVideoPath(path: string | undefined): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http') || path.startsWith('//')) return path;
    
    // Remove leading slash if present to normalize
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // If it's already properly prefixed, just return with leading slash
    if (cleanPath.startsWith('videos/')) return `/${cleanPath}`;
    
    // Otherwise, prefix with /videos/
    return `/videos/${cleanPath}`;
}

function ensureImagePath(path: string | undefined, defaultDir: string = 'images'): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http') || path.startsWith('//') || path.startsWith('data:')) return path;
    
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Check for common directories
    if (
        cleanPath.startsWith('branding/') || 
        cleanPath.startsWith('landing/') || 
        cleanPath.startsWith('products/') || 
        cleanPath.startsWith('product_icons/') || 
        cleanPath.startsWith('productimages/') ||
        cleanPath.startsWith('patterns/') ||
        cleanPath.startsWith('team/') ||
        cleanPath.startsWith('partners/') ||
        cleanPath.startsWith('services/')
    ) {
        return `/${cleanPath}`;
    }
    
    return `/${defaultDir}/${cleanPath}`;
}

// ── UI Translations ──
export const uiTranslationsQuery = `*[_type == "uiTranslations" && language == $locale][0]`;

export async function getUITranslations(locale: string) {
    const doc = await client.fetch(uiTranslationsQuery, { locale }, {
        next: {
            revalidate: 86400, // 24 hours (translations rarely change)
            tags: ["translations", `translations-${locale}`]
        }
    });
    if (!doc) return null;
    return mapSanityTranslationsToMessages(doc);
}

/**
 * Converts camelCase Sanity field names back to the original JSON key structure
 * that next-intl components expect (e.g. caseStudy → "case-study", aiFramework → "ai-framework",
 * timeSavings → "Time Savings").
 */
function mapSanityTranslationsToMessages(doc: SanityDoc): Record<string, unknown> {
    const {
        navigation: nav = {},
        loading: load = {},
        home = {},
        about = {},
        contact = {},
        footer = {},
        menus = {},
        products = {},
        service = {},
        notFound = {},
        error: errorPage = {},
        cta = {},
        caseStudy: cs = {},
        metrics = {},
    } = doc;

    return {
        Navigation: {
            home: nav.home,
            about: nav.about,
            product: nav.product,
            service: nav.service,
            "case-study": nav.caseStudy,
            contact: nav.contact,
            getStarted: nav.getStarted,
            language: nav.language,
        },
        Loading: {
            message: load.message,
            subMessage: load.subMessage,
            introTitle: load.introTitle,
            introTagline: load.introTagline,
        },
        Home: {
            reveal: { text: home.reveal?.text },
            showcase: {
                badge: home.showcase?.badge,
                title: home.showcase?.title,
                subtitle: home.showcase?.subtitle,
                explore: home.showcase?.explore,
                products: {
                    erp: home.showcase?.products?.erp,
                    "ai-framework": home.showcase?.products?.aiFramework,
                    zakra: home.showcase?.products?.zakra,
                    jawib: home.showcase?.products?.jawib,
                    fasih: home.showcase?.products?.fasih,
                },
            },
        },
        About: {
            team: about.team || {},
        },
        Contact: {
            badge: contact.badge,
            title: contact.title,
            description: contact.description,
            social: contact.social,
            form: contact.form,
            toasts: contact.toasts,
        },
        Service: {
            hero: service.hero,
            problem: service.problem,
            features: service.features,
            video: service.video,
            beforeAfter: service.beforeAfter,
            cta: service.cta,
            metadata: service.metadata,
            defaultHeroSubtitle1: service.defaultHeroSubtitle1,
            defaultHeroSubtitle2: service.defaultHeroSubtitle2,
        },
        NotFound: {
            title: notFound.title,
            description: notFound.description,
            goHome: notFound.goHome,
            contactUs: notFound.contactUs,
            quickLinks: notFound.quickLinks,
        },
        Error: {
            title: errorPage.title,
            description: errorPage.description,
            errorId: errorPage.errorId,
            tryAgain: errorPage.tryAgain,
            goHome: errorPage.goHome,
            whatToDo: errorPage.whatToDo,
            tip1: errorPage.tip1,
            tip2: errorPage.tip2,
            tip3: errorPage.tip3,
            contactSupport: errorPage.contactSupport,
            criticalTitle: errorPage.criticalTitle,
            criticalDescription: errorPage.criticalDescription,
            reloadApp: errorPage.reloadApp,
            troubleshooting: errorPage.troubleshooting,
            clearCache: errorPage.clearCache,
            tryBrowser: errorPage.tryBrowser,
            checkJs: errorPage.checkJs,
            contactIfPersists: errorPage.contactIfPersists,
        },
        Product: {},
        Footer: {
            cta: footer.cta,
            social: footer.social,
            menu: footer.menu,
            newsletter: footer.newsletter,
            rights: footer.rights,
            legal: footer.legal,
        },
        Menus: {
            ourServices: menus.ourServices,
            ourProducts: menus.ourProducts,
            impactAnalysis: menus.impactAnalysis,
            serviceDescription: menus.serviceDescription,
            productDescription: menus.productDescription,
            telemetryPending: menus.telemetryPending,
        },
        Products: {
            erp: products.erp,
            "ai-framework": products.aiFramework,
            zakra: products.zakra,
            jawib: products.jawib,
            fasih: products.fasih,
        },
        CTA: {
            title: cta.title,
            subtitle: cta.subtitle,
            button: cta.button,
            productFallbackTitle: cta.productFallbackTitle,
            productFallbackButton: cta.productFallbackButton,
        },
        CaseStudy: {
            list: cs.list,
            detail: cs.detail,
            metadata: cs.metadata,
        },
        Metrics: {
            "Time Savings": metrics.timeSavings,
            "User Satisfaction": metrics.userSatisfaction,
            "Productivity Increase": metrics.productivityIncrease,
            "Developer Satisfaction": metrics.developerSatisfaction,
            "Faster Development": metrics.fasterDevelopment,
            Uptime: metrics.uptime,
            "Faster Information Retrieval": metrics.fasterInformationRetrieval,
            "Answer Accuracy": metrics.answerAccuracy,
            "Time Saved": metrics.timeSaved,
            "First Contact Resolution": metrics.firstContactResolution,
            "Average Response Time": metrics.averageResponseTime,
            "Customer Satisfaction": metrics.customerSatisfaction,
            "Arabic Text Accuracy": metrics.arabicTextAccuracy,
            "Dialects Supported": metrics.dialectsSupported,
            "Arabic Tokens Trained": metrics.arabicTokensTrained,
        },
    };
}

// ── Home Page ──
export const homePageQuery = `*[_type == "homePage" && language == $locale][0] {
  heroTitle,
  heroSubtitle,
  heroBadgePill,
  heroBadgeDescription,
  servicesTitle,
  servicesSubtitle,
  servicesBadge,
  services,
  achievementsTitle,
  achievementsSubtitle,
  achievementsBadge,
  achievements,
  missionTitle,
  missionSubtitle,
  missionBadge,
  missionCards,
  technologyTitle,
  technologySubtitle,
  technologyBadge,
  technologyCards,
  partners,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
  ctaButtonHref,
  textRevealContent
}`;

export async function getHomePage(locale: string) {
    const doc = await client.fetch(homePageQuery, { locale }, {
        next: {
            revalidate: 3600, // 1 hour
            tags: ["home", `home-${locale}`]
        }
    });
    
    if (!doc) return null;
    return mapSanityHome(doc);
}

// ── Home Mapper ──
export function mapSanityHome(doc: SanityDoc): SanityDoc {
    const missionCards = Array.isArray(doc.missionCards) ? doc.missionCards : [];
    const technologyCards = Array.isArray(doc.technologyCards) ? doc.technologyCards : [];
    const partners = Array.isArray(doc.partners) ? doc.partners : [];
    return {
        ...doc,
        missionCards: missionCards.map((card: SanityDoc) => ({
            ...card,
            image: ensureImagePath(card.image as string | undefined, 'images'),
        })),
        technologyCards: technologyCards.map((card: SanityDoc) => ({
            ...card,
            image: ensureImagePath(card.image as string | undefined, 'images'),
        })),
        partners: partners.map((partner: SanityDoc) => ({
            ...partner,
            logo: ensureImagePath(partner.logo as string | undefined, 'partners'),
        })),
    };
}

// ── About Page ──
export const aboutPageQuery = `*[_type == "aboutPage" && language == $locale][0] {
  _id,
  language,
  heroTitle,
  heroSubtitle,
  heroBadge,
  heroTitlePart1,
  heroTitlePart2,
  teamMembers,
  narrativeDesignation,
  teamCategoryLabel,
  teamLeadershipLabel,
  teamInnovationLabel,
  historyTitle,
  historyBadge,
  historySubtitle,
  historyHook,
  historyPhases[]{ year, title, description, phaseLabel, highlight, image },
  visionTitle,
  visionBody
}`;

export async function getAboutPage(locale: string) {
    const doc = await client.fetch(aboutPageQuery, { locale }, {
        next: {
            revalidate: 3600, // 1 hour
            tags: ["about", `about-${locale}`]
        }
    });

    if (!doc) return null;
    return mapSanityAbout(doc);
}

// ── About Mapper ──
export function mapSanityAbout(doc: SanityDoc): SanityDoc {
    const teamMembers = Array.isArray(doc.teamMembers) ? doc.teamMembers : [];
    const historyPhases = Array.isArray(doc.historyPhases) ? doc.historyPhases : [];
    return {
        ...doc,
        teamMembers: teamMembers.map((member: SanityDoc) => ({
            ...member,
            image: ensureImagePath(member.image as string | undefined, 'team'),
        })),
        historyPhases: historyPhases.map((phase: SanityDoc) => ({
            ...phase,
            image: ensureImagePath(phase.image as string | undefined, 'images'),
        })),
    };
}

// ── Products ──
const PRODUCT_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  description,
  menuDescription,
  icon,
  orderRank,
  heroSubtitle,
  heroCenterIcon,
  heroCenterIconAlt,
  heroDemoVideo,
  heroVideo,
  heroTagline,
  missionTitle,
  missionSubtitle,
  missionCards,
  automationTitle,
  automationSubtitle,
  automationFeatures,
  youtubeVideoId,
  youtubeVideoTitle,
  performanceMetrics,
  aceternityTitle,
  aceternitySubtitle,
  aceternityFeatures,
  exploreButton,
  outcomesTitle,
  outcomesBadge,
  demoTitle,
  demoSubtitle,
  demoBadge,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
  architectureTitle,
  architectureBadge,
  architectureSubtitle,
  architectureReelImages,
  challengesBadge,
  challengesTitlePart1,
  challengesTitlePart2,
  challengesSubtitle,
  cinematicNarrative,
  cinematicProblems,
  journeyTitle,
  journeySubtitle,
  journeyBadge,
  journeyStages,
  journeyLayers
`;

export const productsListQuery = `*[_type == "productDocument" && language == $locale] | order(orderRank asc) {${PRODUCT_FIELDS}}`;

export async function getProducts(locale: string) {
    return client.fetch(productsListQuery, { locale }, {
        next: {
            revalidate: 3600,
            tags: ["products", `products-${locale}`]
        }
    });
}

export const productBySlugQuery = `*[_type == "productDocument" && slug.current == $slug && language == $locale][0] {${PRODUCT_FIELDS}}`;

export async function getProductBySlug(slug: string, locale: string) {
    return client.fetch(productBySlugQuery, { slug, locale }, {
        next: {
            revalidate: 3600,
            tags: ["products", `product-${slug}-${locale}`]
        }
    });
}

// ── Service Page ──
const SERVICE_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  heroTitle,
  heroSubtitle,
  heroTagline,
  heroCenterIcon,
  heroDemoVideo,
  heroVideo,
  heroVideoId,
  heroVideoTitle,
  problemTitle,
  problemSubtitle,
  problemBadge,
  problemItems,
  featuresTitle,
  featuresSubtitle,
  featuresBadge,
  featuresCentralNode,
  features,
  processTitle,
  processSubtitle,
  processBadge,
  processSteps,
  portalVideoTitle,
  portalVideoDescription,
  beforeAfterLabel,
  beforeAfterTitle,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
  ctaButtonLink,
  menuDescription,
  performanceMetrics
`;

export const servicesListQuery = `*[_type == "serviceDocument" && language == $locale] | order(_createdAt asc) {${SERVICE_FIELDS}}`;

export const serviceBySlugQuery = `*[_type == "serviceDocument" && slug.current == $slug && language == $locale][0] {${SERVICE_FIELDS}}`;

// ── Product Mapper ──
// Maps flat Sanity productDocument to the nested Product type used by client components
import type { Product } from "@/types/product";

const PRODUCT_MENU_ICONS: Record<string, string> = {
    'erp':          '/productsmenu_icons/ERP.png',
    'ai-framework': '/productsmenu_icons/AI Framwork.png',
    'zakra':        '/productsmenu_icons/zakra.png',
    'jawib':        '/productsmenu_icons/jwaib.png',
    'fasih':        '/productsmenu_icons/Fasih.png',
};

export function mapSanityProduct(doc: SanityDoc): Product {
    const slug = doc.slug || doc._id;
    return {
        id: slug,
        name: doc.name,
        description: doc.description,
        menuDescription: doc.menuDescription,
        slug: doc.slug,
        icon: PRODUCT_MENU_ICONS[slug] ?? ensureImagePath(doc.icon, 'products'),
        content: {
            hero: {
                subtitle: doc.heroSubtitle,
                centerIcon: ensureImagePath(doc.heroCenterIcon, 'products'),
                centerIconAlt: doc.heroCenterIconAlt,
                demoVideo: ensureVideoPath(doc.heroDemoVideo),
                heroVideo: ensureVideoPath(doc.heroVideo),
                tagline: doc.heroTagline,
            },
            mission: {
                title: doc.missionTitle,
                subtitle: doc.missionSubtitle,
                cards: (doc.missionCards as SanityDoc[] | undefined)?.map((c) => ({
                    title: c.title,
                    description: c.description,
                })),
            },
            automationHub: {
                title: doc.automationTitle,
                subtitle: doc.automationSubtitle,
                features: (doc.automationFeatures as SanityDoc[] | undefined)?.map((f) => ({
                    title: f.title,
                    description: f.description,
                })),
            },
            youtubeVideo: {
                videoId: doc.youtubeVideoId,
                title: doc.youtubeVideoTitle,
            },
            performance: {
                metrics: (doc.performanceMetrics as SanityDoc[] | undefined)?.map((m) => ({
                    value: m.value,
                    label: m.label,
                })),
            },
            aceternityFeatures: {
                title: doc.aceternityTitle,
                subtitle: doc.aceternitySubtitle,
                features: (doc.aceternityFeatures as SanityDoc[] | undefined)?.map((f) => ({
                    title: f.title,
                    description: f.description,
                    className: f.className,
                })),
            },
            exploreButton: doc.exploreButton,
            outcomes: doc.outcomesTitle || doc.outcomesBadge ? {
                title: doc.outcomesTitle,
                badge: doc.outcomesBadge,
            } : undefined,
            demo: doc.demoTitle || doc.demoBadge || doc.demoSubtitle ? {
                title: doc.demoTitle,
                subtitle: doc.demoSubtitle,
                badge: doc.demoBadge,
            } : undefined,
            cta: doc.ctaTitle || doc.ctaSubtitle || doc.ctaButtonText ? {
                title: doc.ctaTitle,
                subtitle: doc.ctaSubtitle,
                buttonText: doc.ctaButtonText,
            } : undefined,
                architecture: doc.architectureTitle || doc.architectureBadge ? {
                title: doc.architectureTitle,
                badge: doc.architectureBadge,
                subtitle: doc.architectureSubtitle,
                reelImages: doc.architectureReelImages?.map((img: string) => {
                    const normalized = img.includes('/productimages/') ? img.replace('.png', '.webp') : img;
                    return ensureImagePath(normalized, 'productimages');
                }),
            } : undefined,
            cinematic: (doc.challengesBadge || doc.cinematicNarrative || doc.cinematicProblems) ? {
                challenges: (doc.challengesBadge || doc.challengesTitlePart1 || doc.challengesTitlePart2 || doc.challengesSubtitle) ? {
                    badge: doc.challengesBadge,
                    titlePart1: doc.challengesTitlePart1,
                    titlePart2: doc.challengesTitlePart2,
                    subtitle: doc.challengesSubtitle,
                } : undefined,
                narrative: doc.cinematicNarrative || undefined,
                problems: (doc.cinematicProblems as SanityDoc[] | undefined)?.map((p) => ({
                    title: p.title,
                    description: p.description,
                    solTitle: p.solTitle,
                    solDesc: p.solDesc,
                    solImpact: p.solImpact,
                })),
            } : undefined,
            journey: (doc.journeyTitle || doc.journeyBadge || doc.journeyStages || doc.journeyLayers) ? {
                title: doc.journeyTitle,
                subtitle: doc.journeySubtitle,
                badge: doc.journeyBadge,
                stages: doc.journeyStages,
                layers: (doc.journeyLayers as SanityDoc[] | undefined)?.map((l) => ({
                    title: l.title,
                    nodes: l.nodes,
                })),
            } : undefined,
        },
    };
}

export async function getSanityProducts(locale: string): Promise<Product[]> {
    const docs = await client.fetch(productsListQuery, { locale });
    return (docs || []).map(mapSanityProduct);
}

export async function getSanityProductBySlug(slug: string, locale: string): Promise<Product | null> {
    const doc = await client.fetch(productBySlugQuery, { slug, locale });
    return doc ? mapSanityProduct(doc) : null;
}

// ── Service Mapper ──
import type { Service } from "@/types/service";

const SERVICE_MENU_ICONS: Record<string, string> = {
    'integration-and-automation': '/servicemenu_icons/Automation.png',
    'faas':                       '/servicemenu_icons/Agent.png',
    'innovation-lab':             '/servicemenu_icons/Inovetion Lab.png',
};

export function mapSanityService(doc: SanityDoc): Service {
    const slug = doc.slug as string;
    return {
        id: slug || doc._id,
        name: doc.name,
        slug,
        icon: SERVICE_MENU_ICONS[slug] ?? ensureImagePath(doc.icon, 'services'),
        menuDescription: doc.menuDescription,
        description: doc.heroSubtitle?.[0] || doc.problemSubtitle || "",
        content: {
            performance: {
                metrics: (doc.performanceMetrics as SanityDoc[] | undefined)?.map((m) => ({
                    value: m.value as string,
                    label: m.label as string,
                })),
            },
            hero: {
                titleMain: doc.heroTitle,
                titleHighlight: doc.heroTagline,
                subtitle: doc.heroSubtitle || [],
                centerIcon: ensureImagePath(doc.heroCenterIcon, 'services'),
                demoVideo: ensureVideoPath(doc.heroDemoVideo),
                heroVideo: ensureVideoPath(doc.heroVideo),
            },
            features: {
                title: doc.featuresTitle,
                subtitle: doc.featuresSubtitle,
                badge: doc.featuresBadge,
                centralNode: doc.featuresCentralNode as string | undefined,
                items: (doc.features as SanityDoc[] | undefined)?.map((item) => ({
                    title: item.title,
                    description: item.description,
                })),
            },
            youtubeVideo: doc.heroVideoId ? {
                videoId: doc.heroVideoId,
                title: doc.heroVideoTitle,
            } : undefined,
            problem: doc.problemTitle ? {
                title: doc.problemTitle,
                subtitle: doc.problemSubtitle,
                badge: doc.problemBadge,
                items: (doc.problemItems as SanityDoc[] | undefined)?.map((item) => ({
                    title: item.title,
                    description: item.description,
                })),
            } : undefined,
            process: doc.processTitle ? {
                title: doc.processTitle,
                subtitle: doc.processSubtitle,
                badge: doc.processBadge,
                steps: (doc.processSteps as SanityDoc[] | undefined)?.map((step) => ({
                    title: step.title,
                    description: step.description,
                })),
            } : undefined,
            beforeAfter: (doc.beforeAfterLabel || doc.beforeAfterTitle) ? {
                label: doc.beforeAfterLabel,
                title: doc.beforeAfterTitle,
            } : undefined,
            cta: doc.ctaTitle ? {
                title: doc.ctaTitle,
                subtitle: doc.ctaSubtitle,
                buttonText: doc.ctaButtonText,
                buttonLink: doc.ctaButtonLink,
            } : undefined,
        },
    };
}

export async function getSanityServices(locale: string): Promise<Service[]> {
    const docs = await client.fetch(servicesListQuery, { locale }, {
        next: {
            revalidate: 3600,
            tags: ["services", `services-${locale}`]
        }
    });
    return (docs || []).map(mapSanityService);
}

export async function getSanityServiceBySlug(slug: string, locale: string): Promise<Service | null> {
    const doc = await client.fetch(serviceBySlugQuery, { slug, locale }, {
        next: {
            revalidate: 3600,
            tags: ["services", `service-${slug}-${locale}`]
        }
    });
    return doc ? mapSanityService(doc) : null;
}

// ── Legal Pages ──
const legalPageQuery = `*[_type == "legalPage" && pageType == $pageType && language == $locale][0]{
    title,
    lastUpdated,
    metaDescription,
    contactEmail,
    contactAddress,
    sections[]{
        heading,
        content
    }
}`;

export interface SanityLegalPage {
    title: string;
    lastUpdated: string;
    metaDescription?: string;
    contactEmail?: string;
    contactAddress?: string;
    sections: Array<{
        heading: string;
        content: Array<{ _type: string; [key: string]: unknown }>;
    }>;
}

export async function getSanityLegalPage(pageType: "privacy" | "terms", locale: string): Promise<SanityLegalPage | null> {
    return client.fetch(legalPageQuery, { pageType, locale }, {
        next: {
            revalidate: 86400,
            tags: ["legal", `legal-${pageType}-${locale}`]
        }
    });
}
