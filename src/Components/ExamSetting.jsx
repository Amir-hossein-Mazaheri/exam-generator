import axios from "axios";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import Button from "../Common/Button";
import Spinner from "../Common/Spinner";
import fetcher from "../Helpers/fetcher";
import ExamTiming from "./ExamTiming";
import SelectStudent from "./SelectStudent";

function ExamSetting({ examId }) {
  const {
    start,
    end,
    duration,
    listOfStudents,
    visibleAnswers,
    randomize,
    isRaw,
  } = useSelector((store) => store.entities.ExamSettings);

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
      .then((response) => console.log(response))
      .catch((err) => console.log(err.response));
  }, [duration, end, examId, listOfStudents, randomize, start, visibleAnswers]);

  const editExam = useCallback(() => {}, []);

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

  console.log(examId);

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
