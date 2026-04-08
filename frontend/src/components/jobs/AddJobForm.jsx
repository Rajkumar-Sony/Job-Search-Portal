import PropTypes from "prop-types";
import { inputClass, labelClass, primaryButtonClass } from "../../constants/uiClasses";

function AddJobForm({ jobForm, setJobForm, onSubmit, submitLabel, onCancel }) {
  const updateField = (field) => (event) => {
    setJobForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <div>
        <label className={labelClass} htmlFor="job-title">Title</label>
        <input
          id="job-title"
          className={inputClass}
          placeholder="Backend Engineer"
          value={jobForm.title}
          onChange={updateField("title")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-company">Company</label>
        <input
          id="job-company"
          className={inputClass}
          placeholder="ABC Corp"
          value={jobForm.company}
          onChange={updateField("company")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-location">Location</label>
        <input
          id="job-location"
          className={inputClass}
          placeholder="Tokyo"
          value={jobForm.location}
          onChange={updateField("location")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-skills">Skills (comma separated)</label>
        <input
          id="job-skills"
          className={inputClass}
          placeholder="Java, Spring Boot"
          value={jobForm.skills}
          onChange={updateField("skills")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-experience">Experience (years)</label>
        <input
          id="job-experience"
          className={inputClass}
          type="number"
          min="0"
          placeholder="3"
          value={jobForm.experience}
          onChange={updateField("experience")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-salary">Salary</label>
        <input
          id="job-salary"
          className={inputClass}
          type="number"
          min="0"
          placeholder="6000000"
          value={jobForm.salary}
          onChange={updateField("salary")}
          required
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="job-description">Description</label>
        <textarea
          id="job-description"
          className={inputClass}
          placeholder="Short role description"
          value={jobForm.description}
          onChange={updateField("description")}
          required
        />
      </div>
      <div className="flex gap-2">
        <button className={primaryButtonClass} type="submit">
          {submitLabel}
        </button>
        {onCancel && (
          <button
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

AddJobForm.propTypes = {
  jobForm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  setJobForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  onCancel: PropTypes.func
};

AddJobForm.defaultProps = {
  submitLabel: "Create Job",
  onCancel: undefined
};

export default AddJobForm;
