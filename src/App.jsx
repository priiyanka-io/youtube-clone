import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import { useEffect } from "react";
import Feed from "./components/Feed";
import { useInfiniteQuery} from "@tanstack/react-query";
import { fetchPopularVideos } from "./Api/youtube";
import VideoPage from "./components/VideoPage";
import Shorts from "./components/Shorts";
import { useInView } from "react-intersection-observer";
import SearchPage from "./components/SearchPage";
import { useSelector } from "react-redux";
import ErrorPage from "./components/ErrorPage";
function App() {

const category = useSelector((state) => state.category.value);

    const { ref, inView } = useInView({
   threshold: 0.1,
  });
    const {
  data:videos,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,

} = useInfiniteQuery({
  queryKey: ["videos", category],
queryFn: async ({ pageParam }) => {
  const data = await fetchPopularVideos({
    category,
    pageParam,
  });

  return data;
},

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

  return (
    <Routes>
      <Route path="/" element={<MainLayout  />}>
       <Route  path="/video/:videoId" element={<VideoPage category={category}   videos={videos} isLoading={isLoading} error={error}/>}></Route>
           <Route path="search" element={<SearchPage category={category}  />} />
         <Route path="/shorts" element={<Shorts />} />
        <Route
          index
          element={<Feed category={category} lastRef={ref} videos={videos} isLoading={isLoading} error={error}/>}
        />
        <Route path="*" element={<ErrorPage title="Page not found" message="The page you're looking for doesn't exist. Check the URL and try again." />} />
      </Route>
    </Routes>
  );
}
export default App;