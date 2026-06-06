"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>

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

      {/* 404 Content */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "40px 24px",
      }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>

          <div style={{ fontSize: 80, marginBottom: 16 }}>🔋</div>

          <h1 style={{ fontSize: 80, fontWeight: 900, color: "#16a34a", lineHeight: 1, marginBottom: 8 }}>
            404
          </h1>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 12 }}>
            Page not found
          </h2>

          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 32 }}>
            Looks like this page has run out of charge. The page you are looking for does not exist or has been moved.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{
              background: "#16a34a", color: "#fff",
              padding: "12px 24px", borderRadius: 10,
              fontWeight: 700, fontSize: 14, textDecoration: "none",
            }}>
              Go home →
            </Link>
            <Link href="/check" style={{
              background: "#fff", color: "#16a34a",
              padding: "12px 24px", borderRadius: 10,
              fontWeight: 700, fontSize: 14, textDecoration: "none",
              border: "1.5px solid #16a34a",
            }}>
              Check a VIN
            </Link>
          </div>

          <div style={{ marginTop: 40 }}>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 12, fontWeight: 600 }}>
              Quick links
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: "How it works", href: "/how-it-works" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  fontSize: 13, color: "#16a34a",
                  textDecoration: "none", fontWeight: 500,
                }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "#111827", color: "#9ca3af",
        padding: "24px", textAlign: "center", fontSize: 13,
      }}>
        <div style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 6 }}>
          EV<span style={{ color: "#4ade80" }}>2</span>Trust
        </div>
        <div style={{ color: "#4b5563" }}>© 2026 EV2Trust. Built for EV buyers everywhere.</div>
      </footer>

    </div>
  );
}