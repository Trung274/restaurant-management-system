'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { CheckIcon } from '@heroicons/react/24/outline';
import ButtonSpinner from '@/components/ui/ButtonSpinner';
import { updateUserProfile } from '@/lib/userService';
import { toast } from '@/utils/toast';

export const ProfileSettingsSection = () => {
    const { user, checkAuth } = useAuth();

    const getRoleName = (roleName?: string): string => {
        if (!roleName) return 'Người dùng';

        const roleMap: Record<string, string> = {
            'admin': 'Quản trị viên',
            'manager': 'Quản lý',
            'operations': 'Vận hành',
            'accountant': 'Kế toán',
            'user': 'Người dùng',
        };

        return roleMap[roleName.toLowerCase()] || roleName;
    };

    const [isEditing, setIsEditing] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        avatar: '',
    });

    // Initialize form data when user is loaded
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                bio: user.bio || '',
                avatar: user.avatar || 'https://i.pravatar.cc/120',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = async () => {
        if (!user?._id) {
            toast.error('Không tìm thấy thông tin người dùng');
            return;
        }

        setSaveStatus('saving');

        try {
            const response = await updateUserProfile(user._id, formData);
            setSaveStatus('saved');
            toast.success(response.message || 'Cập nhật hồ sơ thành công!');

            // Refresh user data
            await checkAuth();

            // Exit edit mode after a short delay
            setTimeout(() => {
                setIsEditing(false);
                setSaveStatus('idle');
            }, 2000);
        } catch (error: any) {
            setSaveStatus('idle');
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Cập nhật hồ sơ thất bại';
            toast.error(errorMessage);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                bio: user.bio || '',
                avatar: user.avatar || 'https://i.pravatar.cc/120',
            });
        }
        setIsEditing(false);
        setSaveStatus('idle');
    };

    return (
        <div className="space-y-6">
            {/* Edit/Save Buttons */}
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                        {isEditing ? '🔓 Đang chỉnh sửa' : '🔒 Chế độ xem'}
                    </span>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                    >
                        Chỉnh sửa
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSave}
                            disabled={saveStatus === 'saving'}
                            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${saveStatus === 'saved'
                                ? 'bg-green-600 text-white'
                                : saveStatus === 'saving'
                                    ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
                                }`}
                        >
                            {saveStatus === 'saved' ? (
                                <>
                                    <CheckIcon className="w-5 h-5" />
                                    Đã lưu
                                </>
                            ) : saveStatus === 'saving' ? (
                                <>
                                    <ButtonSpinner />
                                    Đang lưu...
                                </>
                            ) : (
                                'Lưu thay đổi'
                            )}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={saveStatus === 'saving'}
                            className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all cursor-pointer"
                        >
                            Hủy bỏ
                        </button>
                    </div>
                )}
            </div>

            {/* Success Message */}
            {saveStatus === 'saved' && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                    <p className="text-green-400 text-sm flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" />
                        Cập nhật thành công!
                    </p>
                </div>
            )}

            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                    <img
                        src={formData.avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border-4 border-purple-500/30"
                    />
                    {isEditing && (
                        <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white hover:shadow-lg transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{formData.name || 'User'}</h3>
                    <p className="text-gray-400 text-sm">{getRoleName(user?.role?.name)}</p>
                </div>
            </div>

            {/* Avatar URL Input (only visible when editing) */}
            {isEditing && (
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        URL Avatar
                    </label>
                    <input
                        type="text"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="https://example.com/avatar.jpg"
                    />
                </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bộ phận
                    </label>
                    <input
                        type="text"
                        value={getRoleName(user?.role?.name)}
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all opacity-50 cursor-not-allowed"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Số điện thoại
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                </label>
                <textarea
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Quản lý nhà hàng với hơn 10 năm kinh nghiệm trong ngành F&B."
                />
            </div>
        </div>
    );
};
