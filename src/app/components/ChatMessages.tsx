'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Message = {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  stage?: string
  parentId?: string
}

type ChatMessagesProps = {
  messages: Message[]
  isProcessing: boolean
}

export default function ChatMessages({ messages, isProcessing }: ChatMessagesProps) {
  const groupedMessages: Record<string, Message[]> = {}

  messages.forEach(msg => {
    const key = msg.role === 'user' ? msg.id : msg.parentId!
    if (!groupedMessages[key]) groupedMessages[key] = []
    groupedMessages[key].push(msg)
  })

  return (
    <div className="flex flex-col space-y-6">
      {Object.values(groupedMessages).map((group, index) => {
        const userMsg = group.find(m => m.role === 'user')
        const assistantMsgs = group
          .filter(m => m.role === 'assistant')
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

        return (
          <div key={index} className="space-y-4">
            {/* User Message */}
            {userMsg && (
              <div className="flex justify-end px-4">
                <div className="bg-blue-600 text-white rounded-xl px-4 py-3 text-sm shadow-md max-w-[80%]">
                  <div className="mb-1 font-semibold text-xs text-blue-200">You</div>
                  <div>{userMsg.content}</div>
                  <div className="text-[10px] mt-2 text-right text-blue-200">
                    {userMsg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Assistant Messages */}
            {assistantMsgs.length > 0 && (
              <div className="flex justify-start px-4">
                <div className="flex items-start space-x-3 max-w-3xl w-full">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">
                    🤖
                  </div>
                  <div className="bg-gray-900 text-white rounded-xl px-4 py-3 text-sm shadow-md max-w-[80%]">
                    {assistantMsgs.map(msg => (
                      <div key={msg.id} className="mb-4">
                        <div className="text-xs text-purple-400 font-semibold mb-1">
                          {msg.stage?.toUpperCase()}
                        </div>

                        {isJson(msg.content) ? (
                          <JsonViewer json={msg.content} />
                        ) : (
                          <div className="prose prose-invert text-sm">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ inline, className, children, ...props }: any) {
                                  const codeText = String(children).trim()
                                  const language = className?.replace('language-', '') || 'text'

                                  return !inline ? (
                                    <SyntaxHighlighter language={language} PreTag="div">
                                      {codeText}
                                    </SyntaxHighlighter>
                                  ) : (
                                    <code className="bg-gray-700 px-1 rounded text-sm">
                                      {codeText}
                                    </code>
                                  )
                                },
                              }}
                            >
                              {msg.content || (isProcessing ? '⠋' : '')}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="text-[10px] mt-2 text-right text-gray-400">
                      {assistantMsgs.at(-1)?.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Helper: Detect if content is JSON
function isJson(content: string) {
  try {
    JSON.parse(content)
    return true
  } catch {
    return false
  }
}

// Expandable JSON Viewer
function JsonViewer({ json }: { json: string }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-black text-green-400 text-xs rounded p-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="mb-1 text-blue-300 underline text-xs"
      >
        {expanded ? 'Hide JSON ⬆' : 'Show JSON ⬇'}
      </button>
      {expanded && (
        <pre className="whitespace-pre-wrap break-all">
          {JSON.stringify(JSON.parse(json), null, 2)}
        </pre>
      )}
    </div>
  )
}
