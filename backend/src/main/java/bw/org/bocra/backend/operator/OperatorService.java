package bw.org.bocra.backend.operator;

import java.util.List;

public interface OperatorService {
    Operator createOperator(OperatorDTO dto);
    Operator getOperatorById(String id);
    Operator getOperatorByLicenceNumber(String licenceNumber);
    List<Operator> getAllOperators();
    List<Operator> getOperatorsByStatus(LicenceStatus status);
    List<Operator> getOperatorsByCategory(LicenceCategory category);
    List<Operator> searchOperators(String name);
    Operator updateOperator(String id, OperatorDTO dto);
    void deleteOperator(String id);
}
