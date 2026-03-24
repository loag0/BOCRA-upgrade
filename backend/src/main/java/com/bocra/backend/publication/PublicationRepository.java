package com.bocra.backend.publication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, String> {
    List<Publication> findByType(PublicationType type);
    List<Publication> findByTitleContainingIgnoreCase(String title);
    List<Publication> findAllByOrderByPublishedAtDesc();
}
