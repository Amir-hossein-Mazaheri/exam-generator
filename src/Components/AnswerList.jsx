import { Table } from "antd";
import { useCallback, useMemo } from "react";

function AnswerList({ answers }) {
  const formData = useMemo(() => {
    return [
      {
        title: "شماره",
        dataIndex: "number",
        key: "number",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "وضعیت",
        dataIndex: "status",
        key: "status",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "گزینه انتخابی",
        dataIndex: "selected",
        key: "selected",
        render: (text) => <p>{text ? text : "نزده"}</p>,
      },
      {
        title: "گزینه صحیح",
        dataIndex: "correct",
        key: "correct",
        render: (text) => <p>{text}</p>,
      },
    ];
  }, []);

  const dynamicBg = useCallback((record) => {
    const { selected, correct } = record;
    if (selected === correct) {
      return "bg-green-200";
    }
    if (selected !== correct && selected) {
      return "bg-red-200";
    }
  }, []);

  return (
    <div className="mt-8 mb-5">
      <div className="mb-5">
        <h2 className="text-xl font-bold">پاسخنامه دانش آموز</h2>
      </div>
      <Table
        pagination={false}
        columns={formData}
        dataSource={answers}
        rowClassName={dynamicBg}
      />
    </div>
  );
}

export default AnswerList;