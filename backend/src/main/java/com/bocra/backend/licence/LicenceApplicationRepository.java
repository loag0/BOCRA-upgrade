package com.bocra.backend.licence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LicenceApplicationRepository extends JpaRepository<LicenceApplication, String> {
    List<LicenceApplication> findByOrgId(String orgId);
    List<LicenceApplication> findByStatus(ApplicationStatus status);
    List<LicenceApplication> findByLicenceType(LicenceType licenceType);
}
