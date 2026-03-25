import { MandatePage } from "@/components/mandate-page";

export const metadata = {
  title: "Broadcasting",
  description:
    "BOCRA regulates all commercial broadcasting in Botswana, including radio and television, with local content compliance monitoring.",
};

export default function BroadcastingPage() {
  return (
    <MandatePage
      title="Broadcasting"
      subtitle="Regulatory Sector"
      description="Regulation of commercial radio and television broadcasting in Botswana, including licensing, local content compliance, and technical standards."
      icon="Radio"
      iconColor="bg-purple-500/20 text-purple-400"
      heroImage="/images/community-meeting.jpg"
      overview={[
        "BOCRA regulates all commercial broadcasting services except state broadcasting. Licensed stations include Yarona FM, Duma FM, and Gabz FM (radio), and eBotswana (TV). A framework for campus radio stations is currently in development.",
        "Broadcasting licences are divided into two categories: System licences (for transmitters and infrastructure) and Service licences (for content and programming). Each category has separate renewal cycles, and operators must maintain compliance with both.",
        "BOCRA enforces local content quotas on all licensed broadcasters to promote Botswana's cultural identity and creative industries. Digital broadcasting specifications have been developed as part of the migration from analogue to digital broadcasting.",
      ]}
      keyFacts={[
        { label: "Licensed Radio", value: "Yarona FM, Duma FM, Gabz FM" },
        { label: "Licensed TV", value: "eBotswana" },
        { label: "Licence Types", value: "System & Service" },
        { label: "Content Quotas", value: "Local content enforced" },
        { label: "Campus Radio", value: "Framework in development" },
      ]}
      legislation="Communications Regulatory Authority Act, 2012"
      legislationDetail="Broadcasting Act [Cap 72:04] provisions consolidated under the CRA Act."
      responsibilities={[
        {
          icon: "FileText",
          title: "Licensing",
          description: "Issues and manages System licences (infrastructure) and Service licences (content/programming) for all commercial broadcasters.",
          color: "bg-purple-500/10 text-purple-500",
        },
        {
          icon: "Music",
          title: "Local Content Compliance",
          description: "Monitors and enforces local content quotas per licence conditions to promote Botswana's cultural and creative industries.",
          color: "bg-pink-500/10 text-pink-500",
        },
        {
          icon: "Tv",
          title: "Digital Migration",
          description: "Oversees the transition from analogue to digital broadcasting, developing technical specifications and migration timelines.",
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          icon: "BarChart3",
          title: "Technical Standards",
          description: "Sets and monitors broadcast signal quality, coverage requirements, and transmission standards for radio and TV.",
          color: "bg-green-500/10 text-green-500",
        },
        {
          icon: "Shield",
          title: "Content Regulation",
          description: "Ensures broadcasters comply with content standards, advertising codes, and licence conditions.",
          color: "bg-orange-500/10 text-orange-500",
        },
        {
          icon: "Radio",
          title: "Campus Radio Framework",
          description: "Developing a regulatory framework for campus and community radio stations to expand broadcasting access.",
          color: "bg-teal-500/10 text-teal-500",
        },
      ]}
    />
  );
}
