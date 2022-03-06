import { useState } from "react";
import CalculatorButtons from "../calculatorButtons/CalculatorButtons";
import CalculatorScreen from "../calculatorScreen/CalculatorScreen";
import InternetTable from "../table/InternetTable";
import simple_table from "../table/simple_table";
import styles from "./calculator.module.css";
import React from "react";
export default function Calculator() {
  const [value, setValue] = useState("");
  const handleClick = (e, v) => {
    if (v === "C") {
      setValue("");
    } else {
      setValue(`${value.toString() + v}`);
    }
  };
  return (
    <div>
      <div className={styles.calculator}>
        <div>
          <CalculatorScreen value={value} />
          <CalculatorButtons handleClick={handleClick} />
        </div>

        <InternetTable />
      </div>
      <simple_table />
    </div>
  );
}
