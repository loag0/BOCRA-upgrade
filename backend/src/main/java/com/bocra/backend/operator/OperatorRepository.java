package com.bocra.backend.operator;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OperatorRepository extends JpaRepository<Operator, String> {
    Optional<Operator> findByLicenceNumber(String licenceNumber);
    List<Operator> findByStatus(LicenceStatus status);
    List<Operator> findByCategory(LicenceCategory category);
    List<Operator> findByOperatorNameContainingIgnoreCase(String name);
    boolean existsByLicenceNumber(String licenceNumber);
}
