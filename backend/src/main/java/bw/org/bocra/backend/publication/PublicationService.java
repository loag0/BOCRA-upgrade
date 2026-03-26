package bw.org.bocra.backend.publication;

import java.util.List;

public interface PublicationService {
    Publication createPublication(PublicationDTO dto);
    Publication getPublicationById(String id);
    List<Publication> getAllPublications();
    List<Publication> getPublicationsByType(PublicationType type);
    List<Publication> searchPublications(String title);
    Publication updatePublication(String id, PublicationDTO dto);
    void deletePublication(String id);
}