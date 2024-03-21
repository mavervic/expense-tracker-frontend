import { useState } from "react";

function Example() {
  const [query, setQuery] = useState("select version()");
  const [db, setDB] = useState("demo_db");
  const [data, setData] = useState([]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const handleClick = () => {
    if (query === "") {
      alert("請輸入查詢語法");
      return;
    }

    fetch(
      `http://127.0.0.1:3000/db?sql=${encodeURIComponent(query)}&dbName=${db}`
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const Grid = ({ data }) => {
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

  return (
    <>
      <h2>Vic's 記帳軟體 (beta)</h2>

      <section
        style={{
          textAlign: "left",
        }}
      >
        <label htmlFor="">DB Name</label>
        <input
          type="text"
          placeholder="Enter your db name"
          value={db}
          style={{ width: "100%", height: "40px", fontSize: "20px" }}
          onChange={(event) => setDB(event.target.value)}
        />

        <label htmlFor="">Select Statement</label>
        <textarea
          style={{
            width: "100%",
            height: "200px",
            fontSize: "20px",
          }}
          placeholder="Enter your query here"
          value={query}
          onChange={handleQueryChange}
        />
      </section>
      <button
        style={{
          backgroundColor: "#84bfd2",
          margin: "5px",
        }}
        onClick={handleClick}
      >
        查詢
      </button>

      {/* reset */}
      <button
        style={{
          backgroundColor: "#657378",
          margin: "5px",
        }}
        onClick={() => {
          setQuery("");
          setData([]);
        }}
      >
        清除
      </button>

      <hr
        style={{
          margin: "20px 0",
          border: "1px solid #777",
        }}
      />

      <Grid data={data} />
    </>
  );
}

export default Example;
