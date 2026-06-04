// ─── Navigation ──────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Social Links ────────────────────────────────────────────
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

// ─── Hero ────────────────────────────────────────────────────
export interface HeroData {
  greeting: string;
  name: string;
  roles: string[];
  bio: string;
  availableBadge: string;
  ctaButtons: CTAButton[];
  codeSnippet: string[];
  techIcons: TechIcon[];
}

export interface CTAButton {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
  icon?: string;
}

export interface TechIcon {
  name: string;
  icon: string;
}

// ─── About ───────────────────────────────────────────────────
export interface AboutData {
  heading: string;
  bio: string;
  stats: StatCard[];
  timeline: TimelineEntry[];
}

export interface StatCard {
  label: string;
  value: string;
  icon: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

// ─── Skills ──────────────────────────────────────────────────
export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
}

// ─── Projects ────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  githubUrl: string | null;
  liveDemoUrl: string | null;
  gradient: string;
  image?: string;
}

// ─── Experience ──────────────────────────────────────────────
export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  type: "active" | "placeholder";
  icon: string;
}

// ─── Achievements ────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
  icon: string;
}

// ─── Certifications ──────────────────────────────────────────
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  certificateUrl: string | null;
  image?: string;
  icon: string;
}

// ─── Contact ─────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

// ─── Personal Info ───────────────────────────────────────────
export interface PersonalInfo {
  name: string;
  title: string;
  college: string;
  degree: string;
  email: string;
  phone: string;
  githubUsername: string;
}

// ─── GitHub Stats ────────────────────────────────────────────
export interface GitHubStatsData {
  username: string;
  cards: GitHubCard[];
}

export interface GitHubCard {
  title: string;
  url: string;
  alt: string;
}
