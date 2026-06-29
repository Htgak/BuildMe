import { ResumeData } from "@/types/resume";
import { v4 } from "./id";

// Simple UUID v4 generator (no external dependency needed)
function genId(): string {
  return v4();
}

export const sampleResumeData: ResumeData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    professionalTitle: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    links: [
      { id: genId(), label: "GitHub", url: "github.com/johndoe" },
      { id: genId(), label: "LinkedIn", url: "linkedin.com/in/johndoe" },
    ],
    summary:
      "Passionate Senior Software Engineer with 8+ years of experience in building scalable web applications. Expertise in React, Node.js, and cloud architecture. Proven track record of leading teams to deliver high-quality software solutions on time. Adept at bridging the gap between technical requirements and business objectives.",
  },
  experience: [
    {
      id: genId(),
      company: "Tech Solutions Inc.",
      position: "Lead Developer",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description: [
        "Architected and migrated legacy monolith to microservices, reducing deployment time by 70%.",
        "Managed a team of 5 engineers across two time zones.",
        "Implemented CI/CD pipeline using GitHub Actions and Docker.",
      ],
    },
    {
      id: genId(),
      company: "Digital Innovations Co.",
      position: "Full Stack Developer",
      location: "New York, NY",
      startDate: "2017-06",
      endDate: "2019-12",
      current: false,
      description: [
        "Built customer-facing dashboard serving 100K+ monthly users using React and Node.js.",
        "Optimized database queries reducing page load times by 40%.",
        "Mentored 3 junior developers and conducted code reviews.",
      ],
    },
  ],
  education: [
    {
      id: genId(),
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2017-06",
      gpa: "3.9",
      achievements: [
        "Dean's List all semesters",
        "Published research on distributed systems",
      ],
    },
    {
      id: genId(),
      institution: "UC Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Engineering",
      startDate: "2011-09",
      endDate: "2015-06",
      gpa: "3.7",
      achievements: ["Cum Laude", "ACM Programming Competition Finalist"],
    },
  ],
  skills: [
    {
      id: genId(),
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
    },
    {
      id: genId(),
      category: "Frameworks",
      skills: ["React", "Next.js", "Node.js", "Express", "Django"],
    },
    {
      id: genId(),
      category: "Tools & Cloud",
      skills: ["AWS", "Docker", "Kubernetes", "Git", "PostgreSQL", "Redis"],
    },
  ],
  projects: [
    {
      id: genId(),
      name: "OpenSource Analytics",
      description:
        "Built a real-time analytics dashboard for tracking web application performance metrics.",
      technologies: ["React", "D3.js", "Node.js", "ClickHouse"],
      link: "github.com/johndoe/analytics",
      startDate: "2023-01",
      endDate: "2023-06",
    },
    {
      id: genId(),
      name: "DevOps Toolkit",
      description:
        "Created an automated deployment toolkit that reduced infrastructure setup from days to hours.",
      technologies: ["Go", "Terraform", "Docker"],
      link: "github.com/johndoe/devops-toolkit",
      startDate: "2022-06",
      endDate: "2022-12",
    },
  ],
  certificates: [
    {
      id: genId(),
      name: "AWS Solutions Architect Professional",
      issuer: "Amazon Web Services",
      date: "2023-03",
      url: "aws.amazon.com/certification",
    },
    {
      id: genId(),
      name: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      date: "2022-08",
    },
  ],
  languages: [
    { id: genId(), name: "English", proficiency: "Native" },
    { id: genId(), name: "Spanish", proficiency: "Intermediate" },
    { id: genId(), name: "Japanese", proficiency: "Basic" },
  ],
  customSections: [],
};

export const emptyResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    location: "",
    links: [],
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
  customSections: [],
};
