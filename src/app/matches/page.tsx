import MatchesList from "@/components/MatchesList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kết nối của bạn
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi các thương hiệu đã kết nối với bạn
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-sm text-gray-600">Kết nối hoạt động</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">7</div>
              <div className="text-sm text-gray-600">Tin nhắn chưa đọc</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-sm text-gray-600">Tổng số lượt quan tâm</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Danh sách kết nối</CardTitle>
          </CardHeader>
          <CardContent>
            <MatchesList />
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Mẹo để duy trì kết nối hiệu quả
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>• Phản hồi nhanh chóng:</strong> Trả lời tin nhắn trong vòng 24h
                </div>
                <div>
                  <strong>• Chia sẻ minh bạch:</strong> Cung cấp thông tin chi tiết về điều kiện
                </div>
                <div>
                  <strong>• Đặt câu hỏi đúng:</strong> Tìm hiểu kỹ về mô hình kinh doanh
                </div>
                <div>
                  <strong>• Lên kế hoạch:</strong> Sắp xếp cuộc họp hoặc tham quan thực tế
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}