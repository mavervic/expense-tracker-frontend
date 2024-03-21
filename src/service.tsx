export const sqlQuery = (query, db) => {
  if (!query) {
    return Promise.reject("請輸入查詢語法");
  }

  return fetch(
    `http://127.0.0.1:3000/db?sql=${encodeURIComponent(query)}&dbName=${db}`
  ).then((response) => {
    if (!response.ok) {
      // read res body for error reason
      return response.json().then((error) => {
        throw new Error(error.error);
      });
    }
    return response.json();
  });
};
