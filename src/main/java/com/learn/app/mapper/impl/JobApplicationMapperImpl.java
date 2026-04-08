package com.learn.app.mapper.impl;

import com.learn.app.dto.application.JobApplicationCreateRequest;
import com.learn.app.dto.application.JobApplicationResponse;
import com.learn.app.mapper.JobApplicationMapper;
import com.learn.app.model.JobApplication;
import org.springframework.stereotype.Component;

@Component
public class JobApplicationMapperImpl implements JobApplicationMapper {

    @Override
    public JobApplication toEntity(JobApplicationCreateRequest request) {
        JobApplication application = new JobApplication();
        application.setJobId(request.getJobId());
        application.setApplicantName(request.getApplicantName());
        application.setEmail(request.getEmail());
        application.setResumeLink(request.getResumeLink());
        return application;
    }

    @Override
    public JobApplicationResponse toResponse(JobApplication entity) {
        return new JobApplicationResponse(
                entity.getId(),
                entity.getJobId(),
                entity.getApplicantName(),
                entity.getEmail(),
                entity.getResumeLink(),
                entity.getStatus(),
                entity.getAppliedAt()
        );
    }
}
