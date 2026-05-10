const navLinks = [
  { name: "Projects", link: "#work" },
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
];

const words = [
  { text: "Full-Stack", imgPath: "/images/ideas.svg" },
  { text: "ML-Powered", imgPath: "/images/concepts.svg" },
  { text: "Cloud-Native", imgPath: "/images/designs.svg" },
  { text: "Scalable", imgPath: "/images/code.svg" },
  { text: "Full-Stack", imgPath: "/images/ideas.svg" },
  { text: "ML-Powered", imgPath: "/images/concepts.svg" },
  { text: "Cloud-Native", imgPath: "/images/designs.svg" },
  { text: "Scalable", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Projects Shipped" },
  { value: 9, suffix: "+", label: "Technologies Mastered" },
  { value: 2, suffix: "", label: "Hackathon Wins" },
  { value: 2027, suffix: "", label: "Graduating Year" },
];

const logoIconsList = [
  { imgPath: "/images/logos/company-logo-1.png" },
  { imgPath: "/images/logos/company-logo-2.png" },
  { imgPath: "/images/logos/company-logo-3.png" },
  { imgPath: "/images/logos/company-logo-4.png" },
  { imgPath: "/images/logos/company-logo-5.png" },
  { imgPath: "/images/logos/company-logo-6.png" },
  { imgPath: "/images/logos/company-logo-7.png" },
  { imgPath: "/images/logos/company-logo-8.png" },
  { imgPath: "/images/logos/company-logo-9.png" },
  { imgPath: "/images/logos/company-logo-10.png" },
  { imgPath: "/images/logos/company-logo-11.png" },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "End-to-End Engineering",
    desc: "From database schema to deployed UI — I own the full stack and ship production-ready systems.",
  },
  {
    imgPath: "/images/chat.png",
    title: "AI & ML Integration",
    desc: "I build intelligent features using Python and ML pipelines that solve real-world problems.",
  },
  {
    imgPath: "/images/time.png",
    title: "Cloud-First Mindset",
    desc: "Architecting scalable, cost-efficient solutions on Google Cloud with modern DevOps practices.",
  },
];

const techStackImgs = [
  { name: "React.js", imgPath: "/images/logos/react.png" },
  { name: "Python", imgPath: "/images/logos/python.svg" },
  { name: "Node.js", imgPath: "/images/logos/node.png" },
  { name: "Three.js", imgPath: "/images/logos/three.png" },
  { name: "Git & GitHub", imgPath: "/images/logos/git.svg" },
];

const techStackIcons = [
  {
    name: "React.js",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Node.js",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Three.js",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & GitHub",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [];
const expLogos = [];

const achievements = [
  {
    id: "aiverse",
    rank: "1st Place",
    title: "AI VERSE 2.0 Hackathon",
    organizer: "AI VERSE · Intercollegiate",
    date: "2024",
    prize: "₹20,000",
    accent: "#f59e0b",
    icon: "🏆",
    description:
      "Built ProctoAI — an AI-powered exam proctoring system with real-time face detection, gaze tracking, and behavioral anomaly detection. Delivered a fully working prototype in under 24 hours.",
    tags: ["React", "Python", "OpenCV", "Google Cloud"],
  },
  {
    id: "codesphere",
    rank: "Rank 12",
    title: "CodeSphere Codethon",
    organizer: "GeeksforGeeks · National",
    date: "2024",
    prize: "National Ranking",
    accent: "#52aeff",
    icon: "🥇",
    description:
      "Secured 12th position nationally in a competitive programming contest testing algorithmic depth across data structures, graphs, and dynamic programming. Competed against thousands from top engineering colleges.",
    tags: ["DSA", "Algorithms", "Competitive Programming"],
  },
];

const certifications = [
  {
    id: "gcp",
    title: "Google Cloud Fundamentals",
    issuer: "Google Cloud",
    issued: "2024",
    accent: "#4285f4",
    credentialUrl: "#",
  },
  {
    id: "deeplearning",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    issued: "2024",
    accent: "#a78bfa",
    credentialUrl: "#",
  },
  {
    id: "amazon",
    title: "Full Stack Development",
    issuer: "Amazon",
    issued: "2024",
    accent: "#fb923c",
    credentialUrl: "#",
  },
];

const testimonials = [];

const projects = [
  {
    id: "cloudburst",
    priority: "hero",
    category: "AI / ML",
    status: "Live",
    title: "Cloudburst ML",
    tagline: "AI-Powered Cloudburst Prediction System",
    description:
      "Predicts extreme rainfall events using XGBoost trained on NOAA GFS atmospheric data. Integrates an NLP verification layer to cross-check predictions against live weather reports, served through an interactive Streamlit dashboard.",
    tags: ["Python", "XGBoost", "Streamlit", "NLP", "Scikit-learn", "Pandas", "NOAA GFS"],
    accent: "#06b6d4",
    badge: "AI / ML",
    imgPath: "/images/project1.png",
    github: "https://github.com/rohan-k-dev/cloudburst-prediction-model",
    demo: null,
    metrics: [
      { label: "Model", value: "XGBoost" },
      { label: "Data Source", value: "NOAA GFS" },
      { label: "NLP Layer", value: "Active" },
      { label: "Dashboard", value: "Streamlit" },
    ],
  },
  {
    id: "proctoai",
    priority: "hero",
    category: "AI / ML",
    status: "Live",
    title: "ProctoAI",
    tagline: "Real-Time AI Exam Proctoring Platform",
    description:
      "Won 1st place at AI VERSE 2.0 Hackathon (₹20K). Detects suspicious activity in real time using computer vision — face detection, gaze tracking, and behavioural anomaly scoring — with a live analytics dashboard for invigilators.",
    tags: ["React", "Node.js", "MongoDB", "AI/ML", "OpenCV", "FastAPI"],
    accent: "#52aeff",
    badge: "🏆 Hackathon Winner · ₹20K",
    imgPath: "/images/project2.png",
    github: "https://github.com/rohan-k-dev/ProctoAi",
    demo: null,
    metrics: [
      { label: "Detection", value: "Real-time" },
      { label: "Accuracy", value: "94%+" },
      { label: "Stack", value: "MERN + AI" },
      { label: "Award", value: "₹20,000" },
    ],
  },
  {
    id: "recruitiq",
    priority: "grid",
    category: "Analytics",
    status: "Live",
    title: "RecruitIQ",
    tagline: "Smart HR Analytics & Hiring Intelligence",
    description:
      "Automates resume screening with NLP, scores candidates by job-fit, and surfaces predictive hiring insights through a clean analytics dashboard. Cuts manual screening time by 70%+.",
    tags: ["React", "Python", "Node.js", "ML", "Analytics"],
    accent: "#a78bfa",
    badge: "Analytics",
    imgPath: "/images/project3.png",
    github: "https://github.com/rohan-k-dev/RecruitIQ",
    demo: null,
    metrics: [
      { label: "Screening", value: "Automated" },
      { label: "NLP Pipeline", value: "Active" },
    ],
  },
  {
    id: "unistation",
    priority: "grid",
    category: "Full Stack",
    status: "Live",
    title: "UniStation",
    tagline: "Campus Marketplace Platform",
    description:
      "Full-stack marketplace where students buy and sell products on campus. Features real-time listings, user authentication, and a clean product management interface built on the MERN stack.",
    tags: ["React", "Node.js", "MongoDB", "Express.js"],
    accent: "#fb923c",
    badge: "Full Stack",
    imgPath: "/images/project1.png",
    github: "https://github.com/rohan-k-dev/unistation-campus-marketplace",
    demo: null,
    metrics: [
      { label: "Stack", value: "MERN" },
      { label: "Auth", value: "JWT" },
    ],
  },
  {
    id: "quizapp",
    priority: "grid",
    category: "Full Stack",
    status: "Live",
    title: "Quiz App",
    tagline: "MERN Stack Quiz Platform",
    description:
      "Full-featured quiz platform with separate admin and student portals. Admins create and manage quizzes; students take timed assessments with instant scoring and result history.",
    tags: ["React", "Node.js", "MongoDB", "Express.js"],
    accent: "#34d399",
    badge: "Full Stack",
    imgPath: "/images/project2.png",
    github: "https://github.com/rohan-k-dev/quiz_app",
    demo: null,
    metrics: [
      { label: "Portals", value: "Admin + Student" },
      { label: "Stack", value: "MERN" },
    ],
  },
];

const socialImgs = [
  {
    name: "github",
    imgPath: "/images/logos/git.svg",
    url: "https://github.com/rohan-k-dev",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    url: "https://linkedin.com/in/rohan19725",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
    url: "#",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  achievements,
  certifications,
  testimonials,
  projects,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
