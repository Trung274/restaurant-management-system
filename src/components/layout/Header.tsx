'use client';

import { BellIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../ui/SearchBar';
import {
    UserCircleIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { user, logout, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        setIsMounted(true);
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsDropdownOpen(false);
        setIsLoggingOut(true);
        try {
            await logout();
            router.push('/login');
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Get user display name with fallback - only show user data after mount to prevent hydration mismatch
    const displayName = (isMounted && user?.name) || (authLoading ? '' : 'User');
    const displayEmail = (isMounted && user?.email) || '';
    const userInitial = (isMounted && user?.name?.charAt(0).toUpperCase()) || 'U';

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
                        <h2 className="text-xl md:text-3xl font-bold text-white">Dashboard</h2>
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

                    {/* User Profile with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="group flex items-center gap-2 md:gap-3 hover:bg-white/5 rounded-xl pr-2 md:pr-4 transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative">
                                {/* Avatar glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>

                                {/* Avatar - Show user initial or loading skeleton */}
                                {authLoading ? (
                                    <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-full border-2 border-white/20 animate-pulse"></div>
                                ) : (
                                    <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-2 border-white/20 group-hover:border-blue-400/50 transition-all duration-300 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm md:text-base">
                                            {userInitial}
                                        </span>
                                    </div>
                                )}

                                {/* Online status */}
                                {isMounted && user?.isActive && (
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                                )}
                            </div>

                            <div className="hidden lg:block text-left">
                                {authLoading ? (
                                    <>
                                        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-1"></div>
                                        <div className="h-3 w-32 bg-gray-700 rounded animate-pulse"></div>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                                            {displayName}
                                        </p>
                                        <p className="text-xs text-gray-400 capitalize">
                                            {displayEmail}
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* Dropdown indicator */}
                            <ChevronDownIcon
                                className={`hidden sm:block w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 ${isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsDropdownOpen(false)}
                                />

                                {/* Menu */}
                                <div className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-gray-900 to-slate-800 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">

                                    {/* Menu Items */}
                                    <div className="p-2">
                                        {/* Profile */}
                                        <button
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                router.push('/profile');
                                            }}
                                            className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
                                        >
                                            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                                                <UserCircleIcon className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                                    Tài khoản
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Xem thông tin cá nhân
                                                </p>
                                            </div>
                                        </button>

                                        {/* Settings */}
                                        <button
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                router.push('/settings');
                                            }}
                                            className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
                                        >
                                            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                                                <Cog6ToothIcon className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">
                                                    Cài đặt
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Tùy chỉnh hệ thống
                                                </p>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Logout Section */}
                                    <div className="p-2 border-t border-white/10">
                                        <button
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                                        >
                                            <div className="p-2 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-lg group-hover:from-red-500/30 group-hover:to-rose-500/30 transition-all">
                                                <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-400" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                                                    {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Thoát khỏi tài khoản
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
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