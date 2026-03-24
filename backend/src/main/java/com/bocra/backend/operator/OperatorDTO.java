package com.bocra.backend.operator;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperatorDTO {
    private String operatorName;
    private String shortName;
    private String licenceNumber;
    private LicenceCategory category;
    private String categoryFull;
    private String subCategory;
    private LicenceStatus status;
    private LocalDate issuedAt;
    private LocalDate expiresAt;
    private ComplianceStatus complianceStatus;
    private List<String> services;
    private String address;
    private String website;
}