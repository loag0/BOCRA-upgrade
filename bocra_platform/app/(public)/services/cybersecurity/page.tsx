import {
  Shield,
  AlertTriangle,
  Eye,
  FileText,
  Users,
  Lock,
} from "lucide-react";
import { MandatePage } from "@/components/mandate-page";

export const metadata = {
  title: "COMM-CIRT - BOCRA",
  description:
    "BOCRA operates the Communications Sector Computer Incident Response Team (COMM-CIRT), acting as the national cybersecurity focal point.",
};

export default function CybersecurityPage() {
  return (
    <MandatePage
      title="COMM-CIRT"
      subtitle="Cybersecurity"
      description="The Communications Sector Computer Incident Response Team, operated by BOCRA as the national cybersecurity focal point for the communications sector."
      icon={Shield}
      iconColor="bg-red-500/20 text-red-400"
      overview={[
        "BOCRA operates the Communications Sector Computer Incident Response Team (COMM-CIRT), serving as the national cybersecurity focal point for the entire communications sector until a national BWCIRT is established.",
        "COMM-CIRT handles cybersecurity incident response, threat intelligence sharing, and vulnerability coordination for telecommunications operators, ISPs, broadcasters, and other BOCRA-regulated entities.",
        "The team conducts cybersecurity awareness campaigns for both industry and the public, provides technical advisories on emerging threats, and coordinates with regional and international CIRT communities.",
      ]}
      keyFacts={[
        { label: "Operated By", value: "BOCRA" },
        { label: "Scope", value: "Communications sector" },
        { label: "Role", value: "National focal point" },
        { label: "Until", value: "BWCIRT established" },
        { label: "Coverage", value: "All BOCRA licensees" },
      ]}
      legislation="Communications Regulatory Authority Act, 2012"
      legislationDetail="COMM-CIRT mandate established under BOCRA's sector security responsibilities."
      responsibilities={[
        {
          icon: AlertTriangle,
          title: "Incident Response",
          description: "Responds to cybersecurity incidents affecting the communications sector, coordinating containment, eradication, and recovery.",
          color: "bg-red-500/10 text-red-500",
        },
        {
          icon: Eye,
          title: "Threat Intelligence",
          description: "Monitors the threat landscape, shares intelligence with sector stakeholders, and issues advisories on emerging cybersecurity risks.",
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          icon: Shield,
          title: "Vulnerability Coordination",
          description: "Coordinates disclosure and remediation of vulnerabilities discovered in critical communications infrastructure.",
          color: "bg-purple-500/10 text-purple-500",
        },
        {
          icon: Users,
          title: "Awareness Campaigns",
          description: "Conducts cybersecurity awareness programmes for operators, businesses, and the general public on digital safety and best practices.",
          color: "bg-green-500/10 text-green-500",
        },
        {
          icon: FileText,
          title: "Technical Advisories",
          description: "Publishes technical bulletins and security advisories to guide operators in protecting their networks and customer data.",
          color: "bg-orange-500/10 text-orange-500",
        },
        {
          icon: Lock,
          title: "Regional Coordination",
          description: "Collaborates with SADC, African Union, and international CIRT communities on cross-border cybersecurity cooperation.",
          color: "bg-cyan-500/10 text-cyan-500",
        },
      ]}
    />
  );
}
