import { Input, message, Spin } from "antd";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Button } from "antd";
import Categories from "../Common/Categories";
import Spinner from "../Common/Spinner";
import convertChecker from "../Helpers/categoryChcker";
import convertCategory from "../Helpers/categoryConvertor";
import fetcher from "../Helpers/fetcher";
import { SET_PROPERTIES, SET_QUESTIONS } from "../Store/entities/ExamGenerator";

function ExamGeneratorProperty() {
  const [name, setName] = useState("");
  const [hard, setHard] = useState(0);
  const [medium, setMedium] = useState(0);
  const [easy, setEasy] = useState(0);
  const [cat, setCat] = useState([]);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const { data: categoriesData } = useSWR("/majors/", fetcher);

  const dispatch = useDispatch();

  const setCategories = useCallback((values) => {
    setCat(convertChecker(values));
  }, []);

  const handleExamGeneration = useCallback(
    (event) => {
      event.preventDefault();
      console.log(name, hard, medium, easy);
      setIsQuestionLoading(true);
      axios
        .post("/exam_generator/", {
          hard,
          medium,
          easy,
          subjects: cat,
        })
        .then((res) => {
          setIsQuestionLoading(false);
          if (res.data.length === 0) {
            message.error("سوالی با این مشخصات پیدا نشد.");
            return;
          }
          console.log(res);
          dispatch(SET_QUESTIONS({ questions: res.data }));
          dispatch(SET_PROPERTIES({ property: "name", value: name }));
          dispatch(SET_PROPERTIES({ property: "hard", value: hard }));
          dispatch(SET_PROPERTIES({ property: "medium", value: medium }));
          dispatch(SET_PROPERTIES({ property: "easy", value: easy }));
          dispatch(SET_PROPERTIES({ property: "subjects", value: cat }));
        });
    },
    [easy, hard, medium, name, cat, dispatch]
  );

  const categories = useMemo(() => {
    if (!categoriesData) return;
    return convertCategory(categoriesData);
  }, [categoriesData]);

  if (!categoriesData) {
    return <Spinner />;
  }

  // console.log(categories);

  return (
    <div className="px-7 py-4 rounded-lg shadow-lg shadow-gray-200">
      <form onSubmit={handleExamGeneration}>
        <div>
          <label htmlFor="exam-name">نام آزمون</label>
          <Input
            onChange={(event) => setName(event.target.value)}
            className="rounded-full px-3"
            type="text"
            id="exam-name"
          />
        </div>

        <div className="flex gap-5 mt-7">
          <div className="grow">
            <label htmlFor="exam-name">تعداد سوالات سخت</label>
            <Input
              onChange={(event) => setHard(Number(event.target.value))}
              className="rounded-full px-3"
              type="number"
              id="exam-name"
            />
          </div>
          <div className="grow">
            <label htmlFor="exam-name">تعداد سوالات متوسط</label>
            <Input
              onChange={(event) => setMedium(Number(event.target.value))}
              className="rounded-full px-3"
              type="number"
              id="exam-name"
            />
          </div>
          <div className="grow">
            <label htmlFor="exam-name">تعداد سوالات آسان</label>
            <Input
              onChange={(event) => setEasy(Number(event.target.value))}
              className="rounded-full px-3"
              type="number"
              id="exam-name"
            />
          </div>
        </div>

        <div className="px-5 py-3 bg-white shadow rounded-md mt-5">
          <Categories
            data={categories}
            onCheck={(values) => setCategories(values)}
          />
        </div>

        <Button
          htmlType="submit"
          loading={isQuestionLoading}
          className="bg-green-500 text-white mt-6 flex mr-auto rounded-full border-none hover:bg-green-600 hover:text-white"
        >
          <span>تولید سوالات</span>
        </Button>
      </form>
    </div>
  );
}

export default ExamGeneratorProperty;
