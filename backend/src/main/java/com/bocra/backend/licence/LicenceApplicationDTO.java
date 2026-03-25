package com.bocra.backend.licence;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LicenceApplicationDTO {
    @NotBlank(message = "Organisation ID is required")
    @Size(max = 100, message = "Organisation ID must not exceed 100 characters")
    private String orgId;

    @NotNull(message = "Licence type is required")
    private LicenceType licenceType;

    private List<String> documents;
}
