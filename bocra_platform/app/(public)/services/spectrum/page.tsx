import { MandatePage } from "@/components/mandate-page";

export const metadata = {
  title: "Radio Spectrum",
  description:
    "BOCRA administers the National Radio Frequency Plan, spectrum allocation, and the Automated Spectrum Management System (ASMS).",
};

export default function SpectrumPage() {
  return (
    <MandatePage
      title="Radio Spectrum"
      subtitle="Regulatory Sector"
      description="Administration of the National Radio Frequency Plan, spectrum allocation, frequency assignments, and spectrum monitoring from Spectrum House, Gaborone."
      icon="Activity"
      iconColor="bg-orange-500/20 text-orange-400"
      heroImage="/images/telecom-tower.jpg"
      overview={[
        "BOCRA administers the National Radio Frequency Plan and manages all spectrum allocation in Botswana. The Authority operates the Automated Spectrum Management System (ASMS), installed in 2005, which provides computerised frequency management capabilities.",
        "Spectrum monitoring is conducted from BOCRA's Spectrum House facility on Independence Avenue, Gaborone. The spectrum monitoring facility, opened in 2009, enables BOCRA to detect interference, monitor spectrum usage, and ensure compliance with frequency assignments.",
        "BOCRA issues individual frequency assignments for telecommunications, broadcasting, and other radio services. The Authority coordinates with regional bodies and the ITU on spectrum planning, including cross-border interference coordination with neighbouring countries such as South Africa.",
      ]}
      keyFacts={[
        { label: "Management System", value: "ASMS (since 2005)" },
        { label: "Monitoring Facility", value: "Opened 2009" },
        { label: "Headquarters", value: "Spectrum House, Gaborone" },
        { label: "ITU Region", value: "Region 1" },
        { label: "Coordination", value: "SADC cross-border" },
      ]}
      legislation="Communications Regulatory Authority Act, 2012"
      legislationDetail="National Radio Frequency Plan and ITU Radio Regulations."
      responsibilities={[
        {
          icon: "Radio",
          title: "Frequency Allocation",
          description: "Administers the National Radio Frequency Plan and allocates spectrum bands for telecommunications, broadcasting, and other services.",
          color: "bg-orange-500/10 text-orange-500",
        },
        {
          icon: "FileText",
          title: "Frequency Assignments",
          description: "Issues individual frequency assignments to licensed operators, broadcasters, amateur radio operators, and aircraft radio services.",
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          icon: "Radar",
          title: "Spectrum Monitoring",
          description: "Operates the spectrum monitoring facility to detect interference, verify compliance, and monitor actual spectrum usage patterns.",
          color: "bg-green-500/10 text-green-500",
        },
        {
          icon: "BarChart3",
          title: "ASMS Operations",
          description: "Manages the Automated Spectrum Management System for computerised frequency coordination and assignment processing.",
          color: "bg-purple-500/10 text-purple-500",
        },
        {
          icon: "MapPin",
          title: "Cross-Border Coordination",
          description: "Coordinates with SADC neighbours and the ITU on cross-border interference, regional frequency harmonisation, and IMT spectrum reviews.",
          color: "bg-cyan-500/10 text-cyan-500",
        },
        {
          icon: "Activity",
          title: "Spectrum Planning",
          description: "Conducts spectrum planning studies, develops policy recommendations, and prepares for new spectrum releases (e.g., IMT-2030).",
          color: "bg-rose-500/10 text-rose-500",
        },
      ]}
    />
  );
}
