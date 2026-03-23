import type { Operator, Publication, NewsArticle, Speech } from "@/types";

export const mockOperators: Operator[] = [
  {
    id: "btc-001",
    operatorName: "Botswana Telecommunications Corporation Limited",
    shortName: "BTC",
    licenceNumber: "BOC-2013-NFP-001",
    category: "NFP",
    categoryFull: "Network Facilities Provider",
    subCategory: "NFP-N (National)",
    status: "Active",
    issuedAt: "2013-04-01",
    expiresAt: "2026-03-31",
    complianceStatus: "Compliant",
    services: ["Fixed Line Telephony", "Mobile (beMOBILE)", "Broadband Internet"],
    address: "BTC House, Plot 50671, Independence Avenue, Gaborone",
    website: "www.btc.bw",
  },
  {
    id: "mascom-001",
    operatorName: "Mascom Wireless Botswana (Pty) Ltd",
    shortName: "Mascom",
    licenceNumber: "BOC-2013-NFP-002",
    category: "NFP",
    categoryFull: "Network Facilities Provider",
    subCategory: "NFP-N (National)",
    status: "Active",
    issuedAt: "2013-04-01",
    expiresAt: "2026-03-31",
    complianceStatus: "Compliant",
    services: ["Mobile Voice", "Mobile Data", "4G LTE", "USSD Services"],
    address: "Plot 50374, Fairground Office Park, Gaborone",
    website: "www.mascom.bw",
  },
  {
    id: "orange-001",
    operatorName: "Orange Botswana (Pty) Ltd",
    shortName: "Orange",
    licenceNumber: "BOC-2013-NFP-003",
    category: "NFP",
    categoryFull: "Network Facilities Provider",
    subCategory: "NFP-N (National)",
    status: "Active",
    issuedAt: "2013-04-01",
    expiresAt: "2026-03-31",
    complianceStatus: "Compliant",
    services: ["Mobile Voice", "Mobile Data", "4G LTE", "Fibre"],
    address: "Orange House, Plot 50672, Independence Avenue, Gaborone",
    website: "www.orange.co.bw",
  },
  {
    id: "bofinet-001",
    operatorName: "Botswana Fibre Networks (Pty) Ltd",
    shortName: "BoFiNet",
    licenceNumber: "BOC-2013-NFP-004",
    category: "NFP",
    categoryFull: "Network Facilities Provider",
    subCategory: "NFP-N (National) — Wholesale",
    status: "Active",
    issuedAt: "2013-09-01",
    expiresAt: "2026-08-31",
    complianceStatus: "Compliant",
    services: ["Wholesale Fibre", "International Bandwidth", "National Backbone"],
    address: "Plot 54675, CBD, Gaborone",
    website: "www.bofinet.co.bw",
  },
  {
    id: "bwpost-001",
    operatorName: "Botswana Postal Services",
    shortName: "Botswana Post",
    licenceNumber: "BOC-2013-POST-001",
    category: "Postal",
    categoryFull: "Postal Service Licence",
    subCategory: "National Postal Operator",
    status: "Active",
    issuedAt: "2013-04-01",
    expiresAt: "2026-03-31",
    complianceStatus: "Compliant",
    services: ["Letter Mail", "Parcels", "Express Mail Service", "Financial Services"],
    address: "Khama Crescent, Gaborone",
    website: "www.botspost.co.bw",
  },
  {
    id: "yarona-001",
    operatorName: "Yarona FM",
    shortName: "Yarona FM",
    licenceNumber: "BOC-2015-BRD-001",
    category: "Broadcasting",
    categoryFull: "Broadcasting Licence",
    subCategory: "Commercial Radio — National",
    status: "Active",
    issuedAt: "2015-01-01",
    expiresAt: "2027-12-31",
    complianceStatus: "Compliant",
    services: ["FM Radio Broadcasting", "Online Streaming"],
    address: "Plot 16, Fairground, Gaborone",
    website: "www.yaronafm.co.bw",
  },
  {
    id: "duma-001",
    operatorName: "Duma FM",
    shortName: "Duma FM",
    licenceNumber: "BOC-2015-BRD-002",
    category: "Broadcasting",
    categoryFull: "Broadcasting Licence",
    subCategory: "Commercial Radio — National",
    status: "Active",
    issuedAt: "2015-01-01",
    expiresAt: "2027-12-31",
    complianceStatus: "Under Review",
    services: ["FM Radio Broadcasting"],
    address: "Gaborone, Botswana",
    website: "www.dumafm.co.bw",
  },
  {
    id: "ebotswana-001",
    operatorName: "eBotswana TV",
    shortName: "eBotswana",
    licenceNumber: "BOC-2015-BRD-003",
    category: "Broadcasting",
    categoryFull: "Broadcasting Licence",
    subCategory: "Commercial Television — National",
    status: "Active",
    issuedAt: "2015-06-01",
    expiresAt: "2027-05-31",
    complianceStatus: "Compliant",
    services: ["Free-to-Air Television", "Online Streaming"],
    address: "Plot 54675, Gaborone",
    website: "www.ebotswana.co.bw",
  },
];

export const mockPublications: Publication[] = [
  {
    id: "pub-001",
    title: "BOCRA Annual Report 2024",
    type: "annual_report",
    fileUrl: "/publications/bocra-annual-report-2024.pdf",
    publishedAt: "2025-03-01",
    description: "BOCRA's comprehensive annual report covering regulatory activities and financial performance for 2024.",
  },
  {
    id: "pub-002",
    title: "QoS Monitoring Report — Q4 2025",
    type: "qos_report",
    fileUrl: "/publications/qos-q4-2025.pdf",
    publishedAt: "2026-01-15",
    description: "Quality of Service monitoring results for mobile and fixed broadband operators, Q4 2025.",
  },
  {
    id: "pub-003",
    title: "Communications Regulatory Authority Act, 2012",
    type: "legislation",
    fileUrl: "/publications/cra-act-2012.pdf",
    publishedAt: "2013-04-01",
    description: "The primary legislation governing BOCRA's mandate and regulatory powers.",
  },
  {
    id: "pub-004",
    title: "Botswana Data Protection Act, 2024",
    type: "legislation",
    fileUrl: "/publications/bdpa-2024.pdf",
    publishedAt: "2024-10-29",
    description: "Data protection legislation replacing the 2018 Act. In effect from 29 October 2024.",
  },
  {
    id: "pub-005",
    title: "Draft National Spectrum Policy 2026 — Public Consultation",
    type: "consultation",
    fileUrl: "/publications/draft-spectrum-policy-2026.pdf",
    publishedAt: "2026-03-01",
    description: "BOCRA invites public comment on the revised National Frequency Allocation Plan.",
  },
  {
    id: "pub-006",
    title: "ICT Licensing Framework — Converged Framework 2015",
    type: "legislation",
    fileUrl: "/publications/ict-licensing-framework-2015.pdf",
    publishedAt: "2015-09-01",
    description: "The converged NFP/SAP licensing framework implemented September 2015.",
  },
  {
    id: "pub-007",
    title: "BOCRA Strategic Plan 2024–2029",
    type: "annual_report",
    fileUrl: "/publications/strategic-plan-2024-2029.pdf",
    publishedAt: "2024-06-01",
    description: "BOCRA's five-year strategic plan focused on digital transformation.",
  },
  {
    id: "pub-008",
    title: "QoS Guidelines for Mobile Broadband Services",
    type: "qos_report",
    fileUrl: "/publications/qos-guidelines-mobile-broadband.pdf",
    publishedAt: "2026-03-10",
    description: "Updated Quality of Service guidelines for mobile broadband. Operators must comply by 1 June 2026.",
  },
  {
    id: "pub-009",
    title: "Tender: BOCRA Website Redevelopment",
    type: "tender",
    fileUrl: "/publications/tender-website-redevelopment-2026.pdf",
    publishedAt: "2026-03-05",
    description: "Design, development, deployment and maintenance of the BOCRA website.",
  },
  {
    id: "pub-010",
    title: "Consumer Protection Guidelines 2023",
    type: "notice",
    fileUrl: "/publications/consumer-protection-guidelines-2023.pdf",
    publishedAt: "2023-07-01",
    description: "Guidelines for consumer protection in the communications sector.",
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: "news-001",
    title: "BOCRA Publishes Draft National Spectrum Policy 2026 for Public Consultation",
    category: "consultation",
    excerpt:
      "The Botswana Communications Regulatory Authority invites all stakeholders and members of the public to submit written comments on the Draft National Frequency Allocation Plan. The consultation period closes on 30 April 2026.",
    publishedAt: "2026-03-15",
    slug: "draft-spectrum-policy-2026-consultation",
  },
  {
    id: "news-002",
    title: "Quality of Service Monitoring Results for Q4 2025 Released",
    category: "press_release",
    excerpt:
      "BOCRA has released the QoS monitoring results for mobile and fixed broadband operators for Q4 2025. Key metrics include network availability, call drop rates, and average data speeds across all licensed operators.",
    publishedAt: "2026-03-10",
    slug: "qos-q4-2025-results",
  },
  {
    id: "news-003",
    title: "Tender: Procurement of Automated Spectrum Management System Upgrade",
    category: "tender",
    excerpt:
      "BOCRA invites qualified bidders to submit proposals for the upgrade of the Automated Spectrum Management System (ASMS) at Spectrum House, Gaborone. Closing date: 18 April 2026.",
    publishedAt: "2026-03-08",
    slug: "tender-asms-upgrade-2026",
  },
  {
    id: "news-004",
    title: "BOCRA Warns Against Unlicensed Broadcasting Operations",
    category: "public_notice",
    excerpt:
      "BOCRA reminds the public that operating a broadcasting station without a valid licence is an offence under the Communications Regulatory Authority Act, 2012. Enforcement action will be taken against offenders.",
    publishedAt: "2026-03-01",
    slug: "warning-unlicensed-broadcasting",
  },
  {
    id: "news-005",
    title: "Stakeholder Workshop on .bw Domain Name Policy Review",
    category: "event",
    excerpt:
      "BOCRA will host a stakeholder workshop on 25 March 2026 at Gaborone International Convention Centre to discuss proposed amendments to the .bw ccTLD domain name policy framework.",
    publishedAt: "2026-02-20",
    slug: "bw-domain-policy-workshop",
  },
  {
    id: "news-006",
    title: "BOCRA and BERA Sign MoU on Cybersecurity Cooperation",
    category: "announcement",
    excerpt:
      "BOCRA and the Botswana Energy Regulatory Authority (BERA) have signed a Memorandum of Understanding to collaborate on cybersecurity standards for critical infrastructure in the energy and communications sectors.",
    publishedAt: "2026-02-14",
    slug: "bocra-bera-cybersecurity-mou",
  },
  {
    id: "news-007",
    title: "Public Notice: SIM Card Re-registration Deadline Extended to 30 June 2026",
    category: "public_notice",
    excerpt:
      "BOCRA has extended the deadline for SIM card re-registration to 30 June 2026. All subscribers who have not re-registered their SIM cards are urged to do so at their nearest operator outlet.",
    publishedAt: "2026-02-01",
    slug: "sim-reregistration-deadline-extension",
  },
  {
    id: "news-008",
    title: "BOCRA Annual Report 2024 Now Available for Download",
    category: "announcement",
    excerpt:
      "The BOCRA Annual Report 2024 is now available for download. The report covers regulatory activities, market developments, financial performance, and the strategic outlook for the communications sector.",
    publishedAt: "2026-01-20",
    slug: "annual-report-2024-available",
  },
  {
    id: "news-009",
    title: "Consultation on Proposed Mobile Termination Rate Reduction",
    category: "consultation",
    excerpt:
      "BOCRA is seeking public input on a proposed reduction to mobile termination rates (MTR) effective 1 July 2026. The proposed rates aim to lower the cost of interconnection and benefit consumers.",
    publishedAt: "2026-01-10",
    slug: "mtr-reduction-consultation",
  },
];

export const mockSpeeches: Speech[] = [
  {
    id: "speech-001",
    title: "Keynote Address: Digital Transformation and the Future of Regulation in Botswana",
    speaker: "Martin Mokgware",
    speakerRole: "Chief Executive, BOCRA",
    event: "Botswana Digital Transformation Conference 2026",
    venue: "Gaborone International Convention Centre",
    date: "2026-03-12",
    excerpt:
      "The digital economy requires regulators to be agile and forward-thinking. BOCRA is committed to creating an enabling environment for innovation while ensuring consumer protection and fair competition in the converged communications landscape.",
    slug: "digital-transformation-future-regulation",
  },
  {
    id: "speech-002",
    title: "Opening Remarks at the SADC ICT Ministers Forum",
    speaker: "Martin Mokgware",
    speakerRole: "Chief Executive, BOCRA",
    event: "SADC ICT Ministers Forum",
    venue: "Kasane, Botswana",
    date: "2026-02-18",
    excerpt:
      "Regional harmonisation of ICT policies is essential for cross-border digital trade. Botswana's converged licensing framework and spectrum management practices offer a model for SADC member states seeking to modernise their regulatory environments.",
    slug: "sadc-ict-ministers-opening-remarks",
  },
  {
    id: "speech-003",
    title: "Spectrum Management in the 5G Era: Challenges and Opportunities",
    speaker: "Dr. Thari G. Pheko",
    speakerRole: "Director of Spectrum Management, BOCRA",
    event: "ITU Regional Radiocommunication Seminar (RRS-26)",
    venue: "Virtual",
    date: "2026-01-25",
    excerpt:
      "As we prepare for 5G deployment, the allocation of mid-band spectrum in the 3.3-3.8 GHz range is a national priority. BOCRA's National Frequency Allocation Plan will be revised to accommodate new technologies while protecting existing services.",
    slug: "spectrum-management-5g-era",
  },
  {
    id: "speech-004",
    title: "Consumer Protection in a Digital Age",
    speaker: "Martin Mokgware",
    speakerRole: "Chief Executive, BOCRA",
    event: "World Consumer Rights Day Commemoration",
    venue: "GICC, Gaborone",
    date: "2025-11-15",
    excerpt:
      "With the Botswana Data Protection Act 2024 now in force, BOCRA has a dual mandate: to protect consumers from unfair practices by operators, and to ensure that personal data collected by licensed entities is processed lawfully and securely.",
    slug: "consumer-protection-digital-age",
  },
  {
    id: "speech-005",
    title: "Addressing the Digital Divide: Universal Access in Rural Botswana",
    speaker: "Onkabetse Morapedi",
    speakerRole: "Director of Universal Access and Service, BOCRA",
    event: "Universal Access and Service Fund Stakeholder Summit",
    venue: "Maun Lodge, Maun",
    date: "2025-09-20",
    excerpt:
      "The Universal Access and Service Fund has connected 48 underserved communities since 2014. Our next phase targets the remaining settlements with populations over 500, with a goal of 95% broadband coverage by 2029.",
    slug: "digital-divide-universal-access",
  },
  {
    id: "speech-006",
    title: "The Role of Data Protection in Telecommunications Regulation",
    speaker: "Martin Mokgware",
    speakerRole: "Chief Executive, BOCRA",
    event: "Botswana Data Protection Conference",
    venue: "Avani Hotel, Gaborone",
    date: "2025-07-10",
    excerpt:
      "The BDPA 2024 mandates that all data controllers, including licensed operators, implement appropriate technical and organisational measures to protect personal data. BOCRA will enforce these provisions as part of its licensing conditions.",
    slug: "data-protection-telecoms-regulation",
  },
];

export function findOperator(query: string): Operator | undefined {
  const q = query.toLowerCase().trim();
  return mockOperators.find(
    (op) =>
      op.operatorName.toLowerCase().includes(q) ||
      op.shortName.toLowerCase().includes(q) ||
      op.licenceNumber.toLowerCase() === q
  );
}

export function searchOperators(query: string): Operator[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase().trim();
  return mockOperators.filter(
    (op) =>
      op.operatorName.toLowerCase().includes(q) ||
      op.shortName.toLowerCase().includes(q) ||
      op.licenceNumber.toLowerCase().includes(q)
  );
}
