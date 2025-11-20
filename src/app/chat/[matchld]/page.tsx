"use client";

import { useParams, useRouter } from "next/navigation";
import { MOCK_MATCHES } from "@/lib/mockData";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.matchId as string;

  const match = MOCK_MATCHES.find(m => m.id === matchId);

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Không tìm thấy cuộc trò chuyện
          </h2>
          <p className="text-gray-600 mb-6">
            Cuộc trò chuyện này có thể đã bị xóa hoặc không tồn tại.
          </p>
          <Button onClick={() => router.push('/matches')}>
            Quay lại danh sách kết nối
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto pt-8 pb-4 px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push('/matches')}
            className="mb-4"
          >
            ← Quay lại danh sách kết nối
          </Button>
        </div>

        {/* Chat Interface */}
        {/*
          Ensure the match object includes properties expected by ChatInterface (matchedAt, unreadCount).
          If they're missing in MOCK_MATCHES, provide sensible defaults here.
        */}
        <Card className="shadow-lg">
          {(() => {
            const chatMatch = {
              ...match,
              // prefer existing values if present; otherwise provide defaults
              matchedAt: (match as any).matchedAt ?? new Date().toISOString(),
              unreadCount: (match as any).unreadCount ?? 0,
            };
            return <ChatInterface match={chatMatch as any} />;
          })()}
        </Card>

        {/* Brand Quick Info */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Thông tin thương hiệu</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Ngành nghề:</span>
                <span className="font-medium">
                  {match.brand1Id === "1" ? match.brand2.industry : match.brand1.industry}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Khu vực:</span>
                <span className="font-medium">
                  {match.brand1Id === "1" ? match.brand2.location : match.brand1.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Số cửa hàng:</span>
                <span className="font-medium">
                  {match.brand1Id === "1" ? match.brand2.totalLocations : match.brand1.totalLocations}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Thông tin tài chính</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Phí nhượng quyền:</span>
                <span className="font-medium text-blue-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0,
                  }).format(match.brand1Id === "1" ? match.brand2.franchiseFee : match.brand1.franchiseFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Đầu tư tối thiểu:</span>
                <span className="font-medium text-green-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0,
                  }).format(match.brand1Id === "1" ? match.brand2.minimumInvestment : match.brand1.minimumInvestment)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}