# Job Search Portal
### Elasticsearch-powered Job Discovery and Application Tracking Platform

[![GitHub Repository](https://img.shields.io/badge/GitHub-Rajkumar--Sony%2FJob--Search--Portal-181717?logo=github)](https://github.com/Rajkumar-Sony/Job-Search-Portal)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)
[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%204-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Search](https://img.shields.io/badge/Search-Elasticsearch-005571?logo=elasticsearch&logoColor=white)](https://www.elastic.co/elasticsearch)
[![Database](https://img.shields.io/badge/Database-MySQL%208-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Containers](https://img.shields.io/badge/Containers-Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

## GitHub Repository Information

- Repository: `Rajkumar-Sony/Job-Search-Portal`
- URL: `https://github.com/Rajkumar-Sony/Job-Search-Portal`
- Default branch: `main`
- Clone:

```bash
git clone https://github.com/Rajkumar-Sony/Job-Search-Portal.git
cd Job-Search-Portal
```

- Push setup:

```bash
git remote add origin https://github.com/Rajkumar-Sony/Job-Search-Portal.git
git branch -M main
git push -u origin main
```

- Issue tracker: `https://github.com/Rajkumar-Sony/Job-Search-Portal/issues`
- Pull requests: `https://github.com/Rajkumar-Sony/Job-Search-Portal/pulls`

## About ElasticSearch

Elasticsearch is a distributed search engine optimized for:
- Full-text search
- Fast filtering
- Relevance ranking
- Typo-tolerant search (fuzzy)
- Aggregations for analytics

In this project, Elasticsearch is used for `jobs` search data (title, company, description, skills, location, experience, salary, posted date).

## How to Use / Implement This

### 1. Adding Dependency

Add Spring Data Elasticsearch starter in `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

### 2. Adding Inside Properties File

Configure Elasticsearch connection in `src/main/resources/application.yaml`:

```yaml
spring:
  elasticsearch:
    uris: http://localhost:9200
```

### 3. Extending Repository

Create Elasticsearch repository interface:

```java
public interface JobRepository extends ElasticsearchRepository<JobDocument, String> {
    List<JobDocument> findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
        String title, String company, String description
    );
}
```

## About This Project

### Features

- Create jobs (stored in Elasticsearch)
- Search jobs by keyword
- Filter jobs by location, skill, and minimum experience
- View job details by id
- Create job applications (stored in MySQL)
- List applications by job id
- DTO-based API contracts (`*Request`, `*Response`)
- Custom mapper layer (no ModelMapper dependency)
- React + Vite + Tailwind frontend

### File Structures

```text
SpringBoot-ElasticSearch-ReactJs/
├── src/main/java/com/learn/app
│   ├── JobSearchPortalApplication.java
│   ├── config/WebConfig.java
│   ├── controller/
│   │   ├── JobController.java
│   │   └── JobApplicationController.java
│   ├── dto/
│   │   ├── job/
│   │   │   ├── JobCreateRequest.java
│   │   │   └── JobResponse.java
│   │   └── application/
│   │       ├── JobApplicationCreateRequest.java
│   │       └── JobApplicationResponse.java
│   ├── mapper/
│   │   ├── JobMapper.java
│   │   ├── JobApplicationMapper.java
│   │   └── impl/
│   │       ├── JobMapperImpl.java
│   │       └── JobApplicationMapperImpl.java
│   ├── model/
│   │   ├── JobDocument.java
│   │   └── JobApplication.java
│   ├── repository/
│   │   ├── JobRepository.java
│   │   └── JobApplicationRepository.java
│   └── service/
│       ├── JobService.java
│       ├── JobApplicationService.java
│       └── impl/
│           ├── JobServiceImpl.java
│           └── JobApplicationServiceImpl.java
├── src/main/resources/application.yaml
├── src/test/java/com/learn/app/JobSearchPortalApplicationTests.java
├── Dockerfile
├── docker-compose.yml
├── rest.http
└── frontend/
    ├── Dockerfile
    ├── index.html
    ├── nginx.conf
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.cjs
    ├── tailwind.config.cjs
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── styles.css
        ├── constants/
        │   ├── formDefaults.js
        │   └── uiClasses.js
        ├── services/
        │   └── jobApi.js
        └── components/
            ├── jobs/
            │   ├── AddJobForm.jsx
            │   ├── JobList.jsx
            │   └── JobSearchForm.jsx
            └── applications/
                └── ApplicationForm.jsx
```

### Configuration Details

- Backend app name: `job-search-portal`
- Backend port: `8080`
- Frontend dev port: `5173`
- Elasticsearch: `9200`
- MySQL: `3306`
- MySQL database: `job_portal`

Main backend config file: `src/main/resources/application.yaml`

### Repository Info

- `JobRepository` extends `ElasticsearchRepository<JobDocument, String>`
- `JobApplicationRepository` extends `JpaRepository<JobApplication, Long>`
- Repository pattern is used via service interfaces + implementations.

## Build and Run / Launch (Local)

### Prerequisites

- Java 17+
- Node.js 18+ / npm
- Docker + Docker Compose

### Run Full Stack with Docker

```bash
docker compose up -d --build
```

Access:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- Elasticsearch: `http://localhost:9200`
- MySQL: `localhost:3306`

### Run Backend + Frontend Manually

```bash
# backend
./mvnw spring-boot:run
```

```bash
# frontend
cd frontend
npm install
npm run dev
```

## Build Deployment and Run / Launch Info

### Option A: Deploy Both Together on One Platform (Recommended)

Use a Docker-friendly platform (Railway, Render, Fly.io, VPS, Oracle VM):

```bash
docker compose up -d --build
```

or deploy services individually (`backend`, `frontend`, `mysql`, `elasticsearch`) using Dockerfiles.

### Option B: Vercel + External Backend

- Deploy `frontend/` to Vercel
- Deploy backend (Spring Boot) + MySQL + Elasticsearch on another platform
- Set frontend env variable:

```env
VITE_API_BASE=https://your-backend-domain/api
```

## Steps to Use

1. Start infrastructure (`docker compose up -d --build`) or run services manually.
2. Open frontend at `http://localhost:5173`.
3. Create a job from UI (`Add Job` form) or use `rest.http`.
4. Search/filter jobs from `Search Jobs`.
5. Select a job and submit application from `Apply`.
6. Verify APIs:
- `POST /api/jobs`
- `GET /api/jobs`
- `GET /api/jobs/{id}`
- `GET /api/jobs/search?q=&location=&skill=&minExperience=`
- `POST /api/applications`
- `GET /api/applications?jobId=...`

You can use [rest.http](rest.http) for quick API testing.

## License

This project is proprietary and closed-source.
No one is allowed to copy, use, modify, or redistribute this code without written permission.
See [LICENSE](LICENSE).

---

All rights reserved. Happy coding! 

Build with ❤️ by Raj Kumar Sony. for more information, visit: `https://rajkumarsony.vercel.app`.
