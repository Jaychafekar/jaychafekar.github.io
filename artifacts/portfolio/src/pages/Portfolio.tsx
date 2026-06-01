import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Send,
  Sun,
  Moon,
  Download,
  CheckCircle2,
  AlertCircle,
  Home,
  FolderOpen,
  Briefcase,
  Code2,
  ArrowUpRight,
  Layers,
  LayoutGrid,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const TYPED_ROLES = [
  "SOFTWARE ENGINEER",
  "FULL-STACK DEVELOPER",
  "CS STUDENT",
  "PROBLEM SOLVER",
];

const SKILLS = {
  "Languages": ["Java", "Python", "C", "C++", "C#", "JavaScript (ES6+)", "TypeScript", "SQL", "PHP"],
  "Frameworks & Libraries": ["React", "Django", "Spring Boot", "Flask", "Bootstrap", "Tailwind CSS", "TensorFlow", "Keras", "OpenCV"],
  "Databases": ["MySQL", "PostgreSQL", "SQLite", "MongoDB"],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "Postman", "Swagger", "Linux", "VS Code", "Figma", "CI/CD Pipelines"],
  "AI & ML": ["Deep Learning", "CNN Models", "LSTM Networks", "Computer Vision", "Deepfake Detection", "Minimax & Alpha-Beta Pruning"],
  "Concepts": ["Full-Stack Development", "RESTful APIs", "MVC Architecture", "Agile/Scrum", "OOP", "Data Structures & Algorithms", "System Design"],
};

const EXPERIENCE = [
  {
    company: "Sky Ltd",
    role: "Software Engineer",
    period: "Jan 2025 – Apr 2025",
    location: "London, UK",
    description: "Developed scalable web applications and enhanced user experiences using React and modularised backend systems. Collaborated with QA and backend teams, participated in code reviews, and documented core features to ensure maintainable, high-quality software.",
    highlights: [
      "Engineered a real-time React health platform for 5,000+ users, boosting dashboard performance by 30%",
      "Designed modular database schemas for 10+ modules, accelerating feature rollout",
      "Mentored 12 team members on architecture and coding standards",
      "Streamlined front-end code, reducing page load time from 2.5s to 1.9s",
      "Participated in code reviews, fixing 30+ critical bugs",
      "Authored technical documentation for 10 core features",
    ],
  },
  {
    company: "Technokraft Ltd",
    role: "Backend Developer",
    period: "Jun 2023 – Aug 2023",
    location: "India",
    description: "Built and maintained backend systems, RESTful APIs, and dashboards, improving data accessibility and operational efficiency for stakeholders.",
    highlights: [
      "Developed RESTful APIs for IT incident reporting, maintaining 99.9% uptime across 65+ weekly incidents",
      "Created 3 interactive dashboards, reducing reporting time by 25% for 50+ stakeholders",
      "Optimised 15+ SQL queries, improving response times by 20% for critical endpoints",
      "Automated incident tracking workflows, cutting manual effort by 30% across 3 IT teams",
      "Supported architecture and code design discussions",
    ],
  },
];

const PROJECTS = [
  {
    title: "PixelProof",
    subtitle: "Deepfake Detection & Prevention System",
    description: "An AI-powered web application that detects manipulated media using deep learning and computer vision. Analyzes uploaded images/videos to identify deepfakes through AI-based prediction models.",
    longDescription: "PixelProof tackles one of the most pressing challenges in the digital age — the proliferation of AI-generated fake media. Built with a custom CNN pipeline, the system preprocesses video frames, extracts facial regions using OpenCV, and passes them through a trained Keras model to produce a confidence score. The React frontend provides a clean drag-and-drop upload experience with real-time prediction feedback, while Flask serves as a lightweight inference API.",
    tech: ["Python", "Flask", "TensorFlow", "Keras", "OpenCV", "React", "JavaScript"],
    link: "https://github.com/Jaychafekar/PixelProof",
    highlights: ["Custom CNN deepfake detection model", "Real-time image/video analysis", "Flask REST API + React frontend", "OpenCV face extraction pipeline"],
    year: "2024",
  },
  {
    title: "Bookstore REST API",
    subtitle: "Java + JAX-RS Backend System",
    description: "A modular RESTful API supporting CRUD operations for 500+ books and customers. Achieved 100% automated test pass rate with Postman and 25% faster SQL query response times.",
    longDescription: "A production-grade backend built in Java using JAX-RS, designed to handle the complete lifecycle of a bookstore's operations. Exposes well-structured endpoints for managing book inventory, customer registration, shopping carts, and orders. MySQL powers the relational data model. Validated via 12+ weekly API scenarios using Postman. Swagger documentation enables seamless frontend integration.",
    tech: ["Java", "JAX-RS", "REST APIs", "MySQL", "Apache Tomcat", "Postman", "Swagger"],
    link: "https://github.com/Jaychafekar",
    highlights: ["500+ books & customers CRUD", "100% Postman automated test pass rate", "25% faster SQL query response times", "Full Swagger API documentation"],
    year: "2025",
  },
  {
    title: "Max Flow Network",
    subtitle: "Algorithm Implementation in Java",
    description: "Implemented the Edmonds-Karp algorithm optimising paths for 1,000+ nodes across multiple networks. Reduced runtime by 12% on complex large-scale datasets.",
    longDescription: "A graph algorithm project implementing the Edmonds-Karp max-flow algorithm — a BFS-based implementation of Ford-Fulkerson — capable of handling networks with 1,000+ nodes. Includes automated flow reports and debugging utilities that accelerated testing of 50+ scenarios. Technical documentation supports replication and knowledge transfer across development teams.",
    tech: ["Java", "Graph Algorithms", "BFS", "Data Structures"],
    link: "https://github.com/Jaychafekar",
    highlights: ["Edmonds-Karp algorithm for 1,000+ nodes", "12% runtime reduction on large datasets", "Automated flow reports & debugging utilities", "Documentation for 2 development teams"],
    year: "2025",
  },
  {
    title: "WeatherDashboard",
    subtitle: "iOS Weather App",
    description: "A native iOS weather application delivering real-time weather updates, forecasts, and interactive map visualisation. Built with MVVM architecture, CoreLocation, and SwiftData for local persistence.",
    longDescription: "A polished native iOS app built entirely in SwiftUI using MVVM architecture. Integrates the OpenWeather API for current conditions, hourly and 7-day forecasts, and UV index data. CoreLocation handles dynamic user location detection, while MapKit powers an interactive weather map overlay. SwiftData persists recently viewed cities locally, enabling fast load times and offline access.",
    tech: ["Swift", "SwiftUI", "MVVM", "OpenWeather API", "CoreLocation", "MapKit", "SwiftData"],
    link: "https://github.com/Jaychafekar",
    highlights: ["MVVM architecture in SwiftUI", "CoreLocation + MapKit integration", "7-day forecast & UV index", "SwiftData local persistence"],
    year: "2024",
  },
  {
    title: "Algorithms Project",
    subtitle: "AI & Graph Algorithms in Python",
    description: "BFS graph search for 1,000+ nodes, Tic-Tac-Toe AI with minimax and alpha-beta pruning, and optimised data structures achieving 35% efficiency improvement.",
    longDescription: "A collection of algorithm implementations demonstrating applied computer science. Includes BFS graph traversal for 1,000+ node networks, a Tic-Tac-Toe AI opponent using minimax with alpha-beta pruning for optimal gameplay, and data structure optimisations that increased algorithm efficiency by 35%. Structured documentation supports reproducibility and collaboration.",
    tech: ["Python", "Graph Algorithms", "BFS", "Minimax", "Alpha-Beta Pruning", "Data Structures"],
    link: "https://github.com/Jaychafekar",
    highlights: ["BFS for 1,000+ node graphs", "Minimax AI with alpha-beta pruning", "35% data structure efficiency gain", "Structured academic documentation"],
    year: "2025",
  },
  {
    title: "HealthCheck Web App",
    subtitle: "Team Health Monitoring Platform",
    description: "A full-stack team health monitoring platform with anonymous voting, department summaries, and management dashboards with role-based access control.",
    longDescription: "Django-powered platform for engineering teams to assess health across morale, delivery, and collaboration dimensions. Team members anonymously vote on indicators, and results aggregate into department summaries visible on a management dashboard. Role-based access separates team member, team lead, and admin views.",
    tech: ["Python", "Django", "SQLite", "HTML", "CSS", "Bootstrap", "JavaScript"],
    link: "https://github.com/Jaychafekar",
    highlights: ["Role-based access control (3 tiers)", "Anonymous voting system", "Department-level dashboards", "Historical trend visualisation"],
    year: "2024",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

// ─── Hook: Typing Animation ───────────────────────────────────────────────────

function useTypingAnimation(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseDuration = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (display.length < currentWord.length) {
        timeout = setTimeout(() => setDisplay(currentWord.slice(0, display.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseDuration);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), deletingSpeed);
      } else {
        setWordIndex((i) => i + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return display;
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProjectModal({ project, open, onClose }: { project: typeof PROJECTS[0] | null; open: boolean; onClose: () => void }) {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-border bg-card rounded-[22px]" data-testid="dialog-project-detail">
        <div className="p-8 md:p-12">
          <DialogHeader className="mb-8">
            <p className="font-mono text-primary text-sm mb-4 uppercase tracking-widest">{project.subtitle}</p>
            <DialogTitle className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{project.title}</DialogTitle>
            <DialogDescription className="sr-only">{project.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-12">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">{project.longDescription}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">Key Highlights</h4>
                <ul className="space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-sm font-mono text-foreground/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex gap-4">
              <Button asChild size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90 font-medium" data-testid={`button-github-${project.title}`}>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" /> View Repository
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full bg-transparent border-white/20 text-foreground hover:bg-white/5" onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

type FormStatus = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    if (!formspreeId) {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }, [form]);

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-[22px] border border-white/10 bg-[#111111]" data-testid="contact-success">
        <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-white">Message received</h3>
        <p className="text-white/50 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
        <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/5 bg-transparent text-white" onClick={() => setStatus("idle")}>Send another</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-white/50" htmlFor="name">Name</label>
          <Input id="name" name="name" required value={form.name} onChange={handleChange} disabled={status === "sending"} className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-white/10 bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 shadow-none text-white" data-testid="input-name" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-white/50" htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} disabled={status === "sending"} className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-white/10 bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 shadow-none text-white" data-testid="input-email" />
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <label className="text-xs font-mono uppercase tracking-widest text-white/50" htmlFor="message">Message</label>
        <Textarea id="message" name="message" rows={4} required value={form.message} onChange={handleChange} disabled={status === "sending"} className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-white/10 bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 shadow-none resize-none text-white" data-testid="input-message" />
      </div>
      
      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-destructive" data-testid="contact-error">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try emailing directly.
        </div>
      )}
      
      <div className="pt-6">
        <Button type="submit" size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90 w-full sm:w-auto min-w-32" disabled={status === "sending"} data-testid="button-submit-contact">
          {status === "sending" ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const typedRole = useTypingAnimation(TYPED_ROLES);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "skills", "projects", "contact"];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openProject = (project: typeof PROJECTS[0]) => { setSelectedProject(project); setModalOpen(true); };
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Split typed role into two display lines
  const twoWordRoles = ["SOFTWARE ENGINEER", "FULL-STACK DEVELOPER", "CS STUDENT", "PROBLEM SOLVER"];
  const [displayRoleIndex, setDisplayRoleIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDisplayRoleIndex(i => (i + 1) % twoWordRoles.length), 3400);
    return () => clearInterval(t);
  }, []);
  const [displayLine1, displayLine2] = twoWordRoles[displayRoleIndex].split(" ").reduce<[string, string]>(
    (acc, w, i, arr) => i < Math.ceil(arr.length / 2) ? [acc[0] + (acc[0] ? " " : "") + w, acc[1]] : [acc[0], acc[1] + (acc[1] ? " " : "") + w],
    ["", ""]
  );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-primary/30 selection:text-primary">
      {/* Icon-Only Pill Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <nav className="flex items-center gap-2 p-2 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-[14px]">
          <button 
            onClick={() => scrollToSection("hero")} 
            className={cn("p-2.5 rounded-[10px] transition-colors", activeSection === "hero" ? "bg-white/[0.12] text-white" : "text-white/60 hover:text-white")}
            data-testid="nav-hero"
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToSection("experience")} 
            className={cn("p-2.5 rounded-[10px] transition-colors", activeSection === "experience" ? "bg-white/[0.12] text-white" : "text-white/60 hover:text-white")}
            data-testid="nav-experience"
          >
            <Briefcase className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToSection("skills")} 
            className={cn("p-2.5 rounded-[10px] transition-colors", activeSection === "skills" ? "bg-white/[0.12] text-white" : "text-white/60 hover:text-white")}
            data-testid="nav-skills"
          >
            <Code2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToSection("projects")} 
            className={cn("p-2.5 rounded-[10px] transition-colors", activeSection === "projects" ? "bg-white/[0.12] text-white" : "text-white/60 hover:text-white")}
            data-testid="nav-projects"
          >
            <FolderOpen className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToSection("contact")} 
            className={cn("p-2.5 rounded-[10px] transition-colors", activeSection === "contact" ? "bg-white/[0.12] text-white" : "text-white/60 hover:text-white")}
            data-testid="nav-contact"
          >
            <Mail className="w-5 h-5" />
          </button>
        </nav>
        <button 
          className="p-3 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white transition-colors"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          data-testid="button-theme-toggle"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <main className="pb-24 pt-32">
        {/* ── Hero Section (Sawad Framer Aesthetic) ─────────────────────────────────── */}
        <section id="hero" className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-10 items-start">
          {/* Left Column - Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-[280px] shrink-0 bg-white rounded-[22px] p-7 relative"
          >
            <div className="absolute -bottom-4 -right-4">
              <div className="bg-primary text-white text-lg px-3 py-3 rounded-full shadow-lg rotate-12 border-4 border-[#0d0d0d]">
                🔥
              </div>
            </div>
            <div className="absolute inset-0 border border-primary/20 border-dashed m-4 pointer-events-none" style={{borderRadius: '50%'}}></div>

            <div className="w-[150px] h-[185px] mx-auto bg-gradient-to-b from-[#111] to-[#222] rounded-[14px] flex flex-col items-center justify-center shadow-inner relative overflow-hidden mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10">
                JC
              </div>
              <span className="text-[10px] text-white/40 mt-4 absolute bottom-4">Photo coming soon</span>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-[#111] font-bold text-xl mb-1">Jay Chafekar</h1>
              <p className="text-xs text-gray-500 font-medium">Eng @ Sky · CS @ Westminster</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <a href="https://github.com/Jaychafekar" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#111] hover:bg-gray-200 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/jay-chafekar" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#111] hover:bg-gray-200 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@example.com" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#111] hover:bg-gray-200 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <div className="mb-4">
              <div className="font-black text-[clamp(52px,6.5vw,96px)] text-white leading-[0.92] tracking-tight uppercase">
                {displayLine1}
              </div>
              <div className="font-black text-[clamp(52px,6.5vw,96px)] text-[#3a3a3a] leading-[0.92] tracking-tight uppercase">
                {displayLine2}
              </div>
            </div>

            <p className="text-sm text-white/40 max-w-md mb-8 leading-relaxed">
              Software engineer building scalable systems and elegant interfaces. Currently at Sky, previously developing backend solutions for incident management.
            </p>

            <div className="flex items-start gap-10 mb-8">
              {[
                { val: "+2", label: "YEARS OF\nEXPERIENCE" },
                { val: "+6", label: "PROJECTS\nCOMPLETED" },
                { val: "2", label: "COMPANIES\nWORKED AT" },
                { val: "+4", label: "CERTS\nEARNED" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div className="font-black text-4xl text-white leading-none">{val}</div>
                  <div className="text-[9px] font-bold text-white/35 uppercase tracking-wider mt-1.5 whitespace-pre-line leading-tight">{label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary rounded-2xl p-5 relative group overflow-hidden transition-transform hover:-translate-y-1 min-h-[110px]">
                <Layers className="w-6 h-6 text-white/80 mb-3" />
                <p className="text-white font-black text-xs tracking-widest leading-relaxed uppercase">
                  TYPESCRIPT · REACT ·<br/>NODE.JS · PYTHON
                </p>
                <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="bg-[#C2FF3D] rounded-2xl p-5 relative group overflow-hidden transition-transform hover:-translate-y-1 min-h-[110px]">
                <LayoutGrid className="w-6 h-6 text-[#111]/70 mb-3" />
                <p className="text-[#111] font-black text-xs tracking-widest leading-relaxed uppercase">
                  JAVA · DJANGO ·<br/>POSTGRESQL · AWS
                </p>
                <div className="absolute bottom-4 right-4 w-9 h-9 bg-[#111]/10 rounded-full flex items-center justify-center text-[#111] group-hover:bg-[#111] group-hover:text-[#C2FF3D] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-[#111] hover:bg-gray-200 font-bold px-8">
                <a href="/cv.pdf" download>Download CV</a>
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full text-white/60 hover:text-white px-6" onClick={() => scrollToSection("contact")}>
                Get In Touch →
              </Button>
            </div>
          </motion.div>
        </section>

        {/* ── Experience ───────────────────────────────────────────────────── */}
        <section id="experience" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 mt-20">
          <div className="mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
              <span className="text-primary font-mono text-sm tracking-widest">01 //</span> Experience
            </h3>
          </div>
          
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="group flex flex-col md:flex-row gap-8 p-8 rounded-[22px] bg-[#111111] border border-white/5 hover:border-primary/50 transition-colors relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary transition-colors"></div>
                <div className="w-full md:w-64 shrink-0">
                  <h4 className="text-xl font-bold text-white mb-1">{exp.company}</h4>
                  <p className="text-primary font-medium mb-2">{exp.role}</p>
                  <p className="text-sm text-white/40 font-mono">{exp.period}</p>
                  <p className="text-sm text-white/40">{exp.location}</p>
                </div>
                <div className="flex-1">
                  <p className="text-white/60 mb-6 leading-relaxed">{exp.description}</p>
                  <ul className="space-y-3">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-white/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────────────────────── */}
        <section id="skills" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5">
          <div className="mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
              <span className="text-primary font-mono text-sm tracking-widest">02 //</span> Skills
            </h3>
          </div>
          
          <div className="grid gap-10">
            {Object.entries(SKILLS).map(([category, skills]) => (
              <div key={category} className="grid md:grid-cols-[200px_1fr] gap-6 items-start">
                <h4 className="text-lg font-medium text-white/80">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-sm text-white/60 hover:border-primary hover:text-white transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────────────── */}
        <section id="projects" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5">
          <div className="mb-12 flex justify-between items-end">
            <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
              <span className="text-primary font-mono text-sm tracking-widest">03 //</span> Projects
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <div 
                key={i}
                className="group relative p-8 rounded-[22px] bg-[#111111] border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,92,43,0.1)] cursor-pointer flex flex-col h-full"
                onClick={() => openProject(project)}
                data-testid={`card-project-${i}`}
              >
                <div className="absolute top-8 right-8 text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors">
                  0{i + 1}
                </div>
                <div className="mb-6 flex-1 relative z-10">
                  <p className="font-mono text-primary text-xs uppercase tracking-widest mb-3">{project.subtitle}</p>
                  <h4 className="text-2xl font-bold text-white mb-4">{project.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-3">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <section id="contact" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4 mb-6">
                <span className="text-primary font-mono text-sm tracking-widest">04 //</span> Contact
              </h3>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Let's build something <br/>
                <span className="text-primary">together.</span>
              </h2>
              <p className="text-white/50 mb-8 max-w-md">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="space-y-4 font-mono text-sm">
                <a href="mailto:jay.chafekar@example.com" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" /> jay.chafekar@example.com
                </a>
                <a href="https://linkedin.com/in/jay-chafekar" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" /> linkedin.com/in/jay-chafekar
                </a>
              </div>
            </div>
            
            <div className="bg-[#111111] p-8 rounded-[22px] border border-white/5">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-white/30 font-mono flex flex-col items-center justify-center">
        <p>© {new Date().getFullYear()} Jay Chafekar. All rights reserved.</p>
      </footer>

      <ProjectModal project={selectedProject} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}