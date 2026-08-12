export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    </div>
  )
}