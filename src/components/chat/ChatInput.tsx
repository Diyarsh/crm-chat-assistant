import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput = ({ 
  onSend, 
  placeholder = "Введите сообщение...",
  disabled 
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-card/50 backdrop-blur-sm border-t border-border/50">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex-1 bg-background/80 rounded-full px-4 py-3 text-sm",
          "border border-border focus:border-accent focus:ring-2 focus:ring-accent/20",
          "outline-none transition-all duration-200",
          "placeholder:text-muted-foreground"
        )}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className={cn(
          "p-3 rounded-full transition-all duration-200",
          "bg-chat-send-button text-white",
          "hover:opacity-90 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        )}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};
