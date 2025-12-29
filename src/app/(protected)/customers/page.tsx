'use client';

import { useState } from 'react';
import StatsCard from '@/components/ui/StatsCard';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    StarIcon,
    HeartIcon,
    GiftIcon,
    ChartBarIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { customers, membershipConfig, customerStats } from './mockData';
import PageHeader from '@/components/ui/PageHeader';
import SearchBar from '@/components/ui/SearchBar';

export default function CustomersPage() {
    const [selectedMembership, setSelectedMembership] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const filteredCustomers = customers.filter(customer => {
        const membershipMatch = selectedMembership === 'all' || customer.membershipLevel === selectedMembership;
        const searchMatch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery);
        const favoriteMatch = !showFavoritesOnly || customer.favorite;
        return membershipMatch && searchMatch && favoriteMatch;
    });

    const totalCustomers = customers.length;
    const vipCustomers = customers.filter(c => c.membershipLevel === 'vip').length;
    const favoriteCustomers = customers.filter(c => c.favorite).length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
            {/* Header */}
            <PageHeader
                theme="pink"
                badgeText="Customer Management"
                titleVietnamese="Quản lý khách hàng"
                titleEnglish="Customer Management"
                description="Quản lý thông tin khách hàng và chương trình khách hàng thân thiết"
            />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {customerStats.map((stat) => (
                    <StatsCard
                        key={stat.id}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        colorScheme={stat.colorScheme}
                    />
                ))}
            </div>

            {/* Search & Actions */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search */}
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Tìm kiếm khách hàng theo tên, email, số điện thoại..."
                    theme="pink"
                />

                {/* Favorites Toggle */}
                <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${showFavoritesOnly
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/30'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    {showFavoritesOnly ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                    <span>Yêu thích</span>
                </button>

                {/* Add Customer Button */}
                <button className="group relative px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
                    <PlusIcon className="w-5 h-5" />
                    <span>Thêm khách hàng</span>
                </button>
            </div>

            {/* Membership Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    onClick={() => setSelectedMembership('all')}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${selectedMembership === 'all'
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/30'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    Tất cả hạng
                </button>
                {Object.entries(membershipConfig).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedMembership(key)}
                        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${selectedMembership === key
                            ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                            : `bg-gradient-to-r ${config.bg} border ${config.border} ${config.text} hover:scale-105`
                            }`}
                    >
                        <span className="text-lg">{config.icon}</span>
                        <span>{config.label}</span>
                    </button>
                ))}
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCustomers.map((customer) => {
                    const membershipInfo = membershipConfig[customer.membershipLevel as keyof typeof membershipConfig];

                    return (
                        <div
                            key={customer.id}
                            className={`group relative bg-gradient-to-br ${membershipInfo.bg} backdrop-blur-sm border ${membershipInfo.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
                        >
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                            <div className="relative">
                                {/* Avatar & Favorite */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="relative">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${membershipInfo.gradient} rounded-full blur opacity-30`}></div>
                                        <img
                                            src={customer.avatar}
                                            alt={customer.name}
                                            className="relative w-16 h-16 rounded-full border-2 border-white/20"
                                        />
                                        {/* Membership badge */}
                                        <div className={`absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r ${membershipInfo.gradient} rounded-full flex items-center justify-center text-xs shadow-lg`}>
                                            {membershipInfo.icon}
                                        </div>
                                    </div>

                                    <button className={`p-2 rounded-lg transition-all ${customer.favorite
                                        ? 'bg-pink-500/20 text-pink-400'
                                        : 'bg-white/5 text-gray-400 hover:text-pink-400'
                                        }`}>
                                        {customer.favorite ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Name & Membership */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {customer.name}
                                    </h3>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${membershipInfo.gradient} text-white`}>
                                        {membershipInfo.icon} {membershipInfo.label} Member
                                    </span>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                                        <span>{customer.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                                        <span className="line-clamp-1">{customer.address}</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                        <p className="text-xs text-gray-400 mb-1">Điểm tích lũy</p>
                                        <p className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${membershipInfo.gradient}`}>
                                            {customer.points}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                        <p className="text-xs text-gray-400 mb-1">Đơn hàng</p>
                                        <p className="text-lg font-bold text-white">
                                            {customer.totalOrders}
                                        </p>
                                    </div>
                                </div>

                                {/* Total Spent */}
                                <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                                    <p className="text-xs text-gray-400 mb-1">Tổng chi tiêu</p>
                                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                                        {(customer.totalSpent / 1000000).toFixed(1)}M đ
                                    </p>
                                </div>

                                {/* Rating & Last Visit */}
                                <div className="flex items-center justify-between mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <StarIconSolid className="w-4 h-4 text-yellow-400" />
                                        <span className="font-semibold text-white">{customer.rating}</span>
                                    </div>
                                    <span className="text-gray-400">Ghé: {customer.lastVisit}</span>
                                </div>

                                {/* Preferences */}
                                {customer.preferences.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-400 mb-2">Món yêu thích:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {customer.preferences.slice(0, 2).map((pref, index) => (
                                                <span key={index} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300">
                                                    {pref}
                                                </span>
                                            ))}
                                            {customer.preferences.length > 2 && (
                                                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300">
                                                    +{customer.preferences.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                        <PencilSquareIcon className="w-4 h-4" />
                                        Chi tiết
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
            {filteredCustomers.length === 0 && (
                <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
                    <div className="text-7xl mb-6">👤</div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Không tìm thấy khách hàng nào
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
                    </p>
                    <button
                        onClick={() => {
                            setSelectedMembership('all');
                            setSearchQuery('');
                            setShowFavoritesOnly(false);
                        }}
                        className="px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
                    >
                        Xóa bộ lọc
                    </button>
                </div>
            )}


        </div>
    );
}