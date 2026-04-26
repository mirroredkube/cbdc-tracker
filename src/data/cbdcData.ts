export type Stage = "Research" | "Proof of Concept" | "Pilot" | "Launched" | "Cancelled";
export type Type = "Retail" | "Wholesale" | "Both";

export interface CBDCProject {
  id: string;
  tag: string;                     // URL-safe slug, e.g. "e-cny"
  country: string;
  currencyName: string;            // e.g. "e-CNY"
  stage: Stage;
  type: Type;
  techStack: string;
  technologyProvider?: string;     // e.g. "G+D Filia"
  centralBank: string;
  announcementYear: number;
  updateRate: string;              // "Monthly" | "Quarterly" | "Ad hoc"
  usesDLT: boolean;
  interoperable: boolean;
  region: string;                  // "Asia" | "Europe" | "Americas" | "Africa" | "Oceania" | "Multi-region"
  isoNumeric?: string;             // ISO 3166-1 numeric, used for choropleth map fill
  euMemberFill?: boolean;          // true for EU: color all EU member polygons
  whitepapers: { title: string; url: string }[];
  description: string;
  flagUrl?: string;
  statusColor?: string;
  coordinates: [number, number];   // [longitude, latitude]
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
    coordinates: [104.1954, 35.8617]
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
    whitepapers: [{ title: "Project Sand Dollar: A Bahamian Payments System Modernization Initiative", url: "https://www.centralbankbahamas.com/viewPDF/documents/2019-12-25-02-18-11-Project-Sanddollar.pdf" }],
    flagUrl: "https://flagcdn.com/bs.svg",
    coordinates: [-78.0359, 25.0343]
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
    coordinates: [10.4515, 51.1657]
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
    coordinates: [-51.9253, -14.235]
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
    whitepapers: [{ title: "Design Paper for the eNaira", url: "https://www.cbn.gov.ng/Out/2024/RSD/Adoption%20of%20the%20eNaira%20Issues%20and%20the%20way%20forward.pdf" }],
    flagUrl: "https://flagcdn.com/ng.svg",
    coordinates: [8.6753, 9.082]
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
    coordinates: [-95.7129, 37.0902]
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
    coordinates: [78.9629, 20.5937]
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
    whitepapers: [{ title: "E-krona project reports", url: "https://www.riksbank.se/en-gb/payments--cash/e-krona/e-krona-reports/" }],
    flagUrl: "https://flagcdn.com/se.svg",
    coordinates: [18.6435, 60.1282]
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
    coordinates: [138.2529, 36.2048]
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
    coordinates: [-3.4359, 55.3781]
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
    whitepapers: [{ title: "Australian CBDC Pilot for Digital Finance Innovation", url: "https://www.rba.gov.au/payments-and-infrastructure/central-bank-digital-currency/" }],
    flagUrl: "https://flagcdn.com/au.svg",
    coordinates: [133.7751, -25.2744]
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
    whitepapers: [{ title: "Bank of Jamaica CBDC Implementation and Integration", url: "https://boj.org.jm/core-functions/currency/cbdc/" }],
    flagUrl: "https://flagcdn.com/jm.svg",
    coordinates: [-77.2975, 18.1096]
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
    coordinates: [103.8198, 1.3521]
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
    coordinates: [22.9375, -30.5595]
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
    coordinates: [-62.1677, 17.1175]
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
    coordinates: [105.3188, 61.524]
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
    coordinates: [-1.0232, 7.9465]
  }
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
