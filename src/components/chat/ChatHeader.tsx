import { X, Maximize2, Minimize2 } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
  onToggleExpand: () => void;
  isExpanded: boolean;
}

export const ChatHeader = ({
  onClose,
  onToggleExpand,
  isExpanded,
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-chat-header text-chat-header-foreground rounded-t-xl">
      <h2 className="font-semibold text-lg tracking-wide">AI-HUB</h2>
      
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleExpand}
          className="p-1.5 hover:bg-white/10 rounded transition-colors"
          title={isExpanded ? "Свернуть" : "Развернуть"}
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
        
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded transition-colors"
          title="Закрыть"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
