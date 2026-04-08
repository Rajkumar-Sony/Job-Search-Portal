import PropTypes from "prop-types";
import { dangerButtonClass, secondaryButtonClass } from "../../constants/uiClasses";

function AppliedJobsTable({ applications, onWithdraw }) {
  if (applications.length === 0) {
    return <p className="text-sm text-slate-600">No applications yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-700">
          <tr>
            <th className="px-4 py-3 font-semibold">Application ID</th>
            <th className="px-4 py-3 font-semibold">Job ID</th>
            <th className="px-4 py-3 font-semibold">Applicant</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Applied At</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
          {applications.map((application) => {
            const withdrawn = application.status === "WITHDRAWN";
            return (
              <tr key={application.id}>
                <td className="px-4 py-3 align-top">{application.id}</td>
                <td className="px-4 py-3 align-top">{application.jobId}</td>
                <td className="px-4 py-3 align-top">{application.applicantName}</td>
                <td className="px-4 py-3 align-top">{application.email}</td>
                <td className="px-4 py-3 align-top">{application.status}</td>
                <td className="px-4 py-3 align-top">{application.appliedAt}</td>
                <td className="px-4 py-3 align-top">
                  <button
                    type="button"
                    className={withdrawn ? `${secondaryButtonClass} cursor-not-allowed opacity-60` : dangerButtonClass}
                    onClick={() => onWithdraw(application.id)}
                    disabled={withdrawn}
                  >
                    {withdrawn ? "Withdrawn" : "Withdraw"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

AppliedJobsTable.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      jobId: PropTypes.string.isRequired,
      applicantName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      appliedAt: PropTypes.string
    })
  ).isRequired,
  onWithdraw: PropTypes.func.isRequired
};

export default AppliedJobsTable;
