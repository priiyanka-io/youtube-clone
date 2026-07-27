import History from "./History.jsx";
import LikedVideos from "./LikedVideos";

const Profile = () => {
  return (
    <div className="bg-white min-h-screen px-4 md:px-6 py-6">
     
     <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
        <div >
          <img
  className="w-28 h-28 rounded-full! object-cover"
  src="photo.png"
/>
        </div>
        <div>
          <h1 className="text-black text-3xl font-bold">Priya Bhatt</h1>
          <p className="text-gray-700 mt-1">@PriyaBhatt1311 • View channel</p>
          <div className="flex gap-3 mt-3">
            <button className="text-black text-sm border border-gray-500 rounded-full! px-4 py-1.5 hover:bg-gray-200">
              Switch account
            </button>
            <button className="text-black text-sm border border-gray-500 rounded-full! px-4 py-1.5 hover:bg-gray-200">
              Google Account
            </button>
          </div>
        </div>
      </div>

      <History />

      <LikedVideos />
    </div>
  );
};

export default Profile;