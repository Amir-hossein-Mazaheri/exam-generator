import { Descriptions } from "antd";
import { useParams } from "react-router";
import ExamCard from "../Common/ExamCard";
import AnswerList from "../Components/AnswerList";

const { Item } = Descriptions;

function StudentResult() {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <ExamCard
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
        time={{
          start: "1400/02/11",
          end: "1400/02/12",
          duration: "120 دقیقه",
          attended: "2 / 3",
        }}
      />

      <div className="px-7 py-4 mt-7 rounded-lg shadow-lg shadow-gray-200">
        <div className="flex justify-between items-center">
          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-bold">نتایج دانش آموز</h3>
            <h4 className="text-base font-semibold">
              <span>نام دانش آموز :</span>
              <span>ممدی</span>
            </h4>
            <h4 className="text-base font-semibold">
              <span>کد ملی :</span>
              <span>1258238470</span>
            </h4>
          </div>

          <div className="space-y-4">
            <p>
              <span>تاریخ شروع آزمون :</span>
              <span>1400/02/11 13:45</span>
            </p>
            <p>
              <span>تاریخ پایان آزمون :</span>
              <span>1400/02/11 14:45</span>
            </p>
            <p>
              <span>مدت زمان آزمون دادن :</span>
              <span>60 دقیقه</span>
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-gray-100 px-5 pt-3">
          <Descriptions title={null}>
            <Item label="تعداد کل">100</Item>
            <Item label="نزده">20</Item>
            <Item label="صحیح">60</Item>
            <Item label="غلط">20</Item>
            <Item label="درصد با نمره خام">75%</Item>
            <Item label="درصد بدون نمره">80%</Item>
          </Descriptions>
        </div>
      </div>

      <AnswerList
        answers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
          key: n,
          number: n,
          status: "درست",
          selected: null,
          correct: 4,
        }))}
      />
    </div>
  );
}

export default StudentResult;
