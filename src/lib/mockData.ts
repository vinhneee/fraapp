export interface Brand {
  id: string;
  name: string;
  industry: string;
  location: string;
  totalLocations: number;
  franchiseFee: number;
  minimumInvestment: number;
  description: string;
}

export interface Match {
  id: string;
  brand1Id: string;
  brand2Id: string;
  brand1: Brand;
  brand2: Brand;
  matchScore: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export const MOCK_BRANDS: Brand[] = [
  {
    id: "1",
    name: "Phở 24",
    industry: "Đồ ăn nhanh",
    location: "Hà Nội",
    totalLocations: 50,
    franchiseFee: 500000000, // 500 triệu VND
    minimumInvestment: 2000000000, // 2 tỷ VND
    description: "Chuỗi cửa hàng phở nổi tiếng với hương vị truyền thống."
  },
  {
    id: "2",
    name: "Cà phê ABC",
    industry: "Cà phê",
    location: "TP.HCM",
    totalLocations: 30,
    franchiseFee: 300000000, // 300 triệu VND
    minimumInvestment: 1000000000, // 1 tỷ VND
    description: "Chuỗi cà phê với không gian hiện đại và đa dạng menu."
  },
  {
    id: "3",
    name: "Trà sữa XYZ",
    industry: "Đồ uống",
    location: "Đà Nẵng",
    totalLocations: 25,
    franchiseFee: 200000000, // 200 triệu VND
    minimumInvestment: 800000000, // 800 triệu VND
    description: "Thương hiệu trà sữa được yêu thích với công thức độc quyền."
  },
  {
    id: "4",
    name: "Bánh mì DEF",
    industry: "Bánh mì",
    location: "Cần Thơ",
    totalLocations: 15,
    franchiseFee: 150000000, // 150 triệu VND
    minimumInvestment: 500000000, // 500 triệu VND
    description: "Bánh mì ngon với nhân thịt nướng và rau tươi."
  }
];

export const MOCK_MATCHES: Match[] = [
  {
    id: "match1",
    brand1Id: "1",
    brand2Id: "2",
    brand1: MOCK_BRANDS[0],
    brand2: MOCK_BRANDS[1],
    matchScore: 85,
    status: 'pending',
    createdAt: new Date('2024-01-15')
  },
  {
    id: "match2",
    brand1Id: "1",
    brand2Id: "3",
    brand1: MOCK_BRANDS[0],
    brand2: MOCK_BRANDS[2],
    matchScore: 78,
    status: 'accepted',
    createdAt: new Date('2024-01-10')
  },
  {
    id: "match3",
    brand1Id: "2",
    brand2Id: "4",
    brand1: MOCK_BRANDS[1],
    brand2: MOCK_BRANDS[3],
    matchScore: 92,
    status: 'pending',
    createdAt: new Date('2024-01-20')
  }
];
