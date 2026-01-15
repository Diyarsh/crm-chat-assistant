import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatHistory } from "./ChatHistory";
import { TypingIndicator } from "./TypingIndicator";
import { QuickActions } from "./QuickActions";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
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
      { id: "1", content: "Как заполнить Факт КПД?", isUser: true },
      { id: "2", content: "Для заполнения Факта КПД перейдите в раздел 'Отчеты' → 'КПД' → 'Создать новый'. Заполните все обязательные поля и нажмите 'Сохранить'.", isUser: false },
    ],
  },
  {
    id: "2", 
    title: "Создание задачи",
    preview: "Как создать новую задачу?",
    date: "Сегодня",
    messages: [
      { id: "1", content: "Как создать новую задачу в системе?", isUser: true },
      { id: "2", content: "Для создания задачи нажмите '+' в разделе 'Задачи и Проекты', выберите тип задачи и заполните описание.", isUser: false },
    ],
  },
  {
    id: "3",
    title: "Работа с документами",
    preview: "Где найти шаблоны?",
    date: "Вчера",
    messages: [
      { id: "1", content: "Где найти шаблоны документов?", isUser: true },
      { id: "2", content: "Шаблоны документов находятся в разделе 'База знаний' → 'Шаблоны'. Вы можете фильтровать по категориям.", isUser: false },
    ],
  },
];

export const AIHubChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessions, setSessions] = useState(demoSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>("1");
  const [currentMessages, setCurrentMessages] = useState<Message[]>(demoSessions[0].messages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isTyping]);

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
      date: "Сегодня",
      messages: [],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setCurrentMessages([]);
  };

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
    if (activeSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id);
      if (remaining.length > 0) {
        setActiveSessionId(remaining[0].id);
        setCurrentMessages(remaining[0].messages);
      } else {
        setActiveSessionId(null);
        setCurrentMessages([]);
      }
    }
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };
    
    setCurrentMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Спасибо за ваш вопрос! Я обрабатываю информацию и скоро предоставлю ответ. Пожалуйста, подождите...",
        isUser: false,
      };
      setCurrentMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="w-16 h-16 rounded-full bg-chat-send-button/10 flex items-center justify-center mb-4">
        <MessageCircle className="w-8 h-8 text-chat-send-button" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-1">Чем могу помочь?</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Задайте вопрос или выберите действие
      </p>
      <QuickActions onSelect={handleSendMessage} />
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "flex items-center gap-2.5 px-5 py-3 rounded-full",
            "bg-chat-send-button text-white font-medium",
            "shadow-lg shadow-chat-send-button/20 hover:shadow-xl hover:shadow-chat-send-button/30",
            "transition-all duration-300",
            "hover:scale-105 active:scale-95"
          )}
        >
          <MessageCircle className="w-5 h-5" />
          <span>AI-HUB</span>
        </button>
      )}

      {/* Mini Chat Widget */}
      {isOpen && !isExpanded && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-50 w-[400px] h-[520px]",
            "flex flex-col rounded-2xl shadow-2xl overflow-hidden",
            "border border-border/30 bg-background",
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
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{
              background: "linear-gradient(180deg, hsl(var(--chat-gradient-start)) 0%, hsl(var(--chat-gradient-end)) 100%)"
            }}
          >
            {currentMessages.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {currentMessages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    content={message.content}
                    isUser={message.isUser}
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>
      )}

      {/* Expanded Full View */}
      {isOpen && isExpanded && (
        <div
          className={cn(
            "fixed inset-4 md:inset-8 lg:inset-12 z-50",
            "flex rounded-2xl shadow-2xl overflow-hidden",
            "border border-border/30 bg-background",
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
              onDeleteSession={handleDeleteSession}
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
              className="flex-1 overflow-y-auto p-6 space-y-3"
              style={{
                background: "linear-gradient(180deg, hsl(var(--chat-gradient-start)) 0%, hsl(var(--chat-gradient-end)) 100%)"
              }}
            >
              {currentMessages.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {currentMessages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      content={message.content}
                      isUser={message.isUser}
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      )}

      {/* Backdrop for expanded view */}
      {isOpen && isExpanded && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}
    </>
  );
};
