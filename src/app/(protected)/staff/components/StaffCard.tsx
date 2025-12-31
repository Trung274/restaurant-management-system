import { User } from '@/types/auth.types';
import { statusConfig, positionConfig } from '../mockData';
import {
    PencilSquareIcon,
    TrashIcon,
    EnvelopeIcon,
    PhoneIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

interface StaffCardProps {
    staff: User;
    onDelete: (id: string, name: string) => void;
    onEdit: (staff: User) => void;
}

export default function StaffCard({ staff, onDelete, onEdit }: StaffCardProps) {
    // Determine status info
    let statusKey = 'active';
    if (staff.workStatus) {
        statusKey = staff.workStatus;
    } else {
        statusKey = staff.isActive ? 'active' : 'inactive';
    }
    const statusInfo = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig['active'];

    // Determine position info
    const positionKey = staff.role?.name || 'user';
    const positionInfo = positionConfig[positionKey as keyof typeof positionConfig] || {
        label: positionKey,
        color: 'from-gray-500 to-slate-500',
        icon: '👤'
    };

    const StatusIcon = statusInfo.icon;

    return (
        <div
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
                            src={staff.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name)}`}
                            alt={staff.name}
                            className="relative w-16 h-16 rounded-full border-2 border-white/20"
                        />
                        {/* Online status indicator roughly based on same status */}
                        {statusKey === 'active' && (
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
                        <span>{staff.phone || 'Chưa cập nhật'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <ClockIcon className="w-4 h-4" />
                        <span>
                            {staff.shift
                                ? `Ca ${staff.shift === 'Morning' ? 'Sáng' : staff.shift === 'Evening' ? 'Tối' : staff.shift === 'Afternoon' ? 'Chiều' : staff.shift}`
                                : 'Chưa phân ca'}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(staff);
                        }}
                        className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <PencilSquareIcon className="w-4 h-4" />
                        Sửa
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(staff._id, staff.name);
                        }}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-red-400 hover:border-red-500/30 transition-all"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
