import { useParams } from "react-router";
import RawExamOptions from "../Components/RawExamOptions";

function SingleRawExam() {
  const { id } = useParams();

  return (
    <div>
      <div>
          <RawExamOptions />
      </div>
    </div>
  );
}

export default SingleRawExam;
