

const SearchLoading = () => {
  return (
        <div className="animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-3 mb-4 w-full">
          <div className="w-93 h-58 shrink-0 rounded-xl bg-gray-300" />
          <div className="flex flex-col py-1 flex-1 gap-3">
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-2/3" />
            <div className="h-3 bg-gray-300 rounded w-1/3 mt-2" />
            <div className="h-3 bg-gray-300 rounded w-full" />
            <div className="h-3 bg-gray-300 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchLoading