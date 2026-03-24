package com.bocra.backend;

import com.bocra.backend.news.NewsArticle;
import com.bocra.backend.news.NewsArticleRepository;
import com.bocra.backend.news.NewsCategory;
import com.bocra.backend.operator.*;
import com.bocra.backend.publication.*;
import com.bocra.backend.speech.Speech;
import com.bocra.backend.speech.SpeechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;


@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final OperatorRepository operatorRepository;
    private final PublicationRepository publicationRepository;
    private final NewsArticleRepository newsArticleRepository;
    private final SpeechRepository speechRepository;

    @Override
    public void run(String... args) {
        seedOperators();
        seedPublications();
        seedNews();
        seedSpeeches();
    }

    private void seedOperators() {
        if (operatorRepository.count() > 0) return;

        List<Operator> operators = List.of(
                Operator.builder()
                        .operatorName("Botswana Telecommunications Corporation Limited")
                        .shortName("BTC")
                        .licenceNumber("BOC-2013-NFP-001")
                        .category(LicenceCategory.NFP)
                        .categoryFull("Network Facilities Provider")
                        .subCategory("NFP-N (National)")
                        .status(LicenceStatus.ACTIVE)
                        .issuedAt(LocalDate.of(2013, 4, 1))
                        .expiresAt(LocalDate.of(2026, 3, 31))
                        .complianceStatus(ComplianceStatus.COMPLIANT)
                        .services(List.of("Fixed Line Telephony", "Mobile (beMOBILE)", "Broadband Internet"))
                        .address("BTC House, Plot 50671, Independence Avenue, Gaborone")
                        .website("www.btc.bw")
                        .build(),
                Operator.builder()
                        .operatorName("Mascom Wireless Botswana (Pty) Ltd")
                        .shortName("Mascom")
                        .licenceNumber("BOC-2013-NFP-002")
                        .category(LicenceCategory.NFP)
                        .categoryFull("Network Facilities Provider")
                        .subCategory("NFP-N (National)")
                        .status(LicenceStatus.ACTIVE)
                        .issuedAt(LocalDate.of(2013, 4, 1))
                        .expiresAt(LocalDate.of(2026, 3, 31))
                        .complianceStatus(ComplianceStatus.COMPLIANT)
                        .services(List.of("Mobile Voice", "Mobile Data", "4G LTE", "USSD Services"))
                        .address("Plot 50374, Fairground Office Park, Gaborone")
                        .website("www.mascom.bw")
                        .build(),
                Operator.builder()
                        .operatorName("Orange Botswana (Pty) Ltd")
                        .shortName("Orange")
                        .licenceNumber("BOC-2013-NFP-003")
                        .category(LicenceCategory.NFP)
                        .categoryFull("Network Facilities Provider")
                        .subCategory("NFP-N (National)")
                        .status(LicenceStatus.ACTIVE)
                        .issuedAt(LocalDate.of(2013, 4, 1))
                        .expiresAt(LocalDate.of(2026, 3, 31))
                        .complianceStatus(ComplianceStatus.COMPLIANT)
                        .services(List.of("Mobile Voice", "Mobile Data", "4G LTE", "Fibre"))
                        .address("Orange House, Plot 50672, Independence Avenue, Gaborone")
                        .website("www.orange.co.bw")
                        .build(),
                Operator.builder()
                        .operatorName("Botswana Fibre Networks (Pty) Ltd")
                        .shortName("BoFiNet")
                        .licenceNumber("BOC-2013-NFP-004")
                        .category(LicenceCategory.NFP)
                        .categoryFull("Network Facilities Provider")
                        .subCategory("NFP-N (National) — Wholesale")
                        .status(LicenceStatus.ACTIVE)
                        .issuedAt(LocalDate.of(2013, 9, 1))
                        .expiresAt(LocalDate.of(2026, 8, 31))
                        .complianceStatus(ComplianceStatus.COMPLIANT)
                        .services(List.of("Wholesale Fibre", "International Bandwidth", "National Backbone"))
                        .address("Plot 54675, CBD, Gaborone")
                        .website("www.bofinet.co.bw")
                        .build(),
                Operator.builder()
                        .operatorName("Botswana Postal Services")
                        .shortName("Botswana Post")
                        .licenceNumber("BOC-2013-POST-001")
                        .category(LicenceCategory.POSTAL)
                        .categoryFull("Postal Service Licence")
                        .subCategory("National Postal Operator")
                        .status(LicenceStatus.ACTIVE)
                        .issuedAt(LocalDate.of(2013, 4, 1))
                        .expiresAt(LocalDate.of(2026, 3, 31))
                        .complianceStatus(ComplianceStatus.COMPLIANT)
                        .services(List.of("Letter Mail", "Parcels", "Express Mail Service", "Financial Services"))
                        .address("Khama Crescent, Gaborone")
                        .website("www.botspost.co.bw")
                        .build(),
                Operator.builder()
                        .operatorName("Yarona FM")
                        .shortName("Yarona FM")
                        .licenceNumber("BOC-2015-BRD-001")
                        .category(LicenceCategory.BROADCASTING)
                        .categoryFull("Broadcasting Licence")
                        .subCategory("Commercial Radio — National")
                        .status(LicenceStatus.ACTIVE)
                        .issuedAt(LocalDate.of(2015, 1, 1))
                        .expiresAt(LocalDate.of(2027, 12, 31))
                        .complianceStatus(ComplianceStatus.COMPLIANT)
                        .services(List.of("FM Radio Broadcasting", "Online Streaming"))
                        .address("Plot 16, Fairground, Gaborone")
                        .website("www.yaronafm.co.bw")
                        .build(),
                Operator.builder()
                        .operatorName("Duma FM")
                        .shortName("Duma FM")
                        .licenceNumber("BOC-2015-BRD-002")
                        .category(LicenceCategory.BROADCASTING)
                        .categoryFull("Broadcasting Licence")
                        .subCategory("Commercial Radio — National")
                        .status(LicenceStatus.ACTIVE)
                        .issuedAt(LocalDate.of(2015, 1, 1))
                        .expiresAt(LocalDate.of(2027, 12, 31))
                        .complianceStatus(ComplianceStatus.UNDER_REVIEW)
                        .services(List.of("FM Radio Broadcasting"))
                        .address("Gaborone, Botswana")
                        .website("www.dumafm.co.bw")
                        .build(),
                Operator.builder()
                        .operatorName("eBotswana TV")
                        .shortName("eBotswana")
                        .licenceNumber("BOC-2015-BRD-003")
                        .category(LicenceCategory.BROADCASTING)
                        .categoryFull("Broadcasting Licence")
                        .subCategory("Commercial Television — National")
                        .status(LicenceStatus.ACTIVE)
                        .issuedAt(LocalDate.of(2015, 6, 1))
                        .expiresAt(LocalDate.of(2027, 5, 31))
                        .complianceStatus(ComplianceStatus.COMPLIANT)
                        .services(List.of("Free-to-Air Television", "Online Streaming"))
                        .address("Plot 54675, Gaborone")
                        .website("www.ebotswana.co.bw")
                        .build()
        );

        operatorRepository.saveAll(operators);
        System.out.println("Operators seeded successfully");
    }

    private void seedPublications() {
        if (publicationRepository.count() > 0) return;

        List<Publication> publications = List.of(
                Publication.builder()
                        .title("BOCRA Annual Report 2024")
                        .type(PublicationType.ANNUAL_REPORT)
                        .fileUrl("/publications/bocra-annual-report-2024.pdf")
                        .publishedAt(LocalDate.of(2025, 3, 1))
                        .description("BOCRA's comprehensive annual report covering regulatory activities and financial performance for 2024.")
                        .build(),
                Publication.builder()
                        .title("QoS Monitoring Report — Q4 2025")
                        .type(PublicationType.QOS_REPORT)
                        .fileUrl("/publications/qos-q4-2025.pdf")
                        .publishedAt(LocalDate.of(2026, 1, 15))
                        .description("Quality of Service monitoring results for mobile and fixed broadband operators, Q4 2025.")
                        .build(),
                Publication.builder()
                        .title("Communications Regulatory Authority Act, 2012")
                        .type(PublicationType.LEGISLATION)
                        .fileUrl("/publications/cra-act-2012.pdf")
                        .publishedAt(LocalDate.of(2013, 4, 1))
                        .description("The primary legislation governing BOCRA's mandate and regulatory powers.")
                        .build(),
                Publication.builder()
                        .title("Botswana Data Protection Act, 2024")
                        .type(PublicationType.LEGISLATION)
                        .fileUrl("/publications/bdpa-2024.pdf")
                        .publishedAt(LocalDate.of(2024, 10, 29))
                        .description("Data protection legislation replacing the 2018 Act. In effect from 29 October 2024.")
                        .build(),
                Publication.builder()
                        .title("Draft National Spectrum Policy 2026 — Public Consultation")
                        .type(PublicationType.CONSULTATION)
                        .fileUrl("/publications/draft-spectrum-policy-2026.pdf")
                        .publishedAt(LocalDate.of(2026, 3, 1))
                        .description("BOCRA invites public comment on the revised National Frequency Allocation Plan.")
                        .build(),
                Publication.builder()
                        .title("ICT Licensing Framework — Converged Framework 2015")
                        .type(PublicationType.LEGISLATION)
                        .fileUrl("/publications/ict-licensing-framework-2015.pdf")
                        .publishedAt(LocalDate.of(2015, 9, 1))
                        .description("The converged NFP/SAP licensing framework implemented September 2015.")
                        .build(),
                Publication.builder()
                        .title("BOCRA Strategic Plan 2024–2029")
                        .type(PublicationType.ANNUAL_REPORT)
                        .fileUrl("/publications/strategic-plan-2024-2029.pdf")
                        .publishedAt(LocalDate.of(2024, 6, 1))
                        .description("BOCRA's five-year strategic plan focused on digital transformation.")
                        .build(),
                Publication.builder()
                        .title("QoS Guidelines for Mobile Broadband Services")
                        .type(PublicationType.QOS_REPORT)
                        .fileUrl("/publications/qos-guidelines-mobile-broadband.pdf")
                        .publishedAt(LocalDate.of(2026, 3, 10))
                        .description("Updated Quality of Service guidelines for mobile broadband. Operators must comply by 1 June 2026.")
                        .build(),
                Publication.builder()
                        .title("Tender: BOCRA Website Redevelopment")
                        .type(PublicationType.TENDER)
                        .fileUrl("/publications/tender-website-redevelopment-2026.pdf")
                        .publishedAt(LocalDate.of(2026, 3, 5))
                        .description("Design, development, deployment and maintenance of the BOCRA website.")
                        .build(),
                Publication.builder()
                        .title("Consumer Protection Guidelines 2023")
                        .type(PublicationType.NOTICE)
                        .fileUrl("/publications/consumer-protection-guidelines-2023.pdf")
                        .publishedAt(LocalDate.of(2023, 7, 1))
                        .description("Guidelines for consumer protection in the communications sector.")
                        .build()
        );

        publicationRepository.saveAll(publications);
        System.out.println("Publications seeded successfully");
    }

    private void seedNews() {
        if (newsArticleRepository.count() > 0) return;

        List<NewsArticle> articles = List.of(
                NewsArticle.builder()
                        .title("BOCRA Publishes Draft National Spectrum Policy 2026 for Public Consultation")
                        .category(NewsCategory.CONSULTATION)
                        .excerpt("The Botswana Communications Regulatory Authority invites all stakeholders and members of the public to submit written comments on the Draft National Frequency Allocation Plan. The consultation period closes on 30 April 2026.")
                        .publishedAt(LocalDate.of(2026, 3, 15))
                        .slug("draft-spectrum-policy-2026-consultation")
                        .build(),
                NewsArticle.builder()
                        .title("Quality of Service Monitoring Results for Q4 2025 Released")
                        .category(NewsCategory.PRESS_RELEASE)
                        .excerpt("BOCRA has released the QoS monitoring results for mobile and fixed broadband operators for Q4 2025. Key metrics include network availability, call drop rates, and average data speeds across all licensed operators.")
                        .publishedAt(LocalDate.of(2026, 3, 10))
                        .slug("qos-q4-2025-results")
                        .build(),
                NewsArticle.builder()
                        .title("Tender: Procurement of Automated Spectrum Management System Upgrade")
                        .category(NewsCategory.TENDER)
                        .excerpt("BOCRA invites qualified bidders to submit proposals for the upgrade of the Automated Spectrum Management System (ASMS) at Spectrum House, Gaborone. Closing date: 18 April 2026.")
                        .publishedAt(LocalDate.of(2026, 3, 8))
                        .slug("tender-asms-upgrade-2026")
                        .build(),
                NewsArticle.builder()
                        .title("BOCRA Warns Against Unlicensed Broadcasting Operations")
                        .category(NewsCategory.PUBLIC_NOTICE)
                        .excerpt("BOCRA reminds the public that operating a broadcasting station without a valid licence is an offence under the Communications Regulatory Authority Act, 2012. Enforcement action will be taken against offenders.")
                        .publishedAt(LocalDate.of(2026, 3, 1))
                        .slug("warning-unlicensed-broadcasting")
                        .build(),
                NewsArticle.builder()
                        .title("Stakeholder Workshop on .bw Domain Name Policy Review")
                        .category(NewsCategory.EVENT)
                        .excerpt("BOCRA will host a stakeholder workshop on 25 March 2026 at Gaborone International Convention Centre to discuss proposed amendments to the .bw ccTLD domain name policy framework.")
                        .publishedAt(LocalDate.of(2026, 2, 20))
                        .slug("bw-domain-policy-workshop")
                        .build(),
                NewsArticle.builder()
                        .title("BOCRA and BERA Sign MoU on Cybersecurity Cooperation")
                        .category(NewsCategory.ANNOUNCEMENT)
                        .excerpt("BOCRA and the Botswana Energy Regulatory Authority (BERA) have signed a Memorandum of Understanding to collaborate on cybersecurity standards for critical infrastructure in the energy and communications sectors.")
                        .publishedAt(LocalDate.of(2026, 2, 14))
                        .slug("bocra-bera-cybersecurity-mou")
                        .build(),
                NewsArticle.builder()
                        .title("Public Notice: SIM Card Re-registration Deadline Extended to 30 June 2026")
                        .category(NewsCategory.PUBLIC_NOTICE)
                        .excerpt("BOCRA has extended the deadline for SIM card re-registration to 30 June 2026. All subscribers who have not re-registered their SIM cards are urged to do so at their nearest operator outlet.")
                        .publishedAt(LocalDate.of(2026, 2, 1))
                        .slug("sim-reregistration-deadline-extension")
                        .build(),
                NewsArticle.builder()
                        .title("BOCRA Annual Report 2024 Now Available for Download")
                        .category(NewsCategory.ANNOUNCEMENT)
                        .excerpt("The BOCRA Annual Report 2024 is now available for download. The report covers regulatory activities, market developments, financial performance, and the strategic outlook for the communications sector.")
                        .publishedAt(LocalDate.of(2026, 1, 20))
                        .slug("annual-report-2024-available")
                        .build(),
                NewsArticle.builder()
                        .title("Consultation on Proposed Mobile Termination Rate Reduction")
                        .category(NewsCategory.CONSULTATION)
                        .excerpt("BOCRA is seeking public input on a proposed reduction to mobile termination rates (MTR) effective 1 July 2026. The proposed rates aim to lower the cost of interconnection and benefit consumers.")
                        .publishedAt(LocalDate.of(2026, 1, 10))
                        .slug("mtr-reduction-consultation")
                        .build()
        );

        newsArticleRepository.saveAll(articles);
        System.out.println("News articles seeded successfully");
    }

    private void seedSpeeches() {
        if (speechRepository.count() > 0) return;

        List<Speech> speeches = List.of(
                Speech.builder()
                        .title("Keynote Address: Digital Transformation and the Future of Regulation in Botswana")
                        .speaker("Martin Mokgware")
                        .speakerRole("Chief Executive, BOCRA")
                        .event("Botswana Digital Transformation Conference 2026")
                        .venue("Gaborone International Convention Centre")
                        .date(LocalDate.of(2026, 3, 12))
                        .excerpt("The digital economy requires regulators to be agile and forward-thinking. BOCRA is committed to creating an enabling environment for innovation while ensuring consumer protection and fair competition in the converged communications landscape.")
                        .slug("digital-transformation-future-regulation")
                        .build(),
                Speech.builder()
                        .title("Opening Remarks at the SADC ICT Ministers Forum")
                        .speaker("Martin Mokgware")
                        .speakerRole("Chief Executive, BOCRA")
                        .event("SADC ICT Ministers Forum")
                        .venue("Kasane, Botswana")
                        .date(LocalDate.of(2026, 2, 18))
                        .excerpt("Regional harmonisation of ICT policies is essential for cross-border digital trade. Botswana's converged licensing framework and spectrum management practices offer a model for SADC member states seeking to modernise their regulatory environments.")
                        .slug("sadc-ict-ministers-opening-remarks")
                        .build(),
                Speech.builder()
                        .title("Spectrum Management in the 5G Era: Challenges and Opportunities")
                        .speaker("Dr. Thari G. Pheko")
                        .speakerRole("Director of Spectrum Management, BOCRA")
                        .event("ITU Regional Radiocommunication Seminar (RRS-26)")
                        .venue("Virtual")
                        .date(LocalDate.of(2026, 1, 25))
                        .excerpt("As we prepare for 5G deployment, the allocation of mid-band spectrum in the 3.3-3.8 GHz range is a national priority. BOCRA's National Frequency Allocation Plan will be revised to accommodate new technologies while protecting existing services.")
                        .slug("spectrum-management-5g-era")
                        .build(),
                Speech.builder()
                        .title("Consumer Protection in a Digital Age")
                        .speaker("Martin Mokgware")
                        .speakerRole("Chief Executive, BOCRA")
                        .event("World Consumer Rights Day Commemoration")
                        .venue("GICC, Gaborone")
                        .date(LocalDate.of(2025, 11, 15))
                        .excerpt("With the Botswana Data Protection Act 2024 now in force, BOCRA has a dual mandate: to protect consumers from unfair practices by operators, and to ensure that personal data collected by licensed entities is processed lawfully and securely.")
                        .slug("consumer-protection-digital-age")
                        .build(),
                Speech.builder()
                        .title("Addressing the Digital Divide: Universal Access in Rural Botswana")
                        .speaker("Onkabetse Morapedi")
                        .speakerRole("Director of Universal Access and Service, BOCRA")
                        .event("Universal Access and Service Fund Stakeholder Summit")
                        .venue("Maun Lodge, Maun")
                        .date(LocalDate.of(2025, 9, 20))
                        .excerpt("The Universal Access and Service Fund has connected 48 underserved communities since 2014. Our next phase targets the remaining settlements with populations over 500, with a goal of 95% broadband coverage by 2029.")
                        .slug("digital-divide-universal-access")
                        .build(),
                Speech.builder()
                        .title("The Role of Data Protection in Telecommunications Regulation")
                        .speaker("Martin Mokgware")
                        .speakerRole("Chief Executive, BOCRA")
                        .event("Botswana Data Protection Conference")
                        .venue("Avani Hotel, Gaborone")
                        .date(LocalDate.of(2025, 7, 10))
                        .excerpt("The BDPA 2024 mandates that all data controllers, including licensed operators, implement appropriate technical and organisational measures to protect personal data. BOCRA will enforce these provisions as part of its licensing conditions.")
                        .slug("data-protection-telecoms-regulation")
                        .build()
        );

        speechRepository.saveAll(speeches);
        System.out.println("Speeches seeded successfully");
    }
}
