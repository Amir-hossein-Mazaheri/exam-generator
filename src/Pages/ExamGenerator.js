import Button from "../Common/Button";
import { useDispatch, useSelector } from "react-redux";
import ExamGeneratorProperty from "../Components/ExamGeneratorProperty";
import GeneratedExam from "../Components/GeneratedExam";
import { SHOW_MODAL } from "../Store/ui";
import AddQuestionModal from "../Components/AddQuestionModal";
import { useCallback } from "react";
import axios from "axios";
import { RESET_GENERATOR } from "../Store/entities/ExamGenerator";
import { message } from "antd";

function ExamGenerator() {
  const dispatch = useDispatch();
  const { generatedQuestions, generatorProperties: { name } } = useSelector(
    (store) => store.entities.ExamGenerator
  );

  const saveExam = useCallback(() => {
    console.log(name);
    axios
      .post("http://192.168.179.213:8080/raw_exams/", {
        questions: generatedQuestions.map((question) => question.id),
        name: name,
      })
      .then((res) => {
        message.success(
          `آزمون ${name} با موفقیت ساخته شد.`
        );
        dispatch(RESET_GENERATOR());
      })
      .catch((err) => console.log(err.response));
  }, [dispatch, generatedQuestions, name]);

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
              <Button onClick={saveExam} className="bg-green-500 text-white">
                ذخیره آزمون
              </Button>
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
