package com.bocra.backend.complaint;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, String> {

    Optional<Complaint> findByCaseRef(String caseRef);

    List<Complaint> findByStatus(ComplaintStatus status);

    List<Complaint> findByComplainantEmail(String email);

    List<Complaint> findByOperator(String operator);

    boolean existsByCaseRef(String caseRef);
}
