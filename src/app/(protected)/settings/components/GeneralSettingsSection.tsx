'use client';

import { useState, useEffect } from 'react';
import { useRestaurant } from '@/hooks/useRestaurant';
import { useAuth } from '@/hooks/useAuth';
import { hasPermission } from '@/lib/auth';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ButtonSpinner from '@/components/ui/ButtonSpinner';

export function GeneralSettingsSection({ gradient }: { gradient?: string }) {
  const { user } = useAuth();
  const { restaurant, isLoading, error, updateRestaurant, clearError } = useRestaurant();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    openTime: '',
    closeTime: '',
    description: '',
  });
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Check if user has permission to update
  const canUpdate = hasPermission(user, 'restaurant', 'update');

  // Initialize form data when restaurant is loaded
  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        phone: restaurant.phone,
        email: restaurant.email,
        address: restaurant.address,
        openTime: restaurant.openTime,
        closeTime: restaurant.closeTime,
        description: restaurant.description || '',
      });
    }
  }, [restaurant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!canUpdate) {
      setUpdateError('Bạn không có quyền cập nhật thông tin nhà hàng');
      return;
    }

    setSaveStatus('saving');
    setUpdateError(null);

    try {
      await updateRestaurant(formData);
      setSaveStatus('saved');
      setIsEditing(false);
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error: any) {
      setUpdateError(error.response?.data?.message || 'Cập nhật thất bại');
      setSaveStatus('idle');
    }
  };

  const handleCancel = () => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        phone: restaurant.phone,
        email: restaurant.email,
        address: restaurant.address,
        openTime: restaurant.openTime,
        closeTime: restaurant.closeTime,
        description: restaurant.description || '',
      });
    }
    setIsEditing(false);
    setUpdateError(null);
    clearError();
    setSaveStatus('idle');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-white/10 rounded-xl"></div>
        <div className="h-12 bg-white/10 rounded-xl"></div>
        <div className="h-32 bg-white/10 rounded-xl"></div>
      </div>
    );
  }

  // Error state
  if (error && !restaurant) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
        <p className="text-red-400">❌ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Edit/Save Buttons - Only show for admin */}
      {canUpdate && (
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {isEditing ? '🔓 Đang chỉnh sửa' : '🔒 Chế độ xem'}
            </span>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium cursor-pointer"
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
                    : `bg-gradient-to-r ${gradient ?? 'from-blue-500 to-cyan-500'} text-white hover:shadow-lg hover:scale-105`
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
      )}

      {/* Success Message */}
      {saveStatus === 'saved' && (
        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
          <p className="text-green-400 text-sm flex items-center gap-2">
            <CheckIcon className="w-5 h-5" />
            Cập nhật thành công!
          </p>
        </div>
      )}

      {/* Error Message */}
      {(error || updateError) && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
          <p className="text-red-400 text-sm">❌ {error || updateError}</p>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tên nhà hàng
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
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
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email liên hệ
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Địa chỉ
        </label>
        <textarea
          rows={3}
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none disabled:opacity-75 disabled:cursor-not-allowed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Giờ mở cửa
          </label>
          <input
            type="time"
            name="openTime"
            value={formData.openTime}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Giờ đóng cửa
          </label>
          <input
            type="time"
            name="closeTime"
            value={formData.closeTime}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Mô tả nhà hàng
        </label>
        <textarea
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none disabled:opacity-75 disabled:cursor-not-allowed"
        />
      </div>

      {/* Restaurant Status */}
      {restaurant && (
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Trạng thái hiện tại</p>
              <p className="text-xs text-gray-400">Dựa trên giờ hoạt động đã cài đặt</p>
            </div>
            {restaurant.isOpen ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 text-sm font-medium rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Đang mở cửa
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 text-gray-400 text-sm font-medium rounded-full">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Đã đóng cửa
              </span>
            )}
          </div>
        </div>
      )}

      {/* Info for non-admin users */}
      {!canUpdate && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-blue-400 text-sm">
            ℹ️ Bạn chỉ có quyền xem thông tin. Liên hệ quản trị viên để thay đổi.
          </p>
        </div>
      )}
    </div>
  );
}