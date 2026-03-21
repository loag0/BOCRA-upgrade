export type UserRole = "public" | "citizen" | "licensee" | "staff" | "admin";

export type LicenceCategory =
  | "NFP"
  | "SAP"
  | "Broadcasting"
  | "Postal"
  | "TypeApproval"
  | "Radio"
  | "Domain";

export type LicenceStatus = "Active" | "Suspended" | "Expired" | "Pending";

export type ComplianceStatus = "Compliant" | "Under Review" | "Non-Compliant";

export type ComplaintStatus =
  | "received"
  | "investigating"
  | "resolved"
  | "closed";

export type ComplaintCategory =
  | "poor_network_quality"
  | "billing_dispute"
  | "unsolicited_messages"
  | "unlicensed_operator"
  | "unfair_terms"
  | "type_approval_violation"
  | "other";

export type NotificationChannel = "sms" | "email";

export interface Operator {
  id: string;
  operatorName: string;
  shortName: string;
  licenceNumber: string;
  category: LicenceCategory;
  categoryFull: string;
  subCategory: string;
  status: LicenceStatus;
  issuedAt: string;
  expiresAt: string;
  complianceStatus: ComplianceStatus;
  services: string[];
  address: string;
  website: string;
}

export interface Complaint {
  id: string;
  caseRef: string;
  complainantName: string;
  complainantEmail: string;
  operator: string;
  category: ComplaintCategory;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface Publication {
  id: string;
  title: string;
  type:
    | "annual_report"
    | "qos_report"
    | "legislation"
    | "consultation"
    | "speech"
    | "tender"
    | "notice";
  fileUrl: string;
  publishedAt: string;
  description?: string;
}

export interface LicenceApplication {
  id: string;
  orgId: string;
  licenceType: LicenceCategory;
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected";
  submittedAt?: string;
  documents: string[];
}
