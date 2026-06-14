"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [vin, setVin] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Handle glass navbar effect on scroll and close mobile menu on resize
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => { if (window.innerWidth > 640) setMenuOpen(false); };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

      <style>{`
        /* --- 2030 HIGH-TECH ANIMATIONS & GRIDS --- */
        @keyframes revealUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        
        .animate-reveal { animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }

        /* PREMIUM SMOOTH HERO GLOW (Replaced dotted grid) */
        .hero-glow-bg {
          position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
          width: 120vw; max-width: 1400px; height: 800px;
          background: radial-gradient(ellipse at 50% 20%, rgba(22, 163, 74, 0.12) 0%, rgba(14, 165, 233, 0.05) 40%, rgba(250, 250, 250, 0) 70%);
          pointer-events: none; z-index: 0;
        }

        /* --- GLASSMORPHISM NAVBAR --- */
        .glass-nav {
          position: sticky; top: 0; z-index: 50; transition: all 0.3s ease;
          background: ${scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(16px)" : "none"};
          -webkit-backdrop-filter: ${scrolled ? "blur(16px)" : "none"};
          border-bottom: 1px solid ${scrolled ? "rgba(229, 231, 235, 0.5)" : "transparent"};
          box-shadow: ${scrolled ? "0 4px 30px rgba(0,0,0,0.03)" : "none"};
        }

        /* --- HOVER EFFECTS --- */
        .text-link { transition: color 0.2s ease-in-out; font-weight: 600; position: relative; }
        .text-link::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -4px; left: 0; background-color: #16a34a; transition: width 0.3s ease; }
        .nav-links .text-link:hover { color: #111827 !important; }
        .nav-links .text-link:hover::after { width: 100%; }
        
        .footer-links .text-link:hover { color: #4ade80 !important; }
        .footer-links .text-link::after { display: none; } /* No underline in footer */

        /* --- FOOTER LAYOUT FIX --- */
        .footer-links {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
          padding: 0;
        }

        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.25s ease;
        }

        .footer-links a:hover {
          color: #4ade80;
        }

        .nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; position: relative; z-index: 10;}
        .nav-btn { background: #111827; color: #fff; padding: 10px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(17, 24, 39, 0.2); }
        .nav-btn:hover { background: #16a34a; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3); }

        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; z-index: 60; position: relative;}
        .mobile-menu { display: none; flex-direction: column; gap: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border-top: 1px solid #e5e7eb; padding: 8px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.1); position: absolute; width: 100%; top: 60px; left: 0; z-index: 40; }
        .mobile-menu.open { display: flex; animation: revealUp 0.3s ease forwards; }
        .mobile-menu a { padding: 16px 24px; font-size: 15px; color: #111827; text-decoration: none; border-bottom: 1px solid rgba(243, 244, 246, 0.8); font-weight: 600; }
        
        /* --- HERO SECTION --- */
        .hero-section { text-align: center; padding: 120px 24px 80px; max-width: 860px; margin: 0 auto; position: relative; z-index: 10; }
        .hero-title { font-size: 64px; font-weight: 900; line-height: 1.1; color: #111827; margin-bottom: 24px; letter-spacing: -2px; }
        .gradient-text { background: linear-gradient(135deg, #16a34a 0%, #0ea5e9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-sub { font-size: 20px; color: #4b5563; line-height: 1.6; margin-bottom: 48px; max-width: 680px; margin-left: auto; margin-right: auto; font-weight: 500; }
        
        /* 2030 GLASS SEARCH BAR */
        .search-wrapper { 
          max-width: 600px; margin: 0 auto 16px auto; background: rgba(255, 255, 255, 0.6); padding: 8px; 
          border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.8); display: flex; gap: 8px;
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1); transition: all 0.4s ease;
        }
        .search-wrapper:focus-within { border-color: #16a34a; box-shadow: 0 30px 60px -15px rgba(22, 163, 74, 0.25), inset 0 1px 0 rgba(255,255,255,1); transform: translateY(-3px); }
        .vin-input { 
          flex: 1; padding: 16px 24px; border: none; background: transparent; 
          font-size: 16px; font-weight: 700; color: #111827; text-transform: uppercase; 
          outline: none; letter-spacing: 1px;
        }
        .vin-input::placeholder { color: #9ca3af; text-transform: none; font-weight: 500; letter-spacing: normal; }
        .vin-btn { 
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #fff; padding: 0 32px; border-radius: 16px; border: none; 
          font-weight: 800; font-size: 16px; cursor: pointer; text-decoration: none;
          display: flex; align-items: center; justify-content: center; white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 4px 10px rgba(22, 163, 74, 0.3);
        }
        .vin-btn:hover { background: linear-gradient(135deg, #15803d 0%, #166534 100%); transform: scale(1.03); box-shadow: 0 12px 20px rgba(22, 163, 74, 0.4); }

        /* --- PREMIUM STATS GRID --- */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; position: relative; z-index: 10; }
        .stat-item { 
          text-align: center; padding: 36px 20px; background: rgba(255, 255, 255, 0.7); border-radius: 24px;
          backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }
        .stat-item:hover { transform: translateY(-8px); border-color: #86efac; box-shadow: 0 20px 40px -10px rgba(22, 163, 74, 0.15); background: #fff; }
        .stat-num { font-size: 38px; font-weight: 900; letter-spacing: -1px; background: linear-gradient(135deg, #111827 0%, #4b5563 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        /* --- NEUMORPHIC FEATURES GRID --- */
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; position: relative; z-index: 10;}
        .feature-card {
          padding: 40px 32px; border-radius: 32px; background: #fff; text-align: left;
          border: 1px solid #f1f5f9; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.04); position: relative; overflow: hidden;
        }
        .feature-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #16a34a, #0ea5e9); opacity: 0; transition: opacity 0.3s ease; }
        .feature-card:hover { transform: translateY(-10px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon {
          width: 64px; height: 64px; background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%); border-radius: 20px; 
          display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 24px;
          transition: all 0.4s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .feature-card:hover .feature-icon { transform: scale(1.1) rotate(5deg); background: linear-gradient(135deg, #dcfce7 0%, #bae6fd 100%); box-shadow: 0 10px 20px rgba(22, 163, 74, 0.2); }

        /* --- PREMIUM GREEN CTA BOX --- */
        .cta-container {
          padding: 40px 24px 80px 24px; /* Space around the centered box */
        }
        .cta-section {
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
          max-width: 800px; /* Makes it small and centered */
          margin: 0 auto;
          border-radius: 24px;
          padding: 64px 32px; text-align: center; position: relative; overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(22, 163, 74, 0.4);
        }
        .cta-section::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%); pointer-events: none;
        }
        .cta-title { color: #ffffff; font-weight: 900; margin-bottom: 16px; font-size: 40px; letter-spacing: -1px; position: relative; z-index: 10;}
        .cta-sub { color: #dcfce7; font-size: 18px; margin-bottom: 40px; position: relative; z-index: 10; font-weight: 500;}

        /* --- MOBILE RESPONSIVENESS --- */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: block; }
          .hero-title { font-size: 42px; letter-spacing: -1px;}
          .hero-sub { font-size: 16px; margin-bottom: 32px; }
          .hero-section { padding: 60px 16px 40px; }
          .search-wrapper { flex-direction: column; background: transparent; border: none; box-shadow: none; padding: 0; backdrop-filter: none;}
          .vin-input { background: #fff; border: 2px solid #e5e7eb; border-radius: 16px; width: 100%; text-align: center; box-sizing: border-box; box-shadow: 0 10px 20px rgba(0,0,0,0.05);}
          .vin-btn { padding: 18px; width: 100%; border-radius: 16px; margin-top: 12px;}
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .features-grid { grid-template-columns: 1fr; gap: 20px; }
          .footer-links {
  gap: 14px;
  row-gap: 12px;
  padding: 0 12px;
}

.footer-links a {
  font-size: 13px;
}
          .cta-title { font-size: 32px; }
        }
      `}</style>

      {/* SMOOTH HERO GLOW BACKGROUND */}
      <div className="hero-glow-bg"></div>

      {/* 2030 GLASS NAVBAR */}
      <nav className="glass-nav">
        <div style={{ padding: "0 24px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <Link href="/" style={{ fontWeight: 900, fontSize: 24, color: "#111827", textDecoration: "none", letterSpacing: "-0.5px", position: "relative", zIndex: 10 }}>
            EV<span style={{ color: "#16a34a" }}>2</span>Trust
          </Link>
          <div className="nav-links">
            <Link href="/sample-report" className="text-link" style={{ color: "#4b5563", textDecoration: "none" }}>Sample Report</Link>
            <Link href="/how-it-works" className="text-link" style={{ color: "#4b5563", textDecoration: "none" }}>How it works</Link>
            <Link href="/supported-vehicles" className="text-link" style={{ color: "#4b5563", textDecoration: "none" }}>Supported Vehicles</Link>
            <Link href="/blog" className="text-link" style={{ color: "#4b5563", textDecoration: "none" }}>Blog</Link>
            <Link href="/check" className="nav-btn">Free Check →</Link>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg width="28" height="28" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link href="/sample-report" onClick={() => setMenuOpen(false)}>Sample Report</Link>
          <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link href="/supported-vehicles" onClick={() => setMenuOpen(false)}>Supported Vehicles</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <Link href="/check" onClick={() => setMenuOpen(false)} style={{ background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", color: "#fff", margin: "16px", borderRadius: 12, textAlign: "center", fontWeight: 800, borderBottom: "none" }}>Free Check →</Link>
        </div>
      </nav>

      <div style={{ flex: 1 }}>
        {/* HERO SECTION */}
        <section className="hero-section animate-reveal">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", color: "#15803d", padding: "8px 20px", borderRadius: 30, fontSize: 13, fontWeight: 700, marginBottom: 32, border: "1px solid rgba(22, 163, 74, 0.2)", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "inline-block", boxShadow: "0 0 10px #16a34a" }} />
            Trusted globally — India · USA · UK · UAE · Germany
          </div>

          <h1 className="hero-title">
            Know your EV&apos;s{" "}
            <span className="gradient-text">true health</span>{" "}
            before you buy.
          </h1>

          <p className="hero-sub">
            Enter any EV&apos;s VIN number and get a complete battery health report,
            real range, recall alerts, and a certified market price — in 60 seconds.
          </p>

          <div className="search-wrapper">
            <input 
              type="text" 
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="Enter VIN — e.g. 5YJ3E1EA7JF000001" 
              maxLength={17} 
              className="vin-input" 
            />
            <Link href={`/check${vin ? `?vin=${vin}` : ''}`} className="vin-btn">Check free →</Link>
          </div>

          <p style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>
            No account needed · First report free · Any EV brand
          </p>
        </section>

        {/* METALLIC STATS GRID */}
        <section style={{ padding: "40px 24px 80px", position: "relative" }} className="animate-reveal delay-100">
          <div className="stats-grid">
            {[
              { num: "4.2M+", label: "Used EVs sold yearly" },
              { num: "50%", label: "Have hidden battery issues" },
              { num: "$6k", label: "Avg loss from bad EV purchase" },
              { num: "60 sec", label: "To get your full report" },
            ].map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-num">{s.num}</div>
                <div style={{ fontSize: 15, color: "#64748b", marginTop: 12, lineHeight: 1.4, fontWeight: 700 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* NEUMORPHIC FEATURES GRID */}
        <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto", position: "relative" }} className="animate-reveal delay-200">
          <h2 style={{ textAlign: "center", fontSize: 40, fontWeight: 900, marginBottom: 64, color: "#111827", letterSpacing: "-1px" }}>
            Everything in one certified report.
          </h2>
          <div className="features-grid">
            {[
              { icon: "🔋", title: "Battery health grade", desc: "A/B/C/D score — know exactly what you are buying before spending your money." },
              { icon: "📍", title: "Real range estimate", desc: "Get the actual expected range based on the battery's current degradation level." },
              { icon: "⚠️", title: "Recall alerts", desc: "Instantly scan government databases for open, dangerous safety recalls." },
              { icon: "🚗", title: "Accident history", desc: "We cross-check the VIN against national insurance and salvage records." },
              { icon: "💰", title: "Fair price calculator", desc: "AI-powered market pricing delivered in your local currency." },
              { icon: "🔗", title: "Shareable certificate", desc: "Get a verified public link to paste into your OLX or CarDekho seller listing." },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 style={{ fontWeight: 800, marginBottom: 12, fontSize: 20, color: "#111827", letterSpacing: "-0.5px" }}>{f.title}</h3>
                <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PREMIUM GREEN CTA BOX */}
        <div className="cta-container">
          <section className="cta-section">
            <h2 className="cta-title">Check your EV right now — it&apos;s free.</h2>
            <p className="cta-sub">No credit card required. Generate your first complete report instantly.</p>
            <Link href="/check" style={{
              background: "#ffffff", color: "#15803d",
              padding: "18px 40px", borderRadius: 16,
              fontWeight: 900, fontSize: 18, textDecoration: "none", display: "inline-block",
              position: "relative", zIndex: 10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }} onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05) translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)"; }}>
              Start your free check →
            </Link>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "80px 24px 40px", textAlign: "center", fontSize: 14, position: "relative", zIndex: 10 }}>
        <div style={{ fontWeight: 900, color: "#fff", fontSize: 28, marginBottom: 8, letterSpacing: "-0.5px" }}>
          EV<span style={{ color: "#4ade80" }}>2</span>Trust
        </div>
        <div style={{ color: "#cbd5e1", marginBottom: 40, fontWeight: 500 }}>The global EV health &amp; history platform</div>
        
        <div className="footer-links">
          <Link href="/about" className="text-link" style={{ color: "#94a3b8", textDecoration: "none" }}>About Us</Link>
          <Link href="/how-it-works" className="text-link" style={{ color: "#94a3b8", textDecoration: "none" }}>How it works</Link>
          <Link href="/supported-vehicles" className="text-link" style={{ color: "#94a3b8", textDecoration: "none" }}>Supported Vehicles</Link>
          <Link href="/blog" className="text-link" style={{ color: "#94a3b8", textDecoration: "none" }}>Blog</Link>
          <Link href="/privacy-policy" className="text-link" style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" className="text-link" style={{ color: "#94a3b8", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/disclaimer" className="text-link" style={{ color: "#94a3b8", textDecoration: "none" }}>Disclaimer</Link>
          <Link href="/contact" className="text-link" style={{ color: "#94a3b8", textDecoration: "none" }}>Contact Us</Link>
        </div>
        
        <div style={{ color: "#475569", marginTop: 40, paddingTop: 40, borderTop: "1px solid #1e293b", fontWeight: 500 }}>
          © 2026 EV2Trust. Built for EV buyers everywhere.
        </div>
      </footer>

    </div>
  );
}