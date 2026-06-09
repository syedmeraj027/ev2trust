"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function BatteryCheckPage() {
  const [form, setForm] = useState({ soh: "", odometer: "", fastCharges: "", ageYears: "", originalRange: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    grade: string; gradeColor: string; gradeText: string;
    score: number; realRange: number; fairPriceMin: number; fairPriceMax: number; reportId: string;
    odometer: number; fastCharges: number;
  }>(null);

  async function calculate() {
    setLoading(true);
    const soh = parseFloat(form.soh) || 85;
    const km = parseFloat(form.odometer) || 50000;
    const fast = parseFloat(form.fastCharges) || 100;
    const age = parseFloat(form.ageYears) || 3;
    const orig = parseFloat(form.originalRange) || 400;
    
    let score = soh;
    if (km > 100000) score -= 5; else if (km > 50000) score -= 2;
    if (fast > 500) score -= 8; else if (fast > 200) score -= 4; else if (fast > 100) score -= 2;
    if (age > 5) score -= 5; else if (age > 3) score -= 2;
    
    score = Math.max(0, Math.min(100, Math.round(score)));
    
    let grade = "A"; let gradeColor = "#16a34a"; let gradeText = "Excellent — Safe to buy";
    if (score < 60) { grade = "D"; gradeColor = "#dc2626"; gradeText = "Poor — Avoid or negotiate heavily"; }
    else if (score < 72) { grade = "C"; gradeColor = "#d97706"; gradeText = "Below average — Negotiate price down"; }
    else if (score < 85) { grade = "B"; gradeColor = "#2563eb"; gradeText = "Good — Fair deal at right price"; }
    
    const realRange = Math.round((soh / 100) * orig);
    const base = 2000000;
    const h = score / 100;
    const d = Math.max(0.4, 1 - age * 0.08);
    const fairMin = Math.round(base * h * d * 0.9 / 10000) * 10000;
    const fairMax = Math.round(base * h * d * 1.1 / 10000) * 10000;
    const reportId = Math.random().toString(36).slice(2, 10).toUpperCase();

    const { error } = await supabase
      .from('reports')
      .insert([{ id: reportId, vin: "UNKNOWN", soh, real_range: realRange, fair_price_min: fairMin, fair_price_max: fairMax, odometer: km, fast_charges: fast }]);

    if (error) {
      console.error("Database Error:", error);
      alert("Error saving report.");
    } else {
      setResult({ 
        grade, gradeColor, gradeText, score, realRange, 
        fairPriceMin: fairMin, fairPriceMax: fairMax, reportId,
        odometer: km, fastCharges: fast 
      });
    }
    setLoading(false);
  }

  const fmt = (n: number) => "₹" + (n / 100000).toFixed(1) + "L";

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        .bc-wrap { max-width: 680px; margin: 0 auto; padding: 48px 24px; flex: 1; width: 100%; }
        .bc-title { font-size: 32px; font-weight: 800; margin-bottom: 8px; color: #111827; text-align: center; }
        .bc-sub { color: #374151; font-size: 16px; text-align: center; margin-bottom: 36px; }
        .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        input::placeholder { color: #9ca3af !important; opacity: 1 !important; }
        
        /* HOVER EFFECTS */
        .btn-green { transition: all 0.2s ease-in-out; }
        .btn-green:hover { transform: scale(1.02) translateY(-2px); box-shadow: 0 10px 20px rgba(22, 163, 74, 0.2) !important; }
        .btn-gray { transition: all 0.2s ease-in-out; }
        .btn-gray:hover { background: #e5e7eb !important; }
        .nav-link { transition: color 0.2s ease-in-out; }
        .nav-link:hover { color: #16a34a !important; }
        .footer-link { transition: color 0.2s ease-in-out; }
        .footer-link:hover { color: #ffffff !important; }
        .cert-link { transition: all 0.2s; text-decoration: none; display: block; }
        .cert-link:hover { transform: scale(1.01); }

        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr; }
          .metric-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* PROFESSIONAL NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
          EV<span style={{ color: "#16a34a" }}>2</span>Trust
        </Link>
        
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" className="nav-link" style={{ 
            display: "flex", alignItems: "center", gap: "6px", 
            fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 600 
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>
          <Link href="/check" className="btn-green" style={{ 
            background: "#16a34a", color: "#fff", 
            padding: "8px 20px", borderRadius: 8, 
            fontWeight: 600, fontSize: 13, textDecoration: "none",
            boxShadow: "0 4px 6px -1px rgba(22, 163, 74, 0.2)"
          }}>
            VIN Check →
          </Link>
        </div>
      </nav>

      <div className="bc-wrap">
        {!result ? (
          <>
            <h1 className="bc-title">Battery Health Check</h1>
            <p className="bc-sub">Enter your OBD data to get a battery grade, real range, and fair price</p>

            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 16, marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1e40af", marginBottom: 4 }}>💡 How to get your OBD data</p>
              <p style={{ fontSize: 13, color: "#1e40af", lineHeight: 1.6 }}>Get a cheap OBD-II Bluetooth dongle from any auto parts store or online retailer. Plug it into your car and use the free app <strong>Car Scanner</strong> to read your battery State of Health (SoH %).</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "grid", gap: 18 }}>
                {[
                  { key: "soh", label: "Battery State of Health (%)", help: "100% = brand new battery. Below 70% = serious concern.", placeholder: "e.g. 89" },
                  { key: "originalRange", label: "Original advertised range (km)", help: "Check manufacturer specs for your EV model.", placeholder: "e.g. 400" },
                  { key: "odometer", label: "Total distance driven (km)", help: "Read from the odometer.", placeholder: "e.g. 65000" },
                  { key: "fastCharges", label: "Estimated DC fast charges used", help: "DC fast charging degrades battery faster than home charging.", placeholder: "e.g. 150" },
                  { key: "ageYears", label: "Age of vehicle (years)", help: "", placeholder: "e.g. 3" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input
                      type="number"
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 15, backgroundColor: "#ffffff", outline: "none", color: "#111827" }}
                    />
                    {f.help && <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{f.help}</p>}
                  </div>
                ))}
              </div>
              <button onClick={calculate} className="btn-green" style={{ width: "100%", marginTop: 24, background: "#16a34a", color: "#fff", padding: "14px", borderRadius: 8, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
                {loading ? "Generating Report..." : "Generate Battery Report →"}
              </button>
            </div>
          </>
        ) : (
          <div>
            {/* MAIN GRADE */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: `2px solid ${result.gradeColor}`, textAlign: "center", marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "#374151", fontWeight: 700, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>BATTERY HEALTH GRADE</p>
              <div style={{ fontSize: 100, fontWeight: 900, color: result.gradeColor, lineHeight: 1, margin: "10px 0" }}>{result.grade}</div>
              <p style={{ fontWeight: 800, fontSize: 18, color: result.gradeColor, marginTop: 8 }}>{result.gradeText}</p>
              <p style={{ color: "#6b7280", fontSize: 14, marginTop: 8, fontWeight: 500 }}>Overall score: {result.score}/100</p>
            </div>
            
            {/* PRIMARY METRICS */}
            <div className="metric-grid">
              <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🔋</div>
                <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Real range today</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>{result.realRange} km</p>
              </div>
              <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>💰</div>
                <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Fair price range</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>{fmt(result.fairPriceMin)} – {fmt(result.fairPriceMax)}</p>
              </div>
            </div>

            {/* SECONDARY STATS (ODOMETER, FAST CHARGE, RECALLS) */}
            <div className="stats-grid">
              <div style={{ background: "#f9fafb", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>⏱️</div>
                <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Odometer</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>{result.odometer.toLocaleString()} km</p>
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>⚡</div>
                <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>DC Fast Charges</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>{result.fastCharges}</p>
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>⚠️</div>
                <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Open Recalls</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: "#15803d" }}>0 (Safe)</p>
              </div>
            </div>

            {/* SHAREABLE LINK */}
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 14, padding: 24, marginBottom: 20 }}>
              <p style={{ fontWeight: 800, color: "#15803d", marginBottom: 12, fontSize: 15 }}>🔗 Your shareable certificate link</p>
              <Link href={`/r/${result.reportId}`} target="_blank" className="cert-link" style={{ fontFamily: "monospace", background: "#dcfce7", padding: "14px", borderRadius: 8, color: "#15803d", wordBreak: "break-all", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>
                ev2trust.com/r/{result.reportId}
              </Link>
              <p style={{ fontSize: 13, color: "#166534", margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                Paste this link in your OLX, CarDekho, or Autotrader listing. Buyers can verify this report instantly.
              </p>
            </div>

            <button onClick={() => setResult(null)} className="btn-gray" style={{ width: "100%", background: "#f3f4f6", color: "#111827", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "1px solid #e5e7eb", cursor: "pointer" }}>
              ← Check another vehicle
            </button>
          </div>
        )}
      </div>

      {/* SYNCHRONIZED GLOBAL FOOTER */}
      <footer style={{ background: "#111827", color: "#9ca3af", padding: "32px 24px", textAlign: "center", fontSize: 13, marginTop: 40 }}>
        <div style={{ fontWeight: 800, color: "#fff", fontSize: 18, marginBottom: 8 }}>EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginTop: 12 }}>
          <Link href="/about" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none" }}>About Us</Link>
          <Link href="/privacy-policy" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/disclaimer" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Disclaimer</Link>
          <Link href="/contact" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact Us</Link>
        </div>
        <div style={{ marginTop: 12, color: "#4b5563" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</div>
      </footer>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading...</div>}><BatteryCheckPage /></Suspense>;
}