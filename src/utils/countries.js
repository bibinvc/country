const COUNTRIES_API_URL =
  "https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,subregion,capital,tld,currencies,languages,borders";

let countriesCache = null;
let countriesRequest = null;

const toArray = (value) => {
  return Array.isArray(value) ? value.filter(Boolean) : [];
};

const formatCurrency = (currency) => {
  if (!currency?.name) {
    return "";
  }

  return currency.symbol
    ? `${currency.name} (${currency.symbol})`
    : currency.name;
};

const normalizeCountry = (country) => {
  const commonName = country?.name?.common || "Unknown country";

  return {
    code: country?.cca3 || commonName,
    name: commonName,
    officialName: country?.name?.official || commonName,
    flag: country?.flags?.svg || country?.flags?.png || "",
    population: country?.population || 0,
    region: country?.region || "Other",
    subregion: country?.subregion || "Unknown",
    capital: toArray(country?.capital),
    topLevelDomain: toArray(country?.tld),
    currencies: country?.currencies
      ? Object.values(country.currencies).map(formatCurrency).filter(Boolean)
      : [],
    languages: country?.languages
      ? Object.values(country.languages).filter(Boolean)
      : [],
    borders: toArray(country?.borders),
  };
};

export const getCountries = async (forceRefresh = false) => {
  if (forceRefresh) {
    countriesCache = null;
  }

  if (countriesCache) {
    return countriesCache;
  }

  if (countriesRequest) {
    return countriesRequest;
  }

  countriesRequest = fetch(COUNTRIES_API_URL)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          "The countries service is unavailable. Please try again shortly."
        );
      }

      const data = await response.json();
      const normalizedCountries = data
        .map(normalizeCountry)
        .filter((country) => Boolean(country.code))
        .sort((firstCountry, secondCountry) =>
          firstCountry.name.localeCompare(secondCountry.name)
        );

      countriesCache = normalizedCountries;
      return normalizedCountries;
    })
    .catch((fetchError) => {
      throw new Error(fetchError.message || "Unable to load countries.");
    })
    .finally(() => {
      countriesRequest = null;
    });

  return countriesRequest;
};

export const getRegions = (countries) => {
  const regions = Array.from(
    new Set(countries.map((country) => country.region).filter(Boolean))
  ).sort((firstRegion, secondRegion) =>
    firstRegion.localeCompare(secondRegion)
  );

  return ["All", ...regions];
};

export const getCountryByCode = (countries, code) => {
  return countries.find(
    (country) => country.code.toLowerCase() === code.toLowerCase()
  );
};

export const getBorderNames = (country, countries) => {
  const countriesByCode = countries.reduce((accumulator, currentCountry) => {
    accumulator[currentCountry.code] = currentCountry.name;
    return accumulator;
  }, {});

  return country.borders.map(
    (borderCode) => countriesByCode[borderCode] || borderCode
  );
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(value || 0);
};

export const formatList = (items, fallback = "Not available") => {
  return items.length ? items.join(", ") : fallback;
};
