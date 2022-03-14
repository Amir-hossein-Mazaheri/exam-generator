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
        studentInfo={[1, 2, 3, 4, 5, 6].map((n) => ({
          key: { n },
          fullname: "Jarokesh",
          id: 523,
          totalPercent: 52,
          correctCount: 25,
          wrongCount: 14,
          emptyCount: 5,
        }))}
      />
    </div>
  );
}

export default ExamResults;
