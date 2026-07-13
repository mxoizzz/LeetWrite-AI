package com.leetwrite_ai.backend.controller;

import com.leetwrite_ai.backend.dto.GenerateRequest;
import com.leetwrite_ai.backend.dto.GenerateResponse;
import com.leetwrite_ai.backend.service.GenerateService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class GenerateController {

    private final GenerateService generateService;

    public GenerateController(GenerateService generateService) {
        this.generateService = generateService;
    }

    @PostMapping("/generate")
    public ResponseEntity<GenerateResponse> generate(@Valid @RequestBody GenerateRequest request) {
        GenerateResponse response = generateService.generateDiscussion(request);
        return ResponseEntity.ok(response);
    }
}
