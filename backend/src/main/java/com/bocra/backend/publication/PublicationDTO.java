package com.bocra.backend.publication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublicationDTO {
    private String title;
    private PublicationType type;
    private String fileUrl;
    private LocalDate publishedAt;
    private String description;
}
