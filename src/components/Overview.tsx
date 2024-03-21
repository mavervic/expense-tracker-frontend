import { Col, Divider, Row, Space } from "antd";
import TextAreaBindIndexedDB from "./TextAreaBindIndexedDB";

const items = [
  { label: "淨資產" },
  { label: "本月結餘" },
  { label: "本月收入" },
  { label: "本月支出" },
  { label: "本月收入分析" },
  { label: "本月支出分析" },
];

const gutter = { xs: 24, sm: 24, md: 12, lg: 12 };
const span = 4;

const Overview = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {items.map((item, idx) => {
        const id = `overview-textArea-${idx}`;
        return (
          <section key={id}>
            <Divider orientation="left">{item.label}</Divider>
            <Row gutter={[16, 24]}>
              <Col {...gutter} span={span}>
                <TextAreaBindIndexedDB id={id} rows={4} />
              </Col>
              <Col {...gutter} span={span}>
                123
              </Col>
            </Row>
          </section>
        );
      })}
    </Space>
  );
};
export default Overview;
