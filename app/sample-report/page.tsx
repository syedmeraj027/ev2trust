"use client";
import Link from "next/link";
import { useState } from "react";

export default function SampleReport() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        /* --- NEW HOVER EFFECTS --- */
        .text-link { transition: color 0.2s ease-in-out; }
        .nav-links .text-link:hover { color: #16a34a !important; }
        .footer-links .text-link:hover { color: #fff !important; }
        .btn-hover { transition: all 0.2s ease; }
        .btn-hover:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        /* ------------------------- */

        .report-wrap { max-width: 800px; margin: 0 auto; padding: 48px 24px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        
        .nav-links { display: flex; align-items: center; gap: 24px; font-size: 14px; }
        .nav-btn { background: #16a34a; color: #fff; padding: 8px 18px; border-radius: 8px; font-weight: 600; font-size: 13px; text-decoration: none; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; }
        .mobile-menu { display: none; flex-direction: column; gap: 0; background: #fff; border-top: 1px solid #e5e7eb; padding: 8px 0; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { padding: 12px 24px; font-size: 15px; color: #111827; text-decoration: none; border-bottom: 1px solid #f3f4f6; font-weight: 500; }
        .mobile-menu a:last-child { border-bottom: none; }
        .footer-links { margin-top: 16px; margin-bottom: 16px; display: flex; gap: 16px; flex-wrap: wrap; align-items: center; justify-content: center; }

        @media (max-width: 640px) {
          .report-wrap { padding: 32px 16px; }
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
          .nav-links { display: none; }
          .hamburger { display: block; }
          .footer-links { gap: 10px; font-size: 12px; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
            EV<span style={{ color: "#16a34a" }}>2</span>Trust
          </Link>
          <div className="nav-links">
            <Link href="/sample-report" className="text-link" style={{ color: "#16a34a", textDecoration: "none", fontWeight: 600 }}>Sample Report</Link>
            <Link href="/how-it-works" className="text-link" style={{ color: "#374151", textDecoration: "none" }}>How it works</Link>
            <Link href="/pricing" className="text-link" style={{ color: "#374151", textDecoration: "none" }}>Pricing</Link>
            <Link href="/about" className="text-link" style={{ color: "#374151", textDecoration: "none" }}>About</Link>
            <Link href="/check" className="nav-btn btn-hover">Free Check →</Link>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg width="24" height="24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link href="/sample-report" onClick={() => setMenuOpen(false)}>Sample Report</Link>
          <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <Link href="/check" onClick={() => setMenuOpen(false)} style={{ background: "#16a34a", color: "#fff", margin: "8px 16px", borderRadius: 8, textAlign: "center" }}>Free Check →</Link>
        </div>
      </nav>

      <div className="report-wrap">
        
        {/* Mock Banner */}
        <div style={{ background: "#fef3c7", color: "#92400e", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: "center", marginBottom: 24, border: "1px solid #fde68a" }}>
          👀 This is a sample report. Your actual report will be dynamically generated based on your vehicle's live data.
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>COMPREHENSIVE EV HEALTH REPORT</p>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>2022 Tesla Model 3 Long Range</h1>
            <p style={{ fontSize: 14, color: "#374151", marginTop: 4, fontFamily: "monospace" }}>VIN: 5YJ3E1EA7NF000000</p>
          </div>
          <div style={{ background: "#dcfce7", color: "#15803d", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "1px solid #86efac" }}>
            ✓ Verified Certificate
          </div>
        </div>

        {/* Battery Health Section */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "2px solid #16a34a", marginBottom: 16, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#374151", fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>OVERALL BATTERY GRADE</p>
          <div style={{ fontSize: 80, fontWeight: 900, color: "#16a34a", lineHeight: 1 }}>A</div>
          <p style={{ fontWeight: 800, fontSize: 18, color: "#16a34a", marginTop: 8 }}>Excellent Condition</p>
          <p style={{ color: "#374151", fontSize: 14, marginTop: 6 }}>Battery State of Health (SoH): <strong>94%</strong></p>
        </div>

        {/* Key Metrics */}
        <div className="grid-2" style={{ marginBottom: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📍</div>
            <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>Real Range Estimate</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>498 km</p>
            <p style={{ fontSize: 12, color: "#16a34a", marginTop: 4 }}>Original spec: 530 km</p>
          </div>
          
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💰</div>
            <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 500, marginBottom: 4 }}>Fair Market Value</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>₹32.5L – ₹35.0L</p>
            <p style={{ fontSize: 12, color: "#16a34a", marginTop: 4 }}>Premium retained due to Grade A battery</p>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid-3" style={{ marginBottom: 32 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>Odometer</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>32,450 km</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>DC Fast Charges</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>45 Sessions</p>
          </div>
          <div style={{ background: "#dcfce7", borderRadius: 12, padding: 16, border: "1px solid #86efac", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#15803d", fontWeight: 600, marginBottom: 8 }}>Open Recalls</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#15803d" }}>0 (Clear)</p>
          </div>
        </div>

        {/* Conversion CTA for visitors viewing the sample */}
        <div style={{ background: "#111827", borderRadius: 16, padding: 32, textAlign: "center", color: "#fff" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Want a detailed report like this for your EV?</h2>
          <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>Stop guessing. Know the exact value and battery health of your electric vehicle in under 60 seconds.</p>
          <Link href="/check" className="btn-hover" style={{ background: "#16a34a", color: "#fff", padding: "12px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block" }}>
            Start your free check →
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ background: "#111827", color: "#9ca3af", padding: "40px 24px", textAlign: "center", fontSize: 13 }}>
        <div style={{ fontWeight: 800, color: "#fff", fontSize: 20, marginBottom: 4 }}>
          EV<span style={{ color: "#4ade80" }}>2</span>Trust
        </div>
        <div style={{ color: "#6b7280", marginBottom: 20 }}>The global EV health &amp; history platform</div>
        <div className="footer-links">
          <Link href="/about" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>About</Link>
          <Link href="/how-it-works" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>How it works</Link>
          <Link href="/pricing" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Pricing</Link>
          <Link href="/privacy-policy" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/disclaimer" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Disclaimer</Link>
          <Link href="/contact" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact Us</Link>
        </div>
        <div style={{ color: "#4b5563", marginTop: 8 }}>© 2026 EV2Trust. Built for EV buyers everywhere.</div>
      </footer>
    </div>
  );
}