import { Input, Table } from "antd";
import { useMemo, useState } from "react";

function SelectStudent({ studentList }) {
  const [query, setQuery] = useState("");

  console.log(query);

  const formData = useMemo(() => {
    return [
      {
        title: "نام و نام خانوادگی",
        dataIndex: "fullname",
        key: "fullname",
        render: (text) => <p>{text}</p>,
      },
      {
        title: "کد ملی",
        dataIndex: "id",
        key: "id",
        render: (text) => <p>{text}</p>,
      },
    ];
  }, []);

  const applySearch = useMemo(() => {
    return studentList.filter(
      (student) =>
        student.fullname.indexOf(query) > -1 ||
        String(student.id).indexOf(query) > -1
    );
  }, [studentList, query]);

  const selectionFunctionality = useMemo(() => {
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === "Disabled User",
        // Column configuration not to be checked
        name: record.name,
      }),
    };
  }, []);

  return (
    <div className="mt-5">
      <Input
        className="px-5 mb-4 rounded-full"
        placeholder="جستجو بین دانش آموزان"
        onChange={(event) => setQuery(event.target.value)}
      />
      <Table
        rowSelection={{
          type: "checkbox",
          ...selectionFunctionality,
        }}
        pagination={false}
        columns={formData}
        dataSource={applySearch}
      />
    </div>
  );
}

export default SelectStudent;
