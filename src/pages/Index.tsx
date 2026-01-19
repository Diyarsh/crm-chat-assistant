import { AIHubChatWidget } from "@/components/chat/AIHubChatWidget";

const Index = () => {
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Bitrix24 Screenshot Background */}
      <img 
        src="/bitrix-screenshot.png"
        alt="Bitrix24 Interface"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      {/* AI-HUB Chat Widget - appears on top */}
      <AIHubChatWidget />
    </div>
  );
};

export default Index;
