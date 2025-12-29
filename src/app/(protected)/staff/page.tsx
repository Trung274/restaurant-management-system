'use client';

import { useState, useMemo } from 'react';
import StatsCard from '@/components/ui/StatsCard';
import { staffMembers, staffStats, statusConfig, positionConfig } from './mockData';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';
import SearchBar from '@/components/ui/SearchBar';

export default function StaffPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate dynamic stats
  const calculatedStats = useMemo(() => {
    const totalStaff = staffMembers.length;
    const activeStaff = staffMembers.filter(s => s.status === 'active').length;
    const onLeaveStaff = staffMembers.filter(s => s.status === 'on_leave').length;
    const inactiveStaff = staffMembers.filter(s => s.status === 'inactive').length;

    return staffStats.map(stat => {
      let value = stat.value;
      switch (stat.id) {
        case 'total':
          value = totalStaff;
          break;
        case 'active':
          value = activeStaff;
          break;
        case 'on_leave':
          value = onLeaveStaff;
          break;
        case 'inactive':
          value = inactiveStaff;
          break;
      }
      return { ...stat, value };
    });
  }, []);

  const filteredStaff = staffMembers.filter(staff => {
    const statusMatch = selectedStatus === 'all' || staff.status === selectedStatus;
    const positionMatch = selectedPosition === 'all' || staff.position === selectedPosition;
    const searchMatch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && positionMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="sky"
        badgeText="Staff Management"
        titleVietnamese="Quản lý nhân viên"
        titleEnglish="Staff Management"
        description="Quản lý thông tin và hiệu suất làm việc của nhân viên"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {calculatedStats.map((stat) => (
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

      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Tìm kiếm nhân viên theo tên, email, bộ phận..."
          theme="sky"
        />

        {/* Add Staff Button */}
        <button className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
          <PlusIcon className="w-5 h-5" />
          <span>Thêm nhân viên</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Status Filter */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${selectedStatus === 'all'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            Tất cả
          </button>
          {Object.entries(statusConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedStatus(key)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${selectedStatus === key
                  ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                  : `bg-gradient-to-r ${config.bg} border ${config.border} ${config.text} hover:scale-105`
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Position Filter */}
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 focus:outline-none focus:border-purple-500/50 cursor-pointer"
        >
          <option value="all" className="bg-gray-800">Tất cả vị trí</option>
          {Object.entries(positionConfig).map(([key, config]) => (
            <option key={key} value={key} className="bg-gray-800">
              {config.icon} {config.label}
            </option>
          ))}
        </select>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStaff.map((staff) => {
          const statusInfo = statusConfig[staff.status as keyof typeof statusConfig];
          const positionInfo = positionConfig[staff.position as keyof typeof positionConfig];
          const StatusIcon = statusInfo.icon;

          return (
            <div
              key={staff.id}
              className={`group relative bg-gradient-to-br ${statusInfo.bg} backdrop-blur-sm border ${statusInfo.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

              <div className="relative">
                {/* Avatar & Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${statusInfo.gradient} rounded-full blur opacity-30`}></div>
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="relative w-16 h-16 rounded-full border-2 border-white/20"
                    />
                    {/* Online status */}
                    {staff.status === 'active' && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>

                  <div className={`p-2 rounded-lg bg-gradient-to-r ${statusInfo.bg} border ${statusInfo.border}`}>
                    <StatusIcon className={`w-5 h-5 ${statusInfo.text}`} />
                  </div>
                </div>

                {/* Name & Role */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {staff.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${positionInfo.color} text-white`}>
                      {positionInfo.icon} {positionInfo.label}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${statusInfo.gradient} text-white`}>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    {statusInfo.label}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{staff.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <ClockIcon className="w-4 h-4" />
                    <span>Ca {staff.shift}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <PencilSquareIcon className="w-4 h-4" />
                    Sửa
                  </button>
                  <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-red-400 hover:border-red-500/30 transition-all">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredStaff.length === 0 && (
        <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
          <div className="text-7xl mb-6">👤</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Không tìm thấy nhân viên nào
          </h3>
          <p className="text-gray-400 mb-6">
            Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
          </p>
          <button
            onClick={() => {
              setSelectedStatus('all');
              setSelectedPosition('all');
              setSearchQuery('');
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}