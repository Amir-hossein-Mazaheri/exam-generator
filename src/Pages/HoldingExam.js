import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

function Page2() {
  return (
    <div>
      <div>
        <Tabs defaultActiveKey="1" size="large" style={{ marginBottom: 32 }}>
          <TabPane tab="آزمون های در حال برگزاری" key="1">
            Content of tab 1
          </TabPane>
          <TabPane tab="آزمون های برگزار شده" key="2">
            Content of tab 2
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Page2;
