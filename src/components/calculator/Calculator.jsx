import { useState, useEffect } from 'react';
import { createOne } from '../../commonServices';
import CalculatorButtons from '../calculatorButtons/CalculatorButtons';
import CalculatorScreen from '../calculatorScreen/CalculatorScreen';
import InternetTable from '../table/InternetTable';
import styles from './calculator.module.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
export default function Calculator() {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(120);
  const [requestBlocked, setRequestBlocked] = useState(false);
  const [status, setStatus] = useState(201);

  useEffect(() => {
    let interval;
    if (count === 20) {
      setRequestBlocked(true);
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (status === 403) {
      setRequestBlocked(true);
    } else {
      setRequestBlocked(false);
    }
    return () => clearInterval(interval);
  }, [count, value, time]);
  const handleClick = async (e, v) => {
    if (v === 'C') {
      setValue('');
    } else if (v === '=') {
      const ipAddress = await fetch('https://api.ipify.org/?format=json').then(
        (response) => response.json()
      );
      const response = await createOne({
        input: value,
        ipAddress: ipAddress.ip,
      });
      if(response.status === 403){
        setStatus(response.status)
      }else{
      setValue(response?.currentRecord?.output);
      setData(response?.data);
      setCount(response?.count);}
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
          <h3>Total Requests: {count}</h3>
          <h3>
            Status:{' '}
            {requestBlocked ? (
              <span
                style={{ color: 'red' }}
              >{`Request Blocked For ${time} seconds`}</span>
            ) : (
              <span style={{ color: 'green' }}>{`${
                20 - count
              } Requests Left`}</span>
            )}
          </h3>
        </div>

        <InternetTable data={data} />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={requestBlocked}
        autoHideDuration={2000}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Request Blocked!
        </Alert>
      </Snackbar>
    </div>
  );
}
