package com.bocra.backend.publication;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicationServiceImplementation implements PublicationService {

    private final PublicationRepository publicationRepository;

    @Override
    public Publication createPublication(PublicationDTO dto) {
        Publication publication = Publication.builder()
                .title(dto.getTitle())
                .type(dto.getType())
                .fileUrl(dto.getFileUrl())
                .publishedAt(dto.getPublishedAt())
                .description(dto.getDescription())
                .build();
        return publicationRepository.save(publication);
    }

    @Override
    public Publication getPublicationById(String id) {
        return publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found with id: " + id));
    }

    @Override
    public List<Publication> getAllPublications() {
        return publicationRepository.findAllByOrderByPublishedAtDesc();
    }

    @Override
    public List<Publication> getPublicationsByType(PublicationType type) {
        return publicationRepository.findByType(type);
    }

    @Override
    public List<Publication> searchPublications(String title) {
        return publicationRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public Publication updatePublication(String id, PublicationDTO dto) {
        Publication publication = getPublicationById(id);
        publication.setTitle(dto.getTitle());
        publication.setType(dto.getType());
        publication.setFileUrl(dto.getFileUrl());
        publication.setPublishedAt(dto.getPublishedAt());
        publication.setDescription(dto.getDescription());
        return publicationRepository.save(publication);
    }

    @Override
    public void deletePublication(String id) {
        publicationRepository.deleteById(id);
    }
}
