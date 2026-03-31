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

export const DB_LAST_UPDATED = "2026-03-31";

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
    description: "The digital yuan (e-CNY) is the world's most advanced CBDC by scale, with over 3.48 billion transactions worth 16.7 trillion yuan (~$2.37T) and 180 million wallets. Expanded to 17 provinces and now used cross-border in Hong Kong, Macau, Laos, Thailand, and Singapore. From January 2026, e-CNY transitions to an interest-bearing instrument.",
    whitepapers: [{ title: "Progress of Research and Development of E-CNY in China", url: "https://www.pbc.gov.cn/en/3688110/3688172/4157443/4293696/2021071614584691871.pdf" }],
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
    whitepapers: [{ title: "Project Sand Dollar Whitepaper", url: "https://www.sanddollar.bs/whitepaper" }],
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
    description: "The ECB completed its preparation phase in October 2025, finalizing the rulebook and contracting vendors. The Eurosystem is now inviting payment service providers to join a pilot targeted for mid-2027, with full issuance readiness expected in 2029.",
    whitepapers: [
      { title: "Report on a digital euro", url: "https://www.ecb.europa.eu/paym/digital_euro/html/index.en.html" },
      { title: "Digital euro prototype summary", url: "https://www.ecb.europa.eu/paym/digital_euro/investigation/prof/shared/pdf/ecb.degov221220_prototype_summary.en.pdf" }
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
    description: "Drex is Brazil's digital real, a wholesale token on a permissioned DLT enabling programmable, tokenized deposits. Phase 1 report was published in February 2025 and Phase 3 focuses on tokenization and credit. A phased public launch is expected in the first half of 2026.",
    whitepapers: [{ title: "Drex Pilot Implementation Guidelines", url: "https://www.bcb.gov.br/en/financialstability/drex" }],
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
    whitepapers: [{ title: "Design Paper for the eNaira", url: "https://enaira.gov.ng/about/design" }],
    flagUrl: "https://flagcdn.com/ng.svg",
    coordinates: [8.6753, 9.082]
  },
  {
    id: "usa",
    tag: "us-cbdc",
    country: "USA",
    currencyName: "US CBDC (Cancelled)",
    stage: "Cancelled",
    type: "Wholesale",
    techStack: "Federal Reserve RLN/NYIC",
    technologyProvider: "Federal Reserve / NYIC",
    centralBank: "Federal Reserve",
    announcementYear: 2022,
    updateRate: "Ad hoc",
    usesDLT: true,
    interoperable: false,
    region: "Americas",
    isoNumeric: "840",
    description: "On January 23, 2025, President Trump signed an executive order prohibiting any federal agency from promoting, establishing, or issuing a CBDC, formally terminating all retail and wholesale CBDC development. FedNow (an instant payment rail, not a CBDC) remains operational. The US is the only country to cancel CBDC development by executive order.",
    whitepapers: [
      { title: "Money and Payments: The U.S. Dollar in the Age of Digital Transformation", url: "https://www.federalreserve.gov/publications/money-and-payments-discussion-paper.htm" },
      { title: "Project Cedar Phase II Report", url: "https://www.newyorkfed.org/aboutthefed/nyic/project-cedar" }
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
    description: "The Digital Rupee (e₹) is the second-largest CBDC pilot globally. Circulation reached ₹10.16 billion ($122M) by March 2025, up 334% year-over-year. Both the retail (e₹-R) and wholesale (e₹-W) segments are expanding with offline functionality and broader bank participation.",
    whitepapers: [{ title: "Concept Note on Central Bank Digital Currency", url: "https://rbi.org.in/Scripts/PublicationReportDetails.aspx?UrlPage=&ID=1218" }],
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
    description: "The Bank of Japan has been running a proof-of-concept since April 2023 with 64 private companies across 7 working groups; a progress report was released in May 2025. The BoJ has explicitly stated it has no plans to launch a CBDC, citing Japan's continued high cash usage, but experimental work continues.",
    whitepapers: [{ title: "The Bank of Japan's Approach to Central Bank Digital Currency", url: "https://www.boj.or.jp/en/paym/digital/index.htm" }],
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
    description: "The Bank of England's Digital Pound Lab launched Phase 1 in August 2025 and Phase 2 in November 2025, testing use cases with private sector participants. The BoE and HM Treasury will jointly assess next steps in 2026, with earliest potential issuance in the second half of this decade.",
    whitepapers: [{ title: "The digital pound: a new form of money for households and businesses?", url: "https://www.bankofengland.co.uk/paper/2023/the-digital-pound-consultation-paper" }],
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
      { title: "Project Ubin: Decentralised Inter-bank Payment and Settlement", url: "https://www.mas.gov.sg/schemes-and-initiatives/project-ubin" }
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
    description: "Project Khokha 2x tests distributed ledger technologies for interbank payment settlement and explores wholesale CBDC combined with bank-issued stablecoins for regional African payments. A November 2025 SARB position paper expressed skepticism about the need for a retail CBDC.",
    whitepapers: [{ title: "Project Khokha 2 Report", url: "https://www.resbank.co.za/en/home/what-we-do/payments-and-settlements/project-khokha-2" }],
    flagUrl: "https://flagcdn.com/za.svg",
    coordinates: [22.9375, -30.5595]
  },
  {
    id: "ecs",
    tag: "dcash",
    country: "Eastern Caribbean",
    currencyName: "DCash",
    stage: "Launched",
    type: "Retail",
    techStack: "Bitt Inc. (Hyperledger Fabric)",
    technologyProvider: "Bitt Inc.",
    centralBank: "Eastern Caribbean Central Bank (ECCB)",
    announcementYear: 2019,
    updateRate: "Quarterly",
    usesDLT: true,
    interoperable: false,
    region: "Americas",
    description: "DCash is a multi-country retail CBDC covering 8 Eastern Caribbean Currency Union member states, launched in 2021. It is the world's first multi-country CBDC, enabling seamless cross-island digital payments across Antigua & Barbuda, Dominica, Grenada, Saint Kitts & Nevis, and others.",
    whitepapers: [{ title: "ECCB DCash Overview", url: "https://www.eccb-centralbank.org/p/about-dcash" }],
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
    description: "The Digital Ruble pilot launched in August 2023 with 13 banks and has expanded since. Russia is accelerating adoption partly to facilitate sanctions-resistant cross-border transactions. A broader rollout to more banks and citizens is planned through 2025–2026.",
    whitepapers: [{ title: "Digital Ruble Concept", url: "https://cbr.ru/eng/fintech/dr/" }],
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
    description: "The eCedi is Ghana's retail CBDC proof-of-concept, designed to extend financial services to the unbanked and underbanked populations. Ghana was one of the first African nations to launch a CBDC pilot, focusing on offline functionality for rural areas with limited connectivity.",
    whitepapers: [{ title: "Bank of Ghana eCedi Sandbox", url: "https://www.bog.gov.gh/financial-stability/fintech-and-innovation/e-cedi/" }],
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
