'use client';

import { useEffect, useState } from 'react';
import { getUserStats } from '@/lib/userService';
import { UserStatsResponse } from '@/types/auth.types';
import {
    UserGroupIcon as UserGroupIconOutline,
    BriefcaseIcon,
    ClockIcon,
    UserIcon
} from '@heroicons/react/24/outline';

export default function UserStatsSection() {
    const [stats, setStats] = useState<UserStatsResponse['data'] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getUserStats();
                if (response.success) {
                    setStats(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 h-64"></div>
        );
    }

    if (!stats) return null;

    return (
        <div className="relative bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Thống kê nhân sự</h2>
                        <p className="text-gray-400">Tổng quan tình hình nhân sự của nhà hàng</p>
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                        <UserGroupIconOutline className="w-6 h-6 text-blue-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Staff */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <UserIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                                Tổng số
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.total}</p>
                        <p className="text-sm text-gray-400">Nhân viên trong hệ thống</p>
                    </div>

                    {/* Active Staff */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <BriefcaseIcon className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
                                Đang làm
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stats.active}</p>
                        <p className="text-sm text-gray-400">Active status</p>
                    </div>

                    {/* Stats by Role (Just displaying Admin/Manager for quick view) */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <UserGroupIconOutline className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full">
                                Vai trò
                            </span>
                        </div>
                        <div className="space-y-2">
                            {stats.byRole.slice(0, 3).map((roleStat) => (
                                <div key={roleStat.role} className="flex justify-between text-sm">
                                    <span className="text-gray-300 capitalize">{roleStat.role}</span>
                                    <span className="text-white font-bold">{roleStat.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats by Shift */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-orange-500/20 rounded-lg">
                                <ClockIcon className="w-5 h-5 text-orange-400" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-orange-500/10 text-orange-400 rounded-full">
                                Ca làm việc
                            </span>
                        </div>
                        <div className="space-y-2">
                            {stats.byShift.slice(0, 3).map((shiftStat) => (
                                <div key={shiftStat.shift} className="flex justify-between text-sm">
                                    <span className="text-gray-300">
                                        {shiftStat.shift === 'Morning' ? 'Sáng' :
                                            shiftStat.shift === 'Evening' ? 'Tối' :
                                                shiftStat.shift === 'Afternoon' ? 'Chiều' :
                                                    shiftStat.shift || 'N/A'}
                                    </span>
                                    <span className="text-white font-bold">{shiftStat.count}</span>
                                </div>
                            ))}
                            {stats.byShift.length === 0 && <span className="text-gray-500 text-sm">Chưa có dữ liệu ca</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
