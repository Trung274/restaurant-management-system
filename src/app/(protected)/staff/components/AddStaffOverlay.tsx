'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { toast } from '@/utils/toast';
import { CreateUserPayload } from '@/types/auth.types';

interface AddStaffOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: CreateUserPayload) => Promise<void>;
    isLoading?: boolean;
}

export default function AddStaffOverlay({ isOpen, onClose, onSubmit, isLoading = false }: AddStaffOverlayProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'user',
        shift: 'Hành chính',
        workStatus: 'active' as 'active' | 'on_leave' | 'inactive'
    });

    // Reset form when overlay opens/closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: '',
                email: '',
                password: '',
                phone: '',
                role: 'user',
                shift: 'Hành chính',
                workStatus: 'active'
            });
            setShowPassword(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
            toast.warning('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        if (formData.password.length < 6) {
            toast.warning('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        // Create user payload
        const payload: CreateUserPayload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            phone: formData.phone.trim() || undefined,
            roleName: formData.role,
            shift: formData.shift,
            workStatus: formData.workStatus,
            isActive: true
        };

        await onSubmit(payload);
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!isOpen) return null;

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
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                Thêm nhân viên mới
                            </h2>
                            <p className="text-purple-100 text-sm">
                                Tạo tài khoản và phân quyền cho nhân viên
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Họ và tên <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Ví dụ: Nguyễn Văn A"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="email@restaurant.com"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="0901234567"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Vai trò <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => handleInputChange('role', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all cursor-pointer"
                                required
                            >
                                <option value="user" className="bg-gray-800">Nhân viên</option>
                                <option value="operations" className="bg-gray-800">Vận hành (Bếp/Bar)</option>
                                <option value="manager" className="bg-gray-800">Quản lý</option>
                                <option value="accountant" className="bg-gray-800">Kế toán</option>
                                <option value="admin" className="bg-gray-800">Quản trị viên</option>
                            </select>
                        </div>

                        {/* Shift */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Ca làm việc
                            </label>
                            <select
                                value={formData.shift}
                                onChange={(e) => handleInputChange('shift', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all cursor-pointer"
                            >
                                <option value="Hành chính" className="bg-gray-800">Hành chính</option>
                                <option value="Morning" className="bg-gray-800">Ca sáng</option>
                                <option value="Afternoon" className="bg-gray-800">Ca chiều</option>
                                <option value="Evening" className="bg-gray-800">Ca tối</option>
                            </select>
                        </div>

                        {/* Password */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Mật khẩu khởi tạo <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Tối thiểu 6 ký tự</p>
                        </div>

                        {/* Work Status */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Trạng thái làm việc
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="workStatus"
                                        value="active"
                                        checked={formData.workStatus === 'active'}
                                        onChange={(e) => handleInputChange('workStatus', e.target.value)}
                                        className="w-4 h-4 text-green-500 bg-white/5 border-white/10 focus:ring-green-500 focus:ring-2 cursor-pointer"
                                    />
                                    <span className="text-white">Đang hoạt động</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="workStatus"
                                        value="on_leave"
                                        checked={formData.workStatus === 'on_leave'}
                                        onChange={(e) => handleInputChange('workStatus', e.target.value)}
                                        className="w-4 h-4 text-orange-500 bg-white/5 border-white/10 focus:ring-orange-500 focus:ring-2 cursor-pointer"
                                    />
                                    <span className="text-white">Nghỉ phép</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="workStatus"
                                        value="inactive"
                                        checked={formData.workStatus === 'inactive'}
                                        onChange={(e) => handleInputChange('workStatus', e.target.value)}
                                        className="w-4 h-4 text-gray-500 bg-white/5 border-white/10 focus:ring-gray-500 focus:ring-2 cursor-pointer"
                                    />
                                    <span className="text-white">Đã nghỉ việc</span>
                                </label>
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
                            className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isLoading
                                ? 'opacity-75 cursor-not-allowed'
                                : 'hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 cursor-pointer'}`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                'Tạo nhân viên'
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
