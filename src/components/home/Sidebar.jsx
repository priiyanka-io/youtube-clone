import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return (
    <>
      <div className="hidden sm:flex w-16 lg:w-23 h-[calc(100vh-17)] fixed bg-white flex-col items-center border-r border-gray-200 pt-2.5">
        <div className="flex flex-col">
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
            className={() =>
              `w-full py-3 flex flex-col items-center gap-1 text-black no-underline hover:bg-gray-100 `
            }
          >
            <AiFillHome size={22} />
            <span className="text-[11px] lg:text-[14px] no-underline">Home</span>
          </NavLink>

          <NavLink
            to="/shorts"
            style={{ textDecoration: "none" }}
            className={() =>
              `w-full py-3 flex flex-col items-center gap-1 text-black no-underline hover:bg-gray-100 `
            }
          >
            <SiYoutubeshorts size={22} />
            <span className="text-[11px] lg:text-[14px] no-underline ">Shorts</span>
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/subscription"
            className={() =>
              `w-full py-3 flex flex-col items-center gap-1 text-black no-underline hover:bg-gray-100 `
            }
          >
            <MdOutlineSubscriptions size={22} />
            <span className="text-[11px] lg:text-[14px] no-underline!">Subscriptions</span>
          </NavLink>

          <NavLink
            style={{ textDecoration: "none" }}
            to="/profile"
            className={() =>
              `w-full py-3 flex flex-col items-center gap-1 text-black no-underline hover:bg-gray-100 `
            }
          >
            <CgProfile size={22} />
            <span className="text-[11px] lg:text-[14px] text-black no-underline">You</span>
          </NavLink>
        </div>
      </div>

      <div className="flex sm:hidden fixed bottom-0 left-0 w-full h-14 bg-white border-t border-gray-200 items-center justify-around z-50">
        <NavLink
          to="/"
          style={{ textDecoration: "none" }}
          className="flex flex-col items-center gap-0.5 text-black no-underline"
        >
          <AiFillHome size={22} />
          <span className="text-[10px] no-underline">Home</span>
        </NavLink>

        <NavLink
          to="/shorts"
          style={{ textDecoration: "none" }}
          className="flex flex-col items-center gap-0.5 text-black no-underline"
        >
          <SiYoutubeshorts size={22} />
          <span className="text-[10px] no-underline">Shorts</span>
        </NavLink>
        <NavLink
          to="/subscription"
          style={{ textDecoration: "none" }}
          className="flex flex-col items-center gap-0.5 text-black no-underline"
        >
          <MdOutlineSubscriptions size={22} />
          <span className="text-[10px] no-underline">Subscriptions</span>
        </NavLink>

        <NavLink
          to="/profile"
          style={{ textDecoration: "none" }}
          className="flex flex-col items-center gap-0.5 text-black no-underline"
        >
          <CgProfile size={22} />
          <span className="text-[10px] no-underline">You</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;