package com.bocra.backend.complaint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintDTO {
    private String complainantName;
    private String complainantEmail;
    private String operator;
    private ComplaintCategory category;
    private String description;
}
