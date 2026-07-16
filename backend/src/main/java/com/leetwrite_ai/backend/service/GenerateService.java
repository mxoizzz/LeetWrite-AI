package com.leetwrite_ai.backend.service;

import com.leetwrite_ai.backend.ai.GeminiResponseParser;
import com.leetwrite_ai.backend.ai.PromptManager;
import com.leetwrite_ai.backend.dto.GenerateRequest;
import com.leetwrite_ai.backend.dto.GenerateResponse;
import com.leetwrite_ai.backend.exception.ApiException;
import com.leetwrite_ai.backend.exception.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class GenerateService {

    private final AIService aiService;
    private final PromptManager promptManager;
    private final GeminiResponseParser responseParser;

    private static final Set<String> SUPPORTED_LANGUAGES = Set.of(
            "JAVA", "PYTHON", "CPP", "JAVASCRIPT", "TYPESCRIPT", "GO", "C", "CSHARP"
    );

    public GenerateService(AIService aiService, PromptManager promptManager, GeminiResponseParser responseParser) {
        this.aiService = aiService;
        this.promptManager = promptManager;
        this.responseParser = responseParser;
    }

    public GenerateResponse generateDiscussion(GenerateRequest request) {
        String language = request.getLanguage().toUpperCase();
        if (!SUPPORTED_LANGUAGES.contains(language)) {
            throw new ApiException(ErrorCode.INVALID_LANGUAGE, "Language not supported", HttpStatus.BAD_REQUEST, "language");
        }

        // Pass 1: Generation
        String generationSystemPrompt = promptManager.buildGenerationSystemPrompt();
        String generationUserPrompt = promptManager.buildGenerationUserPrompt(request.getProblemUrl(), language, request.getCode());
        String generatedMarkdown = aiService.generateContent(generationSystemPrompt, generationUserPrompt);

        // Pass 2: Reviewer
        String reviewerSystemPrompt = promptManager.buildReviewerSystemPrompt();
        String reviewerUserPrompt = promptManager.buildReviewerUserPrompt(generatedMarkdown);
        String finalMarkdown = aiService.generateContent(reviewerSystemPrompt, reviewerUserPrompt);

        // Parse final markdown into structured JSON schema for frontend
        return responseParser.parse(finalMarkdown);
    }
}
