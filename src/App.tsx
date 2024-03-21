import { ExperimentTwoTone } from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useState } from "react";
import Example from "./components/Example";
import Overview from "./components/Overview";
import { initNotificationConfig } from "./notification";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "overview",
    label: "總覽",
    onClick: () => {
      console.log("click");
    },
  },
  {
    key: "detail",
    label: "明細",
  },
  {
    key: "insert",
    label: "新增",
  },
  {
    icon: <ExperimentTwoTone />,
    key: "sqlExample",
    label: "sql example",
  },
];

const ComponsntMap = {
  overview: <Overview />,
  app: "App",
  setting: "Setting",
  sqlExample: <Example />,
};

initNotificationConfig();

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // get from location.hash
  const [current, setCurrent] = useState(
    window.location.hash.slice(1) || "overview"
  );

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setCurrent(key);
    window.location.hash = `#${key}`; // store to location.hash
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={onClick}
          selectedKeys={[current]}
        />
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            background: colorBgContainer,
            minHeight: "85dvh",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {ComponsntMap[current]}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
