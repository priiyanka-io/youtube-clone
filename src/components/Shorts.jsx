import { useEffect } from "react";
import ShortCard from "./ShortCard";
import CommentsPanel from "./CommentsPanel";
import { fetchShorts } from "../Api/youtube";
import { useInfiniteQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import { useInView } from "react-intersection-observer";
import ShortsLoading from "./loading/ShortsLoading";

import {setActiveVideoId, setShowComments,} from "../redux/shortSlice";
import { useDispatch, useSelector } from "react-redux";

const Shorts = () => {

  const dispatch = useDispatch();
  const { showComments, activeVideoId } = useSelector(
    (state) => state.shorts
  );
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: async ({ pageParam }) => {
      const data = await fetchShorts({
        pageParam,
      });
      return data;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageToken;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const shortsData = data?.pages?.flatMap((page) => page.items) ?? [];

  const handleCommentClick = (videoId) => {
    dispatch(setActiveVideoId(videoId));
    dispatch(setShowComments(true));
  };

  if (isLoading) return <ShortsLoading />;
  if (error)
    return (
      <ErrorPage
        title="Couldn't load videos"
        message="Something went wrong while fetching videos. Try refreshing the page."
      />
    );

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-white gap-4">

      <div className="w-full max-w-120 h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-none">
        {shortsData.map((short) => (
          <ShortCard
            key={short.id}
            short={short}
            onCommentClick={handleCommentClick}
          />
        ))}

        <div ref={ref} className="h-1" />
      </div>
      {showComments && (
        <CommentsPanel
          videoId={activeVideoId}
          onClose={() => dispatch(setShowComments(false))}
        />
      )}
    </div>
  );
};

export default Shorts;