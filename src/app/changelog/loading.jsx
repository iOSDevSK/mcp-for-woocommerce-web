export default function ChangelogLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="animate-pulse space-y-8">
        {/* Page header skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-64"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-96"></div>
        </div>

        {/* Version entries skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}