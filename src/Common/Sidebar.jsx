import { Link } from "react-router-dom";
import Button from "./Button";

function Sidebar() {
  return (
    <div className="px-7 py-5 space-y-8">
      <Link className="block" to="/">
        <Button className="bg-sky-500 text-white w-full py-3">
          <span>خانه</span>
        </Button>
      </Link>
      <Link className="block" to="/raw-exam">
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
  );
}

export default Sidebar;
