import Link from "next/link";

export default function Contact() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .contact-wrap { max-width: 760px; margin: 0 auto; padding: 60px 24px; }
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .details-row { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
        @media (max-width: 640px) {
          .contact-wrap { padding: 32px 16px; }
          .cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>EV<span style={{ color: "#16a34a" }}>2</span>Trust</Link>
        <Link href="/" style={{ fontSize: 14, color: "#111827", textDecoration: "none", fontWeight: 500 }}>← Home</Link>
      </nav>

      <div className="contact-wrap">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, color: "#111827" }}>Contact Us</h1>
          <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.6 }}>Have a question, feedback, or business enquiry? We would love to hear from you.</p>
        </div>

        <div className="cards-grid">
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📧</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Email us</h3>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 16, lineHeight: 1.6 }}>For general questions, feedback, or support. We reply within 24 hours.</p>
            <a href="mailto:hello@ev2trust.com" style={{ display: "inline-block", background: "#16a34a", color: "#fff", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
              hello@ev2trust.com
            </a>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🤝</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Business enquiries</h3>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 16, lineHeight: 1.6 }}>For dealer plans, B2B API access, insurance partnerships, or bulk pricing.</p>
            <a href="mailto:business@ev2trust.com" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
              business@ev2trust.com
            </a>
          </div>
        </div>

        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 20, marginBottom: 32, textAlign: "center" }}>
          <p style={{ fontWeight: 700, color: "#15803d", marginBottom: 6, fontSize: 15 }}>Looking for quick answers?</p>
          <p style={{ color: "#15803d", fontSize: 13, marginBottom: 14 }}>Check our FAQ section on the Pricing page — most common questions are answered there.</p>
          <Link href="/pricing" style={{ background: "#16a34a", color: "#fff", padding: "8px 20px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>View FAQ →</Link>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 20 }}>Our details</h2>
          {[
            { icon: "🌍", label: "Website", value: "ev2trust.com" },
            { icon: "📍", label: "Based in", value: "Hyderabad, Telangana, India" },
            { icon: "🕐", label: "Response time", value: "Within 24 hours on business days" },
            { icon: "💬", label: "Languages", value: "English, Hindi, Telugu" },
          ].map((item) => (
            <div key={item.label} className="details-row">
              <span style={{ fontSize: 22, width: 32, textAlign: "center" }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 11, color: "#374151", fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: "#111827", fontWeight: 500 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
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