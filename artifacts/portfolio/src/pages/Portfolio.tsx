import React, { useState } from "react";
import { motion } from "framer-motion";
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
  TerminalSquare,
  Network,
  Wrench,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// We'll just define the content here and use it in the component.

const SKILLS = {
  Languages: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  "Frameworks & Libraries": ["Django", "Flask", "React", "Next.js", "Bootstrap", "Tailwind CSS", "TensorFlow", "Keras", "OpenCV", "Streamlit"],
  Databases: ["MySQL", "SQLite", "PostgreSQL", "MongoDB"],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "VS Code", "Linux", "REST APIs", "Postman", "Figma"],
  "AI & ML": ["Deep Learning", "CNN Models", "LSTM Networks", "Computer Vision", "Deepfake Detection Systems"],
  Concepts: ["Full-Stack Development", "System Design", "MVC Architecture", "Authentication & Authorization", "API Development", "Agile Development"],
};

const PROJECTS = [
  {
    title: "PixelProof",
    subtitle: "Deepfake Detection & Prevention System",
    description:
      "An AI-powered web application designed to detect manipulated media using deep learning and computer vision techniques. Analyzes uploaded images/videos and identifies potential deepfakes through AI-based prediction models.",
    tech: ["Python", "Flask", "TensorFlow", "Keras", "OpenCV", "Streamlit", "React", "JavaScript"],
    link: "https://github.com/Jaychafekar/PixelProof",
  },
  {
    title: "WeatherDashboard",
    subtitle: "iOS Weather App",
    description:
      "A native iOS weather application delivering real-time weather updates, forecasts, and interactive map visualisation. Clean MVVM architecture with location services, API integration, and local data persistence.",
    tech: ["Swift", "SwiftUI", "MVVM", "OpenWeather API", "CoreLocation", "MapKit", "SwiftData"],
    link: "https://github.com/Jaychafekar",
  },
  {
    title: "BookstoreAPI",
    subtitle: "RESTful Backend System",
    description:
      "A scalable REST API for managing books, customers, carts, and orders with validation, exception handling, and full CRUD operations following REST architecture principles.",
    tech: ["Java", "JAX-RS", "REST APIs", "MySQL", "Apache Tomcat", "Postman"],
    link: "https://github.com/Jaychafekar",
  },
  {
    title: "HealthCheck Web App",
    subtitle: "Team Health Monitoring Platform",
    description:
      "A full-stack team health monitoring platform for tracking team wellbeing, voting systems, department summaries, and management dashboards with role-based access control.",
    tech: ["Python", "Django", "SQLite", "HTML", "CSS", "Bootstrap", "JavaScript"],
    link: "https://github.com/Jaychafekar",
  },
];

const CERTIFICATIONS = [
  "C & C++ Programming Certification — TechnoKraft Training & Solution Pvt. Ltd. (2022)",
  "Website Designing Certification — TechnoKraft Training & Solution Pvt. Ltd. (2023)",
  "Web Development Certification — TechnoKraft Training & Solution Pvt. Ltd. (2023)",
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono font-bold text-primary text-xl">JC.</span>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection("skills")} className="hover:text-primary transition-colors">Skills</button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-primary transition-colors">Projects</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">Contact</button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Hero Section */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center py-20 relative">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl -z-10" />
          
          <motion.div 
            className="flex flex-col-reverse md:flex-row items-center gap-12"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <div className="flex-1 space-y-6">
              <motion.div variants={slideUp}>
                <span className="font-mono text-primary mb-2 block">Hi, my name is</span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                  Jay Chafekar.
                </h1>
                <h2 className="text-3xl md:text-5xl font-semibold text-muted-foreground mt-2">
                  I build intelligent systems.
                </h2>
              </motion.div>
              
              <motion.p variants={slideUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Computer Science student passionate about software engineering, AI, and scalable product development. I bridge the gap between complex backend systems and clean user experiences.
              </motion.p>
              
              <motion.div variants={slideUp} className="flex gap-4 pt-4">
                <Button size="lg" onClick={() => scrollToSection("projects")} className="font-medium group" data-testid="button-view-projects">
                  View Projects
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")} data-testid="button-contact">
                  Get In Touch
                </Button>
              </motion.div>
            </div>
            
            <motion.div variants={slideUp} className="w-64 h-64 md:w-80 md:h-80 relative shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl rotate-6" />
              <img 
                src="/avatar.png" 
                alt="Jay Chafekar" 
                className="w-full h-full object-cover rounded-2xl relative z-10 border border-border shadow-2xl"
                data-testid="img-avatar"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section 
          id="about" 
          className="py-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">About Me</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>
          
          <motion.div variants={slideUp} className="grid md:grid-cols-2 gap-12 text-lg text-muted-foreground leading-relaxed">
            <div className="space-y-6">
              <p>
                I'm a Computer Science student at the University of Westminster passionate about software engineering, AI, and scalable product development. I enjoy building full-stack applications that combine clean frontend experiences with powerful backend systems and intelligent AI-driven features.
              </p>
              <p>
                My skills include Java, Python, Django, React, Next.js, REST APIs, SQL, and modern web technologies. Beyond coding, I'm deeply interested in system design, problem-solving, automation, and building real-world products that create impact.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                I'm constantly learning, experimenting, and pushing myself to grow as a developer with the long-term goal of building innovative technology products and AI-powered solutions.
              </p>
              <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
                <h3 className="text-foreground font-semibold mb-2">Core Focus Areas</h3>
                <ul className="space-y-2 text-base">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Full-Stack Architecture</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> AI & Machine Learning Integration</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Scalable Backend Systems</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          id="skills" 
          className="py-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Technical Arsenal</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(SKILLS).map(([category, skills], idx) => {
              const icons = [Code2, Framework, Database, Wrench, Cpu, Network];
              const Icon = icons[idx % icons.length];
              
              return (
                <motion.div 
                  key={category} 
                  variants={slideUp}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full font-medium font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="py-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Featured Work</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>

          <div className="space-y-12">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.title}
                variants={slideUp}
                className="group relative grid md:grid-cols-12 gap-8 items-center"
              >
                <div className={`md:col-span-7 lg:col-span-8 p-8 rounded-2xl bg-card border border-border group-hover:border-primary/30 transition-colors z-10 ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <p className="font-mono text-primary text-sm mb-2">{project.subtitle}</p>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="text-sm font-mono text-foreground bg-secondary/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                      <Github className="w-5 h-5" /> View Source
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section 
          id="certifications" 
          className="py-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Certifications</h2>
            <div className="h-px bg-border flex-1" />
          </motion.div>

          <div className="grid gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div 
                key={idx}
                variants={slideUp}
                className="p-6 bg-card border border-border rounded-xl flex items-start gap-4"
              >
                <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="font-medium text-foreground">{cert}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-24 max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={slideUp} className="text-4xl font-bold mb-4">Get In Touch</motion.h2>
          <motion.p variants={slideUp} className="text-muted-foreground mb-12">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </motion.p>

          <motion.form variants={slideUp} className="space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); alert("Message form is for demonstration."); }}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Hello Jay..." rows={5} required />
            </div>
            <Button type="submit" className="w-full" size="lg" data-testid="button-submit-contact">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </motion.form>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-muted-foreground">
            Built by Jay Chafekar.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:chafekarjay12@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/Jaychafekar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-github">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/jay-chafekar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper icon
function Framework(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  )
}
