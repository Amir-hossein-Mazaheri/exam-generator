import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import axios from "axios";
import fa_IR from "antd/lib/locale-provider/fa_IR";
import store from "../Store/configStore";
import App from "./App";
import Auth from "../Helpers/Auth";
import { useEffect } from "react";

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
    // axios.get("/panel/").then((res) => {
    //   const role = res.data.role;
    //   console.log(role);
    //   if (role !== "exam-creator") {
    //     window.location.replace("http://lapluse.ir/exam-login/");
    //   }
    // });
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
