package com.leetwrite_ai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenerateResponse {
    private String title;
    private String intuition;
    private String approach;
    private String timeComplexity;
    private String spaceComplexity;
    private String formattedCode;
    private List<String> keyTakeaways;
}
