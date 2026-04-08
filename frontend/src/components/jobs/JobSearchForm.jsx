import { inputClass, secondaryButtonClass } from "../../constants/uiClasses";

function JobSearchForm({ filters, setFilters, onSearch }) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-5">
      <input
        className={inputClass}
        placeholder="Keyword"
        value={filters.q}
        onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
      />
      <input
        className={inputClass}
        placeholder="Location"
        value={filters.location}
        onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
      />
      <input
        className={inputClass}
        placeholder="Skill"
        value={filters.skill}
        onChange={(e) => setFilters((prev) => ({ ...prev, skill: e.target.value }))}
      />
      <input
        className={inputClass}
        type="number"
        placeholder="Min Experience"
        value={filters.minExperience}
        onChange={(e) => setFilters((prev) => ({ ...prev, minExperience: e.target.value }))}
      />
      <button className={secondaryButtonClass} onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default JobSearchForm;
