// File: src/FormField.js
import React from "react";
import { TextField } from "@mui/material";

const FormField = ({ label, type = "text", value, onChange, required }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default FormField;
