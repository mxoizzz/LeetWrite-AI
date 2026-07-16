package com.leetwrite_ai.backend.ai;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class PromptManager {
    
    private String systemPrompt;
    private String generationPrompt;
    private String reviewerPrompt;
    private String markdownPrompt;
    private String rulesPrompt;
    private String stylePrompt;
    private String edgeCasesPrompt;
    private String qualityPrompt;

    @PostConstruct
    public void init() throws IOException {
        String basePath = "prompts"; // Read from current working directory (backend)
        systemPrompt = readFile(basePath, "system.md");
        generationPrompt = readFile(basePath, "generation.md");
        reviewerPrompt = readFile(basePath, "reviewer.md");
        markdownPrompt = readFile(basePath, "markdown.md");
        rulesPrompt = readFile(basePath, "rules.md");
        stylePrompt = readFile(basePath, "style.md");
        edgeCasesPrompt = readFile(basePath, "edge_cases.md");
        qualityPrompt = readFile(basePath, "quality.md");
    }

    private String readFile(String basePath, String filename) throws IOException {
        Path path = Paths.get(basePath, filename);
        if (Files.exists(path)) {
            return Files.readString(path);
        }
        return ""; // Fallback
    }

    public String buildGenerationSystemPrompt() {
        return String.join("\n\n============================================================\n\n",
            systemPrompt,
            generationPrompt,
            markdownPrompt,
            rulesPrompt,
            stylePrompt,
            edgeCasesPrompt
        );
    }

    public String buildReviewerSystemPrompt() {
        return String.join("\n\n============================================================\n\n",
            systemPrompt,
            reviewerPrompt,
            markdownPrompt,
            rulesPrompt,
            stylePrompt,
            edgeCasesPrompt,
            qualityPrompt
        );
    }

    public String buildGenerationUserPrompt(String problemUrl, String language, String code) {
        return String.format("Problem URL: %s\nLanguage: %s\n\nUser Code:\n```%s\n%s\n```\n\nPlease generate the discussion.", 
            problemUrl, language, language.toLowerCase(), code);
    }

    public String buildReviewerUserPrompt(String generatedMarkdown) {
        return "Please review and improve the following generated LeetCode discussion according to your reviewer guidelines.\n\n" + generatedMarkdown;
    }
}
