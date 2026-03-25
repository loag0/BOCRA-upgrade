import { MandatePage } from "@/components/mandate-page";

export const metadata = {
  title: "Telecommunications",
  description:
    "BOCRA regulates Public Telecommunications Operators, VANS, and VoIP providers under the converged NFP/SAP licensing framework.",
};

export default function TelecomsPage() {
  return (
    <MandatePage
      title="Telecommunications"
      subtitle="Regulatory Sector"
      description="Licensing, oversight, and regulation of all telecommunications operators and service providers in Botswana under the CRA Act 2012."
      icon="Phone"
      iconColor="bg-blue-500/20 text-blue-400"
      heroImage="/images/telecom-tower.jpg"
      overview={[
        "BOCRA regulates three Public Telecommunications Operators (PTOs): BTC (Botswana Telecommunications Corporation Limited), Mascom Wireless, and Orange Botswana. BOCRA also oversees Value Added Network Services (VANS), VoIP providers, and private network operators.",
        "In 2015, BOCRA introduced the converged NFP/SAP licensing framework, replacing the old PTO/VANS/PTNL three-category system. Network Facilities Providers (NFPs) own and operate physical infrastructure, while Services & Applications Providers (SAPs) deliver services over any network.",
        "BOCRA monitors Quality of Service (QoS) standards for mobile and fixed networks, enforces tariff regulations, and ensures fair competition. The 2013 structural separation of BTC into BTCL (retail) and BoFiNet (wholesale) was a landmark regulatory action to promote competition.",
      ]}
      keyFacts={[
        { label: "Licensed PTOs", value: "3 (BTC, Mascom, Orange)" },
        { label: "Licensing Model", value: "Converged NFP/SAP" },
        { label: "Framework Since", value: "September 2015" },
        { label: "Wholesale Provider", value: "BoFiNet" },
        { label: "VoIP Market", value: "Fully liberalised" },
      ]}
      legislation="Communications Regulatory Authority Act, 2012"
      legislationDetail="Sections on licensing, interconnection, tariff regulation, and quality of service."
      responsibilities={[
        {
          icon: "FileText",
          title: "Licensing",
          description: "Issues NFP and SAP licences. Manages new applications, renewals, and compliance monitoring for all telecom operators.",
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          icon: "BarChart3",
          title: "Quality of Service",
          description: "Monitors network quality across operators. Sets QoS guidelines for mobile broadband, voice, and data services.",
          color: "bg-green-500/10 text-green-500",
        },
        {
          icon: "Landmark",
          title: "Tariff Regulation",
          description: "Regulates wholesale and retail tariffs using cost-based pricing models. Ensures affordability and fair pricing across the market.",
          color: "bg-purple-500/10 text-purple-500",
        },
        {
          icon: "Signal",
          title: "Interconnection",
          description: "Sets interconnection guidelines and resolves disputes between operators to ensure seamless network interoperability.",
          color: "bg-orange-500/10 text-orange-500",
        },
        {
          icon: "Users",
          title: "Consumer Protection",
          description: "Handles consumer complaints against operators, enforces service standards, and ensures transparent billing practices.",
          color: "bg-cyan-500/10 text-cyan-500",
        },
        {
          icon: "Shield",
          title: "Competition",
          description: "Promotes fair competition through structural separation, access obligations, and market conduct regulation.",
          color: "bg-rose-500/10 text-rose-500",
        },
      ]}
    />
  );
}
