import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useInView } from "react-intersection-observer";
import {
  setActiveVideoId,
  toggleMute,
  toggleLike,
  toggleSubscribe,
} from "../redux/shortSlice";

const ShortCard = ({ short, onCommentClick }) => {
  const dispatch = useDispatch();

  const isMuted = useSelector((state) => state.shorts.isMuted);
  const likedVideos = useSelector((state) => state.shorts.likedVideos);
  const subscribedChannels = useSelector((state) => state.shorts.subscribedChannels);

  const videoId = short?.id?.videoId;
  const title = short?.snippet?.title;
  const channelTitle = short?.snippet?.channelTitle;
  const thumbnail = short?.snippet?.thumbnails?.high?.url;

  const liked = !!likedVideos[videoId];
  const subscribed = !!subscribedChannels[channelTitle];

  const { ref, inView } = useInView({
    threshold: 0.6,
  });

  useEffect(() => {
    if (inView) {
      dispatch(setActiveVideoId(videoId));
    }
  }, [inView, videoId, dispatch]);

  return (
    <section
      ref={ref}
      className="w-full h-dvh shrink-0 snap-start snap-always overflow-hidden flex items-center justify-center"
    >
      <div className="relative w-full h-full sm:h-[88vh] sm:max-w-77 sm:rounded-xl overflow-hidden bg-black flex items-center justify-center">

        {inView && (
          <iframe
            key={videoId}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&cc_load_policy=0&disablekb=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}

        <div
          onClick={() => dispatch(toggleMute())}
          className="absolute top-3 left-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/25 hover:bg-black/40 cursor-pointer"
        >
          {isMuted ? (
            <HiSpeakerXMark size={18} className="text-white" />
          ) : (
            <HiSpeakerWave size={18} className="text-white" />
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black/75 to-transparent pointer-events-none" />

        <div className="absolute left-3.5 bottom-4 right-16 sm:right-3.5 z-10 text-white">
          <div className="flex items-center gap-2 mb-2.5">
            <img
              src={thumbnail}
              alt={channelTitle}
              className="w-8 h-8 rounded-full object-cover border border-white/40"
            />
            <span className="text-sm font-semibold">{channelTitle}</span>
            <button
              onClick={() => dispatch(toggleSubscribe(channelTitle))}
              className={` appearance-none text-xs font-semibold px-3 py-1.5 rounded-full! transition-colors ${
                subscribed ? "bg-white/20 text-white" : "bg-white text-black"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <p className="text-sm leading-snug line-clamp-2">{title}</p>
        </div>

<div className="absolute right-2.5 bottom-14 sm:bottom-3 z-10 flex flex-col items-center gap-4 text-white">
          <div
            onClick={() => dispatch(toggleLike(videoId))}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                liked ? "bg-white text-black" : "bg-black/25 hover:bg-black/40 text-white"
              }`}
            >
              {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
            </div>
            <span className="text-xs font-medium">Like</span>
          </div>

          <div
            onClick={() => onCommentClick(videoId)}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/25 hover:bg-black/40 transition-colors">
              <FaCommentDots size={18} />
            </div>
            <span className="text-xs font-medium">Comments</span>
          </div>

          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/25 hover:bg-black/40 transition-colors">
              <FaShare size={17} />
            </div>
            <span className="text-xs font-medium">Share</span>
          </div>

          <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white/60 mt-1">
            <img src={thumbnail} alt="sound" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ShortCard;