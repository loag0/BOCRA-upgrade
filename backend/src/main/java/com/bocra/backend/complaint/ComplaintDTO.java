package com.bocra.backend.complaint;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintDTO {
    @NotBlank(message = "Complainant name is required")
    @Size(min = 2, max = 200, message = "Name must be between 2 and 200 characters")
    private String complainantName;

    @NotBlank(message = "Email is required")
    @Email(message = "Must be a valid email address")
    private String complainantEmail;

    @NotBlank(message = "Operator is required")
    @Size(max = 200, message = "Operator name must not exceed 200 characters")
    private String operator;

    @NotNull(message = "Category is required")
    private ComplaintCategory category;

    @NotBlank(message = "Description is required")
    @Size(min = 50, max = 5000, message = "Description must be between 50 and 5000 characters")
    private String description;
}
