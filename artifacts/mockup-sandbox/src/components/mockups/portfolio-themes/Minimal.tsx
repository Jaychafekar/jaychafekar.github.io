import { useState, useEffect } from "react";

const roles = ["Software Engineer", "Full-Stack Developer", "CS Student"];

export function Minimal() {
  const [typed, setTyped] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setTyped(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setTyped(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        } else {
          setDeleting(false);
          setRoleIndex(i => (i + 1) % roles.length);
        }
      }
    }, deleting ? 40 : 70);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const skills = [
    { cat: "Languages", items: ["TypeScript", "Python", "Java", "C++", "SQL"] },
    { cat: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
    { cat: "Backend", items: ["Node.js", "Express", "PostgreSQL", "REST APIs"] },
    { cat: "Tools", items: ["Git", "Docker", "AWS", "Linux", "Figma"] },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        .nav-link {
          position: relative;
          color: #525252;
          font-size: 0.875rem;
          letter-spacing: 0.02em;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #111;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #111; }
        .skill-tag {
          display: inline-block;
          padding: 3px 10px;
          border: 1px solid #e5e5e5;
          border-radius: 2px;
          font-size: 0.75rem;
          color: #525252;
          letter-spacing: 0.03em;
          transition: all 0.15s;
          cursor: default;
        }
        .skill-tag:hover {
          border-color: #111;
          color: #111;
        }
      `}</style>

      <nav className="sticky top-0 bg-white border-b border-neutral-100 px-10 py-5 flex items-center justify-between z-50">
        <div className="text-sm font-medium tracking-widest text-neutral-900 uppercase">JC</div>
        <div className="flex items-center gap-8">
          {["Experience", "Skills", "Projects", "Contact"].map(item => (
            <a key={item} className="nav-link" href="#">{item}</a>
          ))}
        </div>
        <button className="text-xs text-neutral-400 border border-neutral-200 px-3 py-1.5 hover:border-neutral-400 hover:text-neutral-600 transition-all rounded-sm tracking-wide">
          ☀
        </button>
      </nav>

      <main className="px-10 max-w-5xl mx-auto">
        <section className="pt-24 pb-20">
          <div className="text-xs tracking-[0.25em] text-neutral-400 uppercase mb-8">Portfolio / 2026</div>
          <h1 className="text-7xl font-light text-neutral-900 leading-none tracking-tight mb-3">
            Jay<br />
            <span className="font-semibold">Chafekar</span>
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-px bg-neutral-300" />
            <p className="text-lg font-light text-neutral-500 tracking-wide">
              {typed}
              <span className="inline-block w-0.5 h-4 bg-neutral-400 ml-0.5 align-text-bottom animate-pulse" />
            </p>
          </div>
          <p className="mt-8 max-w-lg text-neutral-500 text-base leading-relaxed font-light">
            CS student at University of Westminster. Software Engineer at Sky Ltd — writing code that ships to millions.
          </p>
          <div className="mt-12 flex items-center gap-6">
            <a href="#" className="bg-neutral-900 text-white text-sm px-6 py-3 hover:bg-neutral-700 transition-colors tracking-wide">
              View Projects
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide underline underline-offset-4">
              Download CV
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide">
              Get in Touch →
            </a>
          </div>
        </section>

        <section className="py-16 border-t border-neutral-100">
          <div className="grid grid-cols-5 gap-12">
            <div className="col-span-1">
              <div className="text-xs tracking-[0.2em] text-neutral-400 uppercase pt-1">Skills</div>
            </div>
            <div className="col-span-4 space-y-6">
              {skills.map(({ cat, items }) => (
                <div key={cat} className="flex items-start gap-6">
                  <div className="w-24 shrink-0 text-xs text-neutral-400 pt-1">{cat}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map(s => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-neutral-100">
          <div className="grid grid-cols-5 gap-12">
            <div className="col-span-1">
              <div className="text-xs tracking-[0.2em] text-neutral-400 uppercase pt-1">Experience</div>
            </div>
            <div className="col-span-4 space-y-8">
              {[
                { co: "Sky Ltd", role: "Software Engineer", period: "2023 – Present", loc: "London, UK" },
                { co: "Technokraft", role: "Junior Developer", period: "2022 – 2023", loc: "Remote" },
              ].map(exp => (
                <div key={exp.co} className="flex justify-between items-start pb-8 border-b border-neutral-100 last:border-0">
                  <div>
                    <div className="font-medium text-neutral-900 mb-1">{exp.co}</div>
                    <div className="text-sm text-neutral-500">{exp.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-400">{exp.period}</div>
                    <div className="text-xs text-neutral-300 mt-0.5">{exp.loc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
