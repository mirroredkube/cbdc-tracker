import React, { useState } from "react";

const data = [
  // ── GLOBAL BANKS ──
  { institution: "JPMorgan Chase", type: "Global Bank", platform: "Onyx (Kinexys)", stack: "Quorum fork (private)", consensus: "BFT (custom)", useCase: "Deposit tokens (JPMD), intraday settlement, cross-border payments", volume: "$2B+ daily settlement", status: "Production", year: "2020→", trend: "🔥", evm: "Yes" },
  { institution: "JPMorgan Chase", type: "Global Bank", platform: "Kinexys + Ondo + Chainlink", stack: "Multi-chain (public + private)", consensus: "Various", useCase: "Cross-border tokenized Treasury redemption with Mastercard & Ripple", volume: "$12.88B tokenized Treasuries market", status: "Pilot (May 2026)", year: "2026", trend: "🔥", evm: "Yes" },
  { institution: "Goldman Sachs", type: "Investment Bank", platform: "GS DAP (Digital Asset Platform)", stack: "Canton (Daml)", consensus: "Canton Protocol", useCase: "Tokenized bonds, digital asset issuance, repo agreements", volume: "$300M+ bond issuances", status: "Production", year: "2023→", trend: "📈", evm: "No" },
  { institution: "HSBC", type: "Global Bank", platform: "HSBC Orion", stack: "Hyperledger Fabric + custom", consensus: "Raft/BFT", useCase: "Tokenized gold, bond issuance, custody", volume: "$1B+ tokenized gold", status: "Production", year: "2023→", trend: "📈", evm: "No" },
  { institution: "MUFG (Mitsubishi UFJ)", type: "Global Bank", platform: "Progmat", stack: "Cosmos SDK + CometBFT", consensus: "Tendermint BFT", useCase: "Tokenized securities (48% of Japan's tokenized market)", volume: "48% Japan market share", status: "Production", year: "2024→", trend: "🔥", evm: "IBC" },
  { institution: "Top 5 Global Bank (unnamed)", type: "Global Bank", platform: "Custom Cosmos chain", stack: "Cosmos SDK + CometBFT", consensus: "Tendermint BFT", useCase: "Digital tokenization of assets", volume: "$3T+ assets scope", status: "Production", year: "2025→", trend: "🔥", evm: "Yes" },
  { institution: "Deutsche Bank", type: "Global Bank", platform: "Custom + ZKsync", stack: "Ethereum L2", consensus: "PoS (Ethereum)", useCase: "Tokenized fund management, crypto custody", volume: "N/A", status: "Pilot", year: "2025", trend: "📈", evm: "Yes" },
  { institution: "UBS", type: "Global Bank", platform: "UBS Tokenize", stack: "Ethereum mainnet + private", consensus: "PoS (Ethereum)", useCase: "Tokenized structured products, digital bonds", volume: "$350M+ bond on Ethereum", status: "Production", year: "2024→", trend: "📈", evm: "Yes" },
  { institution: "Société Générale (FORGE)", type: "Global Bank", platform: "SG-FORGE", stack: "Ethereum mainnet", consensus: "PoS (Ethereum)", useCase: "Euro-denominated digital bonds, MiCA stablecoin (EURCV)", volume: "$100M+ bonds", status: "Production", year: "2023→", trend: "📈", evm: "Yes" },
  { institution: "Standard Chartered", type: "Global Bank", platform: "Libeara", stack: "Ethereum + Hedera", consensus: "PoS / Hashgraph", useCase: "Tokenized money market funds, green bonds", volume: "$100M+ pilot", status: "Production", year: "2024→", trend: "📈", evm: "Yes" },
  { institution: "ANZ Bank", type: "Global Bank", platform: "A$DC stablecoin", stack: "Ethereum + Chainlink", consensus: "PoS (Ethereum)", useCase: "AUD-pegged stablecoin for settlements, cross-chain", volume: "$30M pilot", status: "Production", year: "2024→", trend: "📈", evm: "Yes" },

  // ── CENTRAL BANKS / CBDC ──
  { institution: "ECB / Eurosystem", type: "Central Bank", platform: "Pontes + Appia", stack: "Multiple DLTs tested (Fabric, Besu, custom)", consensus: "BFT variants", useCase: "Wholesale CBDC, DLT settlement with TARGET Services", volume: "€1.59B in trials (2024)", status: "Pilot → Production Q3 2026", year: "2024→", trend: "🔥", evm: "Partial" },
  { institution: "Banque de France", type: "Central Bank", platform: "DL3S", stack: "Hyperledger Fabric", consensus: "Raft (orderer)", useCase: "Wholesale CBDC, tokenized bond settlement", volume: "Part of ECB trials", status: "Production pilot", year: "2020→", trend: "📈", evm: "No" },
  { institution: "Central Bank of Nigeria", type: "Central Bank", platform: "eNaira", stack: "Hyperledger Besu", consensus: "QBFT/IBFT (PoA)", useCase: "Retail CBDC, financial inclusion", volume: "200M+ population target", status: "Production", year: "2021→", trend: "⚠️", evm: "Yes" },
  { institution: "BIS Innovation Hub", type: "Central Bank (multi)", platform: "mBridge", stack: "Besu fork (mBridge Ledger)", consensus: "Dashing (custom BFT)", useCase: "Multi-CBDC cross-border payments (HK, Thailand, China, UAE)", volume: "$22M+ real transactions in pilot", status: "MVP → Production", year: "2022→", trend: "📈", evm: "Yes" },
  { institution: "Bank of Thailand + HKMA", type: "Central Bank", platform: "Project Inthanon-LionRock", stack: "R3 Corda → mBridge", consensus: "Notary (Corda) → Dashing", useCase: "Cross-border wholesale CBDC", volume: "Part of mBridge", status: "Migrated to mBridge", year: "2019→", trend: "📈", evm: "No→Yes" },

  // ── ASSET MANAGERS ──
  { institution: "BlackRock", type: "Asset Manager", platform: "BUIDL (on Securitize)", stack: "Ethereum mainnet + Avalanche + Aptos + others", consensus: "PoS (Ethereum)", useCase: "Tokenized US Treasury money market fund", volume: "$2.5B+ AUM (largest tokenized fund)", status: "Production", year: "2024→", trend: "🔥", evm: "Yes" },
  { institution: "Franklin Templeton", type: "Asset Manager", platform: "BENJI (OnChain US Gov MMF)", stack: "Stellar + Polygon + Ethereum + Avalanche", consensus: "SCP (Stellar) / PoS", useCase: "Tokenized US Gov money market fund", volume: "$700M+ AUM", status: "Production", year: "2021→", trend: "📈", evm: "Partial" },
  { institution: "Ondo Finance", type: "Asset Manager (crypto-native)", platform: "OUSG / USDY / Ondo Chain", stack: "Ethereum + Cosmos SDK (Ondo Chain)", consensus: "PoS / Tendermint BFT", useCase: "Tokenized US Treasuries, building own L1", volume: "$800M+ TVL", status: "Production + new chain building", year: "2023→", trend: "🔥", evm: "Yes" },
  { institution: "WisdomTree", type: "Asset Manager", platform: "WisdomTree Prime", stack: "Ethereum + Stellar", consensus: "PoS / SCP", useCase: "Tokenized funds (gold, Treasury, equity)", volume: "$100M+", status: "Production", year: "2023→", trend: "📈", evm: "Yes" },
  { institution: "Hamilton Lane", type: "Asset Manager (PE)", platform: "Via Securitize / Figure", stack: "Ethereum + Provenance (Cosmos)", consensus: "PoS / Tendermint BFT", useCase: "Tokenized private equity funds", volume: "$100M+", status: "Production", year: "2023→", trend: "📈", evm: "Yes" },

  // ── MARKET INFRASTRUCTURE ──
  { institution: "DTCC", type: "Market Infrastructure", platform: "ComposerX", stack: "Custom + Ethereum", consensus: "Various", useCase: "Tokenized US Treasuries, collateral management", volume: "$2.4Q (quadrillion) clearing annually", status: "MVP H1 2026", year: "2025→", trend: "🔥", evm: "Yes" },
  { institution: "SIX Digital Exchange (SDX)", type: "Stock Exchange", platform: "SDX", stack: "R3 Corda + custom", consensus: "Notary (Corda)", useCase: "Regulated tokenized securities exchange", volume: "CHF 375M+ digital bond by Canton of Zürich", status: "Production", year: "2021→", trend: "📈", evm: "No" },
  { institution: "Euroclear", type: "Settlement", platform: "With Chainlink", stack: "Multi-chain via CCIP", consensus: "Various", useCase: "Cross-chain fund tokenization, DVP settlement", volume: "$37T+ securities serviced", status: "Pilot → integration", year: "2025→", trend: "📈", evm: "Yes" },
  { institution: "Singapore Exchange (SGX)", type: "Stock Exchange", platform: "Marketnode", stack: "Custom + public chains", consensus: "Various", useCase: "Tokenized bonds, fund settlement", volume: "$100M+ bonds", status: "Production", year: "2023→", trend: "📈", evm: "Partial" },

  // ── FINTECHS & NEOBANKS ──
  { institution: "Figure Technologies", type: "Fintech", platform: "Provenance Blockchain", stack: "Cosmos SDK + CometBFT", consensus: "Tendermint BFT", useCase: "Mortgage origination, HELOC, securitization", volume: "$9B+ originated on-chain", status: "Production", year: "2019→", trend: "📈", evm: "No (Cosmos)" },
  { institution: "Ripple", type: "Fintech / Payments", platform: "XRPL + Axelar", stack: "XRPL + Cosmos SDK (Axelar)", consensus: "UNL (XRPL) / Tendermint (Axelar)", useCase: "Cross-border payments, RLUSD stablecoin, tokenized Treasuries", volume: "$1.3B+ tokenized assets on XRPL (2026)", status: "Production", year: "2012→", trend: "🔥", evm: "Via sidechain" },
  { institution: "Circle", type: "Fintech / Stablecoin", platform: "USDC + CPN Managed Payments", stack: "Multi-chain (Ethereum, Solana, Base, etc.)", consensus: "PoS (various)", useCase: "USDC stablecoin ($60B+), institutional payment rails", volume: "$60B+ circulating supply", status: "Production", year: "2018→", trend: "🔥", evm: "Yes" },
  { institution: "Fireblocks", type: "Fintech / Infra", platform: "Fireblocks Platform", stack: "Multi-chain support (80+ chains)", consensus: "N/A (custody layer)", useCase: "Institutional custody, MPC wallets, tokenization", volume: "$7T+ transferred", status: "Production", year: "2019→", trend: "🔥", evm: "Yes" },
  { institution: "Securitize", type: "Fintech / Tokenization", platform: "Securitize Platform", stack: "Ethereum + Avalanche + others", consensus: "PoS", useCase: "RWA tokenization platform (BlackRock BUIDL partner)", volume: "$2.5B+ via BUIDL alone", status: "Production", year: "2017→", trend: "🔥", evm: "Yes" },
  { institution: "Visa", type: "Payments", platform: "Visa Stablecoin Settlement", stack: "Ethereum + Solana", consensus: "PoS", useCase: "Stablecoin settlement for institutions", volume: "$3.5B+ annualized (Dec 2025)", status: "Production", year: "2025→", trend: "🔥", evm: "Yes" },
  { institution: "Mastercard", type: "Payments", platform: "Multi-Token Network (MTN)", stack: "Custom + public chains", consensus: "Various", useCase: "Cross-border settlement, tokenized asset transfers", volume: "Part of JPM/Ondo pilot", status: "Pilot → Production", year: "2024→", trend: "📈", evm: "Partial" },

  // ── INSURANCE ──
  { institution: "Allianz", type: "Insurance", platform: "Custom (ReFi)", stack: "Ethereum + private", consensus: "PoS / PoA", useCase: "Catastrophe bond tokenization, parametric insurance", volume: "$50M+ pilot", status: "Pilot", year: "2024", trend: "📈", evm: "Yes" },
  { institution: "Aon + Nayms", type: "Insurance", platform: "Nayms", stack: "Ethereum + Base", consensus: "PoS", useCase: "On-chain insurance marketplace, tokenized risk pools", volume: "$10M+ placed", status: "Production", year: "2023→", trend: "📈", evm: "Yes" },
  { institution: "Swiss Re", type: "Reinsurance", platform: "R3 Corda-based pilots", stack: "R3 Corda", consensus: "Notary", useCase: "Reinsurance contract automation", volume: "N/A", status: "Pilot", year: "2023", trend: "➡️", evm: "No" },

  // ── CRYPTO-NATIVE INSTITUTIONAL ──
  { institution: "dYdX", type: "Derivatives Exchange", platform: "dYdX Chain", stack: "Cosmos SDK + CometBFT", consensus: "Tendermint BFT", useCase: "Perpetual futures trading", volume: "$1B+ daily volume", status: "Production", year: "2023→", trend: "📈", evm: "No (Cosmos)" },
  { institution: "Binance", type: "Exchange", platform: "BNB Chain", stack: "Modified Cosmos/Tendermint", consensus: "PoSA (PoA + PoS)", useCase: "Exchange chain, DeFi, tokenization", volume: "$50B+ daily (exchange)", status: "Production", year: "2020→", trend: "📈", evm: "Yes" },
  { institution: "Crypto.com", type: "Exchange", platform: "Cronos", stack: "Cosmos SDK + CometBFT", consensus: "Tendermint BFT", useCase: "EVM chain, DeFi, payments", volume: "$500M+ TVL", status: "Production", year: "2021→", trend: "📈", evm: "Yes" },
];

const typeColors = {
  "Global Bank": { bg: "#1a1a2e", border: "#4361ee", text: "#a8b2d1" },
  "Investment Bank": { bg: "#1a1a2e", border: "#4361ee", text: "#a8b2d1" },
  "Central Bank": { bg: "#0d1b2a", border: "#e07a5f", text: "#c9ada7" },
  "Central Bank (multi)": { bg: "#0d1b2a", border: "#e07a5f", text: "#c9ada7" },
  "Asset Manager": { bg: "#1b2a1b", border: "#2d6a4f", text: "#95d5b2" },
  "Asset Manager (crypto-native)": { bg: "#1b2a1b", border: "#2d6a4f", text: "#95d5b2" },
  "Asset Manager (PE)": { bg: "#1b2a1b", border: "#2d6a4f", text: "#95d5b2" },
  "Market Infrastructure": { bg: "#2a1b2a", border: "#9b5de5", text: "#d4a5e5" },
  "Stock Exchange": { bg: "#2a1b2a", border: "#9b5de5", text: "#d4a5e5" },
  "Settlement": { bg: "#2a1b2a", border: "#9b5de5", text: "#d4a5e5" },
  "Fintech": { bg: "#2a2a1b", border: "#f4a261", text: "#e9c46a" },
  "Fintech / Payments": { bg: "#2a2a1b", border: "#f4a261", text: "#e9c46a" },
  "Fintech / Stablecoin": { bg: "#2a2a1b", border: "#f4a261", text: "#e9c46a" },
  "Fintech / Infra": { bg: "#2a2a1b", border: "#f4a261", text: "#e9c46a" },
  "Fintech / Tokenization": { bg: "#2a2a1b", border: "#f4a261", text: "#e9c46a" },
  "Payments": { bg: "#2a2a1b", border: "#f4a261", text: "#e9c46a" },
  "Insurance": { bg: "#1b2a2a", border: "#00b4d8", text: "#90e0ef" },
  "Reinsurance": { bg: "#1b2a2a", border: "#00b4d8", text: "#90e0ef" },
  "Derivatives Exchange": { bg: "#2a1b1b", border: "#e63946", text: "#f4a0a0" },
  "Exchange": { bg: "#2a1b1b", border: "#e63946", text: "#f4a0a0" },
};

const getColor = (type) => typeColors[type] || { bg: "#1a1a1a", border: "#666", text: "#aaa" };

const filters = ["All", "Global Bank", "Central Bank", "Asset Manager", "Fintech", "Market Infra", "Insurance", "Exchange"];
const stackFilters = ["All Stacks", "Ethereum/EVM", "Cosmos/Tendermint", "Hyperledger", "R3 Corda", "Custom/Other"];

export default function App() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [stackFilter, setStackFilter] = useState("All Stacks");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = data.filter((d) => {
    const typeMatch =
      typeFilter === "All" ||
      (typeFilter === "Global Bank" && (d.type.includes("Global Bank") || d.type.includes("Investment Bank"))) ||
      (typeFilter === "Central Bank" && d.type.includes("Central Bank")) ||
      (typeFilter === "Asset Manager" && d.type.includes("Asset Manager")) ||
      (typeFilter === "Fintech" && (d.type.includes("Fintech") || d.type.includes("Payments"))) ||
      (typeFilter === "Market Infra" && (d.type.includes("Market") || d.type.includes("Exchange") || d.type.includes("Settlement"))) ||
      (typeFilter === "Insurance" && (d.type.includes("Insurance") || d.type.includes("Reinsurance"))) ||
      (typeFilter === "Exchange" && (d.type === "Exchange" || d.type === "Derivatives Exchange"));

    const stackMatch =
      stackFilter === "All Stacks" ||
      (stackFilter === "Ethereum/EVM" && (d.stack.toLowerCase().includes("ethereum") || d.evm === "Yes")) ||
      (stackFilter === "Cosmos/Tendermint" && (d.stack.toLowerCase().includes("cosmos") || d.consensus.toLowerCase().includes("tendermint"))) ||
      (stackFilter === "Hyperledger" && (d.stack.toLowerCase().includes("hyperledger") || d.stack.toLowerCase().includes("fabric") || d.stack.toLowerCase().includes("besu"))) ||
      (stackFilter === "R3 Corda" && d.stack.toLowerCase().includes("corda")) ||
      (stackFilter === "Custom/Other" && !d.stack.toLowerCase().includes("ethereum") && !d.stack.toLowerCase().includes("cosmos") && !d.stack.toLowerCase().includes("hyperledger") && !d.stack.toLowerCase().includes("corda"));

    const searchMatch = searchTerm === "" || 
      d.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.useCase.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && stackMatch && searchMatch;
  });

  const stats = {
    total: filtered.length,
    production: filtered.filter(d => d.status.includes("Production")).length,
    evm: filtered.filter(d => d.evm === "Yes").length,
    hot: filtered.filter(d => d.trend === "🔥").length,
  };

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", background: "transparent", color: "#e0e0e0", padding: "0" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 4px 0", letterSpacing: "-0.5px" }}>
          Institutional Blockchain Adoption 2025–2026
        </h1>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Technology stacks, consensus mechanisms, and transaction volumes across financial institutions</p>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search institution, platform, use case..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "6px 12px", background: "#1a1a2e", border: "1px solid #333", borderRadius: 6, color: "#fff", fontSize: 12, minWidth: 240, outline: "none" }}
        />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              style={{ padding: "4px 10px", fontSize: 11, borderRadius: 4, border: typeFilter === f ? "1px solid #4361ee" : "1px solid #333", background: typeFilter === f ? "#4361ee22" : "transparent", color: typeFilter === f ? "#4361ee" : "#888", cursor: "pointer" }}>
              {f}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {stackFilters.map(f => (
            <button key={f} onClick={() => setStackFilter(f)}
              style={{ padding: "4px 10px", fontSize: 11, borderRadius: 4, border: stackFilter === f ? "1px solid #2d6a4f" : "1px solid #333", background: stackFilter === f ? "#2d6a4f22" : "transparent", color: stackFilter === f ? "#2d6a4f" : "#888", cursor: "pointer" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Entries", value: stats.total, color: "#4361ee" },
          { label: "In Production", value: stats.production, color: "#2d6a4f" },
          { label: "EVM Compatible", value: stats.evm, color: "#f4a261" },
          { label: "Hot Trend 🔥", value: stats.hot, color: "#e63946" },
        ].map(s => (
          <div key={s.label} style={{ padding: "8px 16px", background: "#111", border: `1px solid ${s.color}33`, borderRadius: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#888" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 2px", fontSize: 11 }}>
          <thead>
            <tr style={{ color: "#666", textTransform: "uppercase", fontSize: 9, letterSpacing: "1px" }}>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Trend</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Institution</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Type</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Platform</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Tech Stack</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Consensus</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Use Case</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Volume / TVL</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>EVM</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => {
              const c = getColor(d.type);
              return (
                <tr key={i} style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}>
                  <td style={{ padding: "10px 12px", fontSize: 16 }}>{d.trend}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{d.institution}</td>
                  <td style={{ padding: "10px 12px", color: c.text, fontSize: 10 }}>{d.type}</td>
                  <td style={{ padding: "10px 12px", color: "#ccc" }}>{d.platform}</td>
                  <td style={{ padding: "10px 12px", color: "#aaa" }}>{d.stack}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 10, background: d.consensus.includes("Tendermint") ? "#2d6a4f33" : d.consensus.includes("QBFT") || d.consensus.includes("BFT") ? "#4361ee33" : d.consensus.includes("PoS") ? "#f4a26133" : "#33333366", color: d.consensus.includes("Tendermint") ? "#95d5b2" : d.consensus.includes("QBFT") || d.consensus.includes("BFT") ? "#a8b2d1" : d.consensus.includes("PoS") ? "#e9c46a" : "#aaa" }}>
                      {d.consensus}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#aaa", maxWidth: 250 }}>{d.useCase}</td>
                  <td style={{ padding: "10px 12px", color: "#e0e0e0", fontWeight: 500, whiteSpace: "nowrap" }}>{d.volume}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <span style={{ padding: "2px 6px", borderRadius: 3, fontSize: 10, background: d.evm === "Yes" ? "#2d6a4f44" : "#33333344", color: d.evm === "Yes" ? "#95d5b2" : "#888" }}>
                      {d.evm}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 10, fontSize: 10, background: d.status.includes("Production") ? "#2d6a4f33" : d.status.includes("Pilot") ? "#f4a26133" : "#33333344", color: d.status.includes("Production") ? "#95d5b2" : d.status.includes("Pilot") ? "#e9c46a" : "#aaa" }}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 24, padding: 16, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
        <h3 style={{ fontSize: 13, color: "#fff", margin: "0 0 8px 0" }}>Key Trends 2025–2026</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 11, color: "#aaa" }}>
          <div><span style={{ color: "#4361ee" }}>■</span> <strong style={{ color: "#ccc" }}>Ethereum dominates</strong> as the public settlement layer — BlackRock BUIDL, UBS, SocGen all on mainnet</div>
          <div><span style={{ color: "#2d6a4f" }}>■</span> <strong style={{ color: "#ccc" }}>Cosmos/Tendermint rising fast</strong> — MUFG, unnamed Top 5 bank, Figure ($9B+), dYdX, Ondo building own L1</div>
          <div><span style={{ color: "#e07a5f" }}>■</span> <strong style={{ color: "#ccc" }}>CBDCs use BFT/PoA exclusively</strong> — no central bank has adopted PoS for settlement</div>
          <div><span style={{ color: "#f4a261" }}>■</span> <strong style={{ color: "#ccc" }}>Tokenized Treasuries exploded</strong> — from $1B to $12.88B in 15 months (225% growth)</div>
          <div><span style={{ color: "#9b5de5" }}>■</span> <strong style={{ color: "#ccc" }}>Market infra moving on-chain</strong> — DTCC, Euroclear, SIX all building tokenization rails</div>
          <div><span style={{ color: "#e63946" }}>■</span> <strong style={{ color: "#ccc" }}>Canton/Daml gaining in investment banking</strong> — Goldman Sachs in production, Canton Network growing</div>
        </div>
      </div>

      <p style={{ fontSize: 9, color: "#555", marginTop: 16 }}>
        Sources: Company announcements, ECB exploratory work reports, Atlantic Council CBDC Tracker, rwa.xyz, DeFiLlama, Cosmos Labs, Chainlink TVE, Grayscale 2026 Outlook. Volumes are approximate and may represent different metrics (AUM, TVL, originated, transacted). Last updated: May 2026.
      </p>
    </div>
  );
}
