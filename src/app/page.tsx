'use client';

import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import ChatHeader from './components/ChatHeader';
import ChatArea from './components/ChatArea';

export default function Home() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }>>([]);

  const resetMessages = () => setMessages([]);

  return (
    <main className="flex h-screen overflow-hidden bg-white dark:bg-black">
      {/* Sidebar stays pinned and tall */}
      <div className="w-64 bg-gray-900 text-white h-full">
        <Sidebar onNewChat={resetMessages} />
      </div>

      {/* Right area with header and chat */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatHeader />
        <ChatArea messages={messages} setMessages={setMessages} />
      </div>
    </main>
  );
}
