'use client'

import { useState } from 'react'

const initialTokens = [
  {
    id: 1,
    user: 'wpuser',
    issuedAt: 'Aug 10, 2026, 4:37:36 PM',
    expiresAt: 'Never expires',
    status: 'Active (Never expires)',
    statusType: 'active'
  },
  {
    id: 2,
    user: 'wpuser',
    issuedAt: 'Aug 10, 2025, 5:44:46 PM',
    expiresAt: 'Never expires',
    status: 'Active (Never expires)',
    statusType: 'active'
  },
  {
    id: 3,
    user: 'wpuser',
    issuedAt: 'Aug 13, 2025, 1:15:18 PM',
    expiresAt: 'Aug 13, 2025, 2:15:18 PM',
    status: 'Active',
    statusType: 'active'
  },
  {
    id: 4,
    user: 'wpuser',
    issuedAt: 'Aug 13, 2025, 1:16:11 PM',
    expiresAt: 'Aug 13, 2025, 7:16:11 PM',
    status: 'Revoked',
    statusType: 'revoked'
  }
]

export function TokenTable() {
  const [tokens, setTokens] = useState(initialTokens)

  const handleRevokeToken = (tokenId) => {
    setTokens(prevTokens => 
      prevTokens.map(token => 
        token.id === tokenId 
          ? { ...token, status: 'Revoked', statusType: 'revoked' }
          : token
      )
    )
  }

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Issued At</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expires At</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
              {tokens.map((token) => (
                <tr key={token.id}>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{token.user}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{token.issuedAt}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{token.expiresAt}</td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      token.statusType === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {token.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {token.statusType === 'active' && (
                      <button 
                        onClick={() => handleRevokeToken(token.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}