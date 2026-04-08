package com.learn.app.mapper;

import com.learn.app.dto.application.JobApplicationCreateRequest;
import com.learn.app.dto.application.JobApplicationResponse;
import com.learn.app.model.JobApplication;

public interface JobApplicationMapper {

    JobApplication toEntity(JobApplicationCreateRequest request);

    JobApplicationResponse toResponse(JobApplication entity);
}
