import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .legal-wrap { max-width: 760px; margin: 0 auto; padding: 60px 24px; }
        
        /* HOVER EFFECTS */
        .btn-green {
          transition: all 0.2s ease-in-out;
          display: inline-block;
        }
        .btn-green:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 10px 20px rgba(22, 163, 74, 0.2);
        }
        .nav-link {
          transition: color 0.2s ease-in-out;
        }
        .nav-link:hover {
          color: #16a34a !important;
        }
        .footer-link {
          transition: color 0.2s ease-in-out;
        }
        .footer-link:hover {
          color: #ffffff !important;
        }

        @media (max-width: 640px) { .legal-wrap { padding: 32px 16px; } }
      `}</style>

      {/* PROFESSIONAL NAVBAR */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50
      }}>
        {/* FIX: Removed flex and gap from Logo */}
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
            Free Check →
          </Link>
        </div>
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