import { openDB } from "idb";
import { useEffect } from "react";
import { create } from "zustand";

// 建立一個 Zustand store
const useStore = create((set) => ({
  textAreaValue: "",
  setTextAreaValue: (value) => set((state) => ({ textAreaValue: value })),
}));

// 在你的 React component 中
const ZustandExample = () => {
  const { textAreaValue, setTextAreaValue } = useStore();

  // 當 component 掛載時，從 IndexedDB 讀取值
  useEffect(() => {
    const dbPromise = openDB("my-db", 1, {
      upgrade(db) {
        db.createObjectStore("textAreaValues");
      },
    });

    dbPromise
      .then((db) => {
        const tx = db.transaction("textAreaValues", "readonly");
        const store = tx.objectStore("textAreaValues");
        console.log({ store });
        return store.get("value");
      })
      .then((value) => {
        console.log({ value });

        setTextAreaValue(value || "");
      });
  }, [setTextAreaValue]);

  // 當 textAreaValue 改變時，儲存到 IndexedDB
  useEffect(() => {
    const dbPromise = openDB("my-db", 1, {
      upgrade(db) {
        db.createObjectStore("textAreaValues");
      },
    });

    dbPromise.then((db) => {
      const tx = db.transaction("textAreaValues", "readwrite");
      const store = tx.objectStore("textAreaValues");
      store.put(textAreaValue, "value");
    });
  }, [textAreaValue]);

  return (
    <textarea
      value={textAreaValue}
      onChange={(e) => setTextAreaValue(e.target.value)}
    />
  );
};

export default ZustandExample;
