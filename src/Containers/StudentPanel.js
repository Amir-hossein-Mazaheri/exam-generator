import { Provider } from "react-redux";
import store from "../Store/configStore";
import App from "./App";

function StudentPanel() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default StudentPanel;
