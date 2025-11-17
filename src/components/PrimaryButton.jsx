import React from "react";

const PrimaryButton = ({ text, disabled, onClick, loading }) => (
  <button
    className={(!disabled && !loading) ? "enabled" : ""}
    disabled={disabled || loading}
    onClick={onClick}
  >
    {loading ? "处理中..." : text}
  </button>
);

export default PrimaryButton;
