package com.bocra.backend.news;

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
    private String title;
    private NewsCategory category;
    private String excerpt;
    private LocalDate publishedAt;
    private String slug;
}
