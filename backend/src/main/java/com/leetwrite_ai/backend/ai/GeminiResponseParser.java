package com.leetwrite_ai.backend.ai;

import com.leetwrite_ai.backend.dto.GenerateResponse;
import com.leetwrite_ai.backend.exception.ApiException;
import com.leetwrite_ai.backend.exception.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class GeminiResponseParser {

    public GenerateResponse parse(String markdown) {
        try {
            GenerateResponse response = new GenerateResponse();
            
            // Extract Title
            Matcher titleMatcher = Pattern.compile("^#\\s+(.*)", Pattern.MULTILINE).matcher(markdown);
            if (titleMatcher.find()) {
                response.setTitle(titleMatcher.group(1).trim());
            } else {
                response.setTitle("LeetCode Discussion");
            }

            // Extract Intuition
            response.setIntuition(extractRegexGroup(markdown, "(?i)##.*Intuition\\n([\\s\\S]*?)(?=---|##|\\z)"));

            // Extract Approach
            String approach = extractRegexGroup(markdown, "(?i)##.*Approach\\n([\\s\\S]*?)(?=---|##|\\z)");
            String whyThisWorks = extractRegexGroup(markdown, "(?i)##.*Why This Works\\n([\\s\\S]*?)(?=---|##|\\z)");
            
            if (!whyThisWorks.isEmpty()) {
                approach = approach + "\n\n### Why This Works\n" + whyThisWorks;
            }
            response.setApproach(approach);

            // Extract Time Complexity
            Matcher timeMatcher = Pattern.compile("(?i)\\|\\s*Time\\s*\\|\\s*([^|]*?)\\s*\\|").matcher(markdown);
            if (timeMatcher.find()) {
                response.setTimeComplexity(timeMatcher.group(1).trim());
            } else {
                response.setTimeComplexity("O(?)");
            }

            // Extract Space Complexity
            Matcher spaceMatcher = Pattern.compile("(?i)\\|\\s*Space\\s*\\|\\s*([^|]*?)\\s*\\|").matcher(markdown);
            if (spaceMatcher.find()) {
                response.setSpaceComplexity(spaceMatcher.group(1).trim());
            } else {
                response.setSpaceComplexity("O(?)");
            }

            // Extract Code (preserve backticks for UI rendering)
            Matcher codeMatcher = Pattern.compile("```[a-zA-Z]*\\n[\\s\\S]*?```").matcher(markdown);
            if (codeMatcher.find()) {
                response.setFormattedCode(codeMatcher.group(0).trim());
            } else {
                response.setFormattedCode("");
            }

            // Extract Key Takeaways
            String takeawaysRaw = extractRegexGroup(markdown, "(?i)##.*Key Takeaways\\n([\\s\\S]*)");
            List<String> takeaways = new ArrayList<>();
            for (String line : takeawaysRaw.split("\\n")) {
                line = line.trim();
                if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*")) {
                    takeaways.add(line.replaceAll("^[-•*]\\s*", "").trim());
                }
            }
            if (takeaways.isEmpty()) {
                takeaways.add("Practice makes perfect.");
            }
            response.setKeyTakeaways(takeaways);

            return response;
        } catch (Exception e) {
            throw new ApiException(
                ErrorCode.AI_RESPONSE_INVALID,
                "Failed to parse AI markdown response into the expected schema",
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
    }

    private String extractRegexGroup(String text, String regex) {
        Matcher matcher = Pattern.compile(regex).matcher(text);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return "";
    }
}
