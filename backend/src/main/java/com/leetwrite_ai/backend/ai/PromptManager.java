package com.leetwrite_ai.backend.ai;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
@Component
public class PromptManager {
    private String systemPromptTemplate;
    private String userPromptTemplate;

    @Value("classpath:prompts/system.txt")
    private org.springframework.core.io.Resource systemPromptResource;

    @Value("classpath:prompts/user.txt")
    private org.springframework.core.io.Resource userPromptResource;

    @PostConstruct
    public void init() throws IOException {
        systemPromptTemplate = new String(systemPromptResource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        userPromptTemplate = new String(userPromptResource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    public String getSystemPrompt() {
        return systemPromptTemplate;
    }

    public String buildUserPrompt(String problemUrl, String language, String code) {
        return userPromptTemplate.formatted(problemUrl, language, language.toLowerCase(), code);
    }
}
