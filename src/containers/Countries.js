import React, { useState } from "react";
import CountryCard from "../components/CountryCard";
import StatusPanel from "../components/StatusPanel";
import { getRegions } from "../utils/countries";
import Filter from "./Filter";

const Countries = ({ countries, isLoading, error, reload }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const normalizedSearch = searchInput.trim().toLowerCase();
  const regions = getRegions(countries);
  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      !normalizedSearch ||
      [
        country.name,
        country.officialName,
        country.region,
        country.subregion,
        country.capital.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <main className="page-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Country Explorer</p>
          <h1>Browse every country from one clean dashboard.</h1>
          <p className="hero-text">
            Search by country name, capital city, or region, then open a full
            profile with borders, languages, currencies, and domain details.
          </p>
        </div>

        <div className="hero-stats">
          <article>
            <strong>{countries.length || "250+"}</strong>
            <span>countries indexed</span>
          </article>
          <article>
            <strong>{Math.max(regions.length - 1, 0)}</strong>
            <span>regions available</span>
          </article>
          <article>
            <strong>{filteredCountries.length}</strong>
            <span>results shown</span>
          </article>
        </div>
      </header>

      <Filter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        regions={regions}
        resultsCount={filteredCountries.length}
      />

      {isLoading ? (
        <StatusPanel
          title="Loading countries"
          message="Pulling the latest country dataset into the explorer."
        />
      ) : error ? (
        <StatusPanel
          title="Could not load country data"
          message={error}
          actionLabel="Try again"
          onAction={reload}
        />
      ) : filteredCountries.length ? (
        <section className="countries-grid">
          {filteredCountries.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </section>
      ) : (
        <StatusPanel
          title="No countries matched your filters"
          message="Try a different search term or switch back to all regions."
          compact
        />
      )}
    </main>
  );
};

export default Countries;
