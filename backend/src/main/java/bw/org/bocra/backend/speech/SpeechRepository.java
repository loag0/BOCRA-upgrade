package bw.org.bocra.backend.speech;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SpeechRepository extends JpaRepository<Speech, String> {
    Optional<Speech> findBySlug(String slug);
    List<Speech> findBySpeaker(String speaker);
    List<Speech> findAllByOrderByDateDesc();
}
