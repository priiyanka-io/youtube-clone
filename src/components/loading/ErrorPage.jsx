import { Link } from "react-router-dom";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";

const ErrorPage = ({ 
  title = "Something went wrong", 
  message = "This page isn't available. Try searching for something else or go back home.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-20 sm:py-32 min-h-[60vh]">
      
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <MdSignalWifiConnectedNoInternet4 size={40} className="text-gray-400" />
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mb-2">
        {title}
      </h1>

      <p className="text-sm sm:text-base text-gray-500 max-w-md mb-8">
        {message}
      </p>

      <Link
        to="/"
        style={{ textDecoration: "none" }}
        className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition"
      >
        Go home
      </Link>

    </div>
  );
};

export default ErrorPage;