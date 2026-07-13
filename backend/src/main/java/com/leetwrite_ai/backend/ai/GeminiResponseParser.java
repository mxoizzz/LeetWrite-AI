package com.leetwrite_ai.backend.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leetwrite_ai.backend.dto.GenerateResponse;
import com.leetwrite_ai.backend.exception.ApiException;
import com.leetwrite_ai.backend.exception.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class GeminiResponseParser {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public GenerateResponse parse(String jsonResponse) {
        try {
            // Very naive cleanup in case Gemini returns markdown JSON fences
            String cleanedJson = jsonResponse.trim();
            if (cleanedJson.startsWith("```json")) {
                cleanedJson = cleanedJson.substring(7);
            } else if (cleanedJson.startsWith("```")) {
                cleanedJson = cleanedJson.substring(3);
            }
            if (cleanedJson.endsWith("```")) {
                cleanedJson = cleanedJson.substring(0, cleanedJson.length() - 3);
            }
            cleanedJson = cleanedJson.trim();
            
            return objectMapper.readValue(cleanedJson, GenerateResponse.class);
        } catch (Exception e) {
            throw new ApiException(
                ErrorCode.AI_RESPONSE_INVALID,
                "Failed to parse AI response into the expected schema",
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }
    }
}
