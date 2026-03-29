# Country Explorer

Country Explorer is a React application for browsing countries, filtering them by region, and opening a dedicated details view for each country. It uses the current REST Countries API, normalizes the API response in one place, and presents the data through a cleaner, production-ready interface than the original scaffold.

## Project Intro

This project started as a basic Create React App setup with an unfinished routing flow and an outdated API endpoint. It has now been completed into a working country browser that focuses on:

- fast country search by name, capital, or region
- region-based filtering
- detailed country profile pages
- clear loading, empty, and error states
- simple CI validation for GitHub

## Features

- Browse all countries from a responsive card-based homepage
- Search using country names, official names, capitals, or regions
- Filter results by geographic region
- Open a details page for each country using its stable country code
- View capital city, population, region, subregion, languages, currencies, top-level domains, and border countries
- Retry data loading if the API request fails
- Run tests and production builds in local development and in GitHub Actions

## Tech Stack

- React 17
- React Router DOM 5
- Create React App tooling
- Testing Library
- REST Countries API

## What Was Fixed

- Replaced the deprecated `restcountries.eu` endpoint with the current `restcountries.com` API
- Finished the routing layer with a working country details page and a 404 fallback route
- Removed unused scaffold files and generic CRA placeholder content
- Added a real `.gitignore`
- Replaced the unrelated Deno workflow with a Node-based CI workflow
- Updated npm scripts so the project works with the current Node/OpenSSL runtime
- Rewrote the default test so it validates actual app behavior

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
npm install
```

### Start the development server

```bash
npm start
```

The app runs on `http://localhost:3000`.

## Available Scripts

### `npm start`

Starts the development server.

### `npm run build`

Creates an optimized production build inside the `build/` directory.

### `npm test`

Starts the Jest watcher used during development.

### `npm run test:ci`

Runs the tests once in CI mode without watch mode.

## Project Structure

```text
src/
  components/
    CountryCard.js
    StatusPanel.js
  containers/
    Countries.js
    CountryDetails.js
    Filter.js
    NotFound.js
  hooks/
    useCountries.js
  utils/
    countries.js
  App.js
  App.test.js
  index.css
  index.js
```

## Data Source

Country data is loaded from:

`https://restcountries.com/v3.1/all`

The app requests only the fields it needs and normalizes the response before rendering it.

## GitHub Workflow

The repository now includes a GitHub Actions workflow that:

- installs dependencies with `npm ci`
- runs `npm run test:ci`
- runs `npm run build`

## Notes

- The project still uses Create React App 4, so the npm scripts explicitly enable the OpenSSL legacy provider for compatibility with modern Node versions.
- The app depends on the REST Countries API being reachable at runtime.

## Future Improvements

- Add pagination or result virtualization for very large datasets
- Add unit tests for search and filter interactions
- Add dark/light theme switching if design requirements call for it
