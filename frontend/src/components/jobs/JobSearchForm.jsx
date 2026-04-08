import PropTypes from "prop-types";
import { inputClass, labelClass, secondaryButtonClass } from "../../constants/uiClasses";

function JobSearchForm({ filters, setFilters, onSearch }) {
  const updateField = (field) => (event) => {
    setFilters((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-5">
      <div>
        <label className={labelClass} htmlFor="search-keyword">Keyword</label>
        <input
          id="search-keyword"
          className={inputClass}
          placeholder="Java developer"
          value={filters.q}
          onChange={updateField("q")}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="search-location">Location</label>
        <input
          id="search-location"
          className={inputClass}
          placeholder="Tokyo"
          value={filters.location}
          onChange={updateField("location")}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="search-skill">Skill</label>
        <input
          id="search-skill"
          className={inputClass}
          placeholder="Spring Boot"
          value={filters.skill}
          onChange={updateField("skill")}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="search-min-exp">Min Experience</label>
        <input
          id="search-min-exp"
          className={inputClass}
          type="number"
          min="0"
          placeholder="2"
          value={filters.minExperience}
          onChange={updateField("minExperience")}
        />
      </div>
      <div className="flex items-end">
        <button type="button" className={`${secondaryButtonClass} w-full`} onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

JobSearchForm.propTypes = {
  filters: PropTypes.shape({
    q: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    skill: PropTypes.string.isRequired,
    minExperience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default JobSearchForm;
