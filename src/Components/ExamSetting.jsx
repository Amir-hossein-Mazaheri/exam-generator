import { DatePicker, Input, TimePicker } from "antd";
import { useParams } from "react-router";
import SelectStudent from "./SelectStudent";

function ExamSetting() {
  const { id } = useParams();

  console.log(id);

  return (
    <div className="px-7 py-4 mt-10 mb-5 rounded-lg shadow-lg shadow-gray-200">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">تنظیمات زمان و دانش آموزان</h2>
      </div>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <span>تاریخ شروع آزمون</span>
          <span>
            <DatePicker />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>تاریخ پایان آزمون</span>
          <span>
            <DatePicker />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>مدت زمان مجاز</span>
          <span>
            <Input type="number" placeholder="به دقیقه" />
          </span>
        </div>
      </div>
      <SelectStudent />
    </div>
  );
}

export default ExamSetting;
