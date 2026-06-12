import Link from "next/link";
import { Metadata } from "next";

// Highly Optimized SEO Metadata based on your exact specs
export const metadata: Metadata = {
  title: "How It Works | EV2Trust - Global Battery Health",
  description: "Generate bank-grade battery health certificates using OBD-II data in 60 seconds.",
  keywords: ["EV battery check", "OBD2 EV scanner", "State of Health", "electric vehicle valuation"]
};

export default function HowItWorks() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      
      <style>{`
        /* --- GLOBAL ANIMATIONS --- */
        @keyframes revealUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(22, 163, 74, 0); } 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }

        .animate-reveal { animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        /* --- HERO SECTION --- */
        .hero-section { text-align: center; padding: 100px 24px 80px; position: relative; z-index: 10; }
        .hero-title { font-size: 56px; font-weight: 900; line-height: 1.1; color: #111827; margin-bottom: 24px; letter-spacing: -1.5px; }
        .hero-sub { font-size: 20px; color: #4b5563; line-height: 1.6; max-width: 680px; margin: 0 auto; font-weight: 500; }
        .gradient-text { background: linear-gradient(135deg, #16a34a 0%, #0ea5e9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        /* --- APPLE-ESQUE ALTERNATING TIMELINE --- */
        .timeline-container { max-width: 1000px; margin: 0 auto; padding: 0 24px 100px; position: relative; z-index: 10; }
        
        /* The Center Line */
        .timeline-container::before {
          content: ''; position: absolute; top: 0; bottom: 0; left: 50%; width: 2px;
          background: linear-gradient(to bottom, transparent, #e5e7eb 10%, #e5e7eb 90%, transparent);
          transform: translateX(-50%); z-index: 0;
        }

        .timeline-step { display: flex; align-items: center; justify-content: space-between; margin-bottom: 80px; position: relative; z-index: 1; }
        .timeline-step:nth-child(even) { flex-direction: row-reverse; }

        .timeline-content {
          width: 45%; background: #ffffff; padding: 40px; border-radius: 24px;
          border: 1px solid #f3f4f6; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        .timeline-content:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -15px rgba(22, 163, 74, 0.15); border-color: #bbf7d0; }
        
        .step-number {
          position: absolute; top: -20px; left: 32px; background: #16a34a; color: #fff;
          width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 18px; box-shadow: 0 4px 10px rgba(22, 163, 74, 0.3);
        }

        /* The Pulse Node on the Center Line */
        .timeline-node {
          position: absolute; left: 50%; transform: translateX(-50%);
          width: 16px; height: 16px; background: #fff; border: 4px solid #16a34a;
          border-radius: 50%; z-index: 2; box-shadow: 0 0 0 4px #f0fdf4;
        }
        .timeline-step:hover .timeline-node { animation: pulseGlow 1.5s infinite; }

        .step-title { font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 16px; margin-top: 12px; letter-spacing: -0.5px;}
        .step-desc { font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0; }

        /* Floating Graphics */
        .timeline-graphic { width: 45%; display: flex; justify-content: center; animation: float 6s ease-in-out infinite; font-size: 80px; }
        .timeline-step:nth-child(even) .timeline-graphic { animation-delay: 1s; }

        /* --- DARK SLATE CTA BANNER --- */
        .cta-section { background: #0f172a; padding: 100px 24px; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 50% 0%, rgba(22, 163, 74, 0.15) 0%, transparent 50%); pointer-events: none; }
        .cta-title { color: #f8fafc; font-weight: 900; margin-bottom: 16px; font-size: 40px; letter-spacing: -1px; position: relative; z-index: 10; margin-top: 0;}
        .cta-sub { color: #94a3b8; font-size: 18px; margin-bottom: 40px; position: relative; z-index: 10; font-weight: 500;}
        .cta-btn { background: #16a34a; color: #ffffff; padding: 18px 40px; border-radius: 12px; font-size: 16px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: all 0.2s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative; z-index: 10; border: 1px solid #15803d;}
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(22, 163, 74, 0.3); background: #15803d; }

        /* --- PROFESSIONAL FOOTER --- */
        .footer { background: #0f172a; color: #94a3b8; padding: 0 24px 40px; text-align: center; font-size: 14px; position: relative; z-index: 10; border-top: 1px solid #1e293b; }
        .footer-logo { font-weight: 900; color: #fff; font-size: 28px; margin-bottom: 8px; letter-spacing: -0.5px; padding-top: 64px;}
        .footer-sub { color: #cbd5e1; margin-bottom: 48px; font-weight: 500; font-size: 15px; }
        .footer-links { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; margin-bottom: 48px; }
        .footer-link { color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s ease; }
        .footer-link:hover { color: #ffffff; }
        .footer-bottom { border-top: 1px solid #1e293b; padding-top: 32px; color: #475569; font-size: 13px; font-weight: 500; }

        /* --- MINIMAL NAVBAR --- */
        .glass-nav { position: sticky; top: 0; z-index: 50; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(16px); border-bottom: 1px solid #e5e7eb; box-shadow: 0 4px 30px rgba(0,0,0,0.03); }
        .nav-inner { max-width: 1400px; margin: 0 auto; width: 100%; padding: 0 40px; height: 80px; display: flex; align-items: center; justify-content: space-between; box-sizing: border-box; }
        .text-link { color: #374151; font-weight: 600; text-decoration: none; transition: color 0.2s ease; }
        .text-link:hover { color: #16a34a; }
        .nav-links { display: flex; align-items: center; gap: 32px; font-size: 15px; }
        .nav-btn { background: #16a34a; color: #fff; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(22, 163, 74, 0.2); }
        .nav-btn:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3); }

        /* --- MOBILE RESPONSIVENESS --- */
        @media (max-width: 768px) {
          .nav-inner { padding: 0 20px; }
          .nav-links { display: none; }
          .hero-title { font-size: 42px; letter-spacing: -1px;}
          .hero-sub { font-size: 16px; margin-bottom: 32px; }
          
          .timeline-container::before { left: 24px; }
          .timeline-step, .timeline-step:nth-child(even) { flex-direction: column; align-items: flex-end; margin-bottom: 48px;}
          .timeline-content { width: calc(100% - 64px); padding: 32px 24px; }
          .timeline-node { left: 24px; top: 24px; transform: translateX(-50%); }
          .step-number { left: auto; right: 24px; top: -20px; }
          .timeline-graphic { display: none; } /* Hide floating graphics on mobile for cleaner look */
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="glass-nav">
        <div className="nav-inner">
          <Link href="/" style={{ fontWeight: 900, fontSize: 24, color: "#111827", textDecoration: "none", letterSpacing: "-0.5px" }}>
            EV<span style={{ color: "#16a34a" }}>2</span>Trust
          </Link>
          <div className="nav-links">
            <Link href="/" className="text-link">Home</Link>
            <Link href="/sample-report" className="text-link">Sample Report</Link>
            <Link href="/supported-vehicles" className="text-link">Supported Vehicles</Link>
            <Link href="/blog" className="text-link">Blog</Link>
            <Link href="/check" className="nav-btn">Free Check →</Link>
          </div>
        </div>
      </nav>

      <div style={{ flex: 1 }}>
        {/* HEADER */}
        <section className="hero-section animate-reveal">
          <h1 className="hero-title">How <span className="gradient-text">EV2Trust</span> works</h1>
          <p className="hero-sub">Six simple steps to generate a bank-grade, universally recognized electric vehicle health certificate and market valuation.</p>
        </section>

        {/* TIMELINE */}
        <div className="timeline-container">
          
          <div className="timeline-step animate-reveal delay-100">
            <div className="timeline-node"></div>
            <div className="timeline-content">
              <div className="step-number">1</div>
              <h3 className="step-title">Enter the VIN</h3>
              <p className="step-desc">Start by entering the 17-character Vehicle Identification Number. Our engine instantly queries government databases to verify the make, model, year, and trim level.</p>
            </div>
            <div className="timeline-graphic">🚗</div>
          </div>

          <div className="timeline-step animate-reveal delay-200">
            <div className="timeline-node"></div>
            <div className="timeline-content">
              <div className="step-number">2</div>
              <h3 className="step-title">Scan NHTSA Databases</h3>
              <p className="step-desc">We cross-reference the VIN with official US Government safety records to check for any unfulfilled, dangerous manufacturing recalls or service bulletins.</p>
            </div>
            <div className="timeline-graphic">⚠️</div>
          </div>

          <div className="timeline-step animate-reveal delay-300">
            <div className="timeline-node"></div>
            <div className="timeline-content">
              <div className="step-number">3</div>
              <h3 className="step-title">Connect OBD-II (Optional)</h3>
              <p className="step-desc">For a deep diagnostic, connect a standard OBD-II scanner. We analyze raw battery cells to determine the true State of Health (SoH) and exact battery degradation percentage.</p>
            </div>
            <div className="timeline-graphic">🔌</div>
          </div>

          <div className="timeline-step animate-reveal delay-100">
            <div className="timeline-node"></div>
            <div className="timeline-content">
              <div className="step-number">4</div>
              <h3 className="step-title">Compute Real Range</h3>
              <p className="step-desc">Based on the battery's degraded capacity, our algorithms recalculate the vehicle's actual expected driving range, replacing the original factory estimates.</p>
            </div>
            <div className="timeline-graphic">📍</div>
          </div>

          <div className="timeline-step animate-reveal delay-200">
            <div className="timeline-node"></div>
            <div className="timeline-content">
              <div className="step-number">5</div>
              <h3 className="step-title">AI Market Valuation</h3>
              <p className="step-desc">We analyze regional used EV sales data, factor in the exact battery degradation score, and compute a fair market price delivered directly in your local currency.</p>
            </div>
            <div className="timeline-graphic">💰</div>
          </div>

          <div className="timeline-step animate-reveal delay-300">
            <div className="timeline-node"></div>
            <div className="timeline-content">
              <div className="step-number">6</div>
              <h3 className="step-title">Generate Certificate</h3>
              <p className="step-desc">You receive a certified, public link containing the full A/B/C/D grade report. Paste it directly into your marketplace listings to build immediate buyer trust.</p>
            </div>
            <div className="timeline-graphic">🔗</div>
          </div>

        </div>

        {/* DARK SLATE CTA */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to uncover the true health?</h2>
          <p className="cta-sub">Run your first diagnostic report in under 60 seconds.</p>
          <Link href="/check" className="cta-btn">
            Start your free check →
          </Link>
        </section>

      </div>

      {/* STANDARDIZED FOOTER */}
      <footer className="footer">
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="footer-logo">EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
          <div className="footer-sub">The global EV health &amp; history platform</div>
          
          <div className="footer-links">
            <Link href="/about" className="footer-link">About Us</Link>
            <Link href="/how-it-works" className="footer-link">How it works</Link>
            <Link href="/supported-vehicles" className="footer-link">Supported Vehicles</Link>
            <Link href="/blog" className="footer-link">Blog</Link>
            <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link href="/terms" className="footer-link">Terms of Service</Link>
            <Link href="/disclaimer" className="footer-link">Disclaimer</Link>
            <Link href="/contact" className="footer-link">Contact Us</Link>
          </div>
          
          <div className="footer-bottom">
            © 2026 EV2Trust. Built for EV buyers everywhere.
          </div>
        </div>
      </footer>

    </div>
  );
}