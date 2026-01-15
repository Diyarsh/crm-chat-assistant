import { cn } from "@/lib/utils";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
}

export const ChatMessage = ({ content, isUser }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex w-full animate-message-in group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex flex-col gap-1.5 max-w-[85%]">
        <div
          className={cn(
            "rounded-2xl px-4 py-3 transition-shadow duration-200",
            isUser
              ? "bg-chat-bubble-user text-chat-bubble-user-foreground rounded-br-sm shadow-md"
              : "bg-chat-bubble-ai text-chat-bubble-ai-foreground rounded-bl-sm shadow-sm border border-border/30"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        
        {/* Action buttons for AI messages */}
        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1">
            <button
              onClick={handleCopy}
              className={cn(
                "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
                copied && "text-green-600"
              )}
              title={copied ? "Скопировано!" : "Копировать"}
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                feedback === 'up' 
                  ? "text-green-600 bg-green-50" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              title="Полезный ответ"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                feedback === 'down' 
                  ? "text-red-500 bg-red-50" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              title="Неполезный ответ"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
