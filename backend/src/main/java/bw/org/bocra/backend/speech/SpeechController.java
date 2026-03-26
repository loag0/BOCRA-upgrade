package bw.org.bocra.backend.speech;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/speeches")
@RequiredArgsConstructor
public class SpeechController {

    private final SpeechService speechService;

    @GetMapping
    public ResponseEntity<List<Speech>> getAllSpeeches() {
        return ResponseEntity.ok(speechService.getAllSpeeches());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Speech> getSpeechById(@PathVariable String id) {
        return ResponseEntity.ok(speechService.getSpeechById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Speech> getSpeechBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(speechService.getSpeechBySlug(slug));
    }

    @GetMapping("/speaker/{speaker}")
    public ResponseEntity<List<Speech>> getBySpeaker(@PathVariable String speaker) {
        return ResponseEntity.ok(speechService.getSpeechesBySpeaker(speaker));
    }

    @PostMapping
    public ResponseEntity<Speech> createSpeech(@Valid @RequestBody SpeechDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(speechService.createSpeech(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Speech> updateSpeech(
            @PathVariable String id,
            @Valid @RequestBody SpeechDTO dto) {
        return ResponseEntity.ok(speechService.updateSpeech(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpeech(@PathVariable String id) {
        speechService.deleteSpeech(id);
        return ResponseEntity.noContent().build();
    }
}