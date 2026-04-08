package com.learn.app.service.impl;

import com.learn.app.dto.application.JobApplicationCreateRequest;
import com.learn.app.dto.application.JobApplicationResponse;
import com.learn.app.mapper.JobApplicationMapper;
import com.learn.app.repository.JobApplicationRepository;
import com.learn.app.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final JobApplicationMapper jobApplicationMapper;

    @Override
    public JobApplicationResponse create(JobApplicationCreateRequest request) {
        return jobApplicationMapper.toResponse(jobApplicationRepository.save(jobApplicationMapper.toEntity(request)));
    }

    @Override
    public List<JobApplicationResponse> list(String jobId) {
        if (StringUtils.hasText(jobId)) {
            return jobApplicationRepository.findByJobId(jobId).stream()
                    .map(jobApplicationMapper::toResponse)
                    .toList();
        }
        return jobApplicationRepository.findAll().stream()
                .map(jobApplicationMapper::toResponse)
                .toList();
    }
}
