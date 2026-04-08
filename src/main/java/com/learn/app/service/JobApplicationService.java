package com.learn.app.service;

import com.learn.app.dto.application.JobApplicationCreateRequest;
import com.learn.app.dto.application.JobApplicationResponse;

import java.util.List;

public interface JobApplicationService {

    JobApplicationResponse create(JobApplicationCreateRequest request);

    List<JobApplicationResponse> list(String jobId);
}
