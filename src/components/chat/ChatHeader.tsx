import { X, Maximize2, Minimize2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  onClose: () => void;
  onToggleExpand: () => void;
  isExpanded: boolean;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const languages = [
  { code: "RU", label: "Русский" },
  { code: "EN", label: "English" },
  { code: "KZ", label: "Қазақша" },
];

export const ChatHeader = ({
  onClose,
  onToggleExpand,
  isExpanded,
  language,
  onLanguageChange,
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-chat-header text-chat-header-foreground rounded-t-xl">
      <h2 className="font-semibold text-lg tracking-wide">AI-HUB</h2>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "flex items-center gap-1 px-2 py-1 rounded text-sm",
              "hover:bg-white/10 transition-colors"
            )}>
              {language}
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[120px]">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={cn(
                  language === lang.code && "bg-accent/10 text-accent"
                )}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
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
