import { Modal, Radio } from "antd";
import { HIDE_MODAL } from "../Store/ui";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import Btn from "../Common/Button";
import { Button } from "antd";
import Categories from "../Common/Categories";
import useSWR from "swr";
import fetcher from "../Helpers/fetcher";
import convertCategory from "../Helpers/categoryConvertor";
import axios from "axios";
import convertChecker from "../Helpers/categoryChcker";
import QuestionCard from "../Common/QuestionCard";
import { APPEND_QUESTION } from "../Store/entities/ExamGenerator";
import pushNotification from "../Helpers/pushNotification";

function AddQuestionModal() {
  const dispatch = useDispatch();
  const [fetchedQuestions, setFetchedQuestions] = useState();
  const [cat, setCat] = useState([]);
  const [hardness, setHardness] = useState(0);
  const [isFetchingQuestion, setIsFetchingQuestion] = useState(false);
  const { data: categoriesData } = useSWR("/majors/", fetcher);
  const { modalVisibility } = useSelector((store) => store.ui);
  const { generatedQuestions } = useSelector(
    (store) => store.entities.ExamGenerator
  );

  const setCategories = useCallback((values) => {
    setCat(convertChecker(values));
  }, []);

  const addQuestionToCurrent = useCallback(
    (question) => {
      dispatch(APPEND_QUESTION({ question: question }));
      dispatch(HIDE_MODAL());
    },
    [dispatch]
  );

  const categories = useMemo(() => {
    if (!categoriesData) return;
    return convertCategory(categoriesData);
  }, [categoriesData]);

  const handleManuallyAddQuestion = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submitted");
      setIsFetchingQuestion(true);
      axios
        .get("/questions/", {
          params: {
            subjects: cat,
            level: hardness,
            page_size: 100,
          },
        })
        .then((res) => {
          setFetchedQuestions(res.data.results);
          setIsFetchingQuestion(false);
          if (res.data.results.length === 0) {
            pushNotification("warning", "سوالی با این مشخصات یافت نشد.");
          }
          console.log(res.data);
        });
    },
    [cat, hardness]
  );

  return (
    <Modal
      title="اضافه کردن سوال به صورت دستی"
      visible={modalVisibility}
      style={{ top: "20px" }}
      //   onOk={handleOk}
      //   confirmLoading={isModalLoading}
      onCancel={() => dispatch(HIDE_MODAL())}
      keyboard={true}
      footer={null}
      width="80%"
    >
      <form onSubmit={handleManuallyAddQuestion}>
        <div className="px-5 py-3 mb-7 rounded-md shadow">
          <Radio.Group
            onChange={(event) => setHardness(event.target.value)}
            value={hardness}
            className="mx-auto mb-5 mt-3"
            buttonStyle="solid"
          >
            <Radio.Button value={3}>سخت</Radio.Button>
            <Radio.Button value={2}>متسوط</Radio.Button>
            <Radio.Button value={1}>آسان</Radio.Button>
          </Radio.Group>
          <Categories
            onCheck={(values) => setCategories(values)}
            data={categories}
          />
        </div>
        {fetchedQuestions && (
          <div className="max-h-[50vh] overflow-auto">
            {fetchedQuestions.map((question, index) => (
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
                addFunction={() => addQuestionToCurrent(question)}
                exists={
                  generatedQuestions.findIndex((q) => q.id === question.id) > -1
                    ? true
                    : false
                }
              />
            ))}
          </div>
        )}
        <div className="mr-auto w-fit">
          <Btn
            onClick={() => dispatch(HIDE_MODAL())}
            className="bg-red-500 px-6 text-white ml-3"
          >
            لغو
          </Btn>
          <Button
            loading={isFetchingQuestion}
            type="primary"
            htmlType="submit"
            className="bg-green-500 px-7 rounded-full border-none text-white"
          >
            دریافت سوالات
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddQuestionModal;
