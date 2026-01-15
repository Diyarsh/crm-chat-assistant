import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-message-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-chat-bubble-user text-chat-bubble-user-foreground rounded-br-md"
            : "bg-chat-bubble-ai text-chat-bubble-ai-foreground rounded-bl-md"
        )}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        {timestamp && (
          <span className={cn(
            "text-xs mt-1 block opacity-70",
            isUser ? "text-right" : "text-left"
          )}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};
