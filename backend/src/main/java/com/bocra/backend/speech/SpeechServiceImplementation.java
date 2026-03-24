package com.bocra.backend.speech;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpeechServiceImplementation implements SpeechService {

    private final SpeechRepository speechRepository;

    @Override
    public Speech createSpeech(SpeechDTO dto) {
        Speech speech = Speech.builder()
                .title(dto.getTitle())
                .speaker(dto.getSpeaker())
                .speakerRole(dto.getSpeakerRole())
                .event(dto.getEvent())
                .venue(dto.getVenue())
                .date(dto.getDate())
                .excerpt(dto.getExcerpt())
                .slug(dto.getSlug())
                .build();
        return speechRepository.save(speech);
    }

    @Override
    public Speech getSpeechById(String id) {
        return speechRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Speech not found with id: " + id));
    }

    @Override
    public Speech getSpeechBySlug(String slug) {
        return speechRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Speech not found with slug: " + slug));
    }

    @Override
    public List<Speech> getAllSpeeches() {
        return speechRepository.findAllByOrderByDateDesc();
    }

    @Override
    public List<Speech> getSpeechesBySpeaker(String speaker) {
        return speechRepository.findBySpeaker(speaker);
    }

    @Override
    public Speech updateSpeech(String id, SpeechDTO dto) {
        Speech speech = getSpeechById(id);
        speech.setTitle(dto.getTitle());
        speech.setSpeaker(dto.getSpeaker());
        speech.setSpeakerRole(dto.getSpeakerRole());
        speech.setEvent(dto.getEvent());
        speech.setVenue(dto.getVenue());
        speech.setDate(dto.getDate());
        speech.setExcerpt(dto.getExcerpt());
        speech.setSlug(dto.getSlug());
        return speechRepository.save(speech);
    }

    @Override
    public void deleteSpeech(String id) {
        speechRepository.deleteById(id);
    }
}