import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>

      {/* Responsive styles */}
      <style>{`
        .nav-links { display: flex; align-items: center; gap: 24px; font-size: 14px; }
        .nav-btn { background: #16a34a; color: #fff; padding: 8px 18px; border-radius: 8px; font-weight: 600; font-size: 13px; text-decoration: none; }
        .hero-title { font-size: 52px; font-weight: 800; line-height: 1.15; color: #111827; margin-bottom: 20px; }
        .hero-section { text-align: center; padding: 80px 24px 60px; max-width: 720px; margin: 0 auto; }
        .vin-box { display: flex; gap: 10px; max-width: 560px; margin: 0 auto 16px; background: #fff; padding: 8px; border-radius: 14px; border: 1.5px solid #e5e7eb; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        .vin-input { flex: 1; border: none; outline: none; font-size: 15px; padding: 10px 14px; background: transparent; color: #111827; min-width: 0; }
        .vin-btn { background: #16a34a; color: #fff; padding: 12px 20px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; white-space: nowrap; flex-shrink: 0; }
        .stats-bar { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; padding: 32px 24px; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; background: #fff; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .footer-links { margin-top: 16px; margin-bottom: 16px; display: flex; gap: 16px; flex-wrap: wrap; align-items: center; justify-content: center; }

        @media (max-width: 640px) {
          .nav-links { gap: 12px; }
          .nav-links a:not(.nav-btn) { display: none; }
          .hero-title { font-size: 32px; }
          .hero-section { padding: 48px 16px 40px; }
          .vin-box { flex-direction: column; gap: 8px; margin: 0 0 16px; }
          .vin-input { font-size: 14px; padding: 12px 14px; }
          .vin-btn { text-align: center; padding: 12px 16px; font-size: 14px; }
          .stats-bar { gap: 24px; padding: 24px 16px; }
          .features-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .footer-links { gap: 12px; font-size: 12px; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ fontWeight: 800, fontSize: 22, color: "#111827" }}>
          EV<span style={{ color: "#16a34a" }}>2</span>Trust
        </div>
        <div className="nav-links">
          <Link href="/check" style={{ color: "#374151", textDecoration: "none" }}>Check VIN</Link>
          <Link href="/how-it-works" style={{ color: "#374151", textDecoration: "none" }}>How it works</Link>
          <Link href="/pricing" style={{ color: "#374151", textDecoration: "none" }}>Pricing</Link>
          <Link href="/check" className="nav-btn">Free Check →</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#dcfce7", color: "#16a34a",
          padding: "6px 14px", borderRadius: 20,
          fontSize: 13, fontWeight: 500, marginBottom: 24,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
          Trusted globally — India · USA · UK · UAE · Germany
        </div>

        <h1 className="hero-title">
          Know your EV&apos;s{" "}
          <span style={{ color: "#16a34a" }}>true health</span>{" "}
          before you buy
        </h1>

        <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, marginBottom: 40 }}>
          Enter any EV&apos;s VIN number and get a complete battery health report,
          real range, recall alerts, and fair price — in under 60 seconds.
        </p>

        {/* VIN Input */}
        <div className="vin-box">
          <input
            type="text"
            placeholder="Enter VIN — e.g. 5YJ3E1EA7JF000001"
            maxLength={17}
            className="vin-input"
          />
          <Link href="/check" className="vin-btn">
            Check free →
          </Link>
        </div>

        <p style={{ fontSize: 13, color: "#9ca3af" }}>
          No account needed · First report free · Any EV brand
        </p>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        {[
          { num: "4.2M+", label: "Used EVs sold yearly" },
          { num: "50%", label: "Have hidden battery issues" },
          { num: "$6,000", label: "Avg loss from bad EV purchase" },
          { num: "60 sec", label: "To get your report" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>{s.num}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: "72px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 48, color: "#111827" }}>
          Everything in one report
        </h2>
        <div className="features-grid">
          {[
            { icon: "🔋", title: "Battery health grade", desc: "A/B/C/D score — know exactly what you're buying" },
            { icon: "📍", title: "Real range estimate", desc: "Actual range based on battery degradation" },
            { icon: "⚠️", title: "Recall alerts", desc: "Open safety recalls from govt databases" },
            { icon: "🚗", title: "Accident history", desc: "Cross-checked against insurance records" },
            { icon: "💰", title: "Fair price calculator", desc: "AI-powered price in your local currency" },
            { icon: "🔗", title: "Shareable certificate", desc: "One link — paste in OLX or CarDekho listing" },
          ].map((f) => (
            <div key={f.title} style={{
              padding: 20, borderRadius: 12,
              background: "#fff", border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14, color: "#111827" }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "#16a34a", padding: "64px 24px", textAlign: "center",
      }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
          Check your EV right now — it&apos;s free
        </h2>
        <p style={{ color: "#bbf7d0", fontSize: 16, marginBottom: 32 }}>
          No signup required. First report completely free.
        </p>
        <Link href="/check" style={{
          background: "#fff", color: "#16a34a",
          padding: "14px 32px", borderRadius: 10,
          fontWeight: 700, fontSize: 16,
          textDecoration: "none", display: "inline-block",
        }}>
          Start free check →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#111827", color: "#9ca3af",
        padding: "32px 24px", textAlign: "center", fontSize: 13,
      }}>
        <div style={{ fontWeight: 700, color: "#fff", fontSize: 18, marginBottom: 8 }}>
          EV<span style={{ color: "#4ade80" }}>2</span>Trust
        </div>
        <div style={{ color: "#9ca3af" }}>The global EV health &amp; history platform</div>
        <div className="footer-links">
          <Link href="/about" style={{ color: "#9ca3af", textDecoration: "none" }}>About</Link>
          <Link href="/how-it-works" style={{ color: "#9ca3af", textDecoration: "none" }}>How it works</Link>
          <Link href="/pricing" style={{ color: "#9ca3af", textDecoration: "none" }}>Pricing</Link>
          <Link href="/privacy-policy" style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "#9ca3af", textDecoration: "none" }}>Terms</Link>
          <Link href="/disclaimer" style={{ color: "#9ca3af", textDecoration: "none" }}>Disclaimer</Link>
          <Link href="/contact" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact</Link>
        </div>
        <div style={{ color: "#4b5563" }}>
          © 2026 EV2Trust. Built for EV buyers everywhere.
        </div>
      </footer>

    </div>
  );
}