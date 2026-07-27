import { timeAgo } from "../../utils/timeAgo"
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { fetchChannelVideos } from "../../Api/youtube";

const Recommended = ({ channelId, currentVideoId }) => {

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const { data: relatedVideos, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["channelRecommended", channelId],
    queryFn: ({ pageParam }) => fetchChannelVideos({ channelId, pageParam }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    enabled: !!channelId,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten pages, drop invalid entries, and exclude the video currently playing
  const allVideos = (relatedVideos?.pages?.flatMap((page) => page.items) ?? [])
    .filter((video) => video?.snippet?.resourceId?.videoId)
    .filter((video) => video.snippet.resourceId.videoId !== currentVideoId);

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

      {allVideos?.map((video, index) => {
        const videoId = video.snippet.resourceId.videoId;
        const thumbnail =
          video.snippet.thumbnails?.medium?.url ||
          video.snippet.thumbnails?.default?.url;

        return (
          <Link
            to={`/video/${videoId}`}
            style={{ textDecoration: "none", color: "black" }}
            ref={index === allVideos.length - 1 ? ref : null}
            key={videoId}
            className="flex gap-3 mb-4 cursor-pointer no-underline"
          >
            <img
              src={thumbnail}
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
                <span>{timeAgo(video.snippet.publishedAt)}</span>
              </div>
            </div>
          </Link>
        );
      })}

    </div>
  )
}
export default Recommended;