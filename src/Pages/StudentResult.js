import { Descriptions } from "antd";
import { useMemo } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import ExamCard from "../Common/ExamCard";
import Spinner from "../Common/Spinner";
import AnswerList from "../Components/AnswerList";
import FullAnswerList from "../Components/FullAnswerList";
import { showJalaliTime } from "../Helpers/convertToJalali";
import fetcher from "../Helpers/fetcher";

const { Item } = Descriptions;

function StudentResult() {
  const { id } = useParams();

  const [examId, answerListId] = useMemo(() => {
    const [eId, aId] = id.split("-");
    return [Number(eId), Number(aId)];
  }, [id]);

  const { data: studentResult } = useSWR(
    `/exams/${examId}/students/${answerListId}/results/`,
    fetcher
  );

  const { data: examData } = useSWR(`/exams/${examId}`, fetcher);

  // useEffect(() => {
  //   axios
  //     .get(`/exams/${examId}/students/${answerListId}/results/`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err.response));
  // }, [answerListId, examId]);

  if (!studentResult || !examData) {
    return <Spinner />;
  }

  console.log(studentResult);
  console.log(examData);

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
          { title: "پایه ها", values: examData.raw_exam.grades },
          { title: "درس ها", values: examData.raw_exam.courses },
          { title: "مباحث", values: examData.raw_exam.subjects },
        ]}
        time={{
          start: showJalaliTime(examData.start),
          end: showJalaliTime(examData.end),
          duration: examData.time + " دقیقه",
        }}
      />

      <div className="px-7 py-4 mt-7 rounded-lg shadow-lg shadow-gray-200">
        <div className="flex justify-between items-center">
          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-bold">نتایج دانش آموز</h3>
            <h4 className="text-base font-semibold">
              <span>نام دانش آموز :</span>
              <span>{/* {student.name} */}</span>
            </h4>
            <h4 className="text-base font-semibold">
              <span>کد ملی :</span>
              <span>1258238470</span>
            </h4>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-gray-100 px-5 pt-3">
          <Descriptions title={null}>
            <Item label="تعداد کل">
              <span></span>
            </Item>
            <Item label="نزده">
              <span></span>
            </Item>
            <Item label="صحیح">
              <span></span>
            </Item>
            <Item label="غلط">
              <span></span>
            </Item>
            <Item label="درصد">
              <span></span>
            </Item>
          </Descriptions>
        </div>
      </div>

      <AnswerList
        answers={studentResult.details.map((detail, index) => ({
          key: index,
          number: index,
          status: "درست",
          selected: detail.choice ? (detail.choice.id % 4) + 1 : "نزده",
          correct:
            (detail.question.choices.find((choice) => choice.is_correct).id %
              4) +
            1,
        }))}
      />

      <FullAnswerList answersList={studentResult.details} />
    </div>
  );
}

export default StudentResult;
