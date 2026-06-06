import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: "🔍",
      title: "Find your VIN",
      desc: "Every vehicle has a unique 17-character Vehicle Identification Number (VIN). Find it on the driver-side dashboard (visible through the windshield), on the door jamb sticker, or in your vehicle registration document.",
      tip: "In India, your RC book lists the VIN as the Chassis Number.",
    },
    {
      num: "02",
      icon: "🌐",
      title: "Enter it on EV2Trust",
      desc: "Type or paste your VIN into the search box. Our system instantly contacts government safety databases including NHTSA (USA) and public recall records to pull all available data on that vehicle.",
      tip: "100% free. No account needed for the basic check.",
    },
    {
      num: "03",
      icon: "⚠️",
      title: "Get your recall and spec report",
      desc: "Within seconds you will see the vehicle specs — make, model, year, drive type — along with any open safety recalls. This alone can save you from buying a vehicle with a dangerous unfixed defect.",
      tip: "Open recalls mean the manufacturer must fix the issue for free. Always check before buying.",
    },
    {
      num: "04",
      icon: "🔋",
      title: "Run the battery health check",
      desc: "Enter your OBD reading — battery State of Health percentage — along with odometer reading, fast charge count, and vehicle age. Our algorithm calculates a battery grade from A to D, a real range estimate, and a fair price range.",
      tip: "Get an OBD-II Bluetooth dongle for around ₹800 on Amazon. Use the free app Car Scanner to read your SoH percentage.",
    },
    {
      num: "05",
      icon: "🔗",
      title: "Share your certificate",
      desc: "Receive a unique shareable link for your report. Sellers can paste this link in any listing on OLX, CarDekho, or Autotrader. Buyers click it and instantly see the verified report — trust is built before the first meeting.",
      tip: "Sellers with a verified certificate sell faster and at higher prices.",
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

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px" }}>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, color: "#111827" }}>
            How EV2Trust works
          </h1>
          <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.6 }}>
            From finding your VIN to getting a shareable certificate — in 5 simple steps
          </p>
        </div>

        <div>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: "flex", gap: 20, marginBottom: 12 }}>

              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "#16a34a", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 14, flexShrink: 0,
                }}>{s.num}</div>
                {i < steps.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: "#e5e7eb", margin: "6px 0" }} />
                )}
              </div>

              {/* Content */}
              <div style={{
                background: "#fff", borderRadius: 14, padding: 22,
                border: "1px solid #e5e7eb", flex: 1, marginBottom: 12,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#111827" }}>{s.title}</h3>
                <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 12, fontSize: 14 }}>{s.desc}</p>
                <div style={{
                  background: "#fffbeb", border: "1px solid #fde68a",
                  borderRadius: 8, padding: "8px 12px",
                  fontSize: 13, color: "#78350f",
                }}>
                  💡 {s.tip}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/check" style={{
            background: "#16a34a", color: "#fff",
            padding: "14px 32px", borderRadius: 10,
            fontWeight: 700, fontSize: 16, textDecoration: "none",
            display: "inline-block",
          }}>
            Try it now — it is free →
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer style={{
        background: "#111827", color: "#9ca3af",
        padding: "32px 24px", textAlign: "center", fontSize: 13, marginTop: 60,
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