import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import DrawerList from "./DrawerList";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "../../Api/youtube";

import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/navSlice";
import { setDebouncedSearch } from "../../redux/navSlice";
import { setShowSuggestions } from "../../redux/navSlice";
import { setOpen } from "../../redux/drawerSlice";

const Navbar = () => {
  const search = useSelector((state) => state.navbar.search);
  const showSuggestions = useSelector((state) => state.navbar.showSuggestions);
  const debouncedSearch = useSelector((state) => state.navbar.debouncedSearch);
  const open = useSelector((state) => state.drawer.open);

 
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = (newOpen) => () => {
    dispatch(setOpen(newOpen));
  };

  const { data: suggestions = [] } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => fetchSearch({ query: debouncedSearch }),
    retry: false,
    enabled: debouncedSearch.trim().length >= 3,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setDebouncedSearch(search));
    }, 700);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  return (
    <div
      onClick={() => {
        dispatch(setShowSuggestions(false));
      }}
      className="sticky top-0 z-50 flex items-center justify-between p-2 h-14 sm:h-17 bg-white/80 backdrop-blur-md gap-2"
    >
 
      {!mobileSearchOpen && (
        <div className="flex h-14 sm:h-16 w-auto m-0.5 items-center overflow-hidden shrink-0">
          <div className="overflow-hidden w-10 h-10 sm:w-12 sm:h-11.25 flex items-center justify-center rounded-full cursor-pointer mb-1 hover:bg-gray-100">
            <FiMenu size={22} onClick={toggleDrawer(true)} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <DrawerList toggleDrawer={toggleDrawer} />
            </Drawer>
          </div>
          <Link to="/">
            <img className="w-20 sm:w-30 h-12 sm:h-17" src="/youtube.png" />
          </Link>
        </div>
      )}

      <div className="flex gap-2.5 flex-1 justify-center sm:justify-start max-w-2xl items-center">
        
        {!mobileSearchOpen && (
          <div
            className="flex sm:hidden w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 ml-auto"
            onClick={(e) => {
              e.stopPropagation();
              setMobileSearchOpen(true);
            }}
          >
            <IoIosSearch size={22} />
          </div>
        )}

     
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            mobileSearchOpen ? "flex" : "hidden"
          } sm:flex relative items-center w-full sm:w-125 h-9 sm:h-10 border border-gray-300 rounded-full`}
        >
          <input
            value={search}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
              dispatch(setShowSuggestions(true));
            }}
            type="text"
            placeholder="Search"
            className="flex-1 min-w-0 h-full px-3 sm:px-4 outline-none text-sm"
            onFocus={() => dispatch(setShowSuggestions(true))}
            autoFocus={mobileSearchOpen}
          />

          <div className="w-10 sm:w-14 h-full flex items-center justify-center border-l border-gray-300 cursor-pointer hover:bg-gray-100 shrink-0">
            <IoIosSearch size={20} />
          </div>
          {mobileSearchOpen && (
            <div
              className="sm:hidden w-9 h-9 flex items-center justify-center cursor-pointer shrink-0 mr-1"
              onClick={() => {
                setMobileSearchOpen(false);
                dispatch(setShowSuggestions(false));
              }}
            >
              <IoClose size={22} />
            </div>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-11 sm:top-12 left-0 w-full bg-white shadow-lg rounded-xl py-2 z-50">
              {suggestions.map((item) => (
                <div
                  key={item.id.videoId}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    dispatch(setShowSuggestions(false));
                    setMobileSearchOpen(false);
                    navigate(`/search?q=${encodeURIComponent(item.snippet.title)}`);
                  }}
                >
                  {item.snippet.title}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex bg-gray-100 w-10 h-10 text-2xl cursor-pointer items-center justify-center rounded-full hover:bg-gray-200">
          <FaMicrophone />
        </div>
      </div>

      {!mobileSearchOpen && (
        <div className="hidden md:flex gap-3 shrink-0">
          <div className="bg-gray-100 gap-3 w-26 h-10 text-lg cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-200">
            <FaPlus /> <span>Create</span>
          </div>
          <div className="w-10 h-10 text-2xl cursor-pointer flex justify-center items-center rounded-full hover:bg-gray-100">
            <GoBell />
          </div>
          <Link to="/profile">
           <img className="dp w-10 h-10 rounded-full object-cover" src="/photo.png" /></Link>
         
        </div>
      )}

      {!mobileSearchOpen && (
        <Link to="/profile" className="flex md:hidden shrink-0">

          <img className="dp w-9 h-9 rounded-full object-cover" src="/photo.png" />
        </Link>
      )}
    </div>
  );
};
export default Navbar;