package com.bocra.backend.news;

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
public class NewsArticleDTO {
    @NotBlank(message = "Title is required")
    @Size(max = 300, message = "Title must not exceed 300 characters")
    private String title;

    @NotNull(message = "Category is required")
    private NewsCategory category;

    @Size(max = 1000, message = "Excerpt must not exceed 1000 characters")
    private String excerpt;

    @NotNull(message = "Published date is required")
    private LocalDate publishedAt;

    @NotBlank(message = "Slug is required")
    @Size(max = 200, message = "Slug must not exceed 200 characters")
    private String slug;
}
