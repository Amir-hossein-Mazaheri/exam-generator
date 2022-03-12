import ExamCard from "../Common/ExamCard";
import { showJalaliTime } from "../Helpers/convertToJalali";
import { useEffect } from "react";

function BeingHoldExams({ exams }) {
  return (
    <div className="space-y-8">
      {exams.map(
        (exam) =>
          exam && (
            <ExamCard
              key={exam}
              title="جمع بندی فیزیک 2"
              count={{
                allCount: 20,
                eachCount: [
                  { title: "آسان", value: exam.raw_exam.easies_count },
                  { title: "متوسط", value: exam.raw_exam.mediums_count },
                  { title: "سخت", value: exam.raw_exam.hards_count },
                ],
              }}
              categories={[
                { title: "پایه ها", values: exam.raw_exam.grades },
                { title: "درس ها", values: exam.raw_exam.courses },
                { title: "مباحث", values: exam.raw_exam.subjects },
              ]}
              time={{
                start: showJalaliTime(exam.start),
                end: showJalaliTime(exam.end),
                duration: exam.time + " دقیقه",
                attended: exam.allowed_students.length,
              }}
            />
          )
      )}
    </div>
  );
}

export default BeingHoldExams;
