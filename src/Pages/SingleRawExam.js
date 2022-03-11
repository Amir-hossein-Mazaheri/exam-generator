import { useMemo } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
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
      started: showJalaliTime(start),
      updated: showJalaliTime(update),
    };
  }, [singleExam]);

  if (!singleExam) {
    return <Spinner />;
  }

  console.log(time);

  return (
    <div>
      <div>
        <RawExamOptions />
      </div>
    </div>
  );
}

export default SingleRawExam;
