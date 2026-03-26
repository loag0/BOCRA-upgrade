package bw.org.bocra.backend.operator;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/operators")
@RequiredArgsConstructor
public class OperatorController {

    private final OperatorService operatorService;

    @GetMapping
    public ResponseEntity<List<Operator>> getAllOperators() {
        return ResponseEntity.ok(operatorService.getAllOperators());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Operator> getOperatorById(@PathVariable String id) {
        return ResponseEntity.ok(operatorService.getOperatorById(id));
    }

    @GetMapping("/licence/{licenceNumber}")
    public ResponseEntity<Operator> getByLicenceNumber(@PathVariable String licenceNumber) {
        return ResponseEntity.ok(operatorService.getOperatorByLicenceNumber(licenceNumber));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Operator>> searchOperators(@RequestParam String name) {
        return ResponseEntity.ok(operatorService.searchOperators(name));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Operator>> getByCategory(@PathVariable LicenceCategory category) {
        return ResponseEntity.ok(operatorService.getOperatorsByCategory(category));
    }

    @PostMapping
    public ResponseEntity<Operator> createOperator(@Valid @RequestBody OperatorDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(operatorService.createOperator(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Operator> updateOperator(
            @PathVariable String id,
            @Valid @RequestBody OperatorDTO dto) {
        return ResponseEntity.ok(operatorService.updateOperator(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOperator(@PathVariable String id) {
        operatorService.deleteOperator(id);
        return ResponseEntity.noContent().build();
    }
}
