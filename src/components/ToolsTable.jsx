'use client'

import { useState } from 'react'
import { ToolToggleSwitch } from './ToolToggleSwitch'

const toolsData = [
  // WooCommerce Tools (29 tools)
  {
    name: 'wc_products_search',
    description: 'PRIMARY PRODUCT SEARCH TOOL: Universal product search for ANY store type (electronics, food, pets, pharmacy, automotive, etc.). CRITICAL: This is the main search tool - use this FIRST for all product searches. When searching for specific products by name, ALWAYS use this tool FIRST to get the correct product ID, then use other tools with that ID. DO NOT use hardcoded product IDs. IMPORTANT: Each product includes a "permalink" field with the direct link to the product page - ALWAYS include these links when presenting products to users.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_product',
    description: 'SECONDARY TOOL: Get a WooCommerce product by ID after using wc_products_search. Use this tool when you have a specific product ID from search results to get detailed product information. IMPORTANT: The product includes a "permalink" field with the direct link to the product page - ALWAYS include this link when presenting the product to users.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_product_variations',
    description: 'Get all variations (colors, sizes, etc.) for a variable WooCommerce product. CRITICAL: You MUST get the product_id from wc_products_search first. DO NOT use hardcoded product IDs like 42. Each variation includes specific attributes like color, size, price, and stock status. IMPORTANT: Each variation includes a "permalink" field with the direct link to the variation page - ALWAYS include these links when presenting variations to users.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_product_variation',
    description: 'Get a specific product variation by ID. IMPORTANT: The variation includes a "permalink" field with the direct link to the variation page - ALWAYS include this link when presenting the variation to users.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_categories',
    description: 'Get all available WooCommerce product categories dynamically',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_tags',
    description: 'Get all available WooCommerce product tags dynamically',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_analyze_search_intent',
    description: 'Analyze user search query and suggest optimal WooCommerce search parameters',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_intelligent_search',
    description: 'FALLBACK SEARCH TOOL: Advanced intelligent product search with automatic fallback strategies. Use this tool ONLY when wc_products_search and wc_get_product do not provide satisfactory results. This tool handles complex queries and multiple fallback strategies but should be used as a last resort. WORKFLOW: 1) Try wc_products_search first, 2) Use wc_get_product for details, 3) Only use this tool if needed. CRITICAL: Each product includes a "permalink" field with the direct link to the product page - ALWAYS include these links when presenting products to users.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_analyze_search_intent_helper',
    description: 'Analyze user search query and return optimized search parameters with category matching',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_products_by_brand',
    description: 'Get products by brand name. Automatically detects if brand is implemented as attribute, category, or custom taxonomy.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_products_by_category',
    description: 'Get products by category name or slug.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_products_by_attributes',
    description: 'Get products by custom attributes (color, size, etc.)',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_products_filtered',
    description: 'Get products with multiple filters: brand, category, price range, and attributes.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_product_detailed',
    description: 'Get single product by ID with complete details.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_product_reviews',
    description: 'Get all WooCommerce product reviews with filtering and pagination',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_product_review',
    description: 'Get a specific WooCommerce product review by ID',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_product_attributes',
    description: 'Get all GLOBAL product attribute definitions (like Color, Size, Material) available in the store. WARNING: This shows attribute types, NOT specific product colors/sizes. To get available colors/sizes for a specific product, use: 1) wc_products_search to find the product, 2) wc_get_product_variations with that product ID.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_product_attribute',
    description: 'Get a specific WooCommerce product attribute by ID',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_attribute_terms',
    description: 'Get all terms for a specific product attribute (e.g., Red, Blue for Color attribute)',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_shipping_zones',
    description: 'Get all WooCommerce shipping zones and their coverage areas',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_shipping_zone',
    description: 'Get details about a specific WooCommerce shipping zone',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_shipping_methods',
    description: 'Get all shipping methods available for a specific shipping zone',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_shipping_locations',
    description: 'Get all locations (countries/states) covered by a specific shipping zone',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_tax_classes',
    description: 'Get all WooCommerce tax classes (Standard, Reduced Rate, Zero Rate, etc.)',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_tax_rates',
    description: 'Get all WooCommerce tax rates with filtering by class, country, state, etc.',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_payment_gateways',
    description: 'Get all available WooCommerce payment gateways (PayPal, Stripe, Bank Transfer, etc.)',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_payment_gateway',
    description: 'Get details about a specific WooCommerce payment gateway by ID',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_system_status',
    description: 'Get WooCommerce system status information (versions, settings, environment)',
    type: 'read',
    enabled: true
  },
  {
    name: 'wc_get_system_tools',
    description: 'Get available WooCommerce system tools and utilities',
    type: 'read',
    enabled: true
  },
  // WordPress Tools (4 tools)
  {
    name: 'wordpress_posts_list',
    description: 'List WordPress posts with filtering and search options',
    type: 'read',
    enabled: true
  },
  {
    name: 'wordpress_posts_get',
    description: 'Get a single WordPress post by ID',
    type: 'read',
    enabled: true
  },
  {
    name: 'wordpress_pages_list',
    description: 'List WordPress pages with filtering and search options',
    type: 'read',
    enabled: true
  },
  {
    name: 'wordpress_pages_get',
    description: 'Get a single WordPress page by ID',
    type: 'read',
    enabled: true
  }
]

export function ToolsTable() {
  const [tools, setTools] = useState(toolsData)

  const handleToolToggle = (enabled, toolName) => {
    setTools(prevTools => 
      prevTools.map(tool => 
        tool.name === toolName 
          ? { ...tool, enabled }
          : tool
      )
    )
    console.log(`${toolName}: ${enabled ? 'enabled' : 'disabled'}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="mb-4 px-6 py-3 bg-gray-50 dark:bg-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Registered Tools</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          List of all {tools.length} registered tools in the system. Use the toggles to enable or disable individual tools.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Functionality Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
            {tools.map((tool, index) => (
              <tr key={tool.name} className={index % 2 === 0 ? undefined : 'bg-gray-50 dark:bg-gray-900/50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {tool.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {tool.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {tool.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ToolToggleSwitch
                    enabled={tool.enabled}
                    toolName={tool.name}
                    onChange={handleToolToggle}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}