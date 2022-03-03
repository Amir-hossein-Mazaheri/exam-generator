import ExamCard from "../Common/ExamCard";
import Filter from "../Components/FilterHolder";

function RawExam() {
  return (
    <>
      <Filter />
      <div className="space-y-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <ExamCard
            key={n}
            title="جمع بندی فیزیک 2"
            count={{
              allCount: 20,
              eachCount: [
                { title: "آسان", value: 5 },
                { title: "متوسط", value: 5 },
                { title: "سخت", value: 10 },
              ],
            }}
            categories={[
              { title: "رشته ها", values: ["تجربی", "ریاضی"] },
              { title: "پایه ها", values: ["دوازدهم", "یازدهم"] },
              { title: "درس ها", values: ["فیزیک 2"] },
              { title: "مباحث", values: ["گرما", "الکتریسیه"] },
            ]}
          />
        ))}
      </div>
    </>
  );
}

export default RawExam;
