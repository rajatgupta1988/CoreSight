'use client'

import { useState } from 'react'
import AddDataSourceModal from './modals/AddDataSourceModal'
import FileUploader from './FileUploader'

type SidebarActionsProps = {
  onNewChat?: () => void
}

export default function SidebarActions({ onNewChat }: SidebarActionsProps) {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3 p-4">
      {onNewChat && (
        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 font-medium"
        >
          + New Chat
        </button>
      )}

      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md p-3 font-medium"
      >
        ➕ Add Data Source
      </button>

      <FileUploader />

      <AddDataSourceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
