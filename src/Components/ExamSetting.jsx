import axios from "axios";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useSWR from "swr";
import Button from "../Common/Button";
import Spinner from "../Common/Spinner";
import fetcher from "../Helpers/fetcher";
import pushNotification from "../Helpers/pushNotification";
import ExamTiming from "./ExamTiming";
import SelectStudent from "./SelectStudent";

function ExamSetting({ examId }) {
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
    const addPostData = {
      start,
      end,
      time: duration,
      is_viewing_answer_allowed: visibleAnswers,
      allowed_students: listOfStudents,
    };
    axios
      .patch(`/exams/${examId}`, addPostData)
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
            nationalCode: student.more.national_code,
            id: student.id,
          }))}
        />

        {isRaw ? (
          <Button
            type="submit"
            className="bg-green-500 text-white absolute top-5 left-3"
          >
            برگزاری آزمون
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-green-500 text-white absolute top-5 left-3"
          >
            ذخیره تغییرات
          </Button>
        )}
      </form>
    </div>
  );
}

export default ExamSetting;
