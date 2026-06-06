import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "",
      color: "#6b7280",
      border: "#e5e7eb",
      popular: false,
      desc: "Try before you buy",
      features: [
        "1 basic VIN check per month",
        "Safety recall alerts",
        "Vehicle specs from VIN",
        "Government database check",
        "Make, model and year info",
      ],
      cta: "Start for free",
      href: "/check",
    },
    {
      name: "Full Report",
      price: "₹199",
      period: "/report",
      color: "#16a34a",
      border: "#16a34a",
      popular: true,
      desc: "One-time, no account needed",
      features: [
        "Everything in Free",
        "Battery health grade A to D",
        "Real range estimate today",
        "Fair price calculator",
        "Shareable certificate link",
        "Accident history check",
        "Charge cycle analysis",
      ],
      cta: "Get full report",
      href: "/check",
    },
    {
      name: "Dealer Plan",
      price: "₹999",
      period: "/month",
      color: "#2563eb",
      border: "#e5e7eb",
      popular: false,
      desc: "For used EV dealers",
      features: [
        "Unlimited reports",
        "Bulk VIN checker",
        "Branded certificates",
        "Full vehicle history",
        "Analytics dashboard",
        "API access",
        "Priority support",
      ],
      cta: "Contact us",
      href: "/contact",
    },
  ];

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
        <Link href="/check" style={{
          background: "#16a34a", color: "#fff",
          padding: "8px 18px", borderRadius: 8,
          fontWeight: 600, fontSize: 13, textDecoration: "none",
        }}>Free Check →</Link>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>

        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, color: "#111827" }}>
            Simple, honest pricing
          </h1>
          <p style={{ color: "#374151", fontSize: 16 }}>
            Start free. Pay only when you need the full picture.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 48 }}>
          {plans.map((p) => (
            <div key={p.name} style={{
              background: "#fff", borderRadius: 16, padding: 28,
              border: p.popular ? `2px solid ${p.border}` : `1px solid ${p.border}`,
              position: "relative",
            }}>
              {p.popular && (
                <div style={{
                  position: "absolute", top: -13, left: "50%",
                  transform: "translateX(-50%)",
                  background: "#16a34a", color: "#fff",
                  padding: "4px 16px", borderRadius: 20,
                  fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                }}>
                  Most popular
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: p.color, marginBottom: 6 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
                  <span style={{ fontSize: 38, fontWeight: 900, color: "#111827" }}>{p.price}</span>
                  <span style={{ color: "#374151", fontSize: 14 }}>{p.period}</span>
                </div>
                <div style={{ fontSize: 13, color: "#374151" }}>{p.desc}</div>
              </div>

              <div style={{ marginBottom: 24 }}>
                {p.features.map((f) => (
                  <div key={f} style={{
                    display: "flex", gap: 8, alignItems: "flex-start", padding: "6px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}>
                    <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#111827" }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link href={p.href} style={{
                display: "block", textAlign: "center",
                background: p.popular ? p.color : "transparent",
                color: p.popular ? "#fff" : p.color,
                border: `1.5px solid ${p.color}`,
                padding: "11px", borderRadius: 10,
                fontWeight: 700, fontSize: 14,
                textDecoration: "none",
              }}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ strip */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e7eb", marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: "#111827" }}>
            Frequently asked questions
          </h2>
          {[
            { q: "Is the free check really free?", a: "Yes, completely. No credit card needed. You get recall alerts and basic vehicle specs at no cost." },
            { q: "What is a VIN number?", a: "VIN stands for Vehicle Identification Number. It is a unique 17-character code for every vehicle. Find it on your dashboard, door jamb, or registration document." },
            { q: "Do I need an OBD dongle?", a: "For the battery health check, yes. A basic OBD-II Bluetooth dongle costs around ₹800 on Amazon. Use the free Car Scanner app to read your battery State of Health percentage." },
            { q: "Is the shareable certificate link permanent?", a: "Yes. Once generated, your certificate link is permanently accessible. Paste it in any listing and buyers can view it anytime." },
            { q: "Which EV brands are supported?", a: "All major brands — Tesla, Tata, BYD, Ola Electric, Ather, Nissan, Hyundai, Kia, BMW, Mercedes, Audi, Volkswagen, MG and more." },
          ].map((item) => (
            <div key={item.q} style={{
              padding: "14px 0", borderBottom: "1px solid #f3f4f6",
            }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 6 }}>
                {item.q}
              </div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>

        {/* B2B note */}
        <div style={{
          background: "#eff6ff", border: "1px solid #bfdbfe",
          borderRadius: 12, padding: 20, textAlign: "center",
        }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: 6, fontSize: 15 }}>
            Need B2B API access?
          </p>
          <p style={{ color: "#1e40af", fontSize: 13, marginBottom: 14 }}>
            Insurance companies, banks, and fleet operators — get battery health data via API. Custom pricing available.
          </p>
          <Link href="/contact" style={{
            background: "#2563eb", color: "#fff",
            padding: "10px 24px", borderRadius: 8,
            fontWeight: 700, fontSize: 13, textDecoration: "none",
          }}>
            Contact us for B2B pricing →
          </Link>
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
        <div style={{ color: "#9ca3af" }}>The global EV health and history platform</div>
        <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <Link href="/privacy-policy" style={{ color: "#9ca3af", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "#9ca3af", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/contact" style={{ color: "#9ca3af", textDecoration: "none" }}>Contact</Link>
        </div>
        <div style={{ marginTop: 16, color: "#4b5563" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</div>
      </footer>

    </div>
  );
}