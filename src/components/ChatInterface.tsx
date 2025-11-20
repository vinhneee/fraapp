"use client";

import { useState, useRef, useEffect } from "react";
import { Match, Message } from "@/lib/types";
// import { CURRENT_USER_BRAND_ID } from "@/lib/mockData";
const CURRENT_USER_BRAND_ID = "brand1"; // Replace with the correct brand ID or logic
// import { MOCK_MESSAGES } from "@/lib/mockData"; // Uncomment if MOCK_MESSAGES is exported
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ChatInterfaceProps {
  match: Match;
  initialMessages?: Message[];
}

const ChatInterface = ({ match, initialMessages = [] }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.filter(msg => msg.matchId === match.id)
  );
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherBrand = match.brand1Id === CURRENT_USER_BRAND_ID ? match.brand2 : match.brand1;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const message: Message = {
      id: Date.now().toString(),
      matchId: match.id,
      senderId: CURRENT_USER_BRAND_ID,
      content: newMessage.trim(),
      type: 'text',
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    setIsLoading(true);

    // Simulate API response after 1-3 seconds
    setTimeout(() => {
      const responses = [
        "Cảm ơn bạn đã quan tâm! Chúng tôi có thể sắp xếp cuộc họp để thảo luận chi tiết hơn.",
        "Điều kiện nhượng quyền của chúng tôi khá linh hoạt. Bạn có thể chia sẻ thêm về tình hình tài chính và kinh nghiệm?",
        "Chúng tôi rất hào hứng với cơ hội hợp tác này. Khi nào bạn có thể đến tham quan mô hình của chúng tôi?",
        "Tôi sẽ gửi cho bạn bản thuyết trình chi tiết và bảng tính toán đầu tư. Email nào tôi có thể gửi?",
        "Chúng ta có thể thảo luận về vùng độc quyền và hỗ trợ marketing. Bạn quan tâm khu vực nào?"
      ];
      
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        matchId: match.id,
        senderId: otherBrand.id,
        content: responses[Math.floor(Math.random() * responses.length)],
        type: 'text',
        timestamp: new Date(),
        read: true
      };

      setMessages(prev => [...prev, autoReply]);
      setIsLoading(false);
    }, Math.random() * 2000 + 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
            <img
              src={otherBrand.logo}
              alt={`${otherBrand.name} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cdd8a9dc-76c3-4369-a0b8-f1584ce58b38.png}`;
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{otherBrand.name}</h3>
            <p className="text-sm text-gray-600">{otherBrand.industry}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-200">
              Online
            </Badge>
            <Button variant="outline" size="sm">
              📞 Gọi
            </Button>
            <Button variant="outline" size="sm">
              📹 Video
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👋</span>
            </div>
            <p className="text-gray-600 mb-4">
              Chúc mừng! Bạn đã kết nối thành công với {otherBrand.name}
            </p>
            <p className="text-sm text-gray-500">
              Hãy bắt đầu cuộc trò chuyện bằng cách chào hỏi và giới thiệu về dự án của bạn
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId === CURRENT_USER_BRAND_ID;
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isOwnMessage
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? 'text-blue-200' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-2 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <Button variant="outline" size="sm">
            📎
          </Button>
          <div className="flex-1 flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "⏳" : "➤"}
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewMessage("Chào bạn! Tôi rất quan tâm đến cơ hội nhượng quyền này.")}
            className="text-xs"
          >
            👋 Chào hỏi
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewMessage("Bạn có thể chia sẻ thêm về điều kiện nhượng quyền không?")}
            className="text-xs"
          >
            💼 Hỏi điều kiện
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewMessage("Chúng ta có thể sắp xếp cuộc họp để thảo luận trực tiếp?")}
            className="text-xs"
          >
            🤝 Đề xuất gặp mặt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;