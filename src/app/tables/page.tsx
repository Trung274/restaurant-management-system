'use client';

import { useState, useMemo } from 'react';
import StatsCard from '@/components/ui/StatsCard';
import { tables, tableStats, statusConfig } from './mockData';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function TablesPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState('all');

  // Calculate dynamic stats
  const calculatedStats = useMemo(() => {
    const totalTables = tables.length;
    const availableCount = tables.filter(t => t.status === 'available').length;
    const occupiedCount = tables.filter(t => t.status === 'occupied').length;
    const reservedCount = tables.filter(t => t.status === 'reserved').length;
    const cleaningCount = tables.filter(t => t.status === 'cleaning').length;

    return tableStats.map(stat => {
      let value = stat.value;
      switch(stat.id) {
        case 'total':
          value = totalTables;
          break;
        case 'available':
          value = availableCount;
          break;
        case 'occupied':
          value = occupiedCount;
          break;
        case 'reserved':
          value = reservedCount;
          break;
        case 'cleaning':
          value = cleaningCount;
          break;
      }
      return { ...stat, value };
    });
  }, []);

  const filteredTables = tables.filter(table => {
    const statusMatch = selectedStatus === 'all' || table.status === selectedStatus;
    const floorMatch = selectedFloor === 'all' || table.floor === selectedFloor;
    return statusMatch && floorMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Table Management
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Quản lý bàn ăn
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mt-2">
            Tables Management
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Theo dõi trạng thái và phân bổ bàn ăn trong nhà hàng
        </p>
      </div>

      {/* Stats Overview - REFACTORED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {calculatedStats.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            colorScheme={stat.colorScheme}
          />
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm bàn theo số, tầng, khu vực..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Floor Filter */}
        <select 
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 focus:outline-none focus:border-green-500/50 cursor-pointer"
        >
          <option value="all" className="bg-gray-800">Tất cả tầng</option>
          <option value="Tầng 1" className="bg-gray-800">Tầng 1</option>
          <option value="Tầng 2" className="bg-gray-800">Tầng 2</option>
        </select>

        {/* Add Table Button */}
        <button className="group relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          <span>Thêm bàn mới</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
            selectedStatus === 'all'
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Tất cả bàn
        </button>
        {Object.entries(statusConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedStatus(key)}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedStatus === key
                ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                : `bg-gradient-to-r ${config.bg} border ${config.border} ${config.text} hover:scale-105`
            }`}
          >
            <config.icon className="w-4 h-4" />
            <span>{config.label}</span>
          </button>
        ))}
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTables.map((table) => {
          const config = statusConfig[table.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <div
              key={table.id}
              className={`group relative bg-gradient-to-br ${config.bg} backdrop-blur-sm border ${config.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

              {/* Pulse effect for available tables */}
              {config.pulse && (
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-20 animate-pulse rounded-2xl`}></div>
              )}

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}>
                        {table.number}
                      </h3>
                      {table.section === 'VIP' && (
                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-full">
                          VIP
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{table.floor}</p>
                  </div>

                  <div className={`p-3 rounded-xl bg-gradient-to-r ${config.bg} border ${config.border}`}>
                    <StatusIcon className={`w-6 h-6 ${config.text}`} />
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${config.gradient} text-white mb-4`}>
                  <span className={config.pulse ? 'w-1.5 h-1.5 bg-white rounded-full animate-pulse' : ''}></span>
                  {config.label}
                </div>

                {/* Table Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Sức chứa:</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      {table.capacity} người
                    </span>
                  </div>

                  {table.status === 'occupied' && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Khách hiện tại:</span>
                        <span className={`font-medium ${config.text}`}>
                          {table.currentGuests}/{table.capacity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Thời gian:</span>
                        <span className={`font-medium ${config.text} flex items-center gap-1`}>
                          <ClockIcon className="w-4 h-4" />
                          {table.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Mã đơn:</span>
                        <span className="text-white font-mono text-xs">
                          {table.orderId}
                        </span>
                      </div>
                    </>
                  )}

                  {table.status === 'reserved' && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Thời gian đặt:</span>
                        <span className={`font-medium ${config.text}`}>
                          {table.reservedTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Mã đơn:</span>
                        <span className="text-white font-mono text-xs">
                          {table.orderId}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {table.status === 'available' && (
                    <button className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white font-medium hover:shadow-lg transition-all`}>
                      Đặt bàn
                    </button>
                  )}
                  {table.status === 'occupied' && (
                    <>
                      <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                        Chi tiết
                      </button>
                      <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium hover:shadow-lg hover:shadow-red-500/50 transition-all">
                        Thanh toán
                      </button>
                    </>
                  )}
                  {table.status === 'reserved' && (
                    <>
                      <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                        Chi tiết
                      </button>
                      <button className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white font-medium hover:shadow-lg transition-all`}>
                        Check-in
                      </button>
                    </>
                  )}
                  {table.status === 'cleaning' && (
                    <button className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white font-medium hover:shadow-lg transition-all`}>
                      Hoàn tất
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTables.length === 0 && (
        <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
          <div className="text-7xl mb-6">🪑</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Không tìm thấy bàn nào
          </h3>
          <p className="text-gray-400 mb-6">
            Không có bàn nào phù hợp với bộ lọc hiện tại
          </p>
          <button 
            onClick={() => {
              setSelectedStatus('all');
              setSelectedFloor('all');
            }}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Floor Plan View Toggle */}
      <div className="mt-10 relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        
        <div className="relative text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Chế độ xem sơ đồ mặt bằng
          </h2>
          <p className="text-gray-300">
            Xem trực quan vị trí và trạng thái tất cả các bàn trong nhà hàng
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
            <span>🗺️</span>
            <span>Xem sơ đồ mặt bằng</span>
          </button>
        </div>
      </div>
    </div>
  );
}