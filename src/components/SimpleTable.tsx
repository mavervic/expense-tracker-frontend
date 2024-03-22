import { Empty, Table } from "antd";
import { isEmpty } from "lodash-es";

const SimpleTable = ({ data }) => {
  if (isEmpty(data)) return <Empty />;

  // Generate columns from the keys of the first object in data
  const columns = Object.keys(data[0]).map((key) => ({
    title: key,
    dataIndex: key,
  }));

  // Add a unique key to each data object
  const dataSource = data.map((item, index) => ({ key: index, ...item }));

  return (
    <Table
      pagination={{ position: ["none", "none"] }}
      dataSource={dataSource}
      columns={columns}
      style={{
        width: "100%",
        maxHeight: "50vh", // '50vh' means '50% of the viewport height
        overflowX: "auto",
      }}
    />
  );
};

export default SimpleTable;
