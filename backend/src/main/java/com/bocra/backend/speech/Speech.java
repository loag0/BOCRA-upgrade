package com.bocra.backend.speech;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "speeches")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Speech {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String speaker;

    @Column(nullable = false)
    private String speakerRole;

    @Column(nullable = false)
    private String event;

    @Column(nullable = false)
    private String venue;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String excerpt;

    @Column(unique = true, nullable = false)
    private String slug;
}
