import useSWR from "swr";
import ExamCard from "../Common/ExamCard";
import Filter from "../Components/FilterHolder";
import fetcher from "../Helpers/fetcher";
import Spinner from "../Common/Spinner";
import { useSelector } from "react-redux";

function RawExams() {
  let rawExams;
  const { rawExams: filteredExams } = useSelector(
    (store) => store.entities.RawExams
  );
  const { data: rawQuestions } = useSWR("/raw_exams/", fetcher);

  if (!rawQuestions) {
    return <Spinner />;
  }

  rawExams = filteredExams.length > 0 ? filteredExams : rawQuestions;

  console.log(rawExams);

  return (
    <div>
      <Filter />
      <div className="space-y-8">
        {rawExams.map((question) => (
          <ExamCard
            key={question.id}
            title={question.name}
            count={{
              allCount: question.questions_count,
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
            settingLink={`/single-raw-exam/${question.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default RawExams;
