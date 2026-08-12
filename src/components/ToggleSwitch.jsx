'use client'

import { useState } from 'react'
import clsx from 'clsx'

export function ToggleSwitch({ 
  enabled = false, 
  onChange, 
  label,
  description,
  disabled = false 
}) {
  const [isEnabled, setIsEnabled] = useState(enabled)

  const handleToggle = () => {
    if (disabled) return
    const newState = !isEnabled
    setIsEnabled(newState)
    if (onChange) {
      onChange(newState)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        {label && (
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {label}
          </h3>
        )}
        {description && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={clsx(
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
            isEnabled 
              ? 'bg-blue-600 focus:ring-blue-600' 
              : 'bg-gray-200 dark:bg-gray-700 focus:ring-gray-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          role="switch"
          aria-checked={isEnabled}
          aria-label={label}
        >
          <span
            className={clsx(
              'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              isEnabled ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </button>
      </div>
    </div>
  )
}