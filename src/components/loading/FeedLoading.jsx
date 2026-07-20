

const FeedLoading = () => {
  return (
       <div className="grid grid-cols-3 animate-pulse">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="w-98 p-3">
          <div className="aspect-video rounded-xl bg-gray-300" />
          <div className="mt-2">
            <div className="h-4 bg-gray-300 rounded w-full mb-2" />
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
            <div className="h-3 bg-gray-300 rounded w-1/3 mb-1" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeedLoading
