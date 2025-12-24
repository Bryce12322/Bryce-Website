export type Language = 'zh' | 'en';

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
}

export interface ProjectDetailSection {
  title: string;
  content: string;
  image?: string;
  imageCaption?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];
  thumbnail: string;
  type: 'mobile' | 'desktop'; // Determines mockup frame
  // Details for the drawer
  detailHeader: {
    timeline: string;
    role: string;
    impact: string;
  };
  challenge: ProjectDetailSection;
  process: ProjectDetailSection;
  solution: ProjectDetailSection & {
    features: Array<{ title: string; description: string; image?: string }>;
  };
}

export interface InterestItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface LifeData {
  slogan: string;
  items: InterestItem[];
}

export interface FooterData {
  message: string;
  copyright: string;
  qrcode: string;
}

export interface AppContent {
  nav: {
    work: string;
    portfolio: string;
    life: string;
    contact: string;
  };
  hero: HeroData;
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    items: ProjectData[];
  };
  life: LifeData;
  footer: FooterData;
}

export interface DataStore {
  zh: AppContent;
  en: AppContent;
}