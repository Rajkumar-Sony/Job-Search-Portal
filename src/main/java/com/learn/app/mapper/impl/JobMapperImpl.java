package com.learn.app.mapper.impl;

import com.learn.app.dto.job.JobCreateRequest;
import com.learn.app.dto.job.JobResponse;
import com.learn.app.mapper.JobMapper;
import com.learn.app.model.JobDocument;
import org.springframework.stereotype.Component;

@Component
public class JobMapperImpl implements JobMapper {

    @Override
    public JobDocument toDocument(JobCreateRequest request) {
        return new JobDocument(
                null,
                request.getTitle(),
                request.getCompany(),
                request.getLocation(),
                request.getSkills(),
                request.getExperience(),
                request.getSalary(),
                request.getDescription(),
                request.getPostedDate()
        );
    }

    @Override
    public JobResponse toResponse(JobDocument jobDocument) {
        return new JobResponse(
                jobDocument.getId(),
                jobDocument.getTitle(),
                jobDocument.getCompany(),
                jobDocument.getLocation(),
                jobDocument.getSkills(),
                jobDocument.getExperience(),
                jobDocument.getSalary(),
                jobDocument.getDescription(),
                jobDocument.getPostedDate()
        );
    }
}
