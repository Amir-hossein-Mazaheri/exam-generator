import { Link } from "react-router-dom";
import Button from "./Button";
import Tag from "./Tag";

function ExamCard({
  title,
  count,
  categories,
  time,
  settingLink,
  resultsLink,
}) {
  const { eachCount, allCount } = count;

  return (
    <div className="rounded-lg space-y-7 px-7 py-4 shadow-lg shadow-gray-200">
      <div className="flex justify-between">
        <div className="space-y-4">
          <div>
            <h2 className="font-medium text-lg text-gray-800">
              <span>نام آزمون : </span>
              <span>{title}</span>
            </h2>
          </div>
          <div>
            <div>
              <p className="flex gap-3 items-center">
                <span>تعداد سوالات :</span>
                <span>{allCount}</span>
                {eachCount.map((each) => (
                  <Tag key={JSON.stringify(each)} className="bg-slate-300">
                    <span>{each.title}</span>
                    <span>{each.value}</span>
                  </Tag>
                ))}
              </p>
            </div>
            <div className="space-y-2 mt-3">
              {categories.map((category) => (
                <p
                  className="flex gap-1 items-center flex-wrap"
                  key={JSON.stringify(category)}
                >
                  <span>{category.title} :</span>
                  {category.values.map((val, index) => (
                    <p key={val}>
                      <Tag key={val}>{val}</Tag>
                      {index !== category.values.length - 1 && <span>-</span>}
                    </p>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {time && (
            <div className="py-2 grow">
              <div className="flex flex-col justify-between text-sm px-5 py-3 rounded-md h-full w-full bg-gray-100">
                <p>
                  <span>تاریخ شروع آزمون : </span>
                  <span>{time.start}</span>
                </p>
                <p>
                  <span>تاریخ پایان آزمون : </span>
                  <span>{time.end}</span>
                </p>
                <p>
                  <span>مدت زمان مجاز : </span>
                  <span>{time.duration}</span>
                </p>
              </div>
            </div>
          )}
          {settingLink && (
            <div>
              <Link to={settingLink}>
                <Button className="rounded-full bg-green-500 text-white w-full">
                  <span>برگزاری و چاپ</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {resultsLink && (
        <Link to={resultsLink.link}>
          <Button className="rounded-full bg-blue-500 text-white flex mr-auto">
            <span>{resultsLink.text || "نتایج شرکت کنندگان"}</span>
          </Button>
        </Link>
      )}
    </div>
  );
}

export default ExamCard;
