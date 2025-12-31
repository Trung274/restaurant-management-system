'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from '@/utils/toast';
import { User, UpdateUserProfilePayload } from '@/types/auth.types';

interface EditStaffOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, userData: UpdateUserProfilePayload) => Promise<void>;
    currentUser: User | null;
    targetUser: User | null;
    isLoading?: boolean;
}

export default function EditStaffOverlay({
    isOpen,
    onClose,
    onSubmit,
    currentUser,
    targetUser,
    isLoading = false
}: EditStaffOverlayProps) {
    const [formData, setFormData] = useState<UpdateUserProfilePayload>({});

    useEffect(() => {
        if (targetUser && isOpen) {
            setFormData({
                name: targetUser.name,
                email: targetUser.email,
                phone: targetUser.phone || '',
                bio: targetUser.bio || '',
                shift: targetUser.shift || 'Hành chính',
                workStatus: targetUser.workStatus || 'active',
                isActive: targetUser.isActive
            });
        }
    }, [targetUser, isOpen]);

    if (!isOpen || !targetUser || !currentUser) return null;

    // Permission Logic
    const isAdmin = currentUser.role.name === 'admin';
    const isManager = currentUser.role.name === 'manager';
    const isSelf = currentUser._id === targetUser._id;

    // Field Access Control
    const canEditPersonalInfo = isAdmin || isSelf; // User/Owner can edit own info, Manager own, Admin all
    const canEditWorkInfo = isAdmin || (isManager && !isSelf); // Manager can edit others' work info, Admin all. Note: Manager cannot edit OWN shift (implied by "cannot update personal of others" vs usually managers can't set own shift?)
    // Re-reading rules:
    // Admin: ALL fields for ANY user.
    // Manager: Update shift/workStatus for ANY user. Update OWN personal info. 
    // User/Owner: ONLY OWN personal info.

    // Let's refine based on "Manager: Can update shift and workStatus for ANY user"
    const canEditShiftStatus = isAdmin || isManager;

    // "Manager: can update OWN personal info; CANNOT update personal info of others."
    const canEditPersonalDetails = isAdmin || isSelf;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(targetUser._id, formData);
    };

    const handleInputChange = (field: keyof UpdateUserProfilePayload, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={isLoading ? undefined : onClose}
            />

            {/* Modal */}
            <div className="relative bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 border border-white/10 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                Cập nhật thông tin
                            </h2>
                            <p className="text-blue-100 text-sm">
                                {targetUser.name} - {targetUser.role.name}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className={`p-2 rounded-xl transition-all duration-300 group ${isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-white/10 cursor-pointer'}`}
                        >
                            <XMarkIcon className={`w-6 h-6 text-white transition-transform duration-300 ${isLoading ? '' : 'group-hover:rotate-90'}`} />
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Personal Info Section */}
                        <div className="md:col-span-2">
                            <h3 className="text-white font-semibold mb-4 border-b border-white/10 pb-2">Thông tin cá nhân</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name || ''}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        disabled={!canEditPersonalDetails}
                                        className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${!canEditPersonalDetails ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        disabled={!canEditPersonalDetails}
                                        className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${!canEditPersonalDetails ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone || ''}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        disabled={!canEditPersonalDetails}
                                        className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${!canEditPersonalDetails ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Work Info Section */}
                        <div className="md:col-span-2">
                            <h3 className="text-white font-semibold mb-4 border-b border-white/10 pb-2">Thông tin công việc</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Shift */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Ca làm việc
                                    </label>
                                    <select
                                        value={formData.shift || 'Hành chính'}
                                        onChange={(e) => handleInputChange('shift', e.target.value)}
                                        disabled={!canEditShiftStatus}
                                        className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${!canEditShiftStatus ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <option value="Hành chính" className="bg-gray-800">Hành chính</option>
                                        <option value="Morning" className="bg-gray-800">Ca sáng</option>
                                        <option value="Afternoon" className="bg-gray-800">Ca chiều</option>
                                        <option value="Evening" className="bg-gray-800">Ca tối</option>
                                    </select>
                                </div>

                                {/* Work Status */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        Trạng thái làm việc
                                    </label>
                                    <div className="flex gap-4">
                                        <label className={`flex items-center gap-2 ${canEditShiftStatus ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                                            <input
                                                type="radio"
                                                name="workStatus"
                                                value="active"
                                                checked={formData.workStatus === 'active'}
                                                onChange={(e) => handleInputChange('workStatus', e.target.value)}
                                                disabled={!canEditShiftStatus}
                                                className="w-4 h-4 text-green-500 bg-white/5 border-white/10 focus:ring-green-500 focus:ring-2"
                                            />
                                            <span className="text-white">Đang hoạt động</span>
                                        </label>
                                        <label className={`flex items-center gap-2 ${canEditShiftStatus ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                                            <input
                                                type="radio"
                                                name="workStatus"
                                                value="on_leave"
                                                checked={formData.workStatus === 'on_leave'}
                                                onChange={(e) => handleInputChange('workStatus', e.target.value)}
                                                disabled={!canEditShiftStatus}
                                                className="w-4 h-4 text-orange-500 bg-white/5 border-white/10 focus:ring-orange-500 focus:ring-2"
                                            />
                                            <span className="text-white">Nghỉ phép</span>
                                        </label>
                                        <label className={`flex items-center gap-2 ${canEditShiftStatus ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                                            <input
                                                type="radio"
                                                name="workStatus"
                                                value="inactive"
                                                checked={formData.workStatus === 'inactive'}
                                                onChange={(e) => handleInputChange('workStatus', e.target.value)}
                                                disabled={!canEditShiftStatus}
                                                className="w-4 h-4 text-gray-500 bg-white/5 border-white/10 focus:ring-gray-500 focus:ring-2"
                                            />
                                            <span className="text-white">Đã nghỉ việc</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className={`flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium transition-all duration-300 ${isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-white/10 cursor-pointer'}`}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isLoading
                                ? 'opacity-75 cursor-not-allowed'
                                : 'hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 cursor-pointer'}`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Đang cập nhật...</span>
                                </>
                            ) : (
                                'Lưu thay đổi'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
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
        </div>
    );
}
