import { useState, useEffect } from "react";

const roles = ["Software Engineer", "Full-Stack Developer", "CS Student", "Problem Solver"];

export function Terminal() {
  const [typed, setTyped] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(blinkInterval);
  }, []);

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
    }, deleting ? 45 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const skills = {
    Languages: ["TypeScript", "Python", "Java", "C++"],
    Frontend: ["React", "Next.js", "Tailwind", "Framer Motion"],
    Backend: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
    Tools: ["Git", "Docker", "AWS", "Linux"],
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden" style={{ fontFamily: "'Courier New', monospace" }}>
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker {
          0%, 97%, 100% { opacity: 1; }
          98% { opacity: 0.85; }
        }
        .crt::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(0, 255, 65, 0.15);
          animation: scanline 6s linear infinite;
          z-index: 100;
          pointer-events: none;
        }
        .crt {
          animation: flicker 8s infinite;
        }
        .glow-text {
          text-shadow: 0 0 8px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.3);
        }
        .dim-text {
          text-shadow: 0 0 4px rgba(0, 255, 65, 0.4);
        }
      `}</style>

      <div className="crt relative">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)"
        }} />

        <nav className="border-b border-green-900 px-8 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
            </div>
            <span className="text-green-600 text-sm ml-3">jay@portfolio ~ bash</span>
          </div>
          <div className="flex gap-6 text-sm text-green-600">
            {["experience", "skills", "projects", "contact"].map(item => (
              <span key={item} className="hover:text-green-400 cursor-pointer transition-colors dim-text">
                ./{item}
              </span>
            ))}
          </div>
        </nav>

        <div className="px-8 py-12 max-w-4xl">
          <div className="mb-2 text-green-600 text-sm dim-text">Last login: Mon Jun 1 2026 from 192.168.1.1</div>
          <div className="mb-8 text-green-600 text-sm dim-text">Welcome to Jay's Portfolio v2.0.1 — type 'help' for commands</div>

          <div className="mb-4">
            <span className="text-green-600 dim-text">visitor@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span className="glow-text text-green-400">whoami</span>
          </div>

          <div className="mb-8">
            <div className="text-5xl font-bold glow-text mb-2 leading-tight">
              Jay Chafekar
            </div>
            <div className="text-xl text-green-300 dim-text">
              <span className="text-green-600">→ </span>
              {typed}
              <span className={`inline-block w-2 h-5 bg-green-400 ml-0.5 align-text-bottom ${blink ? "opacity-100" : "opacity-0"}`} />
            </div>
          </div>

          <div className="mb-10">
            <div className="mb-3">
              <span className="text-green-600 dim-text">visitor@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ </span>
              <span className="glow-text">cat about.txt</span>
            </div>
            <div className="border border-green-900 bg-green-950 bg-opacity-30 p-4 text-sm text-green-300 leading-relaxed dim-text">
              CS student @ University of Westminster.<br />
              Software Engineer @ Sky Ltd — building real products at scale.<br />
              Passionate about clean code, performance, and systems thinking.
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-3">
              <span className="text-green-600 dim-text">visitor@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ </span>
              <span className="glow-text">ls skills/</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(skills).map(([cat, items]) => (
                <div key={cat} className="border border-green-900 p-3 bg-green-950 bg-opacity-20">
                  <div className="text-green-600 text-xs mb-2 dim-text"># {cat}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map(s => (
                      <span key={s} className="text-xs text-green-300 border border-green-800 px-2 py-0.5">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 text-sm">
            <button className="border border-green-500 text-green-400 px-4 py-2 hover:bg-green-900 hover:bg-opacity-30 transition-colors glow-text">
              ./view_projects.sh
            </button>
            <button className="text-green-600 px-4 py-2 hover:text-green-400 transition-colors dim-text">
              ./contact.sh --email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
