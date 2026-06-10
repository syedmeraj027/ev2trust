"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .text-link { transition: color 0.2s ease-in-out; }
        .nav-links .text-link:hover { color: #16a34a !important; }
        .footer-links .text-link:hover { color: #fff !important; }
        .btn-hover { transition: all 0.2s ease; }
        .btn-hover:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .nav-links { display: flex; align-items: center; gap: 24px; font-size: 14px; }
        .nav-btn { background: #16a34a; color: #fff; padding: 8px 18px; border-radius: 8px; font-weight: 600; font-size: 13px; text-decoration: none; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; }
        .mobile-menu { display: none; flex-direction: column; gap: 0; background: #fff; border-top: 1px solid #e5e7eb; padding: 8px 0; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { padding: 12px 24px; font-size: 15px; color: #111827; text-decoration: none; border-bottom: 1px solid #f3f4f6; font-weight: 500; }
        .hero-title { font-size: 52px; font-weight: 800; line-height: 1.15; color: #111827; margin-bottom: 20px; }
        .hero-section { text-align: center; padding: 80px 24px 60px; max-width: 720px; margin: 0 auto; }
        .vin-box { display: flex; gap: 10px; max-width: 560px; margin: 0 auto 16px; background: #fff; padding: 8px; border-radius: 14px; border: 1.5px solid #e5e7eb; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        .vin-input { flex: 1; border: none; outline: none; font-size: 15px; padding: 10px 14px; background: transparent; color: #111827; }
        .vin-btn { background: #16a34a; color: #fff; padding: 12px 20px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; }
        @media (max-width: 640px) { .nav-links { display: none; } .hamburger { display: block; } .hero-title { font-size: 36px; } }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
            EV<span style={{ color: "#16a34a" }}>2</span>Trust
          </Link>
          <div className="nav-links">
            <Link href="/sample-report" className="text-link" style={{ color: "#374151", textDecoration: "none" }}>Sample Report</Link>
            <Link href="/how-it-works" className="text-link" style={{ color: "#374151", textDecoration: "none" }}>How it works</Link>
            <Link href="/supported-vehicles" className="text-link" style={{ color: "#374151", textDecoration: "none" }}>Supported Vehicles</Link>
            <Link href="/blog" className="text-link" style={{ color: "#374151", textDecoration: "none" }}>Blog</Link>
            <Link href="/check" className="nav-btn btn-hover">Free Check →</Link>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      <section className="hero-section">
        <h1 className="hero-title">Know your EV&apos;s <span style={{ color: "#16a34a" }}>true health</span> before you buy</h1>
        <p style={{ fontSize: 18, color: "#6b7280", marginBottom: 40 }}>Enter any EV&apos;s VIN number and get a complete battery health report, real range, recall alerts, and fair price — in 60 seconds.</p>
        <div className="vin-box">
          <input type="text" placeholder="Enter VIN — e.g. 5YJ3E1EA7JF000001" maxLength={17} className="vin-input" />
          <Link href="/check" className="vin-btn btn-hover">Check free →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827", color: "#9ca3af", padding: "40px 24px", textAlign: "center", fontSize: 13 }}>
        <div style={{ fontWeight: 800, color: "#fff", fontSize: 20 }}>EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
        <div style={{ margin: "16px 0", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/about" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>About</Link>
          <Link href="/how-it-works" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>How it works</Link>
          <Link href="/supported-vehicles" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Supported Vehicles</Link>
          <Link href="/blog" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Blog</Link>
          <Link href="/privacy-policy" className="text-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
        </div>
        <div style={{ color: "#4b5563" }}>© 2026 EV2Trust. All rights reserved.</div>
      </footer>
    </div>
  );
}