import useSWR from "swr";
import ExamCard from "../Common/ExamCard";
import Filter from "../Components/FilterHolder";
import fetcher from "../Helpers/fetcher";
import Spinner from "../Common/Spinner";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function RawExams() {
  let rawExams;
  const { rawExams: filteredExams, isExamLoading } = useSelector(
    (store) => store.entities.RawExams
  );
  const { data: rawQuestions } = useSWR("/raw_exams/", fetcher);

  useEffect(() => {
    axios
      .get("/raw_exams/")
      .then((res) => console.log("JWT test", res))
      .catch((err) => console.log("JWT test", err.response));
  }, []);

  if (!rawQuestions) {
    return <Spinner />;
  }

  rawExams = filteredExams.length > 0 ? filteredExams : rawQuestions;

  console.log(rawExams);

  return (
    <div>
      <Filter />
      <div className="space-y-8">
        {!isExamLoading ? (
          rawExams.map((question) => (
            <ExamCard
              key={question.id}
              title={question.name}
              count={{
                allCount: question.questions_count,
                eachCount: [
                  { title: "سخت", value: question.hards_count },
                  { title: "متوسط", value: question.mediums_count },
                  { title: "آسان", value: question.easies_count },
                ],
              }}
              categories={[
                { title: "پایه ها", values: question.grades },
                { title: "درس ها", values: question.courses },
                { title: "مباحث", values: question.subjects },
              ]}
              settingLink={`/single-raw-exam/${question.id}`}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default RawExams;
