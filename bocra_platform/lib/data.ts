/**
 * Data Service Layer
 *
 * Every page fetches data through this file. Currently returns mock data.
 * When the backend is ready, uncomment the api.get() calls and remove the mock fallbacks.
 *
 * To swap to real data:
 *   1. Uncomment the `api.get()` line in each function
 *   2. Delete or comment the mock fallback
 *   3. That's it - all pages will start using real data
 */

//import { api } from "@/lib/api";
import {
  mockOperators,
  mockPublications,
  mockNews,
  mockSpeeches,
  searchOperators as mockSearchOperators,
  findOperator as mockFindOperator,
} from "@/lib/mock-data";
import type {
  Operator,
  Publication,
  NewsArticle,
  Speech,
} from "@/types";

// ────────────────────────────────────────────────────────────────
// Operators
// ────────────────────────────────────────────────────────────────

export async function getOperators(): Promise<Operator[]> {
  // return api.get<Operator[]>("/api/operators");
  return mockOperators;
}

export async function searchOperators(query: string): Promise<Operator[]> {
  if (query.length < 2) return [];
  // return api.get<Operator[]>(`/api/operators/search?name=${encodeURIComponent(query)}`);
  return mockSearchOperators(query);
}

export async function findOperator(query: string): Promise<Operator | undefined> {
  // const results = await api.get<Operator[]>(`/api/operators/search?name=${encodeURIComponent(query)}`);
  // return results[0];
  return mockFindOperator(query);
}

// ────────────────────────────────────────────────────────────────
// Publications
// ────────────────────────────────────────────────────────────────

export async function getPublications(): Promise<Publication[]> {
  // return api.get<Publication[]>("/api/publications");
  return mockPublications;
}

// ────────────────────────────────────────────────────────────────
// News
// ────────────────────────────────────────────────────────────────

export async function getNews(): Promise<NewsArticle[]> {
  // return api.get<NewsArticle[]>("/api/news");
  return mockNews;
}

// ────────────────────────────────────────────────────────────────
// Speeches
// ────────────────────────────────────────────────────────────────

export async function getSpeeches(): Promise<Speech[]> {
  // return api.get<Speech[]>("/api/speeches");
  return mockSpeeches;
}

// ────────────────────────────────────────────────────────────────
// Homepage stats
// ────────────────────────────────────────────────────────────────

export interface HomepageStat {
  label: string;
  value: string;
}

export async function getHomepageStats(): Promise<HomepageStat[]> {
  // return api.get<HomepageStat[]>("/api/analytics/homepage-stats");
  return [
    { label: "Licensed Operators", value: "47+" },
    { label: "Active Licences", value: "234" },
    { label: "Complaints Resolved", value: "1,200+" },
    { label: ".bw Domains Registered", value: "8,500+" },
  ];
}

// ────────────────────────────────────────────────────────────────
// Homepage operators
// ────────────────────────────────────────────────────────────────

export interface HomepageOperator {
  name: string;
  type: string;
  fullName: string;
  description: string;
  licenceNo: string;
  since: string;
  services: string[];
  website: string;
  logo: string;
  banner: string;
}

export async function getHomepageOperators(): Promise<HomepageOperator[]> {
  // return api.get<HomepageOperator[]>("/api/operators/featured");
  return [
    {
      name: "BTC",
      type: "PTO",
      fullName: "Botswana Telecommunications Corporation",
      description: "The national fixed-line and broadband operator, providing voice, data, and fibre services across Botswana.",
      licenceNo: "BOCRA/PTO/001/2013",
      since: "2013",
      services: ["Fixed Voice", "ADSL/Fibre", "Leased Lines"],
      website: "https://www.btc.bw",
      logo: "/images/operators/btc-logo.png",
      banner: "/images/operators/btc-banner.png",
    },
    {
      name: "Mascom",
      type: "PTO",
      fullName: "Mascom Wireless Botswana",
      description: "Botswana's largest mobile network operator, offering 4G LTE, mobile money (MyZaka), and enterprise solutions.",
      licenceNo: "BOCRA/PTO/002/2013",
      since: "1998",
      services: ["Mobile Voice", "4G LTE", "MyZaka MFS"],
      website: "https://www.mascom.bw",
      logo: "/images/operators/mascom-logo.png",
      banner: "/images/operators/mascom-banner.png",
    },
    {
      name: "Orange",
      type: "PTO",
      fullName: "Orange Botswana",
      description: "Part of the global Orange Group, providing mobile telecommunications and digital services nationwide.",
      licenceNo: "BOCRA/PTO/003/2013",
      since: "1998",
      services: ["Mobile Voice", "4G Data", "Orange Money"],
      website: "https://www.orange.co.bw",
      logo: "/images/operators/orange-logo.png",
      banner: "/images/operators/orange-banner.png",
    },
    {
      name: "BoFiNet",
      type: "Wholesale",
      fullName: "Botswana Fibre Networks",
      description: "The national wholesale open-access broadband infrastructure provider, operating the national fibre backbone.",
      licenceNo: "BOCRA/WHL/001/2012",
      since: "2012",
      services: ["Wholesale Fibre", "National Backbone", "International Links"],
      website: "https://www.bofinet.co.bw",
      logo: "/images/operators/bofinet-logo.png",
      banner: "/images/operators/bofinet-banner.png",
    },
    {
      name: "BW Post",
      type: "Postal",
      fullName: "Botswana Post",
      description: "The designated universal postal service provider, operating a nationwide network of post offices and courier services.",
      licenceNo: "BOCRA/PST/001/2013",
      since: "1989",
      services: ["Mail Delivery", "Courier", "Financial Services"],
      website: "https://www.botswanapost.co.bw",
      logo: "/images/operators/bwpost-logo.png",
      banner: "/images/operators/bwpost-banner.png",
    },
    {
      name: "Yarona FM",
      type: "Radio",
      fullName: "Yarona FM",
      description: "A leading commercial FM radio broadcaster reaching audiences across Botswana with news, music, and entertainment.",
      licenceNo: "BOCRA/BCR/010/2015",
      since: "2000",
      services: ["FM Broadcasting", "Digital Streaming", "Advertising"],
      website: "https://www.yaronafm.co.bw",
      logo: "/images/operators/yaronafm-logo.png",
      banner: "/images/operators/yaronafm-banner.png",
    },
    {
      name: "Duma FM",
      type: "Radio",
      fullName: "Duma FM",
      description: "Commercial FM station broadcasting popular music, local content, and community-focused programming.",
      licenceNo: "BOCRA/BCR/011/2015",
      since: "2007",
      services: ["FM Broadcasting", "Local Content", "Community Radio"],
      website: "https://www.dumafm.co.bw",
      logo: "/images/operators/dumafm-logo.png",
      banner: "/images/operators/dumafm-banner.png",
    },
    {
      name: "eBotswana",
      type: "TV",
      fullName: "eBotswana Television",
      description: "Commercial free-to-air television broadcaster delivering local news, sports, and entertainment programming.",
      licenceNo: "BOCRA/BCT/005/2016",
      since: "2016",
      services: ["Free-to-Air TV", "Local News", "Sports Coverage"],
      website: "https://www.ebotswana.co.bw",
      logo: "/images/operators/ebotswana-logo.png",
      banner: "/images/operators/ebotswana-banner.png",
    },
  ];
}

// ────────────────────────────────────────────────────────────────
// Homepage news
// ────────────────────────────────────────────────────────────────

export interface HomepageNews {
  category: string;
  title: string;
  date: string;
  excerpt: string;
  highlight: boolean;
}

export async function getHomepageNews(): Promise<HomepageNews[]> {
  // return api.get<HomepageNews[]>("/api/news/featured");
  return [
    {
      category: "Public Notice",
      title: "BOCRA Publishes Draft Spectrum Policy 2026 for Public Comment",
      date: "15 March 2026",
      excerpt: "BOCRA invites public comment on the revised National Frequency Allocation Plan ahead of the IMT 2030 spectrum review.",
      highlight: true,
    },
    {
      category: "Announcement",
      title: "Updated QoS Guidelines for Mobile Broadband Now in Effect",
      date: "10 March 2026",
      excerpt: "Updated Quality of Service guidelines for mobile broadband services are now in effect. Operators must comply by 1 June 2026.",
      highlight: false,
    },
    {
      category: "Tender",
      title: "BOCRA Issues Tender for Website Redevelopment",
      date: "5 March 2026",
      excerpt: "BOCRA has issued a tender for the design, development, deployment and maintenance of the official BOCRA website.",
      highlight: false,
    },
  ];
}

// ────────────────────────────────────────────────────────────────
// Admin dashboard
// ────────────────────────────────────────────────────────────────

export interface DashboardStat {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral" | "warn";
}

export async function getDashboardStats(): Promise<DashboardStat[]> {
  // return api.get<DashboardStat[]>("/api/admin/dashboard/stats");
  return [
    { label: "Pending Applications", value: "14", delta: "+3 this week", trend: "up" },
    { label: "Open Complaints", value: "37", delta: "-5 from last week", trend: "down" },
    { label: "Licensed Operators", value: "89", delta: "2 pending renewal", trend: "neutral" },
    { label: "Expiring in 30 Days", value: "6", delta: "Action required", trend: "warn" },
  ];
}

export interface PendingApplication {
  id: string;
  ref: string;
  org: string;
  type: string;
  submitted: string;
  status: "submitted" | "under_review" | "pending_docs" | "approved" | "rejected";
  assignedTo: string;
}

export async function getPendingApplications(): Promise<PendingApplication[]> {
  // return api.get<PendingApplication[]>("/api/admin/applications?status=pending");
  return [
    { id: "1", ref: "APP-2026-001847", org: "Kalahari Connect (Pty) Ltd", type: "SAP - Internet Services", submitted: "2026-03-18", status: "under_review", assignedTo: "K. Setshogo" },
    { id: "2", ref: "APP-2026-001831", org: "SkyLink Botswana", type: "NFP-I - Fixed Wireless", submitted: "2026-03-15", status: "pending_docs", assignedTo: "T. Mokoena" },
    { id: "3", ref: "APP-2026-001820", org: "Delta Radio (Pty) Ltd", type: "Broadcasting - Commercial Radio", submitted: "2026-03-14", status: "submitted", assignedTo: "Unassigned" },
    { id: "4", ref: "APP-2026-001798", org: "NetPulse ISP", type: "SAP - VANS Provider", submitted: "2026-03-10", status: "under_review", assignedTo: "P. Ditshebo" },
    { id: "5", ref: "APP-2026-001775", org: "Gaborone Broadband (Pty) Ltd", type: "SAP - Internet Services", submitted: "2026-03-08", status: "pending_docs", assignedTo: "L. Gaobuse" },
  ];
}

export interface OpenComplaint {
  caseRef: string;
  complainant: string;
  operator: string;
  category: string;
  status: "received" | "acknowledged" | "investigating" | "awaiting_operator";
  daysOpen: number;
}

export async function getOpenComplaints(): Promise<OpenComplaint[]> {
  // return api.get<OpenComplaint[]>("/api/admin/complaints?status=open");
  return [
    { caseRef: "CMP-2026-104221", complainant: "K. Modise", operator: "Orange Botswana", category: "Billing dispute", status: "investigating", daysOpen: 12 },
    { caseRef: "CMP-2026-104185", complainant: "T. Garekwe", operator: "Mascom", category: "Poor network quality", status: "awaiting_operator", daysOpen: 9 },
    { caseRef: "CMP-2026-104177", complainant: "S. Baloyi", operator: "BTC", category: "Unauthorized deductions", status: "acknowledged", daysOpen: 3 },
    { caseRef: "CMP-2026-104155", complainant: "L. Tshekiso", operator: "Botswana Post", category: "Postal service delay", status: "investigating", daysOpen: 18 },
    { caseRef: "CMP-2026-104140", complainant: "P. Nkwe", operator: "Orange Botswana", category: "Unsolicited messages", status: "received", daysOpen: 1 },
    { caseRef: "CMP-2026-104088", complainant: "R. Seretse", operator: "Mascom", category: "Internet speed issues", status: "awaiting_operator", daysOpen: 22 },
  ];
}

export interface ExpiringLicence {
  operator: string;
  licenceNo: string;
  category: string;
  expiresAt: string;
  daysLeft: number;
}

export async function getExpiringLicences(): Promise<ExpiringLicence[]> {
  // return api.get<ExpiringLicence[]>("/api/admin/licences?expiresWithin=180");
  return [
    { operator: "BTC", licenceNo: "BOC-2013-NFP-001", category: "NFP-N (National)", expiresAt: "2026-03-31", daysLeft: 10 },
    { operator: "Mascom", licenceNo: "BOC-2013-NFP-002", category: "NFP-N (National)", expiresAt: "2026-03-31", daysLeft: 10 },
    { operator: "Orange Botswana", licenceNo: "BOC-2013-NFP-003", category: "NFP-N (National)", expiresAt: "2026-03-31", daysLeft: 10 },
    { operator: "Botswana Post", licenceNo: "BOC-2013-POST-001", category: "National Postal Operator", expiresAt: "2026-03-31", daysLeft: 10 },
    { operator: "NetStar ISP", licenceNo: "BOC-2021-SAP-012", category: "SAP - Internet Services", expiresAt: "2026-05-15", daysLeft: 55 },
    { operator: "SecureNet BW", licenceNo: "BOC-2022-SAP-018", category: "SAP - VANS", expiresAt: "2026-09-01", daysLeft: 163 },
  ];
}

// ────────────────────────────────────────────────────────────────
// Licensee portal
// ────────────────────────────────────────────────────────────────

export interface UserLicence {
  ref: string;
  category: string;
  org: string;
  status: "Active" | "Suspended" | "Expired" | "Pending";
  issuedAt: string;
  expiresAt: string;
  conditions: string[];
}

export async function getUserLicences(): Promise<UserLicence[]> {
  // return api.get<UserLicence[]>("/api/licences");
  return [
    {
      ref: "BOC-2024-SAP-019",
      category: "SAP - Internet Services",
      org: "MyCompany (Pty) Ltd",
      status: "Active",
      issuedAt: "2024-03-01",
      expiresAt: "2027-02-28",
      conditions: ["QoS compliance", "Annual reporting", "Consumer protection standards"],
    },
    {
      ref: "BOC-2023-BRD-007",
      category: "Broadcasting - Commercial Radio",
      org: "MyCompany (Pty) Ltd",
      status: "Active",
      issuedAt: "2023-06-01",
      expiresAt: "2026-05-31",
      conditions: ["Local content 40%", "Watershed hours compliance", "Signal coverage targets"],
    },
    {
      ref: "BOC-2022-NFP-004",
      category: "NFP-I - Fixed Wireless",
      org: "MyCompany (Pty) Ltd",
      status: "Active",
      issuedAt: "2022-01-15",
      expiresAt: "2027-01-14",
      conditions: ["Spectrum usage compliance", "Coverage rollout schedule", "Interconnection obligations"],
    },
  ];
}

export interface UserApplication {
  ref: string;
  type: string;
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected";
  submitted: string;
  assignedTo: string;
  notes: string;
}

export async function getUserApplications(): Promise<UserApplication[]> {
  // return api.get<UserApplication[]>("/api/applications");
  return [
    {
      ref: "APP-2026-001847",
      type: "Type Approval - IoT Device",
      status: "under_review",
      submitted: "2026-03-12",
      assignedTo: "P. Ditshebo",
      notes: "Technical evaluation in progress. Awaiting EMC test results.",
    },
    {
      ref: "APP-2026-001722",
      type: "SAP - Postal Courier",
      status: "approved",
      submitted: "2026-02-10",
      assignedTo: "K. Setshogo",
      notes: "Approved. Licence certificate available for download.",
    },
  ];
}

// ────────────────────────────────────────────────────────────────
// .bw Domains
// ────────────────────────────────────────────────────────────────

export interface DomainAvailability {
  domain: string;
  available: boolean;
  suggestions?: string[];
}

export async function checkDomainAvailability(domain: string): Promise<DomainAvailability> {
  // return api.get<DomainAvailability>(`/api/domains/availability/${encodeURIComponent(domain)}`);

  // Mock: a set of taken domains
  const TAKEN = new Set([
    "btc.co.bw", "mascom.co.bw", "orange.co.bw", "bocra.org.bw",
    "bofinet.co.bw", "botswana.co.bw", "gaborone.co.bw",
    "botspost.co.bw", "yarona.co.bw", "ebotswana.co.bw",
  ]);
  const available = !TAKEN.has(domain.toLowerCase());
  const suggestions = available ? [] : [
    domain.replace(".co.bw", ".org.bw"),
    domain.replace(".co.bw", ".net.bw"),
    `my${domain}`,
  ];
  return { domain, available, suggestions };
}

export interface WhoisRecord {
  domain: string;
  registrant: string;
  registrar: string;
  registered: string;
  expires: string;
  status: string;
  nameservers: string[];
}

export async function getWhoisData(domain: string): Promise<WhoisRecord | null> {
  // return api.get<WhoisRecord | null>(`/api/domains/whois/${encodeURIComponent(domain)}`);

  // Mock WHOIS data
  const records: Record<string, WhoisRecord> = {
    "btc.co.bw": {
      domain: "btc.co.bw",
      registrant: "Botswana Telecommunications Corporation",
      registrar: "BOCRA .bw Registry",
      registered: "2003-04-15",
      expires: "2027-04-15",
      status: "Active",
      nameservers: ["ns1.btc.bw", "ns2.btc.bw"],
    },
    "mascom.co.bw": {
      domain: "mascom.co.bw",
      registrant: "Mascom Wireless Botswana (Pty) Ltd",
      registrar: "BOCRA .bw Registry",
      registered: "2002-08-01",
      expires: "2026-08-01",
      status: "Active",
      nameservers: ["ns1.mascom.bw", "ns2.mascom.bw"],
    },
    "bocra.org.bw": {
      domain: "bocra.org.bw",
      registrant: "Botswana Communications Regulatory Authority",
      registrar: "BOCRA .bw Registry",
      registered: "2013-01-01",
      expires: "2028-01-01",
      status: "Active",
      nameservers: ["ns1.bocra.org.bw", "ns2.bocra.org.bw"],
    },
  };
  return records[domain.toLowerCase()] ?? null;
}

// ────────────────────────────────────────────────────────────────
// User profile mock data
// ────────────────────────────────────────────────────────────────

export interface UserComplaint {
  caseRef: string;
  operator: string;
  category: string;
  status: string;
  date: string;
}

export async function getUserComplaints(): Promise<UserComplaint[]> {
  // return api.get<UserComplaint[]>("/api/complaints/mine");
  return [
    { caseRef: "CMP-2026-104221", operator: "Orange Botswana", category: "Billing dispute", status: "investigating", date: "2026-03-09" },
    { caseRef: "CMP-2026-098834", operator: "Mascom", category: "Poor network quality", status: "resolved", date: "2026-01-14" },
    { caseRef: "CMP-2025-087102", operator: "BTC", category: "Unauthorized deductions", status: "closed", date: "2025-11-22" },
  ];
}

export interface UserDomain {
  domain: string;
  registered: string;
  expires: string;
  status: string;
}

export async function getUserDomains(): Promise<UserDomain[]> {
  // return api.get<UserDomain[]>("/api/domains/mine");
  return [
    { domain: "mycompany.co.bw", registered: "2024-06-01", expires: "2027-05-31", status: "active" },
  ];
}

export interface UserProfileLicence {
  ref: string;
  type: string;
  issued: string;
  expires: string;
  status: string;
}

export async function getUserProfileLicences(): Promise<UserProfileLicence[]> {
  // return api.get<UserProfileLicence[]>("/api/licences/mine");
  return [
    { ref: "BOC-2024-SAP-019", type: "SAP - Internet Services", issued: "2024-03-01", expires: "2027-02-28", status: "Active" },
  ];
}
