import { useState } from "react";
import AddJobForm from "../components/jobs/AddJobForm";
import AlertMessage from "../components/common/AlertMessage";
import { initialJob } from "../constants/formDefaults";
import { createJob } from "../services/jobService";
import { getErrorMessage } from "../utils/errorMessage";

function PostJobPage() {
  const [jobForm, setJobForm] = useState(initialJob);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await createJob(jobForm);
      setJobForm(initialJob);
      setMessage("Job created successfully.");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to create job."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Post a Job</h2>
      <AlertMessage type="success" message={message} />
      <AlertMessage type="error" message={error} />
      {submitting && <p className="mb-4 text-sm text-slate-600">Creating job...</p>}
      <AddJobForm jobForm={jobForm} setJobForm={setJobForm} onSubmit={onSubmit} />
    </section>
  );
}

export default PostJobPage;
