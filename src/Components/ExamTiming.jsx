import { Checkbox, Input } from "antd";
import {
  DatePicker as DatePickerJalali,
  useJalaliLocaleListener,
} from "antd-jalali";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_EXAM_SETTING } from "../Store/entities/ExamSettings";

function ExamTiming() {
  useJalaliLocaleListener();

  const dispatch = useDispatch();

  const { randomize, visibleAnswers } = useSelector(
    (store) => store.entities.ExamSettings
  );

  return (
    <div className="space-y-8 mb-8">
      <div className="flex gap-4">
        <div className="flex items-center gap-3">
          <span>تاریخ شروع آزمون</span>
          <span>
            <DatePickerJalali />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>تاریخ پایان آزمون</span>
          <span>
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
        <Checkbox
          onChange={() =>
            dispatch(
              CHANGE_EXAM_SETTING({
                property: "visibleAnswers",
                value: !visibleAnswers,
              })
            )
          }
        >
          <span>امکان مشاهده پاسخنامه برای دانش آموز</span>
        </Checkbox>
        <Checkbox
          onChange={() =>
            dispatch(
              CHANGE_EXAM_SETTING({
                property: "randomize",
                value: !randomize,
              })
            )
          }
        >
          <span>امکان تعویض نمایش سوالات</span>
        </Checkbox>
      </div>
    </div>
  );
}

export default ExamTiming;
