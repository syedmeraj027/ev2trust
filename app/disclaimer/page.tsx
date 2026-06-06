import Link from "next/link";

export default function Disclaimer() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
          EV<span style={{ color: "#16a34a" }}>2</span>Trust
        </Link>
        <Link href="/" style={{ fontSize: 14, color: "#111827", textDecoration: "none", fontWeight: 500 }}>← Back to home</Link>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>

        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: "#111827" }}>Disclaimer</h1>
        <p style={{ color: "#374151", fontSize: 14, marginBottom: 40 }}>Last updated: June 2026</p>

        {/* Warning Box */}
        <div style={{
          background: "#fffbeb", border: "1px solid #fde68a",
          borderRadius: 12, padding: 20, marginBottom: 40,
        }}>
          <p style={{ fontWeight: 700, color: "#78350f", fontSize: 15, marginBottom: 6 }}>
            ⚠ Important notice
          </p>
          <p style={{ color: "#78350f", fontSize: 14, lineHeight: 1.7 }}>
            EV2Trust provides informational reports only. Our battery health scores, range estimates, and price calculations are estimates based on user-provided data and public records — they are not professional inspections or certified valuations.
          </p>
        </div>

        {[
          {
            title: "1. General disclaimer",
            content: "The information provided by EV2Trust on ev2trust.vercel.app is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.",
          },
          {
            title: "2. Not professional advice",
            content: "EV2Trust does not provide mechanical, legal, financial, or professional advice. The battery health grades, range estimates, and fair price ranges shown on our platform are algorithmic estimates and should not be treated as certified professional assessments. Always have a vehicle inspected by a qualified mechanic before purchasing.",
          },
          {
            title: "3. Battery health estimates",
            content: "Battery health scores are calculated based on data entered by users including State of Health percentage, odometer reading, fast charge count, and vehicle age. The accuracy of these scores depends entirely on the accuracy of the data entered. EV2Trust is not responsible for inaccurate inputs or their resulting outputs.",
          },
          {
            title: "4. Recall data",
            content: "Recall information is sourced from the NHTSA public API. While we strive to display current data, EV2Trust cannot guarantee that recall records are complete or up to date. Always verify recall status directly with the vehicle manufacturer or the official NHTSA website at nhtsa.gov.",
          },
          {
            title: "5. Price estimates",
            content: "Fair price ranges shown on EV2Trust are algorithmic estimates based on general market data. They do not account for regional price variations, specific vehicle condition, negotiation factors, or current market fluctuations. These estimates should be used as a starting point for research only.",
          },
          {
            title: "6. No liability for purchase decisions",
            content: "EV2Trust shall not be held responsible for any vehicle purchase or sale decisions made based on information provided by our platform. Users assume full responsibility for their purchasing decisions. We strongly recommend conducting a thorough in-person inspection and test drive before any vehicle purchase.",
          },
          {
            title: "7. External links",
            content: "EV2Trust may reference or link to external websites for additional information. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.",
          },
          {
            title: "8. Contact",
            content: "If you have any questions about this Disclaimer, please contact us at: hello@ev2trust.com",
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 10 }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
              {section.content}
            </p>
          </div>
        ))}

      </div>

      {/* Footer */}
      <footer style={{
        background: "#111827", color: "#9ca3af",
        padding: "32px 24px", textAlign: "center", fontSize: 13,
      }}>
        <div style={{ fontWeight: 700, color: "#fff", fontSize: 18, marginBottom: 8 }}>
          EV<span style={{ color: "#4ade80" }}>2</span>Trust
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <Link href="/privacy-policy" style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "#9ca3af", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/disclaimer" style={{ color: "#9ca3af", textDecoration: "none" }}>Disclaimer</Link>
          <Link href="/contact" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact</Link>
        </div>
        <div style={{ marginTop: 16, color: "#4b5563" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</div>
      </footer>

    </div>
  );
}