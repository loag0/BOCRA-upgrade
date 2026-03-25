package com.bocra.backend.publication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @NotBlank(message = "Title is required")
    @Size(max = 300, message = "Title must not exceed 300 characters")
    private String title;

    @NotNull(message = "Type is required")
    private PublicationType type;

    @Size(max = 500, message = "File URL must not exceed 500 characters")
    private String fileUrl;

    @NotNull(message = "Published date is required")
    private LocalDate publishedAt;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;
}
