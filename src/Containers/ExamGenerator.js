import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import axios from "axios";
import fa_IR from "antd/lib/locale-provider/fa_IR";
import store from "../Store/configStore";
import App from "./App";
import Auth from "../Helpers/Auth";
import { useEffect } from "react";

localStorage.setItem(
  "access",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ3NzU2NjE2LCJqdGkiOiI1ODNkMmQxMzQwODU0ODg5YTdkOTNjZGU5OGQ1ODRjNyIsInVzZXJfaWQiOjE1fQ.duLTerOLnsq-3xOgj5RlJaVFZTaSsI_CZQa9RCt3rxc"
);

localStorage.setItem(
  "refresh",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0Nzg0MjcxNiwianRpIjoiZmUzNzg5YWJjMzYzNDA3Mjg0NzJmYmMxOTQ2YmY2OGUiLCJ1c2VyX2lkIjoxNX0.8C-dE9sC_Z1LuZRfwvmutritcFxmIk14L1iTWnSGG5I"
);

axios.defaults.baseURL = "http://lapluse.ir/examapi";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + Auth.getToken("access");

axios.interceptors.response.use(
  (config) => config,
  async (err) => {
    const config = err.config;
    console.log("getting refresh !");
    const refresh = await Auth.checkLogin();
    localStorage.setItem("refresh", refresh);
    config.headers["Authorization"] = "Bearer " + refresh;
    return axios(config);
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
