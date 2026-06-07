import Link from "next/link";

export default function PrivacyPolicy() {
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
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: "#111827" }}>Privacy Policy</h1>
        <p style={{ color: "#374151", fontSize: 14, marginBottom: 40 }}>Last updated: June 2026</p>

        {[
          { title: "1. Introduction", content: "Welcome to EV2Trust. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website ev2trust.com and use our services." },
          { title: "2. Information we collect", content: "We collect information you voluntarily provide — such as VIN numbers you enter for vehicle checks. We do not collect your name, email, or payment information unless you contact us directly. We may collect basic usage data such as pages visited and time spent on the site through analytics tools." },
          { title: "3. How we use your information", content: "We use the information you provide solely to deliver the EV health check service. VIN numbers are used to query public government databases such as the NHTSA API. We do not sell, trade, or rent your information to third parties." },
          { title: "4. Third-party services", content: "EV2Trust uses the NHTSA public API (api.nhtsa.gov) to retrieve vehicle recall and specification data. This is a free public government service provided by the United States National Highway Traffic Safety Administration. By using our service you acknowledge that VIN queries are sent to this external API." },
          { title: "5. Cookies", content: "Our website may use basic cookies to improve your browsing experience. These cookies do not store personally identifiable information. You can choose to disable cookies through your browser settings at any time." },
          { title: "6. Data security", content: "We implement appropriate technical measures to protect your information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data." },
          { title: "7. Children's privacy", content: "EV2Trust is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it." },
          { title: "8. Your rights", content: "You have the right to access, correct, or delete any personal information we hold about you. To exercise these rights, please contact us at the email address below. We will respond within 30 days." },
          { title: "9. Changes to this policy", content: "We may update this Privacy Policy from time to time. We will notify you of any changes by updating the date at the top of this page. We encourage you to review this policy periodically." },
          { title: "10. Contact us", content: "If you have any questions about this Privacy Policy, please contact us at: hello@ev2trust.com" },
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