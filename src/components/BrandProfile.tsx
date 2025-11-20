"use client";

import { useState } from "react";
import { Brand } from "@/lib/types";
import { MOCK_BRANDS, INDUSTRIES, LOCATIONS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface BrandProfileProps {
  brand?: Brand;
  isEditing?: boolean;
  onSave?: (updatedBrand: Brand) => void;
}

const BrandProfile = ({ 
  brand = MOCK_BRANDS[0], 
  isEditing = false,
  onSave 
}: BrandProfileProps) => {
  const [editMode, setEditMode] = useState(isEditing);
  const [formData, setFormData] = useState<Brand>({ ...brand });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof Brand, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'requirements' | 'tags', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'requirements' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate save operation
    setTimeout(() => {
      setIsLoading(false);
      setEditMode(false);
      onSave?.(formData);
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (editMode) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Chỉnh sửa hồ sơ thương hiệu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Thông tin cơ bản</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên thương hiệu</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email liên hệ</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Ngành nghề</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleInputChange('industry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Khu vực</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleInputChange('location', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả thương hiệu</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Thông tin tài chính</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="franchiseFee">Phí nhượng quyền (VND)</Label>
                  <Input
                    id="franchiseFee"
                    type="number"
                    value={formData.franchiseFee}
                    onChange={(e) => handleInputChange('franchiseFee', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minimumInvestment">Đầu tư tối thiểu (VND)</Label>
                  <Input
                    id="minimumInvestment"
                    type="number"
                    value={formData.minimumInvestment}
                    onChange={(e) => handleInputChange('minimumInvestment', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="establishedYear">Năm thành lập</Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    value={formData.establishedYear}
                    onChange={(e) => handleInputChange('establishedYear', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalLocations">Số lượng cửa hàng</Label>
                <Input
                  id="totalLocations"
                  type="number"
                  value={formData.totalLocations}
                  onChange={(e) => handleInputChange('totalLocations', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Yêu cầu nhượng quyền</h3>
              
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    placeholder="Nhập yêu cầu..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem('requirements', index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem('requirements')}
              >
                + Thêm yêu cầu
              </Button>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Tags</h3>
              
              <div className="grid grid-cols-2 gap-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tag}
                      onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                      placeholder="Nhập tag..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem('tags', index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem('tags')}
              >
                + Thêm tag
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode(false);
                  setFormData({ ...brand });
                }}
              >
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9d185ae1-fd4e-4acf-a9c6-c8094d92020c.png}`;
                }}
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{brand.name}</h1>
              <p className="text-lg text-gray-600 mb-4">
                {brand.industry} • {brand.location}
              </p>
              <p className="text-gray-700 mb-4">{brand.description}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {brand.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4 justify-center md:justify-start">
                <Button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  ✏️ Chỉnh sửa
                </Button>
                <Button variant="outline">
                  👁️ Xem như khách
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin tài chính</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Phí nhượng quyền:</span>
              <span className="font-semibold text-blue-600">
                {formatCurrency(brand.franchiseFee)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Đầu tư tối thiểu:</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(brand.minimumInvestment)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Số cửa hàng:</span>
              <span className="font-semibold">{brand.totalLocations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Năm thành lập:</span>
              <span className="font-semibold">{brand.establishedYear}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Kinh nghiệm:</span>
              <span className="font-semibold">
                {new Date().getFullYear() - brand.establishedYear} năm
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Yêu cầu nhượng quyền</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {brand.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Images Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Hình ảnh thương hiệu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {brand.images.map((image, index) => (
              <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${brand.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandProfile;