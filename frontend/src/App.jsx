import { useState } from "react";
import ApplicationForm from "./components/applications/ApplicationForm";
import AddJobForm from "./components/jobs/AddJobForm";
import JobList from "./components/jobs/JobList";
import JobSearchForm from "./components/jobs/JobSearchForm";
import { initialApplication, initialFilters, initialJob } from "./constants/formDefaults";
import { createApplicationApi, createJobApi, searchJobsApi } from "./services/jobApi";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [jobForm, setJobForm] = useState(initialJob);
  const [applicationForm, setApplicationForm] = useState(initialApplication);
  const [message, setMessage] = useState("");

  const searchJobs = async () => {
    try {
      const data = await searchJobsApi(filters);
      setJobs(data);
      setMessage("");
    } catch (error) {
      setMessage(error.message || "Failed to search jobs.");
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await createJobApi(jobForm);
      setJobForm(initialJob);
      setMessage("Job created successfully.");
      await searchJobs();
    } catch (error) {
      setMessage(error.message || "Failed to create job.");
    }
  };

  const applyJob = async (e) => {
    e.preventDefault();
    try {
      await createApplicationApi(applicationForm);
      setApplicationForm(initialApplication);
      setMessage("Application submitted.");
    } catch (error) {
      setMessage(error.message || "Failed to submit application.");
    }
  };

  const pickJobForApplication = (jobId) => {
    setApplicationForm((prev) => ({ ...prev, jobId }));
  };

  return (
    <main className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
        <h1 className="text-3xl font-bold text-slate-900">Job Search Portal</h1>
        {message && (
          <p className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900">
            {message}
          </p>
        )}

        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Search Jobs</h2>
          <JobSearchForm filters={filters} setFilters={setFilters} onSearch={searchJobs} />
          <JobList jobs={jobs} onApply={pickJobForApplication} />
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Add Job</h2>
          <AddJobForm jobForm={jobForm} setJobForm={setJobForm} onSubmit={createJob} />
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Apply</h2>
          <ApplicationForm
            applicationForm={applicationForm}
            setApplicationForm={setApplicationForm}
            onSubmit={applyJob}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
