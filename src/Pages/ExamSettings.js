import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import useSWR from "swr";
import ExamCard from "../Common/ExamCard";
import Spinner from "../Common/Spinner";
import ExamSetting from "../Components/ExamSetting";
import { showJalaliTime } from "../Helpers/convertToJalali";
import fetcher from "../Helpers/fetcher";
import {
  CHANGE_EXAM_SETTING,
  SET_IS_RAW,
} from "../Store/entities/ExamSettings";

function ExamSettings({ isRaw = false }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: examData } = useSWR(
    isRaw ? `/raw_exams/${id}/` : `/exams/${id}`,
    fetcher
  );

  const formExamTime = useMemo(() => {
    if (!examData) return;
    const start = showJalaliTime(examData.start);
    const end = showJalaliTime(examData.end);
    return {
      start: start.split(" ")[0] + "    " + start.split(" ")[1],
      end: end.split(" ")[0] + "    " + end.split(" ")[1],
      duration: examData.time + " دقیقه",
    };
  }, [examData]);

  useEffect(() => {
    if (isRaw) {
      dispatch(SET_IS_RAW({ value: true }));
    } else {
      dispatch(SET_IS_RAW({ value: false }));
      if (!examData) return;
      dispatch(
        CHANGE_EXAM_SETTING({ property: "start", value: examData.start })
      );
      dispatch(CHANGE_EXAM_SETTING({ property: "end", value: examData.end }));
      dispatch(
        CHANGE_EXAM_SETTING({ property: "duration", value: examData.time })
      );
      dispatch(
        CHANGE_EXAM_SETTING({
          property: "listOfStudents",
          value: examData.allowed_students,
        })
      );
      dispatch(
        CHANGE_EXAM_SETTING({
          property: "visibleAnswers",
          value: examData.is_viewing_answer_allowed,
        })
      );
    }
  }, [dispatch, examData, isRaw]);

  if (!examData) {
    return <Spinner />;
  }

  return (
    <div>
      <ExamCard
        title={examData?.name}
        count={{
          allCount: 20,
          eachCount: [
            { title: "آسان", value: 5 },
            { title: "متوسط", value: 5 },
            { title: "سخت", value: 10 },
          ],
        }}
        categories={[
          { title: "رشته ها", values: ["تجربی", "ریاضی"] },
          { title: "پایه ها", values: ["دوازدهم", "یازدهم"] },
          { title: "درس ها", values: ["فیزیک 2"] },
          { title: "مباحث", values: ["گرما", "الکتریسیه"] },
        ]}
        time={isRaw ? null : formExamTime}
      />

      <ExamSetting examId={id} />
    </div>
  );
}

export default ExamSettings;
