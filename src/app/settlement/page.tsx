"use client";

import React, { useState } from "react";

interface DataRow {
  instrument: string;
  issuer: string;
  moneyType: string;
  chain: string;
  consensus: string;
  cashLeg: string;
  dvpCapability: string;
  volume: string;
  status: string;
  counterparties: string;
  trend: string;
}

const data: DataRow[] = [
  // ── DEPOSIT TOKENS (Bank-issued, backed by bank deposits) ──
  { instrument: "JPM Coin (JPMD)", issuer: "JPMorgan (Kinexys)", moneyType: "Deposit Token", chain: "Base (Ethereum L2) + Canton Network", consensus: "PoS (Base) / Canton Protocol", cashLeg: "USD deposits at JPMorgan", dvpCapability: "Atomic DvP with tokenized securities on Canton; payments on Base", volume: "$2B+ daily (Kinexys overall)", status: "Production (Base Nov 2025), Canton phased 2026", counterparties: "B2C2, Coinbase, Mastercard, Ondo", trend: "🔥" },
  { instrument: "JPMD on Canton", issuer: "JPMorgan (Kinexys) + Digital Asset", moneyType: "Deposit Token", chain: "Canton Network", consensus: "Canton Protocol (BFT)", cashLeg: "USD deposits at JPMorgan", dvpCapability: "Atomic DvP with DTCC ComposerX tokenized Treasuries", volume: "Part of $2B+ Kinexys", status: "Integration phased through 2026", counterparties: "DTCC, Goldman Sachs, other Canton participants", trend: "🔥" },
  { instrument: "USDF Consortium", issuer: "Multiple US banks", moneyType: "Deposit Token", chain: "Provenance (Cosmos SDK)", consensus: "Tendermint BFT", cashLeg: "USD deposits at member banks", dvpCapability: "DvP for mortgages, loans on Provenance", volume: "N/A", status: "Consortium active, limited deployment", counterparties: "Figure, member banks", trend: "📈" },
  { instrument: "DCJPY", issuer: "DeCurret DCP + Japanese banks", moneyType: "Deposit Token", chain: "Custom (ibet for Fin)", consensus: "Custom BFT", cashLeg: "JPY deposits at member banks", dvpCapability: "Atomic DvP for security tokens — Japan's first live DvP with deposit token", volume: "¥270B security token market", status: "Production (April 2026)", counterparties: "SBI Securities, Daiwa Securities, Osaka Digital Exchange", trend: "🔥" },
  { instrument: "Fnality (USC)", issuer: "Fnality International (15 banks)", moneyType: "Deposit Token (central bank-backed)", chain: "Ethereum-based (private)", consensus: "BFT (private PoA)", cashLeg: "GBP held at Bank of England omnibus account", dvpCapability: "PvP cross-currency, DvP for securities — backed by actual central bank reserves", volume: "GBP live; USD, EUR, CAD, JPY planned", status: "Production (GBP Dec 2023), expanding", counterparties: "Barclays, BNP Paribas, CIBC, Commerzbank, Credit Suisse, Goldman Sachs, ING, Lloyds, Nasdaq, Santander, State Street, Sumitomo, UBS", trend: "🔥" },
  { instrument: "Onyx Digital Assets (legacy)", issuer: "JPMorgan", moneyType: "Deposit Token", chain: "Quorum (private Ethereum fork)", consensus: "IBFT (PoA)", cashLeg: "USD/EUR at JPMorgan", dvpCapability: "Intraday repo settlement, cross-border payments", volume: "$1B+ daily at peak", status: "Production since 2019, migrating to JPMD", counterparties: "JPMorgan institutional clients", trend: "➡️" },

  // ── STABLECOINS (used as cash leg in DvP) ──
  { instrument: "USDC", issuer: "Circle", moneyType: "Stablecoin", chain: "Ethereum, Base, Solana, Avalanche, + 15 chains", consensus: "PoS (various)", cashLeg: "USD reserves (T-bills + bank deposits)", dvpCapability: "Cash leg for Ondo OUSG redemptions, Chainlink CCIP cross-chain DvP", volume: "$60B+ supply, $1T+ monthly tx", status: "Production", counterparties: "BlackRock, Visa, Mastercard, Coinbase, Ondo", trend: "🔥" },
  { instrument: "EURCV", issuer: "Société Générale FORGE", moneyType: "Stablecoin (MiCA-compliant)", chain: "Ethereum mainnet", consensus: "PoS (Ethereum)", cashLeg: "EUR reserves at SocGen", dvpCapability: "Cash leg for SG-FORGE bond DvP, first MiCA-licensed EUR stablecoin", volume: "€40M+ issued", status: "Production (Dec 2023)", counterparties: "SG-FORGE clients", trend: "📈" },
  { instrument: "RLUSD", issuer: "Ripple", moneyType: "Stablecoin", chain: "XRPL + Ethereum", consensus: "UNL (XRPL) / PoS (Ethereum)", cashLeg: "USD reserves (T-bills + deposits)", dvpCapability: "Cash leg for Ondo OUSG on XRPL, cross-border PvP pilot with JPMorgan/Mastercard", volume: "$348M+ on XRPL", status: "Production (Dec 2024)", counterparties: "Ondo, JPMorgan (pilot), Mastercard (pilot)", trend: "🔥" },
  { instrument: "PYUSD", issuer: "PayPal (Paxos)", moneyType: "Stablecoin", chain: "Ethereum + Solana", consensus: "PoS", cashLeg: "USD reserves", dvpCapability: "Payments settlement, institutional transfers", volume: "$500M+ supply", status: "Production", counterparties: "PayPal merchants, Venmo users", trend: "📈" },
  { instrument: "USDM / BUIDL redemption token", issuer: "BlackRock (via Securitize)", moneyType: "Stablecoin-adjacent", chain: "Ethereum + 6 chains", consensus: "PoS", cashLeg: "US Treasuries (BUIDL fund)", dvpCapability: "Instant BUIDL redemption to USDC, used as collateral across DeFi", volume: "$2.5B+ BUIDL AUM", status: "Production", counterparties: "Securitize, Circle, Aave, GMX", trend: "🔥" },

  // ── WHOLESALE CBDCs (central bank money on-chain) ──
  { instrument: "Pontes (Eurosystem wCBDC)", issuer: "ECB / Eurosystem", moneyType: "Wholesale CBDC", chain: "Multiple DLTs linked to TARGET Services", consensus: "BFT variants", cashLeg: "EUR central bank reserves at ECB", dvpCapability: "DvP for tokenized securities settled in central bank money — the gold standard", volume: "€1.59B in 2024 trials", status: "Pilot → Production Q3 2026", counterparties: "64 participants incl. all major EU banks", trend: "🔥" },
  { instrument: "DL3S (Banque de France)", issuer: "Banque de France", moneyType: "Wholesale CBDC", chain: "Hyperledger Fabric", consensus: "Raft (orderer BFT planned)", cashLeg: "EUR at Banque de France", dvpCapability: "Full DLT DvP — tokenized EUR directly on DLT for bond settlement", volume: "Part of ECB €1.59B trials", status: "Production pilot, part of Pontes", counterparties: "HSBC, BNP Paribas, Crédit Agricole, EIB", trend: "📈" },
  { instrument: "mBridge wCBDC", issuer: "BIS + 6 central banks", moneyType: "Wholesale CBDC", chain: "mBridge Ledger (Besu fork)", consensus: "Dashing (custom BFT)", cashLeg: "CNY, HKD, THB, AED at respective central banks", dvpCapability: "Atomic PvP cross-currency settlement — multiple CBDCs swap atomically", volume: "$22M+ real transactions", status: "MVP, expanding", counterparties: "HKMA, Bank of Thailand, PBOC, CBUAE, Bank of Israel, Norges Bank", trend: "📈" },
  { instrument: "Helvetia III (SNB)", issuer: "Swiss National Bank", moneyType: "Wholesale CBDC", chain: "SIX Digital Exchange (SDX)", consensus: "BFT (Corda-based)", cashLeg: "CHF at Swiss National Bank", dvpCapability: "Live DvP — tokenized CHF wCBDC settles against digital bonds on SDX", volume: "CHF 375M digital bond (Canton of Zürich)", status: "Production pilot (2023→)", counterparties: "SIX, UBS, Credit Suisse, Zürcher Kantonalbank", trend: "📈" },
  { instrument: "Project Guardian (MAS)", issuer: "Monetary Authority of Singapore", moneyType: "Wholesale CBDC (test)", chain: "Multiple (Ethereum, Polygon, Canton)", consensus: "Various", cashLeg: "SGD at MAS", dvpCapability: "DvP for tokenized bonds, FX PvP, cross-border settlement", volume: "Multiple pilots", status: "Pilot", counterparties: "DBS, Standard Chartered, HSBC, JPMorgan, SBI", trend: "📈" },
  { instrument: "DCJPY + BOJ pilot", issuer: "Bank of Japan (exploration)", moneyType: "Wholesale CBDC (pilot)", chain: "Custom + ibet for Fin", consensus: "Custom BFT", cashLeg: "JPY at Bank of Japan", dvpCapability: "DvP with security tokens, connected to DCJPY deposit token ecosystem", volume: "¥270B market context", status: "Pilot", counterparties: "SBI, Daiwa, DeCurret, BOOSTRY", trend: "📈" },

  // ── TOKENIZED MONEY MARKET FUNDS (used as cash-equivalent collateral) ──
  { instrument: "BUIDL (BlackRock)", issuer: "BlackRock + Securitize", moneyType: "Tokenized MMF (cash equivalent)", chain: "Ethereum, Avalanche, Polygon, Aptos, Arbitrum, Optimism", consensus: "PoS (various)", cashLeg: "US T-bills, repos, cash", dvpCapability: "Used as collateral in DeFi (Aave, GMX); instant USDC redemption enables quasi-atomic DvP", volume: "$2.5B+ AUM", status: "Production", counterparties: "Securitize, Circle, Aave, FalconX", trend: "🔥" },
  { instrument: "BENJI (Franklin Templeton)", issuer: "Franklin Templeton", moneyType: "Tokenized MMF", chain: "Stellar, Polygon, Ethereum, Avalanche, Aptos, Base", consensus: "SCP / PoS", cashLeg: "US Gov money market instruments", dvpCapability: "Peer-to-peer fund share transfers; exploring DvP with stablecoins", volume: "$700M+ AUM", status: "Production", counterparties: "Direct to investors", trend: "📈" },
  { instrument: "OUSG (Ondo)", issuer: "Ondo Finance", moneyType: "Tokenized Treasuries", chain: "Ethereum, XRPL, Solana, Ondo Chain (coming)", consensus: "PoS / UNL / Tendermint", cashLeg: "Short-term US Treasuries", dvpCapability: "Mint/redeem via USDC or RLUSD; JPMorgan/Mastercard cross-border DvP pilot (May 2026)", volume: "$800M+ TVL", status: "Production", counterparties: "Ripple, JPMorgan (pilot), Mastercard (pilot), BlackRock (BUIDL connection)", trend: "🔥" },
];

const moneyTypeColors: Record<string, { bg: string; border: string; badge: string }> = {
  "Deposit Token": { bg: "#1a1a2e", border: "#4361ee", badge: "#4361ee" },
  "Deposit Token (central bank-backed)": { bg: "#1a1a2e", border: "#4361ee", badge: "#4361ee" },
  "Stablecoin": { bg: "#1b2a1b", border: "#2d6a4f", badge: "#2d6a4f" },
  "Stablecoin (MiCA-compliant)": { bg: "#1b2a1b", border: "#2d6a4f", badge: "#2d6a4f" },
  "Stablecoin-adjacent": { bg: "#1b2a1b", border: "#2d6a4f", badge: "#2d6a4f" },
  "Wholesale CBDC": { bg: "#2a1b1b", border: "#e07a5f", badge: "#e07a5f" },
  "Wholesale CBDC (test)": { bg: "#2a1b1b", border: "#e07a5f", badge: "#e07a5f" },
  "Wholesale CBDC (pilot)": { bg: "#2a1b1b", border: "#e07a5f", badge: "#e07a5f" },
  "Tokenized MMF (cash equivalent)": { bg: "#2a2a1b", border: "#f4a261", badge: "#f4a261" },
  "Tokenized MMF": { bg: "#2a2a1b", border: "#f4a261", badge: "#f4a261" },
  "Tokenized Treasuries": { bg: "#2a2a1b", border: "#f4a261", badge: "#f4a261" },
};

const getColor = (type: string) => {
  for (const [key, val] of Object.entries(moneyTypeColors)) {
    if (type.includes(key.split(" ")[0])) return val;
  }
  return moneyTypeColors[type] || { bg: "#1a1a1a", border: "#666", badge: "#666" };
};

const filters = ["All", "Deposit Token", "Stablecoin", "Wholesale CBDC", "Tokenized MMF/Treasury"];

function MoneyOnChainDashboard() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = data.filter((d) => {
    const typeMatch = filter === "All" ||
      (filter === "Deposit Token" && d.moneyType.includes("Deposit")) ||
      (filter === "Stablecoin" && d.moneyType.includes("Stablecoin")) ||
      (filter === "Wholesale CBDC" && d.moneyType.includes("Wholesale CBDC")) ||
      (filter === "Tokenized MMF/Treasury" && (d.moneyType.includes("Tokenized") || d.moneyType.includes("MMF")));
    const searchMatch = search === "" ||
      d.instrument.toLowerCase().includes(search.toLowerCase()) ||
      d.issuer.toLowerCase().includes(search.toLowerCase()) ||
      d.counterparties.toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace", color: "#e0e0e0", padding: 0 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 4px 0" }}>
          Money On-Chain: DvP &amp; PvP Settlement Instruments (2025–2026)
        </h1>
        <p style={{ fontSize: 11, color: "#888", margin: 0 }}>Deposit tokens, stablecoins, wholesale CBDCs, and tokenized MMFs enabling atomic settlement</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input type="text" placeholder="Search instrument, issuer, counterparty..." value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "6px 12px", background: "#1a1a2e", border: "1px solid #333", borderRadius: 6, color: "#fff", fontSize: 11, minWidth: 260, outline: "none" }} />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "4px 10px", fontSize: 10, borderRadius: 4, border: filter === f ? "1px solid #4361ee" : "1px solid #333", background: filter === f ? "#4361ee22" : "transparent", color: filter === f ? "#4361ee" : "#888", cursor: "pointer" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "#111", border: "1px solid #222", borderRadius: 8, padding: 14, marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "#ccc", marginBottom: 8, fontWeight: 600 }}>The Cash Leg Hierarchy (strongest → weakest settlement finality)</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 10 }}>
          {[
            { label: "Wholesale CBDC", desc: "Central bank money on DLT — the gold standard", color: "#e07a5f" },
            { label: "Deposit Token", desc: "Commercial bank money on DLT — deposit-insured", color: "#4361ee" },
            { label: "Regulated Stablecoin", desc: "Reserve-backed, audited — near-money", color: "#2d6a4f" },
            { label: "Tokenized MMF", desc: "T-bill backed, redeemable — cash equivalent", color: "#f4a261" },
          ].map(s => (
            <div key={s.label} style={{ padding: "6px 10px", background: "#0a0a0a", border: `1px solid ${s.color}44`, borderRadius: 6, flex: "1 1 200px" }}>
              <div style={{ color: s.color, fontWeight: 600 }}>{s.label}</div>
              <div style={{ color: "#888", marginTop: 2 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 2px", fontSize: 10 }}>
          <thead>
            <tr style={{ color: "#555", textTransform: "uppercase", fontSize: 8, letterSpacing: "1px" }}>
              <th style={{ padding: "6px 8px", textAlign: "left" }}></th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>Instrument</th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>Issuer</th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>Money Type</th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>Chain / Consensus</th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>What Backs It</th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>DvP / PvP Capability</th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>Volume</th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>Key Counterparties</th>
              <th style={{ padding: "6px 8px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => {
              const c = getColor(d.moneyType);
              return (
                <tr key={i} style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}>
                  <td style={{ padding: "8px", fontSize: 14 }}>{d.trend}</td>
                  <td style={{ padding: "8px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>{d.instrument}</td>
                  <td style={{ padding: "8px", color: "#ccc", fontSize: 10 }}>{d.issuer}</td>
                  <td style={{ padding: "8px" }}>
                    <span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 9, background: `${c.badge}22`, color: c.badge, border: `1px solid ${c.badge}44` }}>
                      {d.moneyType}
                    </span>
                  </td>
                  <td style={{ padding: "8px", color: "#aaa", fontSize: 9 }}>
                    <div>{d.chain}</div>
                    <div style={{ color: "#666", marginTop: 2 }}>{d.consensus}</div>
                  </td>
                  <td style={{ padding: "8px", color: "#aaa", fontSize: 9 }}>{d.cashLeg}</td>
                  <td style={{ padding: "8px", color: "#ddd", fontSize: 9, maxWidth: 220 }}>{d.dvpCapability}</td>
                  <td style={{ padding: "8px", color: "#e0e0e0", fontWeight: 500, whiteSpace: "nowrap", fontSize: 10 }}>{d.volume}</td>
                  <td style={{ padding: "8px", color: "#aaa", fontSize: 9, maxWidth: 180 }}>{d.counterparties}</td>
                  <td style={{ padding: "8px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 9,
                      background: d.status.includes("Production") ? "#2d6a4f33" : d.status.includes("Pilot") || d.status.includes("MVP") ? "#f4a26133" : "#33333344",
                      color: d.status.includes("Production") ? "#95d5b2" : d.status.includes("Pilot") || d.status.includes("MVP") ? "#e9c46a" : "#aaa" }}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20, padding: 14, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
        <h3 style={{ fontSize: 12, color: "#fff", margin: "0 0 10px 0" }}>Key Insights: Money On-Chain (2025–2026)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 10, color: "#aaa" }}>
          <div><span style={{ color: "#4361ee" }}>■</span> <strong style={{ color: "#ccc" }}>JPMorgan is everywhere</strong> — JPMD on Base (production), JPMD on Canton (2026), cross-border pilot with Ondo/Mastercard. The only bank with money on both public AND private chains.</div>
          <div><span style={{ color: "#e07a5f" }}>■</span> <strong style={{ color: "#ccc" }}>Wholesale CBDCs all use BFT</strong> — Pontes, mBridge, Helvetia, DL3S. Zero use PoS. Central bank money demands deterministic finality.</div>
          <div><span style={{ color: "#2d6a4f" }}>■</span> <strong style={{ color: "#ccc" }}>Stablecoins are the bridge</strong> — USDC and RLUSD are being used as the cash leg in DvP pilots where wCBDC doesn&apos;t exist yet. They&apos;re &quot;good enough&quot; until central bank money arrives.</div>
          <div><span style={{ color: "#f4a261" }}>■</span> <strong style={{ color: "#ccc" }}>Canton Network is the dark horse</strong> — DTCC ComposerX (Q2 2026) + JPMD + Goldman Sachs = the first integrated DvP ecosystem with deposit token cash leg and tokenized Treasuries.</div>
          <div><span style={{ color: "#e07a5f" }}>■</span> <strong style={{ color: "#ccc" }}>Japan leads in deposit token DvP</strong> — DCJPY is the first production atomic DvP using bank deposit tokens for security token settlement (April 2026).</div>
          <div><span style={{ color: "#4361ee" }}>■</span> <strong style={{ color: "#ccc" }}>Fnality is unique</strong> — deposit token backed by actual central bank reserves (Bank of England omnibus account). The closest thing to a wCBDC without being one.</div>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: 14, background: "#0a0a0a", borderRadius: 8, border: "1px solid #1a1a1a" }}>
        <h3 style={{ fontSize: 12, color: "#fff", margin: "0 0 8px 0" }}>The Convergence Pattern</h3>
        <pre style={{ fontSize: 10, color: "#aaa", margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
{`2019 ──── JPMorgan Onyx (private chain, internal only)
2021 ──── eNaira CBDC (Besu, retail)
2023 ──── Fnality GBP live (central bank-backed deposit token)
         Goldman Sachs on Canton (DvP for bonds)
         Helvetia III (SNB wCBDC for SDX bond settlement)
2024 ──── ECB trials (€1.59B, 64 participants)
         mBridge PvP (multi-CBDC atomic FX)
         BlackRock BUIDL ($500M → $2.5B)
2025 ──── JPMD on Base (public chain, production)
         EURCV stablecoin (MiCA-licensed)
         RLUSD launched
         Visa stablecoin settlement ($3.5B annualized)
2026 ──── JPMD on Canton (DvP with DTCC Treasuries)
         DCJPY DvP live (Japan first deposit token DvP)
         Pontes pilot (Eurosystem wCBDC)
         DTCC ComposerX production (Canton)
         Cross-border DvP: Ondo + JPM + Mastercard + Ripple

The trend: money is moving on-chain layer by layer.
First stablecoins, then deposit tokens, then wCBDCs.
Each layer is "more money" than the last.`}
        </pre>
      </div>

      <p style={{ fontSize: 8, color: "#444", marginTop: 12 }}>
        Sources: JPMorgan Kinexys announcements, ECB exploratory work reports, BIS mBridge reports, SNB Helvetia III report, DeCurret DCP / SBI press releases, Circle/Ripple/Ondo announcements, DTCC/Digital Asset press releases, Chainlink documentation. Volumes are approximate. Last updated: May 2026.
      </p>
    </div>
  );
}

export default function SettlementPage() {
  return (
    <div className="min-h-screen bg-[#0a0a10] text-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <MoneyOnChainDashboard />
      </div>
    </div>
  );
}
