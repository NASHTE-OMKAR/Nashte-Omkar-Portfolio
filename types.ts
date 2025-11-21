export interface Experience {
  company: string;
  role: string;
  period: string;
  type: 'Training' | 'Employment';
}

export interface Certification {
  name: string;
  provider: string;
  date: string;
}

export interface Project {
  name: string;
  role: string;
  techStack: string[];
  responsibilities: string[];
}

export interface Education {
  institution: string;
  degree: string;
  score: string;
  location: string;
  year: string;
}

export interface TrailheadStats {
  rank: string;
  badges: number;
  points: string;
  trailmixes: number;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}