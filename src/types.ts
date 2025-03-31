// src/types.ts

export type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    stage?: string;
    parentId?: string;
  };
  
  export type ChatMessagesProps = {
    messages: Message[];
  };
  
  export type ChatAreaProps = {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  };
  