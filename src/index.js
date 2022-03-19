import React from "react";
import ReactDOM from "react-dom";
import "vazir-font/dist/Farsi-Digits/font-face-FD.css";
import "antd/dist/antd.css";
import "./index.css";
import ExamGenerator from "./Containers/ExamGenerator";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider direction="rtl">
      <ExamGenerator />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
