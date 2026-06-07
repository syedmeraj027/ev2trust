"use client";
import { useState, Suspense } from "react";
import Link from "next/link";

function BatteryCheckPage() {
  const [form, setForm] = useState({ soh: "", odometer: "", fastCharges: "", ageYears: "", originalRange: "" });
  const [result, setResult] = useState<null | {
    grade: string; gradeColor: string; gradeText: string;
    score: number; realRange: number; fairPriceMin: number; fairPriceMax: number; reportId: string;
  }>(null);

  function calculate() {
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
    setResult({ grade, gradeColor, gradeText, score, realRange, fairPriceMin: fairMin, fairPriceMax: fairMax, reportId });
  }

  const fmt = (n: number) => "₹" + (n / 100000).toFixed(1) + "L";

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .bc-wrap { max-width: 680px; margin: 0 auto; padding: 48px 24px; }
        .bc-title { font-size: 32px; font-weight: 800; margin-bottom: 8px; color: #111827; text-align: center; }
        .bc-sub { color: #374151; font-size: 16px; text-align: center; margin-bottom: 36px; }
        .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        @media (max-width: 640px) {
          .bc-wrap { padding: 32px 16px; }
          .bc-title { font-size: 24px; }
          .bc-sub { font-size: 14px; margin-bottom: 24px; }
          .metric-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>EV<span style={{ color: "#16a34a" }}>2</span>Trust</Link>
        <Link href="/check" style={{ fontSize: 14, color: "#111827", textDecoration: "none", fontWeight: 500 }}>← VIN Check</Link>
      </nav>

      <div className="bc-wrap">
        <h1 className="bc-title">Battery Health Check</h1>
        <p className="bc-sub">Enter your OBD data to get a battery grade, real range, and fair price</p>

        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1e40af", marginBottom: 4 }}>💡 How to get your OBD data</p>
          <p style={{ fontSize: 13, color: "#1e40af", lineHeight: 1.6 }}>
            Get a cheap OBD-II Bluetooth dongle from any auto parts store or online retailer. Plug it into your car and use the free app <strong>Car Scanner</strong> to read your battery State of Health (SoH %).
          </p>
        </div>

        {!result ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e7eb" }}>
            <div style={{ display: "grid", gap: 18 }}>
              {[
                { key: "soh", label: "Battery State of Health (%)", placeholder: "e.g. 89", hint: "100% = brand new battery. Below 70% = serious concern." },
                { key: "originalRange", label: "Original advertised range (km)", placeholder: "e.g. 400", hint: "Check manufacturer specs for your EV model." },
                { key: "odometer", label: "Total distance driven (km)", placeholder: "e.g. 65000", hint: "Read from the odometer." },
                { key: "fastCharges", label: "Estimated DC fast charges used", placeholder: "e.g. 150", hint: "DC fast charging degrades battery faster than home charging." },
                { key: "ageYears", label: "Age of vehicle (years)", placeholder: "e.g. 3", hint: "" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input
                    type="number"
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 15, outline: "none", color: "#111827" }}
                  />
                  {f.hint && <p style={{ fontSize: 12, color: "#374151", marginTop: 4 }}>{f.hint}</p>}
                </div>
              ))}
            </div>
            <button onClick={calculate} style={{ width: "100%", marginTop: 24, background: "#16a34a", color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
              Generate Battery Report →
            </button>
          </div>
        ) : (
          <div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: `2px solid ${result.gradeColor}`, textAlign: "center", marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "#374151", fontWeight: 600, marginBottom: 8, letterSpacing: 0.8 }}>BATTERY HEALTH GRADE</p>
              <div style={{ fontSize: 90, fontWeight: 900, color: result.gradeColor, lineHeight: 1 }}>{result.grade}</div>
              <p style={{ fontWeight: 700, fontSize: 16, color: result.gradeColor, marginTop: 8 }}>{result.gradeText}</p>
              <p style={{ color: "#374151", fontSize: 14, marginTop: 4 }}>Overall score: {result.score}/100</p>
            </div>

            <div className="metric-grid">
              <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#374151", fontWeight: 500, marginBottom: 8 }}>Real range today</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>{result.realRange} km</p>
              </div>
              <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#374151", fontWeight: 500, marginBottom: 8 }}>Fair price range</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{fmt(result.fairPriceMin)} – {fmt(result.fairPriceMax)}</p>
              </div>
            </div>

            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 14, padding: 20, marginBottom: 16 }}>
              <p style={{ fontWeight: 700, color: "#15803d", marginBottom: 10, fontSize: 15 }}>🔗 Your shareable certificate link</p>
              <div style={{ fontFamily: "monospace", background: "#dcfce7", padding: "10px 14px", borderRadius: 8, fontSize: 13, color: "#15803d", wordBreak: "break-all" }}>
                ev2trust.com/r/{result.reportId}
              </div>
              <p style={{ fontSize: 12, color: "#374151", marginTop: 8 }}>Paste this link in your OLX, CarDekho, or Autotrader listing. Buyers can verify this report instantly.</p>
            </div>

            <button onClick={() => setResult(null)} style={{ width: "100%", background: "#f3f4f6", color: "#111827", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, border: "1px solid #e5e7eb", cursor: "pointer" }}>
              ← Check another vehicle
            </button>
          </div>
        )}
      </div>

      <footer style={{ background: "#111827", color: "#9ca3af", padding: "32px 24px", textAlign: "center", fontSize: 13, marginTop: 40 }}>
        <div style={{ fontWeight: 800, color: "#fff", fontSize: 18, marginBottom: 8 }}>EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginTop: 12 }}>
          <Link href="/privacy-policy" style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "#9ca3af", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/disclaimer" style={{ color: "#9ca3af", textDecoration: "none" }}>Disclaimer</Link>
          <Link href="/contact" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact Us</Link>
        </div>
        <div style={{ marginTop: 12, color: "#4b5563" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</div>
      </footer>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading...</div>}><BatteryCheckPage /></Suspense>;
}