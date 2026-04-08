import { inputClass, primaryButtonClass } from "../../constants/uiClasses";

function ApplicationForm({ applicationForm, setApplicationForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <input
        className={inputClass}
        placeholder="Job ID"
        value={applicationForm.jobId}
        onChange={(e) => setApplicationForm((prev) => ({ ...prev, jobId: e.target.value }))}
        required
      />
      <input
        className={inputClass}
        placeholder="Applicant Name"
        value={applicationForm.applicantName}
        onChange={(e) => setApplicationForm((prev) => ({ ...prev, applicantName: e.target.value }))}
        required
      />
      <input
        className={inputClass}
        placeholder="Email"
        value={applicationForm.email}
        onChange={(e) => setApplicationForm((prev) => ({ ...prev, email: e.target.value }))}
        required
      />
      <input
        className={inputClass}
        placeholder="Resume Link"
        value={applicationForm.resumeLink}
        onChange={(e) => setApplicationForm((prev) => ({ ...prev, resumeLink: e.target.value }))}
        required
      />
      <button className={primaryButtonClass} type="submit">
        Submit Application
      </button>
    </form>
  );
}

export default ApplicationForm;
