import React from "react";
import { Link } from "react-router-dom";
import { formatList, formatNumber } from "../utils/countries";

const CountryCard = ({ country }) => {
  const { code, name, flag, population, region, capital, officialName } =
    country;

  return (
    <Link className="country-card" to={`/countries/${code}`}>
      <article>
        <div className="card-flag">
          <img src={flag} alt={`${name} flag`} />
        </div>
        <div className="card-body">
          <p className="card-kicker">{region}</p>
          <h2>{name}</h2>
          <p className="card-subtitle">{officialName}</p>
          <dl className="card-meta">
            <div>
              <dt>Capital</dt>
              <dd>{formatList(capital)}</dd>
            </div>
            <div>
              <dt>Population</dt>
              <dd>{formatNumber(population)}</dd>
            </div>
          </dl>
          <span className="card-link">View details</span>
        </div>
      </article>
    </Link>
  );
};

export default CountryCard;
