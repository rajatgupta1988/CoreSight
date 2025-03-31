'use client'

import { useRef, useState } from 'react'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import apiConfig from '../../constants/apiConfig'
import useAutoScroll from '../../hooks/useAutoScroll'

type Message = {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  stage?: string
  parentId?: string
}

type ChatAreaProps = {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function ChatArea({ messages, setMessages }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [abortSignal, setAbortSignal] = useState<AbortController | null>(null)
  const [lastPrompt, setLastPrompt] = useState<string | null>(null)

  const { autoScroll, setAutoScroll } = useAutoScroll(messagesEndRef, messages.length)

  const handleSendMessage = async (prompt: string) => {
    if (isProcessing || !prompt.trim()) return
  
    const userId = Date.now().toString()
    setLastPrompt(prompt)
    const userMessage: Message = {
      id: userId,
      content: prompt,
      role: 'user',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)
  
    const controller = new AbortController()
    setAbortSignal(controller)
  
    try {
      const res = await fetch(apiConfig.chat_api, {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      })
  
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
  
      while (true) {
        const { value, done } = await reader!.read()
        if (done) break
  
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
  
        while (lines.length > 1) {
          const line = lines.shift()
          if (line?.trim()) {
            const { stage, text } = JSON.parse(line)
            setMessages(prev => {
              const existing = prev.find(m => m.parentId === userId && m.stage === stage)
              if (existing) {
                return prev.map(m =>
                  m.id === existing.id
                    ? { ...m, content: m.content + text }
                    : m
                )
              } else {
                return [
                  ...prev,
                  {
                    id: `${userId}-${stage}`,
                    content: text,
                    role: 'assistant',
                    stage,
                    parentId: userId,
                    timestamp: new Date(),
                  },
                ]
              }
            })
          }
        }
  
        buffer = lines[0] || ''
      }
    } catch (err) {
      const error = err as Error
  
      if (error.name === 'AbortError' || /aborted/i.test(error.message)) {
        console.info('🛑 Request was intentionally aborted')
      } else {
        console.error('Streaming error:', error)
      }
    } finally {
      setIsProcessing(false)
      setAbortSignal(null)
    }
  }
  
  

  const handleCancel = () => {
    try {
      if (abortSignal) abortSignal.abort()
    } catch (err) {
      console.warn('⚠️ Abort already handled:', err)
    }
  }

  const handleRetry = () => {
    if (lastPrompt && !isProcessing) handleSendMessage(lastPrompt)
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <ChatMessages messages={messages} isProcessing={isProcessing} />
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full sticky bottom-0 bg-white dark:bg-gray-900 px-4 py-3 border-t">
        <ChatInput
          onSendMessage={handleSendMessage}
          isProcessing={isProcessing}
          onCancel={handleCancel}
          retryAllowed={!!lastPrompt && !isProcessing}
          onRetry={handleRetry}
          autoScroll={autoScroll}
          setAutoScroll={setAutoScroll}
        />
      </div>
    </div>
  )
}
