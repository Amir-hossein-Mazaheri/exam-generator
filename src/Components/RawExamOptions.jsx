import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import Button from "../Common/Button";
import PrintMenu from "./PrintMenu";

function RawExamOptions({ holdId }) {
  const buttonStyle = "bg-sky-500 text-white";

  return (
    <div className="flex justify-between">
      <div className="flex gap-8">
        <div>
          <Link to={`/exam-settings/${holdId}`}>
            <Button className={buttonStyle}>برگزاری آزمون</Button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <Button className={buttonStyle}>بازتولید و نشر</Button>
          </Link>
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
