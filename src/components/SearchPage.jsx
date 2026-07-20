import { Link, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import SearchLoading from "./loading/SearchLoading";
import { fetchSearchVideos } from "../Api/youtube";
import ErrorPage from "./ErrorPage";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchVideos", query],
    queryFn: ({ pageParam }) => fetchSearchVideos({ pageParam, query }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    enabled: !!query,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const videos = data?.pages?.flatMap((page) => page.items) ?? [];

  if (isLoading) return <SearchLoading />;
 if (error) return <ErrorPage title="Search failed" message="We couldn't load search results right now. Try again in a moment." />;

  return (
    <div className="px-3 sm:px-6">
      {videos.map((video, index) => (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/video//${video?.id?.videoId}`}
          key={video.id.videoId}
          ref={index === videos.length - 1 ? ref : null}
          className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-2 cursor-pointer w-full"
        >
          {/* Thumbnail */}
          <div className="w-full sm:w-93 h-52 sm:h-58 shrink-0 overflow-hidden rounded-xl">
            <img
              src={video.snippet.thumbnails.high?.url}
              alt={video.snippet.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video Details */}
          <div className="flex flex-col py-1">
            <h4 className="text-base sm:text-lg font-medium leading-6 line-clamp-2 mb-2">
              {video.snippet.title}
            </h4>

            <p className="text-sm text-gray-500 mb-2 sm:mb-4">
              {video.snippet.channelTitle}
            </p>

            <p className="text-sm text-gray-500 line-clamp-2">
              {video.snippet.description}
            </p>
          </div>
        </Link>
      ))}

      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default SearchPage;