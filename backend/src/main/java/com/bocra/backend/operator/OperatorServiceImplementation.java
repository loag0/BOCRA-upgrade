package com.bocra.backend.operator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OperatorServiceImplementation implements OperatorService {

    private final OperatorRepository operatorRepository;

    @Override
    @Transactional
    public Operator createOperator(OperatorDTO dto) {
        Operator operator = Operator.builder()
                .operatorName(dto.getOperatorName())
                .shortName(dto.getShortName())
                .licenceNumber(dto.getLicenceNumber())
                .category(dto.getCategory())
                .categoryFull(dto.getCategoryFull())
                .subCategory(dto.getSubCategory())
                .status(dto.getStatus())
                .issuedAt(dto.getIssuedAt())
                .expiresAt(dto.getExpiresAt())
                .complianceStatus(dto.getComplianceStatus())
                .services(dto.getServices())
                .address(dto.getAddress())
                .website(dto.getWebsite())
                .build();

        return operatorRepository.save(operator);
    }

    @Override
    @Transactional
    public Operator getOperatorById(String id) {
        return operatorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operator not found with id: " + id));
    }

    @Override
    @Transactional
    public Operator getOperatorByLicenceNumber(String licenceNumber) {
        return operatorRepository.findByLicenceNumber(licenceNumber)
                .orElseThrow(() -> new RuntimeException("Operator not found with licence: " + licenceNumber));
    }

    @Override
    @Transactional
    public List<Operator> getAllOperators() {
        return operatorRepository.findAll();
    }

    @Override
    @Transactional
    public List<Operator> getOperatorsByStatus(LicenceStatus status) {
        return operatorRepository.findByStatus(status);
    }

    @Override
    @Transactional
    public List<Operator> getOperatorsByCategory(LicenceCategory category) {
        return operatorRepository.findByCategory(category);
    }

    @Override
    @Transactional
    public List<Operator> searchOperators(String name) {
        return operatorRepository.findByOperatorNameContainingIgnoreCase(name);
    }

    @Override
    @Transactional
    public Operator updateOperator(String id, OperatorDTO dto) {
        Operator operator = getOperatorById(id);
        operator.setOperatorName(dto.getOperatorName());
        operator.setShortName(dto.getShortName());
        operator.setCategory(dto.getCategory());
        operator.setCategoryFull(dto.getCategoryFull());
        operator.setSubCategory(dto.getSubCategory());
        operator.setStatus(dto.getStatus());
        operator.setIssuedAt(dto.getIssuedAt());
        operator.setExpiresAt(dto.getExpiresAt());
        operator.setComplianceStatus(dto.getComplianceStatus());
        operator.setServices(dto.getServices());
        operator.setAddress(dto.getAddress());
        operator.setWebsite(dto.getWebsite());
        return operatorRepository.save(operator);
    }

    @Override
    @Transactional
    public void deleteOperator(String id) {
        operatorRepository.deleteById(id);
    }
}