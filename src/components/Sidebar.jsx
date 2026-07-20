import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return (
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
          to="/"
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
          to="/"
          className={() =>
            `w-full py-3 flex flex-col items-center gap-1 text-black no-underline hover:bg-gray-100 `
          }
        >
          <MdOutlineSubscriptions size={22} />
          <span className="text-[11px] lg:text-[14px] no-underline!">Subscriptions</span>
        </NavLink>

        <NavLink
          style={{ textDecoration: "none" }}
          to="/"
          className={() =>
            `w-full py-3 flex flex-col items-center gap-1 text-black no-underline hover:bg-gray-100 `
          }
        >
          <CgProfile size={22} />
          <span className="text-[11px] lg:text-[14px] text-black no-underline">You</span>
        </NavLink>
      </div>

    </div>
  );
};

export default Sidebar;