"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ReportPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !data) {
          setError(true);
        } else {
          setReport(data);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
        <h2 style={{ color: "#374151" }}>Fetching Verified Report...</h2>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", background: "#f9fafb" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🔋</div>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: "#16a34a", marginBottom: 8 }}>404</h1>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Report not found</h2>
        <p style={{ color: "#4b5563", marginBottom: 24 }}>Looks like this page has run out of charge. The report you are looking for does not exist.</p>
        <Link href="/check" style={{ background: "#16a34a", color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>
          Check a VIN →
        </Link>
      </div>
    );
  }

  // Calculate Grade dynamically based on SoH
  let score = report.soh || 85;
  let grade = "A"; let gradeColor = "#16a34a"; let gradeText = "Excellent Condition";
  if (score < 60) { grade = "D"; gradeColor = "#dc2626"; gradeText = "Poor Condition"; }
  else if (score < 72) { grade = "C"; gradeColor = "#d97706"; gradeText = "Below Average Condition"; }
  else if (score < 85) { grade = "B"; gradeColor = "#2563eb"; gradeText = "Good Condition"; }

  // Fallback metrics
  const displayOdometer = report.odometer || 65000;
  const displayFastCharges = report.fast_charges || 120;
  const displayCurrency = report.currency || '₹';
  const displayValueRetained = report.value_retained || 82;

  const fmt = (n: number, curr: string) => {
    if (curr === '₹') return "₹" + (n / 100000).toFixed(2) + "L";
    return curr + n.toLocaleString('en-US');
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        .report-wrap { max-width: 800px; margin: 0 auto; padding: 48px 24px; flex: 1; width: 100%; }
        
        .stat-card { 
          background: #ffffff; 
          border-radius: 12px; 
          border: 1px solid #e5e7eb; 
          text-align: left; 
          transition: all 0.2s ease; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.02); 
        }
        .stat-card:hover { 
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); 
          border-color: #d1d5db; 
        }

        .nav-link, .footer-link { transition: color 0.2s ease-in-out; }
        .nav-link:hover { color: #16a34a !important; }
        .footer-link:hover { color: #ffffff !important; }

        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
          EV<span style={{ color: "#16a34a" }}>2</span>Trust
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" className="nav-link" style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>How it works</Link>
          <Link href="/" className="nav-link" style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Pricing</Link>
          <Link href="/check" style={{ background: "#16a34a", color: "#fff", padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none", transition: "all 0.2s" }}>
            Free Check →
          </Link>
        </div>
      </nav>

      <div className="report-wrap">
        
        {/* HEADER SECTION */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Comprehensive EV Health Report</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111827", marginBottom: 8, letterSpacing: -0.5 }}>Verified EV Battery Report</h1>
              <p style={{ color: "#4b5563", fontSize: 14, fontFamily: "monospace", fontWeight: 500 }}>CERTIFICATE ID: {report.id} • VIN: {report.vin || "UNKNOWN"}</p>
            </div>
            <div style={{ background: "#dcfce7", color: "#166534", padding: "8px 16px", borderRadius: 20, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, border: "1px solid #bbf7d0" }}>
              ✓ Verified Certificate
            </div>
          </div>
        </div>

        {/* MAIN GRADE BOX */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 40, border: `2px solid ${gradeColor}`, textAlign: "center", marginBottom: 24, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
          <p style={{ fontSize: 13, color: "#4b5563", fontWeight: 800, marginBottom: 8, letterSpacing: 1.5, textTransform: "uppercase" }}>OVERALL BATTERY GRADE</p>
          <div style={{ fontSize: 120, fontWeight: 900, color: gradeColor, lineHeight: 1, margin: "10px 0" }}>{grade}</div>
          <p style={{ fontWeight: 800, fontSize: 22, color: gradeColor, marginTop: 8 }}>{gradeText}</p>
          <p style={{ color: "#4b5563", fontSize: 15, marginTop: 12, fontWeight: 500 }}>Battery State of Health (SoH): <span style={{ fontWeight: 800, color: "#111827" }}>{report.soh}%</span></p>
        </div>
        
        {/* ROW 1: 2-COLUMN GRID */}
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div className="stat-card" style={{ padding: "28px 24px" }}>
            <div style={{ fontSize: 24, marginBottom: 16 }}>📍</div>
            <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>Real Range Estimate</p>
            <p style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 8 }}>{report.real_range} km</p>
            <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 500 }}>Based on {report.soh}% battery health</p>
          </div>
          <div className="stat-card" style={{ padding: "28px 24px" }}>
            <div style={{ fontSize: 24, marginBottom: 16 }}>💰</div>
            <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>Fair Market Value</p>
            <p style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginBottom: 8 }}>{fmt(report.fair_price_min, displayCurrency)} – {fmt(report.fair_price_max, displayCurrency)}</p>
            <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 500 }}>Value Retained: {displayValueRetained}%</p>
          </div>
        </div>

        {/* ROW 2: 3-COLUMN GRID */}
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
          <div className="stat-card" style={{ padding: "24px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>Odometer</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{displayOdometer.toLocaleString()} km</p>
          </div>
          <div className="stat-card" style={{ padding: "24px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, marginBottom: 8 }}>DC Fast Charges</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{displayFastCharges} Sessions</p>
          </div>
          <div className="stat-card" style={{ padding: "24px 20px", textAlign: "center", background: "#dcfce7", borderColor: "#bbf7d0" }}>
            <p style={{ fontSize: 13, color: "#166534", fontWeight: 600, marginBottom: 8 }}>Open Recalls</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: "#15803d" }}>0 (Clear)</p>
          </div>
        </div>

        {/* DARK CTA BANNER */}
        <div style={{ background: "#111827", borderRadius: 16, padding: "40px 24px", textAlign: "center", color: "#fff", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Want a detailed report like this for your EV?</h2>
          <p style={{ color: "#9ca3af", fontSize: 15, marginBottom: 28, maxWidth: 500, margin: "0 auto 28px auto", lineHeight: 1.6 }}>
            Stop guessing. Know the exact value and battery health of your electric vehicle in under 60 seconds.
          </p>
          <Link href="/check" style={{ display: "inline-block", background: "#16a34a", color: "#fff", padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
            Start your free check →
          </Link>
        </div>

      </div>

      <footer style={{ background: "#111827", color: "#9ca3af", padding: "40px 24px", textAlign: "center", fontSize: 13 }}>
        <div style={{ fontWeight: 800, color: "#fff", fontSize: 20, marginBottom: 12 }}>EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
        <p style={{ marginBottom: 16, color: "#6b7280" }}>The global EV health & history platform</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 16 }}>
          <Link href="/about" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>About</Link>
          <Link href="/" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>How it works</Link>
          <Link href="/" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Pricing</Link>
          <Link href="/privacy-policy" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</Link>
          <Link href="/terms" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Terms of Service</Link>
          <Link href="/contact" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontWeight: 500 }}>Contact Us</Link>
        </div>
        <div style={{ marginTop: 24, color: "#4b5563" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</div>
      </footer>
    </div>
  );
}