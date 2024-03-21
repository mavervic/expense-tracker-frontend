import { isEmpty } from "lodash-es";

const SimpleTable = ({ data }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  if (isEmpty(data)) return null;

  return (
    <>
      {data && data.length === 0 ? (
        <div>暫無資料</div>
      ) : (
        <table
          style={{
            width: "100%",
            border: "1px solid gray",
          }}
        >
          <thead
            style={{
              backgroundColor: "darkgray",
            }}
          >
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                {columns.map((column) => (
                  <td key={column}>{item[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SimpleTable;
