package bw.org.bocra.backend.licence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "licence_applications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LicenceApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String orgId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LicenceType licenceType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    private LocalDateTime submittedAt;

    @ElementCollection
    @CollectionTable(name = "licence_documents", joinColumns = @JoinColumn(name = "application_id"))
    @Column(name = "document_url")
    private List<String> documents;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        status = ApplicationStatus.DRAFT;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
