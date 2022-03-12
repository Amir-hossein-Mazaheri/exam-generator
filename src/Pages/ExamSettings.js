import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ExamCard from "../Common/ExamCard";
import Spinner from "../Common/Spinner";
import ExamSetting from "../Components/ExamSetting";

function ExamSettings() {
  const [isRaw, setIsRaw] = useState(false);
  const [examData, setExamData] = useState();
  const { id } = useParams();

  // const { data: examData } = useSWR(`/raw_exams/${id}/`, fetcher);

  useEffect(() => {
    axios
      .get(`/exams/${id}`)
      .then((res) => {
        setExamData(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setIsRaw(true);
          axios.get(`/raw_exams/${id}`).then((res) => {
            console.log(res);
            setExamData(res.data);
          });
        } else {
          console.log(err.response);
        }
      });
  }, [id]);

  if (!examData) {
    return <Spinner />;
  }

  return (
    <div>
      <ExamCard
        title={examData?.name}
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

      <ExamSetting examData={examData} isRaw={isRaw} />
    </div>
  );
}

export default ExamSettings;
