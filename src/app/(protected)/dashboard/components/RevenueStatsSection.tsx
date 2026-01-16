'use client';

import { useEffect } from 'react';
import { usePaymentsStore } from '@/stores/paymentsStore';
import {
    BanknotesIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    ShoppingCartIcon
} from '@heroicons/react/24/outline';

export default function RevenueStatsSection() {
    const { stats, fetchStats, isLoading } = usePaymentsStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (isLoading && !stats) {
        return (
            <div className="animate-pulse bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 h-64"></div>
        );
    }

    if (!stats) return null;

    return (
        <div className="relative bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">💰 Thống kê doanh thu</h2>
                        <p className="text-gray-400">Tổng quan doanh thu và thanh toán</p>
                    </div>
                    <a
                        href="/revenue"
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all"
                    >
                        Xem chi tiết →
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Today Revenue */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <BanknotesIcon className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
                                Hôm nay
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">
                            {(stats.today.totalRevenue / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-sm text-gray-400">{stats.today.totalPayments} thanh toán</p>
                    </div>

                    {/* This Month Revenue */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <CurrencyDollarIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                                Tháng này
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">
                            {(stats.thisMonth.totalRevenue / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-sm text-gray-400">{stats.thisMonth.totalPayments} thanh toán</p>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <ChartBarIcon className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full">
                                Tổng cộng
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">
                            {(stats.overall.totalRevenue / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-sm text-gray-400">{stats.overall.totalPayments} thanh toán</p>
                    </div>

                    {/* Average Payment */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-orange-500/20 rounded-lg">
                                <ShoppingCartIcon className="w-5 h-5 text-orange-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full">
                                Trung bình
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">
                            {(stats.overall.avgPayment / 1000).toFixed(0)}K
                        </p>
                        <p className="text-sm text-gray-400">Giá trị/đơn</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
