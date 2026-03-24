package com.bocra.backend.licence;

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
    private String orgId;
    private LicenceType licenceType;
    private List<String> documents;
}