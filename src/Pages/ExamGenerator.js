import Button from "../Common/Button";
import ExamGeneratorProperty from "../Components/ExamGeneratorProperty";
import GeneratedExam from "../Components/GeneratedExam";

function ExamGenerator() {
  return (
    <div>
      <ExamGeneratorProperty />
      <div>
        <div className="flex mt-10 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">لیست سوالات</h1>
          <div className="flex gap-3">
            <Button className="bg-violet-500 text-white">
              اضافه کردن دستی سوال
            </Button>
            <Button className="bg-green-500 text-white">ذخیره آزمون</Button>
          </div>
        </div>
        <GeneratedExam />
      </div>
    </div>
  );
}

export default ExamGenerator;
