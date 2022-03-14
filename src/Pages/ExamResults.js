import { useParams } from "react-router";
import useSWR from "swr";
import ExamCard from "../Common/ExamCard";
import Spinner from "../Common/Spinner";
import ShowResults from "../Components/ShowResults";
import { showJalaliTime } from "../Helpers/convertToJalali";
import fetcher from "../Helpers/fetcher";

function ExamResults() {
  const { id } = useParams();

  const { data: examData } = useSWR(`/exams/${id}/`, fetcher);
  const { data: students } = useSWR(`/exams/${id}/students/`, fetcher);

  if (!examData || !students) {
    return <Spinner />;
  }

  console.log(students);

  return (
    <div>
      <ExamCard
        title={examData.raw_exam.name}
        count={{
          allCount: examData.raw_exam.questions_count,
          eachCount: [
            { title: "آسان", value: examData.raw_exam.easies_count },
            { title: "متوسط", value: examData.raw_exam.mediums_count },
            { title: "سخت", value: examData.raw_exam.hards_count },
          ],
        }}
        categories={[
          { title: "پایه ها", values: examData.raw_exam.courses },
          { title: "درس ها", values: examData.raw_exam.grades },
          { title: "مباحث", values: examData.raw_exam.subjects },
        ]}
        time={{
          start: showJalaliTime(examData.start),
          end: showJalaliTime(examData.end),
          duration: examData.time + " دقیقه",
        }}
      />

      <ShowResults
        studentInfo={students.map((student, index) => ({
          key: student.answer_sheet,
          fullname: /*student.student.first_name + " " + student.student.last_name*/ `دانش آموز ${index}`,
          id: student.national_code,
          answerSheet: student.answer_sheet,
          totalPercent: student.percent,
          correctCount: student.corrects,
          wrongCount: student.wrongs,
          emptyCount: student.noanswers,
        }))}
        examId={id}
      />
    </div>
  );
}

export default ExamResults;
