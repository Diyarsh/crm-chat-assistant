import { useState, useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatHistory } from "./ChatHistory";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  date: string;
  messages: Message[];
}

// Demo data
const demoSessions: ChatSession[] = [
  {
    id: "1",
    title: "Как заполнить Факт КПД?",
    preview: "Подскажите пожалуйста как...",
    date: "Сегодня",
    messages: [
      { id: "1", content: "Как заполнить Факт КПД?", isUser: true, timestamp: "14:30" },
      { id: "2", content: "Для заполнения Факта КПД перейдите в раздел 'Отчеты' → 'КПД' → 'Создать новый'. Заполните все обязательные поля и нажмите 'Сохранить'.", isUser: false, timestamp: "14:31" },
    ],
  },
  {
    id: "2", 
    title: "Создание задачи",
    preview: "Как создать новую задачу?",
    date: "Вчера",
    messages: [
      { id: "1", content: "Как создать новую задачу в системе?", isUser: true, timestamp: "10:15" },
      { id: "2", content: "Для создания задачи нажмите '+' в разделе 'Задачи и Проекты', выберите тип задачи и заполните описание.", isUser: false, timestamp: "10:16" },
    ],
  },
  {
    id: "3",
    title: "Работа с документами",
    preview: "Где найти шаблоны?",
    date: "15.01.2025",
    messages: [
      { id: "1", content: "Где найти шаблоны документов?", isUser: true, timestamp: "09:00" },
      { id: "2", content: "Шаблоны документов находятся в разделе 'База знаний' → 'Шаблоны'. Вы можете фильтровать по категориям.", isUser: false, timestamp: "09:01" },
    ],
  },
];

export const AIHubChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessions, setSessions] = useState(demoSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>("1");
  const [currentMessages, setCurrentMessages] = useState<Message[]>(demoSessions[0].messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelectSession = (id: string) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setActiveSessionId(id);
      setCurrentMessages(session.messages);
    }
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "Новый чат",
      preview: "Начните диалог...",
      date: "Сейчас",
      messages: [],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setCurrentMessages([]);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    };
    
    setCurrentMessages((prev) => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Спасибо за ваш вопрос! Я обрабатываю информацию и скоро предоставлю ответ. Пожалуйста, подождите...",
        isUser: false,
        timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      };
      setCurrentMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "flex items-center gap-2 px-5 py-3 rounded-full",
            "bg-primary text-primary-foreground font-medium",
            "shadow-lg hover:shadow-xl transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "animate-pulse-gentle"
          )}
        >
          <Bot className="w-5 h-5" />
          <span>AI-HUB</span>
        </button>
      )}

      {/* Mini Chat Widget */}
      {isOpen && !isExpanded && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50 w-[380px] h-[500px]",
            "flex flex-col rounded-xl shadow-2xl overflow-hidden",
            "animate-chat-slide-up"
          )}
        >
          <ChatHeader
            onClose={handleClose}
            onToggleExpand={handleToggleExpand}
            isExpanded={isExpanded}
          />
          
          {/* Chat Messages Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{
              background: "linear-gradient(135deg, hsl(var(--chat-gradient-start)), hsl(var(--chat-gradient-end)))"
            }}
          >
            {currentMessages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput onSend={handleSendMessage} />
        </div>
      )}

      {/* Expanded Full View */}
      {isOpen && isExpanded && (
        <div
          className={cn(
            "fixed inset-4 md:inset-8 lg:inset-12 z-50",
            "flex rounded-xl shadow-2xl overflow-hidden",
            "animate-chat-expand"
          )}
        >
          {/* History Sidebar */}
          <div className="w-72 flex-shrink-0 hidden md:flex">
            <ChatHistory
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelectSession={handleSelectSession}
              onNewChat={handleNewChat}
            />
          </div>
          
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            <ChatHeader
              onClose={handleClose}
              onToggleExpand={handleToggleExpand}
              isExpanded={isExpanded}
            />
            
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-4"
              style={{
                background: "linear-gradient(135deg, hsl(var(--chat-gradient-start)), hsl(var(--chat-gradient-end)))"
              }}
            >
              {currentMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Bot className="w-16 h-16 text-primary/30 mb-4" />
                  <h3 className="text-lg font-medium text-foreground/70">Начните новый диалог</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Задайте любой вопрос и AI-HUB поможет вам
                  </p>
                </div>
              ) : (
                currentMessages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    content={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      )}

      {/* Backdrop for expanded view */}
      {isOpen && isExpanded && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}
    </>
  );
};
