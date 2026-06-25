export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl border bg-white p-5"
          >
            <div className="h-4 w-24 rounded bg-gray-200"></div>

            <div className="mt-4 h-10 w-16 rounded bg-gray-200"></div>

            <div className="mt-4 h-3 w-28 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="mb-5 h-8 w-40 rounded bg-gray-200"></div>

        <div className="grid gap-5 lg:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-5"
            >
              <div className="flex justify-between">
                <div className="h-5 w-40 rounded bg-gray-200"></div>

                <div className="h-6 w-16 rounded-full bg-gray-200"></div>
              </div>

              <div className="mt-4 h-4 w-full rounded bg-gray-200"></div>
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>

              <div className="mt-6 flex justify-between">
                <div className="h-4 w-20 rounded bg-gray-200"></div>
                <div className="h-4 w-24 rounded bg-gray-200"></div>
              </div>

              <div className="mt-5 border-t pt-4 flex justify-between">
                <div className="h-3 w-24 rounded bg-gray-200"></div>
                <div className="h-3 w-20 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}