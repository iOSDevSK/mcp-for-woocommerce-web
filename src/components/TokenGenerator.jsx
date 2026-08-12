'use client'

import { useState } from 'react'

function generateSampleToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = 'eyJ0eXAi'
  for (let i = 0; i < 245; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export function TokenGenerator() {
  const [generatedToken, setGeneratedToken] = useState('')
  const [tokenDuration, setTokenDuration] = useState('1 hour')
  const [tokenExpirationInfo, setTokenExpirationInfo] = useState(null)

  const handleGenerateToken = () => {
    const token = generateSampleToken()
    const expirationInfo = getExpirationInfo(tokenDuration)
    setGeneratedToken(token)
    setTokenExpirationInfo(expirationInfo)
  }

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken)
  }

  const getExpirationInfo = (duration) => {
    const now = new Date()
    let expirationDate
    
    switch(duration) {
      case '1 hour':
        expirationDate = new Date(now.getTime() + 60 * 60 * 1000)
        break
      case '24 hours':
        expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000)
        break
      case '7 days':
        expirationDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        break
      case 'never':
        return {
          duration: 'never',
          dateString: 'Never expires'
        }
      default:
        expirationDate = new Date(now.getTime() + 60 * 60 * 1000)
    }
    
    return {
      duration: duration,
      dateString: expirationDate.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      })
    }
  }

  return (
    <>
      <div className="my-6">
        <label htmlFor="token-duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Choose how long the token will remain valid
        </label>
        <select 
          id="token-duration" 
          value={tokenDuration}
          onChange={(e) => setTokenDuration(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="1 hour">1 hour</option>
          <option value="24 hours">24 hours</option>
          <option value="7 days">7 days</option>
          <option value="never">Never expires</option>
        </select>
      </div>

      <div className="my-6">
        <button 
          onClick={handleGenerateToken}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
        >
          Generate Token
        </button>
      </div>

      {generatedToken && (
        <div className="my-6 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Generated Token</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">This is a sample token for demonstration purposes.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-3 rounded border font-mono text-sm break-all text-gray-800 dark:text-gray-200 mb-4">
            {generatedToken}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={handleCopyToken}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
            >
              Copy
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400 italic">
              Expires in {tokenExpirationInfo.duration} ({tokenExpirationInfo.dateString})
            </span>
          </div>
        </div>
      )}
    </>
  )
}