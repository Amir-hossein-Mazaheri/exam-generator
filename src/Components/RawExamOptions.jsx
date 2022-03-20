import { Dropdown } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Button from "../Common/Button";
import PrintMenu from "./PrintMenu";
import {
  SET_PROPERTIES,
  SET_QUESTIONS,
  SET_REDIRECTED_FROM_RAW_EXAM,
} from "../Store/entities/ExamGenerator";

const buttonStyle = "bg-sky-500 text-white";

function RawExamOptions({ holdId, rawExam }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setExamGeneratorData = useCallback(() => {
    dispatch(SET_QUESTIONS({ questions: rawExam.questions }));
    dispatch(SET_PROPERTIES({ property: "name", value: rawExam.name }));
    dispatch(SET_PROPERTIES({ property: "hard", value: rawExam.hards_count }));
    dispatch(
      SET_PROPERTIES({ property: "medium", value: rawExam.mediums_count })
    );
    dispatch(SET_PROPERTIES({ property: "easy", value: rawExam.easies_count }));
    dispatch(
      SET_PROPERTIES({ property: "randomize", value: rawExam.randomize })
    );
    dispatch(SET_REDIRECTED_FROM_RAW_EXAM({ status: true }));
    navigate("/exam-generator/");
  }, [
    dispatch,
    navigate,
    rawExam.easies_count,
    rawExam.hards_count,
    rawExam.mediums_count,
    rawExam.name,
    rawExam.questions,
    rawExam.randomize,
  ]);

  return (
    <div className="flex justify-between">
      <div className="flex gap-8">
        <div>
          <Link to={`/raw-exam-settings/${holdId}`}>
            <Button className={buttonStyle}>برگزاری آزمون</Button>
          </Link>
        </div>
        <div>
          <Button onClick={setExamGeneratorData} className={buttonStyle}>
            بازتولید و نشر
          </Button>
        </div>
      </div>

      <div>
        <Dropdown overlay={<PrintMenu />} placement="bottomCenter" arrow>
          <Button className={`${buttonStyle} flex items-center gap-[6px]`}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>پرینت آزمون</span>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default RawExamOptions;
