import { render, screen } from "@testing-library/react";
import App from "./App";

const mockCountries = [
  {
    cca3: "FRA",
    name: { common: "France", official: "French Republic" },
    flags: { svg: "https://flagcdn.com/fr.svg" },
    population: 67390000,
    region: "Europe",
    subregion: "Western Europe",
    capital: ["Paris"],
    tld: [".fr"],
    currencies: { EUR: { name: "Euro", symbol: "EUR" } },
    languages: { fra: "French" },
    borders: ["ESP"],
  },
  {
    cca3: "ESP",
    name: { common: "Spain", official: "Kingdom of Spain" },
    flags: { svg: "https://flagcdn.com/es.svg" },
    population: 47350000,
    region: "Europe",
    subregion: "Southern Europe",
    capital: ["Madrid"],
    tld: [".es"],
    currencies: { EUR: { name: "Euro", symbol: "EUR" } },
    languages: { spa: "Spanish" },
    borders: ["FRA"],
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => mockCountries,
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
  window.history.pushState({}, "", "/");
});

test("renders the country explorer homepage", async () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /browse every country from one clean dashboard/i,
    })
  ).toBeInTheDocument();

  expect(await screen.findByText("France")).toBeInTheDocument();
  expect(screen.getByText(/french republic/i)).toBeInTheDocument();
});

test("renders a country detail page for the selected route", async () => {
  window.history.pushState({}, "", "/countries/FRA");
  render(<App />);

  expect(
    await screen.findByRole("heading", { name: "France" })
  ).toBeInTheDocument();
  expect(screen.getByText(/border countries/i)).toBeInTheDocument();
  expect(screen.getByText("Spain")).toBeInTheDocument();
});
