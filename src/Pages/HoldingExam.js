import { Tabs } from "antd";
import Spinner from "../Common/Spinner";
import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import BeingHoldExams from "../Components/BeingHoldExams";
import HoldedExams from "../Components/HoldedExams";
import fetcher from "../Helpers/fetcher";
import isHolded from "../Helpers/isHolded";

const { TabPane } = Tabs;

function HoldingExam() {
  const { data: exams } = useSWR("/exams/", fetcher);

  useEffect(() => {
    axios.get("/exams/").then((res) => console.log(res));
  }, []);

  if (!exams) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        <Tabs
          centered
          tabBarGutter={20}
          defaultActiveKey="1"
          size="large"
          style={{ marginBottom: 32 }}
        >
          <TabPane tab="آزمون های در حال برگزاری" key="1">
            <BeingHoldExams
              exams={exams.map((exam) => !isHolded(exam.end) && exam)}
            />
          </TabPane>
          <TabPane tab="آزمون های برگزار شده" key="2">
            <HoldedExams
              exams={exams.map((exam) => isHolded(exam.end) && exam)}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default HoldingExam;
