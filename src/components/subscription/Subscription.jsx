import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchChannelVideos } from "../../Api/youtube";
import subscribedChannels from "./subscribedchannels";
import {  timeAgo } from "../../utils/timeAgo";
import ErrorPage from "../loading/ErrorPage";
import SubsLoading from "../loading/SubsLoading";

const Subscriptions = () => {
  const [activeChannel, setActiveChannel] = useState(subscribedChannels[0]);

  const { ref, inView } = useInView({ threshold: 0.1 });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["channelVideos", activeChannel.channelId],
    queryFn: ({ pageParam }) =>
      fetchChannelVideos({ channelId: activeChannel.channelId, pageParam }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const videos = data?.pages?.flatMap((page) => page.items) ?? [];
  if (isLoading) return <SubsLoading />;
if (error) return <ErrorPage title="Couldn't load videos" message="Something went wrong while fetching videos. Try refreshing the page." />
  return (
    <div className="px-3 sm:px-6">

      {/* Channel row — click to switch whose videos are shown */}
      <div className="flex items-center gap-6 overflow-x-auto py-4 border-b border-gray-200 mb-4">
        {subscribedChannels.map((channel) => (
          <div
            key={channel.channelId}
            onClick={() => setActiveChannel(channel)}
            className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
          >
            <img
              src={channel.avatar}
              alt={channel.name}
              className={`w-14 h-14 rounded-full object-cover ${
                activeChannel.channelId === channel.channelId
                  ? "ring-2 ring-black ring-offset-2"
                  : ""
              }`}
            />
            <span className="text-xs font-medium max-w-16 truncate">
              {channel.name}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <ErrorPage
          title="Couldn't load videos"
          message="Something went wrong while fetching this channel's videos."
        />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video rounded-xl bg-gray-300" />
              <div className="h-3 bg-gray-300 rounded w-full mt-2" />
              <div className="h-3 bg-gray-300 rounded w-1/2 mt-2" />
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {videos
              .filter((video) => video?.snippet?.resourceId?.videoId)
              .map((video, index) => (
              <Link
                to={`/video/${video.snippet.resourceId.videoId}`}
                key={video.snippet.resourceId.videoId}
                ref={index === videos.length - 1 ? ref : null}
                style={{ textDecoration: "none", color: "black" }}
                className="w-full p-3 cursor-pointer hover:bg-gray-100 rounded-2xl"
              >
                <div className="aspect-video overflow-hidden rounded-xl">
                  <img
                    className="w-full h-full object-cover"
                    src={video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url}
                    alt={video.snippet.title}
                  />
                </div>
                <div className="mt-2">
                  <p className="font-medium text-sm sm:text-[16px] leading-5 line-clamp-2 mb-1">
                    {video.snippet.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {video.snippet.channelTitle}
                  </p>
                  <div className="text-sm text-gray-500 flex gap-1">
                    <span>{timeAgo(video.snippet.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      )}

    </div>
  );
};

export default Subscriptions;