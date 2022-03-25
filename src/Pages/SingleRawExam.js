import { useMemo } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import ExamCard from "../Common/ExamCard";
import QuestionCard from "../Common/QuestionCard";
import Spinner from "../Common/Spinner";
import RawExamOptions from "../Components/RawExamOptions";
import { showJalaliTime } from "../Helpers/convertToJalali";
import fetcher from "../Helpers/fetcher";

function SingleRawExam() {
  const { id } = useParams();

  const { data: singleExam } = useSWR(`/raw_exams/${id}`, fetcher);

  const time = useMemo(() => {
    if (!singleExam) return;
    const { created_at: start, updated_at: update } = singleExam;
    return {
      created: showJalaliTime(start), // just ignored the hour
      updated: showJalaliTime(update), // just ignored the hour
    };
  }, [singleExam]);

  if (!singleExam) {
    return <Spinner />;
  }

  console.log(singleExam);

  return (
    <div>
      <div>
        <RawExamOptions rawExam={singleExam} holdId={id} />
      </div>

      <div className="relative">
        <ExamCard
          title={singleExam.name}
          count={{
            allCount: singleExam.questions_count,
            eachCount: [
              { title: "آسان", value: singleExam.easies_count },
              { title: "متوسط", value: singleExam.mediums_count },
              { title: "سخت", value: singleExam.hards_count },
            ],
          }}
          categories={[
            { title: "پایه ها", values: singleExam.grades },
            { title: "درس ها", values: singleExam.courses },
            { title: "مباحث", values: singleExam.subjects },
          ]}
        />
        <div className="absolute top-0 bottom-0 left-5 py-12 px-7">
          <div
            className={`rounded-md h-full flex flex-col justify-between px-5 py-7 ${
              time.created === time.updated
                ? "bg-gray-100"
                : "bg-teal-500 text-white"
            }`}
          >
            <p>
              <span>تاریخ ساخت آزمون :</span>
              {"  "}
              <span className="ltr">{time.created}</span>
            </p>
            <p>
              <span>تاریخ بروزرسانی آزمون :</span>
              {"  "}
              <span>{time.updated}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-8 mt-6 text-2xl font-bold text-gray-900">
          <span>لیست سوالات</span>
        </h2>
        <div className="space-y-8">
          {singleExam.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              questionTag={`سوال ${index + 1}`}
              title={question.description}
              categories={[
                question.major,
                question.grade,
                question.course,
                question.subject,
              ]}
              hardness={question.level}
              choices={question.choices}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleRawExam;
