import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppliedJobsTable from "../components/applications/AppliedJobsTable";
import ApplicationForm from "../components/applications/ApplicationForm";
import AlertMessage from "../components/common/AlertMessage";
import PaginationControls from "../components/common/PaginationControls";
import { initialApplication } from "../constants/formDefaults";
import {
  createApplication,
  deleteAllApplications,
  listApplications,
  withdrawApplication
} from "../services/jobService";
import { getErrorMessage } from "../utils/errorMessage";
import { createEmptyPage } from "../utils/pageState";

const DEFAULT_PAGE_SIZE = 10;

function ApplyPage({ selectedJobId = "" }) {
  const [applicationForm, setApplicationForm] = useState({
    ...initialApplication,
    jobId: selectedJobId || ""
  });
  const [applicationsPage, setApplicationsPage] = useState(() => createEmptyPage(DEFAULT_PAGE_SIZE));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadApplications = async (page = 0) => {
    setLoading(true);
    setError("");
    try {
      const data = await listApplications("", page, applicationsPage.size || DEFAULT_PAGE_SIZE);
      setApplicationsPage(data);
      setMessage("");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to load applications."));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await createApplication(applicationForm);
      setMessage("Application submitted.");
      setApplicationForm({
        ...initialApplication,
        jobId: applicationForm.jobId
      });
      await loadApplications(0);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to submit application."));
    }
  };

  const onWithdraw = async (id) => {
    setError("");
    try {
      await withdrawApplication(id);
      setMessage("Application withdrawn.");
      await loadApplications(applicationsPage.page);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to withdraw application."));
    }
  };

  const onDeleteAll = async () => {
    const shouldDeleteAll = globalThis.confirm("Delete all applications?");
    if (shouldDeleteAll === false) {
      return;
    }
    setError("");
    try {
      await deleteAllApplications();
      setMessage("All applications removed.");
      await loadApplications(0);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to delete all applications."));
    }
  };

  useEffect(() => {
    setApplicationForm((previousForm) => {
      const nextJobId = selectedJobId || previousForm.jobId;
      return {
        ...previousForm,
        jobId: nextJobId
      };
    });
  }, [selectedJobId]);

  useEffect(() => {
    void loadApplications(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-6">
      <AlertMessage type="success" message={message} />
      <AlertMessage type="error" message={error} />

      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-2 text-xl font-semibold text-slate-900">Apply for Job</h2>
        <p className="mb-4 text-sm text-slate-600">
          Select a job from the Jobs page or enter the Job ID manually.
        </p>
        <ApplicationForm
          applicationForm={applicationForm}
          setApplicationForm={setApplicationForm}
          onSubmit={onSubmit}
        />
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900">Applied Jobs</h3>
          <button
            type="button"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            onClick={onDeleteAll}
          >
            Remove All Applications
          </button>
        </div>
        <p className="mb-3 text-sm text-slate-600">
          Total: {applicationsPage.totalItems} applications | Load time: {applicationsPage.loadTimeMs ?? 0} ms
        </p>
        {loading && <p className="mb-3 text-sm text-slate-600">Loading applications...</p>}
        <AppliedJobsTable applications={applicationsPage.content} onWithdraw={onWithdraw} />
        <PaginationControls pageState={applicationsPage} onChange={loadApplications} />
      </section>
    </div>
  );
}

ApplyPage.propTypes = {
  selectedJobId: PropTypes.string
};

export default ApplyPage;
