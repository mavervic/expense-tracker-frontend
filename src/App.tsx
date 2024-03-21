import { ExperimentTwoTone } from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useState } from "react";
import Example from "./components/Example";
import IndexedDBExample from "./components/IndexedDBExample";
import Overview from "./components/Overview";
import ZustandExample from "./components/ZustandExample";

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
    key: "indexedDBExample",
    label: "indexed db example",
  },
  {
    icon: <ExperimentTwoTone />,
    key: "zustandExample",
    label: "zustand example",
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
  indexedDBExample: <IndexedDBExample />,
  zustandExample: <ZustandExample />,
  sqlExample: <Example />,
};

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [current, setCurrent] = useState("overview");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
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
