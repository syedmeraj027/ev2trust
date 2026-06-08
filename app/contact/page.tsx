import Link from "next/link";

export default function Contact() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .contact-wrap { max-width: 760px; margin: 0 auto; padding: 60px 24px; }
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .details-row { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
        
        /* HOVER EFFECTS */
        .btn-green {
          transition: all 0.2s ease-in-out;
          display: inline-block;
        }
        .btn-green:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 10px 20px rgba(22, 163, 74, 0.2) !important;
        }
        .btn-blue {
          transition: all 0.2s ease-in-out;
          display: inline-block;
        }
        .btn-blue:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2) !important;
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

        @media (max-width: 640px) {
          .contact-wrap { padding: 32px 16px; }
          .cards-grid { grid-template-columns: 1fr; }
        }
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
            <a href="mailto:hello@ev2trust.com" className="btn-green" style={{ display: "inline-block", background: "#16a34a", color: "#fff", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
              hello@ev2trust.com
            </a>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e7eb", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🤝</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Business enquiries</h3>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 16, lineHeight: 1.6 }}>For dealer plans, B2B API access, insurance partnerships, or bulk pricing.</p>
            <a href="mailto:business@ev2trust.com" className="btn-blue" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
              business@ev2trust.com
            </a>
          </div>
        </div>

        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 20, marginBottom: 32, textAlign: "center" }}>
          <p style={{ fontWeight: 700, color: "#15803d", marginBottom: 6, fontSize: 15 }}>Looking for quick answers?</p>
          <p style={{ color: "#15803d", fontSize: 13, marginBottom: 14 }}>Check our FAQ section on the Pricing page — most common questions are answered there.</p>
          <Link href="/pricing" className="btn-green" style={{ background: "#16a34a", color: "#fff", padding: "8px 20px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "inline-block" }}>View FAQ →</Link>
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