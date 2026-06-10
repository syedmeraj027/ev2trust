import { Metadata } from "next";
import Link from "next/link";

// STRICT SEO REQUIREMENT: Dynamic Meta Tags for Global EV Models
export const metadata: Metadata = {
  title: "Supported Vehicles & Compatibility | EV2Trust",
  description: "Check if your electric vehicle is compatible with the EV2Trust battery health tool. Complete support lists for Tesla, Nissan, Chevrolet, Hyundai, and more.",
  keywords: "EV compatibility, OBD2 EV scanner support, Tesla battery check, Nissan Leaf SoH tool, electric car diagnostics",
};

export default function SupportedVehiclesPage() {
  const brands = [
    { name: "Tesla", models: "Model 3, Model Y, Model S, Model X", status: "100% Fully Supported", icon: "⚡" },
    { name: "Nissan", models: "Leaf (All Generations), Ariya", status: "100% Fully Supported", icon: "🍃" },
    { name: "Chevrolet", models: "Bolt EV, Bolt EUV, Volt", status: "Fully Supported", icon: "🔌" },
    { name: "Hyundai & Kia", models: "Ioniq 5, Ioniq 6, Kona EV, EV6, Niro EV", status: "Fully Supported", icon: "🔋" },
    { name: "BMW & Mini", models: "i3, i4, iX3, iX, Cooper SE", status: "Fully Supported", icon: "🏁" },
    { name: "Volkswagen", models: "ID.3, ID.4, ID.5, e-Golf", status: "Fully Supported", icon: "🚗" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <style>{`
        /* SPRING-PHYSICS ANIMATIONS */
        @keyframes springUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-spring { 
          animation: springUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards; 
          opacity: 0; 
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }

        /* INTERACTIVE LINKS & HOVERS */
        .nav-link, .footer-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #16a34a !important; }
        .footer-link:hover { color: #ffffff !important; }
        
        .btn-green-nav {
          background: #16a34a; color: #fff; padding: 8px 20px; border-radius: 8px; 
          font-weight: 600; font-size: 13px; text-decoration: none; 
          box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2); transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-block;
        }
        .btn-green-nav:hover { transform: scale(1.05); }

        /* HERO SECTION */
        .hero-section {
          position: relative;
          padding: 100px 24px 40px 24px;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, #dcfce7 0%, rgba(249, 250, 251, 0) 70%);
        }
        .hero-badge {
          display: inline-block; background: rgba(22, 163, 74, 0.1); color: #15803d;
          padding: 6px 16px; border-radius: 30px; font-size: 13px; font-weight: 800;
          letter-spacing: 1.5px; margin-bottom: 24px; border: 1px solid rgba(22, 163, 74, 0.2);
        }
        .hero-title { font-size: 52px; font-weight: 900; color: #111827; letter-spacing: -1.5px; line-height: 1.15; margin-bottom: 20px; }
        .hero-sub { color: #4b5563; font-size: 19px; max-width: 680px; margin: 0 auto; line-height: 1.6; }

        /* VEHICLE MATRIX GRID */
        .matrix-container {
          max-width: 1100px; margin: 0 auto; padding: 20px 24px 80px 24px; width: 100%; box-sizing: border-box;
        }
        .matrix-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
        }
        .brand-card {
          background: #ffffff; border: 1px solid #e5e7eb; border-radius: 24px; padding: 32px;
          display: flex; gap: 24px; align-items: flex-start;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }
        .brand-card:hover {
          transform: translateY(-6px);
          border-color: #86efac;
          box-shadow: 0 20px 40px -10px rgba(22, 163, 74, 0.1);
        }
        .brand-icon-box {
          width: 64px; height: 64px; background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 16px; display: flex; align-items: center; justify-content: center;
          font-size: 28px; flex-shrink: 0; transition: transform 0.3s ease;
        }
        .brand-card:hover .brand-icon-box {
          transform: scale(1.1) rotate(4deg);
          background: #f0fdf4; border-color: #bbf7d0;
        }

        /* HARDWARE REQUIREMENT NOTICE BANNER */
        .notice-banner {
          background: #111827; border-radius: 24px; padding: 48px; text-align: center;
          color: #fff; margin-top: 56px; position: relative; overflow: hidden;
        }
        .notice-banner::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at 50% 0%, rgba(22, 163, 74, 0.15) 0%, transparent 50%); pointer-events: none;
        }

        /* MOBILE RESPONSIVE DESIGN */
        @media (max-width: 768px) {
          .hero-title { font-size: 38px; }
          .matrix-grid { grid-template-columns: 1fr; gap: 16px; }
          .brand-card { flex-direction: column; gap: 16px; padding: 24px; }
        }
      `}</style>

      {/* STANDARDIZED NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
          EV<span style={{ color: "#16a34a" }}>2</span>Trust
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Home
          </Link>
          <Link href="/check" className="btn-green-nav">
            VIN Check →
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section animate-spring">
        <div className="hero-badge">VEHICLE COMPATIBILITY</div>
        <h1 className="hero-title">Supported Vehicles & <br/>Hardware Coverage</h1>
        <p className="hero-sub">
          EV2Trust is completely hardware-agnostic. If your electric car has a standard diagnostic port, our algorithm can decode its battery health.
        </p>
      </section>

      {/* COMPATIBILITY CARDS */}
      <main className="matrix-container">
        <div className="matrix-grid animate-spring delay-1">
          {brands.map((brand, idx) => (
            <div key={idx} className="brand-card">
              <div className="brand-icon-box">{brand.icon}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: 6 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: "#111827", margin: 0 }}>{brand.name}</h2>
                  <span style={{ background: "#eafaf1", color: "#15803d", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
                    {brand.status}
                  </span>
                </div>
                <p style={{ color: "#4b5563", fontSize: 15, fontWeight: 600, margin: "0 0 8px 0" }}>Confirmed Models:</p>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.5, margin: 0 }}>{brand.models}</p>
              </div>
            </div>
          ))}
        </div>

        {/* COMPATIBILITY SUMMARY RULES BANNER */}
        <div className="notice-banner animate-spring delay-2">
          <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12, letterSpacing: -0.5 }}>Don't see your EV on this list?</h3>
          <p style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1.6, maxWidth: 800, margin: "0 auto 0 auto", fontWeight: 500 }}>
            Do not worry. The list above covers our highly optimized custom data templates, but **any electric vehicle manufactured globally after 1996** utilizes a standardized mandatory OBD-II communication protocol. As long as you can pull raw State of Health (SoH) percentages via your diagnostic application, EV2Trust can instantly process your verification report.
          </p>
        </div>
      </main>

      {/* STANDARDIZED 3-TIER FOOTER (REPLACED PRICING WITH SUPPORTED VEHICLES) */}
      <footer style={{ background: "#111827", color: "#9ca3af", padding: "64px 24px 32px 24px", textAlign: "center", marginTop: "auto" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 800, color: "#fff", fontSize: 24, marginBottom: 8 }}>EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
          <p style={{ color: "#6b7280", fontSize: 14, fontWeight: 500 }}>The global EV health & history platform</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginBottom: 32 }}>
          <Link href="/about" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>About Us</Link>
          <Link href="/how-it-works" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>How it works</Link>
          <Link href="/supported-vehicles" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Supported Vehicles</Link>
          <Link href="/privacy-policy" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Privacy Policy</Link>
          <Link href="/terms" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Terms of Service</Link>
          <Link href="/disclaimer" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Disclaimer</Link>
          <Link href="/contact" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Contact Us</Link>
        </div>
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: 32, color: "#4b5563", fontSize: 13 }}>
          © 2026 EV2Trust. All rights reserved.
        </div>
      </footer>
    </div>
  );
}