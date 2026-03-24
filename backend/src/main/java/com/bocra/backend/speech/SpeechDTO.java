package com.bocra.backend.speech;

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
    private String title;
    private String speaker;
    private String speakerRole;
    private String event;
    private String venue;
    private LocalDate date;
    private String excerpt;
    private String slug;
}
