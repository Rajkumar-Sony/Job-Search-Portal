package com.learn.app;

import com.learn.app.repository.JobApplicationRepository;
import com.learn.app.repository.JobRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableElasticsearchRepositories(basePackageClasses = JobRepository.class)
@EnableJpaRepositories(basePackageClasses = JobApplicationRepository.class)
public class JobSearchPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobSearchPortalApplication.class, args);
    }
}
