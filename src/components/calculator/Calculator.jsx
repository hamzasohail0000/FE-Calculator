import { useState } from 'react';
import { createOne } from '../../commonServices';
import CalculatorButtons from '../calculatorButtons/CalculatorButtons';
import CalculatorScreen from '../calculatorScreen/CalculatorScreen';
import InternetTable from '../table/InternetTable';
import styles from './calculator.module.css';
export default function Calculator() {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const handleClick = async (e, v) => {
    if (v === 'C') {
      setValue('');
    } else if (v === '=') {
      const response = await createOne({ input: value, ipAddress: '222' });
      console.log(response);
      setValue(response.currentRecord.output);
      setData(response.data);
      setCount(response.count);
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
          <h1>Total Requests: {count}</h1>
        </div>

        <InternetTable data={data} />
      </div>
    </div>
  );
}
