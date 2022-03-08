import { Checkbox, DatePicker, Input } from "antd";

function ExamTiming() {
  return (
    <div className="space-y-8 mb-8">
      <div className="flex gap-4">
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
      <div className="flex gap-8">
        <Checkbox>
          <span>امکان مشاهده پاسخنامه برای دانش آموز</span>
        </Checkbox>
        <Checkbox>
          <span>امکان تعویض نمایش سوالات</span>
        </Checkbox>
      </div>
    </div>
  );
}

export default ExamTiming;