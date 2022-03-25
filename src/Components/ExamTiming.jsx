import { Checkbox, Input, TimePicker } from "antd";
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/fa";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToJalaliDayJS } from "../Helpers/convertToJalali";
import { CHANGE_EXAM_SETTING } from "../Store/entities/ExamSettings";

dayjs.extend(utc);

function ExamTiming() {
  const dispatch = useDispatch();

  const { visibleAnswers, randomize, start, end, duration, isRaw } =
    useSelector((store) => store.entities.ExamSettings);

  const setStartDate = useCallback(
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

  const setEndDate = useCallback(
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

  const setStartTime = useCallback(
    (time, timeString) => {
      const [hour, minute] = timeString.split(":");
      console.log(
        dayjs(start).hour(hour).minute(minute).format("YYYY MM DD HH:mm")
      );

      if (time) {
        dispatch(
          CHANGE_EXAM_SETTING({
            property: "start",
            value: dayjs(start)
              .hour(hour)
              .minute(minute)
              .second(0)
              .toISOString(),
          })
        );
      }
    },
    [dispatch, start]
  );

  const setEndTime = useCallback(
    (time, timeString) => {
      const [hour, minute] = timeString.split(":");
      if (time) {
        dispatch(
          CHANGE_EXAM_SETTING({
            property: "end",
            value: dayjs(end).hour(hour).minute(minute).second(0).toISOString(),
          })
        );
      }
    },
    [dispatch, end]
  );

  return (
    <div className="space-y-8 mb-8">
      <div className="flex gap-4">
        <div className="flex items-center gap-3">
          <p>تاریخ شروع آزمون</p>
          <JalaliLocaleListener />
          <div className="flex flex-col gap-5">
            <DatePickerJalali
              defaultValue={!isRaw ? convertToJalaliDayJS(start) : undefined}
              onChange={setStartDate}
            />
            <TimePicker
              defaultValue={!isRaw ? dayjs(start) : undefined}
              onChange={setStartTime}
              format={"HH:mm"}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p>تاریخ پایان آزمون</p>
          <div className="flex flex-col gap-5">
            <DatePickerJalali
              defaultValue={!isRaw ? convertToJalaliDayJS(end) : undefined}
              onChange={setEndDate}
            />
            <TimePicker
              defaultValue={!isRaw ? dayjs(end) : undefined}
              onChange={setEndTime}
              format={"HH:mm"}
            />
          </div>
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
        {isRaw && (
          <Checkbox
            onChange={(event) =>
              dispatch(
                CHANGE_EXAM_SETTING({
                  property: "randomize",
                  value: event.target.checked,
                })
              )
            }
            checked={randomize}
          >
            <span>تعویض ترتیب نمایش سوالات</span>
          </Checkbox>
        )}
      </div>
    </div>
  );
}

export default ExamTiming;
