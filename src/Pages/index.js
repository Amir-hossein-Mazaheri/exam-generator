import axios from "axios";
import { useEffect } from "react";
import Card from "../Components/Card";

function HomePage() {
  useEffect(() => {
    axios.get("/panel/").then((res) => {
      const role = res.data.role;
      console.log(role);
      if (role !== "exam_creator") {
        window.location.replace("http://lapluse.ir/exam-login/");
      }
    });
  }, []);

  return (
    <div className="flex gap-8">
      <Card to="/raw-exams" title="لیست آزمون های ساخته شده" className="grow" />
      <Card to="/exam-generator" title="ساخت آزمون جدید" className="grow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full scale-75 opacity-20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </Card>
    </div>
  );
}

export default HomePage;
