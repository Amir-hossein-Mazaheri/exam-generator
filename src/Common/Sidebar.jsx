import { useCallback } from "react";
import { Link } from "react-router-dom";
import Auth from "../Helpers/Auth";
import Button from "./Button";

function Sidebar() {
  const logOut = useCallback(() => {
    Auth.logout();
    window.location.replace("http://lapluse.ir/exam-login/");
  }, []);

  return (
    <div className="px-7 pt-5 pb-24 flex flex-col h-full">
      <div className="space-y-8 grow">
        <Link className="block" to="/">
          <Button className="bg-sky-500 text-white w-full py-3">
            <span>خانه</span>
          </Button>
        </Link>
        <Link className="block" to="/raw-exams">
          <Button className="bg-sky-500 text-white w-full py-3">
            <span>آزمون های خام</span>
          </Button>
        </Link>
        <Link className="block" to="/holding-exam">
          <Button className="bg-sky-500 text-white w-full py-3">
            <span>برگذاری آزمون</span>
          </Button>
        </Link>
      </div>

      <div>
        <Button onClick={logOut} className="bg-red-500 text-white w-full py-3">
          <span>خروج</span>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
