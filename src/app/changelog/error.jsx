'use client'

export default function ChangelogError({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
              Changelog Error
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-400">
              <p>Unable to load changelog. Please try refreshing the page.</p>
            </div>
            <div className="mt-4">
              <button
                onClick={reset}
                className="text-sm bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-800 dark:text-red-300 font-medium py-2 px-3 rounded-md transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}