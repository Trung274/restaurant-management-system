'use client';

import LoginForm from '@/components/forms/LoginForm';
import {
  CheckCircleIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CubeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function LoginPage() {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Quản lý doanh thu',
      description: 'Theo dõi và phân tích doanh thu chi tiết theo thời gian thực',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: UserGroupIcon,
      title: 'Quản lý khách hàng',
      description: 'Chương trình khách hàng thân thiết và quản lý thông tin',
      iconColor: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20'
    },
    {
      icon: ShoppingBagIcon,
      title: 'Quản lý đơn hàng',
      description: 'Xử lý đơn hàng nhanh chóng và hiệu quả',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: CubeIcon,
      title: 'Quản lý thực đơn',
      description: 'Cập nhật và quản lý thực đơn dễ dàng',
      iconColor: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  const benefits = [
    'Giao diện hiện đại và dễ sử dụng',
    'Báo cáo chi tiết và trực quan',
    'Hỗ trợ đa thiết bị',
    'Bảo mật cao với mã hóa dữ liệu',
    'Cập nhật thời gian thực',
    'Hỗ trợ 24/7'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <LoginForm />
      </div>

      {/* Right Side - Introduction */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

        {/* Animated Circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="w-full max-w-2xl relative z-10 space-y-8">
          {/* Main Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              Hệ thống quản lý nhà hàng hiện đại
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">
              Quản lý thông minh
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mt-2">
                Tăng trưởng bền vững
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Giải pháp toàn diện cho việc quản lý và vận hành nhà hàng của bạn
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} border ${feature.borderColor} mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Benefits List */}
          <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircleIcon className="w-7 h-7 text-green-400" />
              Lợi ích khi sử dụng
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { number: '500+', label: 'Nhà hàng tin dùng' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Hỗ trợ' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl"
              >
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                  {stat.number}
                </p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}