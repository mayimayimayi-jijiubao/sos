import React from "react";

const InputField = ({ label, type = "text", value, onChange, placeholder }) => (
  <>
    <label>{label}</label>
    <div className="input-row">
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  </>
);

export default InputField;
