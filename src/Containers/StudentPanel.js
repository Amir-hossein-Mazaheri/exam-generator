import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import fa_IR from "antd/lib/locale-provider/fa_IR";
import store from "../Store/configStore";
import App from "./App";

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
