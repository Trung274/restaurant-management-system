'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    CubeIcon,
    TableCellsIcon,
    UsersIcon,
    BanknotesIcon,
    BellAlertIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const menuItems = [
    {
        section: 'TỔNG QUAN',
        items: [
            {
                href: '/dashboard',
                icon: HomeIcon,
                label: 'Dashboard',
                gradient: 'from-blue-600 to-cyan-400',
                hoverBg: 'hover:bg-blue-500/10',
                hoverBorder: 'hover:border-blue-500/30',
            },
        ]
    },
    {
        section: 'VẬN HÀNH',
        items: [
            {
                href: '/orders',
                icon: ClipboardDocumentListIcon,
                label: 'Đơn hàng',
                gradient: 'from-purple-600 to-fuchsia-500',
                hoverBg: 'hover:bg-purple-500/10',
                hoverBorder: 'hover:border-purple-500/30',
            },
            {
                href: '/tables',
                icon: TableCellsIcon,
                label: 'Quản lý bàn',
                gradient: 'from-emerald-600 to-teal-400',
                hoverBg: 'hover:bg-emerald-500/10',
                hoverBorder: 'hover:border-emerald-500/30',
            },
            {
                href: '/kitchen',
                icon: BellAlertIcon,
                label: 'Bếp',
                gradient: 'from-red-600 to-orange-500',
                hoverBg: 'hover:bg-red-500/10',
                hoverBorder: 'hover:border-red-500/30',
            },
        ]
    },
    {
        section: 'QUẢN LÝ',
        items: [
            {
                href: '/menu',
                icon: CubeIcon,
                label: 'Thực đơn',
                gradient: 'from-amber-600 to-yellow-400',
                hoverBg: 'hover:bg-amber-500/10',
                hoverBorder: 'hover:border-amber-500/30',
            },
            {
                href: '/staff',
                icon: UsersIcon,
                label: 'Nhân viên',
                gradient: 'from-sky-600 to-blue-400',
                hoverBg: 'hover:bg-sky-500/10',
                hoverBorder: 'hover:border-sky-500/30',
            },
            {
                href: '/customers',
                icon: UserGroupIcon,
                label: 'Khách hàng',
                gradient: 'from-pink-600 to-rose-400',
                hoverBg: 'hover:bg-pink-500/10',
                hoverBorder: 'hover:border-pink-500/30',
            },
        ]
    },
    {
        section: 'BÁO CÁO & TÀI CHÍNH',
        items: [
            {
                href: '/revenue',
                icon: BanknotesIcon,
                label: 'Doanh thu',
                gradient: 'from-green-600 to-emerald-400',
                hoverBg: 'hover:bg-green-500/10',
                hoverBorder: 'hover:border-green-500/30',
            },
            {
                href: '/reports',
                icon: ChartBarIcon,
                label: 'Báo cáo',
                gradient: 'from-indigo-600 to-violet-400',
                hoverBg: 'hover:bg-indigo-500/10',
                hoverBorder: 'hover:border-indigo-500/30',
            },
        ]
    },
    {
        section: 'HỆ THỐNG',
        items: [
            {
                href: '/settings',
                icon: Cog6ToothIcon,
                label: 'Cài đặt',
                gradient: 'from-slate-600 to-gray-400',
                hoverBg: 'hover:bg-slate-500/10',
                hoverBorder: 'hover:border-slate-500/30',
            },
        ]
    },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 
                border-r border-white/10 flex flex-col z-50 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                    <XMarkIcon className="w-5 h-5 text-gray-400" />
                </button>

                {/* Logo Section */}
                <div className="p-6 border-b border-white/10">
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4">
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Nhà hàng ABCDE
                            </h1>
                            <p className="text-xs text-gray-400 mt-1">Management System</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
                    <style jsx>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 3px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(255, 255, 255, 0.2);
                        }
                    `}</style>
                    {menuItems.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            {/* Section Title */}
                            <div className="px-4 mb-3">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {section.section}
                                </h3>
                                <div className="mt-2 h-px bg-gradient-to-r from-gray-700 via-gray-600 to-transparent"></div>
                            </div>

                            {/* Section Items */}
                            <div className="space-y-2">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            className={`
                                                group relative flex items-center gap-3 px-4 py-3 rounded-xl 
                                                transition-all duration-300 border
                                                ${isActive
                                                    ? `bg-gradient-to-r from-white/10 to-white/5 border-white/20`
                                                    : `border-transparent ${item.hoverBg} ${item.hoverBorder}`
                                                }
                                            `}
                                        >
                                            {/* Active indicator */}
                                            {isActive && (
                                                <div className={`absolute left-0 w-1 h-8 bg-gradient-to-b ${item.gradient} rounded-r-full`}></div>
                                            )}

                                            {/* Icon with gradient on active/hover */}
                                            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                                                <Icon 
                                                    className={`w-5 h-5 transition-colors ${
                                                        isActive 
                                                            ? 'text-blue-400' 
                                                            : 'text-gray-400 group-hover:text-white'
                                                    }`} 
                                                />
                                            </div>

                                            {/* Label */}
                                            <span className={`
                                                relative z-10 font-medium transition-colors
                                                ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                                            `}>
                                                {item.label}
                                            </span>

                                            {/* Hover glow effect */}
                                            {!isActive && (
                                                <div className={`
                                                    absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl 
                                                    opacity-0 group-hover:opacity-5 transition-opacity duration-300
                                                `}></div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-white/10">
                    <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 group cursor-pointer hover:border-blue-500/40 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                        <div className="relative">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-gray-400">System Status</span>
                            </div>
                            <p className="text-sm font-semibold text-white">All Systems Online</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}