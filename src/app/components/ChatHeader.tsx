//ChatHeader.tsx
export default function ChatHeader() {
    return (
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b p-4 flex items-center shadow-sm">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white mr-4">
          🤖
        </div>
        <div>
          <h1 className="font-semibold text-lg">AI Assistant</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">GPT-style chat interface</p>
        </div>
      </div>
    );
  }
  