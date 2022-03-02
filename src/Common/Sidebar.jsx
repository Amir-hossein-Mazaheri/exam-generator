import { Link } from "react-router-dom";
import Button from "./Button";

function Sidebar() {
  return (
    <div className="px-7 py-5 space-y-8">
      <Button className="bg-sky-500 text-white w-full py-3">
        <Link to="/">
          <span>آزمون های خام</span>
        </Link>
      </Button>
      <Button className="bg-sky-500 text-white w-full py-3">
        <Link to="/">
          <span>برگذاری آزمون</span>
        </Link>
      </Button>
    </div>
  );
}

export default Sidebar;
