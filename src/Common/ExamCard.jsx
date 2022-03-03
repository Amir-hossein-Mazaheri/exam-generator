import Tag from "./Tag";

function ExamCard({ title, count, categories, time }) {
  const { eachCount, allCount } = count;

  return (
    <div className="rounded-lg flex justify-between px-7 py-4 shadow-lg shadow-gray-200">
      <div className="grow space-y-4">
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
                className="flex gap-1 items-center"
                key={JSON.stringify(category)}
              >
                <span>{category.title} :</span>
                {category.values.map((val, index) => (
                  <p>
                    <Tag key={val}>{val}</Tag>
                    {index !== category.values.length - 1 && <span>-</span>}
                  </p>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
      {time && (
        <div className="py-2">
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
            <p>
              <span>دانش آموزان شرکت کرده : </span>
              <span>{time.attended}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamCard;
