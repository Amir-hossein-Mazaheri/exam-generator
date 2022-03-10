import { Result } from "antd";
import { Link } from "react-router-dom";
import Button from "../../Common/Button";

function NotFoundPage() {
  return (
    <div>
      <Result
        status="404"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button className="bg-sky-500 text-white">
            <Link to="/">خانه</Link>
          </Button>
        }
      />
    </div>
  );
}

export default NotFoundPage;
