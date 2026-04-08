package com.learn.app.dto.job;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {

    private String id;
    private String title;
    private String company;
    private String location;
    private List<String> skills;
    private Integer experience;
    private Double salary;
    private String description;
    private LocalDate postedDate;
}
