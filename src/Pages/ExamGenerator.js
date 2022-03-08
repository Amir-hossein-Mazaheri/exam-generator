import Button from "../Common/Button";
import { useDispatch, useSelector } from "react-redux";
import ExamGeneratorProperty from "../Components/ExamGeneratorProperty";
import GeneratedExam from "../Components/GeneratedExam";
import { SHOW_MODAL } from "../Store/ui";
import AddQuestionModal from "../Components/AddQuestionModal";

function ExamGenerator() {
  const dispatch = useDispatch();
  const { generatedQuestions } = useSelector(
    (store) => store.entities.ExamGenerator
  );

  console.log(generatedQuestions);
  console.log(generatedQuestions.length > 0);

  return (
    <div>
      <ExamGeneratorProperty />
      {generatedQuestions.length > 0 && (
        <div>
          <div className="flex mt-12 mb-5 items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">لیست سوالات</h1>
            <div className="flex gap-3">
              <Button
                onClick={() => dispatch(SHOW_MODAL())}
                className="bg-violet-500 text-white"
              >
                اضافه کردن دستی سوال
              </Button>
              <Button className="bg-green-500 text-white">ذخیره آزمون</Button>
              <AddQuestionModal />
            </div>
          </div>
          <GeneratedExam />
        </div>
      )}
    </div>
  );
}

export default ExamGenerator;
