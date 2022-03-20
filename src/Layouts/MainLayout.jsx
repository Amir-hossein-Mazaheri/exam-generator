import { Outlet } from "react-router";
import ContentLayout from "./ContentLayout";
import Sidebar from "../Common/Sidebar";
import useSWR from "swr";
import fetcher from "../Helpers/fetcher";
import Spinner from "../Common/Spinner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_USER_INFO } from "../Store/ui";

function MainLayout({ asRoute = false, children }) {
  const dispatch = useDispatch();
  const { data: userInfo } = useSWR("/user/", fetcher);

  useEffect(() => {
    dispatch(SET_USER_INFO({ info: userInfo }));
  }, [userInfo, dispatch]);

  if (!userInfo) {
    return <Spinner />;
  }

  return (
    <main className="flex overflow-hidden">
      <aside className="basis-3/12 grow h-screen bg-black text-white">
        <div className="bg-green-500 font-semibold text-lg text-center px-5 py-5">
          <p>
            <span>خوش آمدی</span>{" "}
            <span>{userInfo.first_name + " " + userInfo.last_name}</span>
          </p>
        </div>
        <Sidebar />
      </aside>
      <section className="basis-9/12 h-screen grow overflow-auto scrollbar-thin scrollbar-thumb-slate-700">
        <ContentLayout>{asRoute ? <Outlet /> : children}</ContentLayout>
      </section>
    </main>
  );
}

export default MainLayout;
