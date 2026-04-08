package com.learn.app.service.impl;

import com.learn.app.dto.job.JobCreateRequest;
import com.learn.app.dto.job.JobResponse;
import com.learn.app.mapper.JobMapper;
import com.learn.app.model.JobDocument;
import com.learn.app.repository.JobRepository;
import com.learn.app.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobMapper jobMapper;

    @Override
    public JobResponse createJob(JobCreateRequest request) {
        JobDocument job = jobMapper.toDocument(request);
        if (!StringUtils.hasText(job.getId())) {
            job.setId(UUID.randomUUID().toString());
        }
        if (job.getPostedDate() == null) {
            job.setPostedDate(LocalDate.now());
        }
        return jobMapper.toResponse(jobRepository.save(job));
    }

    @Override
    public Optional<JobResponse> getById(String id) {
        return jobRepository.findById(id).map(jobMapper::toResponse);
    }

    @Override
    public List<JobResponse> getAll() {
        return getAllDocuments().stream().map(jobMapper::toResponse).toList();
    }

    @Override
    public List<JobResponse> search(String keyword, String location, String skill, Integer minExperience) {
        List<JobDocument> initial;
        if (StringUtils.hasText(keyword)) {
            initial = jobRepository
                    .findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                            keyword, keyword, keyword);
        } else {
            initial = getAllDocuments();
        }

        return initial.stream()
                .filter(job -> !StringUtils.hasText(location) || matchesLocation(job, location))
                .filter(job -> !StringUtils.hasText(skill) || hasSkill(job, skill))
                .filter(job -> minExperience == null || hasExperience(job, minExperience))
                .map(jobMapper::toResponse)
                .toList();
    }

    private boolean matchesLocation(JobDocument job, String location) {
        return job.getLocation() != null && job.getLocation().equalsIgnoreCase(location.trim());
    }

    private boolean hasSkill(JobDocument job, String skill) {
        if (job.getSkills() == null || job.getSkills().isEmpty()) {
            return false;
        }
        String skillLower = skill.trim().toLowerCase(Locale.ROOT);
        return job.getSkills().stream()
                .filter(StringUtils::hasText)
                .map(s -> s.trim().toLowerCase(Locale.ROOT))
                .anyMatch(s -> s.contains(skillLower));
    }

    private boolean hasExperience(JobDocument job, Integer minExperience) {
        return job.getExperience() != null && job.getExperience() >= minExperience;
    }

    private List<JobDocument> getAllDocuments() {
        List<JobDocument> jobs = new ArrayList<>();
        jobRepository.findAll().forEach(jobs::add);
        return jobs;
    }

}
