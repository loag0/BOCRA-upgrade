package com.bocra.backend.complaint;

import java.util.List;

public interface ComplaintService {
    Complaint createComplaint(ComplaintDTO dto);
    Complaint getComplaintById(String id);
    Complaint getComplaintByCaseRef(String caseRef);
    List<Complaint> getAllComplaints();
    List<Complaint> getComplaintsByStatus(ComplaintStatus status);
    List<Complaint> getComplaintsByEmail(String email);
    Complaint updateComplaintStatus(String id, ComplaintStatus status);
    void deleteComplaint(String id);
}
