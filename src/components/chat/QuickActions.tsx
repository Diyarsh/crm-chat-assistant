import { cn } from "@/lib/utils";
import { FileText, HelpCircle, Lightbulb, BarChart3 } from "lucide-react";

interface QuickActionsProps {
  onSelect: (prompt: string) => void;
}

const quickActions = [
  {
    icon: HelpCircle,
    label: "Как пользоваться?",
    prompt: "Как пользоваться системой Bitrix24?"
  },
  {
    icon: FileText,
    label: "Создать отчёт",
    prompt: "Как создать отчёт в системе?"
  },
  {
    icon: Lightbulb,
    label: "Подсказки",
    prompt: "Какие есть полезные функции системы?"
  },
  {
    icon: BarChart3,
    label: "Аналитика",
    prompt: "Как посмотреть аналитику и статистику?"
  }
];

export const QuickActions = ({ onSelect }: QuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center px-4">
      {quickActions.map((action, index) => (
        <button
          key={index}
          onClick={() => onSelect(action.prompt)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg",
            "bg-background/80 border border-border/40",
            "text-sm text-foreground/70 hover:text-foreground",
            "hover:bg-muted/50 hover:border-chat-send-button/30",
            "transition-all duration-200"
          )}
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </button>
      ))}
    </div>
  );
};
