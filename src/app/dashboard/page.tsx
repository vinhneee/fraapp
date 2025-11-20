"use client";

import { useState } from "react";
import SwipeInterface from "@/components/SwipeInterface";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INDUSTRIES, LOCATIONS } from "@/lib/mockData";

export default function DashboardPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    industry: "",
    location: "",
    minInvestment: "",
    maxInvestment: ""
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      industry: "",
      location: "",
      minInvestment: "",
      maxInvestment: ""
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== "").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Khám phá thương hiệu
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Tìm kiếm cơ hội nhượng quyền phù hợp với doanh nghiệp của bạn
          </p>
          
          {/* Filter Toggle */}
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              🔍 Bộ lọc
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700"
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Tùy chỉnh tìm kiếm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Ngành nghề
                  </label>
                  <Select
                    value={filters.industry}
                    onValueChange={(value) => handleFilterChange("industry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả ngành nghề" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tất cả ngành nghề</SelectItem>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Khu vực
                  </label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => handleFilterChange("location", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả khu vực" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tất cả khu vực</SelectItem>
                      {LOCATIONS.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Đầu tư tối thiểu
                  </label>
                  <Select
                    value={filters.minInvestment}
                    onValueChange={(value) => handleFilterChange("minInvestment", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Không giới hạn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Không giới hạn</SelectItem>
                      <SelectItem value="100000000">Từ 100 triệu</SelectItem>
                      <SelectItem value="500000000">Từ 500 triệu</SelectItem>
                      <SelectItem value="1000000000">Từ 1 tỷ</SelectItem>
                      <SelectItem value="2000000000">Từ 2 tỷ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Đầu tư tối đa
                  </label>
                  <Select
                    value={filters.maxInvestment}
                    onValueChange={(value) => handleFilterChange("maxInvestment", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Không giới hạn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Không giới hạn</SelectItem>
                      <SelectItem value="500000000">Dưới 500 triệu</SelectItem>
                      <SelectItem value="1000000000">Dưới 1 tỷ</SelectItem>
                      <SelectItem value="2000000000">Dưới 2 tỷ</SelectItem>
                      <SelectItem value="5000000000">Dưới 5 tỷ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Bộ lọc đang áp dụng:</p>
                  <div className="flex flex-wrap gap-2">
                    {filters.industry && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Ngành: {filters.industry}
                      </Badge>
                    )}
                    {filters.location && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Khu vực: {filters.location}
                      </Badge>
                    )}
                    {filters.minInvestment && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        Tối thiểu: {parseInt(filters.minInvestment).toLocaleString('vi-VN')} VND
                      </Badge>
                    )}
                    {filters.maxInvestment && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        Tối đa: {parseInt(filters.maxInvestment).toLocaleString('vi-VN')} VND
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Swipe Interface */}
        <div className="flex justify-center">
          <SwipeInterface />
        </div>

        {/* Tips Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">💡 Mẹo để tối ưu kết nối</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-2xl mb-2">🎯</div>
                  <strong>Hồ sơ chất lượng</strong><br />
                  Cập nhật thông tin đầy đủ và hình ảnh chuyên nghiệp
                </div>
                <div>
                  <div className="text-2xl mb-2">⚡</div>
                  <strong>Phản hồi nhanh</strong><br />
                  Trả lời tin nhắn trong vòng 24h để tạo ấn tượng tốt
                </div>
                <div>
                  <div className="text-2xl mb-2">🤝</div>
                  <strong>Chân thành</strong><br />
                  Chia sẻ thông tin minh bạch về điều kiện và kỳ vọng
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}