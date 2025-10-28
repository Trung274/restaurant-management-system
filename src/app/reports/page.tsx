'use client';

import { useState, useMemo } from 'react';
import { reportTypes, recentReports, scheduledReports, reportsStats } from './mockData';
import StatsCard from '@/components/ui/StatsCard';
import {
  DocumentChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('all');

  const filteredReports = selectedType === 'all'
    ? recentReports
    : recentReports.filter(report => report.type === selectedType);

  const totalReports = recentReports.length;
  const completedReports = recentReports.filter(r => r.status === 'completed').length;
  const processingReports = recentReports.filter(r => r.status === 'processing').length;
  const totalDownloads = recentReports.reduce((sum, r) => sum + r.downloads, 0);

  // Tính toán stats động
  const statsData = useMemo(() => {
    return reportsStats.map(stat => {
      let value = stat.value;

      switch (stat.id) {
        case 'total':
          value = totalReports;
          break;
        case 'completed':
          value = completedReports;
          break;
        case 'processing':
          value = processingReports;
          break;
        case 'downloads':
          value = totalDownloads;
          break;
      }

      return { ...stat, value };
    });
  }, [totalReports, completedReports, processingReports, totalDownloads]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="indigo"
        badgeText="Reports Center"
        titleVietnamese="Trung tâm báo cáo"
        titleEnglish="Reports Center"
        description="Tạo, quản lý và xuất báo cáo cho nhà hàng"
        actions={
          <>
            <button className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <CalendarIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
              <span>Lịch báo cáo</span>
            </button>
            <button className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
              <DocumentChartBarIcon className="w-5 h-5" />
              <span>Tạo báo cáo mới</span>
            </button>
          </>
        }
      />

      {/* Quick Stats - Sử dụng StatsCard component */}
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

      {/* Report Types Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Loại báo cáo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.id}
                className={`group relative bg-gradient-to-br ${type.bg} backdrop-blur-sm border ${type.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${type.bg} border ${type.border}`}>
                      <span className="text-4xl">{type.emoji}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${type.gradient} text-white`}>
                      {type.count}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    {type.description}
                  </p>

                  <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${type.gradient} text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2`}>
                    <DocumentChartBarIcon className="w-5 h-5" />
                    Tạo báo cáo
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Báo cáo gần đây</h2>
          <div className="flex gap-3">
            <button className="group relative px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
              <span>Lọc</span>
            </button>
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${selectedType === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            Tất cả
          </button>
          {reportTypes.slice(0, 5).map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${selectedType === type.id
                  ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg`
                  : `bg-gradient-to-r ${type.bg} border ${type.border} text-gray-400 hover:scale-105`
                }`}
            >
              <span>{type.emoji}</span>
              <span>{type.name.replace('Báo cáo ', '')}</span>
            </button>
          ))}
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => {
            const reportType = reportTypes.find(t => t.id === report.type);
            const isProcessing = report.status === 'processing';

            return (
              <div
                key={report.id}
                className={`group relative bg-gradient-to-br ${reportType?.bg} backdrop-blur-sm border ${reportType?.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${reportType?.bg} border ${reportType?.border}`}>
                      <span className="text-3xl">{reportType?.emoji}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white truncate">
                          {report.name}
                        </h3>
                        {isProcessing && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 flex items-center gap-1.5 animate-pulse">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                            Đang xử lý
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(report.date).toLocaleDateString('vi-VN')}
                        </span>
                        <span className="flex items-center gap-1">
                          📄 {report.format}
                        </span>
                        <span className="flex items-center gap-1">
                          💾 {report.size}
                        </span>
                        <span className="flex items-center gap-1">
                          👤 {report.generatedBy}
                        </span>
                        {!isProcessing && (
                          <span className="flex items-center gap-1">
                            🔥 {report.downloads} lượt tải
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  {!isProcessing && (
                    <div className="flex gap-2">
                      <button className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                        <PrinterIcon className="w-4 h-4" />
                        In
                      </button>
                      <button className={`px-6 py-2.5 rounded-lg bg-gradient-to-r ${reportType?.gradient} text-white font-medium hover:shadow-lg transition-all flex items-center gap-2`}>
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Tải xuống
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Reports & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Reports */}
        <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <ClockIcon className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Báo cáo tự động</h2>
                  <p className="text-gray-300 text-sm">Lên lịch tạo báo cáo</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {scheduledReports.map((schedule, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{schedule.name}</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${schedule.active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                      }`}>
                      {schedule.active ? '✓ Hoạt động' : '⸺ Tạm dừng'}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      🔄 {schedule.frequency}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      ⏰ Lần sau: {schedule.nextRun}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
              Quản lý lịch báo cáo
            </button>
          </div>
        </div>

        {/* Report Analytics */}
        <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <ChartBarIcon className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Thống kê sử dụng</h2>
                  <p className="text-gray-300 text-sm">30 ngày qua</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Báo cáo phổ biến nhất</span>
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">Doanh thu</p>
                <p className="text-sm text-gray-400">156 lần tạo • 89 lượt tải</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Tổng thời gian tạo báo cáo</span>
                  <span className="text-2xl">⏱️</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">2.5 phút</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <ArrowTrendingUpIcon className="w-3 h-3" />
                  Nhanh hơn 15% so với tháng trước
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Dung lượng sử dụng</span>
                  <span className="text-2xl">💾</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">125 MB</p>
                <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" style={{ width: '62%' }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">62% của 200 MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}