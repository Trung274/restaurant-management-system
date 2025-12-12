'use client';

import { useState, useMemo } from 'react';
import { orders, statusConfig, ordersStats } from './mockData';
import StatsCard from '@/components/ui/StatsCard';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import CreateOrderOverlay from './components/CreateOrderOverlay';

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleCreateOrder = (orderData: any) => {
    console.log('New order created:', orderData);
    // TODO: Add order to the list or send to backend
  };

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'preparing' || o.status === 'delivering').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;

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

      {/* Stats Overview - Sử dụng StatsCard component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statsData.map((stat) => (
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

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Tìm kiếm đơn hàng theo mã, khách hàng, bàn..."
          theme="purple"
        />

        {/* Filter Button */}
        <button className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer">
          <FunnelIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
          <span>Lọc</span>
        </button>

        {/* New Order Button */}
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
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const config = statusConfig[order.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <div
              key={order.id}
              className={`group relative bg-gradient-to-br ${config.bg} backdrop-blur-sm border ${config.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Avatar */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-full blur opacity-30`}></div>
                    <img
                      src={order.avatar}
                      alt={order.customer}
                      className="relative w-14 h-14 rounded-full border-2 border-white/20"
                    />
                  </div>

                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${config.gradient} text-white flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        👤 {order.customer}
                      </span>
                      <span className="flex items-center gap-1">
                        🪑 {order.table}
                      </span>
                      <span className="flex items-center gap-1">
                        📦 {order.items} món
                      </span>
                      <span className="flex items-center gap-1">
                        🕐 {order.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                  {/* Total */}
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Tổng tiền</p>
                    <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}>
                      {order.total.toLocaleString('vi-VN')}đ
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all">
                      Chi tiết
                    </button>
                    {order.status === 'pending' && (
                      <button className={`px-4 py-2 bg-gradient-to-r ${config.gradient} rounded-lg text-white hover:shadow-lg transition-all`}>
                        Xác nhận
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
          <div className="text-7xl mb-6">📦</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Không có đơn hàng nào
          </h3>
          <p className="text-gray-400 mb-6">
            Chưa có đơn hàng {selectedStatus !== 'all' && `ở trạng thái "${statusConfig[selectedStatus as keyof typeof statusConfig].label}"`}
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
            Tạo đơn hàng mới
          </button>
        </div>
      )}

      {/* Create Order Overlay */}
      <CreateOrderOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onSubmit={handleCreateOrder}
      />
    </div>
  );
}