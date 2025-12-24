import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { changePassword } from '@/lib/userService';
import { toast } from '@/utils/toast';

export const SecuritySettingsSection = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    // Password form state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState<{
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});

    const validatePasswordForm = (): boolean => {
        const errors: typeof validationErrors = {};

        if (!currentPassword) {
            errors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
        }

        if (!newPassword) {
            errors.newPassword = 'Vui lòng nhập mật khẩu mới';
        } else if (newPassword.length < 6) {
            errors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
        } else if (newPassword === currentPassword) {
            errors.newPassword = 'Mật khẩu mới phải khác mật khẩu hiện tại';
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else if (confirmPassword !== newPassword) {
            errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        // Clear previous validation errors
        setValidationErrors({});

        // Validate form
        if (!validatePasswordForm()) {
            toast.error('Vui lòng kiểm tra lại thông tin');
            return;
        }

        setSaveStatus('saving');

        try {
            const response = await changePassword({
                currentPassword,
                newPassword,
            });

            setSaveStatus('saved');
            toast.success(response.message || 'Đổi mật khẩu thành công!');

            // Clear password fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setValidationErrors({});

            // Exit edit mode after a short delay
            setTimeout(() => {
                setIsEditing(false);
                setSaveStatus('idle');
            }, 2000);
        } catch (error: any) {
            setSaveStatus('idle');
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Đổi mật khẩu thất bại';
            toast.error(errorMessage);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSaveStatus('idle');
        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setValidationErrors({});
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
                        className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors text-sm font-medium cursor-pointer"
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
                                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:scale-105'
                                }`}
                        >
                            {saveStatus === 'saved' ? (
                                <>
                                    <CheckIcon className="w-5 h-5" />
                                    Đã lưu
                                </>
                            ) : saveStatus === 'saving' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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

            <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Đổi mật khẩu</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            disabled={!isEditing}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {validationErrors.currentPassword && (
                            <p className="text-red-400 text-sm mt-1">{validationErrors.currentPassword}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={!isEditing}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {validationErrors.newPassword && (
                            <p className="text-red-400 text-sm mt-1">{validationErrors.newPassword}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={!isEditing}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {validationErrors.confirmPassword && (
                            <p className="text-red-400 text-sm mt-1">{validationErrors.confirmPassword}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={`p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl transition-all duration-300 group ${isEditing ? 'hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'opacity-75'}`}>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Xác thực hai yếu tố (2FA)</h3>
                        <p className="text-sm text-gray-400">Tăng cường bảo mật cho tài khoản</p>
                    </div>
                    <label className={`relative inline-flex items-center ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={is2FAEnabled}
                            onChange={() => isEditing && setIs2FAEnabled(!is2FAEnabled)}
                            disabled={!isEditing}
                        />
                        <div className={`w-14 h-7 bg-white/10 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-600 transition-all ${isEditing ? 'peer-hover:ring-2 peer-hover:ring-blue-500/30' : ''}`}></div>
                        <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7 shadow-sm"></div>
                    </label>
                </div>
                <p className="text-sm text-gray-400">
                    Khi bật tính năng này, bạn sẽ cần nhập mã xác thực từ ứng dụng di động mỗi khi đăng nhập.
                </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Phiên đăng nhập</h3>
                <div className="space-y-3">
                    {[
                        { device: 'Chrome - Windows', location: 'Hà Nội, VN', time: 'Hiện tại', active: true },
                        { device: 'Safari - iPhone', location: 'Hà Nội, VN', time: '2 giờ trước', active: false },
                        { device: 'Firefox - MacOS', location: 'TP.HCM, VN', time: '1 ngày trước', active: false }
                    ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex-1">
                                <p className="text-white font-medium flex items-center gap-2">
                                    {session.device}
                                    {session.active && <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>}
                                </p>
                                <p className="text-sm text-gray-400">{session.location} • {session.time}</p>
                            </div>
                            {!session.active && isEditing && (
                                <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                                    Đăng xuất
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

