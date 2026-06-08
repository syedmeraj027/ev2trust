import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

// This is a dynamic server component. It gets the 'id' from the URL.
export default async function ReportPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // 1. Fetch the exact report from Supabase
  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();

  // 2. If no report is found (wrong link), show a 404 page
  if (error || !report) {
    return notFound();
  }

  // 3. Re-calculate the Grade based on the saved SoH
  let grade = "A"; let gradeColor = "#16a34a"; let gradeText = "Excellent — Safe to buy";
  if (report.soh < 60) { grade = "D"; gradeColor = "#dc2626"; gradeText = "Poor — Avoid or negotiate heavily"; }
  else if (report.soh < 72) { grade = "C"; gradeColor = "#d97706"; gradeText = "Below average — Negotiate price down"; }
  else if (report.soh < 85) { grade = "B"; gradeColor = "#2563eb"; gradeText = "Good — Fair deal at right price"; }

  const fmt = (n: number) => "₹" + (n / 100000).toFixed(1) + "L";
  
  // Format the date
  const reportDate = new Date(report.created_at).toLocaleDateString("en-IN", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      
      {/* NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>EV<span style={{ color: "#16a34a" }}>2</span>Trust</Link>
          <Link href="/" style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>Home</Link>
        </div>
        <Link href="/battery-check" style={{ fontSize: 14, color: "#16a34a", textDecoration: "none", fontWeight: 600 }}>Create New Report →</Link>
      </nav>

      {/* CERTIFICATE CONTAINER */}
      <div style={{ flex: 1, padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ background: "#fff", width: "100%", maxWidth: "800px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #e5e7eb" }}>
          
          {/* HEADER */}
          <div style={{ background: "#0f172a", color: "#fff", padding: "30px 40px", textAlign: "center", position: "relative" }}>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>Verified Battery Health Certificate</h1>
            <p style={{ margin: "10px 0 0 0", color: "#94a3b8", fontSize: "15px" }}>Independently verified by EV2Trust Algorithms</p>
          </div>

          <div style={{ padding: "40px" }}>
            {/* META INFO */}
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px dashed #e5e7eb", paddingBottom: "20px", marginBottom: "30px" }}>
              <div>
                <p style={{ margin: 0, fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Report ID</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "16px", fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>{report.id}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#6b7280", fontWeight: 600, textTransform: "uppercase" }}>Date of Verification</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "16px", fontWeight: 700, color: "#111827" }}>{reportDate}</p>
              </div>
            </div>

            {/* MAIN GRADE */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p style={{ fontSize: "14px", color: "#4b5563", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Overall Battery Grade</p>
              <div style={{ fontSize: "120px", fontWeight: 900, color: gradeColor, lineHeight: 1, margin: "10px 0" }}>{grade}</div>
              <div style={{ display: "inline-block", background: `${gradeColor}15`, color: gradeColor, padding: "8px 20px", borderRadius: "20px", fontSize: "18px", fontWeight: 700 }}>
                {gradeText}
              </div>
            </div>

            {/* STATS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "12px", textAlign: "center" }}>
                <p style={{ margin: 0, color: "#64748b", fontSize: "13px", fontWeight: 600, textTransform: "uppercase" }}>State of Health (SoH)</p>
                <p style={{ margin: "10px 0 0 0", fontSize: "28px", fontWeight: 800, color: "#0f172a" }}>{report.soh}%</p>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "12px", textAlign: "center" }}>
                <p style={{ margin: 0, color: "#64748b", fontSize: "13px", fontWeight: 600, textTransform: "uppercase" }}>Real World Range</p>
                <p style={{ margin: "10px 0 0 0", fontSize: "28px", fontWeight: 800, color: "#0f172a" }}>{report.real_range} km</p>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "12px", textAlign: "center" }}>
                <p style={{ margin: 0, color: "#64748b", fontSize: "13px", fontWeight: 600, textTransform: "uppercase" }}>Fair Market Price</p>
                <p style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>
                  {fmt(report.fair_price_min)} - {fmt(report.fair_price_max)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 12 }}>EV<span style={{ color: "#16a34a" }}>2</span>Trust</div>
        <p style={{ fontSize: "12px" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</p>
      </footer>
    </div>
  );
}