import React from "react";
import "../style.css";

const O = ({ col, row }) => (
  <span style={{ "--col": col, "--row": row }}>
    <svg className="o">
      <circle
        className="naught"
        cx="35"
        cy="35"
        r="15"
        fill="none"
        strokeWidth="8"
        strokeDasharray="200"
        strokeDashoffset="200"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default O;
