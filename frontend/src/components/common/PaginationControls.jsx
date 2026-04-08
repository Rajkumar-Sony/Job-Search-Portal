import PropTypes from "prop-types";
import { secondaryButtonClass } from "../../constants/uiClasses";

function PaginationControls({ pageState, onChange }) {
  const { page, totalPages, hasPrevious, hasNext } = pageState;
  const safeTotalPages = totalPages || 0;
  const isPreviousDisabled = hasPrevious === false;
  const isNextDisabled = hasNext === false;
  const previousButtonClass = isPreviousDisabled
    ? `${secondaryButtonClass} cursor-not-allowed opacity-50`
    : secondaryButtonClass;
  const nextButtonClass = isNextDisabled
    ? `${secondaryButtonClass} cursor-not-allowed opacity-50`
    : secondaryButtonClass;

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <button
        type="button"
        className={previousButtonClass}
        onClick={() => onChange(page - 1)}
        disabled={isPreviousDisabled}
      >
        Previous
      </button>
      <p className="text-sm text-slate-700">
        Page {safeTotalPages === 0 ? 0 : page + 1} / {safeTotalPages}
      </p>
      <button
        type="button"
        className={nextButtonClass}
        onClick={() => onChange(page + 1)}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
}

PaginationControls.propTypes = {
  pageState: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default PaginationControls;
