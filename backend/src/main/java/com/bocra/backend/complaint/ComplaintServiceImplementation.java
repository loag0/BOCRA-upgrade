package com.bocra.backend.complaint;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImplementation implements ComplaintService {

    private final ComplaintRepository complaintRepository;

    @Override
    public Complaint createComplaint(ComplaintDTO dto) {
        String caseRef = generateCaseRef();

        Complaint complaint = Complaint.builder()
                .caseRef(caseRef)
                .complainantName(dto.getComplainantName())
                .complainantEmail(dto.getComplainantEmail())
                .operator(dto.getOperator())
                .category(dto.getCategory())
                .description(dto.getDescription())
                .build();

        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint getComplaintById(String id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
    }

    @Override
    public Complaint getComplaintByCaseRef(String caseRef) {
        return complaintRepository.findByCaseRef(caseRef)
                .orElseThrow(() -> new RuntimeException("Complaint not found with case ref: " + caseRef));
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public List<Complaint> getComplaintsByStatus(ComplaintStatus status) {
        return complaintRepository.findByStatus(status);
    }

    @Override
    public List<Complaint> getComplaintsByEmail(String email) {
        return complaintRepository.findByComplainantEmail(email);
    }

    @Override
    public Complaint updateComplaintStatus(String id, ComplaintStatus status) {
        Complaint complaint = getComplaintById(id);
        complaint.setStatus(status);
        if (status == ComplaintStatus.RESOLVED) {
            complaint.setResolvedAt(java.time.LocalDateTime.now());
        }
        return complaintRepository.save(complaint);
    }

    @Override
    public void deleteComplaint(String id) {
        complaintRepository.deleteById(id);
    }

    private String generateCaseRef() {
        String ref;
        do {
            ref = "BOCRA-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        } while (complaintRepository.existsByCaseRef(ref));
        return ref;
    }
}
