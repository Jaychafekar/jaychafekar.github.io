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
  "Software Engineer",
  "AI Developer",
  "Full-Stack Builder",
  "Problem Solver",
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-border bg-card rounded-none" data-testid="dialog-project-detail">
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
                    <span key={t} className="text-sm font-mono text-muted-foreground bg-secondary px-3 py-1.5">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex gap-4">
              <Button asChild size="lg" className="rounded-none bg-foreground text-background hover:bg-foreground/90 font-medium" data-testid={`button-github-${project.title}`}>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" /> View Repository
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-none" onClick={onClose}>Close</Button>
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
        className="p-8 border border-border bg-secondary/30" data-testid="contact-success">
        <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">Message received</h3>
        <p className="text-muted-foreground mb-6">Thanks for reaching out. I'll get back to you soon.</p>
        <Button variant="outline" className="rounded-none" onClick={() => setStatus("idle")}>Send another</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground" htmlFor="name">Name</label>
          <Input id="name" name="name" required value={form.name} onChange={handleChange} disabled={status === "sending"} className="rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-border bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 rounded-none shadow-none" data-testid="input-name" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground" htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} disabled={status === "sending"} className="rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-border bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 rounded-none shadow-none" data-testid="input-email" />
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground" htmlFor="message">Message</label>
        <Textarea id="message" name="message" rows={4} required value={form.message} onChange={handleChange} disabled={status === "sending"} className="rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-border bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 shadow-none resize-none" data-testid="input-message" />
      </div>
      
      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-destructive" data-testid="contact-error">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try emailing directly.
        </div>
      )}
      
      <div className="pt-6">
        <Button type="submit" size="lg" className="rounded-none bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto min-w-32" disabled={status === "sending"} data-testid="button-submit-contact">
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
  
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openProject = (project: typeof PROJECTS[0]) => { setSelectedProject(project); setModalOpen(true); };
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      {/* Editorial Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm",
        scrolled ? "border-b border-border py-4" : "py-6"
      )}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <span className="font-mono font-bold tracking-tighter text-xl">JC.</span>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            {["experience", "skills", "projects", "contact"].map((s) => (
              <button 
                key={s} 
                onClick={() => scrollToSection(s)} 
                className="capitalize text-muted-foreground hover:text-foreground transition-colors relative group" 
                data-testid={`nav-${s}`}
              >
                {s}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} data-testid="button-theme-toggle">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
        <motion.div className="absolute bottom-0 left-0 h-[1px] bg-primary origin-left" style={{ width: progressWidth }} />
      </nav>

      <main className="pt-32 pb-24">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section id="hero" className="min-h-[75vh] flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-5xl">
            <motion.div variants={slideUp} className="mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-primary" />
              <span className="font-mono text-primary text-sm tracking-widest uppercase">Portfolio</span>
            </motion.div>
            
            <motion.h1 variants={slideUp} className="text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter text-foreground leading-[0.9] mb-8">
              Jay <br/>Chafekar.
            </motion.h1>
            
            <motion.h2 variants={slideUp} className="text-2xl md:text-4xl font-light text-muted-foreground mb-12 flex items-center gap-2">
              <span className="font-serif italic text-foreground/70">I am a</span>
              <span className="font-medium text-foreground">{typedRole}</span>
              <span className="inline-block w-0.5 h-[1em] bg-primary animate-pulse ml-1" />
            </motion.h2>
            
            <motion.div variants={slideUp} className="flex flex-wrap gap-6 items-center">
              <Button size="lg" onClick={() => scrollToSection("projects")} className="rounded-none bg-foreground text-background hover:bg-foreground/90 font-medium" data-testid="button-view-projects">
                View Projects
              </Button>
              <Button size="lg" variant="ghost" onClick={() => scrollToSection("contact")} className="rounded-none hover:bg-transparent hover:text-primary transition-colors px-0" data-testid="button-contact">
                Get In Touch <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="ghost" asChild className="rounded-none hover:bg-transparent hover:text-primary transition-colors px-0 text-muted-foreground" data-testid="button-download-cv">
                <a href="/cv.pdf" download="Jay_Chafekar_CV.pdf">
                  Download CV <Download className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Experience ───────────────────────────────────────────────────── */}
        <section id="experience" className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={slideUp} className="mb-16">
              <h3 className="text-4xl font-bold tracking-tight mb-2">Experience</h3>
              <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">01 // Work History</p>
            </motion.div>

            <div className="space-y-20">
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={i} variants={slideUp} className="group relative">
                  <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
                    <div className="md:text-right border-l md:border-l-0 md:border-r border-border pl-6 md:pl-0 md:pr-6 md:py-2">
                      <h4 className="text-2xl font-bold text-foreground">{exp.company}</h4>
                      <p className="text-primary font-medium mt-1 mb-3">{exp.role}</p>
                      <p className="text-sm font-mono text-muted-foreground mb-1">{exp.period}</p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <div>
                      <p className="text-lg text-foreground/80 leading-relaxed mb-6">{exp.description}</p>
                      <ul className="space-y-3">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-4 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors mt-2.5 shrink-0" />
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Skills ───────────────────────────────────────────────────────── */}
        <section id="skills" className="py-24 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.div variants={slideUp} className="mb-16">
                <h3 className="text-4xl font-bold tracking-tight mb-2">Expertise</h3>
                <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">02 // Technical Skills</p>
              </motion.div>

              <div className="grid gap-12 max-w-4xl">
                {Object.entries(SKILLS).map(([category, items], i) => (
                  <motion.div key={category} variants={slideUp} className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
                    <h4 className="font-mono text-sm font-semibold tracking-widest uppercase text-foreground/80 pt-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 text-sm font-medium text-muted-foreground bg-background border border-border/50 hover:border-primary/50 hover:text-foreground transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────────────── */}
        <section id="projects" className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={slideUp} className="mb-16 flex items-end justify-between">
              <div>
                <h3 className="text-4xl font-bold tracking-tight mb-2">Selected Works</h3>
                <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">03 // Projects</p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((project, i) => (
                <motion.div 
                  key={project.title} 
                  variants={slideUp} 
                  className="group relative bg-background border border-border p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_hsl(var(--primary))]"
                >
                  <div className="absolute top-6 right-8 text-4xl font-bold text-muted/30 font-mono pointer-events-none transition-colors group-hover:text-primary/10">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  
                  <p className="font-mono text-xs tracking-widest uppercase text-primary mb-4">{project.subtitle}</p>
                  <h4 className="text-2xl font-bold mb-4 pr-12">{project.title}</h4>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1">{t}</span>
                    ))}
                    {project.tech.length > 4 && <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1">+{project.tech.length - 4}</span>}
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-6">
                    <button 
                      onClick={() => openProject(project)}
                      className="text-sm font-semibold tracking-wide flex items-center gap-2 hover:text-primary transition-colors"
                      data-testid={`button-details-${project.title}`}
                    >
                      View Details <ExternalLink className="w-4 h-4" />
                    </button>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-foreground transition-colors p-2"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <section id="contact" className="py-32 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-2 gap-16">
              <motion.div variants={slideUp}>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Let's build<br/>something.</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-12">
                  Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                <div className="space-y-4 font-mono text-sm tracking-wide">
                  <a href="mailto:chafekarjay12@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" /> chafekarjay12@gmail.com
                  </a>
                  <a href="https://github.com/Jaychafekar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" /> github.com/Jaychafekar
                  </a>
                  <a href="https://linkedin.com/in/jaychafekar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" /> linkedin.com/in/jaychafekar
                  </a>
                </div>
              </motion.div>
              
              <motion.div variants={slideUp} className="bg-background">
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm font-mono text-muted-foreground border-t border-border bg-secondary/10">
        <p>Designed & Built by Jay Chafekar © {new Date().getFullYear()}</p>
      </footer>

      <ProjectModal project={selectedProject} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
