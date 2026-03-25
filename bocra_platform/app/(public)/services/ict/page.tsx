import { MandatePage } from "@/components/mandate-page";

export const metadata = {
  title: "Internet & ICT",
  description:
    "BOCRA oversees ISPs and the broader ICT sector in Botswana. The internet telephony market is fully liberalised under the SAP framework.",
};

export default function IctPage() {
  return (
    <MandatePage
      title="Internet & ICT"
      subtitle="Regulatory Sector"
      description="Oversight of Internet Service Providers (ISPs) and the broader ICT sector, including VoIP, VANS, and internet services under the SAP licensing framework."
      icon="Wifi"
      iconColor="bg-cyan-500/20 text-cyan-400"
      heroImage="/images/office-workspace.jpg"
      overview={[
        "BOCRA oversees ISPs and the broader ICT sector in Botswana. The internet telephony market is fully liberalised, with VANS (Value Added Network Services) providers permitted to offer VoIP services under the SAP licensing framework.",
        "The ICT sector is managed through the Services & Applications Provider (SAP) licensing framework introduced in 2015. ISPs are licensed as SAPs, enabling them to provide a wide range of internet and data services over any network infrastructure.",
        "BOCRA also administers the .bw country code top-level domain (ccTLD) as a national resource and operates the Communications Sector Computer Incident Response Team (COMM-CIRT), serving as the cybersecurity focal point for the communications sector.",
      ]}
      keyFacts={[
        { label: "ISP Licensing", value: "SAP framework" },
        { label: "VoIP Market", value: "Fully liberalised" },
        { label: "ccTLD", value: ".bw domain registry" },
        { label: "Cybersecurity", value: "COMM-CIRT" },
        { label: "Market Status", value: "Open competition" },
      ]}
      legislation="Communications Regulatory Authority Act, 2012"
      legislationDetail="Electronic Communications and Transactions Act, 2014 extends BOCRA's digital mandate."
      responsibilities={[
        {
          icon: "FileText",
          title: "ISP Licensing",
          description: "Licenses Internet Service Providers under the SAP framework, managing applications, renewals, and compliance monitoring.",
          color: "bg-cyan-500/10 text-cyan-500",
        },
        {
          icon: "Globe",
          title: ".bw Domain Registry",
          description: "Manages the .BW country code top-level domain under Section 38(1) of the CRA Act, including registration, renewal, and WHOIS services.",
          color: "bg-teal-500/10 text-teal-500",
        },
        {
          icon: "Shield",
          title: "COMM-CIRT",
          description: "Operates the Communications Sector Computer Incident Response Team for cybersecurity incident response and threat intelligence.",
          color: "bg-red-500/10 text-red-500",
        },
        {
          icon: "Server",
          title: "VANS & VoIP",
          description: "Regulates Value Added Network Services and VoIP providers operating in the fully liberalised internet telephony market.",
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          icon: "Users",
          title: "Digital Signatures",
          description: "Accredits secure digital signature service providers under the Electronic Communications and Transactions Act, 2014.",
          color: "bg-purple-500/10 text-purple-500",
        },
        {
          icon: "Shield",
          title: "Content Takedowns",
          description: "Administers takedown notices for unlawful online content under the Electronic Communications and Transactions Act.",
          color: "bg-orange-500/10 text-orange-500",
        },
      ]}
    />
  );
}
