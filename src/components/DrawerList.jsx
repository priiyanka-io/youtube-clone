import Box from '@mui/material/Box';
import { MdHome } from "react-icons/md";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IoGameController } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa6";
import { FiMenu } from 'react-icons/fi';
import { setCategory } from "../redux/categorySlice";
import { FaTv } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { FaMusic } from "react-icons/fa6";
import { FaBlog } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { IoMdBasketball } from "react-icons/io";

const DrawerList = ({ toggleDrawer }) => {
  const subscription = [
    { name: "KGcoding", src: "/kgcoding.webp" },
    { name: "Apna College", src: "/shradha.webp" },
    { name: "Thapa Technical", src: "/thapa.webp" },
    { name: "CodeWithHarry", src: "/harry.webp" },
    { name: "chai aur code", src: "/chai.webp" },
  ]
  const categories = [
    { name: "Home", icon: <MdHome />, set: "0" },
    { name: "Gaming", icon: <IoGameController />, set: "20" },
    { name: "Automobile", icon: <FaCarSide />, set: "2" },
    { name: "Sports", icon: <IoMdBasketball />, set: "17" },
    { name: "Entertainment", icon: <FaTv />, set: "24" },
    { name: "Technology", icon: <GrTechnology />, set: "28" },
    { name: "Music", icon: <FaMusic />, set: "10" },
    { name: "Blog", icon: <FaBlog />, set: "22" },
    { name: "Newspaper", icon: <LuNewspaper />, set: "25" },
  ];

  return <>
    <Box sx={{ width: { xs: 220, sm: 250 }, height: "100vh" }}
      className="flex flex-col overflow-hidden" role="presentation">

      {/* Header */}
      <div className="flex sticky items-center gap-3 m-1 h-16 px-2 shrink-0">
        <div onClick={toggleDrawer(false)} className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100">
          <FiMenu size={24} />
        </div>
        <img className="w-24 sm:w-30 h-14 sm:h-17" src="/youtube.png" />
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <List>
          {categories.map((item) => (
            <div
              onClick={() => {
                toggleDrawer(false);
                setCategory(item.set);
              }}
              style={{ textDecoration: "none", color: "black" }}
              key={item.name}
              className="text-black no-underline"
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon className="text-xl sm:text-2xl text-black">
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </div>
          ))}
        </List>
        <hr className='font-semibold' />
        <p className='ml-4 font-semibold text-lg sm:text-xl'>Subscription</p>

        <List>
          {subscription.map((item) => (
            <div style={{ textDecoration: "none", color: "black" }} className="text-black decoration-none" key={item.name}>
              <div className='flex gap-3 ml-4 p-2'>
                <img className='h-7 w-7 sm:h-8 sm:w-8 rounded-full' src={item.src} />
                <p className='text-black'>{item.name}</p>
              </div>
            </div>
          ))}
        </List>

      </div>

    </Box>
  </>
};
export default DrawerList;