import { MandatePage } from "@/components/mandate-page";

export const metadata = {
  title: "Type Approval",
  description:
    "All radio and telecommunications equipment used in Botswana must be BOCRA type-approved before it can be connected, used, or sold.",
};

export default function TypeApprovalPage() {
  return (
    <MandatePage
      title="Type Approval"
      subtitle="Equipment Regulation"
      description="All radio and telecommunications equipment used in Botswana must be BOCRA type-approved before it can be connected, used, or sold. Equipment must comply with ITU Region 1 standards."
      icon="CheckSquare"
      iconColor="bg-rose-500/20 text-rose-400"
      heroImage="/images/telecom-tower.jpg"
      overview={[
        "Under Section 84 of the CRA Act, BOCRA operates a mandatory type approval regime for all radio and telecommunications equipment. No device may be connected to a network, used, or sold in Botswana without BOCRA type approval certification.",
        "Equipment must comply with ITU Region 1 standards and BOCRA's Telecommunications Technical Specifications, which were developed in 2008. The type approval process ensures that devices operate within their assigned frequencies and do not cause harmful interference.",
        "BOCRA maintains a public registry of type-approved devices. Equipment importers, manufacturers, and distributors must submit their devices for testing and approval before bringing them to market in Botswana.",
      ]}
      keyFacts={[
        { label: "Legal Basis", value: "Section 84, CRA Act" },
        { label: "Standards", value: "ITU Region 1" },
        { label: "Specs Developed", value: "2008" },
        { label: "Requirement", value: "Mandatory pre-market" },
        { label: "Registry", value: "Public (searchable)" },
      ]}
      legislation="Communications Regulatory Authority Act, 2012"
      legislationDetail="Section 84 governs type approval of radio and telecommunications equipment."
      responsibilities={[
        {
          icon: "FileText",
          title: "Approval Process",
          description: "Reviews and processes type approval applications from importers, manufacturers, and distributors for all radio and telecom equipment.",
          color: "bg-rose-500/10 text-rose-500",
        },
        {
          icon: "Cpu",
          title: "Technical Testing",
          description: "Verifies equipment compliance with ITU Region 1 standards and BOCRA's Telecommunications Technical Specifications.",
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          icon: "Search",
          title: "Approved Device Registry",
          description: "Maintains and publishes the registry of type-approved devices that are authorised for use and sale in Botswana.",
          color: "bg-green-500/10 text-green-500",
        },
        {
          icon: "Shield",
          title: "Interference Prevention",
          description: "Ensures devices operate within assigned frequency bands and do not cause harmful interference to other services.",
          color: "bg-purple-500/10 text-purple-500",
        },
        {
          icon: "AlertTriangle",
          title: "Enforcement",
          description: "Investigates and takes action against non-compliant equipment, including import restrictions and market withdrawal orders.",
          color: "bg-orange-500/10 text-orange-500",
        },
        {
          icon: "CheckSquare",
          title: "Certification",
          description: "Issues type approval certificates that authorise equipment for connection, use, and sale within Botswana.",
          color: "bg-cyan-500/10 text-cyan-500",
        },
      ]}
    />
  );
}
