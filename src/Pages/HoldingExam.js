import { Tabs } from "antd";
import React from "react";
import BeingHoldExams from "../Components/BeingHoldExams";
import HoldedExams from "../Components/HoldedExams";

const { TabPane } = Tabs;

function Page2() {
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
            <BeingHoldExams />
          </TabPane>
          <TabPane tab="آزمون های برگزار شده" key="2">
            <HoldedExams />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Page2;
