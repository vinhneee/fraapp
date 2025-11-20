"use client";

import { useState } from "react";
import { Brand } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BrandCardProps {
  brand: Brand;
  onSwipe?: (direction: 'left' | 'right') => void;
  isDemo?: boolean;
}

const BrandCard = ({ brand, onSwipe, isDemo = false }: BrandCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleImageNext = () => {
    if (currentImageIndex < brand.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleImagePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleMouseDown = () => {
    if (isDemo) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isDemo) return;
    setDragOffset(e.movementX);
  };

  const handleMouseUp = () => {
    if (!isDragging || isDemo) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        onSwipe?.('right');
      } else {
        onSwipe?.('left');
      }
    }
    setDragOffset(0);
  };

  return (
    <Card
      className={`w-full max-w-sm mx-auto bg-white shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isDragging ? 'scale-105 rotate-1' : 'hover:shadow-2xl'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        transform: isDragging ? `translateX(${dragOffset * 0.1}px) rotate(${dragOffset * 0.02}deg)` : 'none'
      }}
    >
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={brand.images[currentImageIndex]}
          alt={`${brand.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7d94a3da-d7d8-433e-8c25-9cb35d07c603.png' ', '+')}+Brand+Image`;
          }}
        />
        
        {/* Image Navigation */}
        {brand.images.length > 1 && (
          <>
            {currentImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleImagePrev();
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
              >
                ←
              </button>
            )}
            
            {currentImageIndex < brand.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageNext();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
              >
                →
              </button>
            )}
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {brand.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Brand Logo Overlay */}
        <div className="absolute top-4 left-4">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg overflow-hidden border-2 border-white">
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8c5c35ac-3dda-4bb6-a293-eb5030a4f8da.png}`;
              }}
            />
          </div>
        </div>

        {/* Industry Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black bg-opacity-70 text-white border-0">
            {brand.industry}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6">
        {/* Brand Name and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{brand.name}</h3>
          <p className="text-gray-600 text-sm flex items-center">
            📍 {brand.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {brand.description}
        </p>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {formatCurrency(brand.franchiseFee)}
            </div>
            <div className="text-xs text-gray-600">Phí nhượng quyền</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(brand.minimumInvestment)}
            </div>
            <div className="text-xs text-gray-600">Đầu tư tối thiểu</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {brand.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span>🏪 {brand.totalLocations} cửa hàng</span>
          <span>📅 Từ {brand.establishedYear}</span>
        </div>

        {/* Action Buttons (for demo) */}
        {isDemo && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => onSwipe?.('left')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium"
            >
              ✕ Bỏ qua
            </button>
            <button
              onClick={() => onSwipe?.('right')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
            >
              💫 Quan tâm
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BrandCard;