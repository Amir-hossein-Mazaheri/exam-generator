import { Checkbox, Input } from "antd";
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToJalaliDayJS } from "../Helpers/convertToJalali";
import { CHANGE_EXAM_SETTING } from "../Store/entities/ExamSettings";

function ExamTiming() {
  // useJalaliLocaleListener(); // just make date pickers show jalali date

  const dispatch = useDispatch();

  const { randomize, visibleAnswers, start, end, duration, isRaw } =
    useSelector((store) => store.entities.ExamSettings);

  const setStartTime = useCallback(
    (time) => {
      // time is UTC
      if (time) {
        dispatch(
          CHANGE_EXAM_SETTING({ property: "start", value: time.toISOString() })
        );
      } else {
        dispatch(CHANGE_EXAM_SETTING({ property: "start", value: "" }));
      }
    },
    [dispatch]
  );

  const setEndTime = useCallback(
    (time) => {
      // time is UTC
      if (time) {
        dispatch(
          CHANGE_EXAM_SETTING({ property: "end", value: time.toISOString() })
        );
      } else {
        dispatch(CHANGE_EXAM_SETTING({ property: "end", value: "" }));
      }
    },
    [dispatch]
  );

  // console.log(dayjs(start).format("YYYY MM DD HH mm"));

  return (
    <div className="space-y-8 mb-8">
      <div className="flex gap-4">
        <div className="flex items-center gap-3">
          <span>تاریخ شروع آزمون</span>
          <span>
            <JalaliLocaleListener />
            <DatePickerJalali
              defaultValue={!isRaw ? convertToJalaliDayJS(start) : undefined}
              onChange={setStartTime}
            />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>تاریخ پایان آزمون</span>
          <span>
            <DatePickerJalali
              defaultValue={!isRaw ? convertToJalaliDayJS(end) : undefined}
              onChange={setEndTime}
            />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>مدت زمان مجاز</span>
          <span>
            <Input
              onChange={(event) =>
                dispatch(
                  CHANGE_EXAM_SETTING({
                    property: "duration",
                    value: Number(event.target.value),
                  })
                )
              }
              type="number"
              defaultValue={duration}
              placeholder="به دقیقه"
            />
          </span>
        </div>
      </div>
      <div className="flex gap-8">
        {!isRaw && (
          <Checkbox
            onChange={() =>
              dispatch(
                CHANGE_EXAM_SETTING({
                  property: "visibleAnswers",
                  value: !visibleAnswers,
                })
              )
            }
            checked={visibleAnswers}
          >
            <span>امکان مشاهده پاسخنامه برای دانش آموز</span>
          </Checkbox>
        )}

        {isRaw && (
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
        )}
      </div>
    </div>
  );
}

export default ExamTiming;
