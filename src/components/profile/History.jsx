import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { fetchPopular } from "../../Api/youtube";
import ErrorPage from "../loading/ErrorPage";
import { formatViews, timeAgo } from "../../utils/timeAgo";
import { Link } from "react-router";

const History = () => {
  const category = 0;
  const params="";
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isError } = useQuery({
    queryKey: [category],
    queryFn: () => fetchPopular(params,category),
  });

  const historyVideos = data?.items ?? [];

  const nextSlide = () => {
    if (currentIndex + 4 < historyVideos.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const prevSlide = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  if (isError) {
    return (
      
      <ErrorPage
        title="Couldn't load videos"
        message="Something went wrong while fetching videos. Try refreshing the page."
      />
    );
  }

  return (
  <div className="mt-8">
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <h2 className="text-black text-xl font-semibold">History</h2>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <button className="text-black text-sm border border-gray-800 rounded-full! px-4 py-1.5 hover:bg-gray-100">
          View all
        </button>

        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="w-8 h-8 flex items-center justify-center rounded-full! border border-gray-800 disabled:opacity-40"
        >
          <IoChevronBack size={16} />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex + 4 >= historyVideos.length}
          className="w-8 h-8 flex items-center justify-center rounded-full! border border-gray-800 disabled:opacity-40"
        >
          <IoChevronForward size={16} />
        </button>
      </div>
    </div>

    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {historyVideos
        .slice(currentIndex, currentIndex + 4)
        .map((video) => (
          <Link
            key={video.id}
             style={{ textDecoration: "none", color: "black" }}
            to={`/video/${video.id}`}
            className="text-black no-underline"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-full h-44 sm:h-40 lg:h-36 object-cover"
              />

              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video.contentDetails.duration}
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <div className="pr-2 flex-1">
                <p className="text-black text-sm font-medium line-clamp-2">
                  {video.snippet.title}
                </p>

                <p className="text-gray-600 text-xs mt-1">
                  {video.snippet.channelTitle}
                </p>

                <p className="text-gray-600 text-xs">
                  {formatViews(video.statistics.viewCount)} •{" "}
                  {timeAgo(video.snippet.publishedAt)}
                </p>
              </div>

              <BsThreeDotsVertical
                size={16}
                className="text-black cursor-pointer shrink-0 mt-1"
              />
            </div>
          </Link>
        ))}
    </div>
  </div>
);
};

export default History;