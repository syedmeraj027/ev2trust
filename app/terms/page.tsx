import Link from "next/link";

export default function Terms() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .legal-wrap { max-width: 760px; margin: 0 auto; padding: 60px 24px; }
        @media (max-width: 640px) { .legal-wrap { padding: 32px 16px; } }
      `}</style>

      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>EV<span style={{ color: "#16a34a" }}>2</span>Trust</Link>
        <Link href="/" style={{ fontSize: 14, color: "#111827", textDecoration: "none", fontWeight: 500 }}>← Home</Link>
      </nav>

      <div className="legal-wrap">
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: "#111827" }}>Terms of Service</h1>
        <p style={{ color: "#374151", fontSize: 14, marginBottom: 40 }}>Last updated: June 2026</p>

        {[
          { title: "1. Acceptance of terms", content: "By accessing or using EV2Trust at ev2trust.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. We reserve the right to update these terms at any time." },
          { title: "2. Description of service", content: "EV2Trust provides an online platform that allows users to check electric vehicle health data by entering a Vehicle Identification Number (VIN). Our service retrieves publicly available information from government databases and calculates battery health estimates based on user-provided data." },
          { title: "3. Informational purpose only", content: "All reports, scores, grades, and price estimates provided by EV2Trust are for informational purposes only. They do not constitute professional mechanical, legal, or financial advice. EV2Trust is not responsible for any purchase decisions made based on our reports." },
          { title: "4. Accuracy of information", content: "EV2Trust sources data from public government APIs including NHTSA. While we strive for accuracy, we cannot guarantee that all information is complete, current, or error-free. Vehicle history data may not reflect all incidents or issues with a particular vehicle." },
          { title: "5. User responsibilities", content: "You agree to use EV2Trust only for lawful purposes. You must not attempt to misuse our service, overload our systems, or use automated tools to scrape data. You are responsible for the accuracy of any information you enter into our platform." },
          { title: "6. Intellectual property", content: "All content on EV2Trust including text, design, logos, and code is the property of EV2Trust. You may not reproduce, distribute, or create derivative works without our written permission." },
          { title: "7. Limitation of liability", content: "EV2Trust shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our service. This includes but is not limited to losses from vehicle purchase decisions made based on our reports." },
          { title: "8. Third-party links", content: "Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites." },
          { title: "9. Termination", content: "We reserve the right to terminate or suspend access to our service at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties." },
          { title: "10. Governing law", content: "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India." },
          { title: "11. Contact us", content: "If you have any questions about these Terms of Service, please contact us at: hello@ev2trust.com" },
        ].map((s) => (
          <div key={s.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 10 }}>{s.title}</h2>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8 }}>{s.content}</p>
          </div>
        ))}
      </div>

      <footer style={{ background: "#111827", color: "#9ca3af", padding: "32px 24px", textAlign: "center", fontSize: 13 }}>
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