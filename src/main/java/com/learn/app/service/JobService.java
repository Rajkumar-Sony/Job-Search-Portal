package com.learn.app.service;

import com.learn.app.dto.job.JobCreateRequest;
import com.learn.app.dto.job.JobResponse;

import java.util.List;
import java.util.Optional;

public interface JobService {

    JobResponse createJob(JobCreateRequest request);

    Optional<JobResponse> getById(String id);

    List<JobResponse> getAll();

    List<JobResponse> search(String keyword, String location, String skill, Integer minExperience);
}
