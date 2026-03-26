package bw.org.bocra.backend.speech;

import java.util.List;

public interface SpeechService {
    Speech createSpeech(SpeechDTO dto);
    Speech getSpeechById(String id);
    Speech getSpeechBySlug(String slug);
    List<Speech> getAllSpeeches();
    List<Speech> getSpeechesBySpeaker(String speaker);
    Speech updateSpeech(String id, SpeechDTO dto);
    void deleteSpeech(String id);
}
