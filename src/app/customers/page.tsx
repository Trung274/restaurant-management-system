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
            <div className="mb-12">
                <div className="inline-block mb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-medium">
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                        Customer Management
                    </span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">
                    Quản lý khách hàng
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 mt-2">
                        Customer Management
                    </span>
                </h1>
                <p className="text-gray-400 text-lg">
                    Quản lý thông tin khách hàng và chương trình khách hàng thân thiết
                </p>
            </div>

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
                <div className="flex-1">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center">
                            <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm khách hàng theo tên, email, số điện thoại..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Favorites Toggle */}
                <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${showFavoritesOnly
                            ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/30'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    {showFavoritesOnly ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                    <span>Yêu thích</span>
                </button>

                {/* Add Customer Button */}
                <button className="group relative px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    <span>Thêm khách hàng</span>
                </button>
            </div>

            {/* Membership Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    onClick={() => setSelectedMembership('all')}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${selectedMembership === 'all'
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
                        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${selectedMembership === key
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

            {/* Loyalty Program & Top Customers Section */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loyalty Program */}
                <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>

                    <div className="relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <GiftIcon className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Chương trình khách hàng thân thiết</h2>
                                <p className="text-gray-300 text-sm">Tích điểm và nhận ưu đãi</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {Object.entries(membershipConfig).reverse().map(([key, config]) => (
                                <div key={key} className={`p-4 rounded-xl bg-gradient-to-r ${config.bg} border ${config.border}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{config.icon}</span>
                                            <div>
                                                <p className="font-semibold text-white">{config.label}</p>
                                                <p className="text-xs text-gray-400">
                                                    Chi tiêu từ {(config.minSpent / 1000000).toFixed(1)}M đ
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${config.text}`}>
                                            {customers.filter(c => c.membershipLevel === key).length} khách
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Customers */}
                <div className="relative bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5"></div>

                    <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-pink-500/20 rounded-xl">
                                    <ChartBarIcon className="w-8 h-8 text-pink-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Top khách hàng VIP</h2>
                                    <p className="text-gray-300 text-sm">Khách hàng chi tiêu nhiều nhất</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {customers
                                .sort((a, b) => b.totalSpent - a.totalSpent)
                                .slice(0, 5)
                                .map((customer, index) => {
                                    const membershipInfo = membershipConfig[customer.membershipLevel as keyof typeof membershipConfig];
                                    return (
                                        <div
                                            key={customer.id}
                                            className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:scale-105 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className={`absolute -top-2 -left-2 w-7 h-7 bg-gradient-to-r ${index === 0 ? 'from-yellow-500 to-amber-500' :
                                                            index === 1 ? 'from-gray-400 to-gray-500' :
                                                                index === 2 ? 'from-orange-500 to-amber-600' :
                                                                    'from-blue-500 to-cyan-500'
                                                        } rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                                                        {index + 1}
                                                    </div>
                                                    <img
                                                        src={customer.avatar}
                                                        alt={customer.name}
                                                        className="w-14 h-14 rounded-full border-2 border-white/20"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="text-white font-semibold truncate">{customer.name}</h4>
                                                        <span className="text-lg">{membershipInfo.icon}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <span>{customer.totalOrders} đơn</span>
                                                        <span>•</span>
                                                        <StarIconSolid className="w-3 h-3 text-yellow-400" />
                                                        <span>{customer.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${membershipInfo.gradient}`}>
                                                        {(customer.totalSpent / 1000000).toFixed(1)}M
                                                    </p>
                                                    <p className="text-xs text-gray-400">{customer.points} điểm</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105">
                            Xem toàn bộ báo cáo
                        </button>
                    </div>
                </div>
            </div>

            {/* Birthday Reminders */}
            <div className="mt-6 relative bg-gradient-to-br from-orange-600/20 to-amber-600/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-orange-500/20 rounded-xl">
                            <span className="text-4xl">🎂</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                                Sinh nhật sắp tới
                            </h3>
                            <p className="text-gray-300">
                                Có {customers.filter(c => {
                                    const today = new Date();
                                    const birthday = new Date(c.birthday);
                                    const daysUntilBirthday = Math.floor((birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                                    return daysUntilBirthday >= 0 && daysUntilBirthday <= 30;
                                }).length} khách hàng có sinh nhật trong tháng này
                            </p>
                        </div>
                    </div>
                    <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                        Gửi lời chúc
                    </button>
                </div>
            </div>
        </div>
    );
}