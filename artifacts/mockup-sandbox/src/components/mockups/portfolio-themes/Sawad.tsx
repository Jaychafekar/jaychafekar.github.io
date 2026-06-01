import { useState, useEffect } from "react";

const roles = ["SOFTWARE\nENGINEER", "FULL-STACK\nDEVELOPER", "CS\nSTUDENT"];

export function Sawad() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3200);
    return () => clearInterval(t);
  }, []);

  const [line1, line2] = roles[roleIndex].split("\n");

  const stats = [
    { value: "2+", label: "YEARS OF\nEXPERIENCE" },
    { value: "6+", label: "PROJECTS\nCOMPLETED" },
    { value: "2", label: "COMPANIES\nWORKED AT" },
    { value: "4+", label: "CERTS\nEARNED" },
  ];

  const cards = [
    { label: "TYPESCRIPT · REACT · NEXT.JS · TAILWIND", color: "#FF5C2B", textColor: "#fff", icon: "⬡" },
    { label: "NODE.JS · PYTHON · POSTGRESQL · AWS", color: "#C2FF3D", textColor: "#111", icon: "⚡" },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#0d0d0d", fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .role-anim { animation: fadeSlide 0.45s ease forwards; }
        .nav-icon {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
          font-size: 18px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .nav-icon:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .nav-icon.active { background: rgba(255,255,255,0.1); color: #fff; }
        .stat-val { font-size: 2.4rem; font-weight: 900; color: #fff; line-height: 1; }
        .stat-label { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em; color: rgba(255,255,255,0.35); margin-top: 6px; white-space: pre-line; }
        .skill-card {
          flex: 1;
          border-radius: 18px;
          padding: 22px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 130px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .skill-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
        .skill-card-icon { font-size: 1.5rem; margin-bottom: 10px; }
        .skill-card-label { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.04em; line-height: 1.35; }
        .arrow-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(0,0,0,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          position: absolute;
          bottom: 16px; right: 16px;
          transition: background 0.2s;
        }
        .profile-card {
          background: #fff;
          border-radius: 22px;
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 210px;
          flex-shrink: 0;
          position: relative;
        }
        .photo-placeholder {
          width: 150px;
          height: 180px;
          border-radius: 14px;
          background: linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          margin-bottom: 16px;
        }
        .initials-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF5C2B, #ff8c42);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.02em;
          margin-bottom: 8px;
        }
        .photo-label {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .profile-name { font-size: 1rem; font-weight: 800; color: #111; text-align: center; margin-bottom: 3px; }
        .profile-role { font-size: 0.7rem; color: #888; text-align: center; margin-bottom: 14px; font-weight: 500; }
        .social-row { display: flex; gap: 10px; }
        .social-btn {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: #f3f3f3;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          color: #555;
          cursor: pointer;
          transition: all 0.2s;
        }
        .social-btn:hover { background: #FF5C2B; color: #fff; }
        .dashed-ring {
          position: absolute;
          width: 230px; height: 230px;
          border-radius: 50%;
          border: 2px dashed rgba(255,92,43,0.3);
          top: -20px; left: -60px;
          pointer-events: none;
        }
        .orange-dot {
          width: 28px; height: 28px;
          background: #FF5C2B;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          position: absolute;
          bottom: 14px; right: -10px;
        }
      `}</style>

      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "center", padding: "18px 0 10px" }}>
        <div style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: "14px",
          padding: "6px 8px",
          display: "flex",
          gap: "4px",
        }}>
          {[["🏠", true], ["📁", false], ["📊", false], ["✏️", false], ["📝", false]].map(([icon, active], i) => (
            <div key={i} className={`nav-icon ${active ? "active" : ""}`}>{icon}</div>
          ))}
        </div>
      </nav>

      {/* Main layout */}
      <div style={{ display: "flex", gap: "36px", padding: "28px 44px 0", alignItems: "flex-start" }}>

        {/* Left: Profile card */}
        <div className="profile-card">
          <div className="dashed-ring" />
          <div className="photo-placeholder">
            <div className="initials-circle">JC</div>
            <div className="photo-label">Photo soon</div>
          </div>
          <div className="profile-name">Jay Chafekar</div>
          <div className="profile-role">Software Engineer @ Sky Ltd</div>
          <div className="social-row">
            {["in", "gh", "✉", "🔗"].map((s, i) => (
              <div key={i} className="social-btn">{s}</div>
            ))}
          </div>
          <div className="orange-dot" style={{ color: "#fff" }}>🔥</div>
        </div>

        {/* Right: Content */}
        <div style={{ flex: 1 }}>
          {/* Big role text */}
          <div key={roleIndex} className="role-anim" style={{ marginBottom: "20px" }}>
            <div style={{
              fontSize: "clamp(52px, 7vw, 76px)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}>
              {line1}
            </div>
            <div style={{
              fontSize: "clamp(52px, 7vw, 76px)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.15)",
            }}>
              {line2}
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: "420px", marginBottom: "24px" }}>
            CS student at University of Westminster. Building scalable products at Sky Ltd. Passionate about clean code, performance, and great user experiences.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "28px", marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="stat-val">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Skill cards */}
          <div style={{ display: "flex", gap: "14px" }}>
            {cards.map(({ label, color, textColor, icon }) => (
              <div key={label} className="skill-card" style={{ background: color, color: textColor }}>
                <div className="skill-card-icon">{icon}</div>
                <div className="skill-card-label">{label}</div>
                <div className="arrow-btn" style={{ color: textColor }}>→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
