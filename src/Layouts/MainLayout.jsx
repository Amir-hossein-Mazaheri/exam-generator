import { Outlet } from "react-router";

function MainLayout({ asRoute = false, children }) {
  return (
    <main className="md:px-12 md:py-7 px-7 py-5">
      <aside>
        
      </aside>
      <section>{asRoute ? <Outlet /> : children}</section>
    </main>
  );
}

export default MainLayout;
