import { AIHubChatWidget } from "@/components/chat/AIHubChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Simulated Bitrix-like interface background */}
      <div className="h-screen flex flex-col">
        {/* Header bar simulation */}
        <div className="h-12 bg-primary flex items-center px-4 text-primary-foreground">
          <span className="font-semibold">Битрикс24</span>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <span>QazCloud</span>
            <span>Помощь</span>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex">
          {/* Sidebar simulation */}
          <div className="w-48 bg-primary/95 text-primary-foreground p-4 hidden md:block">
            <div className="space-y-3 text-sm">
              <div className="py-2 px-3 bg-accent/20 rounded">Лента</div>
              <div className="py-2 px-3 opacity-70 hover:opacity-100 cursor-pointer">Мессенджер</div>
              <div className="py-2 px-3 opacity-70 hover:opacity-100 cursor-pointer">Задачи</div>
              <div className="py-2 px-3 opacity-70 hover:opacity-100 cursor-pointer">Календарь</div>
              <div className="py-2 px-3 opacity-70 hover:opacity-100 cursor-pointer">Диск</div>
              <div className="py-2 px-3 opacity-70 hover:opacity-100 cursor-pointer">CRM</div>
            </div>
          </div>
          
          {/* Content area */}
          <div className="flex-1 p-6 bg-background">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  AI-HUB Chat Widget Demo
                </h1>
                <p className="text-muted-foreground">
                  Это демонстрация виджета AI-HUB для Bitrix24. Нажмите на кнопку 
                  "AI-HUB" в правом нижнем углу, чтобы открыть чат.
                </p>
              </div>
              
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Возможности:</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
                    <span>Компактный режим чата в углу экрана</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
                    <span>Расширенный режим с историей чатов слева</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
                    <span>Переключение языков (RU/EN/KZ)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-medium flex-shrink-0">4</span>
                    <span>Создание новых чатов и поиск по истории</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI-HUB Chat Widget */}
      <AIHubChatWidget />
    </div>
  );
};

export default Index;
