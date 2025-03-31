// src/app/components/ChatInput.tsx
'use client'

import { useState } from 'react'

export default function ChatInput({
  onSendMessage,
  isProcessing,
  onCancel,
  retryAllowed,
  onRetry,
  autoScroll,
  setAutoScroll,
}: {
  onSendMessage: (message: string) => void
  isProcessing: boolean
  onCancel: () => void
  retryAllowed: boolean
  onRetry: () => void
  autoScroll: boolean
  setAutoScroll: (val: boolean) => void
}) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (!input.trim()) return
    onSendMessage(input.trim())
    setInput('')
  }

  return (
    <div className="flex items-center space-x-3 w-full">
      {/* 🔒 Auto-Scroll Toggle */}
      <button
        onClick={() => setAutoScroll(!autoScroll)}
        className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded hover:opacity-80"
      >
        {autoScroll ? '🔓 Scroll Lock' : '🔒 Scroll Locked'}
      </button>

      {/* 🔁 Retry Last Message (only after completion or cancel) */}
      {!isProcessing && retryAllowed && (
        <button
          onClick={onRetry}
          className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
        >
          🔁 Retry Last
        </button>
      )}

      {/* ⛔ Cancel if Streaming */}
      {isProcessing && (
        <button
          onClick={onCancel}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          ⛔ Cancel
        </button>
      )}

      {/* 📝 Text Input */}
      <input
        type="text"
        className="flex-1 px-4 py-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        placeholder="Ask your question..."
        value={input}
        disabled={isProcessing}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') handleSubmit()
        }}
      />

      {/* 🚀 Send */}
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {isProcessing ? '...' : 'Send'}
      </button>
    </div>
  )
}
