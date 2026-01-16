'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePaymentsStore } from '@/stores/paymentsStore';
import StatsCard from '@/components/ui/StatsCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';

export default function RevenuePage() {
  const { stats, fetchStats, isLoading } = usePaymentsStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'thisMonth'>('today');

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const periods = [
    { key: 'today', label: 'Hôm nay', icon: '📅' },
    { key: 'thisMonth', label: 'Tháng này', icon: '🗓️' },
  ];

  // Map payment method names
  const paymentMethodLabels: Record<string, string> = {
    'cash': 'Tiền mặt',
    'card': 'Thẻ',
    'bank-transfer': 'Chuyển khoản',
    'others': 'Khác'
  };

  const paymentMethodColors: Record<string, string> = {
    'cash': 'from-green-500 to-emerald-500',
    'card': 'from-blue-500 to-cyan-500',
    'bank-transfer': 'from-purple-500 to-pink-500',
    'others': 'from-orange-500 to-amber-500'
  };

  // Calculate stats for selected period
  const currentData = useMemo(() => {
    if (!stats) return null;

    const periodData = selectedPeriod === 'today' ? stats.today : stats.thisMonth;

    return {
      revenue: periodData.totalRevenue,
      orders: periodData.totalPayments,
      avgOrderValue: periodData.totalPayments > 0 ? periodData.totalRevenue / periodData.totalPayments : 0,
    };
  }, [stats, selectedPeriod]);

  // Stats data for cards
  const statsData = useMemo(() => {
    if (!currentData || !stats) return [];

    return [
      {
        id: 'revenue',
        label: 'Doanh thu',
        value: `${(currentData.revenue / 1000000).toFixed(1)}M`,
        icon: BanknotesIcon,
        colorScheme: 'green' as const,
        subtitle: selectedPeriod === 'today' ? 'Hôm nay' : 'Tháng này'
      },
      {
        id: 'orders',
        label: 'Đơn hàng',
        value: currentData.orders,
        icon: ShoppingCartIcon,
        colorScheme: 'blue' as const,
        subtitle: `${currentData.orders} thanh toán`
      },
      {
        id: 'avgOrderValue',
        label: 'Giá trị TB',
        value: `${(currentData.avgOrderValue / 1000).toFixed(0)}K`,
        icon: ChartBarIcon,
        colorScheme: 'purple' as const,
        subtitle: 'Trung bình/đơn'
      },
      {
        id: 'totalRevenue',
        label: 'Tổng doanh thu',
        value: `${(stats.overall.totalRevenue / 1000000).toFixed(1)}M`,
        icon: CurrencyDollarIcon,
        colorScheme: 'orange' as const,
        subtitle: 'Tất cả thời gian'
      }
    ];
  }, [currentData, stats, selectedPeriod]);

  // Format daily revenue for chart
  const dailyRevenueData = useMemo(() => {
    if (!stats?.dailyRevenue) return [];

    return stats.dailyRevenue.map(item => ({
      day: new Date(item.date).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' }),
      revenue: item.revenue,
      orders: item.count
    }));
  }, [stats]);

  // Top 5 best selling items
  const topProducts = useMemo(() => {
    if (!stats?.bestSellingItems) return [];
    return stats.bestSellingItems.slice(0, 5);
  }, [stats]);

  // Payment methods with percentages
  const paymentMethodsData = useMemo(() => {
    if (!stats?.byPaymentMethod) return [];

    const total = stats.byPaymentMethod.reduce((sum, m) => sum + m.totalAmount, 0);

    return stats.byPaymentMethod.map(method => ({
      method: paymentMethodLabels[method._id] || method._id,
      amount: method.totalAmount,
      percentage: total > 0 ? Math.round((method.totalAmount / total) * 100) : 0,
      color: paymentMethodColors[method._id] || 'from-gray-500 to-gray-600'
    }));
  }, [stats]);

  if (isLoading && !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
        <LoadingSpinner message="Đang tải dữ liệu doanh thu..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="green"
        badgeText="Revenue Analytics"
        titleVietnamese="Doanh thu & Báo cáo"
        titleEnglish="Revenue Analytics"
        description="Theo dõi và phân tích doanh thu chi tiết của nhà hàng"
        actions={
          <>
            <button
              onClick={() => fetchStats()}
              className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <ArrowPathIcon className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
              <span>Làm mới</span>
            </button>
          </>
        }
      />

      {/* Period Selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {periods.map((period) => (
          <button
            key={period.key}
            onClick={() => setSelectedPeriod(period.key as typeof selectedPeriod)}
            className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 cursor-pointer ${selectedPeriod === period.key
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:scale-105'
              }`}
          >
            <span className="text-2xl">{period.icon}</span>
            <div className="text-left">
              <p className="font-semibold">{period.label}</p>
              <p className="text-xs opacity-75">
                {period.key === 'today' ? 'Theo giờ' : '30 ngày qua'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}

            colorScheme={stat.colorScheme}
            subtitle={stat.subtitle}
          />
        ))}
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
              {dailyRevenueData.map((item, index) => {
                const maxRevenue = Math.max(...dailyRevenueData.map(d => d.revenue));
                const percentage = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;

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
                    <div className={`w-10 h-10 bg-gradient-to-r ${index === 0 ? 'from-yellow-500 to-amber-500' :
                      index === 1 ? 'from-gray-400 to-gray-500' :
                        index === 2 ? 'from-orange-500 to-amber-600' :
                          'from-blue-500 to-cyan-500'
                      } rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold truncate mb-1">{product.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{product.totalQuantity} đã bán</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                        {(product.totalRevenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
            {paymentMethodsData.map((method, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{method.method}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-400">{method.percentage}%</span>
                    <span className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${method.color}`}>
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
              {stats ? (paymentMethodsData.reduce((sum, m) => sum + m.amount, 0) / 1000000).toFixed(1) : 0}M đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}