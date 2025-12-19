'use client';

import { useEffect, useMemo } from 'react';
import StatsCard from '@/components/ui/StatsCard';
import { useTablesStore } from '@/stores/tablesStore';

export default function TableStatsSection() {
    const { stats, isLoading, error, fetchStats } = useTablesStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const tableStatsData = useMemo(() => {
        if (!stats) {
            return [
                { id: 'total', label: 'Tổng bàn', value: 0, icon: '🪑', colorScheme: 'blue' as const },
                { id: 'available', label: 'Bàn trống', value: 0, icon: '✅', colorScheme: 'green' as const },
                { id: 'occupied', label: 'Đang phục vụ', value: 0, icon: '👥', colorScheme: 'cyan' as const },
                { id: 'reserved', label: 'Đã đặt', value: 0, icon: '📅', colorScheme: 'orange' as const },
            ];
        }

        return [
            { id: 'total', label: 'Tổng bàn', value: stats.summary.totalTables, icon: '🪑', colorScheme: 'blue' as const },
            { id: 'available', label: 'Bàn trống', value: stats.summary.availableTables, icon: '✅', colorScheme: 'green' as const },
            { id: 'occupied', label: 'Đang phục vụ', value: stats.summary.occupiedTables, icon: '👥', colorScheme: 'cyan' as const },
            { id: 'reserved', label: 'Đã đặt', value: stats.summary.reservedTables, icon: '📅', colorScheme: 'orange' as const },
        ];
    }, [stats]);

    // Floor breakdown data
    const floorData = useMemo(() => {
        if (!stats || !stats.byFloor) return [];
        return stats.byFloor;
    }, [stats]);

    return (
        <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8 overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            🪑 Thống kê bàn ăn
                        </h2>
                        <p className="text-gray-400">
                            Tổng quan về bàn và trạng thái
                        </p>
                    </div>
                    <a
                        href="/tables"
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all"
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {tableStatsData.map((stat) => (
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

                        {/* Floor Breakdown */}
                        {floorData.length > 0 && (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {floorData.map((floor) => (
                                    <div key={floor.floor} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <h4 className="text-white font-semibold mb-3">{floor.floor}</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Tổng:</span>
                                                <span className="text-white font-medium">{floor.total} bàn</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-green-400">Trống:</span>
                                                <span className="text-green-400 font-medium">{floor.available}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-cyan-400">Đang dùng:</span>
                                                <span className="text-cyan-400 font-medium">{floor.occupied}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">TB sức chứa:</span>
                                                <span className="text-white font-medium">{floor.avgCapacity} người</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
