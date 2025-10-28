import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                Restaurant Management System
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              Quản lý nhà hàng
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                chuyên nghiệp
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Giải pháp toàn diện giúp tối ưu hóa vận hành, nâng cao trải nghiệm khách hàng 
              và tăng trưởng doanh thu cho nhà hàng của bạn
            </p>

            <div className="flex items-center justify-center gap-4 mt-12">
              <Link 
                href="/dashboard"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Truy cập Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Tính năng nổi bật
          </h2>
          <p className="text-gray-400 text-lg">
            Tất cả những gì bạn cần để vận hành nhà hàng hiệu quả
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <FeatureCard
            icon="⚡"
            title="Xử lý nhanh chóng"
            description="Giao diện trực quan, xử lý đơn hàng chỉ trong vài giây"
            gradient="from-yellow-500/10 to-orange-500/10"
            borderColor="border-yellow-500/20"
          />
          
          <FeatureCard
            icon="📊"
            title="Thống kê chi tiết"
            description="Báo cáo doanh thu và phân tích xu hướng theo thời gian thực"
            gradient="from-blue-500/10 to-cyan-500/10"
            borderColor="border-blue-500/20"
          />
          
          <FeatureCard
            icon="🔒"
            title="Bảo mật tuyệt đối"
            description="Mã hóa dữ liệu và phân quyền người dùng chuyên nghiệp"
            gradient="from-green-500/10 to-emerald-500/10"
            borderColor="border-green-500/20"
          />
          
          <FeatureCard
            icon="📱"
            title="Đa nền tảng"
            description="Hoạt động mượt mà trên mọi thiết bị: desktop, tablet, mobile"
            gradient="from-purple-500/10 to-pink-500/10"
            borderColor="border-purple-500/20"
          />
          
          <FeatureCard
            icon="🔔"
            title="Thông báo realtime"
            description="Cập nhật đơn hàng và trạng thái bàn tức thời"
            gradient="from-red-500/10 to-rose-500/10"
            borderColor="border-red-500/20"
          />
          
          <FeatureCard
            icon="⚙️"
            title="Tùy chỉnh linh hoạt"
            description="Cấu hình hệ thống phù hợp với quy mô và nhu cầu riêng"
            gradient="from-indigo-500/10 to-violet-500/10"
            borderColor="border-indigo-500/20"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          
          <div className="relative text-center space-y-6">
            <h2 className="text-4xl font-bold text-white">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hãy để chúng tôi giúp bạn đưa nhà hàng lên một tầm cao mới
            </p>
            <Link 
              href="/dashboard"
              className="inline-block px-10 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Bắt đầu ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-500">
          <p>© 2025 Restaurant Management System. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient, 
  borderColor 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  gradient: string; 
  borderColor: string;
}) {
  return (
    <div className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-sm border ${borderColor} rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      
      <div className="relative">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}