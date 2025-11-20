import BrandProfile from "@/components/BrandProfile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hồ sơ thương hiệu
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin thương hiệu và tối ưu hóa cơ hội kết nối
          </p>
        </div>

        <BrandProfile />
      </div>
    </div>
  );
}