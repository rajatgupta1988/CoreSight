'use client'

import React from 'react'

type SidebarItemProps = {
  title: string
  isActive?: boolean
  onClick?: () => void
}

export default function SidebarItem({ title, isActive = false, onClick }: SidebarItemProps) {
  return (
    <div
      className={`cursor-pointer px-4 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  )
}
