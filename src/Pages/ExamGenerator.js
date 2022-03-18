import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import Button from "../Common/Button";
import ExamGeneratorProperty from "../Components/ExamGeneratorProperty";
import GeneratedExam from "../Components/GeneratedExam";
import AddQuestionModal from "../Components/AddQuestionModal";
import { SHOW_MODAL } from "../Store/ui";
import { RESET_GENERATOR } from "../Store/entities/ExamGenerator";

function ExamGenerator() {
  const dispatch = useDispatch();
  const {
    generatedQuestions,
    generatorProperties: { name, randomize },
  } = useSelector((store) => store.entities.ExamGenerator);

  const saveExam = useCallback(() => {
    console.log(name);
    axios
      .post("/raw_exams/", {
        questions: generatedQuestions.map((question) => question.id),
        name: name,
        randomize,
      })
      .then((res) => {
        message.success(`آزمون ${name} با موفقیت ساخته شد.`);
        console.log(res);
        dispatch(RESET_GENERATOR());
      })
      .catch((err) => console.log(err.response));
  }, [dispatch, generatedQuestions, name, randomize]);

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
