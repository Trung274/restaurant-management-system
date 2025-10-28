'use client';

import StatsCard from '@/components/ui/StatsCard';
import QuickActionCard from './components/QuickActionCard';
import { dashboardStats, quickActions } from './mockData';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Tổng quan nhà hàng
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Chào mừng trở lại
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
            Nhà hàng ABCDE
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Theo dõi hoạt động kinh doanh và hiệu suất nhà hàng
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {dashboardStats.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            colorScheme={stat.colorScheme}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Chart Section */}
      <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 overflow-hidden mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Doanh thu theo thời gian
              </h2>
              <p className="text-gray-400">
                Theo dõi xu hướng và hiệu suất kinh doanh
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-all">
                Hôm nay
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                7 ngày
              </button>
              <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-all">
                30 ngày
              </button>
            </div>
          </div>

          <div className="h-72 flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-slate-800/50 rounded-2xl border border-white/5">
            <div className="text-center space-y-4">
              <div className="text-7xl">📊</div>
              <p className="text-gray-400 text-lg">
                Biểu đồ doanh thu sẽ hiển thị ở đây
              </p>
              <p className="text-gray-500 text-sm">
                Tích hợp với Recharts để hiển thị dữ liệu theo thời gian
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.id}
            title={action.title}
            description={action.description}
            emoji={action.emoji}
            gradientFrom={action.gradientFrom}
            gradientTo={action.gradientTo}
            onClick={() => console.log(`Clicked: ${action.title}`)}
          />
        ))}
      </div>
    </div>
  );
}