import { Input, Table } from "antd";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_STUDENT_LIST } from "../Store/entities/ExamSettings";

function SelectStudent({ studentList }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

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
        dataIndex: "nationalCode",
        key: "nationalCode",
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

  const addStudentToState = useMemo(() => {
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        const listOfStudentData = selectedRows.map((row) => row.id);

        dispatch(SET_STUDENT_LIST({ list: listOfStudentData }));
      },
    };
  }, [dispatch]);

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
          ...addStudentToState,
        }}
        pagination={false}
        columns={formData}
        dataSource={applySearch}
      />
    </div>
  );
}

export default SelectStudent;
