'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ResourcesComponent() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  const resourceData = {
    uri: "woocommerce://search-guide",
    mimeType: "application/json",
    text: JSON.stringify({
      title: "WooCommerce Universal Search Guide",
      version: "2.0",
      description: "Universal step-by-step guide for AI assistants to perform optimal product searches with automatic fallback strategies for ANY store type: electronics, food, pets, pharmacy, automotive, clothing, books, tools, beauty, sports, etc. Handles multiple products with same name.",
      workflow: {
        overview: "Always follow this 4-step process for ANY product search query with intelligent fallbacks",
        universal_principle: "This guide works for ALL store types: electronics, food, pets, pharmacy, automotive, clothing, books, tools, beauty, sports, home & garden, toys, etc.",
        critical_workflow_rule: "ALWAYS search for products by name using wc_products_search FIRST to get correct product IDs. NEVER use hardcoded IDs.",
        multiple_products_handling: "If multiple products have same name (e.g., Men vs Women versions), present all options to user with their differences.",
        steps: [
          {
            step: 1,
            action: "Read this guide",
            description: "Understand the available tools and workflow",
            tool: "resources/read",
            uri: "woocommerce://search-guide"
          },
          {
            step: 2,
            action: "Discover available categories and tags",
            description: "Get the current store categories and tags to understand what products are available",
            tools: {
              wc_get_categories: "Get all product categories with IDs, names, and counts",
              wc_get_tags: "Get all product tags with IDs, names, and counts"
            },
            parameters: {
              per_page: 100,
              hide_empty: false
            }
          },
          {
            step: 3,
            action: "Analyze search intent",
            description: "Use the universal intent analyzer to get optimal search parameters",
            tool: "wc_analyze_search_intent",
            required_parameters: {
              user_query: "The original user search query"
            },
            recommended_parameters: {
              available_categories: "Array from wc_get_categories",
              available_tags: "Array from wc_get_tags"
            }
          },
          {
            step: 4,
            action: "Execute intelligent search with automatic fallbacks",
            description: "Multi-stage search strategy that automatically falls back when no results found",
            primary_tool: "wc_products_search",
            mandatory_rule: "NEVER return empty results - always try fallback strategies"
          }
        ]
      },
      best_practices: {
        always_search_first: "CRITICAL: Always use wc_products_search FIRST to find products by name before using any other tools",
        never_hardcode_ids: "NEVER use hardcoded product IDs - always get IDs from search results",
        handle_multiple_products: "If search returns multiple products with same name, present all options to user",
        get_variations_correctly: "To get product colors/sizes: 1) Search for product, 2) Use wc_get_product_variations with the found product_id",
        always_get_categories_first: "Categories change dynamically, never assume what categories exist",
        use_intent_analyzer: "Always analyze user intent before searching - it provides optimized parameters",
        combine_multiple_intents: "Users often combine price + category + promotional intent in one query",
        intelligent_fallback_strategy: "Always implement 5-stage fallback: full search → category only → broader categories → general search → show alternatives",
        never_return_empty: "If all searches fail, always suggest related categories or explain what products are available",
        universal_approach: "This strategy works for ANY store type: electronics, food, pets, pharmacy, automotive, clothing, books, tools, beauty, sports, etc."
      }
    })
  }

  const openPopup = () => {
    if (isMounted) {
      setIsPopupOpen(true)
    }
  }
  
  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <div>
      <div className="mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 dark:bg-amber-900/20 dark:border-amber-800">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Read-Only Resources
              </h4>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                Resources are currently read-only and cannot be modified through the interface. They provide structured data for AI analysis and context.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">URI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    woocommerce-search-guide
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    woocommerce://search-guide
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    Universal guide for AI assistants on how to perform intelligent WooCommerce product searches using the available tools
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={openPopup}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isMounted && isPopupOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl max-h-[85vh] w-full overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Resource Details
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    woocommerce-search-guide
                  </p>
                </div>
              </div>
              <button
                onClick={closePopup}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Full Resource Data
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Complete JSON structure for the WooCommerce Search Guide resource
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">JSON Data</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Read-only</span>
                </div>
                <div className="p-4 overflow-auto max-h-[55vh]">
                  <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed font-mono">
                    {JSON.stringify(resourceData, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resource Overview</h2>

        <div className="prose dark:prose-invert max-w-none">
          <p>Resources provide structured, read-only access to contextual information for AI analysis. Unlike tools (which perform actions), resources are read-only and designed for providing guidance and context.</p>

          <h3>What are Resources?</h3>
          <p>Resources are structured data that provide AI assistants with contextual information and best practices for using your WooCommerce store effectively. They serve as knowledge bases that help AI understand optimal workflows and strategies.</p>

          <h3>Available Resources</h3>
          <ul>
            <li><strong>WooCommerce Search Guide</strong>: Universal step-by-step guide for AI assistants to perform optimal product searches with automatic fallback strategies</li>
          </ul>

          <h3>Resource Usage</h3>
          <p>AI assistants automatically access resources for guidance when:</p>
          <ul>
            <li>Performing product searches</li>
            <li>Analyzing store data</li>
            <li>Following best practices for tool usage</li>
            <li>Implementing fallback strategies</li>
          </ul>

          <p>Resources are static guides that provide consistent methodology for AI operations.</p>
        </div>
      </div>
    </div>
  )
}