import { Input, Spin } from "antd";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import Button from "../Common/Button";
import Categories from "../Common/Categories";
import convertChecker from "../Helpers/categoryChcker";
import convertCategory from "../Helpers/categoryConvertor";
import fetcher from "../Helpers/fetcher";
import { SET_QUESTIONS } from "../Store/entities/ExamGenerator";

function ExamGeneratorProperty() {
  const [name, setName] = useState("");
  const [hard, setHard] = useState(0);
  const [medium, setMedium] = useState(0);
  const [easy, setEasy] = useState(0);
  const [cat, setCat] = useState([]);
  const { data: categoriesData } = useSWR(
    "http://192.168.179.213:8080/majors/",
    fetcher
  );

  const dispatch = useDispatch();

  const setCategories = useCallback((values) => {
    setCat(convertChecker(values));
  }, []);

  const handleExamGeneration = useCallback(
    (event) => {
      event.preventDefault();
      console.log(name, hard, medium, easy);
      axios
        .post("http://192.168.179.213:8080/exam_generator/", {
          hard,
          medium,
          easy,
          subjects: cat,
        })
        .then((res) => {
          dispatch(SET_QUESTIONS({ questions: res.data }));
          console.log(res.data);
        });
    },
    [easy, hard, medium, name, cat, dispatch]
  );

  const categories = useMemo(() => {
    if (!categoriesData) return;
    return convertCategory(categoriesData);
  }, [categoriesData]);

  if (!categoriesData) {
    return <Spin />;
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
          type="submit"
          className="bg-green-500 text-white mt-6 flex mr-auto"
        >
          تولید سوالات
        </Button>
      </form>
    </div>
  );
}

export default ExamGeneratorProperty;
