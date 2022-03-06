import styles from "./internetTable.module.css";
// Example of a data array that
// you might receive from an API
// const data = [
//   {
//     ipAddress: "123",
//     input: "2+2",
//     output: "4",
//     _id: "621dfed232e1a07b85c93bfb",
//     createdAt: "2022-03-01T11:09:06.810Z",
//     updatedAt: "2022-03-01T11:09:06.810Z",
//     __v: 0
//   },
//   {
//     ipAddress: "123",
//     input: "2+2",
//     output: "4",
//     _id: "621dfed232e1a07b85c93bfb",
//     createdAt: "2022-03-01T11:09:06.810Z",
//     updatedAt: "2022-03-01T11:09:06.810Z",
//     __v: 0
//   }
// ];

function App({data}) {
  
  return (
    <div className={styles.App}>
      <table>
        <thead>
          <tr>
          <th>IP Address</th>
          <th>Time</th>
          <th>Request </th>
          <th>Response</th>
          </tr>
        </thead>
        <tbody>
        {data.map((val, key) => {
          return (
            <tr key={key+val}>
              <td>{val.ipAddress}</td>
              <td>{new Date(val.createdAt).toLocaleString()}</td>
              <td>{val.input}</td>
              <td>{val.output}</td>
            </tr>);
})}
        </tbody>
      </table>
    </div>
  );
}

export default App;
