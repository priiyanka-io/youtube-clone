import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showComments: false,
  activeVideoId: null,
  isMuted: true,
  likedVideos: {},        
  subscribedChannels: {}, 
};

const shortSlice = createSlice({
  name: "shorts",
  initialState,
  reducers: {
    setShowComments: (state, action) => {
      state.showComments = action.payload;
    },
    setActiveVideoId: (state, action) => {
      state.activeVideoId = action.payload;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    toggleLike: (state, action) => {
      const videoId = action.payload;
      state.likedVideos[videoId] = !state.likedVideos[videoId];
    },
    toggleSubscribe: (state, action) => {
      const channel = action.payload;
      state.subscribedChannels[channel] = !state.subscribedChannels[channel];
    },
  },
});

export const {
  setShowComments,
  setActiveVideoId,
  toggleMute,
  toggleLike,
  toggleSubscribe,
} = shortSlice.actions;

export default shortSlice.reducer;