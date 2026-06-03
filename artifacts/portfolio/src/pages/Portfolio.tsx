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
  GraduationCap,
  Award,
  Phone,
  User,
  Database,
  Wrench,
  Lightbulb,
  Sparkles,
  Flame,
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
import certWebDesign from "@assets/WhatsApp_Image_2023-10-12_at_14.00.07_7dcdc44d_1780409546408.jpg";
import certCpp from "@assets/WhatsApp_Image_2023-10-12_at_14.00.06_b20f7e45_1780409576625.jpg";
import certWebDev from "@assets/WhatsApp_Image_2023-10-12_at_14.00.07_a711cfcc_1780409586571.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const TYPED_ROLES = [
  "SOFTWARE ENGINEER",
  "FULL-STACK DEVELOPER",
];

const SKILLS = [
  { category: "Languages", icon: Code2, items: ["Java", "Python", "JavaScript", "PHP", "SQL", "HTML5", "CSS3"] },
  { category: "Frameworks & Libraries", icon: Layers, items: ["Django", "Laravel", "Bootstrap", "jQuery", "FastAPI"] },
  { category: "Databases", icon: Database, items: ["MySQL", "SQLite", "Django ORM", "MongoDB"] },
  { category: "Tools & Platforms", icon: Wrench, items: ["Git", "GitHub", "VS Code", "Linux", "REST APIs", "Postman"] },
  { category: "Concepts", icon: Lightbulb, items: ["MVC Architecture", "Auth & Authorization", "Database Design", "Responsive Design", "Cybersecurity Basics"] },
  { category: "AI-Assisted Development", icon: Sparkles, items: ["GitHub Copilot", "Cursor", "Claude", "ChatGPT"] },
];

const EXPERIENCE = [
  {
    company: "London Success Academy",
    role: "Software Engineering Intern",
    period: "May 2026 – Present",
    location: "London (Remote)",
    description: "Building a full-stack web application covering REST APIs, user authentication, and database integration, within an Agile team environment.",
    highlights: [
      "Building a full-stack web app in Python and JavaScript covering REST APIs, user authentication, and database integration",
      "Working through weekly code reviews with mentors, pairing Git workflow and Agile practices with testing on what I push to GitHub",
    ],
  },
  {
    company: "Technokraft Ltd",
    role: "Backend Developer Intern",
    period: "Jun 2023 – Aug 2023",
    location: "Nashik, India",
    description: "Wrote internal REST APIs for an IT incident reporting workflow and worked on operational dashboards aimed at non-technical users.",
    highlights: [
      "Wrote internal REST APIs for an IT incident reporting workflow used by internal teams",
      "Worked on operational dashboards that pulled from those APIs, aimed mainly at non-technical users",
      "Tuned SQL on the slower reporting endpoints",
    ],
  },
];

const EDUCATION = {
  degree: "BSc (Hons) Computer Science",
  university: "University of Westminster, London",
  period: "Sep 2023 – Jul 2026",
  grade: "Predicted 2:1",
  coursework: [
    "Data Structures & Algorithms",
    "Database Systems",
    "Software Engineering",
    "Object-Oriented Programming",
    "Computer Networks",
    "Machine Learning & AI",
    "Web Development",
    "Operating Systems",
  ],
};

const CERTIFICATIONS = [
  { name: "Website Designing", issuer: "TechnoKraft Training & Solution", year: "2023", url: certWebDesign },
  { name: "Web Development", issuer: "TechnoKraft Training & Solution", year: "2023", url: certWebDev },
  { name: "C & C++ Programming", issuer: "TechnoKraft Training & Solution", year: "2022", url: certCpp },
];

const PROJECTS = [
  {
    title: "PixelProof",
    subtitle: "Deepfake Detection & Verification Platform",
    description: "Final-year project built as four Docker Compose services — a FastAPI inference API, a fine-tuned MobileNetV2 model, a React/Vite review UI, and a SQLite store. Reached 69.65% cross-dataset accuracy and 0.7772 ROC-AUC on a held-out corpus. Every verdict comes back HMAC-SHA256 signed over image hash, verdict, model version, and timestamp — a tamper-evident audit trail. Switched from a CNN-LSTM to MobileNetV2 after the temporal model kept overfitting. pytest covers signing, verification, and inference-error paths.",
    longDescription: "Final-year project built as four Docker Compose services — a FastAPI inference API, a fine-tuned MobileNetV2 model, a React/Vite review UI, and a SQLite store. Reached 69.65% cross-dataset accuracy and 0.7772 ROC-AUC on a held-out corpus. Every verdict comes back HMAC-SHA256 signed over image hash, verdict, model version, and timestamp — a tamper-evident audit trail. Switched from a CNN-LSTM to MobileNetV2 after the temporal model kept overfitting. pytest covers signing, verification, and inference-error paths.",
    tech: ["FastAPI", "TensorFlow", "MobileNetV2", "React", "Vite", "Docker", "SQLite", "pytest"],
    link: "https://github.com/Jaychafekar/PixelProof",
    highlights: ["69.65% cross-dataset accuracy, 0.7772 ROC-AUC", "HMAC-SHA256 tamper-evident verdict signing", "Four Docker Compose services", "pytest covers signing, verification, and inference-error paths"],
    year: "2025–26",
  },
  {
    title: "Bookstore REST API",
    subtitle: "Java + JAX-RS Backend System",
    description: "A layered Java REST service on JAX-RS — thin resource classes calling into a service layer, business logic kept unit-testable in isolation under JUnit. Books and customers modelled as related resources, with idempotent PUT/DELETE and POST for creation; proper HTTP status codes (201/204/404/409) rather than 200-for-everything. SQL persistence with indexed lookups on ISBN and customer ID. JAX-RS annotations generate a Swagger/OpenAPI spec that stays in sync with the code.",
    longDescription: "A layered Java REST service on JAX-RS — thin resource classes calling into a service layer, business logic kept unit-testable in isolation under JUnit. Books and customers modelled as related resources, with idempotent PUT/DELETE and POST for creation; proper HTTP status codes (201/204/404/409) rather than 200-for-everything. SQL persistence with indexed lookups on ISBN and customer ID. JAX-RS annotations generate a Swagger/OpenAPI spec that stays in sync with the code.",
    tech: ["Java", "JAX-RS", "SQL", "Swagger", "JUnit"],
    link: "https://github.com/Jaychafekar",
    highlights: ["Layered architecture — resource, service, persistence", "Proper HTTP status codes (201/204/404/409)", "SQL persistence with indexed lookups on ISBN and customer ID", "JAX-RS annotations generate a Swagger/OpenAPI spec"],
    year: "2025",
  },
  {
    title: "WeatherDashboard",
    subtitle: "iOS Weather App",
    description: "A native iOS weather app delivering real-time weather and forecasts with an interactive map view. Built with MVVM architecture using SwiftUI, CoreLocation for location services, MapKit for map visualisation, and SwiftData for local persistence. Integrates the OpenWeather API for current conditions and forecast data.",
    longDescription: "A native iOS weather app delivering real-time weather and forecasts with an interactive map view. Built with MVVM architecture using SwiftUI, CoreLocation for location services, MapKit for map visualisation, and SwiftData for local persistence. Integrates the OpenWeather API for current conditions and forecast data.",
    tech: ["Swift", "SwiftUI", "MVVM", "CoreLocation", "MapKit", "SwiftData", "OpenWeather API"],
    link: "https://github.com/Jaychafekar",
    highlights: ["MVVM architecture in SwiftUI", "CoreLocation + MapKit integration", "OpenWeather API for current conditions and forecast data", "SwiftData local persistence"],
    year: "2024",
  },
  {
    title: "HealthCheck Web App",
    subtitle: "Sky × University of Westminster — Industry Collaboration",
    description: "3-person team project with Sky engineers running code reviews and giving feedback throughout the module. Built the Django backend: a custom User model extending AbstractUser with five roles (employee, team lead, department lead, senior manager, admin), role-based access on every view, and a domain model across Departments, Teams, Sessions, Health Cards, and Votes. Wrote views, forms, and server-rendered Bootstrap templates for each role's dashboard, plus management commands for permission setup.",
    longDescription: "3-person team project with Sky engineers running code reviews and giving feedback throughout the module. Built the Django backend: a custom User model extending AbstractUser with five roles (employee, team lead, department lead, senior manager, admin), role-based access on every view, and a domain model across Departments, Teams, Sessions, Health Cards, and Votes. Wrote views, forms, and server-rendered Bootstrap templates for each role's dashboard, plus management commands for permission setup.",
    tech: ["Django", "Python", "Bootstrap", "SQL"],
    link: "https://github.com/Jaychafekar",
    highlights: ["Custom AbstractUser model with five role tiers", "Role-based access on every view", "Domain model: Departments, Teams, Sessions, Health Cards, Votes", "Industry code reviews from Sky engineers"],
    year: "2025",
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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("https://formsubmit.co/ajax/jaychafekar312003@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: "New message from your portfolio",
          _template: "table",
          _captcha: "false",
        }),
        signal: controller.signal,
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
    finally { clearTimeout(timeout); }
  }, [form]);

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="status" aria-live="polite"
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
        <div role="alert" aria-live="assertive" className="flex items-center gap-2 text-sm text-destructive" data-testid="contact-error">
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
      const sections = ["hero", "about", "experience", "skills", "projects", "education", "contact"];
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
  const twoWordRoles = ["SOFTWARE ENGINEER", "FULL-STACK DEVELOPER"];
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
            onClick={() => scrollToSection("about")} 
            className={cn("p-2.5 rounded-[10px] transition-colors", activeSection === "about" ? "bg-white/[0.12] text-white" : "text-white/60 hover:text-white")}
            data-testid="nav-about"
          >
            <User className="w-5 h-5" />
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
            onClick={() => scrollToSection("education")} 
            className={cn("p-2.5 rounded-[10px] transition-colors", activeSection === "education" ? "bg-white/[0.12] text-white" : "text-white/60 hover:text-white")}
            data-testid="nav-education"
          >
            <GraduationCap className="w-5 h-5" />
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
            className="w-full md:w-[300px] shrink-0 bg-white rounded-[28px] p-6 relative overflow-hidden"
          >
            {/* Decorative dashed orange arcs */}
            <div className="absolute -top-12 -left-10 w-44 h-44 rounded-full border-[3px] border-dashed border-primary/70 pointer-events-none" />
            <div className="absolute top-[42%] -left-16 w-48 h-48 rounded-full border-[3px] border-dashed border-primary/40 pointer-events-none" />

            <div className="relative z-10 w-full aspect-[4/5] rounded-[22px] bg-gradient-to-br from-primary to-orange-600 overflow-hidden mb-5">
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt="Jay Chafekar"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            <h1 className="relative z-10 text-center text-[#111] font-black text-3xl tracking-tight mb-3">Jay Chafekar</h1>

            <div className="relative z-10 flex justify-center mb-3">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Flame className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
            </div>

            <p className="relative z-10 text-center text-sm text-gray-500 font-medium leading-relaxed px-2 mb-6">
              A Software Engineer building full-stack web applications and AI-powered systems.
            </p>

            <div className="relative z-10 flex items-center justify-center gap-5">
              <a href="https://github.com/Jaychafekar" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-primary hover:text-orange-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/jay-chafekar" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-primary hover:text-orange-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:jaychafekar312003@gmail.com" aria-label="Email" className="text-primary hover:text-orange-600 transition-colors">
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
              Building full-stack web applications with Python/Django, FastAPI, React, and Java — crafting clean, testable, and production-ready digital experiences.
            </p>

            <div className="flex items-start gap-10 mb-8">
              {[
                { val: "3", label: "YEARS OF\nSTUDY" },
                { val: "4", label: "PROJECTS\nCOMPLETED" },
                { val: "2", label: "COMPANIES\nWORKED AT" },
                { val: "2:1", label: "PREDICTED\nDEGREE" },
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
                  PYTHON · DJANGO ·<br/>FASTAPI · REACT
                </p>
                <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="bg-[#C2FF3D] rounded-2xl p-5 relative group overflow-hidden transition-transform hover:-translate-y-1 min-h-[110px]">
                <LayoutGrid className="w-6 h-6 text-[#111]/70 mb-3" />
                <p className="text-[#111] font-black text-xs tracking-widest leading-relaxed uppercase">
                  JAVA · JAX-RS ·<br/>DOCKER · SQL
                </p>
                <div className="absolute bottom-4 right-4 w-9 h-9 bg-[#111]/10 rounded-full flex items-center justify-center text-[#111] group-hover:bg-[#111] group-hover:text-[#C2FF3D] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-[#111] hover:bg-gray-200 font-bold px-8">
                <a href={`${import.meta.env.BASE_URL}cv.pdf`} download="Jay_Chafekar_CV.pdf">Download CV</a>
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full text-white/60 hover:text-white px-6" onClick={() => scrollToSection("contact")}>
                Get In Touch →
              </Button>
            </div>
          </motion.div>
        </section>

        {/* ── About ────────────────────────────────────────────────────────── */}
        <section id="about" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 mt-20">
          <div className="mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
              <span className="text-primary font-mono text-sm tracking-widest">01 //</span> About Me
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Getting to <span className="text-primary">know me!</span>
            </h2>
            <div className="space-y-5 text-white/50 leading-relaxed">
              <p>
                I'm a BSc (Hons) Computer Science student at the University of Westminster, with hands-on experience building full-stack web applications. My focus lies in creating responsive user interfaces, building robust backend logic, and implementing secure development practices.
              </p>
              <p>
                I'm passionate about AI-powered systems, modern web development, and software engineering principles. I thrive on solving real-world problems through clean, maintainable code and continuously expanding my technical toolkit.
              </p>
            </div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────────────────── */}
        <section id="experience" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5">
          <div className="mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
              <span className="text-primary font-mono text-sm tracking-widest">02 //</span> Experience
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
              <span className="text-primary font-mono text-sm tracking-widest">03 //</span> Skills
            </h3>
            <p className="text-white/40 mt-3 ml-0 md:ml-[3.75rem]">Technologies I work with</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {SKILLS.map(({ category, icon: Icon, items }) => (
              <div
                key={category}
                className="bg-[#111111] border border-white/5 rounded-[22px] p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{category}</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {items.map((skill) => (
                    <span key={skill} className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white/60 hover:border-primary hover:text-white transition-colors cursor-default">
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
              <span className="text-primary font-mono text-sm tracking-widest">04 //</span> Projects
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
                <div className="flex flex-wrap gap-2 relative z-10 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 relative z-10" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-white/30 border border-white/5 px-3 py-1.5 rounded-full cursor-default">
                    <ExternalLink className="w-3.5 h-3.5" /> Demo coming soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education & Certifications ────────────────────────────────────── */}
        <section id="education" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5">
          <div className="mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
              <span className="text-primary font-mono text-sm tracking-widest">05 //</span> Education & Certifications
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Education Card */}
            <div className="p-8 rounded-[22px] bg-[#111111] border border-white/5 hover:border-primary/30 transition-colors flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{EDUCATION.university}</h4>
                  <p className="text-primary font-medium text-sm">{EDUCATION.degree}</p>
                  <p className="text-white/40 text-xs font-mono mt-1">{EDUCATION.period} · {EDUCATION.grade}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Key Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION.coursework.map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="p-8 rounded-[22px] bg-[#111111] border border-white/5 hover:border-primary/30 transition-colors flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C2FF3D]/10 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-[#C2FF3D]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Certifications</h4>
                  <p className="text-white/40 text-sm">Professional credentials & courses</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 p-4 rounded-[14px] bg-white/[0.03] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {cert.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-mono text-white/30 shrink-0 mt-0.5">{cert.year}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <section id="contact" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4 mb-6">
                <span className="text-primary font-mono text-sm tracking-widest">06 //</span> Contact
              </h3>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Let's build something <br/>
                <span className="text-primary">together.</span>
              </h2>
              <p className="text-white/50 mb-8 max-w-md">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="space-y-4 font-mono text-sm">
                <a href="mailto:jaychafekar312003@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" /> jaychafekar312003@gmail.com
                </a>
                <a href="tel:+447774939653" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" /> +44 7774 939653
                </a>
                <a href="https://github.com/Jaychafekar" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors">
                  <Github className="w-5 h-5" /> github.com/Jaychafekar
                </a>
                <a href="https://linkedin.com/in/jay-chafekar" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors">
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