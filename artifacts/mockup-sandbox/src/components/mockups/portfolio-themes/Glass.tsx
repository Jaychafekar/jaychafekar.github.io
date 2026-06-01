import { useState, useEffect } from "react";

const roles = ["Software Engineer", "Full-Stack Developer", "CS Student", "Problem Solver"];

export function Glass() {
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
          setTimeout(() => setDeleting(true), 1800);
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

  const skills = ["TypeScript", "React", "Node.js", "Python", "Next.js", "PostgreSQL", "Docker", "AWS", "Java", "Tailwind"];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #0d1117 100%)"
    }}>
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(167, 139, 250, 0.3);
          transform: translateY(-2px);
        }
        .neon-text {
          background: linear-gradient(135deg, #a78bfa, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .neon-border {
          border: 1px solid;
          border-image: linear-gradient(135deg, #a78bfa, #22d3ee) 1;
        }
        .orb-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          pointer-events: none;
        }
        .orb-2 {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%);
          bottom: 100px;
          left: -80px;
          pointer-events: none;
        }
        .skill-pill {
          background: rgba(167, 139, 250, 0.1);
          border: 1px solid rgba(167, 139, 250, 0.2);
          color: #c4b5fd;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          letter-spacing: 0.03em;
          transition: all 0.2s;
        }
        .skill-pill:hover {
          background: rgba(167, 139, 250, 0.2);
          border-color: rgba(167, 139, 250, 0.5);
        }
        .cursor-blink {
          animation: blink 0.9s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="orb-1" />
      <div className="orb-2" />

      <nav className="glass sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
        <div className="text-white font-bold text-lg tracking-wider">
          <span className="neon-text">JC</span>
          <span className="text-white text-opacity-80">.</span>
        </div>
        <div className="flex gap-6">
          {["Experience", "Skills", "Projects", "Contact"].map(item => (
            <a key={item} href="#" className="text-sm text-white text-opacity-60 hover:text-opacity-100 transition-all"
              style={{ color: "rgba(255,255,255,0.6)" }}>
              {item}
            </a>
          ))}
        </div>
        <button className="glass text-xs px-3 py-1.5 rounded-full text-white text-opacity-60" style={{ color: "rgba(255,255,255,0.5)" }}>
          ◐
        </button>
      </nav>

      <main className="relative z-10 px-8 max-w-5xl mx-auto">
        <section className="pt-20 pb-16">
          <div className="mb-4">
            <span className="text-xs tracking-[0.3em] uppercase px-3 py-1 rounded-full" style={{
              background: "rgba(167,139,250,0.15)",
              color: "#a78bfa",
              border: "1px solid rgba(167,139,250,0.25)"
            }}>
              Available for opportunities
            </span>
          </div>

          <h1 className="text-7xl font-bold leading-none mb-6">
            <span style={{ color: "rgba(255,255,255,0.95)" }}>Jay</span><br />
            <span className="neon-text">Chafekar</span>
          </h1>

          <div className="text-xl mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <span style={{ color: "rgba(167,139,250,0.8)" }}>// </span>
            {typed}
            <span className="cursor-blink inline-block w-0.5 h-5 ml-0.5 align-text-bottom" style={{ background: "#a78bfa" }} />
          </div>

          <p className="text-base max-w-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
            CS student at University of Westminster. Software Engineer at Sky Ltd —
            crafting scalable systems and beautiful interfaces.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-lg font-medium text-sm text-white transition-all" style={{
              background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
            }}>
              View Projects
            </button>
            <button className="glass px-6 py-3 rounded-lg text-sm transition-all" style={{ color: "rgba(255,255,255,0.7)" }}>
              Download CV ↓
            </button>
            <button className="text-sm transition-all" style={{ color: "rgba(167,139,250,0.8)" }}>
              Get in Touch →
            </button>
          </div>
        </section>

        <section className="pb-16">
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "rgba(167,139,250,0.7)" }}>
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="skill-pill">{s}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { co: "Sky Ltd", role: "Software Engineer", period: "2023 – Present", icon: "▲" },
              { co: "Technokraft", role: "Junior Developer", period: "2022 – 2023", icon: "◆" },
            ].map(exp => (
              <div key={exp.co} className="glass-card rounded-xl p-5">
                <div className="text-xl mb-1" style={{ color: "rgba(167,139,250,0.8)" }}>{exp.icon}</div>
                <div className="font-semibold text-white mb-0.5">{exp.co}</div>
                <div className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{exp.role}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{exp.period}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
