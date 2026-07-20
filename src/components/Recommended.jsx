import { formatViews, timeAgo } from "../utils/timeAgo"
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { fetchPopular } from "../Api/youtube";

const Recommended = ({ categoryId }) => {

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const { data: relatedVideos, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["categoryVideos", categoryId],
    queryFn: ({ pageParam }) => fetchPopular({ pageParam, categoryId }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageToken;
    }
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allVideos = relatedVideos?.pages?.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div className="w-full lg:flex-[0.32] animate-pulse px-3 lg:px-0">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-3 mb-4">
            <div className="w-40 sm:w-42 h-24 rounded-xl bg-gray-300 shrink-0" />
            <div className="mt-2 flex flex-col gap-2 flex-1">
              <div className="h-3 bg-gray-300 rounded w-full" />
              <div className="h-3 bg-gray-300 rounded w-2/3" />
              <div className="h-3 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full lg:flex-[0.32] px-3 lg:px-0">

      {allVideos?.map((video, index) => (

        <Link to={`/video//${video?.id}`}
          style={{ textDecoration: "none", color: "black" }}
          ref={index === allVideos.length - 1 ? ref : null}
          key={video.id}
          className="flex gap-3 mb-4 cursor-pointer no-underline"
        >

          <img
            src={video.snippet.thumbnails.medium.url}
            className="w-40 sm:w-42 h-24 rounded-xl object-cover shrink-0"
          />

          <div className="mt-2">
            <p style={{ textDecoration: "none", color: "black" }} className="font-medium text-sm sm:text-[16px] leading-5 line-clamp-2 mb-1">
              {video.snippet.title}
            </p>

            <p style={{ textDecoration: "none", color: "black" }} className="text-xs sm:text-sm text-gray-600 mb-0">
              {video.snippet.channelTitle}
            </p>

            <div style={{ textDecoration: "none", color: "black" }} className="text-xs text-gray-500 flex gap-1">
              <span>{formatViews(video.statistics.viewCount)} views</span>
              <span>•</span>
              <span>{timeAgo(video.snippet.publishedAt)}</span>
            </div>
          </div>

        </Link>
      ))}

    </div>
  )
}
export default Recommended