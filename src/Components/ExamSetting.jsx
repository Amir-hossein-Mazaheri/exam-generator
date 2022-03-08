// import { DatePicker, Input } from "antd";
import { useCallback, useState } from "react";
import { useParams } from "react-router";
import Button from "../Common/Button";
import ExamTiming from "./ExamTiming";
import SelectStudent from "./SelectStudent";

function ExamSetting() {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [duration, setDuration] = useState();
  const { id } = useParams();

  const handleSaveSettings = useCallback((event) => {
    event.preventDefault();
    console.log(event);
  }, []);

  console.log(id);

  return (
    <div className="px-7 py-4 mt-10 mb-5 relative rounded-lg shadow-lg shadow-gray-200">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">تنظیمات زمان و دانش آموزان</h2>
      </div>
      <form onSubmit={handleSaveSettings}>
        <ExamTiming />

        <SelectStudent
          studentList={[1, 2, 3, 4, 5].map((n) => ({
            key: n,
            fullname: `Mamad ${n}`,
            id: Math.floor(Math.random(n) * 100),
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
