import React from "react";
import TextField from "@mui/material/TextField";

export default function CalculatorScreen(props) {
  const { value } = props;
  return (
    <>
      <TextField
        disabled
        id="outlined-basic"
        value={value}
        variant="outlined"
        style={{ width: "280px" }}
      />
    </>
  );
}
