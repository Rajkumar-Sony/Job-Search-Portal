package com.learn.app;

import com.learn.app.repository.JobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
class JobSearchPortalApplicationTests {

    @MockitoBean
    private JobRepository jobRepository;

    @Test
    void contextLoads() {
    }
}
