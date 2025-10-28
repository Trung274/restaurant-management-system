'use client';

import { useState, useMemo } from 'react';
import { kitchenOrders, statusConfig, priorityConfig, itemStatusConfig, kitchenStats } from './mockData';
import StatsCard from '@/components/ui/StatsCard';
import {
    FireIcon,
    ClockIcon,
    CheckCircleIcon,
    BellAlertIcon,
    FunnelIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';

export default function KitchenPage() {
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredOrders = selectedStatus === 'all'
        ? kitchenOrders
        : kitchenOrders.filter(order => order.status === selectedStatus);

    const pendingCount = kitchenOrders.filter(o => o.status === 'pending').length;
    const cookingCount = kitchenOrders.filter(o => o.status === 'cooking').length;
    const readyCount = kitchenOrders.filter(o => o.status === 'ready').length;
    const urgentCount = kitchenOrders.filter(o => o.priority === 'urgent').length;

    // Tính toán stats động
    const statsData = useMemo(() => {
        return kitchenStats.map(stat => {
            let value = stat.value;

            switch (stat.id) {
                case 'total':
                    value = kitchenOrders.length;
                    break;
                case 'pending':
                    value = pendingCount;
                    break;
                case 'cooking':
                    value = cookingCount;
                    break;
                case 'ready':
                    value = readyCount;
                    break;
            }

            return { ...stat, value };
        });
    }, [pendingCount, cookingCount, readyCount]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
            {/* Header */}
            <PageHeader
                theme="red"
                badgeText="Kitchen Display System"
                titleVietnamese="Màn hình bếp"
                titleEnglish="Kitchen Display"
                description="Theo dõi và xử lý đơn hàng từ bếp"
            />

            {/* Stats Overview - Sử dụng StatsCard component */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            {/* Alert Banner for Urgent Orders */}
            {urgentCount > 0 && (
                <div className="mb-8 relative bg-gradient-to-r from-red-600/30 to-orange-600/30 backdrop-blur-sm border border-red-500/40 rounded-2xl p-6 overflow-hidden animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="p-3 bg-red-500/20 rounded-xl">
                            <BellAlertIcon className="w-8 h-8 text-red-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">
                                Cảnh báo: {urgentCount} đơn hàng khẩn cấp!
                            </h3>
                            <p className="text-red-200">
                                Có đơn hàng ưu tiên cao cần được xử lý ngay lập tức
                            </p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300">
                            Xem ngay
                        </button>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
                {/* Status Filters */}
                <button
                    onClick={() => setSelectedStatus('all')}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${selectedStatus === 'all'
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30'
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

                <div className="flex-1"></div>

                {/* Action Buttons */}
                <button className="group relative px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                    <FunnelIcon className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    <span>Lọc</span>
                </button>

                <button className="group relative px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                    <ArrowPathIcon className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                    <span>Làm mới</span>
                </button>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrders.map((order) => {
                    const config = statusConfig[order.status as keyof typeof statusConfig];
                    const priorityInfo = priorityConfig[order.priority as keyof typeof priorityConfig];
                    const StatusIcon = config.icon;

                    return (
                        <div
                            key={order.id}
                            className={`group relative bg-gradient-to-br ${config.bg} backdrop-blur-sm border ${config.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden ${order.priority === 'urgent' ? 'ring-2 ring-red-500/50' : ''
                                }`}
                        >
                            {/* Pulse effect for urgent orders */}
                            {order.priority === 'urgent' && (
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse rounded-2xl"></div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                            <div className="relative">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-2xl font-bold text-white">{order.id}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${priorityInfo.bg} ${priorityInfo.color}`}>
                                                {priorityInfo.icon} {priorityInfo.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                🪑 {order.table}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                👤 {order.waiter}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${config.bg} border ${config.border}`}>
                                        <StatusIcon className={`w-6 h-6 ${config.text}`} />
                                    </div>
                                </div>

                                {/* Status & Time */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${config.gradient} text-white flex items-center gap-1.5`}>
                                        {config.pulse && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                                        {config.label}
                                    </span>
                                    <span className="text-sm text-gray-400 flex items-center gap-1">
                                        <ClockIcon className="w-4 h-4" />
                                        {order.orderTime}
                                    </span>
                                </div>

                                {/* Estimated Time */}
                                {order.estimatedTime && (
                                    <div className={`mb-4 p-3 rounded-xl bg-gradient-to-r ${config.bg} border ${config.border}`}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-400">Thời gian còn lại:</span>
                                            <span className={`text-lg font-bold ${config.text}`}>
                                                {order.estimatedTime}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Items List */}
                                <div className="space-y-2 mb-4">
                                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Món ăn:</h4>
                                    {order.items.map((item, index) => {
                                        const itemConfig = itemStatusConfig[item.status as keyof typeof itemStatusConfig];
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-white font-medium">{item.name}</span>
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${itemConfig.bg} ${itemConfig.color}`}>
                                                            {itemConfig.label}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-gray-400">Số lượng: {item.quantity}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    {order.status === 'pending' && (
                                        <button className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2`}>
                                            <FireIcon className="w-5 h-5" />
                                            Bắt đầu nấu
                                        </button>
                                    )}
                                    {order.status === 'cooking' && (
                                        <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2">
                                            <CheckCircleIcon className="w-5 h-5" />
                                            Hoàn thành
                                        </button>
                                    )}
                                    {order.status === 'ready' && (
                                        <>
                                            <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
                                                Chi tiết
                                            </button>
                                            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                                                Giao món
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
                    <div className="text-7xl mb-6">🍳</div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Không có đơn hàng nào
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Tất cả đơn hàng đã được xử lý xong
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105">
                        Làm mới danh sách
                    </button>
                </div>
            )}

            {/* Performance Stats */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="relative">
                        <h3 className="text-lg font-semibold text-white mb-2">Thời gian trung bình</h3>
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                            12 phút
                        </p>
                        <p className="text-sm text-gray-400 mt-2">⬇️ -15% so với hôm qua</p>
                    </div>
                </div>

                <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="relative">
                        <h3 className="text-lg font-semibold text-white mb-2">Món đã hoàn thành</h3>
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            47
                        </p>
                        <p className="text-sm text-gray-400 mt-2">📈 +8% so với hôm qua</p>
                    </div>
                </div>

                <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="relative">
                        <h3 className="text-lg font-semibold text-white mb-2">Hiệu suất bếp</h3>
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            94%
                        </p>
                        <p className="text-sm text-gray-400 mt-2">✨ Xuất sắc</p>
                    </div>
                </div>
            </div>
        </div>
    );
}