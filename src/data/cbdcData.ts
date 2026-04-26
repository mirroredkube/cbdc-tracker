export type Stage = "Research" | "Proof of Concept" | "Pilot" | "Launched" | "Cancelled";
export type Type = "Retail" | "Wholesale" | "Both";
export type Tier = "1-tier" | "2-tier";
export type AccountModel = "Account" | "Token" | "Hybrid";
export type PrivacyModel = "Anonymous" | "Pseudonymous" | "Identified";
export type Confidence = "High" | "Medium" | "Low";

export interface RiskProfile {
  financial: 1 | 2 | 3 | 4 | 5;     // bank disintermediation risk
  privacy: 1 | 2 | 3 | 4 | 5;        // surveillance / data exposure risk
  cyber: 1 | 2 | 3 | 4 | 5;          // attack surface / systemic risk
  adoption: 1 | 2 | 3 | 4 | 5;       // uptake failure risk
  geopolitical: 1 | 2 | 3 | 4 | 5;   // sanctions, fragmentation, political risk
  notes: string;
}

export interface PilotMetrics {
  wallets?: number;
  transactions?: number;
  volume?: string;
  merchants?: number;
  asOf: string;                        // ISO date
}

export interface Architecture {
  tier: Tier;
  accountModel: AccountModel;
  privacyModel: PrivacyModel;
  offlineCapable: boolean;
  programmable: boolean;
  interestBearing: boolean;
  holdingLimit?: string;
  notes: string;
}

export interface CBDCProject {
  id: string;
  tag: string;
  country: string;
  currencyName: string;
  stage: Stage;
  type: Type;
  techStack: string;
  technologyProvider?: string;
  centralBank: string;
  announcementYear: number;
  updateRate: string;
  usesDLT: boolean;
  interoperable: boolean;
  region: string;
  isoNumeric?: string;
  euMemberFill?: boolean;
  whitepapers: { title: string; url: string }[];
  description: string;
  flagUrl?: string;
  statusColor?: string;
  coordinates: [number, number];

  // Research-depth fields
  architecture: Architecture;
  riskProfile: RiskProfile;
  designRationale: string;
  interoperabilityDetails: string;
  pilotMetrics?: PilotMetrics;
  lastVerifiedAt: string;             // ISO date
  confidence: Confidence;
}

export const DB_LAST_UPDATED = "2026-04-26";

export const cbdcProjects: CBDCProject[] = [
  {
    id: "chn",
    tag: "e-cny",
    country: "China",
    currencyName: "e-CNY",
    stage: "Launched",
    type: "Both",
    techStack: "Centralized (PBOC Architecture)",
    technologyProvider: "PBOC / State-owned banks",
    centralBank: "People's Bank of China (PBOC)",
    announcementYear: 2014,
    updateRate: "Monthly",
    usesDLT: false,
    interoperable: true,
    region: "Asia",
    isoNumeric: "156",
    description: "China's e-CNY remains the most mature large-scale CBDC deployment. The PBOC continues to promote the e-CNY 'actively and prudently' as part of its digital-finance agenda, while maintaining a dedicated CBDC section and ongoing policy work through 2026.",
    whitepapers: [
      { title: "PBOC CBDC topic page", url: "https://www.pbc.gov.cn/en/3688006/4706656/index.html" },
      { title: "Progress of Research and Development of E-CNY in China", url: "https://www.pbc.gov.cn/en/3688110/3688172/4157443/4293696/2021072014364791207.pdf" }
    ],
    flagUrl: "https://flagcdn.com/cn.svg",
    coordinates: [104.1954, 35.8617],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Pseudonymous",
      offlineCapable: true,
      programmable: true,
      interestBearing: false,
      holdingLimit: "¥10,000 per wallet (standard); higher tiers require KYC",
      notes: "PBOC issues e-CNY to authorized operators (state-owned banks and WeChat/Alipay). End-users hold wallets tied to phone numbers, not bank accounts. Offline NFC payments supported. Smart contract layer added in 2023 for conditional payments and government subsidies. Despite token model, PBOC retains full transaction visibility.",
    },
    riskProfile: {
      financial: 2,
      privacy: 5,
      cyber: 3,
      adoption: 2,
      geopolitical: 5,
      notes: "Financial stability risk is mitigated by holding limits and the 2-tier design — banks remain intermediaries. Privacy risk is the highest globally: PBOC has full transaction surveillance capability, and the system is explicitly designed for AML/CFT tracing. Geopolitical risk is extreme: e-CNY is being piloted for cross-border use in mBridge and directly challenges USD hegemony in trade settlement. Adoption risk is low — the state can mandate use for public payroll and subsidies.",
    },
    designRationale: "China's design priorities were: (1) maintain monetary sovereignty against private payment giants (Alipay, WeChat Pay), (2) enable programmable fiscal transfers without commercial bank intermediation, (3) position for cross-border settlement as an alternative to SWIFT. The token model was chosen over account-based to enable offline payments in rural areas. Non-interest-bearing design prevents disintermediation of commercial banks. Pseudonymous rather than fully anonymous to preserve AML capability.",
    interoperabilityDetails: "Active participant in mBridge (multi-CBDC platform with UAE, Thailand, Hong Kong, Saudi Arabia). Pilot cross-border payments with Hong Kong's FPS. Exploring bilateral CBDC corridors with Russia and Middle East for commodity settlement. Uses ISO 20022 messaging for wholesale channels.",
    pilotMetrics: {
      wallets: 180000000,
      transactions: 950000000,
      volume: "¥1.8 trillion (~$250 billion)",
      merchants: 8000000,
      asOf: "2024-06-30",
    },
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "bhs",
    tag: "sand-dollar",
    country: "Bahamas",
    currencyName: "Sand Dollar",
    stage: "Launched",
    type: "Retail",
    techStack: "NZIA (Private Blockchain)",
    technologyProvider: "NZIA Ltd.",
    centralBank: "Central Bank of The Bahamas",
    announcementYear: 2018,
    updateRate: "Quarterly",
    usesDLT: true,
    interoperable: false,
    region: "Americas",
    isoNumeric: "044",
    description: "The Sand Dollar was the world's first nationwide CBDC, originating to provide financial inclusion for residents residing across the archipelago and unbanked islands.",
    whitepapers: [
      { title: "Project Sand Dollar: A Bahamian Payments System Modernization Initiative", url: "https://www.centralbankbahamas.com/viewPDF/documents/2019-12-25-02-18-11-Project-Sanddollar.pdf" }
    ],
    flagUrl: "https://flagcdn.com/bs.svg",
    coordinates: [-78.0359, 25.0343],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Identified",
      offlineCapable: true,
      programmable: false,
      interestBearing: false,
      holdingLimit: "B$8,000 per wallet",
      notes: "Distributed ledger operated by NZIA. End-users access through authorized payment service providers. Tiered KYC: low-tier wallets require only phone number; higher tiers require full ID. Offline capability was a primary design goal given the archipelago geography. No programmability layer.",
    },
    riskProfile: {
      financial: 2,
      privacy: 3,
      cyber: 3,
      adoption: 4,
      geopolitical: 1,
      notes: "Adoption risk is the primary concern — actual usage remains low relative to wallet creation, reflecting a broader pattern of financial inclusion tools underused by target populations. Privacy risk is moderate: tiered KYC means some users are fully identified. Geopolitical risk minimal for a small island economy pegged to USD.",
    },
    designRationale: "The Sand Dollar's primary goal was financial inclusion across 700+ islands, many without bank branches. The token model supports offline transactions. The 2-tier design allows licensed payment service providers (mobile money operators, credit unions) to serve as distribution points without the Central Bank needing direct retail relationships. Holding limits prevent the system being used as a store of value rather than a payment tool.",
    interoperabilityDetails: "Currently no cross-border CBDC interoperability. Peg to Bahamian dollar (1:1 to USD) provides indirect USD compatibility. The Central Bank has expressed interest in Caribbean regional CBDC cooperation.",
    pilotMetrics: {
      wallets: 300000,
      asOf: "2023-12-31",
    },
    lastVerifiedAt: "2026-04-26",
    confidence: "Medium",
  },
  {
    id: "eu",
    tag: "digital-euro",
    country: "European Union",
    currencyName: "Digital Euro",
    stage: "Pilot",
    type: "Both",
    techStack: "TBD / Pre-Pilot Preparation",
    technologyProvider: "ECB / Various vendors",
    centralBank: "European Central Bank (ECB)",
    announcementYear: 2020,
    updateRate: "Quarterly",
    usesDLT: false,
    interoperable: true,
    region: "Europe",
    euMemberFill: true,
    description: "The ECB moved the digital euro into its next project phase in October 2025. In March and April 2026 it opened additional rulebook workstreams, called for pilot participants, and signed agreements with European standard setters to support online and contactless payments. Issuance still depends on EU legislation.",
    whitepapers: [
      { title: "Digital euro", url: "https://www.ecb.europa.eu/euro/digital_euro/html/index.eu.html" },
      { title: "ECB signs agreements with European standard setters to facilitate digital euro payments", url: "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.pr260424~202f9d832b.en.html" },
      { title: "The digital euro: preparing for a potential launch", url: "https://www.ecb.europa.eu/press/key/date/2026/html/ecb.sp260324~66f71f7577.en.html" }
    ],
    flagUrl: "https://flagcdn.com/eu.svg",
    coordinates: [10.4515, 51.1657],
    architecture: {
      tier: "2-tier",
      accountModel: "Account",
      privacyModel: "Pseudonymous",
      offlineCapable: true,
      programmable: false,
      interestBearing: false,
      holdingLimit: "€3,000 per person (proposed)",
      notes: "Account-based model distributed via commercial banks and payment service providers — chosen to preserve bank intermediation and comply with EU AML requirements. No DLT: ECB opted for a centralized ledger with distributed access points. Offline payments planned via hardware security element. Programmability explicitly excluded from initial design to prevent conditional money. Holding limit designed to prevent bank runs during crises.",
    },
    riskProfile: {
      financial: 3,
      privacy: 2,
      cyber: 3,
      adoption: 3,
      geopolitical: 2,
      notes: "Financial stability risk is moderate despite holding limits — in a sovereign debt crisis, flight to digital euro could amplify bank runs faster than physical cash. Privacy risk is deliberately low by design: the ECB has committed to not seeing individual transaction data; a privacy-preserving intermediary layer is in the architecture. Adoption risk is real — Europe already has well-functioning instant payment systems (SEPA Instant) and it's unclear what problem the digital euro solves for consumers.",
    },
    designRationale: "The ECB's design is driven by three strategic imperatives: (1) reduce dependence on non-European payment rails (Visa, Mastercard, US Big Tech), (2) ensure Europe has a public payment option if private alternatives fail, (3) comply with EU data protection law (GDPR). The account-based model was chosen over token for regulatory compliance. No programmability was a deliberate political choice to prevent conditionality that might conflict with citizens' rights. The €3,000 holding limit reflects intense lobbying from European banks who fear disintermediation.",
    interoperabilityDetails: "Designed to interoperate with existing SEPA infrastructure. ECB is working with BIS on CBDC interoperability standards. Potential future cross-border use with non-EU countries via bilateral arrangements. Not connected to mBridge.",
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "bra",
    tag: "drex",
    country: "Brazil",
    currencyName: "Drex",
    stage: "Pilot",
    type: "Both",
    techStack: "Hyperledger Besu",
    technologyProvider: "Banco Central do Brasil",
    centralBank: "Banco Central do Brasil",
    announcementYear: 2020,
    updateRate: "Quarterly",
    usesDLT: true,
    interoperable: true,
    region: "Americas",
    isoNumeric: "076",
    description: "Drex remains in pilot mode on a Banco Central do Brasil-operated DLT platform. The official public material continues to describe Drex as a digital-real platform for wholesale settlement with retail access provided by regulated intermediaries, while Phase 2 pilot reporting is still being finalized.",
    whitepapers: [
      { title: "Drex - Digital Brazilian Real", url: "https://www.bcb.gov.br/en/financialstability/drex_en" },
      { title: "Piloto Drex", url: "https://www.bcb.gov.br/estabilidadefinanceira/real-digital-piloto" }
    ],
    flagUrl: "https://flagcdn.com/br.svg",
    coordinates: [-51.9253, -14.235],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Pseudonymous",
      offlineCapable: false,
      programmable: true,
      interestBearing: false,
      notes: "Built on Hyperledger Besu (EVM-compatible), enabling smart contract programmability. Wholesale CBDC settles between institutions; tokenized deposits represent retail access. Privacy solution using zero-knowledge proofs (ZKPs) is a key Phase 2 research focus — transaction data on the shared ledger needs to be hidden between competing financial institutions. Drex is explicitly designed to enable DeFi-style financial products within a regulated framework (tokenized government bonds, real estate, agri-credit).",
    },
    riskProfile: {
      financial: 3,
      privacy: 3,
      cyber: 4,
      adoption: 2,
      geopolitical: 1,
      notes: "Cyber risk is elevated because the EVM-compatible smart contract layer introduces a larger attack surface than a simple payment ledger — smart contract bugs could affect tokenized assets. Privacy risk is a known open problem: ZKP-based privacy for a shared institutional ledger is technically unsolved at scale. Financial risk is moderate; Brazil's strong Pix instant payment network means Drex must differentiate on programmability rather than basic payments.",
    },
    designRationale: "Brazil chose DLT specifically to enable programmable finance — the Banco Central views Drex not as a digital banknote but as a settlement layer for a tokenized financial market. The EVM-compatible choice was deliberate: it allows existing Ethereum tooling and developer ecosystem. The 2-tier model preserves commercial bank relationships. Brazil's massive rural unbanked population and agri-credit market make programmable CBDC (e.g., crop-insurance triggered automatically by weather data) a compelling use case.",
    interoperabilityDetails: "Exploring cross-border CBDC connections with BIS Project Nexus and bilateral discussions with Argentina and other Mercosur members. Not currently connected to mBridge.",
    pilotMetrics: {
      asOf: "2024-03-31",
    },
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "nga",
    tag: "enaira",
    country: "Nigeria",
    currencyName: "eNaira",
    stage: "Launched",
    type: "Retail",
    techStack: "Hyperledger Fabric",
    technologyProvider: "Bitt Inc.",
    centralBank: "Central Bank of Nigeria (CBN)",
    announcementYear: 2021,
    updateRate: "Ad hoc",
    usesDLT: true,
    interoperable: false,
    region: "Africa",
    isoNumeric: "566",
    description: "The eNaira launched in 2021 to foster financial inclusion and cross-border trade. As of February 2025, circulation rose to N18.31 billion, but adoption remains extremely low (~0.37% of currency in circulation, with 98.5% of wallets never used). The CBN announced a reevaluation of the program in 2025.",
    whitepapers: [
      { title: "Design Paper for the eNaira", url: "https://www.cbn.gov.ng/Out/2024/RSD/Adoption%20of%20the%20eNaira%20Issues%20and%20the%20way%20forward.pdf" }
    ],
    flagUrl: "https://flagcdn.com/ng.svg",
    coordinates: [8.6753, 9.082],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Identified",
      offlineCapable: false,
      programmable: false,
      interestBearing: false,
      holdingLimit: "₦300,000 per wallet (Tier 3)",
      notes: "Built on Hyperledger Fabric by Bitt Inc. (same vendor as DCash). Four wallet tiers based on KYC level. Merchants and consumers have separate wallet types. No offline capability — a significant barrier in a country with unreliable internet. Speed bumps feature to reduce transaction fees incentivized adoption during FX crisis but created parallel market distortions.",
    },
    riskProfile: {
      financial: 2,
      privacy: 3,
      cyber: 3,
      adoption: 5,
      geopolitical: 2,
      notes: "Adoption risk is the highest globally — this is the most significant CBDC adoption failure to date despite a large population, mobile money infrastructure, and active government promotion. Root causes: no compelling use case over mobile money, internet dependency, distrust of CBN following currency redesign crisis. The 2025 reevaluation signals the CBN itself recognises the program needs fundamental rethinking. Privacy risk moderate: full KYC required, government has transaction visibility.",
    },
    designRationale: "The CBN designed eNaira primarily to: (1) reduce cash handling costs, (2) improve monetary policy transmission, (3) enable government-to-person payments (e.g., social transfers). The Hyperledger Fabric choice reflected cost and vendor availability. The decision NOT to build offline capability was a significant design error given Nigeria's infrastructure — the 98.5% wallet dormancy rate reflects this and the lack of a compelling consumer benefit over existing mobile money.",
    interoperabilityDetails: "No operational cross-border CBDC interoperability. Some exploratory work with ECOWAS regional payment integration, but no live pilots.",
    pilotMetrics: {
      wallets: 13000000,
      volume: "₦18.31 billion (~$12 million)",
      asOf: "2025-02-28",
    },
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "usa",
    tag: "us-cbdc",
    country: "USA",
    currencyName: "US CBDC",
    stage: "Research",
    type: "Both",
    techStack: "Federal Reserve RLN/NYIC",
    technologyProvider: "Federal Reserve / NYIC",
    centralBank: "Federal Reserve",
    announcementYear: 2022,
    updateRate: "Ad hoc",
    usesDLT: true,
    interoperable: false,
    region: "Americas",
    isoNumeric: "840",
    description: "The U.S. has not committed to issuing a CBDC. A January 23, 2025 White House executive order prohibits executive agencies from establishing, issuing, or promoting a CBDC, but the Federal Reserve's public CBDC page still states that it has made no decision on whether to pursue or implement one.",
    whitepapers: [
      { title: "Federal Reserve CBDC topic page", url: "https://www.federalreserve.gov/central-bank-digital-currency.htm" },
      { title: "Strengthening American Leadership in Digital Financial Technology", url: "https://www.whitehouse.gov/presidential-actions/2025/01/strengthening-american-leadership-in-digital-financial-technology/" },
      { title: "Project Cedar Phase II × Ubin+ Report (PDF)", url: "https://www.newyorkfed.org/medialibrary/media/nyic/project-cedar-phase-two-ubin-report.pdf" }
    ],
    flagUrl: "https://flagcdn.com/us.svg",
    coordinates: [-95.7129, 37.0902],
    architecture: {
      tier: "2-tier",
      accountModel: "Account",
      privacyModel: "Pseudonymous",
      offlineCapable: false,
      programmable: false,
      interestBearing: false,
      notes: "No architecture has been decided or committed to. Research explored a Regulated Liability Network (RLN) concept where commercial bank deposits and CBDC co-exist on shared infrastructure. Project Hamilton (MIT/Boston Fed) explored high-throughput CBDC architecture achieving 1.7M TPS. Project Cedar explored wholesale FX settlement on DLT. All research is now effectively paused under the executive order.",
    },
    riskProfile: {
      financial: 4,
      privacy: 4,
      cyber: 2,
      adoption: 1,
      geopolitical: 5,
      notes: "Geopolitical risk cuts both ways: a US CBDC could extend dollar dominance in a world moving toward CBDC-based settlement, but the executive order reflects the political judgment that this risk is outweighed by domestic privacy and financial liberty concerns. Financial risk is debated intensely — at scale, a retail CBDC could trigger bank runs. The US political consensus against CBDC (bipartisan in practical terms) means adoption risk is essentially off the table currently.",
    },
    designRationale: "The US approach has been deliberate caution reflecting: (1) the dollar's existing global reserve status reduces urgency, (2) strong political opposition from both parties on privacy and bank disintermediation grounds, (3) the existing FedNow instant payment infrastructure reduces the domestic payment problem. Research focused on wholesale use cases (cross-border settlement) where benefits are clearer. The executive order does not prohibit research but stops any operational path forward.",
    interoperabilityDetails: "Project Cedar Phase II explored cross-border wholesale FX settlement with MAS (Project Ubin+). No operational interoperability. Participates in BIS research forums. The executive order makes near-term international CBDC participation unlikely.",
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "ind",
    tag: "digital-rupee",
    country: "India",
    currencyName: "Digital Rupee (e₹)",
    stage: "Pilot",
    type: "Both",
    techStack: "Distributed Ledger Technology (RBI)",
    technologyProvider: "Reserve Bank of India",
    centralBank: "Reserve Bank of India (RBI)",
    announcementYear: 2022,
    updateRate: "Monthly",
    usesDLT: true,
    interoperable: true,
    region: "Asia",
    isoNumeric: "356",
    description: "India's e₹ program remains in pilot mode across retail and wholesale tracks. Recent official use cases include programmable CBDC distribution for food subsidies in Puducherry, alongside continued work on offline functionality and broader ecosystem participation.",
    whitepapers: [
      { title: "Concept Note on Central Bank Digital Currency", url: "https://rbi.org.in/Scripts/PublicationReportDetails.aspx?UrlPage=&ID=1218" },
      { title: "Government of India launches CBDC-based Digital Food Currency pilot", url: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2233186" }
    ],
    flagUrl: "https://flagcdn.com/in.svg",
    coordinates: [78.9629, 20.5937],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Pseudonymous",
      offlineCapable: true,
      programmable: true,
      interestBearing: false,
      holdingLimit: "₹2,00,000 per wallet",
      notes: "Two parallel pilots: retail e₹-R (token-based, distributed via banks and non-bank PSPs) and wholesale e₹-W (for interbank settlement). Token model chosen to support offline functionality in rural areas — a priority given India's internet penetration gaps. Programmability is being used for purpose-bound money (food subsidies, MNREGA payments). RBI running on internally-developed DLT, not a commercial platform.",
    },
    riskProfile: {
      financial: 2,
      privacy: 3,
      cyber: 3,
      adoption: 3,
      geopolitical: 2,
      notes: "Adoption risk is moderate: India has strong UPI adoption (12B+ monthly transactions) which e₹ must compete with. However, the government's ability to mandate e₹ for specific welfare payments provides a captive use case. Privacy is moderate — pseudonymous at the user level, but RBI and intermediary banks retain tracing capability. Financial risk is low given the 2-tier design and holding limits.",
    },
    designRationale: "India's design priorities: (1) replace physical cash in a largely cash-based economy without disrupting the successful UPI ecosystem, (2) enable programmable welfare payments to reduce leakage and fraud in subsidy schemes, (3) support financial inclusion in areas without bank branches using offline capability. The choice to build on internal RBI infrastructure reflects strategic autonomy concerns. India is running separate retail and wholesale pilots to learn independently before any potential integration.",
    interoperabilityDetails: "Wholesale e₹ being tested for cross-border settlement. India is exploring bilateral CBDC links with UAE, Singapore, and other major remittance corridors (India is the world's largest remittance recipient). Participant in BIS Project Nexus for multi-country instant payment connectivity.",
    pilotMetrics: {
      wallets: 5000000,
      transactions: 50000000,
      merchants: 400000,
      asOf: "2024-12-31",
    },
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "swe",
    tag: "e-krona",
    country: "Sweden",
    currencyName: "e-krona",
    stage: "Research",
    type: "Retail",
    techStack: "R3 Corda (Pilot Ended)",
    technologyProvider: "R3",
    centralBank: "Sveriges Riksbank",
    announcementYear: 2017,
    updateRate: "Ad hoc",
    usesDLT: true,
    interoperable: false,
    region: "Europe",
    isoNumeric: "752",
    description: "The e-krona pilot concluded in autumn 2023 and the technical platform was decommissioned. A March 2024 inquiry found 'insufficient social need' for a retail CBDC at this time. The Riksbank is now in policy/design research only, with future work tied to developments in the ECB's digital euro project.",
    whitepapers: [
      { title: "E-krona project reports", url: "https://www.riksbank.se/en-gb/payments--cash/e-krona/e-krona-reports/" }
    ],
    flagUrl: "https://flagcdn.com/se.svg",
    coordinates: [18.6435, 60.1282],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Pseudonymous",
      offlineCapable: true,
      programmable: false,
      interestBearing: false,
      notes: "Pilot ran on R3 Corda — a permissioned DLT. Token-based design with a hardware wallet tested for offline payments. Platform decommissioned in 2023. Riksbank found no significant technical barriers but concluded the policy case was insufficient given Sweden's already-advanced digital payments ecosystem (Swish handles 90%+ of P2P payments).",
    },
    riskProfile: {
      financial: 2,
      privacy: 2,
      cyber: 2,
      adoption: 5,
      geopolitical: 1,
      notes: "Adoption risk is now moot as the program is effectively paused. The Riksbank's own inquiry identified the core problem: Sweden already has excellent private digital payments; a CBDC adds cost and complexity for unclear benefit. This is a valuable data point for other advanced economies considering retail CBDC. Privacy and financial risks were carefully managed in the design and not identified as blockers.",
    },
    designRationale: "The Riksbank began e-krona research due to Sweden's rapidly declining cash use — concern that if cash disappeared entirely, citizens would have no public payment option and would be entirely dependent on private infrastructure. The pilot tested whether a CBDC could serve as that backstop. The 2024 inquiry concluded that private payment infrastructure remains robust enough and the social need case is insufficient for the associated cost and complexity.",
    interoperabilityDetails: "No operational interoperability. If Sweden eventually joins the digital euro (as an EU member), the digital euro framework would supersede e-krona.",
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "jpn",
    tag: "digital-yen",
    country: "Japan",
    currencyName: "Digital Yen",
    stage: "Proof of Concept",
    type: "Both",
    techStack: "TBD / BOJ Ledgers",
    technologyProvider: "Bank of Japan",
    centralBank: "Bank of Japan (BoJ)",
    announcementYear: 2020,
    updateRate: "Quarterly",
    usesDLT: false,
    interoperable: false,
    region: "Asia",
    isoNumeric: "392",
    description: "The Bank of Japan continues a CBDC pilot program and CBDC Forum work with private-sector participants, while still stopping short of any issuance decision. Its February and March 2026 committee and working-group materials show experimentation is continuing rather than moving toward launch.",
    whitepapers: [
      { title: "Central Bank Digital Currency", url: "https://www.boj.or.jp/en/paym/digital" },
      { title: "CBDC Forum", url: "https://www.boj.or.jp/en/paym/digital/d_forum/index.htm" }
    ],
    flagUrl: "https://flagcdn.com/jp.svg",
    coordinates: [138.2529, 36.2048],
    architecture: {
      tier: "2-tier",
      accountModel: "Account",
      privacyModel: "Identified",
      offlineCapable: false,
      programmable: false,
      interestBearing: false,
      notes: "BoJ PoC tested three ledger architectures but has not selected one. CBDC Forum brings together 60+ private sector participants (banks, tech firms, retailers) to work through practical implementation challenges. No DLT — BoJ is exploring centralized and hybrid approaches. Key unresolved questions: offline payments, privacy law compatibility with CBDC transaction data, and interoperability with existing bank systems.",
    },
    riskProfile: {
      financial: 3,
      privacy: 3,
      cyber: 2,
      adoption: 2,
      geopolitical: 2,
      notes: "Japan's methodical approach reflects genuine uncertainty about the business case. Financial risk is moderate — Japan has an aging population that still uses cash heavily; a CBDC transition requires significant behaviour change. Privacy concerns are salient given Japan's Act on Protection of Personal Information. Adoption risk is relatively low if launched, as Japan can leverage its strong bank-state relationship to mandate usage.",
    },
    designRationale: "BoJ is proceeding cautiously because: (1) Japan's high cash-use society means there is no urgency — unlike Sweden, cash is not disappearing; (2) Japan's banking sector is politically influential and worried about disintermediation; (3) BoJ wants to observe China's e-CNY rollout and Europe's digital euro progress before committing. The CBDC Forum model — extensive private sector co-design — reflects Japan's consensus-based policy culture.",
    interoperabilityDetails: "Participating in BIS cross-border CBDC research. Historical involvement in Project Stella (with ECB) for DLT-based securities settlement. No operational cross-border CBDC links.",
    lastVerifiedAt: "2026-04-26",
    confidence: "Medium",
  },
  {
    id: "gbr",
    tag: "digital-pound",
    country: "United Kingdom",
    currencyName: "Digital Pound",
    stage: "Research",
    type: "Retail",
    techStack: "TBD / Evaluative",
    technologyProvider: "Bank of England",
    centralBank: "Bank of England",
    announcementYear: 2021,
    updateRate: "Ad hoc",
    usesDLT: false,
    interoperable: false,
    region: "Europe",
    isoNumeric: "826",
    description: "The UK remains in the design phase for a potential digital pound. The Bank of England says the current design phase ends in 2026, the Digital Pound Lab is running through July 2026, and a later-2026 assessment will decide whether to proceed to a build phase.",
    whitepapers: [
      { title: "The digital pound", url: "https://www.bankofengland.co.uk/the-digital-pound" },
      { title: "Progress update: Digital Pound Design Phase", url: "https://www.bankofengland.co.uk/the-digital-pound/progress-update-digital-pound-design-phase" },
      { title: "Digital Pound Lab", url: "https://www.bankofengland.co.uk/the-digital-pound/lab" }
    ],
    flagUrl: "https://flagcdn.com/gb.svg",
    coordinates: [-3.4359, 55.3781],
    architecture: {
      tier: "2-tier",
      accountModel: "Account",
      privacyModel: "Pseudonymous",
      offlineCapable: false,
      programmable: false,
      interestBearing: false,
      holdingLimit: "£10,000 per person (proposed)",
      notes: "Proposed account-based model with a 'Platform Model': Bank of England provides core ledger; private sector Payment Interface Providers (PIPs) build user-facing wallets and services. Non-interest-bearing and non-programmable in initial design. No offline payments in first version. The Digital Pound Lab is testing the API ecosystem and PIP model with selected participants through 2026.",
    },
    riskProfile: {
      financial: 3,
      privacy: 2,
      cyber: 2,
      adoption: 3,
      geopolitical: 2,
      notes: "The BoE/HM Treasury consultation received strong pushback on privacy — public responses were overwhelmingly concerned about government surveillance. The design response (no BoE visibility of individual transactions) addresses this architecturally. Financial risk is debated — the £10,000 limit is specifically designed to prevent bank run amplification. Adoption risk is real: the UK has Faster Payments and Open Banking; the digital pound use case is unclear for consumers.",
    },
    designRationale: "UK rationale: (1) strategic autonomy — ensure UK has sovereign digital currency infrastructure post-Brexit; (2) financial inclusion backstop if private payment providers fail or exclude users; (3) innovation platform enabling private sector to build new payment services on a public foundation (the Platform Model). The BoE has been deliberately non-committal on whether it will actually launch, treating this as contingency planning rather than committed programme.",
    interoperabilityDetails: "Post-Brexit, UK is not part of ECB/digital euro plans. Exploring bilateral links. Participating in BIS Project Agorá (tokenised cross-border payments). No operational CBDC interoperability.",
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "aus",
    tag: "eaud",
    country: "Australia",
    currencyName: "eAUD / Project Acacia",
    stage: "Research",
    type: "Wholesale",
    techStack: "Project Acacia (Wholesale DLT)",
    technologyProvider: "Reserve Bank of Australia",
    centralBank: "Reserve Bank of Australia (RBA)",
    announcementYear: 2020,
    updateRate: "Ad hoc",
    usesDLT: true,
    interoperable: true,
    region: "Oceania",
    isoNumeric: "036",
    description: "After completing a retail eAUD pilot in August 2023, Australia formally pivoted to wholesale CBDC only. In September 2024, the RBA and Treasury concluded there is 'no clear public interest case' for retail CBDC. Project Acacia now focuses exclusively on wholesale settlement efficiencies and tokenized assets.",
    whitepapers: [
      { title: "Australian CBDC Pilot for Digital Finance Innovation", url: "https://www.rba.gov.au/payments-and-infrastructure/central-bank-digital-currency/" }
    ],
    flagUrl: "https://flagcdn.com/au.svg",
    coordinates: [133.7751, -25.2744],
    architecture: {
      tier: "1-tier",
      accountModel: "Token",
      privacyModel: "Identified",
      offlineCapable: false,
      programmable: true,
      interestBearing: false,
      notes: "Wholesale-only architecture: RBA issues tokenized AUD directly to financial institutions for interbank and securities settlement. Project Acacia is testing settlement of tokenized assets (bonds, FX) using CBDC on DLT. Programmability is central — smart contracts automate delivery-versus-payment settlement. Retail CBDC explicitly ruled out by government policy.",
    },
    riskProfile: {
      financial: 1,
      privacy: 1,
      cyber: 3,
      adoption: 1,
      geopolitical: 1,
      notes: "Wholesale-only means most retail risk categories are not applicable. Cyber risk is relevant — wholesale settlement infrastructure is high-value target. Australia's decision to explicitly rule out retail CBDC is notable: RBA and Treasury studied it seriously and concluded it was not justified. This is a valuable evidence-based policy decision for other countries.",
    },
    designRationale: "Australia ran a retail pilot specifically to gather evidence and then made a policy decision based on that evidence — a methodologically sound approach. The pivot to wholesale reflects: (1) retail eAUD offers no benefit over existing NPP (New Payments Platform) which already provides real-time payments; (2) wholesale CBDC for tokenized asset settlement has clear efficiency gains; (3) financial stability risks of retail CBDC not justified by benefits.",
    interoperabilityDetails: "Project Acacia is exploring cross-border wholesale CBDC for FX settlement and tokenized asset markets. Connected to BIS and international wholesale CBDC research networks.",
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "jam",
    tag: "jam-dex",
    country: "Jamaica",
    currencyName: "JAM-DEX",
    stage: "Launched",
    type: "Retail",
    techStack: "eCurrency Mint",
    technologyProvider: "eCurrency Mint",
    centralBank: "Bank of Jamaica",
    announcementYear: 2021,
    updateRate: "Quarterly",
    usesDLT: false,
    interoperable: false,
    region: "Americas",
    isoNumeric: "388",
    description: "JAM-DEX (Jamaica Digital Exchange) was officially launched to provide a safe, convenient, and secure digital alternative to cash, particularly designed to serve the unbanked population. It remains one of only three fully launched CBDCs globally.",
    whitepapers: [
      { title: "Bank of Jamaica CBDC Implementation and Integration", url: "https://boj.org.jm/core-functions/currency/cbdc/" }
    ],
    flagUrl: "https://flagcdn.com/jm.svg",
    coordinates: [-77.2975, 18.1096],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Pseudonymous",
      offlineCapable: false,
      programmable: false,
      interestBearing: false,
      holdingLimit: "J$1,000,000 per wallet",
      notes: "eCurrency Mint platform, which uses a centralized issuing ledger (not DLT). Token-based — wallets can transfer value P2P without bank intermediation. KYC tiered: basic wallet (phone number only) allows limited holdings. Government offered J$2,500 incentive per wallet to drive adoption. Interoperability with local mobile wallets (Lynk) is the primary distribution channel.",
    },
    riskProfile: {
      financial: 1,
      privacy: 2,
      cyber: 2,
      adoption: 3,
      geopolitical: 1,
      notes: "Small open economy pegged to USD reduces all macro risks. Adoption risk remains — despite government incentives, actual transaction volumes are not publicly reported with specificity. The J$2,500 incentive drove wallet creation but unclear if it drove sustained usage. Privacy risk is low: tiered KYC with basic wallets for unbanked.",
    },
    designRationale: "Jamaica's motivation was purely financial inclusion: 17% of Jamaicans are unbanked and ~40% of the economy is informal cash-based. The eCurrency Mint platform was chosen as a proven, lower-cost solution appropriate for a small economy. Non-DLT reflects cost considerations. Government incentive program was designed to bootstrap the network effect. Jamaica is often studied as a case study for small-economy CBDC adoption strategies.",
    interoperabilityDetails: "No cross-border CBDC interoperability. Jamaica dollar is pegged to USD; CBDC does not change FX dynamics.",
    lastVerifiedAt: "2026-04-26",
    confidence: "Medium",
  },
  {
    id: "sgp",
    tag: "project-orchid",
    country: "Singapore",
    currencyName: "Project Orchid (PBM)",
    stage: "Pilot",
    type: "Wholesale",
    techStack: "Project Orchid / Ubin",
    technologyProvider: "Monetary Authority of Singapore",
    centralBank: "Monetary Authority of Singapore (MAS)",
    announcementYear: 2016,
    updateRate: "Quarterly",
    usesDLT: true,
    interoperable: true,
    region: "Asia",
    isoNumeric: "702",
    description: "The Monetary Authority of Singapore advances wholesale CBDC and purpose-bound money (PBM). Three major banks (DBS, OCBC, UOB) are using wholesale CBDC for overnight interbank lending, and MAS piloted tokenized MAS bills settled via CBDC in 2025. MAS has confirmed no urgent need for a retail CBDC.",
    whitepapers: [
      { title: "Project Orchid: Purpose Bound Money", url: "https://www.mas.gov.sg/publications/monographs-or-information-paper/2022/project-orchid" },
      { title: "Project Ubin+: Cross-border Connectivity", url: "https://www.mas.gov.sg/schemes-and-initiatives/ubin-plus" }
    ],
    flagUrl: "https://flagcdn.com/sg.svg",
    coordinates: [103.8198, 1.3521],
    architecture: {
      tier: "1-tier",
      accountModel: "Token",
      privacyModel: "Identified",
      offlineCapable: false,
      programmable: true,
      interestBearing: false,
      notes: "Wholesale-only: MAS issues CBDC to financial institutions. Purpose Bound Money (PBM) is the key innovation — a programmable wrapper that restricts CBDC spending to specific purposes, merchants, or time windows without embedding programmability into the CBDC itself. This architectural separation (programmability in a wrapper, not in the base currency) is Singapore's key design contribution. Used for live interbank overnight lending and tokenized government bill settlement.",
    },
    riskProfile: {
      financial: 1,
      privacy: 1,
      cyber: 2,
      adoption: 1,
      geopolitical: 2,
      notes: "Wholesale-only design eliminates retail risk categories. Singapore's advanced financial infrastructure and strong regulatory oversight mean cyber risk is well-managed. Geopolitical risk is low-moderate: Singapore is actively building cross-border CBDC links (Ubin+, Project Nexus) which could draw it into geopolitical tensions between US/China CBDC spheres.",
    },
    designRationale: "MAS's strategy is to be the global hub for CBDC infrastructure experimentation, not to rush to retail issuance. The PBM concept is Singapore's exportable intellectual contribution. By running live wholesale pilots with banks and proving cross-border connectivity (Ubin+), Singapore positions itself as a testbed and standard-setter. The 'no urgent need for retail CBDC' position reflects that PayNow already provides excellent real-time retail payments.",
    interoperabilityDetails: "Most internationally active CBDC program. Project Ubin+: cross-border wholesale CBDC with BIS, multiple countries. Project Nexus: multi-country instant payment connectivity (India, Malaysia, Thailand, Philippines, Singapore). Project Cedar II with NY Fed for FX settlement. mBridge participant (observer). Bilateral experiments with Australia, France, Switzerland.",
    lastVerifiedAt: "2026-04-26",
    confidence: "High",
  },
  {
    id: "zaf",
    tag: "project-khokha",
    country: "South Africa",
    currencyName: "Project Khokha",
    stage: "Pilot",
    type: "Wholesale",
    techStack: "Quorum (Project Khokha)",
    technologyProvider: "ConsenSys / SARB",
    centralBank: "South African Reserve Bank (SARB)",
    announcementYear: 2018,
    updateRate: "Ad hoc",
    usesDLT: true,
    interoperable: true,
    region: "Africa",
    isoNumeric: "710",
    description: "South Africa's CBDC-related work remains focused on wholesale experimentation under Project Khokha. The SARB's published material continues to center on interbank settlement and broader payment-system experimentation rather than a live retail rollout.",
    whitepapers: [
      { title: "Project Khokha 2 Full Report (PDF)", url: "https://www.resbank.co.za/content/dam/sarb/publications/media-releases/2022/project-khokha-2/Project%20Khokha%202%20Full%20Report%206%20April%202022.pdf" },
      { title: "SARB position paper on the necessity of a retail CBDC in South Africa", url: "https://www.resbank.co.za/en/home/publications/publication-detail-pages/Fintech/sarb-position-paper-on-the-necessity-of-a-retail-cbdc-in-south-a" }
    ],
    flagUrl: "https://flagcdn.com/za.svg",
    coordinates: [22.9375, -30.5595],
    architecture: {
      tier: "1-tier",
      accountModel: "Token",
      privacyModel: "Identified",
      offlineCapable: false,
      programmable: true,
      interestBearing: false,
      notes: "Project Khokha used Quorum (Ethereum fork) for tokenized rand in wholesale interbank settlement. Khokha 2 added DvP (delivery-versus-payment) for tokenized securities. SARB explicitly concluded retail CBDC is not needed at this time given South Africa's existing retail payment infrastructure. Smart contracts used for automated settlement logic.",
    },
    riskProfile: {
      financial: 1,
      privacy: 2,
      cyber: 3,
      adoption: 1,
      geopolitical: 2,
      notes: "Wholesale design removes retail risks. Cyber risk elevated by smart contract surface. SARB's explicit retail CBDC rejection (position paper published 2022) is one of the most thorough policy analyses published by any central bank on this question. Geopolitical risk relates to South Africa's BRICS membership and potential pressure to join China/Russia CBDC corridors.",
    },
    designRationale: "SARB used an evidence-based approach: ran wholesale experiments to understand the technology, published a detailed retail CBDC position paper, and concluded the costs outweigh benefits for retail given existing infrastructure. Project Khokha 2's DvP capability is genuinely useful for South Africa's large securities market. SARB is now one of the most cited central banks for rigorous CBDC policy analysis.",
    interoperabilityDetails: "Participant in Project Dunbar (BIS multi-CBDC platform for cross-border payments with RBA, MAS, Bank Negara Malaysia). Exploring BRICS payment system discussions. No operational cross-border CBDC links.",
    lastVerifiedAt: "2026-04-26",
    confidence: "Medium",
  },
  {
    id: "ecs",
    tag: "dcash",
    country: "Eastern Caribbean",
    currencyName: "DCash",
    stage: "Research",
    type: "Retail",
    techStack: "Bitt Inc. (Hyperledger Fabric)",
    technologyProvider: "Bitt Inc.",
    centralBank: "Eastern Caribbean Central Bank (ECCB)",
    announcementYear: 2019,
    updateRate: "Ad hoc",
    usesDLT: true,
    interoperable: false,
    region: "Americas",
    description: "ECCB's DCash pilot was the world's first multi-country CBDC in a currency union, but the central bank said in January 2025 that the pilot had concluded in January 2024. Preliminary work is under way on a commercial-deployment model described as 'DCash 2.0', and the project is no longer operating as a live public CBDC service.",
    whitepapers: [
      { title: "D-Cash", url: "https://www.eccb-centralbank.org/d-cash" },
      { title: "ECCB warns of fraudulent stablecoin", url: "https://www.eccb-centralbank.org/news/eccb-warns-of-fraudulent-stablecoin" }
    ],
    flagUrl: "https://flagcdn.com/ag.svg",
    coordinates: [-62.1677, 17.1175],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Pseudonymous",
      offlineCapable: false,
      programmable: false,
      interestBearing: false,
      holdingLimit: "EC$50,000 per wallet",
      notes: "Shared Hyperledger Fabric ledger across 8 ECCU member states — the first multi-jurisdiction CBDC on a single DLT. A 2022 platform outage lasting two months severely damaged trust and adoption. Vendor (Bitt) and ECCB relationship reportedly strained. 'DCash 2.0' concept is under development but no technical details published.",
    },
    riskProfile: {
      financial: 2,
      privacy: 2,
      cyber: 4,
      adoption: 5,
      geopolitical: 1,
      notes: "The two-month 2022 outage is the highest-profile CBDC infrastructure failure to date. Cyber/operational risk exposed the danger of single-vendor dependency for critical payment infrastructure. Adoption risk is maximum — the program effectively failed during the pilot and has not resumed live operation. This is an important case study in CBDC operational resilience requirements.",
    },
    designRationale: "ECCB's ambition was to use a shared CBDC to strengthen the Eastern Caribbean Currency Union — reducing cash handling costs across small island economies and improving cross-island payments. The shared ledger model made sense for a currency union with a single central bank. The 2022 failure revealed that small economy CBDCs may lack the technical capacity to manage complex DLT infrastructure independently.",
    interoperabilityDetails: "Designed for intra-ECCU payments only (8 member states). No external CBDC interoperability.",
    lastVerifiedAt: "2026-04-26",
    confidence: "Medium",
  },
  {
    id: "rus",
    tag: "digital-ruble",
    country: "Russia",
    currencyName: "Digital Ruble",
    stage: "Pilot",
    type: "Retail",
    techStack: "Bank of Russia Platform",
    technologyProvider: "Bank of Russia",
    centralBank: "Bank of Russia",
    announcementYear: 2020,
    updateRate: "Monthly",
    usesDLT: false,
    interoperable: false,
    region: "Europe",
    isoNumeric: "643",
    description: "Russia's digital ruble remains in pilot use, but the Bank of Russia has set 1 September 2026 as the start of wider staged adoption for major banks and large merchants. Official 2026 updates also show the platform expanding to bulk payouts and cross-border CBDC settlement rules within the pilot.",
    whitepapers: [
      { title: "Digital ruble services expand", url: "https://cbr.ru/eng/press/event/?id=28340" },
      { title: "Large-scale introduction of digital ruble to begin on 1 September 2026", url: "https://www.cbr.ru/eng/press/event/?id=25774" },
      { title: "Digital ruble today and tomorrow: Bank of Russia's report on pilot testing", url: "https://www.cbr.ru/eng/press/event/?id=24743" }
    ],
    flagUrl: "https://flagcdn.com/ru.svg",
    coordinates: [105.3188, 61.524],
    architecture: {
      tier: "2-tier",
      accountModel: "Account",
      privacyModel: "Identified",
      offlineCapable: false,
      programmable: true,
      interestBearing: false,
      holdingLimit: "300,000 rubles per wallet",
      notes: "Centralized platform operated by Bank of Russia (no DLT). Account-based model using unique digital wallet addresses. Commercial banks provide user-facing interfaces. Programmability being used for government payments and social transfers. The geopolitical motivation is explicit: sanctions-circumvention via bilateral CBDC channels with China, Iran, and other sanctioned or friendly states.",
    },
    riskProfile: {
      financial: 2,
      privacy: 5,
      cyber: 3,
      adoption: 3,
      geopolitical: 5,
      notes: "Privacy risk is extreme — Bank of Russia has full transaction visibility with no privacy-preserving architecture. The system is explicitly designed to allow state monitoring of financial activity, which is a stated goal rather than a bug. Geopolitical risk is maximum: the digital ruble's primary strategic purpose is sanctions circumvention and de-dollarization. Western financial institutions and researchers should treat any interoperability proposals with extreme caution.",
    },
    designRationale: "Russia's CBDC program accelerated dramatically after SWIFT sanctions in 2022. Design priorities: (1) create a payment rail immune to Western sanctions, (2) enable bilateral settlement with China, Iran, and BRICS partners without USD intermediation, (3) improve state visibility of financial flows for tax enforcement and anti-corruption. The programmability focus on government payments reflects priority on control rather than consumer benefit.",
    interoperabilityDetails: "Actively pursuing bilateral CBDC corridors with China (mBridge), Iran, and other BRICS members specifically to bypass SWIFT. Russia-China cross-border CBDC pilot reported in 2024. This is the highest geopolitical-risk interoperability program globally.",
    pilotMetrics: {
      asOf: "2025-12-31",
    },
    lastVerifiedAt: "2026-04-26",
    confidence: "Medium",
  },
  {
    id: "gha",
    tag: "ecedi",
    country: "Ghana",
    currencyName: "eCedi",
    stage: "Proof of Concept",
    type: "Retail",
    techStack: "G+D Filia",
    technologyProvider: "G+D (Giesecke+Devrient)",
    centralBank: "Bank of Ghana",
    announcementYear: 2021,
    updateRate: "Ad hoc",
    usesDLT: false,
    interoperable: false,
    region: "Africa",
    isoNumeric: "288",
    description: "Ghana continues to treat the eCedi as a proof-of-concept focused on inclusion, offline payments, and future interoperability. In April 2026 the Bank of Ghana republished its design paper and eCedi report on its current site, signaling that the project remains active as an exploratory program rather than a launched currency.",
    whitepapers: [
      { title: "Design Paper of the Digital Cedi (eCedi)", url: "https://www.bog.gov.gh/news/design-paper-of-the-digital-cedi-ecedi/" },
      { title: "The eCedi Report", url: "https://www.bog.gov.gh/news/the-ecedi-report/" },
      { title: "Bank of Ghana — eCedi Hackathon", url: "https://www.bog.gov.gh/ecedihackathon/" }
    ],
    flagUrl: "https://flagcdn.com/gh.svg",
    coordinates: [-1.0232, 7.9465],
    architecture: {
      tier: "2-tier",
      accountModel: "Token",
      privacyModel: "Pseudonymous",
      offlineCapable: true,
      programmable: false,
      interestBearing: false,
      notes: "G+D Filia platform — a hardware-based CBDC solution using secure chips embedded in cards or phones. Offline-first design is the core innovation: the physical security element allows value transfer without internet connectivity, which is critical for Ghana's rural areas. Not DLT-based — value is stored on the hardware device itself. G+D Filia is also used for Ghana's eCedi and has been evaluated by several other African central banks.",
    },
    riskProfile: {
      financial: 2,
      privacy: 2,
      cyber: 3,
      adoption: 3,
      geopolitical: 1,
      notes: "Hardware-based offline design introduces device theft and loss risk — unlike account-based systems, lost devices could mean lost funds. Cyber risk is focused on the secure element supply chain rather than network attacks. Ghana's mobile money ecosystem (MTN Mobile Money is dominant) means eCedi must compete with an established and trusted service. Adoption risk is moderate if offline capability is genuinely superior to mobile money in rural areas.",
    },
    designRationale: "Bank of Ghana's primary target is the 40%+ of Ghanaians without smartphones or reliable internet. The G+D Filia hardware approach — storing value on a chip — is a fundamentally different architecture from app-based CBDCs. Offline capability is the design differentiator. The hackathon program is building a developer ecosystem around the platform. Ghana's eCedi is closely watched by other African central banks considering a similar offline-first approach.",
    interoperabilityDetails: "No operational cross-border CBDC interoperability. Some interest in West African monetary integration context (ECOWAS). G+D Filia platform used by multiple countries provides potential for future interoperability.",
    lastVerifiedAt: "2026-04-26",
    confidence: "Medium",
  },
];

// ISO numeric codes for EU member states (for choropleth fill)
export const EU_MEMBER_ISO_NUMERICS = [
  "040", // Austria
  "056", // Belgium
  "100", // Bulgaria
  "191", // Croatia
  "196", // Cyprus
  "203", // Czech Republic
  "208", // Denmark
  "233", // Estonia
  "246", // Finland
  "250", // France
  "276", // Germany
  "300", // Greece
  "348", // Hungary
  "372", // Ireland
  "380", // Italy
  "428", // Latvia
  "440", // Lithuania
  "442", // Luxembourg
  "470", // Malta
  "528", // Netherlands
  "616", // Poland
  "620", // Portugal
  "642", // Romania
  "703", // Slovakia
  "705", // Slovenia
  "724", // Spain
  "752", // Sweden (also has own entry)
];
