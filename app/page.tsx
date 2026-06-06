import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      
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
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 14 }}>
          <Link href="/check" style={{ color: "#374151", textDecoration: "none" }}>Check VIN</Link>
          <Link href="/how-it-works" style={{ color: "#374151", textDecoration: "none" }}>How it works</Link>
          <Link href="/pricing" style={{ color: "#374151", textDecoration: "none" }}>Pricing</Link>
          <Link href="/check" style={{
            background: "#16a34a", color: "#fff",
            padding: "8px 18px", borderRadius: 8,
            fontWeight: 600, fontSize: 13,
            textDecoration: "none",
          }}>Free Check →</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "80px 24px 60px", maxWidth: 720, margin: "0 auto" }}>
        
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#dcfce7", color: "#16a34a",
          padding: "6px 14px", borderRadius: 20,
          fontSize: 13, fontWeight: 500, marginBottom: 24,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
          Trusted globally — India · USA · UK · UAE · Germany
        </div>

        <h1 style={{
          fontSize: 52, fontWeight: 800,
          lineHeight: 1.15, color: "#111827", marginBottom: 20,
        }}>
          Know your EV&apos;s{" "}
          <span style={{ color: "#16a34a" }}>true health</span>{" "}
          before you buy
        </h1>

        <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, marginBottom: 40 }}>
          Enter any EV&apos;s VIN number and get a complete battery health report,
          real range, recall alerts, and fair price — in under 60 seconds.
        </p>

        {/* VIN Input */}
        <div style={{
          display: "flex", gap: 10, maxWidth: 560, margin: "0 auto 16px",
          background: "#fff", padding: 8, borderRadius: 14,
          border: "1.5px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}>
          <input
            type="text"
            placeholder="Enter VIN — e.g. 5YJ3E1EA7JF000001"
            maxLength={17}
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: 15, padding: "10px 14px",
              background: "transparent", color: "#111827",
            }}
          />
          <Link href="/check" style={{
            background: "#16a34a", color: "#fff",
            padding: "12px 24px", borderRadius: 10,
            fontWeight: 700, fontSize: 15,
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            Check free →
          </Link>
        </div>

        <p style={{ fontSize: 13, color: "#9ca3af" }}>
          No account needed · First report free · Any EV brand
        </p>
      </section>

      {/* Stats Bar */}
      <section style={{
        display: "flex", justifyContent: "center",
        gap: 48, flexWrap: "wrap",
        padding: "32px 24px",
        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
      }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
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
          textDecoration: "none",
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
        <div>The global EV health &amp; history platform</div>
        <div className="flex gap-4 flex-wrap items-center justify-center" style={{ marginTop: "16px", marginBottom: "16px" }}>
  <Link href="/about">About</Link>
  <Link href="/how-it-works">How it works</Link>
  <Link href="/pricing">Pricing</Link>
  <Link href="/privacy-policy">Privacy Policy</Link>
  <Link href="/terms">Terms</Link>
  <Link href="/disclaimer">Disclaimer</Link>
  <Link href="/contact">Contact</Link>
</div>
        <div style={{ marginTop: 16, color: "#4b5563" }}>
          © 2026 EV2Trust. Built for EV buyers everywhere.
        </div>
      </footer>

    </div>
  );
}