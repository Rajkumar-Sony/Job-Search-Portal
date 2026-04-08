const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

async function parseResponse(response) {
  if (!response.ok) {
    let message = "Request failed.";
    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // ignore JSON parse errors and keep fallback message
    }
    throw new Error(message);
  }
  return response.json();
}

export async function searchJobsApi(filters) {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.location.trim()) params.set("location", filters.location.trim());
  if (filters.skill.trim()) params.set("skill", filters.skill.trim());
  if (filters.minExperience !== "") params.set("minExperience", filters.minExperience);

  const response = await fetch(`${API_BASE}/jobs/search?${params.toString()}`);
  return parseResponse(response);
}

export async function createJobApi(jobForm) {
  const payload = {
    ...jobForm,
    skills: jobForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
    experience: Number(jobForm.experience),
    salary: Number(jobForm.salary)
  };

  const response = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse(response);
}

export async function createApplicationApi(applicationForm) {
  const response = await fetch(`${API_BASE}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(applicationForm)
  });
  return parseResponse(response);
}
