import React from "react";
import "../style.css";

const X = ({ col, row }) => (
  <span style={{ "--col": col, "--row": row }}>
    <svg className="x">
      <path
        className="cross"
        d="M 15 15 L 50 50"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset="100"
      />
      <path
        className="cross"
        d="M 50 15 L 15 50"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset="100"
      />
    </svg>
  </span>
);

export default X;
