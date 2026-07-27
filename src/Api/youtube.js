import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;



const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export const fetchPopularVideos = async ({ category, pageParam = "" }) => {
  try {
    const response = await youtube.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 50,
        regionCode: "In",
        key: API_KEY,
        videoCategoryId: category,
        pageToken: pageParam,
      },
    });
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.log(error);
    throw error; // IMPORTANT
  }
};
export   const fetchVideo = async (videoId) => {
    try {
      const response = await youtube.get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
          key: API_KEY,
        },
      });
      return response.data.items[0];
    } catch (error) {
      console.log("yaha error hai ",error);
      throw error;
    }
  };
export 
  const fetchChannel = async (apiData) => {
    const response = await youtube.get("/channels", {
      params: {
        part: "snippet,statistics",
        id: apiData.snippet.channelId,
        key: API_KEY,
      },
    });
    return response.data.items[0];
  };
  export   const fetchComments = async (videoId) => {
    const response = await youtube.get("/commentThreads", {
      params: {
        part: "snippet",
        videoId: videoId,
        maxResults: 20,
        key: API_KEY,
      },
    });
    return response.data.items;
  };
export const fetchSearchVideos = async ({ pageParam,query }) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 20,
          pageToken: pageParam,
          key: API_KEY,
        },
      }
    );

    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  };


export const fetchPopular= async ({ pageParam,categoryId}) => {
  
  try {
    const response = await youtube.get("/videos", {
  params: {
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
    videoCategoryId: categoryId,
    regionCode: "IN",
    maxResults: 20,
    key: API_KEY,
     pageToken: pageParam,
  },
});
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.log(error);
    throw error; // IMPORTANT
  }
};

export const fetchSearch = async ({ query }) => {
  try {
   

    const response = await youtube.get("/search", {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 6,
        key: API_KEY,
      },
    });

  
    return response.data.items;
  } catch (error) {
    console.log("SEARCH ERROR:", error.response?.data || error.message);
    throw error;
  }
};
export const fetchChannelAvatar = async (channelId) => {
  if (!channelId) return null;
  const res = await fetch(
    `${youtube}/channels?part=snippet&id=${channelId}&key=${API_KEY}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.items?.[0]?.snippet?.thumbnails?.default?.url ?? null;
};
export const fetchShorts = async ({ pageParam = "" }) => {
  try {
    const response = await youtube.get("/search", {
      params: {
        part: "snippet",
        type: "video",
        videoDuration: "short",   // YouTube ka built-in filter: <4 min videos
        q: "shorts",              // extra keyword taaki zyada relevant results aayein
        maxResults: 20,
        regionCode: "IN",
        key: API_KEY,
        pageToken: pageParam,
      },
    });
    return {
      items: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};