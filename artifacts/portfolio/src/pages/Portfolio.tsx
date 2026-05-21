import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Send,
  Code2,
  Cpu,
  Database,
  Network,
  Wrench,
  Sun,
  Moon,
  Download,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
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

// ─── Data ────────────────────────────────────────────────────────────────────

const TYPED_ROLES = [
  "Software Engineer",
  "AI Developer",
  "Full-Stack Builder",
  "Problem Solver",
];

const STATS = [
  { value: 6, label: "Projects Built", suffix: "+" },
  { value: 2, label: "Work Experiences", suffix: "" },
  { value: 3, label: "Certifications", suffix: "" },
  { value: 2, label: "Years Learning", suffix: "+" },
];

const SKILLS = {
  Languages: ["Java", "Python", "C", "C++", "C#", "JavaScript (ES6+)", "TypeScript", "SQL", "PHP"],
  "Frameworks & Libraries": ["React", "Django", "Spring Boot", "Flask", "Bootstrap", "Tailwind CSS", "TensorFlow", "Keras", "OpenCV"],
  Databases: ["MySQL", "PostgreSQL", "SQLite", "MongoDB"],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "Postman", "Swagger", "Linux", "VS Code", "Figma", "CI/CD Pipelines"],
  "AI & ML": ["Deep Learning", "CNN Models", "LSTM Networks", "Computer Vision", "Deepfake Detection", "Minimax & Alpha-Beta Pruning"],
  Concepts: ["Full-Stack Development", "RESTful APIs", "MVC Architecture", "Agile/Scrum", "OOP", "Data Structures & Algorithms", "System Design"],
};

const EXPERIENCE = [
  {
    company: "Sky Ltd",
    role: "Software Engineer",
    period: "January 2025 – April 2025",
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
    period: "June 2023 – August 2023",
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

const CERTIFICATIONS = [
  { title: "C & C++ Programming Certification", issuer: "TechnoKraft Training & Solution Pvt. Ltd.", year: "2022" },
  { title: "Website Designing Certification", issuer: "TechnoKraft Training & Solution Pvt. Ltd.", year: "2023" },
  { title: "Web Development Certification", issuer: "TechnoKraft Training & Solution Pvt. Ltd.", year: "2023" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Typing Animation Hook ────────────────────────────────────────────────────

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

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.floor(latest) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── Project Modal ────────────────────────────────────────────────────────────

function ProjectModal({ project, open, onClose }: { project: typeof PROJECTS[0] | null; open: boolean; onClose: () => void }) {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-project-detail">
        <DialogHeader>
          <p className="font-mono text-primary text-sm mb-1">{project.subtitle}</p>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="sr-only">{project.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-2">
          <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Key Highlights</h4>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />{h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-sm font-mono text-foreground bg-secondary/60 px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button asChild size="sm" data-testid={`button-github-${project.title}`}>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> View on GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
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
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-12 text-center" data-testid="contact-success">
        <CheckCircle2 className="w-14 h-14 text-primary" />
        <h3 className="text-xl font-semibold">Message received!</h3>
        <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>Send another</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left" data-testid="form-contact">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">Name</label>
          <Input id="name" name="name" placeholder="John Doe" required value={form.name} onChange={handleChange} disabled={status === "sending"} data-testid="input-name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required value={form.email} onChange={handleChange} disabled={status === "sending"} data-testid="input-email" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="message">Message</label>
        <Textarea id="message" name="message" placeholder="Hello Jay..." rows={5} required value={form.message} onChange={handleChange} disabled={status === "sending"} data-testid="input-message" />
      </div>
      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-destructive" data-testid="contact-error">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try emailing directly at chafekarjay12@gmail.com.
        </div>
      )}
      <Button type="submit" className="w-full" size="lg" disabled={status === "sending"} data-testid="button-submit-contact">
        {status === "sending" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />Sending...
          </span>
        ) : (
          <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
        )}
      </Button>
    </form>
  );
}

// ─── Main Portfolio Component ─────────────────────────────────────────────────

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const typedRole = useTypingAnimation(TYPED_ROLES);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProject = (project: typeof PROJECTS[0]) => { setSelectedProject(project); setModalOpen(true); };
  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono font-bold text-primary text-xl">JC.</span>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            {["about", "experience", "skills", "projects", "contact"].map((s) => (
              <button key={s} onClick={() => scrollToSection(s)} className="capitalize hover:text-primary transition-colors" data-testid={`nav-${s}`}>{s}</button>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} data-testid="button-theme-toggle">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center py-20 relative">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl -z-10" />

          <motion.div className="flex flex-col-reverse md:flex-row items-center gap-12" initial="hidden" animate="show" variants={staggerContainer}>
            <div className="flex-1 space-y-6">
              <motion.div variants={slideUp}>
                <span className="font-mono text-primary mb-2 block text-sm tracking-widest uppercase">Hi, my name is</span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Jay Chafekar.</h1>
                <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground mt-3 min-h-[1.2em] flex items-center gap-1">
                  <span>{typedRole}</span>
                  <span className="inline-block w-0.5 h-[1em] bg-primary animate-pulse ml-0.5" />
                </h2>
              </motion.div>
              <motion.p variants={slideUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                BSc Computer Science graduate from the University of Westminster. Experienced in full-stack development, RESTful APIs, and AI-powered systems — with real-world delivery at Sky Ltd.
              </motion.p>
              <motion.div variants={slideUp} className="flex flex-wrap gap-3 pt-4">
                <Button size="lg" onClick={() => scrollToSection("projects")} className="font-medium group" data-testid="button-view-projects">
                  View Projects <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")} data-testid="button-contact">Get In Touch</Button>
                <Button size="lg" variant="secondary" asChild data-testid="button-download-cv">
                  <a href="/cv.pdf" download="Jay_Chafekar_CV.pdf">
                    <Download className="w-4 h-4 mr-2" /> Download CV
                  </a>
                </Button>
              </motion.div>
            </div>

            <motion.div variants={slideUp} className="w-64 h-64 md:w-80 md:h-80 relative shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl rotate-6" />
              <img src="/avatar.png" alt="Jay Chafekar" className="w-full h-full object-cover rounded-2xl relative z-10 border border-border shadow-2xl" data-testid="img-avatar" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Stats Bar ────────────────────────────────────────────────────── */}
        <motion.section className="py-12 border-y border-border/50 my-4" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={slideUp} className="space-y-1">
                <p className="text-4xl font-bold text-primary font-mono"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── About ────────────────────────────────────────────────────────── */}
        <motion.section id="about" className="py-24" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">About Me</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>
          <motion.div variants={slideUp} className="grid md:grid-cols-2 gap-12 text-lg text-muted-foreground leading-relaxed">
            <div className="space-y-6">
              <p>
                I'm a Computer Science graduate from the University of Westminster with hands-on experience in full-stack development, RESTful APIs, and algorithm optimisation. I enjoy building applications that combine clean frontends with powerful backend systems and intelligent AI-driven features.
              </p>
              <p>
                My expertise spans Java, Python, C++, JavaScript, React, Django, and SQL. I've delivered real-world projects at Sky Ltd, where I engineered a React health platform used by 5,000+ users and mentored a team of 12.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                Beyond writing code, I'm deeply interested in system design, algorithm optimisation, and building scalable products. I'm always learning — with the long-term goal of building innovative AI-powered solutions that reach real users at scale.
              </p>
              <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
                <h3 className="text-foreground font-semibold mb-3">Languages</h3>
                <div className="flex gap-4 text-base">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> English — Fluent</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Hindi — Native</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ── Experience ───────────────────────────────────────────────────── */}
        <motion.section id="experience" className="py-24" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Experience</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-10">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div key={exp.company} variants={slideUp} className="md:pl-16 relative">
                  <div className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-card border border-border items-center justify-center text-primary shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="p-8 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors" data-testid={`card-experience-${idx}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                        <p className="text-primary font-semibold">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{exp.period}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{exp.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-5 leading-relaxed">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <motion.div variants={slideUp} className="mt-12 p-8 bg-card border border-border rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6" data-testid="card-education">
            <div className="flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center text-primary shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-foreground">BSc Computer Science</h3>
                  <p className="text-primary font-semibold">University of Westminster</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />September 2023 – Present</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />London, UK</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-3">Key Modules: Data Structures & Algorithms, Software Development, AI & Machine Learning, Databases, Networks & Security</p>
            </div>
          </motion.div>
        </motion.section>

        {/* ── Skills ───────────────────────────────────────────────────────── */}
        <motion.section id="skills" className="py-24" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Technical Arsenal</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(SKILLS).map(([category, skills], idx) => {
              const icons = [Code2, FrameworkIcon, Database, Wrench, Cpu, Network];
              const Icon = icons[idx % icons.length];
              return (
                <motion.div key={category} variants={slideUp} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><Icon className="w-5 h-5" /></div>
                    <h3 className="font-semibold text-foreground">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full font-medium font-mono">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── Projects ─────────────────────────────────────────────────────── */}
        <motion.section id="projects" className="py-24" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Featured Work</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.title}
                variants={slideUp}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer flex flex-col"
                onClick={() => openProject(project)}
                data-testid={`card-project-${project.title}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-primary text-xs uppercase tracking-wider">{project.year}</p>
                  <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded font-mono">{project.tech[0]}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{project.title}</h3>
                <p className="text-xs text-primary/80 mb-3 font-medium">{project.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs font-mono text-foreground bg-secondary/50 px-2 py-0.5 rounded">{t}</span>
                  ))}
                  {project.tech.length > 3 && <span className="text-xs font-mono text-muted-foreground px-2 py-0.5">+{project.tech.length - 3}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    onClick={(e) => { e.stopPropagation(); openProject(project); }}
                    data-testid={`button-details-${project.title}`}
                  >
                    View Details <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-github-${project.title}`}>
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Certifications ───────────────────────────────────────────────── */}
        <motion.section id="certifications" className="py-24" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Certifications</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {CERTIFICATIONS.map((cert) => (
              <motion.div key={cert.title} variants={slideUp}
                className="p-6 bg-card border border-border rounded-xl flex flex-col gap-3 hover:border-primary/40 transition-colors" data-testid={`card-cert-${cert.year}`}>
                <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">{cert.year}</span>
                <h3 className="font-semibold text-foreground leading-snug">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <motion.section id="contact" className="py-24 max-w-2xl mx-auto text-center" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.h2 variants={slideUp} className="text-4xl font-bold mb-4">Get In Touch</motion.h2>
          <motion.p variants={slideUp} className="text-muted-foreground mb-8">
            I'm open to new opportunities, collaborations, and interesting conversations. Drop me a message and I'll get back to you as soon as possible.
          </motion.p>
          <motion.div variants={slideUp} className="flex justify-center gap-6 mb-10">
            <a href="mailto:chafekarjay12@gmail.com" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-email-contact">
              <Mail className="w-4 h-4" /> chafekarjay12@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/jay-chafekar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin-contact">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </motion.div>
          <motion.div variants={slideUp}><ContactForm /></motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-muted-foreground">© 2026 Jay Chafekar. Built with React & Vite.</p>
          <div className="flex items-center gap-6">
            <a href="mailto:chafekarjay12@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-email"><Mail className="w-5 h-5" /></a>
            <a href="https://github.com/Jaychafekar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-github"><Github className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/jay-chafekar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      <ProjectModal project={selectedProject} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function FrameworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" />
    </svg>
  );
}
