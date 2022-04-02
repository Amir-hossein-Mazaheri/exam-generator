import { useEffect } from "react";

import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale-provider/fa_IR";
import axios from "axios";
import store from "../Store/configStore";
import App from "./App";
import Auth from "../Helpers/Auth";

localStorage.setItem(
  "access",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ4OTA2OTUzLCJqdGkiOiIyMjQzYzU2Yzc0YTk0MTZjYjFmODI2YjllZDg5MDRjNiIsInVzZXJfaWQiOjJ9.HdITO61BH4VyEc5MhKbPZPqS5Ez_t0RN3Y6wHbqE9KU"
);

localStorage.setItem(
  "refresh",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0ODk5MzA1MywianRpIjoiNjMzMTEzMjYzODMyNGUwNWJkNzY5OWYwYmE0M2E4MTAiLCJ1c2VyX2lkIjoyfQ.DOuWYJVJt2oPTRVAI_OVmz4bEOLYuMNrO27Qjvpt8HQ"
);

axios.defaults.baseURL = "http://lapluse.ir/examapi";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + Auth.getToken("access");

axios.interceptors.response.use(
  (config) => config,
  async (err) => {
    const config = err.config;
    if (err.response.status === 401) {
      console.log("refreshing access!");
      const access = await Auth.checkLogin();
      localStorage.setItem("access", access);
      config.headers["Authorization"] = "Bearer " + access;
      return axios(config);
    }

    return Promise.reject(err);
  }
);

function StudentPanel() {
  useEffect(() => {
    const isLoggedIn = Auth.isLoggedIn();
    if (!isLoggedIn) {
      window.location.replace("http://lapluse.ir/exam-login/");
      return;
    }
    const isRefreshExpired = Auth.isTokenExpired(Auth.getToken("refresh"));
    if (isRefreshExpired) {
      window.location.replace("http://lapluse.ir/exam-login/");
    }
    axios.get("/panel/").then((res) => {
      const role = res.data.role;
      console.log(role);
      if (role !== "exam_creator") {
        window.location.replace("http://lapluse.ir/exam-login/");
      }
    });
  });

  return (
    <Provider store={store}>
      <ConfigProvider locale={fa_IR} direction="rtl">
        <App />
      </ConfigProvider>
    </Provider>
  );
}

export default StudentPanel;
