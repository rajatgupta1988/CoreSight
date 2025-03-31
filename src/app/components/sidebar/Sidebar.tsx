'use client';
import SidebarActions from './SidebarActions';
import SidebarConversations from './SidebarConversations';
import SidebarFooter from './SidebarFooter';

export default function Sidebar({ onNewChat }: { onNewChat: () => void }) {
  return (
    <div className="flex flex-col h-full w-full bg-gray-900 text-white">
      {/* Top spacer */}
      <div className="h-[10%] flex-none" />

      {/* Action buttons */}
      <div className="px-4 pb-2">
        <SidebarActions onNewChat={onNewChat} />
      </div>
      

      {/* Conversation history */}
      <div className="h-[30%] overflow-y-auto px-2">
        <SidebarConversations onNewChat={onNewChat} />
      </div>

      {/* Flexible filler to push footer down */}
      <div className="flex-grow" />

      {/* Footer (fixed height) */}
      <div className="h-[8%]">
        <SidebarFooter />
      </div>
    </div>
  );
}
