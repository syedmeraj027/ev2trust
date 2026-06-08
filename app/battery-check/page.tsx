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
      .insert([{ id: reportId, vin: "UNKNOWN", soh, real_range: realRange, fair_price_min: fairMin, fair_price_max: fairMax }]);

    if (error) {
      console.error("Database Error:", error);
      alert("Error saving report.");
    } else {
      setResult({ grade, gradeColor, gradeText, score, realRange, fairPriceMin: fairMin, fairPriceMax: fairMax, reportId });
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
        .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        input::placeholder { color: #6b7280 !important; opacity: 1 !important; }
      `}</style>

      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>EV<span style={{ color: "#16a34a" }}>2</span>Trust</Link>
        <Link href="/check" style={{ fontSize: 14, color: "#111827", textDecoration: "none", fontWeight: 500 }}>← VIN Check</Link>
      </nav>

      <div className="bc-wrap">
        <h1 className="bc-title">Battery Health Check</h1>
        <p className="bc-sub">Enter your OBD data to get a battery grade, real range, and fair price</p>

        {!result && (
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 16, marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#1e40af", marginBottom: 4 }}>💡 How to get your OBD data</p>
            <p style={{ fontSize: 13, color: "#1e40af", lineHeight: 1.6 }}>Get a cheap OBD-II Bluetooth dongle from any auto parts store or online retailer. Plug it into your car and use the free app <strong>Car Scanner</strong> to read your battery State of Health (SoH %).</p>
          </div>
        )}

        {!result ? (
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
            <button onClick={calculate} style={{ width: "100%", marginTop: 24, background: "#4ca64c", color: "#fff", padding: "14px", borderRadius: 8, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
              {loading ? "Saving..." : "Generate Battery Report →"}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: `2px solid ${result.gradeColor}`, textAlign: "center", marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "#374151", fontWeight: 600, marginBottom: 8, letterSpacing: 0.8 }}>BATTERY HEALTH GRADE</p>
              <div style={{ fontSize: 90, fontWeight: 900, color: result.gradeColor, lineHeight: 1 }}>{result.grade}</div>
              <p style={{ fontWeight: 700, fontSize: 16, color: result.gradeColor, marginTop: 8 }}>{result.gradeText}</p>
            </div>
            
            <div className="metric-grid">
              <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#374151", marginBottom: 8 }}>Real range today</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>{result.realRange} km</p>
              </div>
              <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#374151", marginBottom: 8 }}>Fair price range</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{fmt(result.fairPriceMin)} – {fmt(result.fairPriceMax)}</p>
              </div>
            </div>

            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 14, padding: 20, marginBottom: 16 }}>
              <p style={{ fontWeight: 700, color: "#15803d", marginBottom: 10 }}>🔗 Your shareable certificate link</p>
              <div style={{ fontFamily: "monospace", background: "#dcfce7", padding: "10px 14px", borderRadius: 8, color: "#15803d", wordBreak: "break-all" }}>
                ev2trust.com/r/{result.reportId}
              </div>
            </div>

            <button onClick={() => setResult(null)} style={{ width: "100%", background: "#f3f4f6", color: "#111827", padding: "12px", borderRadius: 10, fontWeight: 600, border: "1px solid #e5e7eb", cursor: "pointer" }}>
              ← Check another vehicle
            </button>
          </div>
        )}
      </div>

      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 12 }}>EV<span style={{ color: "#16a34a" }}>2</span>Trust</div>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", fontSize: "14px", marginBottom: "16px", flexWrap: "wrap" }}>
          <Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "#94a3b8", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/disclaimer" style={{ color: "#94a3b8", textDecoration: "none" }}>Disclaimer</Link>
          <Link href="/contact" style={{ color: "#94a3b8", textDecoration: "none" }}>Contact Us</Link>
        </div>
        <p style={{ fontSize: "12px" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</p>
      </footer>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div>Loading...</div>}><BatteryCheckPage /></Suspense>;
}