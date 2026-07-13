package com.leetwrite_ai.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class GenerateRequest {

    @NotBlank(message = "Problem URL cannot be empty")
    @Pattern(regexp = "^https://leetcode\\.com/problems/[a-zA-Z0-9-]+/?.*$", message = "Must be a valid LeetCode problem URL")
    private String problemUrl;

    @NotBlank(message = "Language cannot be empty")
    private String language;

    @NotBlank(message = "Code cannot be empty")
    @Size(max = 20000, message = "Code must be under 20,000 characters")
    private String code;
}
