import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Heart, 
  Truck, 
  Map, 
  FileText, 
  Award, 
  Link2, 
  ExternalLink,
  ChevronLeft,
  Users,
  ClipboardList
} from "lucide-react";

interface QuickActionsProps {
  onSelect: (prompt: string) => void;
}

interface QuickAction {
  icon: any;
  label: string;
  prompt?: string;
  subActions?: { icon: any; label: string; prompt: string }[];
}

const quickActions: QuickAction[] = [
  {
    icon: Users,
    label: "Социальный пакет",
    subActions: [
      {
        icon: Calendar,
        label: "Информация по отпускам и выплатам",
        prompt: "Информация по отпускам и выплатам"
      },
      {
        icon: Heart,
        label: "Мед страховка",
        prompt: "Информация о медицинской страховке"
      }
    ]
  },
  {
    icon: Truck,
    label: "Развозка",
    subActions: [
      {
        icon: Map,
        label: "Маршруты",
        prompt: "Информация о маршрутах развозки"
      },
      {
        icon: ClipboardList,
        label: "Подать заявку",
        prompt: "Как подать заявку на развозку?"
      }
    ]
  },
  {
    icon: Award,
    label: "Голосования",
    subActions: [
      {
        icon: Award,
        label: "Номинация лучший эко-активист",
        prompt: "Информация о номинации лучший эко-активист"
      }
    ]
  },
  {
    icon: Link2,
    label: "Полезные ссылки",
    subActions: [
      {
        icon: ExternalLink,
        label: "GLPI",
        prompt: "Ссылка на GLPI"
      },
      {
        icon: ExternalLink,
        label: "ASAP",
        prompt: "Ссылка на ASAP"
      },
      {
        icon: FileText,
        label: "Отчет о КПД",
        prompt: "Как заполнить отчет о КПД?"
      }
    ]
  }
];

export const QuickActions = ({ onSelect }: QuickActionsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (index: number) => {
    setSelectedCategory(index);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const handleSubActionClick = (prompt: string) => {
    onSelect(prompt);
    setSelectedCategory(null);
  };

  if (selectedCategory !== null) {
    const category = quickActions[selectedCategory];
    return (
      <div className="flex flex-col gap-2 px-4 w-full">
        <button
          onClick={handleBackClick}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg w-fit",
            "bg-background/80 border border-border/40",
            "text-sm text-foreground/70 hover:text-foreground",
            "hover:bg-muted/50 hover:border-chat-send-button/30",
            "transition-all duration-200 mb-2"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Назад
        </button>
        <div className="flex flex-col gap-2">
          {category.subActions?.map((subAction, index) => (
            <button
              key={index}
              onClick={() => handleSubActionClick(subAction.prompt)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg",
                "bg-background/80 border border-border/40",
                "text-sm text-foreground/70 hover:text-foreground",
                "hover:bg-muted/50 hover:border-chat-send-button/30",
                "transition-all duration-200"
              )}
            >
              <subAction.icon className="w-4 h-4" />
              {subAction.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center px-4">
      {quickActions.map((action, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(index)}
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
