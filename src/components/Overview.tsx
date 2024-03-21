import { Col, Divider, Input, Row, Space } from "antd";

const { TextArea } = Input;

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
      {items.map((item) => {
        return (
          <>
            <Divider orientation="left">{item.label}</Divider>
            <Row gutter={[16, 24]}>
              <Col {...gutter} span={span}>
                <TextArea rows={4} />
              </Col>
              <Col {...gutter} span={span}>
                123
              </Col>
            </Row>
          </>
        );
      })}
    </Space>
  );
};
export default Overview;
