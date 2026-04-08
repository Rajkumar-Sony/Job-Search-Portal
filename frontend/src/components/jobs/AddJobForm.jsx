import { inputClass, primaryButtonClass } from "../../constants/uiClasses";

function AddJobForm({ jobForm, setJobForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <input
        className={inputClass}
        placeholder="Title"
        value={jobForm.title}
        onChange={(e) => setJobForm((prev) => ({ ...prev, title: e.target.value }))}
        required
      />
      <input
        className={inputClass}
        placeholder="Company"
        value={jobForm.company}
        onChange={(e) => setJobForm((prev) => ({ ...prev, company: e.target.value }))}
        required
      />
      <input
        className={inputClass}
        placeholder="Location"
        value={jobForm.location}
        onChange={(e) => setJobForm((prev) => ({ ...prev, location: e.target.value }))}
        required
      />
      <input
        className={inputClass}
        placeholder="Skills (comma separated)"
        value={jobForm.skills}
        onChange={(e) => setJobForm((prev) => ({ ...prev, skills: e.target.value }))}
        required
      />
      <input
        className={inputClass}
        type="number"
        placeholder="Experience"
        value={jobForm.experience}
        onChange={(e) => setJobForm((prev) => ({ ...prev, experience: e.target.value }))}
        required
      />
      <input
        className={inputClass}
        type="number"
        placeholder="Salary"
        value={jobForm.salary}
        onChange={(e) => setJobForm((prev) => ({ ...prev, salary: e.target.value }))}
        required
      />
      <textarea
        className={inputClass}
        placeholder="Description"
        value={jobForm.description}
        onChange={(e) => setJobForm((prev) => ({ ...prev, description: e.target.value }))}
        required
      />
      <button className={primaryButtonClass} type="submit">
        Create Job
      </button>
    </form>
  );
}

export default AddJobForm;
