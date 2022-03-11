import { Checkbox, Input } from "antd";
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";

function ExamTiming() {


  return (
    <div className="space-y-8 mb-8">
      <div className="flex gap-4">
        <div className="flex items-center gap-3">
          <span>تاریخ شروع آزمون</span>
          <span>
            <JalaliLocaleListener />
            <DatePickerJalali />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>تاریخ پایان آزمون</span>
          <span>
            <JalaliLocaleListener />
            <DatePickerJalali />
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
