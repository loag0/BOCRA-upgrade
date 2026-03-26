package bw.org.bocra.backend.news;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsArticleController {

    private final NewsArticleService newsArticleService;

    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllArticles() {
        return ResponseEntity.ok(newsArticleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getArticleById(@PathVariable String id) {
        return ResponseEntity.ok(newsArticleService.getArticleById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<NewsArticle> getArticleBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(newsArticleService.getArticleBySlug(slug));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<NewsArticle>> getByCategory(@PathVariable NewsCategory category) {
        return ResponseEntity.ok(newsArticleService.getArticlesByCategory(category));
    }

    @PostMapping
    public ResponseEntity<NewsArticle> createArticle(@Valid @RequestBody NewsArticleDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(newsArticleService.createArticle(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsArticle> updateArticle(
            @PathVariable String id,
            @Valid @RequestBody NewsArticleDTO dto) {
        return ResponseEntity.ok(newsArticleService.updateArticle(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable String id) {
        newsArticleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}