import project1 from "../assets/evara.png";
import project2 from "../assets/Health.png";
import project3 from "../assets/apex.png";

export const personalInfo = {
  name: "Ifeanyi Emmanuel",
  role: "Frontend Developer",
  taglines: [
    "Building futuristic web experiences",
    "Crafting scalable website systems",
    "Designing modern interfaces",
    "Turning ideas into digital reality",
  ],
  bio: "I'm a passionate frontend developer with high-performance designs. I specialize in React, Node.js, and modern cloud architectures — combining clean code with stunning user experiences.",
  location: "Lagos State, Nigeria",
  email: "emmanuel@gmail.com",
  github: "https://github.com/Emperor401",
  linkedin: "https://www.linkedin.com/in/ifeanyi-emmanuel-b41890395?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  resumeUrl: "/resume.pdf",
  avatar: null,
};

export const stats = [
  { label: "Years Experience", value: 1,   suffix: "+" },
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "Happy Clients", value: 3,      suffix: "+" },
];

export const skills = [
  {
    category: "Frontend",
    color: "cyan",
    items: [
      { name: "React",      level: 80 },
      { name: "Html/Css", level: 88 },
      { name: "JavaScript",    level: 70 },
      { name: "Tailwind",   level: 90 },
      { name: "Framer",     level: 78 },
    ],
  },
  {
    category: "Backend",
    color: "blue",
    items: [
      { name: "Node.js",    level: 80 },
      { name: "Express",    level: 70 },
    ],
  },
  {
    category: "Database",
    color: "violet",
    items: [
      { name: "MongoDB",    level: 70 },
      { name: "Firebase",   level: 60 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Evara E-commerce",
    image: project1,
    category: "frontend",
    description: "A high-performance e-commerce platform",
    longDescription: "Built with Html/Css and JavaScript. Features include real-time updates via WebSockets, recommendations, Stripe payment integration, and an admin dashboard.",
    tech: ["Html/Css", "JavaScript"],
    github: "https://github.com",
    demo: "https://evara-website-flame.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "HealthCare",
    image: project2,
    category: "frontend",
    description: "A high-performance healthcare platform",
    longDescription: "Providing compassionate, comprehensive medical care with state-of-the-art facilities and experienced professionals",
    tech: ["React", "Taiwindcss"],
    github: "https://github.com",
    demo: "https://health1-theta.vercel.app/",
    featured: true,
  },
  {
    id: 3,
    title: "Apex Car",
    image: project3,
    category: "frontend",
    description: "NextGen Automobile innovation that redefines the future of automotive design and technology",
    longDescription: "A comprehensive car rental platform built with React and Tailwind CSS. Features include real-time availability, booking, and payment processing.",
    tech: ["React", "Tailwind"],
    github: "https://github.com",
    demo: "apex-project-sigma.vercel.app",
    featured: false,
  },
];

export const services = [
  {
    title: "Web Development",
    description: "Frontend websites built with modern frameworks, optimized for performance and scalability.",
    color: "cyan",
    features: ["React / Next.js", "Node.js APIs", "Database Design", "Cloud Deployment"],
  },
  {
    title: "Backend Systems",
    description: "Robust server-side architecture with RESTful APIs, microservices, and real-time capabilities.",
    color: "blue",
    features: ["REST & GraphQL APIs", "Microservices", "Authentication", "Performance Tuning"],
  },
  {
    title: "UI / UX Design",
    description: "Stunning, user-centered interfaces with smooth animations and exceptional attention to detail.",
    color: "violet",
    features: ["Design Systems", "Figma Prototypes", "Motion Design", "Accessibility"],
  },
];

