'use client';

import { useEffect } from 'react';
import { useOrdersStore } from '@/stores/ordersStore';
import {
    ShoppingCartIcon,
    ClockIcon,
    CheckCircleIcon,
    FireIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export default function OrderStatsSection() {
    const { stats, fetchStats, isLoading } = useOrdersStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    // Debug logging
    useEffect(() => {
        if (stats) {
            console.log('OrderStatsSection - stats:', stats);
        }
    }, [stats]);

    if (isLoading && !stats) {
        return (
            <div className="animate-pulse bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 h-64"></div>
        );
    }

    if (!stats) return null;

    return (
        <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">📦 Thống kê đơn hàng</h2>
                        <p className="text-gray-400">Tổng quan tình hình đơn hàng của nhà hàng</p>
                    </div>
                    <a
                        href="/orders"
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                    >
                        Xem chi tiết →
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Total Orders */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <ShoppingCartIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                                Tổng số
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.overall?.totalOrders || 0}</p>
                        <p className="text-sm text-gray-400">Tất cả đơn hàng</p>
                    </div>

                    {/* Pending */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-orange-500/20 rounded-lg">
                                <ClockIcon className="w-5 h-5 text-orange-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full">
                                Chờ xử lý
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.byStatus?.pending || 0}</p>
                        <p className="text-sm text-gray-400">Đơn đang chờ</p>
                    </div>

                    {/* In Progress */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <FireIcon className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full">
                                Đang làm
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.byStatus?.['in-progress'] || 0}</p>
                        <p className="text-sm text-gray-400">Đang thực hiện</p>
                    </div>

                    {/* Completed */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
                                Hoàn thành
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.byStatus?.completed || 0}</p>
                        <p className="text-sm text-gray-400">Đã xong</p>
                    </div>

                    {/* Cancelled */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-red-500/20 rounded-lg">
                                <XCircleIcon className="w-5 h-5 text-red-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-red-500/10 text-red-400 rounded-full">
                                Đã hủy
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.byStatus?.cancelled || 0}</p>
                        <p className="text-sm text-gray-400">Bị hủy</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


