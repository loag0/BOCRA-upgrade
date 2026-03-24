import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Radio,
  Mail,
  Wifi,
  Activity,
  Globe,
  CheckSquare,
  Shield,
  Scale,
  Eye,
  Target,
  Users,
  Landmark,
  ChevronRight,
  BookOpen,
  FileText,
  ArrowRight,
  Lock,
  Database,
  UserCheck,
  Trash2,
  ShieldCheck,
  MailOpen,
  Ban,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/animated-section";

export const metadata = {
  title: "About BOCRA - Who We Are",
  description:
    "Learn about the Botswana Communications Regulatory Authority (BOCRA), established under the CRA Act 2012 to regulate telecommunications, broadcasting, postal, internet, spectrum, and .bw domains.",
};

const mandate = [
  {
    icon: Phone,
    title: "Telecommunications",
    description:
      "Regulates Public Telecommunications Operators (PTOs) including BTC, Mascom, and Orange Botswana, as well as VANS and VoIP providers under the converged NFP/SAP licensing framework.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Radio,
    title: "Broadcasting",
    description:
      "Regulates all commercial broadcasting. Licensed stations include Yarona FM, Duma FM, Gabz FM, and eBotswana TV. Enforces local content quotas on all licensees.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Mail,
    title: "Postal Services",
    description:
      "Ensures safe, reliable, and affordable postal services nationwide. Prohibits provision of postal services without a valid BOCRA licence.",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Wifi,
    title: "Internet & ICT",
    description:
      "Oversees ISPs and the broader ICT sector. The internet telephony market is fully liberalised, with VANS providing VoIP under the SAP licensing framework.",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Activity,
    title: "Radio Spectrum",
    description:
      "Administers the National Radio Frequency Plan and spectrum allocation. Operates the Automated Spectrum Management System (ASMS) from Spectrum House.",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: Globe,
    title: ".bw ccTLD",
    description:
      "Mandated under Section 38(1) of the CRA Act to manage and operate the .BW country code top-level domain as a national resource.",
    color: "bg-teal-500/10 text-teal-500",
  },
  {
    icon: CheckSquare,
    title: "Type Approval",
    description:
      "All radio and telecommunications equipment used in Botswana must be BOCRA type-approved before it can be connected, used, or sold. Equipment must comply with ITU Region 1 standards.",
    color: "bg-rose-500/10 text-rose-500",
  },
];

const legislation = [
  {
    title: "Communications Regulatory Authority Act, 2012",
    description: "The founding legislation that established BOCRA on 1 April 2013, consolidating three previous regulators into one authority.",
    year: "2012",
  },
  {
    title: "Botswana Data Protection Act, 2024 (BDPA)",
    description: "Came into effect 29 October 2024. BOCRA as a data controller must comply with BDPA for all citizen data it collects.",
    year: "2024",
    highlight: true,
  },
  {
    title: "Electronic Records (Evidence) Act No. 13",
    description: "BOCRA establishes approved processes for production of electronic documents and certifies electronic records systems for court admissibility.",
    year: "2014",
  },
  {
    title: "Electronic Communications and Transactions Act",
    description: "BOCRA accredits secure digital signature service providers and administers takedown notices for online content.",
    year: "2014",
  },
];

const bdpaRights = [
  {
    icon: Lock,
    title: "Lawful Processing",
    description: "Your personal data is only processed when there is a lawful basis, such as your consent, a contractual obligation, or a legal requirement under the CRA Act.",
  },
  {
    icon: Database,
    title: "Data Minimisation",
    description: "We collect only the minimum personal data necessary to fulfil the purpose for which it is collected. Data is retained only as long as necessary or as required by law.",
  },
  {
    icon: UserCheck,
    title: "Right to Access & Correction",
    description: "You may request information about the personal data BOCRA holds about you, and seek corrections if any data is inaccurate or incomplete.",
  },
  {
    icon: Trash2,
    title: "Right to Erasure",
    description: "You may request the deletion of your personal data where it is no longer necessary for its original purpose, or withdraw your consent at any time.",
  },
  {
    icon: Ban,
    title: "Restrict Processing",
    description: "You have the right to restrict the processing of your personal data in certain circumstances, including where accuracy is contested.",
  },
  {
    icon: ShieldCheck,
    title: "Security Safeguards",
    description: "BOCRA protects your data with encryption, regular security audits, access controls, IT monitoring, and background checks for staff handling personal data.",
  },
];

const strategicPillars = [
  { title: "Competition", description: "Promoting fair market competition across all regulated sectors" },
  { title: "Universal Access", description: "Ensuring communications services reach every Motswana, including rural areas" },
  { title: "Consumer Protection", description: "Safeguarding the rights and interests of all service consumers" },
  { title: "Resource Optimisation", description: "Efficient management of spectrum, numbering, and other national resources" },
  { title: "Talent Management", description: "Building and retaining world-class regulatory expertise" },
  { title: "Stakeholder Engagement", description: "Maintaining transparent dialogue with industry, government, and the public" },
];

const timeline = [
  {
    year: "1996",
    title: "Telecommunications Act",
    description: "Approval of the Telecommunications Act [No. 15 of 1996], commencing market liberalisation of Botswana's telecoms sector.",
  },
  {
    year: "1997",
    title: "BTA Established",
    description: "The Botswana Telecommunications Authority (BTA) is established with Swedish Management Group assistance. Mobile service procurement tender published.",
  },
  {
    year: "1998",
    title: "First Mobile Licences",
    description: "First fifteen-year mobile licences awarded to Mascom Wireless and Vista Cellular (Orange Botswana) with 10-year exclusivity.",
  },
  {
    year: "1999",
    title: "FM Radio & ISPs",
    description: "First commercial FM stations licensed (Yarona FM, Gabz-FM). Initial ISP licences awarded, opening up internet services.",
  },
  {
    year: "2001",
    title: "ITU Recognition",
    description: "Seven-digit numbering plan implemented. ITU declares BTA a best practice regulatory model internationally.",
  },
  {
    year: "2007",
    title: "Service Neutral Licensing",
    description: "Service Neutral Licensing introduced. BTC launches beMOBILE mobile service, entering the mobile market.",
  },
  {
    year: "2009",
    title: "Spectrum Monitoring",
    description: "Spectrum monitoring facility opened. SIM card registration begins. Comprehensive market study conducted.",
  },
  {
    year: "2012",
    title: "CRA Act Enacted",
    description: "Parliament passes the Communications Regulatory Authority Act, 2012, enabling converged regulation of all communications sectors.",
  },
  {
    year: "2013",
    title: "BOCRA Established",
    description: "BOCRA comes into force on 1 April 2013, consolidating BTA, the Broadcasting Authority, and the Postal Regulator. BTC structurally separated into BTCL (retail) and BoFiNet (wholesale).",
  },
  {
    year: "2014",
    title: "UASF & Electronic Acts",
    description: "Universal Access and Service Fund created. Parliament passes the Electronic Records (Evidence) Act and Electronic Communications and Transactions Act.",
  },
  {
    year: "2015",
    title: "Converged Licensing",
    description: "New ICT Licensing Framework implemented with the converged NFP/SAP model. Regional SADC retail roaming tariff reductions. BTCL listed on the Botswana Stock Exchange.",
  },
  {
    year: "2016",
    title: "International Events",
    description: "Botswana hosts the Africa Internet Summit (AIS16) and ITU World Telecommunication Indicators Symposium (WTIS).",
  },
  {
    year: "2024",
    title: "Data Protection Act",
    description: "The Botswana Data Protection Act (BDPA) comes into effect on 29 October 2024, establishing data protection obligations for all data controllers including BOCRA.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero strip */}
        <section className="relative bg-bocra-navy pt-24 pb-16 overflow-hidden">
          <Image
            src="/images/hero-cityscape.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bocra-navy/60 to-bocra-navy" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>
                <li className="text-white/70 font-medium">About BOCRA</li>
              </ol>
            </nav>

            <AnimatedSection animation="fade-up" delay={0}>
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Who We Are
              </Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
                Botswana Communications Regulatory Authority
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                An independent statutory body established under the Communications
                Regulatory Authority Act, 2012, safeguarding Botswana&apos;s
                communications landscape and protecting consumers.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="bg-white py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection animation="fade-up" delay={0}>
                <Card className="border-gray-100 shadow-sm h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-bocra-navy/10 flex items-center justify-center mb-5">
                      <Eye className="w-6 h-6 text-bocra-navy" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-bocra-navy mb-3">
                      Our Vision
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      A connected and Digitally Driven Society.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={150}>
                <Card className="border-gray-100 shadow-sm h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-bocra-gold/10 flex items-center justify-center mb-5">
                      <Target className="w-6 h-6 text-bocra-gold" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-bocra-navy mb-3">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      To regulate the Communications sector for the promotion of
                      competition, innovation, consumer protection and universal
                      access.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <Card className="border-gray-100 shadow-sm h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-bocra-blue/10 flex items-center justify-center mb-5">
                      <Scale className="w-6 h-6 text-bocra-blue" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-bocra-navy mb-3">
                      Our Values
                    </h3>
                    <ul className="text-gray-600 leading-relaxed space-y-2">
                      <li><span className="font-semibold text-bocra-navy">Excellence</span> - Striving to be a world-class regulatory services provider</li>
                      <li><span className="font-semibold text-bocra-navy">Proactiveness</span> - Forward-looking approach to keep pace with industry trends</li>
                      <li><span className="font-semibold text-bocra-navy">Integrity</span> - Demonstrating openness, honesty, and accountability</li>
                      <li><span className="font-semibold text-bocra-navy">People</span> - Recognising employees as key to organisational success</li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Strategic Pillars */}
        <section className="bg-bocra-surface py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                  Key Success Factors
                </Badge>
                <h2 className="font-heading text-2xl font-bold text-bocra-navy">
                  Strategic Pillars
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {strategicPillars.map(({ title, description }, i) => (
                <AnimatedSection key={title} animation="fade-up" delay={i * 80}>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm h-full">
                    <h3 className="font-semibold text-bocra-navy text-sm mb-1">{title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* About BOCRA text */}
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <AnimatedSection animation="fade-left" className="lg:col-span-3">
                <Badge className="mb-4 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                  Establishment
                </Badge>
                <h2 className="font-heading text-3xl font-bold text-bocra-navy mb-6">
                  Regulating Botswana&apos;s Communications Since 2013
                </h2>
                <div className="prose prose-gray max-w-none space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    BOCRA was established on 1 April 2013 under the Communications
                    Regulatory Authority Act, 2012. It replaced and consolidated three
                    previous regulators: the Botswana Telecommunications Authority (BTA),
                    the broadcasting regulator under the Broadcasting Act [Cap 72:04], and
                    the postal regulator under the Postal Services Act.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Headquartered at Plot 50671, Independence Avenue, Gaborone (Spectrum
                    House), BOCRA regulates six communications sectors:
                    telecommunications, broadcasting, postal services, internet and ICT,
                    radio spectrum, and the .bw country code top-level domain.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    BOCRA&apos;s Strategic Plan 2024-2029 focuses on digital transformation,
                    with the objective of placing Botswana at the centre of the global
                    digital economy. This aligns with Botswana&apos;s national Vision 2036
                    and the National Transformation Strategy 2023-2030.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-right" className="lg:col-span-2">
                <Card className="border-gray-100 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-bold text-bocra-navy mb-4">
                      Key Facts
                    </h3>
                    <dl className="space-y-4">
                      {[
                        { label: "Established", value: "1 April 2013" },
                        { label: "Governing Law", value: "CRA Act, 2012" },
                        { label: "Headquarters", value: "Spectrum House, Gaborone" },
                        { label: "Sectors Regulated", value: "6 communications sectors" },
                        { label: "Strategic Plan", value: "2024 - 2029" },
                        { label: "Contact", value: "+267 395 7755" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-start gap-4">
                          <dt className="text-sm text-gray-500 shrink-0">{label}</dt>
                          <dd className="text-sm font-semibold text-bocra-navy text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Separator className="my-5" />
                    <div className="text-sm text-gray-500">
                      <p className="font-medium text-bocra-navy mb-1">Address</p>
                      <p>Plot 50671, Independence Avenue</p>
                      <p>P/Bag 00495</p>
                      <p>Gaborone, Botswana</p>
                      <Separator className="my-3" />
                      <p>
                        <a href="mailto:info@bocra.org.bw" className="hover:text-bocra-navy transition-colors">
                          info@bocra.org.bw
                        </a>
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">Fax: +267 395 7976</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CEO Message */}
        <section className="bg-bocra-blue/5 py-14 border-y border-gray-100">
          <AnimatedSection animation="fade-in">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-bocra-navy/10 flex items-center justify-center mx-auto mb-5">
                <span className="text-bocra-navy font-bold text-xl">MM</span>
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-4">
                &ldquo;I invite you to explore and provide feedback on your user
                experience. Your insights are crucial in helping us improve this
                platform in a way that meets your expectations.&rdquo;
              </blockquote>
              <p className="font-semibold text-bocra-navy">Martin Mokgware</p>
              <p className="text-sm text-gray-500">Chief Executive, BOCRA</p>
            </div>
          </AnimatedSection>
        </section>

        {/* Timeline */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                  Our Journey
                </Badge>
                <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                  Key Milestones
                </h2>
              </div>
            </AnimatedSection>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <AnimatedSection key={item.year} animation={i % 2 === 0 ? "fade-left" : "fade-right"} delay={i * 80}>
                    <div
                      className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
                        i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-bocra-gold border-2 border-white -translate-x-1/2 mt-1.5 z-10 shadow-sm" />

                      {/* Content */}
                      <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-4" : "md:text-left md:pl-4"}`}>
                        <span className="inline-block text-xs font-bold text-bocra-gold bg-bocra-gold/10 px-2.5 py-1 rounded-full mb-2">
                          {item.year}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-bocra-navy mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Spacer for the other side */}
                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Mandate */}
        <section className="bg-bocra-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                Regulatory Mandate
              </Badge>
              <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                Six Sectors, One Regulator
              </h2>
              <p className="mt-3 text-gray-500 max-w-lg">
                BOCRA&apos;s mandate spans six communications sectors under the CRA
                Act 2012, plus .bw ccTLD administration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mandate.map(({ icon: Icon, title, description, color }, i) => (
                <AnimatedSection key={title} animation="fade-up" delay={i * 75}>
                  <Card className="border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-4`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-bocra-navy mb-2">{title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Mandates */}
        <section className="bg-white py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* UASF */}
              <AnimatedSection animation="fade-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-bocra-navy">
                    Universal Access & Service Fund
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  BOCRA operates the Universal Access and Service Fund (UASF),
                  funded by levies on licensed operators. The fund finances rural
                  connectivity projects including the Schools Connectivity
                  Programme, bringing broadband to primary schools in Ghanzi,
                  Kgalagadi, and Southern districts.
                </p>
              </AnimatedSection>

              {/* COMM-CIRT */}
              <AnimatedSection animation="fade-right">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-bocra-navy">
                    COMM-CIRT
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  BOCRA operates the Communications Sector Computer Incident
                  Response Team (COMM-CIRT), acting as the national cybersecurity
                  focal point for the communications sector until a national
                  BWCIRT is established. COMM-CIRT handles incident response,
                  threat intelligence, and cybersecurity awareness.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Legislation */}
        <section className="bg-bocra-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                Legal Framework
              </Badge>
              <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                Governing Legislation
              </h2>
              <p className="mt-3 text-gray-500 max-w-lg">
                BOCRA&apos;s powers and responsibilities are defined by multiple Acts
                of Parliament.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {legislation.map(({ title, description, year, highlight }, i) => (
                <AnimatedSection key={title} animation="fade-up" delay={i * 100}>
                  <Card
                    className={`border-gray-100 bg-white shadow-sm h-full ${
                      highlight ? "ring-2 ring-bocra-gold/30" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-bocra-navy/10 flex items-center justify-center shrink-0">
                          <Landmark className="w-5 h-5 text-bocra-navy" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-bocra-navy text-sm">
                              {title}
                            </h3>
                            {highlight && (
                              <Badge className="bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-[10px]">
                                Key
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mb-2">Enacted {year}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {description}
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

        {/* BDPA Data Protection Section */}
        <section className="bg-bocra-navy py-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`,
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <Badge className="mb-3 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                  Data Protection
                </Badge>
                <h2 className="font-heading text-3xl font-bold text-white mb-3">
                  Botswana Data Protection Act, 2024
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
                  The BDPA came into effect on 29 October 2024, replacing the 2018
                  Act. As a data controller, BOCRA is fully committed to
                  protecting your personal data in compliance with the Act.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bdpaRights.map(({ icon: Icon, title, description }, i) => (
                <AnimatedSection key={title} animation="fade-up" delay={i * 100}>
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-bocra-gold/20 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-bocra-gold" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            {/* Data we collect + No selling + Contact */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-white/70 text-sm leading-relaxed">
                <h4 className="text-white font-semibold mb-2">What we collect</h4>
                <p>
                  Names, contact details, and service-related data from customers
                  using BOCRA services (complaints, licence applications, domain
                  registration). Contact and banking details from suppliers and
                  vendors. Building security data at BOCRA premises.
                </p>
              </div>
              <div className="text-white/70 text-sm leading-relaxed">
                <h4 className="text-white font-semibold mb-2">How we share data</h4>
                <p>
                  We do not sell your information to third parties. Data may be
                  shared with government entities (tax, law enforcement when
                  legally required), authorised service providers (pension, medical,
                  security), and legal entities in proceedings. You may lodge
                  complaints with the Information and Data Protection Commissioner.
                </p>
              </div>
              <div>
                <Card className="bg-white/10 border-white/15">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-bocra-gold/20 flex items-center justify-center shrink-0">
                        <MailOpen className="w-4 h-4 text-bocra-gold" />
                      </div>
                      <h4 className="text-white font-semibold text-sm">
                        Data Protection Contact
                      </h4>
                    </div>
                    <p className="text-white/70 text-sm mb-2">
                      For data protection queries, access requests, or to exercise
                      your rights under the BDPA:
                    </p>
                    <a
                      href="mailto:dataprotection@bocra.org.bw"
                      className="text-bocra-gold hover:text-bocra-gold/80 text-sm font-semibold transition-colors"
                    >
                      dataprotection@bocra.org.bw
                    </a>
                    <p className="text-white/50 text-xs mt-1">
                      +267 368 5432 / +267 368 5516
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl font-bold text-bocra-navy">
                Explore More
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Users,
                  title: "Board & Management",
                  description: "Meet the BOCRA Board members and senior management team.",
                  href: "/about/board",
                },
                {
                  icon: BookOpen,
                  title: "Publications",
                  description: "Annual reports, QoS reports, legislation, and consultation papers.",
                  href: "/publications",
                },
                {
                  icon: FileText,
                  title: "Strategic Plan",
                  description: "BOCRA's Strategic Plan 2024-2029 and digital transformation agenda.",
                  href: "/publications?type=strategy",
                },
                {
                  icon: Shield,
                  title: "COMM-CIRT",
                  description: "Cybersecurity advisories and incident reporting for the communications sector.",
                  href: "/services/cybersecurity",
                },
              ].map(({ icon: Icon, title, description, href }, i) => (
                <AnimatedSection key={href} animation="fade-up" delay={i * 100}>
                  <Link href={href}>
                    <Card className="h-full border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="w-10 h-10 rounded-lg bg-bocra-navy/10 flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5 text-bocra-navy" />
                        </div>
                        <h3 className="font-semibold text-bocra-navy mb-1.5">{title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-3">
                          {description}
                        </p>
                        <span className="flex items-center gap-1 text-bocra-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
