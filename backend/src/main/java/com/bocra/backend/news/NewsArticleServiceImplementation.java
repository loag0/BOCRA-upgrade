package com.bocra.backend.news;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsArticleServiceImplementation implements NewsArticleService {

    private final NewsArticleRepository newsArticleRepository;

    @Override
    public NewsArticle createArticle(NewsArticleDTO dto) {
        NewsArticle article = NewsArticle.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .excerpt(dto.getExcerpt())
                .publishedAt(dto.getPublishedAt())
                .slug(dto.getSlug())
                .build();
        return newsArticleRepository.save(article);
    }

    @Override
    public NewsArticle getArticleById(String id) {
        return newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
    }

    @Override
    public NewsArticle getArticleBySlug(String slug) {
        return newsArticleRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Article not found with slug: " + slug));
    }

    @Override
    public List<NewsArticle> getAllArticles() {
        return newsArticleRepository.findAllByOrderByPublishedAtDesc();
    }

    @Override
    public List<NewsArticle> getArticlesByCategory(NewsCategory category) {
        return newsArticleRepository.findByCategory(category);
    }

    @Override
    public NewsArticle updateArticle(String id, NewsArticleDTO dto) {
        NewsArticle article = getArticleById(id);
        article.setTitle(dto.getTitle());
        article.setCategory(dto.getCategory());
        article.setExcerpt(dto.getExcerpt());
        article.setPublishedAt(dto.getPublishedAt());
        article.setSlug(dto.getSlug());
        return newsArticleRepository.save(article);
    }

    @Override
    public void deleteArticle(String id) {
        newsArticleRepository.deleteById(id);
    }
}