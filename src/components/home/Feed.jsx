import { Link } from "react-router-dom";
import { formatViews, timeAgo } from "../../utils/timeAgo";
import FeedLoading from "../loading/FeedLoading";
import ErrorPage from "../loading/ErrorPage";

const Feed = ({ videos, isLoading, error, lastRef }) => {
  if (isLoading) return <FeedLoading />;
if (error) return <ErrorPage title="Couldn't load videos" message="Something went wrong while fetching videos. Try refreshing the page." />
  const allVideos = videos?.pages?.flatMap((page) => page.items) ?? [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-3 sm:px-0">
      {allVideos.map((video, index) => (
        <Link to={`/video/${video.id}`}
          style={{ textDecoration: "none", color: "black" }}
          key={video.id}
          ref={index === allVideos.length - 1 ? lastRef : null}
          className="w-full p-3 cursor-pointer hover:bg-gray-100 rounded-2xl"
        >
          
          <div className="aspect-video overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-cover"
              src={video?.snippet?.thumbnails?.high?.url}
              alt={video?.snippet?.title}
            />
          </div>

          <div className="mt-2">
            <p style={{ textDecoration: "none", color: "black" }} className="font-medium no-underline text-black text-sm sm:text-[16px] leading-5 line-clamp-2 mb-1">
              {video?.snippet?.title}
            </p>

            <p style={{ textDecoration: "none", color: "black" }} className="text-sm text-gray-600">
              {video?.snippet?.channelTitle}
            </p>

            <div style={{ textDecoration: "none", color: "black" }} className="text-sm text-gray-500 flex gap-1">
              <span>{formatViews(video?.statistics?.viewCount)} views</span>
              <span>•</span>
              <span>{timeAgo(video?.snippet?.publishedAt)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;