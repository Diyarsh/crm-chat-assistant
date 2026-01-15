import { Plus, Search } from "lucide-react";
import { ChatHistoryItem } from "./ChatHistoryItem";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  date: string;
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
}

export const ChatHistory = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
}: ChatHistoryProps) => {
  return (
    <div className="flex flex-col h-full bg-chat-history-bg border-r border-border/50">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <button
          onClick={onNewChat}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg",
            "bg-accent text-accent-foreground font-medium text-sm",
            "hover:opacity-90 transition-all active:scale-[0.98]"
          )}
        >
          <Plus className="w-4 h-4" />
          Новый чат
        </button>
      </div>
      
      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск..."
            className={cn(
              "w-full pl-9 pr-4 py-2 rounded-lg text-sm",
              "bg-background border border-border",
              "focus:border-accent focus:ring-1 focus:ring-accent/20",
              "outline-none transition-all placeholder:text-muted-foreground"
            )}
          />
        </div>
      </div>
      
      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="space-y-1">
          {sessions.map((session) => (
            <ChatHistoryItem
              key={session.id}
              title={session.title}
              preview={session.preview}
              date={session.date}
              isActive={session.id === activeSessionId}
              onClick={() => onSelectSession(session.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
