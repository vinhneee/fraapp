"use client";

import { useState, useEffect } from "react";
import { Brand, SwipeAction } from "@/lib/types";
import { MOCK_BRANDS, CURRENT_USER_BRAND_ID } from "@/lib/mockData";
import BrandCard from "./BrandCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SwipeInterfaceProps {
  initialBrands?: Brand[];
}

const SwipeInterface = ({ initialBrands }: SwipeInterfaceProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<SwipeAction[]>([]);
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [matchedBrand, setMatchedBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Filter out current user's brand and initialize
    const availableBrands = (initialBrands || MOCK_BRANDS).filter(
      brand => brand.id !== CURRENT_USER_BRAND_ID
    );
    setBrands(availableBrands);
    setIsLoading(false);
  }, [initialBrands]);

  const currentBrand = brands[currentIndex];
  const hasMoreBrands = currentIndex < brands.length - 1;

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentBrand) return;

    // Create swipe action
    const swipeAction: SwipeAction = {
      id: Date.now().toString(),
      fromBrandId: CURRENT_USER_BRAND_ID,
      toBrandId: currentBrand.id,
      action: direction === 'right' ? 'like' : 'pass',
      timestamp: new Date()
    };

    setSwipeHistory(prev => [...prev, swipeAction]);

    // Simulate match logic (30% chance for demo)
    if (direction === 'right' && Math.random() > 0.7) {
      setMatchedBrand(currentBrand);
      setShowMatchNotification(true);
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setShowMatchNotification(false);
        setMatchedBrand(null);
      }, 3000);
    }

    // Move to next brand
    if (hasMoreBrands) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleUndo = () => {
    if (currentIndex > 0 && swipeHistory.length > 0) {
      setCurrentIndex(prev => prev - 1);
      setSwipeHistory(prev => prev.slice(0, -1));
    }
  };

  const resetSwipes = () => {
    setCurrentIndex(0);
    setSwipeHistory([]);
    setShowMatchNotification(false);
    setMatchedBrand(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thương hiệu...</p>
        </div>
      </div>
    );
  }

  if (!hasMoreBrands && currentIndex >= brands.length) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🎉</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bạn đã xem hết tất cả thương hiệu!
          </h3>
          <p className="text-gray-600 mb-6">
            Quay lại sau để khám phá thêm những thương hiệu mới, hoặc xem lại các kết nối đã có.
          </p>
          <div className="space-y-3">
            <Button onClick={resetSwipes} className="w-full bg-blue-600 hover:bg-blue-700">
              Xem lại từ đầu
            </Button>
            <Button variant="outline" className="w-full">
              Xem kết nối của bạn
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Thống kê của bạn:</strong><br />
              Đã xem: {swipeHistory.length} thương hiệu<br />
              Quan tâm: {swipeHistory.filter(s => s.action === 'like').length} thương hiệu
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <p className="text-gray-600">Không có thương hiệu nào để hiển thị</p>
          <Button onClick={resetSwipes} className="mt-4">
            Tải lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {brands.length}
          </span>
          <Badge variant="outline">
            {brands.length - currentIndex - 1} còn lại
          </Badge>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / brands.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Swipe Cards Stack */}
      <div className="relative">
        {/* Background cards for depth */}
        {hasMoreBrands && brands[currentIndex + 1] && (
          <div className="absolute inset-0 transform scale-95 opacity-50 z-0">
            <BrandCard brand={brands[currentIndex + 1]} />
          </div>
        )}
        
        {brands[currentIndex + 2] && (
          <div className="absolute inset-0 transform scale-90 opacity-25 z-0">
            <BrandCard brand={brands[currentIndex + 2]} />
          </div>
        )}

        {/* Current card */}
        <div className="relative z-10">
          <BrandCard
            brand={currentBrand}
            onSwipe={handleSwipe}
            isDemo={true}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 text-red-500"
        >
          <span className="text-2xl">✕</span>
        </Button>
        
        {currentIndex > 0 && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleUndo}
            className="w-16 h-16 rounded-full border-2 border-yellow-300 hover:border-yellow-400 hover:bg-yellow-50 text-yellow-600"
          >
            <span className="text-xl">↶</span>
          </Button>
        )}
        
        <Button
          size="lg"
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <span className="text-2xl">💫</span>
        </Button>
      </div>

      {/* Match Notification */}
      {showMatchNotification && matchedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white">💫</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Kết nối thành công!
            </h3>
            <p className="text-gray-600 mb-4">
              Bạn và <strong>{matchedBrand.name}</strong> đã quan tâm lẫn nhau.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowMatchNotification(false)}
              >
                Tiếp tục
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setShowMatchNotification(false);
                  window.location.href = '/matches';
                }}
              >
                Nhắn tin
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Swipe Instructions */}
      {currentIndex === 0 && swipeHistory.length === 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-blue-700">
            <strong>Hướng dẫn:</strong> Nhấn ✕ để bỏ qua, 💫 để quan tâm, hoặc kéo thẻ sang trái/phải
          </p>
        </div>
      )}
    </div>
  );
};

export default SwipeInterface;