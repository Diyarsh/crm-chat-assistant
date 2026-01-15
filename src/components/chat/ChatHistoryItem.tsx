import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface ChatHistoryItemProps {
  title: string;
  preview: string;
  date: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const ChatHistoryItem = ({
  title,
  preview,
  date,
  isActive,
  onClick,
}: ChatHistoryItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-lg transition-all duration-200",
        "hover:bg-chat-history-hover group",
        isActive && "bg-chat-history-active"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-lg transition-colors",
          isActive ? "bg-accent/20" : "bg-muted group-hover:bg-accent/10"
        )}>
          <MessageSquare className="w-4 h-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground truncate">
            {title}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {preview}
          </p>
          <span className="text-xs text-muted-foreground/70 mt-1 block">
            {date}
          </span>
        </div>
      </div>
    </button>
  );
};
