"use client";

import { useState } from "react";
import Link from "next/link";
import { Match } from "@/lib/types";
import { MOCK_MATCHES, CURRENT_USER_BRAND_ID } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MatchesListProps {
  matches?: Match[];
}

const MatchesList = ({ matches = MOCK_MATCHES }: MatchesListProps) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'recent'>('all');

  const filteredMatches = matches.filter(match => {
    switch (filter) {
      case 'active':
        return match.status === 'active' && match.unreadCount > 0;
      case 'recent':
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return match.matchedAt > threeDaysAgo;
      default:
        return match.status === 'active';
    }
  });

  const getOtherBrand = (match: Match) => {
    return match.brand1Id === CURRENT_USER_BRAND_ID ? match.brand2 : match.brand1;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Hôm nay";
    if (diffInDays === 1) return "Hôm qua";
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} tuần trước`;
    return `${Math.floor(diffInDays / 30)} tháng trước`;
  };

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">💫</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Chưa có kết nối nào
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Hãy bắt đầu khám phá các thương hiệu và tạo những kết nối mới để mở rộng cơ hội kinh doanh.
        </p>
        <Link href="/dashboard">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Khám phá thương hiệu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              filter === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Tất cả ({matches.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              filter === 'active'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Có tin mới ({matches.filter(m => m.unreadCount > 0).length})
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              filter === 'recent'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Gần đây
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid gap-4">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Không có kết nối nào phù hợp với bộ lọc đã chọn.
            </p>
          </div>
        ) : (
          filteredMatches.map((match) => {
            const otherBrand = getOtherBrand(match);
            return (
              <Card key={match.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Brand Logo */}
                    <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={otherBrand.logo}
                        alt={`${otherBrand.name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e92342ac-cbac-4645-a25d-85174d8661f5.png}`;
                        }}
                      />
                    </div>

                    {/* Brand Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {otherBrand.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {otherBrand.industry} • {otherBrand.location}
                          </p>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {otherBrand.description}
                          </p>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            {match.unreadCount > 0 && (
                              <Badge className="bg-red-500 text-white">
                                {match.unreadCount}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {formatDate(match.matchedAt)}
                            </Badge>
                          </div>
                          
                          <Link href={`/chat/${match.id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              💬 Nhắn tin
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Investment Info */}
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="text-sm font-semibold text-blue-600">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                              minimumFractionDigits: 0,
                            }).format(otherBrand.franchiseFee)}
                          </div>
                          <div className="text-xs text-gray-600">Phí nhượng quyền</div>
                        </div>
                        
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-sm font-semibold text-green-600">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                              minimumFractionDigits: 0,
                            }).format(otherBrand.minimumInvestment)}
                          </div>
                          <div className="text-xs text-gray-600">Đầu tư tối thiểu</div>
                        </div>
                      </div>

                      {/* Last Message Preview */}
                      {match.lastMessageAt && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Tin nhắn cuối: {formatDate(match.lastMessageAt)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      {filteredMatches.length > 0 && (
        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button variant="outline" className="mr-4">
              Tìm thêm thương hiệu
            </Button>
          </Link>
          <Button variant="outline">
            Xuất danh sách kết nối
          </Button>
        </div>
      )}
    </div>
  );
};

export default MatchesList;