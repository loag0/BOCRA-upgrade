import { MandatePage } from "@/components/mandate-page";

export const metadata = {
  title: "Postal Services - BOCRA",
  description:
    "BOCRA regulates all postal service providers in Botswana, ensuring safe, reliable, and affordable postal services nationwide.",
};

export default function PostalPage() {
  return (
    <MandatePage
      title="Postal Services"
      subtitle="Regulatory Sector"
      description="Licensing and regulation of all postal service providers across Botswana, ensuring safe, reliable, and affordable postal services nationwide."
      icon="Mail"
      iconColor="bg-green-500/20 text-green-400"
      heroImage="/images/community-meeting.jpg"
      overview={[
        "BOCRA assumed postal regulation under the CRA Act 2012. No entity may provide postal services in Botswana without a valid BOCRA licence. Botswana Post is the primary licensed postal operator, with courier operators also operating under the licensing framework.",
        "The Postal Sector Licensing Framework governs market entry and operational requirements. BOCRA ensures postal operators maintain service quality standards, including delivery times, coverage obligations, and handling of postal items.",
        "Postal operators were licensed under the new ICT Licensing Framework implemented in 2016, bringing them into alignment with the converged regulatory approach used across all BOCRA-regulated sectors.",
      ]}
      keyFacts={[
        { label: "Primary Operator", value: "Botswana Post" },
        { label: "Other Licensees", value: "Courier operators" },
        { label: "Framework", value: "Postal Sector Licensing" },
        { label: "Requirement", value: "Licence mandatory" },
        { label: "Updated", value: "2016 (new framework)" },
      ]}
      legislation="Communications Regulatory Authority Act, 2012"
      legislationDetail="Postal Services Act provisions consolidated under the CRA Act."
      responsibilities={[
        {
          icon: "FileText",
          title: "Licensing",
          description: "Issues postal service licences, manages renewals, and enforces compliance with licence conditions for all postal operators.",
          color: "bg-green-500/10 text-green-500",
        },
        {
          icon: "Shield",
          title: "Service Quality",
          description: "Sets and monitors quality standards for delivery times, reliability, and handling of postal items across all licensed operators.",
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          icon: "MapPin",
          title: "Coverage Obligations",
          description: "Ensures postal services reach all areas of Botswana, including rural and underserved communities.",
          color: "bg-orange-500/10 text-orange-500",
        },
        {
          icon: "Scale",
          title: "Tariff Regulation",
          description: "Regulates postal tariffs to ensure affordability while maintaining financial viability of operators.",
          color: "bg-purple-500/10 text-purple-500",
        },
        {
          icon: "Truck",
          title: "Market Entry",
          description: "Administers the Postal Sector Licensing Framework governing entry of new operators and courier services.",
          color: "bg-cyan-500/10 text-cyan-500",
        },
        {
          icon: "Mail",
          title: "Consumer Protection",
          description: "Handles complaints related to postal services and ensures operators meet their obligations to consumers.",
          color: "bg-rose-500/10 text-rose-500",
        },
      ]}
    />
  );
}
