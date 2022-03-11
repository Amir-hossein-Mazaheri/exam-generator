import { useCallback } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import Button from "../Common/Button";
import Spinner from "../Common/Spinner";
import fetcher from "../Helpers/fetcher";
import ExamTiming from "./ExamTiming";
import SelectStudent from "./SelectStudent";

function ExamSetting() {
  const { id } = useParams();

  const { data: studentList } = useSWR("/students/", fetcher);

  const handleSaveSettings = useCallback((event) => {
    event.preventDefault();
    console.log(event);
  }, []);

  if (!studentList) {
    return <Spinner />;
  }

  console.log(studentList);

  return (
    <div className="px-7 py-4 mt-10 mb-5 relative rounded-lg shadow-lg shadow-gray-200">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">تنظیمات زمان و دانش آموزان</h2>
      </div>
      <form onSubmit={handleSaveSettings}>
        <ExamTiming />

        <SelectStudent
          studentList={studentList.map((student) => ({
            key: student.id,
            fullname: student.first_name + " " + student.last_name,
            id: student.id,
          }))}
        />

        <Button
          type="submit"
          className="bg-green-500 text-white absolute top-5 left-3"
        >
          ذخیره تغییرات
        </Button>
      </form>
    </div>
  );
}

export default ExamSetting;
