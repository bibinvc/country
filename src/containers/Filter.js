import React from "react";

const Filter = ({
  searchInput,
  setSearchInput,
  selectedRegion,
  setSelectedRegion,
  regions,
  resultsCount,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <label className="field" htmlFor="search">
        <span>Search</span>
        <input
          id="search"
          type="search"
          name="search"
          autoComplete="off"
          placeholder="Search by country, capital, or region"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </label>

      <label className="field" htmlFor="region">
        <span>Region</span>
        <select
          id="region"
          name="region"
          value={selectedRegion}
          onChange={(event) => setSelectedRegion(event.target.value)}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </label>

      <p className="filter-summary">
        <strong>{resultsCount}</strong> countries visible
      </p>
    </form>
  );
};

export default Filter;
