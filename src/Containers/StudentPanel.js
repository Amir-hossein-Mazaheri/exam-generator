import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import axios from "axios";
import fa_IR from "antd/lib/locale-provider/fa_IR";
import store from "../Store/configStore";
import App from "./App";
import Auth from "../Helpers/Auth";

axios.defaults.baseURL = "http://lapluse.ir/examapi";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + Auth.getToken("access");

axios.interceptors.response.use(
  (config) => config,
  async (err) => {
    const config = err.config;
    if (Auth.isTokenExpired(localStorage.getItem("refresh"))) {
      Auth.logout();
      window.location.replace("http://lapluse.ir/");
    }
    console.log("getting refresh !");
    const refresh = await Auth.checkLogin();
    localStorage.setItem("refresh", refresh);
    config.headers["Authorization"] = "Bearer " + refresh;
    return axios(config);
  }
);

function StudentPanel() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={fa_IR} direction="rtl">
        <App />
      </ConfigProvider>
    </Provider>
  );
}

export default StudentPanel;
