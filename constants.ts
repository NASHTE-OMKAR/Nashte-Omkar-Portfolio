import { Experience, Certification, Project, Education, TrailheadStats, SkillCategory } from './types';

export const CONTACT_INFO = {
  name: "Omkar Nashte",
  phone: "(+91) 9518525853",
  email: "NASHTE.OMKAR@zohomail.in",
  location: "Pune, India",
  linkedin: "https://www.linkedin.com/in/omkar-nashte-aa35501a5/",
  github: "https://github.com/NASHTE-OMKAR/omkar-portfolio",
  trailhead: "https://www.salesforce.com/trailblazer/czhvlctx9zxmwbdpkj",
  objective: "B.Tech graduate in Electronics and Telecommunication with hands-on Salesforce training and project experience. Seeking an entry-level role in technology to apply technical skills and a collaborative approach toward developing robust solutions."
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Salesforce Jungle",
    role: "Salesforce Developer TRAINING",
    period: "11/2024 – 05/2025",
    type: "Training"
  },
  {
    company: "Mahindra and Mahindra",
    role: "Assistant Manager (GAT)",
    period: "09/2023 – 09/2024",
    type: "Employment"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Salesforce Platform Developer I", provider: "Salesforce", date: "01/2025–01/2026" },
  { name: "Salesforce AI Associate", provider: "Salesforce", date: "01/2025–01/2026" },
  { name: "Java Programming", provider: "Great Learning", date: "06/2021–08/2021" },
  { name: "Java - Basic", provider: "Hackerrank", date: "5-Star" }
];

export const PROJECTS: Project[] = [
  {
    name: "Inventory Management System",
    role: "Salesforce Engineer",
    techStack: ["Visualforce", "Apex", "Controllers", "Triggers", "Force.com IDE"],
    responsibilities: [
      "Created custom objects and worked on Standard Object.",
      "Implemented Visualforce Pages, Apex Components, Controllers, Triggers.",
      "Built custom Visualforce page for branded invoice PDFs, enforcing field-level security.",
      "Used Force.com IDE for developing, customizing, testing, and deploying.",
      "Implemented Field level and Object level security.",
      "Created Validation rules, Assignment rules, and Workflow Rules (Field Updates, Email Alerts)."
    ]
  },
  {
    name: "Real Estate Management Solution",
    role: "Salesforce Developer",
    techStack: ["Apex", "LWC", "Data Modeling", "Automation", "Triggers"],
    responsibilities: [
      "Developed a comprehensive CRM for managing property listings, agent profiles, and client interactions.",
      "Designed custom data model (Property, Agent, Client).",
      "Implemented triggers to auto-create opportunities for new/updated accounts.",
      "Automated email notifications with record counts.",
      "Enforced data security via role hierarchies, sharing rules, and field-level security."
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Administration",
    skills: ["Custom Objects", "Lookup/Master-Detail Relationships", "Junction Objects", "Validation Rules", "Workflows", "Approval Processes"]
  },
  {
    title: "Data Security",
    skills: ["Profiles", "Permission Sets", "Role Hierarchy", "Record Types", "Field Level Security"]
  },
  {
    title: "Salesforce Platform",
    skills: ["Standard Objects (Account, Contact, Opp, Lead)", "Reports & Dashboards", "Data Quality Monitoring"]
  },
  {
    title: "Development",
    skills: ["Apex Language", "Triggers", "Apex Class", "Asynchronous Apex", "SOQL", "Visualforce Pages"]
  },
  {
    title: "Technical",
    skills: ["Java", "JavaScript", "HTML", "CSS", "OOPs"]
  }
];

export const TRAILHEAD: TrailheadStats = {
  rank: "MOUNTAINEER",
  badges: 30,
  points: "19,350",
  trailmixes: 4
};

export const EDUCATION: Education = {
  institution: "Walchand Institute of Technology",
  location: "Solapur, India",
  degree: "B.Tech in Electronics and Telecommunication",
  year: "07/2019 – 07/2023",
  score: "GPA: 9.39 (Top 5%)"
};