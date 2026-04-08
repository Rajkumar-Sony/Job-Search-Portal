package com.learn.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobId;
    private String applicantName;
    private String email;
    private String resumeLink;
    private String status;
    private LocalDateTime appliedAt;

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = "SUBMITTED";
        }
        if (appliedAt == null) {
            appliedAt = LocalDateTime.now();
        }
    }
}
