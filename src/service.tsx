export const sqlQuery = (query, db) => {
  if (query === "") {
    alert("請輸入查詢語法");
    return;
  }

  return fetch(
    `http://127.0.0.1:3000/db?sql=${encodeURIComponent(query)}&dbName=${db}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
