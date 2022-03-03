import Tag from "./Tag";

function ExamCard({ title, count, categories }) {
  const { eachCount, allCount } = count;

  return (
    <div className="rounded-lg space-y-4 px-7 py-4 shadow-lg shadow-gray-200">
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
            <p className="flex gap-1 items-center" key={JSON.stringify(category)}>
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
  );
}

export default ExamCard;
