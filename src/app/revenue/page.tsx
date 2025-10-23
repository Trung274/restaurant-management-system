'use client';

import { useState } from 'react';
import StatsCard from '@/components/ui/StatsCard';
import { revenueData, dailyRevenue, topProducts, paymentMethods, revenueByTimeSlot } from './mockData';
import { 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  UsersIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowPathIcon,
  DocumentChartBarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function RevenuePage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const currentData = revenueData[selectedPeriod];

  const periods = [
    { key: 'today', label: 'Hôm nay', icon: '📅' },
    { key: 'week', label: 'Tuần này', icon: '📆' },
    { key: 'month', label: 'Tháng này', icon: '🗓️' },
    { key: 'year', label: 'Năm nay', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Revenue Analytics
          </span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Doanh thu & Báo cáo
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mt-2">
                Revenue Analytics
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Theo dõi và phân tích doanh thu chi tiết của nhà hàng
            </p>
          </div>
          <div className="flex gap-3">
            <button className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 flex items-center gap-2">
              <ArrowPathIcon className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
              <span>Làm mới</span>
            </button>
            <button className="group relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <DocumentChartBarIcon className="w-5 h-5" />
              <span>Xuất báo cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {periods.map((period) => (
          <button
            key={period.key}
            onClick={() => setSelectedPeriod(period.key as typeof selectedPeriod)}
            className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
              selectedPeriod === period.key
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:scale-105'
            }`}
          >
            <span className="text-2xl">{period.icon}</span>
            <div className="text-left">
              <p className="font-semibold">{period.label}</p>
              <p className="text-xs opacity-75">
                {period.key === 'today' ? 'Theo giờ' : 
                 period.key === 'week' ? '7 ngày qua' :
                 period.key === 'month' ? '30 ngày qua' : '12 tháng qua'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="group relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <BanknotesIcon className="w-8 h-8 text-green-400" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                currentData.change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {currentData.change > 0 ? (
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4" />
                )}
                {Math.abs(currentData.change)}%
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Tổng doanh thu</p>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-1">
              {(currentData.revenue / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-500">
              {selectedPeriod === 'today' ? 'Hôm nay' :
               selectedPeriod === 'week' ? 'Tuần này' :
               selectedPeriod === 'month' ? 'Tháng này' : 'Năm nay'}
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <ShoppingCartIcon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl">🛒</div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Tổng đơn hàng</p>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">
              {currentData.orders}
            </p>
            <p className="text-xs text-gray-500">Đơn đã hoàn thành</p>
          </div>
        </div>

        {/* Total Customers */}
        <div className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <UsersIcon className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-3xl">👥</div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Tổng khách hàng</p>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
              {currentData.customers}
            </p>
            <p className="text-xs text-gray-500">Khách đã phục vụ</p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="group relative bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <ChartBarIcon className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl">💰</div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Giá trị TB/đơn</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-1">
              {(currentData.avgOrderValue / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-gray-500">Trung bình mỗi đơn</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Revenue Chart */}
        <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Doanh thu theo ngày</h2>
                <p className="text-gray-300 text-sm">7 ngày gần nhất</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <ChartBarIcon className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="space-y-3">
              {dailyRevenue.map((item, index) => {
                const maxRevenue = Math.max(...dailyRevenue.map(d => d.revenue));
                const percentage = (item.revenue / maxRevenue) * 100;
                
                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-400">{item.day}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{item.orders} đơn</span>
                        <span className="text-sm font-bold text-white">
                          {(item.revenue / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500 group-hover:from-blue-400 group-hover:to-cyan-400"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="relative bg-gradient-to-br from-orange-600/20 to-amber-600/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Món bán chạy nhất</h2>
                <p className="text-gray-300 text-sm">Top 5 sản phẩm</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <span className="text-2xl">🏆</span>
              </div>
            </div>

            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${
                      index === 0 ? 'from-yellow-500 to-amber-500' :
                      index === 1 ? 'from-gray-400 to-gray-500' :
                      index === 2 ? 'from-orange-500 to-amber-600' :
                      'from-blue-500 to-cyan-500'
                    } rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold truncate mb-1">{product.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{product.sold} đã bán</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-green-400">
                          <ArrowTrendingUpIcon className="w-3 h-3" />
                          {product.growth}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                        {(product.revenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Time Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Payment Methods */}
        <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Phương thức thanh toán</h2>
                <p className="text-gray-300 text-sm">Phân bổ theo hình thức</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <CurrencyDollarIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{method.method}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-400">{method.percentage}%</span>
                      <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${method.color}">
                        {(method.amount / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${method.color} rounded-full transition-all duration-500`}
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Tổng thanh toán</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {(paymentMethods.reduce((sum, m) => sum + m.amount, 0) / 1000000).toFixed(1)}M đ
              </p>
            </div>
          </div>
        </div>

        {/* Revenue by Time Slot */}
        <div className="relative bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Doanh thu theo khung giờ</h2>
                <p className="text-gray-300 text-sm">Phân tích giờ cao điểm</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CalendarIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {revenueByTimeSlot.map((slot, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:scale-105 transition-all duration-300`}
                >
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-white">{slot.time}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${slot.color} text-white`}>
                        {slot.percentage}%
                      </span>
                    </div>
                    <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${slot.color}`}>
                      {(slot.revenue / 1000000).toFixed(1)}M
                    </p>
                    <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${slot.color} rounded-full`}
                        style={{ width: `${slot.percentage * 2.5}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="text-sm text-gray-400">Khung giờ đông nhất</p>
                  <p className="text-lg font-bold text-green-400">10-14h & 17-22h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison & Insights */}
      <div className="relative bg-gradient-to-br from-indigo-600/20 to-violet-600/20 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">📈 Phân tích & Thống kê</h2>
              <p className="text-gray-300">So sánh và xu hướng doanh thu</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tăng trưởng</p>
                  <p className="text-2xl font-bold text-green-400">+22.4%</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">So với cùng kỳ năm trước</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mục tiêu tháng</p>
                  <p className="text-2xl font-bold text-blue-400">85%</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">Đạt 342M / 400M mục tiêu</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Đánh giá TB</p>
                  <p className="text-2xl font-bold text-purple-400">4.8/5</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">Từ 1,089 khách hàng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}