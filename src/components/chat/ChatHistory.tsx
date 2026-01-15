import { useState } from "react";
import { Plus, Search, X } from "lucide-react";
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
  onDeleteSession?: (id: string) => void;
  onRenameSession?: (id: string) => void;
}

export const ChatHistory = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onRenameSession,
}: ChatHistoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group sessions by date
  const groupedSessions = filteredSessions.reduce((groups, session) => {
    const group = session.date;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(session);
    return groups;
  }, {} as Record<string, ChatSession[]>);

  return (
    <div className="flex flex-col h-full bg-chat-history-bg border-r border-border/30 w-full">
      {/* Header */}
      <div className="p-3 border-b border-border/30">
        <button
          onClick={onNewChat}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg",
            "bg-chat-send-button text-white font-medium text-sm",
            "hover:opacity-90 transition-all active:scale-[0.98]",
            "shadow-sm"
          )}
        >
          <Plus className="w-4 h-4" />
          Новый чат
        </button>
      </div>
      
      {/* Search */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск в истории..."
            className={cn(
              "w-full pl-9 pr-8 py-2 rounded-lg text-sm",
              "bg-muted/30 border border-border/40",
              "focus:border-chat-send-button/50 focus:ring-1 focus:ring-chat-send-button/20",
              "outline-none transition-all placeholder:text-muted-foreground/50"
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {Object.entries(groupedSessions).map(([date, dateSessions]) => (
          <div key={date} className="mb-2">
            <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider px-3 py-2">
              {date}
            </p>
            <div className="space-y-0.5">
              {dateSessions.map((session) => (
                <ChatHistoryItem
                  key={session.id}
                  title={session.title}
                  preview={session.preview}
                  date=""
                  isActive={session.id === activeSessionId}
                  onClick={() => onSelectSession(session.id)}
                  onDelete={() => onDeleteSession?.(session.id)}
                  onRename={() => onRenameSession?.(session.id)}
                />
              ))}
            </div>
          </div>
        ))}
        
        {filteredSessions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground/60">
              {searchQuery ? "Ничего не найдено" : "История пуста"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
