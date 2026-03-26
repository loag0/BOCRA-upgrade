package bw.org.bocra.backend.news;

import java.util.List;

public interface NewsArticleService {
    NewsArticle createArticle(NewsArticleDTO dto);
    NewsArticle getArticleById(String id);
    NewsArticle getArticleBySlug(String slug);
    List<NewsArticle> getAllArticles();
    List<NewsArticle> getArticlesByCategory(NewsCategory category);
    NewsArticle updateArticle(String id, NewsArticleDTO dto);
    void deleteArticle(String id);
}