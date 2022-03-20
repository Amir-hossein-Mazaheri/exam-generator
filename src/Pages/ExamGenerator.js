import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import Button from "../Common/Button";
import ExamGeneratorProperty from "../Components/ExamGeneratorProperty";
import GeneratedExam from "../Components/GeneratedExam";
import AddQuestionModal from "../Components/AddQuestionModal";
import { SHOW_MODAL } from "../Store/ui";
import { RESET_GENERATOR } from "../Store/entities/ExamGenerator";
import { useNavigate } from "react-router";

function ExamGenerator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    generatedQuestions,
    generatorProperties: { name },
  } = useSelector((store) => store.entities.ExamGenerator);

  const saveExam = useCallback(() => {
    console.log(name);
    axios
      .post("/raw_exams/", {
        questions: generatedQuestions.map((question) => question.id),
        name: name,
      })
      .then((res) => {
        message.success(`آزمون ${name} با موفقیت ساخته شد.`);
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err.response));
  }, [generatedQuestions, name, navigate]);

  useEffect(() => {
    return () => {
      dispatch(RESET_GENERATOR());
    };
  }, [dispatch]);

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
