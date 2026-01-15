import { useState, KeyboardEvent } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 bg-background border-t border-border/40">
      <div className={cn(
        "flex items-end gap-2 p-2 rounded-xl",
        "bg-muted/30 border border-border/50",
        "focus-within:border-chat-send-button/50 focus-within:ring-2 focus-within:ring-chat-send-button/10",
        "transition-all duration-200"
      )}>
        {/* Attachment button */}
        <button
          type="button"
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          title="Прикрепить файл"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "flex-1 bg-transparent text-sm resize-none",
            "outline-none py-2 px-1",
            "placeholder:text-muted-foreground/70",
            "max-h-32 min-h-[36px]"
          )}
          style={{ height: 'auto' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = Math.min(target.scrollHeight, 128) + 'px';
          }}
        />
        
        {/* Voice input button */}
        <button
          type="button"
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          title="Голосовой ввод"
        >
          <Mic className="w-4 h-4" />
        </button>
        
        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={cn(
            "p-2.5 rounded-lg transition-all duration-200",
            "bg-chat-send-button text-white",
            "hover:opacity-90 active:scale-95",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          )}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
        Нажмите Enter для отправки, Shift+Enter для новой строки
      </p>
    </div>
  );
};
