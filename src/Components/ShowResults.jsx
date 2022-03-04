import { Table } from "antd";
import { Link } from "react-router-dom";

function ShowResults({ studentInfo }) {
  const formColumns = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullname",
      key: "fullname",
      render: (text, record) => (
        <Link to={`/student-results/${record.id}`}>
          <p>{text}</p>
        </Link>
      ),
    },
    {
      title: "کد ملی",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "درصد کل",
      dataIndex: "totalPercent",
      key: "totalPercent",
      render: (text) => <p>% {text}</p>,
    },
    {
      title: "درست",
      dataIndex: "correctCount",
      key: "correctCount",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "غلط",
      dataIndex: "wrongCount",
      key: "wrongCount",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "نزده",
      dataIndex: "emptyCount",
      key: "emptyCount",
      render: (text) => <p>{text}</p>,
    },
  ];

  return (
    <div className="mb-7">
      <div className="my-7">
        <h2 className="text-2xl font-bold">نتایج شرکت کنندگان</h2>
      </div>
      <Table
        pagination={false}
        dataSource={studentInfo}
        columns={formColumns}
      />
    </div>
  );
}

export default ShowResults;
