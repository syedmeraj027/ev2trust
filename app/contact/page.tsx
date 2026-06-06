import Link from "next/link";

export default function Contact() {
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

        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, color: "#111827" }}>Contact Us</h1>
          <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.6 }}>
            Have a question, feedback, or business enquiry? We would love to hear from you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>

          {/* Email */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: 28,
            border: "1px solid #e5e7eb", textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📧</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Email us</h3>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 16, lineHeight: 1.6 }}>
              For general questions, feedback, or support. We reply within 24 hours.
            </p>
            <a href="mailto:hello@ev2trust.com" style={{
              display: "inline-block",
              background: "#16a34a", color: "#fff",
              padding: "10px 20px", borderRadius: 8,
              fontWeight: 700, fontSize: 13, textDecoration: "none",
            }}>
              hello@ev2trust.com
            </a>
          </div>

          {/* B2B */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: 28,
            border: "1px solid #e5e7eb", textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🤝</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Business enquiries</h3>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 16, lineHeight: 1.6 }}>
              For dealer plans, B2B API access, insurance partnerships, or bulk pricing.
            </p>
            <a href="mailto:business@ev2trust.com" style={{
              display: "inline-block",
              background: "#2563eb", color: "#fff",
              padding: "10px 20px", borderRadius: 8,
              fontWeight: 700, fontSize: 13, textDecoration: "none",
            }}>
              business@ev2trust.com
            </a>
          </div>

        </div>

        {/* FAQ prompt */}
        <div style={{
          background: "#f0fdf4", border: "1px solid #86efac",
          borderRadius: 12, padding: 20, marginBottom: 32, textAlign: "center",
        }}>
          <p style={{ fontWeight: 700, color: "#15803d", marginBottom: 6, fontSize: 15 }}>
            Looking for quick answers?
          </p>
          <p style={{ color: "#15803d", fontSize: 13, marginBottom: 14 }}>
            Check our FAQ section on the Pricing page — most common questions are answered there.
          </p>
          <Link href="/pricing" style={{
            background: "#16a34a", color: "#fff",
            padding: "8px 20px", borderRadius: 8,
            fontWeight: 700, fontSize: 13, textDecoration: "none",
          }}>
            View FAQ →
          </Link>
        </div>

        {/* Contact details */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: 28,
          border: "1px solid #e5e7eb",
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 20 }}>
            Our details
          </h2>
          {[
            { icon: "🌍", label: "Website", value: "ev2trust.vercel.app" },
            { icon: "📍", label: "Based in", value: "Hyderabad, Telangana, India" },
            { icon: "🕐", label: "Response time", value: "Within 24 hours on business days" },
            { icon: "💬", label: "Languages", value: "English, Hindi, Telugu" },
          ].map((item) => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "12px 0", borderBottom: "1px solid #f3f4f6",
            }}>
              <span style={{ fontSize: 22, width: 32, textAlign: "center" }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: "#374151", fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: "#111827", fontWeight: 500 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer style={{
        background: "#111827", color: "#9ca3af",
        padding: "32px 24px", textAlign: "center", fontSize: 13, marginTop: 40,
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