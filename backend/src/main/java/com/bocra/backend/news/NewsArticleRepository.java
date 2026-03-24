package com.bocra.backend.news;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, String> {
    Optional<NewsArticle> findBySlug(String slug);
    List<NewsArticle> findByCategory(NewsCategory category);
    List<NewsArticle> findAllByOrderByPublishedAtDesc();
}