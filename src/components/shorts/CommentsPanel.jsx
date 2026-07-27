import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { fetchComments } from "../../Api/youtube";
import { useQuery } from "@tanstack/react-query";
import { timeAgo, formatViews } from "../../utils/timeAgo";

const CommentsPanel = ({ onClose, videoId }) => {
  const { data: rawComments, isLoading, isError } = useQuery({
    queryKey: ["shortComments", videoId],
    queryFn: () => fetchComments(videoId),
    enabled: !!videoId,
  });

  const comments = rawComments ?? [];

  return (
    <div className="w-full max-w-100 h-dvh bg-white rounded-xl flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
        <h3 className="font-semibold text-base">
          {isLoading ? "Comments" : `${comments.length} Comments`}
        </h3>
        <div
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <IoClose size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">

        {isLoading && (
          [...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3 mb-5 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gray-300 shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-3 bg-gray-300 rounded w-32" />
                <div className="h-3 bg-gray-300 rounded w-full" />
                <div className="h-3 bg-gray-300 rounded w-1/3" />
              </div>
            </div>
          ))
        )}

        {isError && (
          <p className="text-sm text-gray-500 text-center mt-6">
            Couldn't load comments right now.
          </p>
        )}

        {!isLoading && !isError && comments.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-6">
            No comments yet.
          </p>
        )}

        {!isLoading && comments.map((c) => {
          const snippet = c?.snippet?.topLevelComment?.snippet;
          if (!snippet) return null;

          return (
            <div key={c.id} className="flex gap-3 mb-5">
              <img
                onError={(e) => {
          e.currentTarget.src = "/user.png";
        }}
                src={snippet.authorProfileImageUrl}
                alt={snippet.authorDisplayName}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col flex-1">
                <span className="text-sm">
                  <span className="font-semibold">{snippet.authorDisplayName}</span>{" "}
                  <span className="text-gray-500 text-xs">{timeAgo(snippet.publishedAt)}</span>
                </span>
                <p className="text-sm mt-0.5">{snippet.textDisplay}</p>

                <div className="flex items-center gap-4 mt-1.5 text-gray-500">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    <AiOutlineLike size={15} />
                    <span className="text-xs">{formatViews(snippet.likeCount)}</span>
                  </div>
                  <div className="cursor-pointer hover:text-black">
                    <AiOutlineDislike size={15} />
                  </div>
                  <span className="text-xs font-medium cursor-pointer hover:text-black">
                    Reply
                  </span>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      
      <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 shrink-0">
        <img
          src="/photo.png"
          alt="you"
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 text-sm outline-none border-b border-transparent focus:border-gray-300 pb-1"
        />
      </div>

    </div>
  );
};

export default CommentsPanel;