const ShortsLoading = () => {
  return (
    <section className="w-full h-screen shrink-0 snap-start snap-always overflow-hidden flex items-center justify-center gap-4">

      <div className="relative w-full max-w-77 h-[88vh] rounded-none sm:rounded-xl overflow-hidden bg-gray-300 animate-pulse flex items-center justify-center">

        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-400/50" />

        <div className="absolute left-3.5 bottom-4 right-3.5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-400/60 shrink-0" />
            <div className="h-3 w-24 rounded bg-gray-400/60" />
            <div className="h-6 w-16 rounded-full bg-gray-400/60 ml-1.5" />
          </div>
          <div className="h-3 w-full rounded bg-gray-400/50 mb-1.5" />
          <div className="h-3 w-2/3 rounded bg-gray-400/50" />
        </div>
      </div>

      <div className="h-[88vh] flex flex-col justify-end items-center pb-10">
        <div className="flex flex-col items-center gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-11.5 h-11.5 rounded-full bg-gray-300 animate-pulse" />
              <div className="h-2.5 w-8 rounded bg-gray-300 animate-pulse" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-lg bg-gray-300 animate-pulse mt-1" />
        </div>
      </div>

    </section>
  );
};

export default ShortsLoading;