package com.bocra.backend.licence;

import java.util.List;

public interface LicenceApplicationService {
    LicenceApplication createApplication(LicenceApplicationDTO dto);
    LicenceApplication getApplicationById(String id);
    List<LicenceApplication> getAllApplications();
    List<LicenceApplication> getApplicationsByOrg(String orgId);
    List<LicenceApplication> getApplicationsByStatus(ApplicationStatus status);
    LicenceApplication submitApplication(String id);
    LicenceApplication updateStatus(String id, ApplicationStatus status);
    void deleteApplication(String id);
}
