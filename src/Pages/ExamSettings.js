import { useParams } from "react-router";
import useSWR from "swr";
import ExamCard from "../Common/ExamCard";
import Spinner from "../Common/Spinner";
import ExamSetting from "../Components/ExamSetting";
import fetcher from "../Helpers/fetcher";

function ExamSettings() {
  const { id } = useParams();

  const { data: examData } = useSWR(`/raw_exams/${id}/`, fetcher);

  if (!examData) {
    return <Spinner />;
  }

  console.log(examData);

  return (
    <div>
      <ExamCard
        title={examData.name}
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
        time={{
          start: "1400/02/11",
          end: "1400/02/12",
          duration: "120 دقیقه",
          attended: "2 / 3",
        }}
      />

      <ExamSetting isTest={examData.is_test_exam} />
    </div>
  );
}

export default ExamSettings;
