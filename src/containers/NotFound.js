import React from "react";
import StatusPanel from "../components/StatusPanel";

const NotFound = () => {
  return (
    <main className="page-shell detail-shell">
      <StatusPanel
        title="Page not found"
        message="The page you requested does not exist in this project."
        actionLabel="Open the explorer"
        linkTo="/"
        compact
      />
    </main>
  );
};

export default NotFound;
