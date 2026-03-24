import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms of Use - BOCRA",
  description:
    "Terms and conditions governing the use of the BOCRA digital platform for licence verification, complaints, domain services, and publications.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using the BOCRA Digital Platform (\"the Platform\"), you agree to be bound by these Terms of Use. If you do not agree, you must not use the Platform. BOCRA reserves the right to modify these terms at any time; continued use constitutes acceptance of changes.",
  },
  {
    title: "2. About the Platform",
    content:
      "The Platform is operated by the Botswana Communications Regulatory Authority (BOCRA), established under the Communications Regulatory Authority Act 2012. It provides digital access to BOCRA services including licence verification, complaint filing, .bw domain information, publications, and regulatory information.",
  },
  {
    title: "3. User Accounts",
    content:
      "Certain services require account registration. You must provide accurate and complete information, maintain the security of your credentials, and notify BOCRA immediately of any unauthorised access. You are responsible for all activity under your account. BOCRA may suspend or terminate accounts that violate these terms.",
  },
  {
    title: "4. Acceptable Use",
    content:
      "You agree to use the Platform only for lawful purposes and in accordance with these terms. You must not: (a) submit false or misleading information; (b) attempt to gain unauthorised access to any part of the Platform; (c) interfere with the Platform's operation or security; (d) use automated tools to scrape or extract data; (e) impersonate another person or entity; (f) use the Platform to transmit harmful or offensive content.",
  },
  {
    title: "5. Licence Verification",
    content:
      "The licence verification service provides publicly available information about BOCRA-licensed operators. While BOCRA strives for accuracy, verification results are informational and do not constitute legal proof of licence status. For official confirmation, contact BOCRA directly.",
  },
  {
    title: "6. Complaints",
    content:
      "Complaints submitted through the Platform are processed in accordance with BOCRA's complaint handling procedures. By filing a complaint, you confirm that the information provided is true and accurate to the best of your knowledge. BOCRA reserves the right to request additional information and to dismiss complaints found to be frivolous or vexatious.",
  },
  {
    title: "7. Publications and Content",
    content:
      "Content published on the Platform, including reports, legislation, and notices, is provided for informational purposes. While BOCRA takes care to ensure accuracy, published content does not constitute legal advice. For authoritative interpretation of legislation, consult the relevant Acts and legal counsel.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "All content, design, logos, and trademarks on the Platform are the property of BOCRA or its licensors and are protected by copyright and intellectual property laws of Botswana. You may download publications for personal, non-commercial use. Reproduction or redistribution of Platform content requires prior written consent from BOCRA.",
  },
  {
    title: "9. Third-Party Links",
    content:
      "The Platform may contain links to external websites. BOCRA does not control or endorse these sites and is not responsible for their content, privacy practices, or availability. Accessing third-party links is at your own risk.",
  },
  {
    title: "10. Limitation of Liability",
    content:
      "The Platform is provided \"as is\" without warranties of any kind. BOCRA shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, the Platform. This includes loss of data, business interruption, or errors in published information. Nothing in these terms excludes liability that cannot be excluded under Botswana law.",
  },
  {
    title: "11. Governing Law",
    content:
      "These Terms of Use are governed by and construed in accordance with the laws of Botswana. Any disputes arising from use of the Platform shall be subject to the exclusive jurisdiction of the courts of Botswana.",
  },
  {
    title: "12. Contact",
    content:
      "For questions about these Terms of Use, contact: Botswana Communications Regulatory Authority, Plot 50671, Independence Avenue, P/Bag 00495, Gaborone, Botswana. Email: info@bocra.org.bw. Telephone: +267 395 7755.",
  },
];

export default function TermsPage() {
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
                <li className="text-white/70 font-medium">Terms of Use</li>
              </ol>
            </nav>
            <AnimatedSection animation="fade-up">
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Legal
              </Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
                Terms of Use
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-white/70 max-w-2xl leading-relaxed">
                Terms and conditions governing your use of the BOCRA Digital Platform.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <AnimatedSection animation="fade-up">
            <p className="text-sm text-gray-400 mb-8">
              Last updated: 1 January 2026
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
