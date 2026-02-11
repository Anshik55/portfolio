export const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Achievements", "Contact"];

export const SKILLS = [
  { name: "React.js", level: 94, color: "#00f5ff" },
  { name: "Django", level: 88, color: "#7b2fff" },
  { name: "JavaScript (ES6+)", level: 92, color: "#00ff9f" },
  { name: "REST APIs", level: 90, color: "#ff2d78" },
  { name: "Node.js / GraphQL", level: 76, color: "#00f5ff" },
  { name: "PostgreSQL / MongoDB", level: 80, color: "#7b2fff" },
];

export const SECONDARY_SKILLS = [
  "Redux", "Context API", "HTML5", "CSS3",
  "MySQL", "Git", "GitHub", "Postman",
  "JWT / OAuth", "Agile", "OOP", "System Design",
];

export const PROJECTS = [
  {
    title: "Breeze — Project Builder",
    subtitle: "Current Project @ Argusoft",
    description:
      "A full frontend platform where users build entire projects by dragging and dropping components. I led the complete drag-and-drop engine, built entirely from scratch without external DnD libraries — supporting precision placement, resizing, and complex nested layouts.",
    tags: ["React.js", "Drag & Drop", "Custom Engine", "Redux"],
    color: "#00f5ff",
    icon: "◈",
    highlights: [
      "Custom DnD engine — zero external libraries",
      "Global UI Kit for projects inside Breeze",
      "Full frontend architecture",
    ],
  },
  {
    title: "THT — Testing Harness Tool",
    subtitle: "Completed Project @ Argusoft",
    description:
      "Built the complete frontend UI for an internal Testing Harness Tool. Delivered reusable component modules including popups, modals, and nested editors — all production-ready and fully shipped.",
    tags: ["React.js", "Reusable Modules", "UI Components", "CSS3"],
    color: "#7b2fff",
    icon: "⬡",
    highlights: [
      "Reusable popup, modal & editor components",
      "Cross-browser compatibility & accessibility",
      "30% API response time improvement",
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    icon: "◎",
    color: "#00ff9f",
    title: "Smart India Hackathon 2022",
    label: "Finalist",
    description:
      "Reached the national finals of SIH 2022. Delivered a production-ready full stack solution under tight deadlines, collaborating with a cross-functional team.",
  },
  {
    icon: "◉",
    color: "#ff2d78",
    title: "Mentor @ Codeyoung",
    label: "2022",
    description:
      "Taught students Python programming and guided them in building beginner-level projects — helping the next generation of developers get started.",
  },
  {
    icon: "◈",
    color: "#00f5ff",
    title: "Azure: Deploy a Web Server",
    label: "Coursera Cert",
    description:
      "Certified in creating Virtual Machines and deploying web servers on Microsoft Azure via Coursera.",
  },
  {
    icon: "⬡",
    color: "#7b2fff",
    title: "HackerRank Certifications",
    label: "MySQL & Python",
    description:
      "Earned Basic & Intermediate certifications in both MySQL and Python from HackerRank.",
  },
];

export const EXPERIENCE = [
  {
    role: "Solution Analyst",
    company: "Argusoft Pvt. Ltd.",
    period: "Sep 2024 – Present",
    color: "#00f5ff",
    points: [
      "Leading advanced frontend features in React.js — complex workflows, reusable modules, custom UI components.",
      "Collaborating with stakeholders to design scalable solutions and optimize system architecture.",
      "Enhanced REST API integration, performance tuning and debugging.",
      "Mentoring junior developers on React, Django, Git, and Agile workflows.",
    ],
  },
  {
    role: "Programmer Analyst",
    company: "Argusoft Pvt. Ltd.",
    period: "Jul 2023 – Sep 2024",
    color: "#7b2fff",
    points: [
      "Built reusable React modules: popups, modals, nested editors.",
      "Developed custom drag-and-drop editor without any external libraries.",
      "Designed and optimized Django REST APIs — reduced response times by 30%.",
      "Improved UI responsiveness, cross-browser compatibility, and accessibility.",
    ],
  },
];
