import { primaryButtonClass } from "../../constants/uiClasses";

function JobList({ jobs, onApply }) {
  if (!jobs.length) {
    return <p className="text-sm text-slate-600">No jobs found. Try a different search.</p>;
  }

  return (
    <ul className="grid gap-3">
      {jobs.map((job) => (
        <li key={job.id} className="rounded-lg border border-slate-200 p-4">
          <div className="mb-1 flex items-center justify-between gap-3">
            <strong className="text-slate-900">{job.title}</strong>
            <span className="text-sm text-slate-600">{job.company}</span>
          </div>
          <div className="text-sm text-slate-700">{job.location}</div>
          <div className="mt-2 text-sm text-slate-700">{job.description}</div>
          <div className="mt-2 text-sm text-slate-700">Skills: {(job.skills || []).join(", ")}</div>
          <div className="text-sm text-slate-700">Experience: {job.experience} years</div>
          <div className="mb-3 text-sm text-slate-700">Salary: {job.salary}</div>
          <button className={primaryButtonClass} onClick={() => onApply(job.id)}>
            Apply for this Job
          </button>
        </li>
      ))}
    </ul>
  );
}

export default JobList;
