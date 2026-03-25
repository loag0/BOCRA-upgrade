package com.bocra.backend.operator;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @NotBlank(message = "Operator name is required")
    @Size(min = 2, max = 200, message = "Operator name must be between 2 and 200 characters")
    private String operatorName;

    @Size(max = 50, message = "Short name must not exceed 50 characters")
    private String shortName;

    @NotBlank(message = "Licence number is required")
    @Size(max = 50, message = "Licence number must not exceed 50 characters")
    private String licenceNumber;

    @NotNull(message = "Category is required")
    private LicenceCategory category;

    @Size(max = 200, message = "Category description must not exceed 200 characters")
    private String categoryFull;

    @Size(max = 200, message = "Sub-category must not exceed 200 characters")
    private String subCategory;

    @NotNull(message = "Status is required")
    private LicenceStatus status;

    @NotNull(message = "Issue date is required")
    private LocalDate issuedAt;

    @NotNull(message = "Expiry date is required")
    private LocalDate expiresAt;

    @NotNull(message = "Compliance status is required")
    private ComplianceStatus complianceStatus;

    private List<String> services;

    @Size(max = 500, message = "Address must not exceed 500 characters")
    private String address;

    @Size(max = 200, message = "Website must not exceed 200 characters")
    private String website;
}
