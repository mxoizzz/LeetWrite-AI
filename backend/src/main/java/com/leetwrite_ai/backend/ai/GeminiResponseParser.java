package com.leetwrite_ai.backend.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leetwrite_ai.backend.dto.GenerateResponse;
import com.leetwrite_ai.backend.exception.ApiException;
import com.leetwrite_ai.backend.exception.ErrorCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class GeminiResponseParser {

    private static final Logger log = LoggerFactory.getLogger(GeminiResponseParser.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    public GenerateResponse parse(String input) {
        log.info("=== PARSER INPUT ===\n{}\n====================", input);

        // Try JSON parsing first for V1 backward compatibility
        try {
            String cleanedJson = input.trim();
            if (cleanedJson.startsWith("```json")) {
                cleanedJson = cleanedJson.substring(7);
            } else if (cleanedJson.startsWith("```")) {
                cleanedJson = cleanedJson.substring(3);
            }
            if (cleanedJson.endsWith("```")) {
                cleanedJson = cleanedJson.substring(0, cleanedJson.length() - 3);
            }
            cleanedJson = cleanedJson.trim();
            
            if (cleanedJson.startsWith("{") && cleanedJson.endsWith("}")) {
                GenerateResponse response = objectMapper.readValue(cleanedJson, GenerateResponse.class);
                log.info("Successfully parsed as V1 JSON.");
                log.info("=== FINAL GENERATE RESPONSE ===\n{}\n===============================", response);
                return response;
            }
        } catch (Exception e) {
            log.info("Input is not valid JSON, falling back to V2 Markdown parsing.");
        }

        try {
            GenerateResponse response = new GenerateResponse();
            
            // Clean markdown a bit
            String markdown = input.replaceAll("\\r\\n?", "\n");

            // Extract Title
            // First markdown heading or first non-empty line if no heading
            Matcher titleMatcher = Pattern.compile("(?m)^(?:#+)?\\s*(.+)$").matcher(markdown);
            if (titleMatcher.find()) {
                String title = titleMatcher.group(1).trim();
                // Remove formatting like ** or #
                title = title.replaceAll("^#+\\s*", "").replaceAll("\\*\\*", "").trim();
                response.setTitle(title);
            } else {
                log.warn("Section failed: TITLE. Falling back to default.");
                response.setTitle("LeetCode Discussion");
            }

            // Extract Intuition
            String intuition = extractSectionByKeyword(markdown, "Intuition");
            if (intuition.isEmpty()) {
                log.warn("Section failed: INTUITION.");
            }
            response.setIntuition(intuition);

            // Extract Approach
            String approach = extractSectionByKeyword(markdown, "Approach");
            if (approach.isEmpty()) {
                log.warn("Section failed: APPROACH.");
            }
            
            // Extract Why This Works
            String whyThisWorks = extractSectionByKeyword(markdown, "Why This Works");
            if (!whyThisWorks.isEmpty()) {
                approach = approach.trim() + "\n\n### Why This Works\n" + whyThisWorks;
            }
            response.setApproach(approach.trim());

            // Complexity
            String complexitySection = extractSectionByKeyword(markdown, "Complexity");
            if (complexitySection.isEmpty()) {
                // sometimes they just write Time Complexity: without a header
                complexitySection = markdown;
            }

            response.setTimeComplexity(extractComplexity(complexitySection, "Time"));
            if (response.getTimeComplexity().equals("O(?)")) log.warn("Section failed: TIME COMPLEXITY.");

            response.setSpaceComplexity(extractComplexity(complexitySection, "Space"));
            if (response.getSpaceComplexity().equals("O(?)")) log.warn("Section failed: SPACE COMPLEXITY.");

            // Extract Code
            Matcher codeMatcher = Pattern.compile("```[a-zA-Z]*\\n([\\s\\S]*?)```").matcher(markdown);
            if (codeMatcher.find()) {
                response.setFormattedCode(codeMatcher.group(0).trim()); // preserve the backticks for UI rendering
            } else {
                log.warn("Section failed: CODE.");
                response.setFormattedCode("");
            }

            // Key Takeaways
            String takeawaysRaw = extractSectionByKeyword(markdown, "Takeaway");
            List<String> takeaways = new ArrayList<>();
            for (String line : takeawaysRaw.split("\\n")) {
                line = line.trim();
                if (line.matches("^[-•*]\\s+.*") || line.matches("^\\d+\\.\\s+.*")) {
                    takeaways.add(line.replaceAll("^[-•*]\\s*", "").replaceAll("^\\d+\\.\\s*", "").trim());
                }
            }
            if (takeaways.isEmpty()) {
                log.warn("Section failed: KEY TAKEAWAYS.");
                takeaways.add("Practice makes perfect.");
            }
            response.setKeyTakeaways(takeaways);

            log.info("=== EXTRACTED SECTIONS ===");
            log.info("Title: {}", response.getTitle());
            log.info("Intuition Length: {}", response.getIntuition() != null ? response.getIntuition().length() : 0);
            log.info("Approach Length: {}", response.getApproach() != null ? response.getApproach().length() : 0);
            log.info("Time: {}", response.getTimeComplexity());
            log.info("Space: {}", response.getSpaceComplexity());
            log.info("Code Length: {}", response.getFormattedCode() != null ? response.getFormattedCode().length() : 0);
            log.info("Takeaways Count: {}", response.getKeyTakeaways() != null ? response.getKeyTakeaways().size() : 0);
            log.info("==========================");

            log.info("=== FINAL GENERATE RESPONSE ===\n{}\n===============================", response);

            return response;
        } catch (Exception e) {
            log.error("Failed to parse AI markdown response", e);
            throw new ApiException(
                ErrorCode.AI_RESPONSE_INVALID,
                "Failed to parse AI markdown response into the expected schema",
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
    }

    private String extractSectionByKeyword(String markdown, String keyword) {
        // Matches a heading (e.g. ## 🧠 Intuition or ### 01 / Intuition) containing the keyword
        // Followed by any content until the next heading (starting with #) or end of string
        String regex = "(?i)^#+\\s+.*?" + Pattern.quote(keyword) + ".*?\\n([\\s\\S]*?)(?=^#|\\z)";
        Matcher matcher = Pattern.compile(regex, Pattern.MULTILINE).matcher(markdown);
        if (matcher.find()) {
            String content = matcher.group(1).trim();
            // Clean up any trailing horizontal rules
            content = content.replaceAll("(?m)^\\s*---\\s*$", "").trim();
            return content;
        }
        return "";
    }

    private String extractComplexity(String text, String type) {
        // Try table format: | Time | O(N) |
        String tableRegex = "(?i)\\|\\s*" + Pattern.quote(type) + "[^|]*\\|\\s*(O\\([^|]*\\))\\s*\\|";
        Matcher tableMatcher = Pattern.compile(tableRegex).matcher(text);
        if (tableMatcher.find()) {
            return tableMatcher.group(1).trim();
        }

        // Try text format: Time Complexity: O(n) or Time: **O(n)**
        String textRegex = "(?i)" + Pattern.quote(type) + "(?:\\s*Complexity)?\\s*:\\s*\\*?\\*?\\s*(O\\([^)]+\\))";
        Matcher textMatcher = Pattern.compile(textRegex).matcher(text);
        if (textMatcher.find()) {
            return textMatcher.group(1).trim();
        }

        return "O(?)";
    }
}
