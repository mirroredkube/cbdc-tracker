export type Stage = "Research" | "Pilot" | "Launched" | "Cancelled";
export type Type = "Retail" | "Wholesale" | "Both";

export interface CBDCProject {
  id: string;
  country: string;
  stage: Stage;
  type: Type;
  techStack: string;
  whitepapers: { title: string; url: string }[];
  description: string;
  flagUrl?: string;
  statusColor?: string;
}

export const cbdcProjects: CBDCProject[] = [
  {
    id: "chn",
    country: "China",
    stage: "Launched",
    type: "Retail",
    techStack: "Centralized (PBOC Architecture)",
    description: "The digital yuan (e-CNY) is the first digital currency issued by a major economy. It is designed to modernize the central bank's infrastructure and establish a seamless medium of exchange across retail sectors.",
    whitepapers: [
      { title: "Progress of Research and Development of E-CNY in China", url: "https://www.pbc.gov.cn/en/3688110/3688172/4157443/4293696/2021071614584691871.pdf" }
    ],
    flagUrl: "https://flagcdn.com/cn.svg"
  },
  {
    id: "bhs",
    country: "Bahamas",
    stage: "Launched",
    type: "Retail",
    techStack: "NZIA (Private Blockchain)",
    description: "The Sand Dollar was the world's first nationwide CBDC, originating to provide financial inclusion for residents residing across the archipelago and unbanked islands.",
    whitepapers: [
      { title: "Project Sand Dollar Whitepaper", url: "https://www.sanddollar.bs/whitepaper" }
    ],
    flagUrl: "https://flagcdn.com/bs.svg"
  },
  {
    id: "eu",
    country: "European Union",
    stage: "Research",
    type: "Both",
    techStack: "TBD / Evaluation Phase",
    description: "The digital euro project explores issuing a digital currency across the Eurozone to secure Europe's strategic autonomy and standardize the fragmented digital payment systems.",
    whitepapers: [
      { title: "Report on a digital euro", url: "https://www.ecb.europa.eu/paym/digital_euro/html/index.en.html" },
      { title: "Digital euro prototype summary", url: "https://www.ecb.europa.eu/paym/digital_euro/investigation/prof/shared/pdf/ecb.degov221220_prototype_summary.en.pdf" }
    ],
    flagUrl: "https://flagcdn.com/eu.svg"
  },
  {
    id: "bra",
    country: "Brazil",
    stage: "Pilot",
    type: "Both",
    techStack: "Hyperledger Besu (Drex)",
    description: "Drex is the planned digital real. A wholesale token running on a permissioned DLT enabling programmable, tokenized deposits for both commercial banks and the retail end user.",
    whitepapers: [
      { title: "Drex Pilot Implementation Guidelines", url: "https://www.bcb.gov.br/en/financialstability/drex" }
    ],
    flagUrl: "https://flagcdn.com/br.svg"
  },
  {
    id: "nga",
    country: "Nigeria",
    stage: "Launched",
    type: "Retail",
    techStack: "Hyperledger Fabric",
    description: "The eNaira was launched in response to complex financial structures to foster financial inclusion, cross-border trade resilience, and improved macroeconomic policies.",
    whitepapers: [
      { title: "Design Paper for the eNaira", url: "https://enaira.gov.ng/about/design" }
    ],
    flagUrl: "https://flagcdn.com/ng.svg"
  },
  {
    id: "usa",
    country: "USA",
    stage: "Research",
    type: "Wholesale",
    techStack: "Federal Reserve RLN/NYIC",
    description: "Ongoing exploration involving Project Cedar (wholesale cross-border settlement experiments). Despite substantial research, there is no mandate to integrate retail use cases securely without specific legislative approval.",
    whitepapers: [
      { title: "Money and Payments: The U.S. Dollar in the Age of Digital Transformation", url: "https://www.federalreserve.gov/publications/money-and-payments-discussion-paper.htm" },
      { title: "Project Cedar Phase II Report", url: "https://www.newyorkfed.org/aboutthefed/nyic/project-cedar" }
    ],
    flagUrl: "https://flagcdn.com/us.svg"
  },
  {
    id: "ind",
    country: "India",
    stage: "Pilot",
    type: "Both",
    techStack: "Distributed Ledger Technology (RBI)",
    description: "The Digital Rupee (e₹) is currently in a phased pilot for both wholesale (e₹-W) and retail (e₹-R) segments, aimed at reducing operational costs in cash management and enabling programmable payments.",
    whitepapers: [
      { title: "Concept Note on Central Bank Digital Currency", url: "https://rbi.org.in/Scripts/PublicationReportDetails.aspx?UrlPage=&ID=1218" }
    ],
    flagUrl: "https://flagcdn.com/in.svg"
  },
  {
    id: "swe",
    country: "Sweden",
    stage: "Pilot",
    type: "Retail",
    techStack: "R3 Corda",
    description: "The e-krona project explores the possibility of issuing a digital complement to cash, ensuring public access to a state-guaranteed means of payment in a highly digitized economy.",
    whitepapers: [
      { title: "E-krona project reports", url: "https://www.riksbank.se/en-gb/payments--cash/e-krona/e-krona-reports/" }
    ],
    flagUrl: "https://flagcdn.com/se.svg"
  },
  {
    id: "jpn",
    country: "Japan",
    stage: "Pilot",
    type: "Both",
    techStack: "TBD / BOJ Ledgers",
    description: "The Bank of Japan is conducting proof-of-concept trials. The digital yen aims to ensure stability and efficiency in the entire payment and settlement systems alongside private digital money.",
    whitepapers: [
      { title: "The Bank of Japan's Approach to Central Bank Digital Currency", url: "https://www.boj.or.jp/en/paym/digital/index.htm" }
    ],
    flagUrl: "https://flagcdn.com/jp.svg"
  },
  {
    id: "gbr",
    country: "United Kingdom",
    stage: "Research",
    type: "Retail",
    techStack: "TBD / Evaluative",
    description: "The digital pound (often dubbed 'Britcoin') is being explored by the Bank of England to maintain trust in sovereign money and provide a foundational digital payment infrastructure.",
    whitepapers: [
      { title: "The digital pound: a new form of money for households and businesses?", url: "https://www.bankofengland.co.uk/paper/2023/the-digital-pound-consultation-paper" }
    ],
    flagUrl: "https://flagcdn.com/gb.svg"
  },
  {
    id: "aus",
    country: "Australia",
    stage: "Research",
    type: "Both",
    techStack: "Ethereum-based Quorum (Project Atom)",
    description: "The RBA and the DFCRC are researching use cases for an eAUD, focusing on tokenized assets, programmable payments, and wholesale settlement efficiencies.",
    whitepapers: [
      { title: "Australian CBDC Pilot for Digital Finance Innovation", url: "https://www.rba.gov.au/payments-and-infrastructure/central-bank-digital-currency/" }
    ],
    flagUrl: "https://flagcdn.com/au.svg"
  },
  {
    id: "jam",
    country: "Jamaica",
    stage: "Launched",
    type: "Retail",
    techStack: "eCurrency Mint",
    description: "JAM-DEX (Jamaica Digital Exchange) was officially launched to provide a safe, convenient, and secure digital alternative to cash, particularly designed to serve the unbanked population.",
    whitepapers: [
      { title: "Bank of Jamaica CBDC Implementation and Integration", url: "https://boj.org.jm/core-functions/currency/cbdc/" }
    ],
    flagUrl: "https://flagcdn.com/jm.svg"
  },
  {
    id: "sgp",
    country: "Singapore",
    stage: "Pilot",
    type: "Wholesale",
    techStack: "Project Orchid / Ubin",
    description: "The Monetary Authority of Singapore pioneers wholesale networks and purpose-bound money (PBM) to streamline cross-border payments and programmable asset tokenization.",
    whitepapers: [
      { title: "Project Orchid: Purpose Bound Money", url: "https://www.mas.gov.sg/publications/monographs-or-information-paper/2022/project-orchid" },
      { title: "Project Ubin: Decentralised Inter-bank Payment and Settlement", url: "https://www.mas.gov.sg/schemes-and-initiatives/project-ubin" }
    ],
    flagUrl: "https://flagcdn.com/sg.svg"
  },
  {
    id: "zaf",
    country: "South Africa",
    stage: "Pilot",
    type: "Wholesale",
    techStack: "Quorum (Project Khokha)",
    description: "Project Khokha tests distributed ledger technologies for interbank payment settlement, exploring the integration of a wholesale CBDC with tokenized domestic securities.",
    whitepapers: [
      { title: "Project Khokha 2 Report", url: "https://www.resbank.co.za/en/home/what-we-do/payments-and-settlements/project-khokha-2" }
    ],
    flagUrl: "https://flagcdn.com/za.svg"
  }
];
