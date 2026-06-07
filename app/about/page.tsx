import Link from "next/link";

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .about-wrap { max-width: 760px; margin: 0 auto; padding: 60px 24px; }
        .problem-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
        .built-item { display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px solid #f3f4f6; }
        .country-wrap { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
        @media (max-width: 640px) {
          .about-wrap { padding: 32px 16px; }
          .problem-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>EV<span style={{ color: "#16a34a" }}>2</span>Trust</Link>
        <Link href="/check" style={{ background: "#16a34a", color: "#fff", padding: "8px 18px", borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>Free Check →</Link>
      </nav>

      <div className="about-wrap">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>⚡</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, color: "#111827" }}>About EV2Trust</h1>
          <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
            We built EV2Trust because buying a used electric vehicle should not feel like a gamble. Every buyer deserves to know the truth about the battery before they spend their money.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb", marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16 }}>Our mission</h2>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 12 }}>The global used EV market is growing at an incredible pace — over 4.2 million used electric vehicles change hands every year. Yet buyers everywhere are making decisions without knowing the most important fact: how healthy is the battery?</p>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 12 }}>A battery at 91% health is worth a very different price than one at 72%. The difference can mean thousands of dollars in real-world value and hundreds of kilometres of real-world range. Yet this information is hidden from buyers.</p>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8 }}>EV2Trust exists to change that. We make EV health data accessible, understandable, and shareable — for buyers, sellers, and dealers globally.</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb", marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20 }}>The problem we solve</h2>
          <div className="problem-grid">
            {[
              { icon: "😰", title: "Buyers lose money", desc: "Average loss from hidden battery issues is $6,000. Buyers have no way to verify battery health before purchase." },
              { icon: "😤", title: "Sellers lose trust", desc: "Honest sellers cannot prove their EV is in good condition. Buyers hesitate and listings sit unsold for weeks." },
              { icon: "🔍", title: "No global standard", desc: "No single platform gives battery health, recalls, range, and price in one place — for any EV, in any country." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#f9fafb", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb", marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 20 }}>What we built</h2>
          {[
            { icon: "🔋", title: "Battery health grade", desc: "A simple A to D grade that tells you exactly how healthy an EV battery is — based on real OBD data." },
            { icon: "⚠️", title: "Recall alerts", desc: "Instant safety recall checks from government databases — NHTSA USA and more." },
            { icon: "💰", title: "Fair price calculator", desc: "An AI-powered price estimate in your local currency based on battery health, age, and market data." },
            { icon: "🔗", title: "Shareable certificate", desc: "A unique link sellers can paste in any listing. Buyers verify the report instantly — trust built in seconds." },
          ].map((item) => (
            <div key={item.title} className="built-item">
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", borderRadius: 16, padding: 32, marginBottom: 32, textAlign: "center" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Built for the world</h2>
          <p style={{ color: "#bbf7d0", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            EV2Trust works for any EV in any country. Whether you are buying a Tesla in the USA, a Tata Nexon EV in India, a BYD in Europe, or a Nissan Leaf in the UK — EV2Trust gives you the same trusted report.
          </p>
          <div className="country-wrap">
            {["🇮🇳 India", "🇺🇸 USA", "🇬🇧 UK", "🇦🇪 UAE", "🇩🇪 Germany", "🇦🇺 Australia"].map((c) => (
              <span key={c} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{c}</span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/check" style={{ background: "#16a34a", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
            Try EV2Trust for free →
          </Link>
        </div>
      </div>

      <footer style={{ background: "#111827", color: "#9ca3af", padding: "32px 24px", textAlign: "center", fontSize: 13, marginTop: 40 }}>
        <div style={{ fontWeight: 800, color: "#fff", fontSize: 18, marginBottom: 8 }}>EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginTop: 12 }}>
          <Link href="/about" style={{ color: "#9ca3af", textDecoration: "none" }}>About</Link>
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