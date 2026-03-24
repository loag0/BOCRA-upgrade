import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy - BOCRA",
  description:
    "How the Botswana Communications Regulatory Authority collects, uses, and protects your personal data under the Botswana Data Protection Act 2024.",
};

const sections = [
  {
    title: "1. Introduction",
    content:
      "The Botswana Communications Regulatory Authority (BOCRA) is committed to protecting the privacy and personal data of all users of this digital platform. This Privacy Policy explains how we collect, use, store, and protect your information in compliance with the Botswana Data Protection Act (BDPA) 2024 and the Communications Regulatory Authority Act 2012.",
  },
  {
    title: "2. Data Controller",
    content:
      "BOCRA is the data controller for personal data collected through this platform. Our offices are located at Plot 50671, Independence Avenue, P/Bag 00495, Gaborone, Botswana. For privacy enquiries, contact us at info@bocra.org.bw or +267 395 7755.",
  },
  {
    title: "3. Data We Collect",
    content:
      "We collect the following categories of personal data: (a) Account information including your full name, email address, and password when you register; (b) Licence application data including business registration details, contact information, and supporting documents; (c) Complaint data including your name, contact details, and the details of your complaint; (d) Usage data including IP address, browser type, pages visited, and session duration collected automatically through cookies and analytics; (e) Communication data including correspondence sent to BOCRA through this platform.",
  },
  {
    title: "4. How We Use Your Data",
    content:
      "We process your personal data for the following purposes: (a) To provide and administer BOCRA services including licence verification, complaint handling, and domain registration; (b) To communicate with you about your applications, complaints, or account; (c) To comply with our regulatory obligations under the CRA Act 2012; (d) To improve our platform and services through anonymised analytics; (e) To ensure the security of our systems and prevent fraud.",
  },
  {
    title: "5. Legal Basis for Processing",
    content:
      "We process your data on the following legal bases under the BDPA 2024: (a) Your consent, which you provide when creating an account or submitting information; (b) Performance of a contract or pre-contractual steps related to licence applications; (c) Compliance with legal obligations imposed on BOCRA as a regulatory authority; (d) Legitimate interests in maintaining platform security and improving services.",
  },
  {
    title: "6. Data Sharing",
    content:
      "BOCRA does not sell your personal data. We may share data with: (a) Government bodies where required by law or regulatory obligation; (b) Service providers who assist in operating our platform, bound by data processing agreements; (c) Law enforcement agencies when legally compelled. All data transfers are conducted in accordance with the BDPA 2024.",
  },
  {
    title: "7. Data Retention",
    content:
      "We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Account data is retained for the duration of your account and for 12 months following deletion. Regulatory records are retained in accordance with statutory retention periods under the CRA Act 2012.",
  },
  {
    title: "8. Your Rights",
    content:
      "Under the BDPA 2024, you have the right to: (a) Access your personal data held by BOCRA; (b) Rectify inaccurate or incomplete data; (c) Erase your data where there is no legal basis for continued processing; (d) Restrict processing in certain circumstances; (e) Data portability for data you have provided to us; (f) Object to processing based on legitimate interests; (g) Withdraw consent at any time without affecting prior processing. To exercise these rights, contact info@bocra.org.bw.",
  },
  {
    title: "9. Cookies",
    content:
      "This platform uses essential cookies required for authentication and security. We also use analytics cookies to understand how the platform is used. You can manage cookie preferences through your browser settings. Essential cookies cannot be disabled as they are necessary for the platform to function.",
  },
  {
    title: "10. Security",
    content:
      "BOCRA implements appropriate technical and organisational measures to protect your data, including encryption in transit and at rest, access controls, regular security audits, and staff training on data protection. In the event of a data breach, we will notify affected individuals and the relevant authorities in accordance with the BDPA 2024.",
  },
  {
    title: "11. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.",
  },
  {
    title: "12. Contact",
    content:
      "For questions about this Privacy Policy or to exercise your data protection rights, contact: Botswana Communications Regulatory Authority, Plot 50671, Independence Avenue, P/Bag 00495, Gaborone, Botswana. Email: info@bocra.org.bw. Telephone: +267 395 7755.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero */}
        <section className="bg-bocra-navy pt-24 pb-14 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`,
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Home
                  </Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li className="text-white/70 font-medium">Privacy Policy</li>
              </ol>
            </nav>
            <AnimatedSection animation="fade-up">
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Legal
              </Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
                Privacy Policy
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-white/70 max-w-2xl leading-relaxed">
                How BOCRA collects, uses, and protects your personal data under
                the Botswana Data Protection Act 2024.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <AnimatedSection animation="fade-up">
            <p className="text-sm text-gray-400 mb-8">
              Effective date: 1 January 2026
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <AnimatedSection key={section.title} animation="fade-up" delay={i * 50}>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h2 className="font-heading text-lg font-bold text-bocra-navy mb-3">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
