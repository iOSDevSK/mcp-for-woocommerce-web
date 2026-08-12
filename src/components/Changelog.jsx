'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon } from './icons/CalendarIcon'
import { TagIcon } from './icons/TagIcon'
import { BugFixIcon } from './icons/BugFixIcon'
import { PlusIcon } from './icons/PlusIcon'
import { MinusIcon } from './icons/MinusIcon'
import { ArrowPathIcon } from './icons/ArrowPathIcon'
import { ChevronRightIcon } from './icons/ChevronRightIcon'
import { ChevronDownIcon } from './icons/ChevronDownIcon'

function ChangeTypeIcon({ type }) {
  const iconProps = "h-4 w-4"
  
  switch (type) {
    case 'FIXED':
    case 'RESOLVED':
      return <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
        <BugFixIcon className={`${iconProps} text-green-600 dark:text-green-400`} />
      </div>
    case 'ADDED':
    case 'RESTORED':
      return <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
        <PlusIcon className={`${iconProps} text-blue-600 dark:text-blue-400`} />
      </div>
    case 'CHANGED':
    case 'UPDATED':
    case 'IMPROVED':
    case 'OPTIMIZED':
      return <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
        <ArrowPathIcon className={`${iconProps} text-orange-600 dark:text-orange-400`} />
      </div>
    case 'TESTED':
      return <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
        <BugFixIcon className={`${iconProps} text-purple-600 dark:text-purple-400`} />
      </div>
    case 'REMOVED':
      return <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
        <TagIcon className={`${iconProps} text-red-600 dark:text-red-400`} />
      </div>
    default:
      return <div className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
        <TagIcon className={`${iconProps} text-gray-600 dark:text-gray-400`} />
      </div>
  }
}

function VersionBadge({ status }) {
  const normalizedStatus = status?.toUpperCase() || 'STABLE'
  
  const badgeStyles = {
    'STABLE': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'BETA': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'ALPHA': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'RC': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  }
  
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badgeStyles[normalizedStatus] || badgeStyles['STABLE']}`}>
      {normalizedStatus}
    </span>
  )
}

function parseChangelog(text) {
  if (!text) return []
  
  const versions = []
  // Split by version lines that start with "= Version"
  const versionBlocks = text.split(/(?=^= Version)/gm).filter(block => block.trim())
  
  versionBlocks.forEach(block => {
    const lines = block.split('\n').filter(line => line.trim())
    if (lines.length === 0) return
    
    const headerLine = lines[0].trim()
    
    // Parse version header: "= Version 1.1.5 - Release #000010 - August 13, 2025 @ CET ="
    const versionMatch = headerLine.match(/^=\s*Version\s*(.+?)\s*-\s*Release\s*#(\d+)\s*-\s*(.+?)\s*=\s*$/)
    
    if (versionMatch) {
      const [, version, releaseNumber, dateTime] = versionMatch
      
      const changes = []
      let currentTicket = null
      
      lines.slice(1).forEach(line => {
        const trimmedLine = line.trim()
        
        // Skip empty lines and markdown headers
        if (!trimmedLine || trimmedLine.startsWith('**') || trimmedLine.startsWith('===')) return
        
        // Check if line starts with ticket number (like "* #000015 - Fix critical PHP Fatal Error...")
        const ticketMatch = trimmedLine.match(/^\*\s*#(\d+)\s*-\s*(.+)$/)
        if (ticketMatch) {
          const [, ticketNumber, ticketDescription] = ticketMatch
          currentTicket = {
            ticketNumber,
            description: ticketDescription,
            entries: [],
            date: null
          }
          changes.push(currentTicket)
          return
        }
        
        // Check for date line (like "Date: August 2, 2025 @ 22:00 CET")
        const dateMatch = trimmedLine.match(/^Date:\s*(.+)$/)
        if (dateMatch && currentTicket) {
          currentTicket.date = dateMatch[1]
          return
        }
        
        // Check for change entries (like "- FIXED: Replaced undefined esc_like()...")
        if (currentTicket && trimmedLine.startsWith('-')) {
          const entry = trimmedLine.replace(/^-\s*/, '').trim()
          const typeMatch = entry.match(/^(FIXED|ADDED|CHANGED|UPDATED|IMPROVED|REMOVED|RESOLVED|TESTED|RESTORED|OPTIMIZED|ENHANCED):\s*(.+)$/)
          
          if (typeMatch) {
            const [, type, description] = typeMatch
            currentTicket.entries.push({ type, description })
          } else {
            // If no type prefix, assume it's a general change
            currentTicket.entries.push({ type: 'CHANGED', description: entry })
          }
        }
      })
      
      // Detect status from version string
      const versionStr = version.trim()
      let detectedStatus = 'STABLE'
      
      if (versionStr.toLowerCase().includes('beta')) {
        detectedStatus = 'BETA'
      } else if (versionStr.toLowerCase().includes('alpha')) {
        detectedStatus = 'ALPHA'
      } else if (versionStr.toLowerCase().includes('rc')) {
        detectedStatus = 'RC'
      }
      
      // Clean version string by removing status keywords
      const cleanVersion = versionStr.replace(/\s*-?\s*(beta|alpha|rc)\s*$/i, '').trim()
      
      versions.push({
        version: cleanVersion,
        status: detectedStatus,
        releaseNumber: releaseNumber,
        dateTime: dateTime.trim(),
        changes: changes.filter(change => change.entries.length > 0)
      })
    }
  })
  
  // Return only the latest 10 versions
  return versions.slice(0, 10)
}

export function Changelog() {
  const [changelog, setChangelog] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedVersions, setExpandedVersions] = useState(new Set())
  const [expandedTickets, setExpandedTickets] = useState(new Set())

  useEffect(() => {
    async function fetchChangelog() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/iOSDevSK/mcp-for-woocommerce/main/changelog.txt')
        if (!response.ok) {
          throw new Error('Failed to fetch changelog')
        }
        const text = await response.text()
        const parsedChangelog = parseChangelog(text)
        setChangelog(parsedChangelog)
        
        // Expand the first (most recent) version by default
        if (parsedChangelog.length > 0) {
          setExpandedVersions(new Set([0]))
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchChangelog()
  }, [])

  const toggleVersion = (index) => {
    const newExpanded = new Set(expandedVersions)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedVersions(newExpanded)
  }

  const toggleTicket = (versionIndex, ticketIndex) => {
    const ticketKey = `${versionIndex}-${ticketIndex}`
    const newExpanded = new Set(expandedTickets)
    if (newExpanded.has(ticketKey)) {
      newExpanded.delete(ticketKey)
    } else {
      newExpanded.add(ticketKey)
    }
    setExpandedTickets(newExpanded)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <ArrowPathIcon className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-gray-600 dark:text-gray-400">Loading changelog...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
              Error loading changelog
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {changelog.map((version, index) => {
        const isExpanded = expandedVersions.has(index)
        return (
          <div key={`${version.version}-${index}`} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Version Header */}
            <div className={`px-6 py-4 bg-gray-50 dark:bg-gray-900/50 ${isExpanded ? 'border-b border-gray-200 dark:border-gray-700' : ''} ${index === 0 ? 'rounded-t-lg' : ''} ${!isExpanded ? 'rounded-lg' : 'rounded-t-lg'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleVersion(index)}
                    className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-2 py-1 -ml-2 transition-colors cursor-pointer"
                  >
                    {isExpanded ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                    )}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      Version {version.version}
                    </h4>
                  </button>
                  <VersionBadge status={version.status} />
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <TagIcon className="h-4 w-4" />
                    <span>Release #{version.releaseNumber}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{version.dateTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Version Changes */}
            {isExpanded && (
              <div className="p-6">
            <div className="space-y-6">
              {version.changes.map((ticket, ticketIndex) => {
                const ticketKey = `${index}-${ticketIndex}`
                const isTicketExpanded = expandedTickets.has(ticketKey)
                
                return (
                  <div key={`${ticket.ticketNumber}-${ticketIndex}`} className="space-y-3">
                    {/* Ticket Header */}
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleTicket(index, ticketIndex)}
                        className="flex items-center space-x-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-2 py-1 -ml-2 transition-colors cursor-pointer w-full"
                      >
                        {isTicketExpanded ? (
                          <MinusIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <PlusIcon className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400">
                          #{ticket.ticketNumber}
                        </span>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-left">
                          {ticket.description}
                        </h4>
                      </button>
                      {ticket.date && isTicketExpanded && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 ml-6">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{ticket.date}</span>
                        </div>
                      )}
                    </div>

                    {/* Change Entries */}
                    {isTicketExpanded && (
                      <div className="ml-6 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                        <ul className="space-y-2 list-none">
                          {ticket.entries.map((entry, entryIndex) => (
                            <li key={entryIndex} className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5">
                                <ChangeTypeIcon type={entry.type} />
                              </div>
                              <div className="flex-1 min-w-0 ml-3">
                                <div className="flex items-start">
                                  <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mr-3 mb-1 w-20 text-left flex-shrink-0">
                                    {entry.type}
                                  </span>
                                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                                    {entry.description}
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Changelog automatically synced from{' '}
          <a 
            href="https://github.com/iOSDevSK/mcp-for-woocommerce/blob/main/changelog.txt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub Repository
          </a>
        </p>
      </div>
    </div>
  )
}