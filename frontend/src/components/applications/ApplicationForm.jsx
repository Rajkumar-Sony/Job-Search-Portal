import PropTypes from "prop-types";
import { inputClass, labelClass, successButtonClass } from "../../constants/uiClasses";

function ApplicationForm({ applicationForm, setApplicationForm, onSubmit }) {
  const updateField = (field) => (event) => {
    setApplicationForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <div>
        <label className={labelClass} htmlFor="application-job-id">Job ID</label>
        <input
          id="application-job-id"
          className={inputClass}
          placeholder="JOB-0001"
          value={applicationForm.jobId}
          onChange={updateField("jobId")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="application-name">Applicant Name</label>
        <input
          id="application-name"
          className={inputClass}
          placeholder="Jane Doe"
          value={applicationForm.applicantName}
          onChange={updateField("applicantName")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="application-email">Email</label>
        <input
          id="application-email"
          className={inputClass}
          type="email"
          placeholder="jane@example.com"
          value={applicationForm.email}
          onChange={updateField("email")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="application-resume">Resume Link</label>
        <input
          id="application-resume"
          className={inputClass}
          placeholder="https://example.com/resume"
          value={applicationForm.resumeLink}
          onChange={updateField("resumeLink")}
          required
        />
      </div>
      <button className={successButtonClass} type="submit">
        Submit Application
      </button>
    </form>
  );
}

ApplicationForm.propTypes = {
  applicationForm: PropTypes.shape({
    jobId: PropTypes.string.isRequired,
    applicantName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    resumeLink: PropTypes.string.isRequired
  }).isRequired,
  setApplicationForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ApplicationForm;
