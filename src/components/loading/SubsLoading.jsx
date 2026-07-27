const SubsLoading = () => {
  return (
    <div className="px-3 sm:px-6">

      <div className="flex items-center gap-6 overflow-x-auto py-4 border-b border-gray-200 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
            <div className="h-2.5 w-12 rounded bg-gray-300 animate-pulse" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video rounded-xl bg-gray-300" />
            <div className="h-3 bg-gray-300 rounded w-full mt-2" />
            <div className="h-3 bg-gray-300 rounded w-1/2 mt-2" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default SubsLoading;