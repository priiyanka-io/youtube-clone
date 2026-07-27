import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./home/Navbar";
import Sidebar from "./home/Sidebar";

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <div className="flex">
        {location.pathname !== "/vid" && <Sidebar />}

        <main
          className={`flex-1 ${
            location.pathname !== "/vid" ? "sm:ml-16 lg:ml-23" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;