import { cn } from "@/lib/utils";
import { MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHistoryItemProps {
  title: string;
  preview: string;
  date: string;
  isActive?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onRename?: () => void;
}

export const ChatHistoryItem = ({
  title,
  preview,
  date,
  isActive,
  onClick,
  onDelete,
  onRename,
}: ChatHistoryItemProps) => {
  return (
    <div
      className={cn(
        "w-full text-left p-3 rounded-lg transition-all duration-200 cursor-pointer",
        "hover:bg-chat-history-hover group relative",
        isActive && "bg-chat-history-active border-l-2 border-chat-send-button"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-medium text-sm truncate",
            isActive ? "text-foreground" : "text-foreground/80"
          )}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {preview}
          </p>
          <span className="text-[10px] text-muted-foreground/60 mt-1.5 block">
            {date}
          </span>
        </div>
        
        {/* Actions dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
                "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onRename?.(); }}>
              <Edit2 className="w-3.5 h-3.5 mr-2" />
              Переименовать
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5 mr-2" />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
