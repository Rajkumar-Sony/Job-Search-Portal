package com.learn.app.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "jobs")
public class JobDocument {

    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String company;

    @Field(type = FieldType.Keyword)
    private String location;

    @Field(type = FieldType.Keyword)
    private List<String> skills;

    @Field(type = FieldType.Integer)
    private Integer experience;

    @Field(type = FieldType.Double)
    private Double salary;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Date)
    private LocalDate postedDate;
}
