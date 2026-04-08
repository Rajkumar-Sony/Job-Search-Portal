package com.learn.app.dto.application;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationCreateRequest {

    private String jobId;
    private String applicantName;
    private String email;
    private String resumeLink;
}
