"use client";
import { useState, Suspense } from "react";
import Link from "next/link";

function CheckPage() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | {
    make: string; model: string; year: string;
    fuelType: string; driveType: string;
    recalls: number;
  }>(null);

  async function checkVIN() {
    if (vin.length !== 17) {
      setError("VIN must be exactly 17 characters.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      );
      const data = await res.json();
      const get = (name: string) =>
        data.Results.find((r: {Variable: string; Value: string}) =>
          r.Variable === name)?.Value || "N/A";

      const make = get("Make");
      if (!make || make === "0" || make === "N/A") {
        throw new Error("Invalid VIN. Please check and try again.");
      }

      const recallRes = await fetch(
        `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${get("Model")}&modelYear=${get("Model Year")}`
      );
      const recallData = await recallRes.json();

      setResult({
        make,
        model: get("Model"),
        year: get("Model Year"),
        fuelType: get("Fuel Type - Primary"),
        driveType: get("Drive Type"),
        recalls: recallData.Count || 0,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

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

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px" }}>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: "#111827" }}>EV Health Check</h1>
          <p style={{ color: "#374151", fontSize: 16 }}>Enter a VIN to get instant recall alerts and vehicle info — free</p>
        </div>

        {/* Input Box */}
        <div style={{
          background: "#fff", borderRadius: 16,
          padding: 24, border: "1px solid #e5e7eb", marginBottom: 20,
        }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: "#111827", display: "block", marginBottom: 8 }}>
            Vehicle Identification Number (VIN)
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="e.g. 5YJ3E1EA7JF000001"
              maxLength={17}
              style={{
                flex: 1, padding: "12px 16px",
                border: "1.5px solid #e5e7eb", borderRadius: 10,
                fontSize: 15, fontFamily: "monospace",
                outline: "none", letterSpacing: 2,
                color: "#111827",
              }}
            />
            <button
              onClick={checkVIN}
              disabled={loading}
              style={{
                background: loading ? "#86efac" : "#16a34a",
                color: "#fff", padding: "12px 24px",
                borderRadius: 10, border: "none",
                fontWeight: 700, fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}>
              {loading ? "Checking..." : "Check VIN"}
            </button>
          </div>

          <p style={{ fontSize: 12, color: "#374151", marginTop: 8 }}>
            VIN is 17 characters — find it on your dashboard, door jamb, or registration document.
          </p>

          {error && (
            <div style={{
              marginTop: 12, padding: "10px 14px",
              background: "#fee2e2", borderRadius: 8,
              color: "#dc2626", fontSize: 14,
            }}>
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Sample VINs */}
        <div style={{
          background: "#fffbeb", border: "1px solid #fde68a",
          borderRadius: 12, padding: 16, marginBottom: 20,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#78350f", marginBottom: 8 }}>
            🧪 Test with sample VINs:
          </p>
          {[
            { label: "Tesla Model 3", vin: "5YJ3E1EA7JF000316" },
            { label: "Nissan Leaf 2020", vin: "1N4AZ1CP0LC306016" },
            { label: "Chevrolet Bolt", vin: "1G1FY6S09K4100001" },
          ].map((s) => (
            <button
              key={s.vin}
              onClick={() => { setVin(s.vin); }}
              style={{
                margin: "3px 6px 3px 0",
                padding: "5px 12px",
                background: "#fef3c7", border: "1px solid #fde68a",
                borderRadius: 6, fontSize: 12,
                cursor: "pointer", color: "#78350f", fontWeight: 500,
              }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Result */}
        {result && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e5e7eb" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 12, color: "#374151", fontWeight: 600, marginBottom: 4, letterSpacing: 0.5 }}>VEHICLE FOUND</p>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>
                  {result.year} {result.make} {result.model}
                </h2>
              </div>
              <div style={{
                background: "#dcfce7", color: "#15803d",
                padding: "8px 16px", borderRadius: 20, fontWeight: 700, fontSize: 13,
              }}>✓ VIN Verified</div>
            </div>

            {/* Specs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Fuel Type", value: result.fuelType },
                { label: "Drive Type", value: result.driveType },
              ].map((item) => (
                <div key={item.label} style={{ background: "#f3f4f6", borderRadius: 10, padding: 14 }}>
                  <p style={{ fontSize: 12, color: "#374151", marginBottom: 4, fontWeight: 500 }}>{item.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Recall Status */}
            {result.recalls > 0 ? (
              <div style={{
                background: "#fee2e2", border: "1px solid #fca5a5",
                borderRadius: 10, padding: "14px 16px", marginBottom: 16,
              }}>
                <p style={{ color: "#b91c1c", fontWeight: 700, fontSize: 15 }}>
                  ⚠ {result.recalls} safety recall{result.recalls > 1 ? "s" : ""} found!
                </p>
                <p style={{ color: "#b91c1c", fontSize: 13, marginTop: 4 }}>
                  Ask the seller whether these recalls have been fixed before purchasing.
                </p>
              </div>
            ) : (
              <div style={{
                background: "#dcfce7", border: "1px solid #86efac",
                borderRadius: 10, padding: "14px 16px", marginBottom: 16,
              }}>
                <p style={{ color: "#15803d", fontWeight: 700, fontSize: 15 }}>
                  ✓ No open recalls found — great sign!
                </p>
              </div>
            )}

            {/* Next Step */}
            <div style={{
              background: "#1e3a5f", borderRadius: 12,
              padding: 20, textAlign: "center",
            }}>
              <p style={{ color: "#93c5fd", fontSize: 13, marginBottom: 6, fontWeight: 500 }}>NEXT STEP</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                Want the full battery health report?
              </p>
              <p style={{ color: "#bfdbfe", fontSize: 13, marginBottom: 16 }}>
                Get battery grade A–D, real range, fair price and a shareable certificate.
              </p>
              <Link href="/battery-check" style={{
                background: "#fff", color: "#1e3a5f",
                padding: "10px 24px", borderRadius: 8,
                fontWeight: 700, fontSize: 14, textDecoration: "none",
              }}>
                Run Battery Check →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense><CheckPage /></Suspense>;
}