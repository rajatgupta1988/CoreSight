

export type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    stage?: string;
    parentId?: string;
    isError?: boolean;
  };
  