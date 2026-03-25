package com.bocra.backend.publication;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/publications")
@RequiredArgsConstructor
public class PublicationController {

    private final PublicationService publicationService;

    @GetMapping
    public ResponseEntity<List<Publication>> getAllPublications() {
        return ResponseEntity.ok(publicationService.getAllPublications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publication> getPublicationById(@PathVariable String id) {
        return ResponseEntity.ok(publicationService.getPublicationById(id));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Publication>> getByType(@PathVariable PublicationType type) {
        return ResponseEntity.ok(publicationService.getPublicationsByType(type));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Publication>> searchPublications(@RequestParam @Size(min = 1, max = 200) String title) {
        return ResponseEntity.ok(publicationService.searchPublications(title));
    }

    @PostMapping
    public ResponseEntity<Publication> createPublication(@Valid @RequestBody PublicationDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(publicationService.createPublication(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Publication> updatePublication(
            @PathVariable String id,
            @Valid @RequestBody PublicationDTO dto) {
        return ResponseEntity.ok(publicationService.updatePublication(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable String id) {
        publicationService.deletePublication(id);
        return ResponseEntity.noContent().build();
    }
}