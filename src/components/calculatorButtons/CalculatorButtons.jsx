import { Button } from "@mui/material";
import styles from "./calculatorButtons.module.css";
export default function CalculatorButtons(props) {
  const { handleClick } = props;
  return (
    <>
      <div className={styles.calculatorContainer}>
        {[1, 2, 3, "*", 4, 5, 6, "-", 7, 8, 9, "+", "C", 0, ".", "="].map(
          (value, index) => (
            <Button
              className={styles.calculatorButton}
              variant="contained"
              key={`${value}key${index}`}
              value={value}
              onClick={(e) => handleClick(e, value)}
            >
              <span className={styles.calculatorDigit}>{value}</span>
            </Button>
          )
        )}
      </div>
    </>
  );
}
