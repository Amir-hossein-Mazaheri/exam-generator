import { useCallback, useEffect } from "react";

import axios from "axios";
import SelectStudent from "./SelectStudent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useSWR from "swr";
import Button from "../Common/Button";
import Spinner from "../Common/Spinner";
import fetcher from "../Helpers/fetcher";
import pushNotification from "../Helpers/pushNotification";
import ExamTiming from "./ExamTiming";
import { RESET_EXAM_SETTINGS } from "../Store/entities/ExamSettings";

function ExamSetting({ examId, allowedStudents }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(RESET_EXAM_SETTINGS());
    };
  }, [dispatch]);

  const {
    start,
    end,
    duration,
    listOfStudents,
    visibleAnswers,
    isRaw,
    randomize,
  } = useSelector((store) => store.entities.ExamSettings);

  const navigate = useNavigate();

  const { data: studentList } = useSWR("/students/", fetcher);

  const addExam = useCallback(() => {
    const addPostData = {
      raw_exam: examId,
      start,
      end,
      time: duration,
      is_viewing_answer_allowed: visibleAnswers,
      allowed_students: listOfStudents,
      randomize,
    };
    axios
      .post("/exams/", addPostData)
      .then((res) => {
        console.log(res);
        pushNotification("success", "آزمون با موفقیت افزوده شد.");
        navigate("/holding-exam/", { replace: true });
      })
      .catch((err) => console.log(err.response));
  }, [
    duration,
    end,
    examId,
    listOfStudents,
    navigate,
    randomize,
    start,
    visibleAnswers,
  ]);

  const editExam = useCallback(() => {
    const editPostData = {
      id: Number(examId),
      start,
      end,
      time: duration,
      is_viewing_answer_allowed: visibleAnswers,
      allowed_students: listOfStudents,
    };
    console.log(editPostData);
    axios
      .patch(`/exams/${examId}/`, editPostData)
      .then((res) => {
        console.log(res);
        pushNotification("success", "آزمون با موفقیت ویرایش شد.");
        navigate("/holding-exam/", { replace: true });
      })
      .catch((err) => {
        pushNotification("error", "آزمون ویرایش نشد.");
        console.log(err.response);
      });
  }, [duration, end, examId, listOfStudents, navigate, start, visibleAnswers]);

  const handleSaveSettings = useCallback(
    (event) => {
      event.preventDefault();
      if (isRaw) {
        addExam();
      } else {
        editExam();
      }
    },
    [addExam, editExam, isRaw]
  );

  if (!studentList) {
    return <Spinner />;
  }

  console.log("students list :", studentList);

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
            nationalCode: student.more.national_code,
            id: student.id,
          }))}
          selectedStudent={allowedStudents}
        />

        <Button
          type="submit"
          className="bg-green-500 text-white absolute top-5 left-3"
        >
          {isRaw ? <span>برگزاری آزمون</span> : <span>ذخیره تغییرات</span>}
        </Button>
      </form>
    </div>
  );
}

export default ExamSetting;
