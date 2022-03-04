import { useCallback } from "react";
import QuestionCard from "../Common/QuestionCard";

function GeneratedExam() {
  const handleQuestionDeletion = useCallback(() => {
    console.log("deleted");
  }, []);

  return (
    <div className="space-y-8 mt-12">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <QuestionCard
          questionTag={`سوال ${n}`}
          title="سوال سوال سوال سوال سوال سوال سوال سوال سوال"
          categories={["متوسط", "فصل 1", "دهم", "تجربی"]}
          choices={[
            "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
            "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
            "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
            "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
          ]}
          deleteFunction={handleQuestionDeletion}
        />
      ))}
    </div>
  );
}

export default GeneratedExam;
