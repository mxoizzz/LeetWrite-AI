package com.leetwrite_ai.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.leetwrite_ai.backend.exception.ApiException;
import com.leetwrite_ai.backend.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class OpenRouterService implements AIService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.base-url}")
    private String baseUrl;

    @Value("${openrouter.model}")
    private String model;

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public OpenRouterService(RestClient restClient) {
        this.restClient = restClient;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String generateContent(String systemPrompt, String userPrompt) {
        if (apiKey == null || apiKey.isEmpty() || apiKey.contains("your_openrouter_api_key_here")) {
            return stubResponse();
        }

        try {
            ObjectNode requestBody = objectMapper.createObjectNode();
            requestBody.put("model", model);
            
            ArrayNode messages = requestBody.putArray("messages");
            
            ObjectNode systemMessage = messages.addObject();
            systemMessage.put("role", "system");
            systemMessage.put("content", systemPrompt);
            
            ObjectNode userMessage = messages.addObject();
            userMessage.put("role", "user");
            userMessage.put("content", userPrompt);

            String response = restClient.post()
                    .uri(baseUrl + "/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode messageNode = rootNode.path("choices").get(0).path("message").path("content");
            return messageNode.asText();

        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(
                ErrorCode.AI_PROVIDER_ERROR,
                "Error communicating with AI Provider: " + e.getMessage(),
                HttpStatus.BAD_GATEWAY
            );
        }
    }
    
    private String stubResponse() {
        return """
            {
              "title": "Two Sum — Hash Map for O(n) Lookup",
              "intuition": "The brute-force approach checks every pair, but we can avoid the second loop entirely by remembering numbers we've already seen. A hash map gives us O(1) lookups to check if the complement of our current number exists.",
              "approach": "1. Initialize an empty hash map to store value-to-index pairs.\\n2. Iterate through the array once.\\n3. For each number, calculate its complement (target - num).\\n4. If the complement is in our hash map, we found the pair. Return their indices.\\n5. Otherwise, store the current number and its index in the hash map.\\n6. Return an empty array if no pair is found.",
              "timeComplexity": "O(n)",
              "spaceComplexity": "O(n)",
              "formattedCode": "```java\\nclass Solution {\\n  public int[] twoSum(int[] nums, int target) {\\n    Map<Integer, Integer> numMap = new HashMap<>();\\n    for (int i = 0; i < nums.length; i++) {\\n      int complement = target - nums[i];\\n      if (numMap.containsKey(complement)) {\\n        return new int[]{numMap.get(complement), i};\\n      }\\n      numMap.put(nums[i], i);\\n    }\\n    return new int[]{};\\n  }\\n}\\n```",
              "keyTakeaways": [
                "Hash maps trade space for time when you need fast lookups.",
                "Always consider whether a second pass can be eliminated by remembering prior state.",
                "This pattern generalizes to any 'find a complement' problem."
              ]
            }
            """;
    }
}
