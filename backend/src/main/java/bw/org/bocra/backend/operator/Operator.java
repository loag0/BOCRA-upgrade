package bw.org.bocra.backend.operator;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "operators")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Operator {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String operatorName;

    @Column(nullable = false)
    private String shortName;

    @Column(unique = true, nullable = false)
    private String licenceNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LicenceCategory category;

    @Column(nullable = false)
    private String categoryFull;

    @Column(nullable = false)
    private String subCategory;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LicenceStatus status;

    @Column(nullable = false)
    private LocalDate issuedAt;

    @Column(nullable = false)
    private LocalDate expiresAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplianceStatus complianceStatus;

    @ElementCollection
    @CollectionTable(name = "operator_services", joinColumns = @JoinColumn(name = "operator_id"))
    @Column(name = "service")
    private List<String> services;

    @Column(nullable = false)
    private String address;

    private String website;
}
