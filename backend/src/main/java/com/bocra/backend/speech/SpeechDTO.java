package com.bocra.backend.speech;

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
public class SpeechDTO {
    @NotBlank(message = "Title is required")
    @Size(max = 300, message = "Title must not exceed 300 characters")
    private String title;

    @NotBlank(message = "Speaker is required")
    @Size(max = 200, message = "Speaker name must not exceed 200 characters")
    private String speaker;

    @Size(max = 200, message = "Speaker role must not exceed 200 characters")
    private String speakerRole;

    @Size(max = 300, message = "Event name must not exceed 300 characters")
    private String event;

    @Size(max = 300, message = "Venue must not exceed 300 characters")
    private String venue;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @Size(max = 1000, message = "Excerpt must not exceed 1000 characters")
    private String excerpt;

    @NotBlank(message = "Slug is required")
    @Size(max = 200, message = "Slug must not exceed 200 characters")
    private String slug;
}
