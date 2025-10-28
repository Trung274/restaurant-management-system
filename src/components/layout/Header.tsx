'use client';

import { BellIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SearchBar from '../ui/SearchBar';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="bg-gradient-to-r from-gray-900/95 to-slate-800/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
            <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                {/* Left Section - Menu Button & Title */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative bg-white/5 border border-white/10 rounded-xl p-2.5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
                            <Bars3Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                    </button>

                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">Dashboard</h2>
                        <p className="text-xs md:text-sm text-gray-400 hidden sm:block">Chào mừng trở lại! 👋</p>
                    </div>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex items-center flex-1 max-w-md">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Tìm kiếm..."
                            theme="blue"
                        />
                    </div>
                </div>

                {/* Right Section - Notifications & Profile */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Notifications */}
                    <button className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative bg-white/5 border border-white/10 rounded-xl p-2.5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
                            <BellIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                            {/* Notification badge */}
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold shadow-lg shadow-red-500/50 animate-pulse">
                                3
                            </span>
                        </div>
                    </button>

                    {/* Divider - Hidden on small screens */}
                    <div className="hidden sm:block h-8 w-px bg-white/10"></div>

                    {/* User Profile */}
                    <button className="group flex items-center gap-2 md:gap-3 hover:bg-white/5 rounded-xl pr-2 md:pr-4 transition-all duration-300 cursor-pointer">
                        <div className="relative">
                            {/* Avatar glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>

                            {/* Avatar */}
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="avatar"
                                className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 group-hover:border-blue-400/50 transition-all duration-300"
                            />

                            {/* Online status */}
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                        </div>

                        <div className="hidden lg:block text-left">
                            <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                                Admin User
                            </p>
                            <p className="text-xs text-gray-400">admin@restaurant.com</p>
                        </div>

                        {/* Dropdown indicator */}
                        <svg
                            className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Quick Stats Bar - Restaurant Specific */}
            <div className="px-4 md:px-6 pb-3 flex items-center gap-2 md:gap-4 overflow-x-auto">
                <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg whitespace-nowrap">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">🪑 8/15 Bàn</span>
                </div>

                <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg whitespace-nowrap">
                    <span className="text-xs text-orange-400 font-medium">🔥 5 Đơn</span>
                </div>

                <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg whitespace-nowrap">
                    <span className="text-xs text-blue-400 font-medium">💰 12.5M</span>
                </div>

                <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg whitespace-nowrap">
                    <span className="text-xs text-purple-400 font-medium">👥 38 Khách</span>
                </div>
            </div>
        </header>
    );
}