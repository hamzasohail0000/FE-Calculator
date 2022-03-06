import styles from "./internetTable.module.css";
// Example of a data array that
// you might receive from an API
const data = [
  {
    ipAddress: "123",
    input: "2+2",
    output: "4",
    _id: "621dfed232e1a07b85c93bfb",
    createdAt: "2022-03-01T11:09:06.810Z",
    updatedAt: "2022-03-01T11:09:06.810Z",
    __v: 0
  },
  {
    ipAddress: "123",
    input: "2+2",
    output: "4",
    _id: "621dfed232e1a07b85c93bfb",
    createdAt: "2022-03-01T11:09:06.810Z",
    updatedAt: "2022-03-01T11:09:06.810Z",
    __v: 0
  }
];

function App() {
  return (
    <div className={styles.App}>
      <table>
        <tr>
          <th>Serial No</th>
          <th>IP Address</th>
          <th>Time</th>
          <th>Response</th>
          <th>Request </th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.ipAddress}</td>
              <td>{val.input}</td>
              <td>{val.output}</td>

              <td>{val.createdAt}</td>
              <td>{val.updatedAt}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
