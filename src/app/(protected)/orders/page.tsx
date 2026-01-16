'use client';

import { useState, useMemo, useEffect } from 'react';
import { useOrdersStore } from '@/stores/ordersStore';
import StatsCard from '@/components/ui/StatsCard';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CreateOrderOverlay from './components/CreateOrderOverlay';
import OrderListItem from './components/OrderListItem';

const statusConfig = {
  pending: {
    label: 'Chờ xác nhận',
    icon: ClockIcon,
    gradient: 'from-gray-500 to-slate-500',
    bg: 'from-gray-500/10 to-slate-500/10',
    border: 'border-gray-500/20',
    text: 'text-gray-400'
  },
  'in-progress': {
    label: 'Đang thực hiện',
    icon: FireIcon,
    gradient: 'from-orange-500 to-amber-500',
    bg: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400'
  },
  ready: {
    label: 'Sẵn sàng',
    icon: CheckCircleIcon,
    gradient: 'from-green-500 to-emerald-500',
    bg: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/20',
    text: 'text-green-400'
  },
  completed: {
    label: 'Hoàn thành',
    icon: CheckCircleIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400'
  },
  cancelled: {
    label: 'Đã hủy',
    icon: XCircleIcon,
    gradient: 'from-red-500 to-pink-500',
    bg: 'from-red-500/10 to-pink-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400'
  }
};

const ordersStats = [
  {
    id: 'total',
    label: 'Tổng đơn hàng',
    value: 0,
    icon: TruckIcon,
    colorScheme: 'purple' as const,
    subtitle: 'Hôm nay'
  },
  {
    id: 'pending',
    label: 'Chờ xác nhận',
    value: 0,
    icon: ClockIcon,
    colorScheme: 'orange' as const,
    subtitle: 'Cần xử lý ngay'
  },
  {
    id: 'processing',
    label: 'Đang nấu',
    value: 0,
    icon: FireIcon,
    colorScheme: 'blue' as const,
    subtitle: 'Trong bếp'
  },
  {
    id: 'completed',
    label: 'Hoàn thành',
    value: 0,
    icon: CheckCircleIcon,
    colorScheme: 'green' as const,
    subtitle: 'Đã phục vụ'
  },
  {
    id: 'cancelled',
    label: 'Đã hủy',
    value: 0,
    icon: XCircleIcon,
    colorScheme: 'red' as const,
    subtitle: 'Có vấn đề'
  }
];

export default function OrdersPage() {
  const { orders, stats, isLoading, fetchOrders, fetchStats } = useOrdersStore();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [fetchOrders, fetchStats]);

  const handleCreateOrder = (orderData: any) => {
    console.log('New order created:', orderData);
    // Order creation is handled in CreateOrderOverlay
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchSearch =
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [orders, selectedStatus, searchQuery]);


  // Calculate stats from API or fallback to manual calculation
  const totalOrders = stats?.overall?.totalOrders || orders.length;
  const pendingOrders = stats?.byStatus?.pending || orders.filter(o => o.status === 'pending').length;
  const processingOrders = stats?.byStatus?.['in-progress'] || orders.filter(o => o.status === 'in-progress').length;
  const completedOrders = stats?.byStatus?.completed || orders.filter(o => o.status === 'completed' || o.status === 'ready').length;
  const cancelledOrders = stats?.byStatus?.cancelled || orders.filter(o => o.status === 'cancelled').length;

  // Tính toán stats động
  const statsData = useMemo(() => {
    return ordersStats.map(stat => {
      let value = stat.value;

      switch (stat.id) {
        case 'total':
          value = totalOrders;
          break;
        case 'pending':
          value = pendingOrders;
          break;
        case 'processing':
          value = processingOrders;
          break;
        case 'completed':
          value = completedOrders;
          break;
        case 'cancelled':
          value = cancelledOrders;
          break;
      }
      return { ...stat, value };
    });
  }, [totalOrders, pendingOrders, processingOrders, completedOrders, cancelledOrders]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="purple"
        badgeText="Order Management"
        titleVietnamese="Quản lý đơn hàng"
        titleEnglish="Orders Management"
        description="Theo dõi và xử lý đơn hàng của khách hàng"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <StatsCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              icon={<Icon className="w-6 h-6" />}
              colorScheme={stat.colorScheme}
              subtitle={stat.subtitle}
            />
          );
        })}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Tìm kiếm đơn hàng theo mã, khách hàng, bàn..."
          theme="purple"
        />

        <button className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer">
          <FunnelIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
          <span>Lọc</span>
        </button>

        <button
          onClick={() => setIsOverlayOpen(true)}
          className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Tạo đơn mới</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${selectedStatus === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
        >
          Tất cả
        </button>
        {Object.entries(statusConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedStatus(key)}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${selectedStatus === key
              ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
              : `bg-gradient-to-r ${config.bg} border ${config.border} ${config.text} hover:scale-105`
              }`}
          >
            <config.icon className="w-4 h-4" />
            <span>{config.label}</span>
          </button>
        ))}
      </div>


      {/* Orders List */}
      {isLoading ? (
        <LoadingSpinner message="Đang tải đơn hàng..." />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending; // Fallback
            return (
              <OrderListItem key={order._id} order={order} config={config} />
            );
          })}
        </div>
      )}


      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
          <div className="text-7xl mb-6">📦</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Không có đơn hàng nào
          </h3>
          <p className="text-gray-400 mb-6">
            Không tìm thấy đơn hàng phù hợp
          </p>
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Tạo đơn hàng mới
          </button>
        </div>
      )}

      {/* Create Order Overlay */}
      <CreateOrderOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </div>
  );
}