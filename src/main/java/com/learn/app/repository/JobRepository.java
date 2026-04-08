package com.learn.app.repository;

import com.learn.app.model.JobDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends ElasticsearchRepository<JobDocument, String> {

    List<JobDocument> findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title,
            String company,
            String description
    );
}
