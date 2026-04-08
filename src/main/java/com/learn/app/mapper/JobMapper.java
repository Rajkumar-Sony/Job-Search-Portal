package com.learn.app.mapper;

import com.learn.app.dto.job.JobCreateRequest;
import com.learn.app.dto.job.JobResponse;
import com.learn.app.model.JobDocument;

public interface JobMapper {

    JobDocument toDocument(JobCreateRequest request);

    JobResponse toResponse(JobDocument jobDocument);
}
