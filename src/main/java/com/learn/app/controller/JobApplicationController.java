package com.learn.app.controller;

import com.learn.app.dto.application.JobApplicationCreateRequest;
import com.learn.app.dto.application.JobApplicationResponse;
import com.learn.app.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationResponse> createApplication(@RequestBody JobApplicationCreateRequest request) {
        return ResponseEntity.ok(jobApplicationService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getApplications(@RequestParam(required = false) String jobId) {
        return ResponseEntity.ok(jobApplicationService.list(jobId));
    }
}
