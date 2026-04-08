package com.learn.app.dto.application;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationResponse {

    private Long id;
    private String jobId;
    private String applicantName;
    private String email;
    private String resumeLink;
    private String status;
    private LocalDateTime appliedAt;
}
