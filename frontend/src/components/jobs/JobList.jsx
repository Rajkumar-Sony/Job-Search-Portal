import PropTypes from "prop-types";
import {
  dangerButtonClass,
  secondaryButtonClass,
  successButtonClass
} from "../../constants/uiClasses";

function JobList({ jobs, onApply, onPreview, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return <p className="text-sm text-slate-600">No jobs found. Try a different search.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Job ID</th>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Company</th>
            <th className="px-4 py-3 font-semibold">Location</th>
            <th className="px-4 py-3 font-semibold">Skills</th>
            <th className="px-4 py-3 font-semibold">Experience</th>
            <th className="px-4 py-3 font-semibold">Salary</th>
            <th className="px-4 py-3 font-semibold">Posted Date</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="px-4 py-3 align-top font-semibold text-blue-700">{job.id}</td>
              <td className="px-4 py-3 align-top">{job.title}</td>
              <td className="px-4 py-3 align-top">{job.company}</td>
              <td className="px-4 py-3 align-top">{job.location}</td>
              <td className="px-4 py-3 align-top">{(job.skills || []).join(", ")}</td>
              <td className="px-4 py-3 align-top">{job.experience} years</td>
              <td className="px-4 py-3 align-top">{job.salary}</td>
              <td className="px-4 py-3 align-top">{job.postedDate || "-"}</td>
              <td className="px-4 py-3 align-top">
                <div className="flex flex-wrap gap-2">
                  <button type="button" className={secondaryButtonClass} onClick={() => onPreview(job.id)}>
                    Preview
                  </button>
                  <button type="button" className={secondaryButtonClass} onClick={() => onEdit(job)}>
                    Update
                  </button>
                  <button type="button" className={dangerButtonClass} onClick={() => onDelete(job.id)}>
                    Remove
                  </button>
                  <button type="button" className={successButtonClass} onClick={() => onApply(job.id)}>
                    Apply
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string),
      experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      postedDate: PropTypes.string
    })
  ).isRequired,
  onApply: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default JobList;
