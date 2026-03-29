import React from "react";
import { Link, useParams } from "react-router-dom";
import StatusPanel from "../components/StatusPanel";
import {
  formatList,
  formatNumber,
  getBorderNames,
  getCountryByCode,
} from "../utils/countries";

const CountryDetails = ({ countries, isLoading, error, reload }) => {
  const { code } = useParams();
  const country = getCountryByCode(countries, code);

  if (isLoading) {
    return (
      <main className="page-shell detail-shell">
        <StatusPanel
          title="Loading country profile"
          message="Preparing the selected country details."
          compact
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-shell detail-shell">
        <StatusPanel
          title="Could not load country details"
          message={error}
          actionLabel="Try again"
          onAction={reload}
          compact
        />
      </main>
    );
  }

  if (!country) {
    return (
      <main className="page-shell detail-shell">
        <StatusPanel
          title="Country not found"
          message="The selected country is not available in the current dataset."
          actionLabel="Back to explorer"
          linkTo="/"
          compact
        />
      </main>
    );
  }

  const borderNames = getBorderNames(country, countries);

  return (
    <main className="page-shell detail-shell">
      <div className="detail-actions">
        <Link className="secondary-button" to="/">
          Back to explorer
        </Link>
      </div>

      <section className="detail-card">
        <div className="detail-flag">
          <img src={country.flag} alt={`${country.name} flag`} />
        </div>

        <div className="detail-content">
          <p className="eyebrow">Country profile</p>
          <h1>{country.name}</h1>
          <p className="detail-subtitle">{country.officialName}</p>

          <div className="detail-grid">
            <div>
              <span>Capital</span>
              <strong>{formatList(country.capital)}</strong>
            </div>
            <div>
              <span>Population</span>
              <strong>{formatNumber(country.population)}</strong>
            </div>
            <div>
              <span>Region</span>
              <strong>{country.region}</strong>
            </div>
            <div>
              <span>Subregion</span>
              <strong>{country.subregion}</strong>
            </div>
            <div>
              <span>Top-level domains</span>
              <strong>{formatList(country.topLevelDomain)}</strong>
            </div>
            <div>
              <span>Languages</span>
              <strong>{formatList(country.languages)}</strong>
            </div>
            <div className="detail-grid-wide">
              <span>Currencies</span>
              <strong>{formatList(country.currencies)}</strong>
            </div>
          </div>

          <section className="detail-section">
            <h2>Border countries</h2>
            {borderNames.length ? (
              <ul className="badge-list">
                {borderNames.map((borderName) => (
                  <li key={borderName}>{borderName}</li>
                ))}
              </ul>
            ) : (
              <p className="muted-text">This country has no land borders.</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default CountryDetails;
