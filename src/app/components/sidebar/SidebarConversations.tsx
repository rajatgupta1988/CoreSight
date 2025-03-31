'use client';
import { useEffect, useState } from 'react';
import apiConfig from '../../../constants/apiConfig';

type Conversation = {
  id: string;
  title: string;
  active?: boolean;
};

type Props = {
  onNewChat: () => void;
};

export default function SidebarConversations({ onNewChat }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!apiConfig.history_api) return;

    fetch(apiConfig.history_api)
      .then((res) => res.json())
      .then((data) => setConversations(data))
      .catch((err) => {
        console.error('Failed to fetch history:', err);
        setConversations([]);
      });
  }, []);

  const setActive = (id: string) => {
    setConversations(prev =>
      prev.map(c => ({ ...c, active: c.id === id }))
    );
    onNewChat(); // Optional: to reset chat area
  };

  return (
    <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
      <h3 className="text-xs text-gray-400 px-2 mb-1 uppercase tracking-wide">
        Conversations
      </h3>
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => setActive(conv.id)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
            conv.active ? 'bg-blue-700 font-semibold' : 'hover:bg-gray-800'
          }`}
        >
          {conv.title}
        </button>
      ))}
    </div>
  );
}
