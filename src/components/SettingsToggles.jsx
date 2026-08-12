'use client'

import { ToggleSwitch } from './ToggleSwitch'

export function SettingsToggles() {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 my-6">
        <ToggleSwitch
          enabled={true}
          label="Enable MCP functionality"
          description="Toggle to enable or disable the MCP plugin functionality."
          onChange={(enabled) => console.log('MCP functionality:', enabled)}
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Note for Webtalkbot users:
            </h4>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
              JWT Authentication is recommended if you want to create a WooCommerce AI Agent in <a href="https://webtalkbot.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">Webtalkbot</a>.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 my-6">
        <ToggleSwitch
          enabled={true}
          label="Require JWT Authentication"
          description="When enabled, all MCP requests must include a valid JWT token. When disabled, MCP endpoints are accessible without authentication (readonly mode only)."
          onChange={(enabled) => console.log('JWT Authentication:', enabled)}
        />
      </div>
    </>
  )
}