"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function CheckClient() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | {
    make: string; model: string; year: string;
    fuelType: string; driveType: string; recalls: number;
  }>(null);

  // References for smooth scrolling
  const resultsRef = useRef<HTMLElement>(null);
  const stepTwoRef = useRef<HTMLDivElement>(null);

  // Smooth scroll effect when result state changes
  useEffect(() => {
    if (result && resultsRef.current) {
      setTimeout(() => {
        // Adjusted to "start" but CSS scroll-margin-top ensures the whole block is framed perfectly
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [result]);

  // Function to smoothly scroll to the Step 2 box when the arrow is clicked
  const scrollToStepTwo = () => {
    stepTwoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  async function checkVIN(vinToFetch?: string) {
    const targetVin = typeof vinToFetch === "string" ? vinToFetch : vin;
    
    if (targetVin.length !== 17) {
      setError("VIN must be exactly 17 characters.");
      return;
    }
    
    setVin(targetVin);
    setLoading(true);
    setError("");
    setResult(null);
    
    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${targetVin}?format=json`);
      const data = await res.json();
      const get = (name: string) =>
        data.Results.find((r: { Variable: string; Value: string }) => r.Variable === name)?.Value || "N/A";
      
      const make = get("Make");
      if (!make || make === "0" || make === "N/A") throw new Error("Invalid VIN. Please check and try again.");
      
      const recallRes = await fetch(`https://api.nhtsa.gov/recalls/recallsByVehicle?make=${make}&model=${get("Model")}&modelYear=${get("Model Year")}`);
      const recallData = await recallRes.json();
      
      setResult({ 
        make, 
        model: get("Model"), 
        year: get("Model Year"), 
        fuelType: get("Fuel Type - Primary"), 
        driveType: get("Drive Type"), 
        recalls: recallData.Count || 0 
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        /* PREMIUM ANIMATIONS */
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes premiumFloat {
          0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 10px 25px -5px rgba(22, 163, 74, 0.4); }
          50% { transform: translateY(8px) scale(1.05); box-shadow: 0 20px 35px -5px rgba(22, 163, 74, 0.2); }
        }
        .animate-reveal { animation: revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        
        /* NAV & FOOTER HOVERS */
        .nav-link { transition: color 0.2s ease-in-out; }
        .nav-link:hover { color: #16a34a !important; }
        .footer-link { transition: color 0.2s ease-in-out; }
        .footer-link:hover { color: #ffffff !important; }
        
        .nav-btn { background: #16a34a; color: #fff; padding: 8px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; text-decoration: none; transition: transform 0.2s; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2); display: inline-block; }
        .nav-btn:hover { transform: scale(1.05); }

        /* HERO SECTION */
        .hero-section { padding: 80px 24px 40px 24px; text-align: center; background: radial-gradient(circle at 50% 0%, #dcfce7 0%, rgba(249, 250, 251, 0) 70%); }
        .hero-title { font-size: 56px; font-weight: 900; color: #111827; letter-spacing: -1.5px; line-height: 1.1; margin: 0 0 16px 0; }
        
        .hero-title-accent {
          display: block; font-size: 26px; font-weight: 800;
          background: linear-gradient(135deg, #16a34a 0%, #059669 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-top: 8px; letter-spacing: -0.5px;
        }
        
        /* SEARCH BAR */
        .search-wrapper { 
          max-width: 680px; margin: 32px auto 0 auto; background: #fff; padding: 8px; 
          border-radius: 20px; border: 2px solid #e5e7eb; display: flex; gap: 8px;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.08); transition: all 0.3s ease;
        }
        .search-wrapper:focus-within { border-color: #16a34a; box-shadow: 0 20px 40px -10px rgba(22, 163, 74, 0.2); transform: translateY(-2px); }
        .vin-input { 
          flex: 1; padding: 16px 24px; border: none; background: transparent; 
          font-size: 18px; font-weight: 700; color: #111827; text-transform: uppercase; 
          outline: none; letter-spacing: 1px;
        }
        .vin-input::placeholder { color: #9ca3af; text-transform: none; font-weight: 500; letter-spacing: normal; }
        
        .check-btn { 
          background: #111827; color: #fff; padding: 0 32px; border-radius: 14px; border: none; 
          font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); 
        }
        .check-btn:hover { background: #16a34a; transform: scale(1.02); box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.3); }
        .check-btn:active { transform: scale(0.98); }

        /* SAMPLE VINS */
        .sample-wrapper { display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .sample-btn { 
          display: flex; align-items: center; gap: 8px; padding: 8px 18px; background: #ffffff; 
          border: 1px solid #e2e8f0; border-radius: 30px; font-size: 13px; font-weight: 700; 
          color: #475569; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .sample-btn:hover { 
          border-color: #16a34a; color: #15803d; background: #f0fdf4; 
          transform: translateY(-4px); box-shadow: 0 12px 20px -8px rgba(22, 163, 74, 0.3); 
        }

        /* RESULTS WRAPPER - scroll-margin-top pushes it down past the navbar perfectly */
        .results-wrapper { max-width: 900px; margin: 0 auto; padding: 24px 24px 80px 24px; width: 100%; box-sizing: border-box; scroll-margin-top: 80px; }
        .data-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 24px; padding: 32px; margin-bottom: 0px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05); }
        
        .specs-title {
          font-size: 24px; font-weight: 900; color: #111827; margin: 0; letter-spacing: -0.5px;
          display: flex; align-items: center; gap: 12px;
        }

        /* UPGRADED PROFESSIONAL SPECIFICATION GRID */
        .spec-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 24px; }
        .spec-box { 
          background: #ffffff; padding: 20px 24px; border-radius: 16px; 
          border: 1.5px solid #cbd5e1; /* Much stronger, distinct border */
          border-left: 5px solid #94a3b8; /* Professional architectural left-accent */
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1); 
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden; cursor: default;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .spec-box:hover { 
          transform: translateY(-4px); border-color: #86efac; border-left-color: #16a34a;
          box-shadow: 0 15px 30px -10px rgba(22, 163, 74, 0.15); 
        }
        
        /* OVERLAPPING BOUNCING ARROW - Pulls sections together tightly */
        .scroll-arrow-premium {
          display: flex; justify-content: center; align-items: center; 
          margin: -24px auto 16px auto; /* Negative top margin pulls it perfectly between cards */
          width: 52px; height: 52px; background: #16a34a; color: #ffffff; border: none; border-radius: 50%;
          cursor: pointer; animation: premiumFloat 2.2s infinite ease-in-out;
          transition: all 0.3s ease; position: relative; z-index: 10;
        }
        .scroll-arrow-premium:hover { background: #15803d; transform: scale(1.15); animation-play-state: paused; }

        /* RECALL DASHBOARD CARD */
        .recall-card {
          background: #fff; border-radius: 24px; padding: 32px; margin-bottom: 32px;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.06); position: relative; overflow: hidden;
          display: flex; align-items: flex-start; gap: 24px;
        }
        .recall-safe { border: 1px solid #e5e7eb; border-left: 6px solid #10b981; }
        .recall-danger { border: 1px solid #e5e7eb; border-left: 6px solid #ef4444; }
        .recall-icon-safe { background: #dcfce7; color: #15803d; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        .recall-icon-danger { background: #fee2e2; color: #b91c1c; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }

        /* UPGRADED INTERACTIVE STEP 2 CARD */
        .step-two-card {
          background: linear-gradient(135deg, #15803d 0%, #166534 100%);
          border-radius: 32px; padding: 48px 32px; text-align: center; 
          box-shadow: 0 25px 50px -12px rgba(22, 163, 74, 0.5);
          position: relative; overflow: hidden; border: 1px solid #4ade80;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }
        .step-two-card:hover { transform: scale(1.01); }
        .step-two-card::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at 50% 0%, rgba(74, 222, 128, 0.2) 0%, transparent 50%); pointer-events: none;
        }
        .step-two-title {
          color: #ffffff; font-weight: 900; font-size: 32px; margin-bottom: 12px; letter-spacing: -0.5px;
          text-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .btn-next-massive { 
          background: #ffffff; color: #15803d; padding: 18px 40px; border-radius: 16px; 
          font-weight: 900; font-size: 18px; text-decoration: none; display: inline-block; 
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
        }
        .btn-next-massive:hover { transform: translateY(-4px) scale(1.05); box-shadow: 0 20px 35px rgba(0,0,0,0.3); }

        /* MOBILE RESPONSIVENESS */
        @media (max-width: 768px) {
          .hero-title { font-size: 42px; }
          .hero-title-accent { font-size: 20px; }
          .search-wrapper { flex-direction: column; background: transparent; border: none; box-shadow: none; padding: 0; }
          .vin-input { background: #fff; border: 2px solid #e5e7eb; border-radius: 16px; width: 100%; text-align: center; }
          .check-btn { padding: 18px; width: 100%; border-radius: 16px; }
          .data-card { padding: 24px; }
          .spec-grid { grid-template-columns: 1fr; gap: 12px; }
          .recall-card { flex-direction: column; gap: 16px; align-items: center; text-align: center; }
          .step-two-card { padding: 40px 20px; }
          .step-two-title { font-size: 28px; }
        }
      `}</style>

      {/* STICKY NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#111827", textDecoration: "none" }}>
          EV<span style={{ color: "#16a34a" }}>2</span>Trust
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 600 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Home
          </Link>
          <Link href="/check" className="nav-btn">
            VIN Check →
          </Link>
        </div>
      </nav>

      <div style={{ flex: 1 }}>
        {/* HERO & SEARCH ENGINE */}
        <section className="hero-section animate-reveal">
          <span style={{ display: "inline-block", background: "#dbeafe", color: "#1e40af", padding: "6px 16px", borderRadius: 30, fontSize: 12, fontWeight: 800, letterSpacing: 1.5, marginBottom: 20 }}>
            GOVERNMENT DATA LINK
          </span>
          <h1 className="hero-title">
            Verify Your EV
            <span className="hero-title-accent">in Seconds.</span>
          </h1>
          <p style={{ color: "#4b5563", fontSize: 19, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            Enter your 17-character VIN to extract official manufacturer specifications and scan the NHTSA database for critical safety recalls.
          </p>

          <div className="search-wrapper">
            <input 
              type="text" 
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="Enter 17-Digit VIN here..." 
              className="vin-input"
              maxLength={17}
            />
            <button onClick={() => checkVIN()} className="check-btn">
              {loading ? "Decoding..." : "Decode VIN"}
            </button>
          </div>
          
          {error && (
            <div style={{ marginTop: 16, padding: "12px 16px", background: "#fef2f2", borderRadius: 12, color: "#dc2626", fontSize: 15, fontWeight: 600, maxWidth: 680, margin: "16px auto 0 auto", border: "1px solid #fecaca" }}>
              ⚠️ {error}
            </div>
          )}

          {/* CHECK SAMPLE MECHANIC */}
          <div className="sample-wrapper animate-reveal delay-100">
            <span style={{ color: "#64748b", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", marginRight: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>
              Check Sample:
            </span>
            {[
              { label: "Tesla Model 3", vin: "5YJ3E1EA7JF000316", icon: "⚡" },
              { label: "Nissan Leaf", vin: "1N4AZ1CP0LC306016", icon: "🍃" },
              { label: "Chevy Bolt", vin: "1G1FY6S09K4100001", icon: "🔌" },
            ].map((s) => (
              <button key={s.vin} onClick={() => setVin(s.vin)} className="sample-btn">
                <span className="sample-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </section>

        {/* RESULTS ENGINE */}
        {result && (
          <main ref={resultsRef} className="results-wrapper animate-reveal delay-100">
            
            {/* SPECIFICATIONS BOX */}
            <div className="data-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", paddingBottom: 20 }}>
                <h2 className="specs-title">
                  {/* SYSTEM TRUST UPDATE: High-fidelity secure shield check SVG */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#16a34a" }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>
                  Official Specifications
                </h2>
                <span style={{ background: "#f1f5f9", color: "#475569", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  NHTSA vPIC Data
                </span>
              </div>
              
              <div className="spec-grid">
                <div className="spec-box">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16 }}>🏢</span>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Brand</div>
                  </div>
                  <div style={{ fontSize: 26, color: "#0f172a", fontWeight: 900 }}>{result.make}</div>
                </div>

                <div className="spec-box">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16 }}>🚘</span>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Vehicle Model</div>
                  </div>
                  <div style={{ fontSize: 26, color: "#0f172a", fontWeight: 900 }}>{result.model}</div>
                </div>

                <div className="spec-box">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16 }}>📅</span>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Manufacturing Year</div>
                  </div>
                  <div style={{ fontSize: 26, color: "#0f172a", fontWeight: 900 }}>{result.year}</div>
                </div>

                <div className="spec-box">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16 }}>⚡</span>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Powertrain</div>
                  </div>
                  <div style={{ fontSize: 26, color: "#0f172a", fontWeight: 900 }}>{result.fuelType}</div>
                </div>
              </div>
            </div>

            {/* POSITIONED HIGHLY VISIBLE ARROW (Overlaps safely into the viewport) */}
            <div style={{ width: "100%", textAlign: "center" }}>
              <button onClick={scrollToStepTwo} className="scroll-arrow-premium" aria-label="Scroll to Step 2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </button>
            </div>

            {/* RECALL DASHBOARD WIDGET */}
            <div className={`recall-card ${result.recalls > 0 ? "recall-danger" : "recall-safe"}`}>
              <div className={result.recalls > 0 ? "recall-icon-danger" : "recall-icon-safe"}>
                {result.recalls === 0 ? "✓" : "!"}
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: "#111827", margin: "0 0 6px 0", letterSpacing: -0.5 }}>
                  Safety & Recall Status
                </h2>
                {result.recalls === 0 ? (
                  <p style={{ color: "#4b5563", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
                    Clear history. There are <strong style={{ color: "#10b981" }}>0 active safety recalls</strong> registered in the official NHTSA database for the {result.year} {result.make} {result.model}.
                  </p>
                ) : (
                  <div>
                    <p style={{ color: "#111827", fontSize: 15, fontWeight: 700, margin: "0 0 6px 0" }}>
                      Warning: <span style={{ color: "#ef4444" }}>{result.recalls} safety recall{result.recalls > 1 ? "s" : ""}</span> detected in government records.
                    </p>
                    <p style={{ color: "#4b5563", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                      We highly recommend verifying with the vendor or a certified dealership that all active manufacturer recalls have been properly serviced prior to purchase.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* UPGRADED INTERACTIVE STEP 2 CARD */}
            <div ref={stepTwoRef} className="step-two-card animate-reveal delay-200">
              <p style={{ color: "#bbf7d0", fontSize: 13, fontWeight: 800, letterSpacing: 2, marginBottom: 12 }}>STEP 2 OF 2</p>
              <h3 className="step-two-title">Check Battery Health</h3>
              <p style={{ color: "#f0fdf4", fontSize: 17, marginBottom: 32, maxWidth: 600, margin: "0 auto 32px auto", lineHeight: 1.6, fontWeight: 500 }}>
                Now that we have verified your vehicle, let's process your OBD-II scanner data to calculate exact battery degradation and current market value.
              </p>
              <Link href={`/battery-check?vin=${vin}&make=${result.make}&model=${result.model}&year=${result.year}`} className="btn-next-massive">
                Go to Battery Calculator →
              </Link>
            </div>
            
          </main>
        )}
      </div>

      {/* CONSISTENT STRUCTURAL FOOTER */}
      <footer style={{ background: "#111827", color: "#9ca3af", padding: "64px 24px 32px 24px", textAlign: "center", marginTop: "auto" }}>
        <div style={{ margin: "0 0 24px 0" }}>
          <div style={{ fontWeight: 800, color: "#fff", fontSize: 24, marginBottom: 8 }}>EV<span style={{ color: "#4ade80" }}>2</span>Trust</div>
          <p style={{ color: "#6b7280", fontSize: 14, fontWeight: 500 }}>The global EV health & history platform</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginBottom: 32 }}>
          <Link href="/about" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>About Us</Link>
          <Link href="/how-it-works" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>How it works</Link>
          <Link href="/supported-vehicles" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Supported Vehicles</Link>
          <Link href="/privacy-policy" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Privacy Policy</Link>
          <Link href="/terms" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Terms of Service</Link>
          <Link href="/disclaimer" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Disclaimer</Link>
          <Link href="/contact" className="footer-link" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14 }}>Contact Us</Link>
        </div>
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: 32, color: "#4b5563", fontSize: 13 }}>
          © 2026 EV2Trust. All rights reserved.
        </div>
      </footer>
    </div>
  );
}