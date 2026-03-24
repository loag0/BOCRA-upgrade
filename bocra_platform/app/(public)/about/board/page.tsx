import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Linkedin, Mail } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/animated-section";

export const metadata = {
  title: "Board & Management - BOCRA",
  description:
    "Meet the BOCRA Board of Directors and Executive Management team, appointed to guide Botswana's communications regulation.",
};

const boardMembers = [
  {
    name: "Dr. Bokamoso Basutli, PhD",
    role: "Chairperson",
    initials: "BB",
    bio: "Professional Engineer and IEEE Senior Member. Head of Department of Electrical and Communications Systems Engineering at BIUST. Principal Investigator of the BotswanaSat-1 project. IEEE CertiAIEd Assessor for ethical implications of Autonomous Intelligent Systems. PhD in Electronics, Electrical, and Systems Engineering from Loughborough University, UK.",
  },
  {
    name: "Mr. Moabi Pusumane",
    role: "Vice Chairperson",
    initials: "MP",
    bio: "Over 15 years of experience in telecommunications, project management, market intelligence, and commercial leadership. Currently Commercial Director at Coca-Cola Beverages Botswana. Achievements include 5-year CAGR double-digit revenue growth and the 2023 Africa Customer Excellence Award.",
  },
  {
    name: "Ms. Montle Phuthego",
    role: "Board Member",
    initials: "MP",
    bio: "MSc in Economics from the University of Warwick. Over 20 years in economic research, business development, trade, and investment. Former founding Caretaker CEO at SPEDU and Deputy Managing Director at Botswana Development Corporation. Currently Country Director for TechnoServe.",
  },
  {
    name: "Ms. Alta Dimpho Seleka",
    role: "Board Member",
    initials: "AS",
    bio: "Over 20 years in public financial management and fiscal governance. FCCA-UK, FCPA-BICA, CIPFA-UK, and AAT qualified. Acting Commissioner for Finance and Administration at BURS, managing multibillion-pula tax revenues.",
  },
  {
    name: "Ms. Lebogang George",
    role: "Board Member",
    initials: "LG",
    bio: "Partner at AJA/MCL, attorney admitted to the Botswana High Courts. Specialist in commercial law, ICT law, IT governance, and data protection/privacy law, including the Botswana Data Protection Act, South Africa's POPIA, and the EU GDPR.",
  },
  {
    name: "Mr. Ronald Kgafela, CODP",
    role: "Board Member",
    initials: "RK",
    bio: "Over 20 years in Human Resources, Organisational Development, and Employment Relations. MSc in Strategic Management from the University of Derby. Currently Head of Human Resources at NBFIRA.",
  },
  {
    name: "Dr. Kennedy Ramojela",
    role: "Board Member",
    initials: "KR",
    bio: "PhD in Media and Communications from RMIT University. MPhil from the University of Southampton. Over 20 years across media, creatives, and technology. Currently Media and Communications lecturer at the University of Botswana.",
  },
  {
    name: "Mr. Martin Mokgware",
    role: "Chief Executive (Ex-Officio)",
    initials: "MM",
    bio: "Chief Executive of BOCRA, serving as an ex-officio member of the Board of Directors. Leads the day-to-day operations of the Authority and drives BOCRA's digital transformation strategy.",
    isExOfficio: true,
  },
];

const executiveManagement = [
  {
    name: "Mr. Martin Mokgware",
    title: "Chief Executive",
    initials: "MM",
  },
  {
    name: "Mr. Murphy Setshwane",
    title: "Director Business Development",
    initials: "MS",
  },
  {
    name: "Mr. Peter Tladinyane",
    title: "Director Corporate Services",
    initials: "PT",
  },
  {
    name: "Ms. Bonny Mine",
    title: "Director Finance",
    initials: "BM",
  },
  {
    name: "Mr. Bathopi Luke",
    title: "Director Technical Services",
    initials: "BL",
  },
  {
    name: "Ms. Tebogo Mmoshe",
    title: "Director of Licensing",
    initials: "TM",
  },
  {
    name: "Ms. Maitseo Ratladi",
    title: "Director Broadband and Universal Service",
    initials: "MR",
  },
  {
    name: "Ms. Joyce Isa-Molwane",
    title: "Director Legal, Compliance & Board Secretary",
    initials: "JI",
  },
];

const departments = [
  {
    name: "Compliance and Monitoring",
    description: "Enforces regulatory compliance across all licensed operators and monitors sector performance.",
  },
  {
    name: "Corporate Support",
    description: "Provides administrative, HR, and ICT support services to the organisation.",
  },
  {
    name: "Business Development",
    description: "Drives strategic initiatives, market studies, and new regulatory frameworks.",
  },
  {
    name: "Technical Services",
    description: "Manages spectrum, type approval, numbering plans, and technical standards.",
  },
  {
    name: "Corporate Communications",
    description: "Handles public relations, stakeholder engagement, and media communications.",
  },
];

export default function BoardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero */}
        <section className="relative bg-bocra-navy pt-24 pb-16 overflow-hidden">
          <Image
            src="/images/conference-room.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bocra-navy/60 to-bocra-navy" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Home
                  </Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li>
                  <Link href="/about" className="hover:text-white/70 transition-colors">
                    About
                  </Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li className="text-white/70 font-medium">Board & Management</li>
              </ol>
            </nav>

            <AnimatedSection animation="fade-up" delay={0}>
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Leadership
              </Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
                Board of Directors & Executive Management
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                The BOCRA Board was appointed effective 1 August 2025, aligned
                with Botswana&apos;s National Digital Economy Roadmap 2025-2030
                and the Economic Transformation Programme.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Board of Directors */}
        <section className="bg-white py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                Governance
              </Badge>
              <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                Board of Directors
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl">
                Seven non-executive members plus the Chief Executive as an
                ex-officio member, appointed by the Minister.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {boardMembers.map((member, i) => (
                <AnimatedSection key={member.name} animation="fade-up" delay={i * 80} className={member.role === "Chairperson" ? "md:col-span-2" : ""}>
                <Card
                  className={`border-gray-100 shadow-sm h-full ${
                    member.role === "Chairperson"
                      ? "ring-2 ring-bocra-gold/30"
                      : ""
                  }`}
                >
                  <CardContent className={`p-6 ${member.role === "Chairperson" ? "md:flex md:gap-6 md:items-start" : ""}`}>
                    <div className={`flex items-start gap-4 ${member.role === "Chairperson" ? "md:flex-1" : ""}`}>
                      {/* Avatar */}
                      <div
                        className={`shrink-0 rounded-xl flex items-center justify-center font-bold text-white ${
                          member.role === "Chairperson"
                            ? "w-16 h-16 text-xl bg-bocra-gold"
                            : member.isExOfficio
                            ? "w-14 h-14 text-lg bg-bocra-blue"
                            : "w-14 h-14 text-lg bg-bocra-navy"
                        }`}
                      >
                        {member.initials}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-bocra-navy">
                          {member.name}
                        </h3>
                        <p className="text-sm text-bocra-gold font-medium mb-2">
                          {member.role}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Management */}
        <section className="bg-bocra-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                Executive Team
              </Badge>
              <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                Executive Management
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl">
                The executive team is led by the Chief Executive and comprises
                directors heading BOCRA&apos;s core departments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {executiveManagement.map((member, i) => (
                <AnimatedSection key={member.name} animation="fade-up" delay={i * 80}>
                  <Card className="border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-xl mx-auto flex items-center justify-center font-bold text-white text-xl mb-4 ${
                          member.title === "Chief Executive"
                            ? "bg-bocra-gold"
                            : "bg-bocra-navy"
                        }`}
                      >
                        {member.initials}
                      </div>
                      <h3 className="font-semibold text-bocra-navy text-sm">
                        {member.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{member.title}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Organisational Structure */}
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                Structure
              </Badge>
              <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                Organisational Departments
              </h2>
              <p className="mt-3 text-gray-500 max-w-xl">
                BOCRA is organised into five main departments, each headed by a
                Director reporting to the Chief Executive.
              </p>
            </div>

            {/* Simple org chart */}
            <div className="flex flex-col items-center">
              {/* CE box */}
              <AnimatedSection animation="fade-up">
                <div className="bg-bocra-navy text-white rounded-xl px-8 py-4 text-center shadow-lg mb-2">
                  <p className="font-bold">Chief Executive</p>
                  <p className="text-white/70 text-sm">Mr. Martin Mokgware</p>
                </div>
              </AnimatedSection>

              {/* Connector line */}
              <div className="w-px h-8 bg-gray-300" />

              {/* Horizontal connector */}
              <div className="hidden md:block w-full max-w-4xl border-t-2 border-gray-200" />

              {/* Department cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2 w-full">
                {departments.map((dept, i) => (
                  <AnimatedSection key={dept.name} animation="fade-up" delay={200 + i * 80}>
                    <div className="relative">
                      {/* Vertical connector */}
                      <div className="hidden md:block absolute -top-2 left-1/2 w-px h-2 bg-gray-200 -translate-x-1/2" />
                      <Card className="border-gray-100 shadow-sm h-full">
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold text-bocra-navy text-xs mb-1">
                            {dept.name}
                          </h3>
                          <p className="text-[11px] text-gray-400 leading-relaxed">
                            {dept.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-bocra-blue py-12">
          <AnimatedSection animation="fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">
                Get in Touch
              </h3>
              <p className="text-white/70 text-sm mt-1">
                For general enquiries, contact BOCRA at info@bocra.org.bw or
                +267 395 7755.
              </p>
            </div>
            <Link
              href="/about"
              className="shrink-0 px-6 py-3 bg-bocra-gold hover:bg-bocra-gold/90 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              About BOCRA
            </Link>
          </div>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
