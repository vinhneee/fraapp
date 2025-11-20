export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  franchiseFee: number;
  minimumInvestment: number;
  images: string[];
  contactEmail: string;
  requirements: string[];
  tags: string[];
  establishedYear: number;
  totalLocations: number;
  websiteUrl?: string;
  socialMedia?: {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  id: string;
  brand1Id: string;
  brand2Id: string;
  brand1: Brand;
  brand2: Brand;
  matchedAt: string; // or Date, depending on your data
  unreadCount: number;
  };
}

export interface Match {
  id: string;
  brand1Id: string;
  brand2Id: string;
  brand1: Brand;
  brand2: Brand;
  matchedAt: Date;
  status: 'active' | 'archived' | 'blocked';
  lastMessageAt?: Date;
  unreadCount: number;
}

export interface SwipeAction {
  id: string;
  fromBrandId: string;
  toBrandId: string;
  action: 'like' | 'pass' | 'super_like';
  timestamp: Date;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'document';
  timestamp: Date;
  read: boolean;
  fileUrl?: string;
  fileName?: string;
}

export interface User {
  id: string;
  email: string;
  brandId: string;
  role: 'owner' | 'representative' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
}

export interface SwipeFilters {
  industry?: string[];
  location?: string[];
  minInvestment?: number;
  maxInvestment?: number;
  franchiseFeeRange?: [number, number];
  establishedYearMin?: number;
  tags?: string[];
}

export type SwipeDirection = 'left' | 'right' | 'up';
export type Industry = 
  | 'Food & Beverage' 
  | 'Retail' 
  | 'Technology' 
  | 'Healthcare' 
  | 'Education' 
  | 'Fitness' 
  | 'Beauty & Wellness' 
  | 'Automotive' 
  | 'Real Estate' 
  | 'Entertainment'
  | 'Professional Services'
  | 'Home Services';