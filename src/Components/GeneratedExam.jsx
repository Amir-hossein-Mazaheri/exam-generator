import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionCard from "../Common/QuestionCard";
import { SET_QUESTIONS } from "../Store/entities/ExamGenerator";

function GeneratedExam() {
  const dispatch = useDispatch();
  const { generatedQuestions } = useSelector(
    (store) => store.entities.ExamGenerator
  );

  const handleQuestionDeletion = useCallback(
    (id) => {
      const questionsCopy = [...generatedQuestions];
      const deleted = questionsCopy.filter((question) => question.id !== id);
      dispatch(SET_QUESTIONS({ questions: deleted }));
    },
    [dispatch, generatedQuestions]
  );

  return (
    <div className="space-y-8 mt-12">
      {generatedQuestions.map((question, index) => (
        <QuestionCard
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
          deleteFunction={() => handleQuestionDeletion(question.id)}
        />
      ))}
    </div>
  );
}

export default GeneratedExam;
