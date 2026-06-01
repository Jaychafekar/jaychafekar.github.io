import { useState, useEffect } from "react";

const roles = ["Software Engineer", "Full-Stack Developer", "CS Student", "Problem Solver"];

export function Brutalist() {
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

  const skills = [
    { cat: "Languages", items: ["TypeScript", "Python", "Java", "C++"] },
    { cat: "Frontend", items: ["React", "Next.js", "Tailwind", "Framer"] },
    { cat: "Backend", items: ["Node.js", "Express", "PostgreSQL"] },
    { cat: "Tools", items: ["Git", "Docker", "AWS", "Linux"] },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-black overflow-hidden" style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        .accent-yellow { background: #FFE600; }
        .hover-yellow:hover { background: #FFE600; }
        .border-heavy { border: 3px solid #000; }
        .shadow-hard { box-shadow: 6px 6px 0px #000; }
        .shadow-hard-yellow { box-shadow: 6px 6px 0px #FFE600; }
        .skill-box {
          border: 2px solid #000;
          padding: 4px 10px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.1s;
          cursor: default;
        }
        .skill-box:hover {
          background: #FFE600;
        }
        .btn-primary {
          background: #000;
          color: #fff;
          border: 3px solid #000;
          padding: 12px 28px;
          font-weight: 900;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 5px 5px 0px #FFE600;
          transition: all 0.1s;
          cursor: pointer;
        }
        .btn-primary:hover {
          box-shadow: 2px 2px 0px #FFE600;
          transform: translate(3px, 3px);
        }
        .btn-secondary {
          background: transparent;
          color: #000;
          border: 3px solid #000;
          padding: 12px 28px;
          font-weight: 900;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 5px 5px 0px #000;
          transition: all 0.1s;
          cursor: pointer;
        }
        .btn-secondary:hover {
          background: #FFE600;
          box-shadow: 2px 2px 0px #000;
          transform: translate(3px, 3px);
        }
        .exp-card {
          border: 3px solid #000;
          background: white;
          box-shadow: 8px 8px 0px #000;
          transition: all 0.1s;
        }
        .exp-card:hover {
          box-shadow: 4px 4px 0px #000;
          transform: translate(4px, 4px);
        }
        .tick-mark::before {
          content: '→ ';
          color: #FFE600;
          font-weight: 900;
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor { animation: cursor-blink 0.8s step-end infinite; }
      `}</style>

      <nav className="border-b-4 border-black bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="font-black text-2xl tracking-tighter">
          JAY<span className="inline-block w-3 h-3 accent-yellow ml-1 mb-1 align-middle border-2 border-black" />
        </div>
        <div className="flex gap-0">
          {["Experience", "Skills", "Projects", "Contact"].map((item, i) => (
            <a key={item} href="#"
              className="font-black text-xs uppercase tracking-widest px-5 py-3 border-l-2 border-black hover:bg-yellow-300 transition-colors"
              style={{ borderColor: '#000' }}>
              {item}
            </a>
          ))}
        </div>
        <button className="border-2 border-black font-black text-xs px-3 py-2 hover:bg-yellow-300 transition-colors uppercase tracking-widest">
          ◑ Mode
        </button>
      </nav>

      <main className="px-8 max-w-5xl mx-auto">
        <section className="pt-16 pb-16 grid grid-cols-3 gap-8 items-start">
          <div className="col-span-2">
            <div className="accent-yellow border-2 border-black inline-block px-3 py-1 text-xs font-black uppercase tracking-widest mb-6 shadow-hard">
              Portfolio 2026
            </div>

            <h1 className="font-black leading-none mb-4" style={{ fontSize: "clamp(60px, 8vw, 88px)", letterSpacing: "-0.02em" }}>
              JAY<br />
              CHAFE<br />
              KAR.
            </h1>

            <div className="border-4 border-black bg-yellow-300 px-4 py-2 inline-block mb-8 shadow-hard" style={{ minWidth: "280px" }}>
              <span className="font-black text-lg uppercase tracking-wide">{typed}</span>
              <span className="cursor font-black text-xl">_</span>
            </div>

            <p className="text-sm font-bold leading-relaxed max-w-sm mb-8 border-l-4 border-black pl-4">
              CS student @ University of Westminster.<br />
              Software Engineer @ Sky Ltd.<br />
              Building things that matter.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="btn-primary">View Projects</button>
              <button className="btn-secondary">Download CV</button>
            </div>
          </div>

          <div className="col-span-1 pt-8">
            <div className="border-3 border-black bg-white p-5 shadow-hard" style={{ border: "3px solid #000", boxShadow: "6px 6px 0 #000" }}>
              <div className="font-black text-xs uppercase tracking-widest mb-4 border-b-2 border-black pb-2">
                Quick Stats
              </div>
              {[
                { n: "2+", label: "Years Experience" },
                { n: "6+", label: "Projects Shipped" },
                { n: "4", label: "Certifications" },
              ].map(({ n, label }) => (
                <div key={label} className="flex items-baseline justify-between py-2 border-b border-neutral-200 last:border-0">
                  <span className="font-black text-3xl" style={{ color: "#000" }}>{n}</span>
                  <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 border-t-4 border-black pt-12">
          <div className="flex items-baseline gap-6 mb-8">
            <h2 className="font-black text-3xl uppercase tracking-tighter">Skills</h2>
            <div className="flex-1 border-t-4 border-black mt-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {skills.map(({ cat, items }) => (
              <div key={cat} className="exp-card p-5">
                <div className="font-black text-xs uppercase tracking-widest mb-3 accent-yellow px-2 py-1 inline-block border border-black">
                  {cat}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map(s => (
                    <span key={s} className="skill-box">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
