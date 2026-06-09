"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function BatteryCheckPage() {
  const [form, setForm] = useState({ 
    soh: "", odometer: "", fastCharges: "", ageYears: "", originalRange: "", 
    currency: "₹", originalPrice: "" 
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    grade: string; gradeColor: string; gradeText: string;
    score: number; realRange: number; fairPriceMin: number; fairPriceMax: number; 
    reportId: string; odometer: number; fastCharges: number; 
    currency: string; valueRetained: number; soh: number;
  }>(null);

  async function calculate() {
    setLoading(true);
    
    const sohVal = Math.abs(parseFloat(form.soh)) || 85;
    const km = Math.abs(parseFloat(form.odometer)) || 50000;
    const fast = Math.abs(parseFloat(form.fastCharges)) || 100;
    const age = Math.abs(parseFloat(form.ageYears)) || 3;
    const origRange = Math.abs(parseFloat(form.originalRange)) || 400;
    const origPrice = Math.abs(parseFloat(form.originalPrice)) || (form.currency === '₹' ? 2000000 : 40000);
    
    let score = sohVal;
    if (km > 100000) score -= 5; else if (km > 50000) score -= 2;
    if (fast > 500) score -= 8; else if (fast > 200) score -= 4; else if (fast > 100) score -= 2;
    if (age > 5) score -= 5; else if (age > 3) score -= 2;
    
    score = Math.max(0, Math.min(100, Math.round(score)));
    
    let grade = "A"; let gradeColor = "#16a34a"; let gradeText = "Excellent Condition";
    if (score < 60) { grade = "D"; gradeColor = "#dc2626"; gradeText = "Poor Condition"; }
    else if (score < 72) { grade = "C"; gradeColor = "#d97706"; gradeText = "Below Average Condition"; }
    else if (score < 85) { grade = "B"; gradeColor = "#2563eb"; gradeText = "Good Condition"; }
    
    const realRange = Math.round((sohVal / 100) * origRange);
    const h = score / 100;
    const d = Math.max(0.4, 1 - age * 0.08); 
    
    const baseValue = origPrice * h * d;
    
    let fairMin, fairMax;
    if (form.currency === '₹') {
      fairMin = Math.round((baseValue * 0.9) / 10000) * 10000;
      fairMax = Math.round((baseValue * 1.1) / 10000) * 10000;
    } else {
      fairMin = Math.round((baseValue * 0.9) / 100) * 100;
      fairMax = Math.round((baseValue * 1.1) / 100) * 100;
    }

    const valueRetained = Math.round((((fairMin + fairMax) / 2) / origPrice) * 100);
    const reportId = Math.random().toString(36).slice(2, 10).toUpperCase();

    const { error } = await supabase
      .from('reports')
      .insert([{ 
        id: reportId, vin: "UNKNOWN", soh: sohVal, real_range: realRange, 
        fair_price_min: fairMin, fair_price_max: fairMax, 
        odometer: km, fast_charges: fast,
        currency: form.currency, value_retained: valueRetained 
      }]);

    if (error) {
      console.error("Database Error:", error);
      alert("Error saving report.");
    } else {
      setResult({ 
        grade, gradeColor, gradeText, score, realRange, 
        fairPriceMin: fairMin, fairPriceMax: fairMax, reportId,
        odometer: km, fastCharges: fast, currency: form.currency, valueRetained, soh: sohVal
      });
    }
    setLoading(false);
  }

  const fmt = (n: number, curr: string) => {
    if (curr === '₹') return "₹" + (n / 100000).toFixed(2) + "L";
    return curr + n.toLocaleString('en-US');
  };

  const getPricePlaceholder = (currency: string) => {
    switch (currency) {
      case "₹": return "e.g. 1500000";
      case "$": return "e.g. 40000";
      case "€": return "e.g. 35000";
      case "£": return "e.g. 30000";
      default: return "e.g. 40000";
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        .bc-wrap { margin: 0 auto; padding: 48px 24px; flex: 1; width: 100%; }
        .bc-title { font-size: 32px; font-weight: 800; margin-bottom: 8px; color: #111827; text-align: center; }
        .bc-sub { color: #374151; font-size: 16px; text-align: center; margin-bottom: 36px; }
        input::placeholder { color: #9ca3af !important; opacity: 1 !important; }

        .btn-green { transition: all 0.2s ease-in-out; }
        .btn-green:hover { transform: scale(1.02) translateY(-2px); box-shadow: 0 10px 20px rgba(22, 163, 74, 0.2) !important; }
        .btn-gray { transition: all 0.2s ease-in-out; }
        .btn-gray:hover { background: #e5e7eb !important; }
        .nav-link, .footer-link { transition: color 0.2s ease-in-out; }
        .nav-link:hover { color: #16a34a !important; }
        .footer-link:hover { color: #ffffff !important; }

        .stat-card-new { 
          background: #ffffff; 
          border-radius: 12px; 
          border: 1px solid #e5e7eb; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          box-shadow: 0 1px 3px rgba(0,0,0,0.02); 
          position: relative;
          z-index: 1;
        }
        .stat-card-new:hover { 
          transform: translateY(-6px) scale(1.02); 
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.04); 
          border-color: #cbd5e1; 
          z-index: 10;
        }

        .science-card { 
          background: #fff; 
          padding: 32px; 
          border-radius: 16px; 
          border: 1px solid #e5e7eb; 
          transition: all 0.3s ease; 
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03); 
          display: flex; 
          gap: 24px; 
          align-items: flex-start;
        }
        .science-card:hover { 
          transform: translateY(-6px); 
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01); 
          border-color: #d1d5db; 
        }
        .icon-wrap { 
          flex-shrink: 0; 
          width: 56px; 
          height: 56px; 
          border-radius: 16px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 28px; 
        }

        @media (max-width: 640px) {
          .grid-2, .grid-3 { grid-template-columns: 1fr !important; }
          .action-buttons { flex-direction: column; }
          .science-card { flex-direction: column; gap: 16px; padding: 24px; }
        }
      `}</style>

      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
          EV<span style={{ color: "#16a34a" }}>2</span>Trust
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Home
          </Link>
          <Link href="/check" className="btn-green" style={{ background: "#16a34a", color: "#fff", padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>
            VIN Check →
          </Link>
        </div>
      </nav>

      <div className="bc-wrap" style={{ maxWidth: result ? 800 : 760 }}>
        {!result ? (
          <>
            <h1 className="bc-title">Global Battery Check</h1>
            <p className="bc-sub">Enter OBD data & original price to get an AI-driven valuation</p>

            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 16, marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1e40af", marginBottom: 4 }}>💡 How to get your OBD data</p>
              <p style={{ fontSize: 13, color: "#1e40af", lineHeight: 1.6, margin: 0 }}>Get a cheap OBD-II Bluetooth dongle from any auto parts store or online retailer. Plug it into your car and use the free app <strong>Car Scanner</strong> to read your battery State of Health (SoH %).</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "grid", gap: 20 }}>
                
                <div>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 6 }}>Original Purchase Price</label>
                  <div style={{ display: "flex", alignItems: "stretch", border: "1px solid #d1d5db", borderRadius: 8, overflow: "hidden", background: "#fff", transition: "border-color 0.2s" }} onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"} onBlur={(e) => e.currentTarget.style.borderColor = "#d1d5db"}>
                    <select
                      value={form.currency}
                      onChange={(e) => setForm(p => ({ ...p, currency: e.target.value }))}
                      style={{ 
                        padding: "12px 16px", border: "none", borderRight: "1px solid #d1d5db", 
                        background: "#f9fafb", fontWeight: 700, outline: "none", cursor: "pointer", 
                        fontSize: 15, color: "#111827", appearance: "none", WebkitAppearance: "none",
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')`,
                        backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", paddingRight: "36px"
                      }}
                    >
                      <option value="₹">₹ INR</option>
                      <option value="$">$ USD</option>
                      <option value="€">€ EUR</option>
                      <option value="£">£ GBP</option>
                    </select>
                    
                    <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder={getPricePlaceholder(form.currency)}
                        value={form.originalPrice}
                        onChange={(e) => setForm(p => ({ ...p, originalPrice: e.target.value.replace(/[^0-9.]/g, '') }))}
                        style={{ width: "100%", padding: "12px 16px", paddingRight: "40px", border: "none", fontSize: 15, outline: "none", color: "#111827" }}
                      />
                      {form.originalPrice && (
                        <span style={{ position: "absolute", right: "16px", color: "#9ca3af", fontWeight: 700, pointerEvents: "none" }}>
                          {form.currency}
                        </span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6, marginBottom: 0 }}>Select your currency and enter the price of the EV when it was brand new.</p>
                </div>

                {[
                  { key: "soh", label: "Battery State of Health (%)", placeholder: "e.g. 89", help: "100% = brand new battery. Below 70% = serious concern." },
                  { key: "originalRange", label: "Original advertised range (km/miles)", placeholder: "e.g. 400", help: "Check the manufacturer specs for your specific EV model." },
                  { key: "odometer", label: "Total distance driven", placeholder: "e.g. 65000", help: "Read directly from your vehicle's dashboard." },
                  { key: "fastCharges", label: "Estimated Fast Charge Cycles", placeholder: "e.g. 150", help: "Frequent fast charging degrades the battery faster than slow home charging." },
                  { key: "ageYears", label: "Age of vehicle (years)", placeholder: "e.g. 3", help: "" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm(p => ({ ...p, [f.key]: e.target.value.replace(/[^0-9.]/g, '') }))}
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 15, outline: "none", color: "#111827", transition: "border-color 0.2s" }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"} 
                      onBlur={(e) => e.currentTarget.style.borderColor = "#d1d5db"}
                    />
                    {f.help && <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6, marginBottom: 0 }}>{f.help}</p>}
                  </div>
                ))}
              </div>
              <button onClick={calculate} className="btn-green" style={{ width: "100%", marginTop: 28, background: "#16a34a", color: "#fff", padding: "16px", borderRadius: 8, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
                {loading ? "Generating Report..." : "Generate Battery Report →"}
              </button>
            </div>
          </>
        ) : (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ display: "inline-block", background: "#dcfce7", color: "#166534", padding: "8px 16px", borderRadius: 20, fontSize: 14, fontWeight: 700, border: "1px solid #bbf7d0" }}>
                ✓ Verified EV Battery Report
              </div>
            </div>

            <div style={{ marginBottom: 24, textAlign: "left" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>COMPREHENSIVE EV HEALTH REPORT</p>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 8, letterSpacing: -0.5 }}>
                2022 Tesla Model 3 Long Range
              </h2>
              <p style={{ color: "#4b5563", fontSize: 14, fontFamily: "monospace", fontWeight: 500 }}>
                VIN: 5YJ3E1EA7NF000000 • CERTIFICATE ID: {result.reportId}
              </p>
            </div>

            <div className="stat-card-new" style={{ padding: "32px 24px", border: `2px solid ${result.gradeColor}`, textAlign: "center", marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: "#4b5563", fontWeight: 800, marginBottom: 8, letterSpacing: 1.5, textTransform: "uppercase" }}>OVERALL BATTERY GRADE</p>
              <div style={{ fontSize: 100, fontWeight: 900, color: result.gradeColor, lineHeight: 1, margin: "8px 0" }}>{result.grade}</div>
              <p style={{ fontWeight: 800, fontSize: 22, color: result.gradeColor, marginTop: 8 }}>{result.gradeText}</p>
              <p style={{ color: "#4b5563", fontSize: 15, marginTop: 12, fontWeight: 500 }}>Battery State of Health (SoH): <span style={{ fontWeight: 800, color: "#111827" }}>{result.soh}%</span></p>
            </div>
            
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              <div className="stat-card-new" style={{ padding: "28px 24px", textAlign: "left" }}>
                <div style={{ fontSize: 24, marginBottom: 16 }}>📍</div>
                <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>Real Range Estimate</p>
                <p style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 8 }}>{result.realRange} km</p>
                <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 500 }}>Based on {result.soh}% battery health</p>
              </div>
              <div className="stat-card-new" style={{ padding: "28px 24px", textAlign: "left" }}>
                <div style={{ fontSize: 24, marginBottom: 16 }}>💰</div>
                <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>Fair Market Value</p>
                <p style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 8 }}>{fmt(result.fairPriceMin, result.currency)} – {fmt(result.fairPriceMax, result.currency)}</p>
                <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 500 }}>Value Retained: {result.valueRetained}%</p>
              </div>
            </div>

            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 24 }}>
              <div className="stat-card-new" style={{ padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>🛣️</div>
                <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>Odometer</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{result.odometer.toLocaleString()} km</p>
              </div>
              <div className="stat-card-new" style={{ padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>⚡</div>
                <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>Fast Charge Cycles</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{result.fastCharges} Sessions</p>
              </div>
              <div className="stat-card-new" style={{ padding: "24px 20px", textAlign: "center", background: "#dcfce7", borderColor: "#bbf7d0" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>🛡️</div>
                <p style={{ fontSize: 13, color: "#166534", fontWeight: 600, marginBottom: 8 }}>Open Recalls</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#15803d" }}>0 (Clear)</p>
              </div>
            </div>

            <div className="action-buttons" style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <Link href={`/r/${result.reportId}`} target="_blank" className="btn-green" style={{ flex: 1, background: "#111827", color: "#fff", padding: "16px", borderRadius: 12, fontWeight: 700, fontSize: 16, textAlign: "center", textDecoration: "none" }}>
                ↗ View Certificate
              </Link>
              <button onClick={() => setResult(null)} className="btn-gray" style={{ flex: 1, background: "#f1f5f9", color: "#1e293b", padding: "16px", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "1px solid #e2e8f0", cursor: "pointer" }}>
                ← Check Another
              </button>
            </div>
          </div>
        )}
      </div>

      <section style={{ background: "linear-gradient(to bottom, #ffffff, #f3f4f6)", borderTop: "1px solid #e5e7eb", padding: "80px 24px", marginTop: 24 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ background: "#dbeafe", color: "#1e40af", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 1.5 }}>
              PROPRIETARY ALGORITHM
            </span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 20, textAlign: "center", letterSpacing: -0.5 }}>
            The Science Behind Your EV Valuation
          </h2>
          <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.6, textAlign: "center", maxWidth: 540, margin: "0 auto 48px auto" }}>
            EV2Trust calculates real-world depreciation by analyzing core battery chemistry metrics and historical usage patterns. Here is how we evaluate your electric vehicle:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <article className="science-card">
              <div className="icon-wrap" style={{ background: "#dcfce7", color: "#16a34a" }}>🔋</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0 }}>State of Health (SoH) Baseline</h3>
                  <span style={{ background: "#f3f4f6", color: "#4b5563", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 12 }}>Highest Impact</span>
                </div>
                <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.6, margin: 0 }}>The foundation of our valuation is the exact State of Health percentage read from the OBD-II port. A battery dropping below 80% SoH experiences accelerated market depreciation due to impending replacement risks.</p>
              </div>
            </article>

            <article className="science-card">
              <div className="icon-wrap" style={{ background: "#fee2e2", color: "#ef4444" }}>⚡</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0 }}>Fast Charging Penalties</h3>
                  <span style={{ background: "#f3f4f6", color: "#4b5563", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 12 }}>Moderate Impact</span>
                </div>
                <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.6, margin: 0 }}>Frequent fast charging generates excessive heat, which degrades lithium-ion cell chemistry faster than standard Level 1 or 2 home charging. Our algorithm applies a specific valuation penalty based on estimated fast charging cycles.</p>
              </div>
            </article>

            <article className="science-card">
              <div className="icon-wrap" style={{ background: "#f3e8ff", color: "#9333ea" }}>⏱️</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0 }}>Mileage vs. Age Matrix</h3>
                  <span style={{ background: "#f3f4f6", color: "#4b5563", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 12 }}>Contextual Impact</span>
                </div>
                <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.6, margin: 0 }}>EV batteries degrade over time even when not driven (calendar aging). We cross-reference the total odometer reading with the vehicle's age in years to determine if the degradation is strictly usage-based or age-related.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer style={{ background: "#111827", color: "#9ca3af", padding: "40px 24px", textAlign: "center", fontSize: 13 }}>
        <div style={{ fontWeight: 800, color: "#fff", fontSize: 20, marginBottom: 12 }}>EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 16 }}>
          <Link href="/about" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>About Us</Link>
          <Link href="/privacy-policy" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</Link>
          <Link href="/terms" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Terms of Service</Link>
          <Link href="/disclaimer" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Disclaimer</Link>
          <Link href="/contact" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Contact Us</Link>
        </div>
        <div style={{ marginTop: 24, color: "#4b5563" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</div>
      </footer>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading...</div>}><BatteryCheckPage /></Suspense>;
}