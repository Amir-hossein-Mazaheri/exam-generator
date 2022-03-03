import { Input, Tree } from "antd";
import { useCallback } from "react";
import Button from "../Common/Button";

const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
];

function Filters() {
  const handleFilters = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className="mt-5 mb-3">
      <form onSubmit={handleFilters}>
        <div className="flex gap-5">
          <div className="flex flex-col grow gap-2">
            <label htmlFor="question-count">جستجو</label>
            <Input
              placeholder="..."
              type="text"
              name="questions-count"
              id="questions-count"
              className="rounded-full border-none shadow-none"
            />
          </div>
          <div className="flex flex-col grow gap-2">
            <label htmlFor="question-count">تعداد سوالات</label>
            <Input
              placeholder="عدد وارد کنید..."
              type="number"
              name="questions-count"
              id="questions-count"
              className="rounded-full border-none shadow-none"
            />
          </div>
        </div>
        <div className="mt-5 rounded-md bg-white p-3 overflow-hidden">
          <Tree checkable treeData={treeData} />
        </div>
        <Button
          type="submit"
          name="apply-filter"
          id="apply-filter"
          className="bg-emerald-500 absolute top-3 left-4"
        >
          اعمال فیلتر
        </Button>
      </form>
    </div>
  );
}

export default Filters;
