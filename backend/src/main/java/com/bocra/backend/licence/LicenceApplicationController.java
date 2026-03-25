package com.bocra.backend.licence;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/licences")
@RequiredArgsConstructor
public class LicenceApplicationController {

    private final LicenceApplicationService licenceApplicationService;

    @GetMapping
    public ResponseEntity<List<LicenceApplication>> getAllApplications() {
        return ResponseEntity.ok(licenceApplicationService.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LicenceApplication> getApplicationById(@PathVariable String id) {
        return ResponseEntity.ok(licenceApplicationService.getApplicationById(id));
    }

    @GetMapping("/org/{orgId}")
    public ResponseEntity<List<LicenceApplication>> getByOrg(@PathVariable String orgId) {
        return ResponseEntity.ok(licenceApplicationService.getApplicationsByOrg(orgId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<LicenceApplication>> getByStatus(@PathVariable ApplicationStatus status) {
        return ResponseEntity.ok(licenceApplicationService.getApplicationsByStatus(status));
    }

    @PostMapping
    public ResponseEntity<LicenceApplication> createApplication(@Valid @RequestBody LicenceApplicationDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(licenceApplicationService.createApplication(dto));
    }

    @PatchMapping("/{id}/submit")
    public ResponseEntity<LicenceApplication> submitApplication(@PathVariable String id) {
        return ResponseEntity.ok(licenceApplicationService.submitApplication(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LicenceApplication> updateStatus(
            @PathVariable String id,
            @RequestParam ApplicationStatus status) {
        return ResponseEntity.ok(licenceApplicationService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable String id) {
        licenceApplicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}
