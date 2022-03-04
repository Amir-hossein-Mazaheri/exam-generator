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

function ExamGeneratorProperty() {
  const handleExamGeneration = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className="px-7 py-4 rounded-lg shadow-lg shadow-gray-200">
      <form onSubmit={handleExamGeneration}>
        <div>
          <label htmlFor="exam-name">نام آزمون</label>
          <Input className="rounded-full px-3" type="text" id="exam-name" />
        </div>

        <div className="flex gap-5 mt-7">
          <div className="grow">
            <label htmlFor="exam-name">تعداد سوالات سخت</label>
            <Input className="rounded-full px-3" type="number" id="exam-name" />
          </div>
          <div className="grow">
            <label htmlFor="exam-name">تعداد سوالات متوسط</label>
            <Input className="rounded-full px-3" type="number" id="exam-name" />
          </div>
          <div className="grow">
            <label htmlFor="exam-name">تعداد سوالات آسان</label>
            <Input className="rounded-full px-3" type="number" id="exam-name" />
          </div>
        </div>

        <div className="px-5 py-3 bg-white shadow rounded-md mt-5">
          <Tree checkable treeData={treeData} />
        </div>

        <Button
          type="submit"
          className="bg-green-500 text-white mt-6 flex mr-auto"
        >
          تولید سوالات
        </Button>
      </form>
    </div>
  );
}

export default ExamGeneratorProperty;
