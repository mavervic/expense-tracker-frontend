import { Col, Divider, Row, Space, notification } from "antd";
import { openDB } from "idb";
import { debounce } from "lodash-es";
import { useEffect, useRef, useState } from "react";
import { sqlQuery } from "../service";
import TextAreaBindIndexedDB from "./TextAreaBindIndexedDB";

const items = [
  { label: "淨資產" },
  { label: "本月結餘" },
  { label: "本月收入" },
  { label: "本月支出" },
  { label: "本月收入分析" },
  { label: "本月支出分析" },
];

const save2IndexedDB = (key, value) => {
  const dbPromise = openDB("my-db", 1, {
    upgrade(db) {
      db.createObjectStore("textAreaValues");
    },
  });

  dbPromise.then((db) => {
    const tx = db.transaction("textAreaValues", "readwrite");
    const store = tx.objectStore("textAreaValues");
    store.put(value, key);
  });
};

const restoreFormIndexedDB = (key, setTextAreaValue) => {
  const dbPromise = openDB("my-db", 1, {
    upgrade(db) {
      db.createObjectStore("textAreaValues");
    },
  });

  dbPromise
    .then((db) => {
      const tx = db.transaction("textAreaValues", "readonly");
      const store = tx.objectStore("textAreaValues");
      return store.get(key);
    })
    .then((values) => {
      setTextAreaValue(values);
    });
};

const gutter = { xs: 24, sm: 24, md: 12, lg: 12 };
const span = 4;

const Aaa = ({ id, item }) => {
  const [textAreaValue, setTextAreaValue] = useState("");

  // 當 component 掛載時，從 IndexedDB 讀取值
  useEffect(() => {
    restoreFormIndexedDB(id, setTextAreaValue);
  }, []);

  const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    save2IndexedDB(id, value);
    setTextAreaValue(value);
  };

  const debouncedApiCall = useRef(
    debounce((value) => {
      sqlQuery(value, "demo_db").catch((error) => {
        console.log(error);
        notification.error({
          message: `${error}`,
        });
      });
    }, 500)
  ).current;

  useEffect(() => {
    debouncedApiCall(textAreaValue);
  }, [textAreaValue]);

  return (
    <>
      <Divider orientation="left">{item.label}</Divider>
      <Row gutter={[16, 24]}>
        <Col {...gutter} span={span}>
          <TextAreaBindIndexedDB
            id={id}
            rows={4}
            value={textAreaValue}
            onChange={handelChange}
          />
        </Col>
        <Col {...gutter} span={span}>
          123
        </Col>
      </Row>
    </>
  );
};

const Overview = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {items.map((item, idx) => {
        const id = `overview-textArea-${idx}`;
        return <Aaa key={id} id={id} item={item} />;
      })}
    </Space>
  );
};
export default Overview;
