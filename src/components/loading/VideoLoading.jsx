
const VideoLoading = () => {
  return (
       <div className="flex gap-6 px-7 animate-pulse">

      <div className="flex-[0.68]">
        
        <div className="w-full aspect-video bg-gray-300 rounded-xl" />

        <div className="h-5 bg-gray-300 rounded w-3/4 mt-3" />
        <div className="h-5 bg-gray-300 rounded w-1/2 mt-2" />

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-gray-300" />
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-gray-300 rounded w-28" />
              <div className="h-3 bg-gray-300 rounded w-20" />
            </div>
            <div className="h-9 w-24 bg-gray-300 rounded-full ml-4" />
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-24 bg-gray-300 rounded-full" />
            <div className="h-9 w-20 bg-gray-300 rounded-full" />
          </div>
        </div>

       
        <div className="bg-gray-200 rounded-xl p-4 mt-4">
          <div className="h-3 bg-gray-300 rounded w-40 mb-3" />
          <div className="h-3 bg-gray-300 rounded w-full mb-2" />
          <div className="h-3 bg-gray-300 rounded w-2/3" />
        </div>

        <div className="mt-7">
          <div className="h-5 bg-gray-300 rounded w-32 mb-4" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-3 bg-gray-300 rounded w-32" />
                <div className="h-3 bg-gray-300 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-[0.32]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-3 mb-4">
            <div className="w-42 h-24 rounded-xl bg-gray-300 shrink-0" />
            <div className="mt-2 flex flex-col gap-2 flex-1">
              <div className="h-3 bg-gray-300 rounded w-full" />
              <div className="h-3 bg-gray-300 rounded w-2/3" />
              <div className="h-3 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoLoading