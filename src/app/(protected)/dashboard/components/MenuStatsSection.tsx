'use client';

import { useEffect, useMemo } from 'react';
import StatsCard from '@/components/ui/StatsCard';
import { useMenuStore } from '@/stores/menuStore';

export default function MenuStatsSection() {
    const { stats, isLoading, error, fetchStats } = useMenuStore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        console.log('Dashboard: Fetching menu stats...');
        fetchStats().then(() => {
            console.log('Dashboard: Menu stats fetched:', stats);
        }).catch((err) => {
            console.error('Dashboard: Error fetching menu stats:', err);
        });
    }, []);

    const menuStatsData = useMemo(() => {
        if (!stats) {
            return [
                { id: 'total', label: 'Tổng món', value: 0, icon: '🍽️', colorScheme: 'yellow' as const },
                { id: 'available', label: 'Đang bán', value: 0, icon: '✅', colorScheme: 'green' as const },
                { id: 'popular', label: 'Món phổ biến', value: 0, icon: '⭐', colorScheme: 'orange' as const },
                { id: 'out_of_stock', label: 'Hết hàng', value: 0, icon: '❌', colorScheme: 'red' as const },
            ];
        }

        return [
            { id: 'total', label: 'Tổng món', value: stats.total, icon: '🍽️', colorScheme: 'yellow' as const },
            { id: 'available', label: 'Đang bán', value: stats.available, icon: '✅', colorScheme: 'green' as const },
            { id: 'popular', label: 'Món phổ biến', value: stats.popular, icon: '⭐', colorScheme: 'orange' as const },
            { id: 'out_of_stock', label: 'Hết hàng', value: stats.out_of_stock, icon: '❌', colorScheme: 'red' as const },
        ];
    }, [stats]);

    return (
        <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            📊 Thống kê thực đơn
                        </h2>
                        <p className="text-gray-400">
                            Tổng quan về món ăn và trạng thái
                        </p>
                    </div>
                    <a
                        href="/menu"
                        className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                    >
                        Xem chi tiết →
                    </a>
                </div>

                {error && (
                    <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <p className="text-red-400 text-sm">⚠️ {error}</p>
                    </div>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse h-24"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {menuStatsData.map((stat) => (
                            <StatsCard
                                key={stat.id}
                                label={stat.label}
                                value={stat.value}
                                icon={stat.icon}
                                colorScheme={stat.colorScheme}
                                subtitle={undefined}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
