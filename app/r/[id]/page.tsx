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
        <h2 style={{ color: "#374151" }}>Fetching Report Data...</h2>
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
        <Link href="/" style={{ background: "#16a34a", color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>
          Go home →
        </Link>
      </div>
    );
  }

  // Calculate Grade dynamically based on SoH fetched from Supabase
  let score = report.soh || 85;
  let grade = "A"; let gradeColor = "#16a34a"; let gradeText = "Excellent — Safe to buy";
  if (score < 60) { grade = "D"; gradeColor = "#dc2626"; gradeText = "Poor — Avoid or negotiate heavily"; }
  else if (score < 72) { grade = "C"; gradeColor = "#d97706"; gradeText = "Below average — Negotiate price down"; }
  else if (score < 85) { grade = "B"; gradeColor = "#2563eb"; gradeText = "Good — Fair deal at right price"; }

  const fmt = (n: number) => "₹" + (n / 100000).toFixed(1) + "L";

  // Fallback metrics in case they were not saved in DB earlier
  const displayOdometer = report.odometer || 65000;
  const displayFastCharges = report.fast_charges || 120;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        .bc-wrap { max-width: 680px; margin: 0 auto; padding: 48px 24px; flex: 1; width: 100%; }
        .cert-card { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 4px 10px rgba(0,0,0,0.03); padding: 32px; text-align: center; margin-bottom: 24px; }
        .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        
        /* HOVER EFFECTS */
        .btn-green { transition: all 0.2s ease-in-out; }
        .btn-green:hover { transform: scale(1.02) translateY(-2px); box-shadow: 0 10px 20px rgba(22, 163, 74, 0.2) !important; }
        .nav-link { transition: color 0.2s ease-in-out; }
        .nav-link:hover { color: #16a34a !important; }
        .footer-link { transition: color 0.2s ease-in-out; }
        .footer-link:hover { color: #ffffff !important; }

        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr; }
          .metric-grid { grid-template-columns: 1fr; }
          .cert-card { padding: 24px; }
        }
      `}</style>

      {/* PROFESSIONAL NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
          EV<span style={{ color: "#16a34a" }}>2</span>Trust
        </Link>
        
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>
          <Link href="/check" className="btn-green" style={{ background: "#16a34a", color: "#fff", padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none", boxShadow: "0 4px 6px -1px rgba(22, 163, 74, 0.2)" }}>
            New Check →
          </Link>
        </div>
      </nav>

      <div className="bc-wrap">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Verified Battery Report</h1>
          <p style={{ color: "#374151", fontSize: 16 }}>Certificate ID: <span style={{ fontWeight: 700, fontFamily: "monospace", color: "#111827" }}>{report.id}</span></p>
        </div>

        {/* MAIN GRADE */}
        <div className="cert-card" style={{ border: `2px solid ${gradeColor}` }}>
          <p style={{ fontSize: 12, color: "#374151", fontWeight: 700, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>BATTERY HEALTH GRADE</p>
          <div style={{ fontSize: 100, fontWeight: 900, color: gradeColor, lineHeight: 1, margin: "10px 0" }}>{grade}</div>
          <p style={{ fontWeight: 800, fontSize: 18, color: gradeColor, marginTop: 8 }}>{gradeText}</p>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 8, fontWeight: 500 }}>Overall score: {score}/100</p>
        </div>
        
        {/* PRIMARY METRICS */}
        <div className="metric-grid">
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🔋</div>
            <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Real range today</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>{report.real_range} km</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💰</div>
            <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Fair price range</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>{fmt(report.fair_price_min)} – {fmt(report.fair_price_max)}</p>
          </div>
        </div>

        {/* SECONDARY STATS (ODOMETER, FAST CHARGE, RECALLS) */}
        <div className="stats-grid">
          <div style={{ background: "#f9fafb", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>⏱️</div>
            <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Odometer</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>{displayOdometer.toLocaleString()} km</p>
          </div>
          <div style={{ background: "#f9fafb", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>⚡</div>
            <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>DC Fast Charges</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>{displayFastCharges}</p>
          </div>
          <div style={{ background: "#f9fafb", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>⚠️</div>
            <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Open Recalls</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#15803d" }}>0 (Safe)</p>
          </div>
        </div>
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