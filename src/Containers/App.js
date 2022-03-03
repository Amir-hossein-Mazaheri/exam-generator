import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Spin } from "antd";

//layout assets
import Wrapper from "../Layouts/Wrapper";
import MainLayout from "../Layouts/MainLayout";

// pages
import HomePage from "../Pages";
import NotFoundPage from "../Pages/Error/404";

const RawExam = lazy(() => import("../Pages/RawExam"));
const Page2 = lazy(() => import("../Pages/Page2"));

const loadingSpinner = (
  <Wrapper>
    <Spin />
  </Wrapper>
);

function App() {
  return (
    <Suspense fallback={loadingSpinner}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout asRoute={true} />}>
            <Route index element={<HomePage />} />
            <Route path="/raw-exam" element={<RawExam />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="*" component={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
