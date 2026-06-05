import type {
  NavLink,
  SocialLink,
  HeroData,
  AboutData,
  SkillCategory,
  Project,
  Experience,
  Achievement,
  Certification,
  ContactInfo,
  PersonalInfo,
  GitHubStatsData,
} from "./types";

// ─── Personal Info ───────────────────────────────────────────
export const personalInfo: PersonalInfo = {
  name: "Ayush Raj",
  title: "AI/ML Engineer | Software Developer | Problem Solver",
  college: "IIIT Bhubaneswar",
  degree: "B.Tech in Electronics and Telecommunication Engineering (2023–2027)",
  email: "ayush.raj6964@gmail.com",
  phone: "+91 6203589680",
  githubUsername: "Ayush-06-gif",
};

// ─── Navigation ──────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

// ─── Social Links ────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/Ayush-06-gif", // TODO: verify actual GitHub URL
    icon: "Github",
    ariaLabel: "Visit Ayush's GitHub profile",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ayush-raj0609/", // TODO: replace with actual LinkedIn URL
    icon: "Linkedin",
    ariaLabel: "Visit Ayush's LinkedIn profile",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ayush_raj0609/", // TODO: replace with actual Twitter/X URL
    icon: "Instagram",
    ariaLabel: "Visit Ayush's Instagram profile",
  },
  {
    name: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ayush.raj6964@gmail.com",
    icon: "Mail",
    ariaLabel: "Send Ayush an email via Gmail",
  },
];

// ─── Hero Section ────────────────────────────────────────────
export const heroData: HeroData = {
  greeting: "Hi, I'm",
  name: "Ayush Raj",
  roles: [
    "AI/ML Engineer",
    "LangChain Developer",
    "RAG Systems Builder",
    "DSA Enthusiast",
    "Problem Solver",
  ],
  bio: "B.Tech student at IIIT Bhubaneswar with hands-on experience in Machine Learning, NLP, Generative AI, and RAG systems. Skilled in building end-to-end ML pipelines, hybrid classification systems, and LLM-powered applications.",
  availableBadge: "Available for opportunities",
  ctaButtons: [
    { label: "View Projects", href: "#projects", variant: "primary" },
    {
      label: "Download Resume",
      href: "/resume.pdf", // The actual resume PDF URL
      variant: "secondary",
      icon: "Download",
    },
    { label: "Contact Me", href: "#contact", variant: "ghost" },
  ],
  codeSnippet: [
    'from langchain.chains import RetrievalQA',
    'from langchain.vectorstores import FAISS',
    'from langchain.embeddings import HuggingFaceEmbeddings',
    '',
    '# Build RAG pipeline',
    'embeddings = HuggingFaceEmbeddings(',
    '    model_name="all-MiniLM-L6-v2"',
    ')',
    'vectorstore = FAISS.from_documents(',
    '    documents, embeddings',
    ')',
    'qa_chain = RetrievalQA.from_chain_type(',
    '    llm=llm,',
    '    retriever=vectorstore.as_retriever(),',
    '    chain_type="stuff"',
    ')',
  ],
  techIcons: [
    { name: "Python", icon: "🐍" },
    { name: "Generative AI", icon: "🧠" },
    { name: "LLMs", icon: "🤖" },
    { name: "RAG", icon: "📚" },
    { name: "AI Agents", icon: "🤖" },
    { name: "LangChain", icon: "🔗" },
    { name: "Hugging Face", icon: "🤗" },
    { name: "NLP", icon: "💬" },
    { name: "FAISS", icon: "🔍" },
    { name: "FastAPI", icon: "⚡" },
  ],
};

// ─── About Section ───────────────────────────────────────────
export const aboutData: AboutData = {
  heading: "About Me",
  bio: "B.Tech student at IIIT Bhubaneswar with hands-on experience in Machine Learning, NLP, Generative AI, and RAG systems. Skilled in building end-to-end ML pipelines, hybrid classification systems, and LLM-powered applications. Strong foundation in Data Structures & Algorithms, competitive programming, and problem solving. Seeking opportunities in AI-driven and data-centric environments.",
  stats: [
    { label: "DSA Problems", value: "300+", icon: "Code2" },
    { label: "GenAI Projects", value: "5+", icon: "Brain" },
    { label: "Codeforces", value: "Expert", icon: "TrendingUp" },
    { label: "IIIT Bhubaneswar", value: "2023–2027", icon: "GraduationCap" },
  ],
  timeline: [
    {
      year: "Aug 2023",
      title: "Joined IIIT Bhubaneswar",
      description:
        "Started B.Tech in Electronics and Telecommunication Engineering. Began building strong CS fundamentals.",
    },
    {
      year: "2024",
      title: "Dived into ML/DL",
      description:
        "Explored Machine Learning and Deep Learning. Built first classification models and data pipelines.",
    },
    {
      year: "2025",
      title: "Mastered RAG & LangChain",
      description:
        "Built production-grade RAG systems, mastered LangChain, vector databases, and semantic retrieval.",
    },
    {
      year: "2026",
      title: "Multi-Agent AI & Leadership",
      description:
        "Built multi-agent AI research systems, earned certifications, became Placement Coordinator at IIIT Bhubaneswar.",
    },
  ],
};

// ─── Skills Section ──────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    label: "Programming & Backend",
    icon: "Code2",
    skills: [
      { name: "Python", icon: "https://skillicons.dev/icons?i=py" },
      { name: "C++", icon: "https://skillicons.dev/icons?i=cpp" },
      { name: "C", icon: "https://skillicons.dev/icons?i=c" },
      { name: "Java", icon: "https://skillicons.dev/icons?i=java" },
      { name: "FastAPI", icon: "https://skillicons.dev/icons?i=fastapi" },
      { name: "Flask", icon: "https://skillicons.dev/icons?i=flask" },
      { name: "Postman", icon: "https://skillicons.dev/icons?i=postman" },
    ],
  },
  {
    id: "ml-data",
    label: "Machine Learning & Data",
    icon: "Brain",
    skills: [
      { name: "TensorFlow", icon: "https://skillicons.dev/icons?i=tensorflow" },
      { name: "PyTorch", icon: "https://skillicons.dev/icons?i=pytorch" },
      { name: "Keras", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg" },
      { name: "Scikit-Learn", icon: "https://skillicons.dev/icons?i=sklearn" },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
      { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
      { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg" },
      { name: "OpenCV", icon: "https://skillicons.dev/icons?i=opencv" },
      { name: "SQLite", icon: "https://skillicons.dev/icons?i=sqlite" },
    ],
  },
  {
    id: "ai-genai",
    label: "AI / GenAI",
    icon: "Bot",
    skills: [
      { name: "LangChain", icon: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
      { name: "OpenAI", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
      { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
      { name: "LLMs", icon: "https://img.icons8.com/color/48/artificial-intelligence.png" },
      { name: "RAG", icon: "https://img.icons8.com/color/48/data-configuration.png" },
    ],
  },
  {
    id: "databases",
    label: "Databases & Caching",
    icon: "Database",
    skills: [
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
      { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
      { name: "Redis", icon: "https://skillicons.dev/icons?i=redis" },
      { name: "ChromaDB", icon: "https://avatars.githubusercontent.com/chroma-core" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    icon: "Cloud",
    skills: [
      { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
      { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
      { name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Design",
    icon: "PenTool",
    skills: [
      { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
      { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" },
      { name: "GitHub Actions", icon: "https://skillicons.dev/icons?i=githubactions" },
      { name: "n8n", icon: "https://avatars.githubusercontent.com/n8n-io" },
    ],
  },
];

// ─── Projects Section ────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "multi-agent-research",
    title: "Multi-Agent AI Research System",
    description: "Multi-agent AI research platform for autonomous retrieval and structured report generation.",
    techStack: [
      "LangChain",
      "LCEL",
      "Groq API",
      "BeautifulSoup",
      "Streamlit",
    ],
    features: [
      "Tavily AI for intelligent web retrieval",
      "LangChain LCEL Pipelines + Groq API",
    ],
    githubUrl: "https://github.com/Ayush-06-gif/Multi-Agent-System", // TODO: replace with actual GitHub link
    liveDemoUrl: "https://multi-agent-system-azjd.onrender.com/", // TODO: replace with actual live demo link
    gradient: "from-blue-500 to-cyan-500",
    image: "/projects/multi-agent-research.png",
  },
  {
    id: "rag-document-qa",
    title: "RAG-Based Document Q&A System",
    description: "Production-grade RAG system for accurate, grounded document Q&A.",
    techStack: [
      "Python",
      "LangChain",
      "OpenAI API",
      "HuggingFace",
      "FAISS",
      "Streamlit",
    ],
    features: [
      "HuggingFace embeddings + FAISS vector store",
      "OpenAI API for context-aware generation",
    ],
    githubUrl: "https://github.com/Ayush-06-gif/RAG-based-QA-system", // TODO: replace with actual GitHub link
    liveDemoUrl: null,
    gradient: "from-purple-500 to-pink-500",
    image: "/projects/rag-document-qa.png",
  },
  {
    id: "hybrid-log-classification",
    title: "Hybrid Log Classification System",
    description: "Hybrid log classification system combining Regex, BERT, and LLMs for system logs.",
    techStack: [
      "Python",
      "NLP",
      "BERT",
      "DeepSeek/Qwen LLM",
      "FastAPI",
      "Streamlit",
    ],
    features: [
      "Regex → BERT → LLM dynamic routing",
      "DeepSeek/Qwen fallback for edge cases",
    ],
    githubUrl: "https://github.com/Ayush-06-gif/Log-Classification-System",
    liveDemoUrl: null,
    gradient: "from-emerald-500 to-teal-500",
    image: "/projects/hybrid-log-classification.png",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis of Social Media Posts",
    description: "Machine learning NLP pipeline to classify social media sentiment.",
    techStack: [
      "Python",
      "NLP",
      "Scikit-learn",
      "Pandas",
      "NLTK",
    ],
    features: [
      "Custom tokenization & lemmatization pipeline",
      "High-accuracy classification models",
    ],
    githubUrl: "https://github.com/Ayush-06-gif/sentimental-analysis", // TODO: replace with actual GitHub link
    liveDemoUrl: null,
    gradient: "from-rose-500 to-orange-500",
    image: "/projects/sentiment-analysis.png",
  },
  {
    id: "file-compression",
    title: "File Compression Tool",
    description: "Efficient file compression utility built using the Huffman Coding algorithm.",
    techStack: [
      "C++",
      "Data Structures",
      "Huffman Coding",
    ],
    features: [
      "Lossless Huffman Coding compression",
      "Binary file I/O operations",
    ],
    githubUrl: "https://github.com/Ayush-06-gif/file-compression", // TODO: replace with actual GitHub link
    liveDemoUrl: null,
    gradient: "from-blue-600 to-indigo-600",
    image: "/projects/file-compression.png",
  },
  {
    id: "smart-fire-detector",
    title: "Smart Fire Detector",
    description: "End-to-end IoT system for real-time fire/smoke detection and automated alerts.",
    techStack: [
      "ESP8266",
      "Arduino IDE",
      "Node.js",
      "MongoDB",
      "IoT",
    ],
    features: [
      "Real-time sensor data ingestion & visualization",
      "Automated safety alerts and historical tracking",
    ],
    githubUrl: "https://github.com/Ayush-06-gif/Smart-Fire-Detector-ESP8266", // TODO: replace with actual GitHub link
    liveDemoUrl: "https://smart-fire-detector-esp-8266.vercel.app/",
    gradient: "from-red-500 to-rose-700",
    image: "/projects/smart-fire-detector.png",
  },
];

// ─── Experience Section ──────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: "placement-coordinator",
    role: "Placement Coordinator",
    organization: "IIIT Bhubaneswar",
    period: "2026 – Present",
    description:
      "Coordinating placement activities and mentoring peers for campus recruitment drives. Bridging the gap between students and industry opportunities.",
    type: "active",
    icon: "Users",
  },
  {
    id: "internship-placeholder",
    role: "Open to Internship Opportunities",
    organization: "Seeking AI/ML Internships",
    period: "Coming Soon",
    description:
      "Actively looking for internship opportunities in AI/ML, NLP, and data-centric environments.",
    type: "placeholder",
    icon: "Briefcase",
  },
  {
    id: "opensource-placeholder",
    role: "Open Source Contributions",
    organization: "In Progress",
    period: "Coming Soon",
    description:
      "Planning to contribute to open-source ML/AI projects and developer tools.",
    type: "placeholder",
    icon: "GitBranch",
  },
];

// ─── Achievements Section ────────────────────────────────────
export const achievements: Achievement[] = [
  {
    id: "leetcode",
    title: "LeetCode Problems Solved",
    value: "300+",
    numericValue: 300,
    suffix: "+",
    description: "Knight Badge achieved",
    icon: "Trophy",
  },
  {
    id: "codeforces",
    title: "Codeforces Expert",
    value: "Expert",
    numericValue: 1600,
    suffix: "",
    description: "Competitive programming rating achieved",
    icon: "TrendingUp",
  },
  {
    id: "projects-count",
    title: "AI/ML/GenAI Projects Built",
    value: "5+",
    numericValue: 5,
    suffix: "+",
    description: "Production-grade end-to-end systems",
    icon: "Brain",
  },
  {
    id: "coordinator",
    title: "Placement Coordinator",
    value: "IIIT",
    numericValue: 0,
    suffix: "",
    description: "IIIT Bhubaneswar — mentoring peers for recruitment",
    icon: "Users",
  },
];

// ─── Certifications Section ──────────────────────────────────
export const certifications: Certification[] = [
  {
    id: "deloitte-analytics",
    name: "Data Analytics",
    issuer: "Deloitte",
    date: "April 2026",
    certificateUrl: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a09cd2baf409d138341c105_1779029968011_completion_certificate.pdf", // TODO: replace with actual certificate URL
    image: "/certificates/deloitte-analytics.jpeg",
    icon: "BarChart3",
  },
  {
    id: "Simplilearn-AI",
    name: "Introduction to Artificial Intelligence",
    issuer: "Simplilearn",
    date: "April 2026",
    certificateUrl: "https://certificates.simplicdn.net/share/10254473_10528078_1779379175333.pdf", // TODO: replace with actual certificate URL
    image: "/certificates/Simplilearn-AI.jpeg",
    icon: "Bot",
  },
  {
    id: "ibm-genai",
    name: "Getting started withGenerative AI",
    issuer: "IBM",
    date: "2025",
    certificateUrl: "https://www.credly.com/badges/057062fd-2f73-4f78-a10b-a99021cec47a/public_url", // TODO: replace with actual certificate URL
    image: "/certificates/ibm-genai.jpeg",
    icon: "Sparkles",
  },
  {
    id: "google-llm",
    name: "Introduction to Large Language Models",
    issuer: "Google",
    date: "2025",
    certificateUrl: "https://www.skills.google/course_templates/539/badge", // TODO: replace with actual certificate URL
    image: "/certificates/google-llm.jpeg",
    icon: "GraduationCap",
  },
  {
    id: "Tata-genai",
    name: "Generative AI Powered Data Analytics",
    issuer: "TATA",
    date: "2025",
    certificateUrl: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_6a09cd2baf409d138341c105_1779378641510_completion_certificate.pdf", // TODO: replace with actual certificate URL
    image: "/certificates/Tata-genai.jpeg",
    icon: "Sparkles",
  },
  {
    id: "ibm-agentic",
    name: "Agentic AI Development",
    issuer: "IBM",
    date: "May 2026",
    certificateUrl: "https://www.credly.com/badges/4dce148d-8bff-4740-bd10-1969ca55bca6/public_url", // TODO: replace with actual certificate URL
    image: "/certificates/ibm-agentic.jpeg",
    icon: "Bot",
  },

];

// ─── Contact Section ─────────────────────────────────────────
export const contactInfo: ContactInfo = {
  email: "ayush.raj6964@gmail.com",
  phone: "+91 6203589680",
  location: "IIIT Bhubaneswar, India",
};

// ─── GitHub Stats ────────────────────────────────────────────
export const githubStatsData: GitHubStatsData = {
  username: "Ayush-06-gif",
  cards: [
    {
      title: "GitHub Stats",
      url: "https://github-readme-stats.vercel.app/api?username=Ayush-06-gif&show_icons=true&theme=radical&bg_color=0d1117&hide_border=true&title_color=3b82f6&icon_color=06b6d4&text_color=a1a1aa&cache_seconds=1800",
      alt: "Ayush Raj's GitHub Stats",
    },
    {
      title: "Top Languages",
      url: "https://github-readme-stats.vercel.app/api/top-langs/?username=Ayush-06-gif&layout=compact&theme=radical&bg_color=0d1117&hide_border=true&title_color=3b82f6&text_color=a1a1aa&cache_seconds=1800",
      alt: "Ayush Raj's Top Languages",
    },
    {
      title: "GitHub Streak",
      url: "https://github-readme-streak-stats.herokuapp.com/?user=Ayush-06-gif&theme=radical&background=0d1117&hide_border=true&ring=3b82f6&fire=06b6d4&currStreakLabel=3b82f6&cache_seconds=1800",
      alt: "Ayush Raj's GitHub Streak",
    },
  ],
};
