'use client';

import { useEffect } from 'react';
import { useKitchenStore } from '@/stores/kitchenStore';
import {
    FireIcon,
    ClockIcon,
    CheckCircleIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

export default function KitchenStatsSection() {
    const { stats, fetchStats, isLoading } = useKitchenStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (isLoading && !stats) {
        return (
            <div className="animate-pulse bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 h-64"></div>
        );
    }

    if (!stats) return null;

    const totalItems = (stats.itemsByStatus.queued || 0) + (stats.itemsByStatus.preparing || 0) + (stats.itemsByStatus.ready || 0);

    return (
        <div className="relative bg-gradient-to-br from-orange-600/20 to-amber-600/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">🍳 Thống kê bếp</h2>
                        <p className="text-gray-400">Tổng quan tình hình món ăn trong bếp</p>
                    </div>
                    <a
                        href="/kitchen"
                        className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                    >
                        Xem chi tiết →
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Items */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <ChartBarIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                                Tổng số
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{totalItems}</p>
                        <p className="text-sm text-gray-400">Tất cả món</p>
                    </div>

                    {/* Queued */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-orange-500/20 rounded-lg">
                                <ClockIcon className="w-5 h-5 text-orange-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full">
                                Chờ xử lý
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.itemsByStatus.queued || 0}</p>
                        <p className="text-sm text-gray-400">Đang chờ</p>
                    </div>

                    {/* Preparing */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <FireIcon className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full">
                                Đang nấu
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.itemsByStatus.preparing || 0}</p>
                        <p className="text-sm text-gray-400">Đang làm</p>
                    </div>

                    {/* Ready */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
                                Sẵn sàng
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.itemsByStatus.ready || 0}</p>
                        <p className="text-sm text-gray-400">Đã xong</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
