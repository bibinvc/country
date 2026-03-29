import React from "react";
import { Link } from "react-router-dom";

const StatusPanel = ({
  title,
  message,
  actionLabel,
  onAction,
  linkTo,
  compact = false,
}) => {
  return (
    <section className={`status-panel${compact ? " compact" : ""}`}>
      <div>
        <p className="eyebrow">Country Explorer</p>
        <h2>{title}</h2>
      </div>
      <p>{message}</p>
      {onAction ? (
        <button className="secondary-button" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
      {!onAction && linkTo ? (
        <Link className="secondary-button" to={linkTo}>
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
};

export default StatusPanel;
