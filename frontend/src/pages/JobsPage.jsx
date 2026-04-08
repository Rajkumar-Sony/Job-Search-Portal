import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AlertMessage from "../components/common/AlertMessage";
import PaginationControls from "../components/common/PaginationControls";
import AddJobForm from "../components/jobs/AddJobForm";
import JobList from "../components/jobs/JobList";
import JobSearchForm from "../components/jobs/JobSearchForm";
import { initialFilters, initialJob } from "../constants/formDefaults";
import {
  deleteAllJobs,
  deleteJob,
  getJobById,
  searchJobs,
  seedDemoJobs,
  updateJob
} from "../services/jobService";
import { getErrorMessage } from "../utils/errorMessage";
import { createEmptyPage } from "../utils/pageState";

const DEFAULT_PAGE_SIZE = 10;

function toJobForm(job) {
  return {
    title: job.title ?? "",
    company: job.company ?? "",
    location: job.location ?? "",
    skills: (job.skills || []).join(", "),
    experience: job.experience ?? 0,
    salary: job.salary ?? 0,
    description: job.description ?? ""
  };
}

function JobsPage({ onPickJobForApplication }) {
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [jobsPage, setJobsPage] = useState(() => createEmptyPage(DEFAULT_PAGE_SIZE));
  const [previewJob, setPreviewJob] = useState(null);
  const [editingJobId, setEditingJobId] = useState("");
  const [editForm, setEditForm] = useState(initialJob);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadJobs = async (page = 0, searchFilters = activeFilters, options = {}) => {
    const { clearMessage = true } = options;
    setLoading(true);
    setError("");
    try {
      const response = await searchJobs(searchFilters, page, jobsPage.size || DEFAULT_PAGE_SIZE);
      setJobsPage(response);
      if (clearMessage) {
        setMessage("");
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to load jobs."));
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async () => {
    const nextFilters = { ...filters };
    setActiveFilters(nextFilters);
    await loadJobs(0, nextFilters);
  };

  const onPageChange = async (nextPage) => {
    await loadJobs(nextPage, activeFilters);
  };

  const onPreview = async (jobId) => {
    setError("");
    try {
      const job = await getJobById(jobId);
      setPreviewJob(job);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to load job details."));
    }
  };

  const onEdit = (job) => {
    setEditingJobId(job.id);
    setEditForm(toJobForm(job));
  };

  const onEditSubmit = async (event) => {
    event.preventDefault();
    if (editingJobId === "") {
      return;
    }
    setError("");
    try {
      await updateJob(editingJobId, editForm);
      setMessage("Job updated successfully.");
      setEditingJobId("");
      setEditForm(initialJob);
      await loadJobs(jobsPage.page, activeFilters, { clearMessage: false });
      if (previewJob?.id === editingJobId) {
        const job = await getJobById(editingJobId);
        setPreviewJob(job);
      }
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to update job."));
    }
  };

  const onDelete = async (jobId) => {
    const shouldDelete = globalThis.confirm(`Delete job ${jobId}?`);
    if (shouldDelete === false) {
      return;
    }
    setError("");
    try {
      await deleteJob(jobId);
      setMessage("Job removed.");
      if (previewJob?.id === jobId) {
        setPreviewJob(null);
      }
      await loadJobs(0, activeFilters, { clearMessage: false });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to remove job."));
    }
  };

  const onDeleteAll = async () => {
    const shouldDeleteAll = globalThis.confirm("Delete all jobs?");
    if (shouldDeleteAll === false) {
      return;
    }
    setError("");
    try {
      await deleteAllJobs();
      setPreviewJob(null);
      setEditingJobId("");
      setEditForm(initialJob);
      setMessage("All jobs removed.");
      await loadJobs(0, activeFilters, { clearMessage: false });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to remove all jobs."));
    }
  };

  const onSeedDemo = async () => {
    setError("");
    try {
      await seedDemoJobs(20);
      setMessage("Seeded 20 demo jobs.");
      await loadJobs(0, activeFilters, { clearMessage: false });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to seed demo jobs."));
    }
  };

  useEffect(() => {
    void loadJobs(0, activeFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-6">
      <AlertMessage type="success" message={message} />
      <AlertMessage type="error" message={error} />

      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Jobs</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
              onClick={onSeedDemo}
            >
              Seed Demo Jobs (20)
            </button>
            <button
              type="button"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              onClick={onDeleteAll}
            >
              Remove All Jobs
            </button>
          </div>
        </div>

        <JobSearchForm filters={filters} setFilters={setFilters} onSearch={onSearch} />
        <p className="mb-3 text-sm text-slate-600">
          Total: {jobsPage.totalItems} jobs | Load time: {jobsPage.loadTimeMs ?? 0} ms
        </p>
        {loading && <p className="mb-3 text-sm text-slate-600">Loading jobs...</p>}
        <JobList
          jobs={jobsPage.content}
          onApply={onPickJobForApplication}
          onPreview={onPreview}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <PaginationControls pageState={jobsPage} onChange={onPageChange} />
      </section>

      {previewJob && (
        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Job Preview</h3>
          <div className="grid gap-2 text-sm text-slate-800 md:grid-cols-2">
            <p>
              <span className="font-semibold">Job ID:</span> {previewJob.id}
            </p>
            <p>
              <span className="font-semibold">Title:</span> {previewJob.title}
            </p>
            <p>
              <span className="font-semibold">Company:</span> {previewJob.company}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {previewJob.location}
            </p>
            <p>
              <span className="font-semibold">Skills:</span> {(previewJob.skills || []).join(", ")}
            </p>
            <p>
              <span className="font-semibold">Experience:</span> {previewJob.experience} years
            </p>
            <p>
              <span className="font-semibold">Salary:</span> {previewJob.salary}
            </p>
            <p>
              <span className="font-semibold">Posted:</span> {previewJob.postedDate}
            </p>
            <p className="md:col-span-2">
              <span className="font-semibold">Description:</span> {previewJob.description}
            </p>
          </div>
        </section>
      )}

      {editingJobId && (
        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Update Job: {editingJobId}</h3>
          <AddJobForm
            jobForm={editForm}
            setJobForm={setEditForm}
            onSubmit={onEditSubmit}
            submitLabel="Update Job"
            onCancel={() => {
              setEditingJobId("");
              setEditForm(initialJob);
            }}
          />
        </section>
      )}
    </div>
  );
}

JobsPage.propTypes = {
  onPickJobForApplication: PropTypes.func.isRequired
};

export default JobsPage;
