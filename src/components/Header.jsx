import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { forwardRef } from 'react'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
  useMobileNavigationStore,
} from '@/components/MobileNavigation'
import { MobileSearch, Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { CloseButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm/5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef(function Header({ className, ...props }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], ['50%', '90%'])
  let bgOpacityDark = useTransform(scrollY, [0, 72], ['20%', '80%'])

  return (
    <motion.div
      {...props}
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
        !isInsideMobileNavigation &&
          'backdrop-blur-xs lg:left-72 xl:left-80 dark:backdrop-blur-sm',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/(--bg-opacity-light) dark:bg-zinc-900/(--bg-opacity-dark)',
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5',
        )}
      />
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <CloseButton as={Link} href="/" aria-label="Home">
          <Logo />
        </CloseButton>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <TopLevelNavItem href="/">Home</TopLevelNavItem>
            <Menu as="div" className="relative">
              <MenuButton className="text-sm/5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center gap-1">
                Links
                <ChevronDownIcon className="w-4 h-4" />
              </MenuButton>
              <MenuItems
                modal={false}
                className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-lg bg-white/95 backdrop-blur-sm py-2 shadow-xl border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900/95 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="https://github.com/iOSDevSK/mcp-for-woocommerce"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                          : 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      Github
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="https://github.com/iOSDevSK/mcp-for-woocommerce/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                          : 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      Downloads
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="https://github.com/iOSDevSK/mcp-for-woocommerce/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                          : 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      Support
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4">
          <MobileSearch />
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  )
})
