package com.bocra.backend.licence;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LicenceApplicationServiceImplementation implements LicenceApplicationService {

    private final LicenceApplicationRepository licenceApplicationRepository;

    @Override
    public LicenceApplication createApplication(LicenceApplicationDTO dto) {
        LicenceApplication application = LicenceApplication.builder()
                .orgId(dto.getOrgId())
                .licenceType(dto.getLicenceType())
                .documents(dto.getDocuments())
                .build();
        return licenceApplicationRepository.save(application);
    }

    @Override
    public LicenceApplication getApplicationById(String id) {
        return licenceApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }

    @Override
    public List<LicenceApplication> getAllApplications() {
        return licenceApplicationRepository.findAll();
    }

    @Override
    public List<LicenceApplication> getApplicationsByOrg(String orgId) {
        return licenceApplicationRepository.findByOrgId(orgId);
    }

    @Override
    public List<LicenceApplication> getApplicationsByStatus(ApplicationStatus status) {
        return licenceApplicationRepository.findByStatus(status);
    }

    @Override
    public LicenceApplication submitApplication(String id) {
        LicenceApplication application = getApplicationById(id);
        application.setStatus(ApplicationStatus.SUBMITTED);
        application.setSubmittedAt(LocalDateTime.now());
        return licenceApplicationRepository.save(application);
    }

    @Override
    public LicenceApplication updateStatus(String id, ApplicationStatus status) {
        LicenceApplication application = getApplicationById(id);
        application.setStatus(status);
        return licenceApplicationRepository.save(application);
    }

    @Override
    public void deleteApplication(String id) {
        licenceApplicationRepository.deleteById(id);
    }
}
