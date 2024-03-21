import { Input } from "antd";
import { openDB } from "idb";
import { useEffect, useState } from "react";
const { TextArea } = Input;

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

const TextAreaBindIndexedDB = ({ id, ...props }) => {
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

  return <TextArea value={textAreaValue} onChange={handelChange} {...props} />;
};

export default TextAreaBindIndexedDB;
