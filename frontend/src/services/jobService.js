import apiClient from "./apiClient";

function buildQuery(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      searchParams.set(key, String(value).trim());
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

function toJobPayload(jobForm) {
  return {
    ...jobForm,
    skills: jobForm.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
    experience: Number(jobForm.experience),
    salary: Number(jobForm.salary)
  };
}

export async function searchJobs(filters, page = 0, size = 10) {
  const query = buildQuery({
    q: filters.q,
    location: filters.location,
    skill: filters.skill,
    minExperience: filters.minExperience,
    page,
    size
  });
  const response = await apiClient.get(`/jobs/search${query}`);
  return response.data;
}

export async function createJob(jobForm) {
  const response = await apiClient.post("/jobs", toJobPayload(jobForm));
  return response.data;
}

export async function updateJob(jobId, jobForm) {
  const response = await apiClient.put(`/jobs/${jobId}`, toJobPayload(jobForm));
  return response.data;
}

export async function deleteJob(jobId) {
  await apiClient.delete(`/jobs/${jobId}`);
}

export async function getJobById(jobId) {
  const response = await apiClient.get(`/jobs/${jobId}`);
  return response.data;
}

export async function deleteAllJobs() {
  await apiClient.delete("/jobs");
}

export async function seedDemoJobs(count = 20) {
  const response = await apiClient.post(`/jobs/seed${buildQuery({ count })}`);
  return response.data;
}

export async function createApplication(applicationForm) {
  const response = await apiClient.post("/applications", applicationForm);
  return response.data;
}

export async function listApplications(jobId = "", page = 0, size = 10) {
  const response = await apiClient.get(`/applications${buildQuery({ jobId, page, size })}`);
  return response.data;
}

export async function withdrawApplication(applicationId) {
  const response = await apiClient.patch(`/applications/${applicationId}/withdraw`);
  return response.data;
}

export async function deleteAllApplications() {
  await apiClient.delete("/applications");
}
