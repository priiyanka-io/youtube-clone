import { FaShare } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Recommended from "./Recommended";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatViews, timeAgo } from "../../utils/timeAgo";
import { useEffect } from "react";
import VideoLoading from "../loading/VideoLoading";
import { fetchChannel, fetchComments, fetchVideo } from "../../Api/youtube";
import ErrorPage from "../loading/ErrorPage";

const VideoPage = () => {

  const { videoId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  const { data: apiData, isError: erroInVideo, isLoading: videoLoading } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => fetchVideo(videoId),
  });

  const { data: channelData, isLoading: channelLoading, isError: erroInChannel } = useQuery({
    queryKey: ["channel", apiData?.snippet?.channelId],
    queryFn: () => fetchChannel(apiData),
    enabled: !!apiData,
  });

  const { data: commentsData, isLoading: commentsLoading, isError: erroInComments } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => fetchComments(videoId),
  });

  if (videoLoading) return <VideoLoading />;

  if (erroInVideo || !apiData) {
    return (
      <ErrorPage title="Video not available" message="This video might be private, deleted, or region-restricted." />
    );
  }

  if (erroInComments || erroInChannel) {
    return (
      <ErrorPage title="Something went wrong" message="We couldn't load all the video details right now." />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 px-3 sm:px-7 py-3 sm:py-0">

      <div className="w-full lg:flex-[0.68]">

        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <p className="text-base sm:text-[18px] font-bold mt-2">
          {apiData?.snippet?.title}
        </p>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-1 gap-3">

          <div className="flex items-center gap-3 sm:gap-4">

            {channelLoading ? (
              <>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-300 animate-pulse" />
                <div className="flex flex-col gap-2">
                  <div className="h-3 bg-gray-300 rounded w-28 animate-pulse" />
                  <div className="h-3 bg-gray-300 rounded w-20 animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <img
                  src={channelData?.snippet?.thumbnails?.high?.url}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/user.png";
                  }}
                />

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold">
                    {apiData?.snippet?.channelTitle}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {formatViews(channelData?.statistics?.subscriberCount)} subscribers
                  </span>
                </div>
              </>
            )}

            <div className="rounded-full bg-black px-3 sm:px-4 py-2 text-white">
              <button className="text-sm">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto">

            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden w-fit shrink-0">
              <button className="flex items-center gap-1 px-3 py-2 hover:bg-gray-200 transition">
                <AiOutlineLike size={20} />
                <span className="text-sm font-medium">{formatViews(apiData?.statistics?.likeCount)}</span>
              </button>

              <div className="w-px h-6 bg-gray-300"></div>

              <button className="px-4 py-2 hover:bg-gray-200 transition">
                <AiOutlineDislike size={20} />
              </button>
            </div>

            <div className="bg-gray-100 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-200 shrink-0">
              <FaShare />
              <button className="text-sm">
                Share
              </button>
            </div>
          </div>

        </div>

        <div className="bg-gray-100 rounded-xl p-3 sm:p-4 mt-3">
          <p className="font-medium text-sm sm:text-base">
            {formatViews(apiData?.statistics?.viewCount)} • {timeAgo(apiData?.snippet?.publishedAt)}
          </p>
          <p className="text-sm mt-2">
            {apiData?.snippet?.description?.slice(0, 300)}
          </p>
        </div>

        <div className="mt-6 sm:mt-7">

          <p className="font-semibold text-xl sm:text-2xl mb-4">
            {formatViews(apiData?.statistics?.commentCount)} Comments
          </p>

          <div className="flex gap-3 mb-6">
            <img src="/photo.png" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" />
            <input
              placeholder="Add a comment..."
              className="flex-1 border-b outline-none pb-2 text-sm sm:text-base"
            />
          </div>

          {commentsLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3 mb-6 animate-pulse">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-300" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-3 bg-gray-300 rounded w-32" />
                  <div className="h-3 bg-gray-300 rounded w-full" />
                  <div className="h-3 bg-gray-300 rounded w-1/3" />
                </div>
              </div>
            ))
          ) : (
            commentsData?.map((comment) => (
              <div key={comment.id} className="flex gap-3 mb-6">
                <img
                  src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/user.png";
                  }}
                />

                <div className="flex flex-col">
                  <span className="font-medium text-base sm:text-lg">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                    <span className="text-gray-500 text-xs">{timeAgo(comment.snippet.topLevelComment.snippet.publishedAt)}</span>
                  </span>
                  <span className="text-sm mt-1">
                    {comment.snippet.topLevelComment.snippet.textDisplay}
                  </span>
                  <div className="flex gap-3 text-sm mt-1">
                    <div className="flex gap-0.5">
                      <AiOutlineLike size={17} />
                      <span> {comment.snippet.topLevelComment.snippet.likeCount}</span>
                    </div>
                    <AiOutlineDislike size={17} />
                  </div>
                </div>
              </div>
            ))
          )}

        </div>

      </div>

      {apiData?.snippet?.channelId && (
        <Recommended
          channelId={apiData.snippet.channelId}
          currentVideoId={videoId}
        />
      )}
    </div>
  );
};
export default VideoPage;