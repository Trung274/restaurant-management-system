'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { categories } from '../mockData';
import type { MenuItemData } from './MenuItem';
import { toast } from '@/utils/toast';
import ButtonSpinner from '@/components/ui/ButtonSpinner';

interface AddMenuItemOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (menuItemData: Partial<MenuItemData>) => Promise<void>;
    editItem?: MenuItemData | null; // Optional item to edit
    isLoading?: boolean;
}

export default function AddMenuItemOverlay({ isOpen, onClose, onSubmit, editItem, isLoading = false }: AddMenuItemOverlayProps) {
    const isEditMode = !!editItem;

    const [formData, setFormData] = useState({
        name: '',
        category: 'Món chính',
        price: '',
        image: '',
        description: '',
        status: 'available' as 'available' | 'out_of_stock',
        popular: false,
        spicy: false,
        vegetarian: false
    });

    // Reset or pre-fill form when overlay opens/closes or editItem changes
    useEffect(() => {
        if (!isOpen) {
            // Reset form when closing
            setFormData({
                name: '',
                category: 'Món chính',
                price: '',
                image: '',
                description: '',
                status: 'available',
                popular: false,
                spicy: false,
                vegetarian: false
            });
        } else if (editItem) {
            // Pre-fill form with edit item data
            setFormData({
                name: editItem.name,
                category: editItem.category,
                price: editItem.price.toString(),
                image: editItem.image,
                description: editItem.description,
                status: editItem.status,
                popular: editItem.popular,
                spicy: editItem.spicy,
                vegetarian: editItem.vegetarian
            });
        }
    }, [isOpen, editItem]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.name.trim() || !formData.description.trim() || !formData.image.trim()) {
            toast.warning('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            toast.warning('Vui lòng nhập giá hợp lệ');
            return;
        }

        // Create menu item data
        const menuItemData: Partial<MenuItemData> = {
            ...(isEditMode && editItem ? { id: editItem.id } : {}), // Include ID when editing
            name: formData.name.trim(),
            category: formData.category,
            price: price,
            image: formData.image.trim(),
            description: formData.description.trim(),
            status: formData.status,
            popular: formData.popular,
            spicy: formData.spicy,
            vegetarian: formData.vegetarian,
            rating: editItem?.rating || 0,
            reviews: editItem?.reviews || 0
        };

        // Submit data - Parent handles success toast and closing
        await onSubmit(menuItemData);
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
            <div className="relative bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 border border-white/10 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                {isEditMode ? 'Chỉnh sửa món ăn' : 'Thêm món mới'}
                            </h2>
                            <p className="text-orange-100 text-sm">
                                {isEditMode ? 'Cập nhật thông tin món ăn' : 'Tạo món ăn mới cho thực đơn nhà hàng'}
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
                    {/* Basic Info Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">📝</span>
                            Thông tin cơ bản
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tên món <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Ví dụ: Phở bò đặc biệt"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Danh mục <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all cursor-pointer"
                                    required
                                >
                                    {categories.filter(c => c !== 'Tất cả').map((category) => (
                                        <option key={category} value={category} className="bg-gray-800">
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Giá (VNĐ) <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="1000"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    placeholder="Ví dụ: 85000"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    URL hình ảnh <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => handleInputChange('image', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Nhập URL hình ảnh món ăn (khuyến nghị kích thước 400x300)
                                </p>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Mô tả <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Mô tả chi tiết về món ăn..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status & Properties Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">⚙️</span>
                            Trạng thái & Thuộc tính
                        </h3>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Trạng thái món
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="available"
                                        checked={formData.status === 'available'}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-4 h-4 text-orange-600 bg-white/5 border-white/10 focus:ring-orange-500 focus:ring-2 cursor-pointer"
                                    />
                                    <span className="text-white">Đang bán</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="out_of_stock"
                                        checked={formData.status === 'out_of_stock'}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-4 h-4 text-orange-600 bg-white/5 border-white/10 focus:ring-orange-500 focus:ring-2 cursor-pointer"
                                    />
                                    <span className="text-white">Hết hàng</span>
                                </label>
                            </div>
                        </div>

                        {/* Properties Checkboxes */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Popular */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.popular}
                                        onChange={(e) => handleInputChange('popular', e.target.checked)}
                                        className="w-5 h-5 text-orange-600 bg-white/5 border-white/10 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                                    />
                                    <div>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            <span>⭐</span>
                                            Món phổ biến
                                        </div>
                                        <p className="text-xs text-gray-400">Hiển thị badge Popular</p>
                                    </div>
                                </label>
                            </div>

                            {/* Spicy */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.spicy}
                                        onChange={(e) => handleInputChange('spicy', e.target.checked)}
                                        className="w-5 h-5 text-orange-600 bg-white/5 border-white/10 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                                    />
                                    <div>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            <span>🌶️</span>
                                            Món cay
                                        </div>
                                        <p className="text-xs text-gray-400">Hiển thị badge Cay</p>
                                    </div>
                                </label>
                            </div>

                            {/* Vegetarian */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.vegetarian}
                                        onChange={(e) => handleInputChange('vegetarian', e.target.checked)}
                                        className="w-5 h-5 text-orange-600 bg-white/5 border-white/10 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                                    />
                                    <div>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            <span>🌱</span>
                                            Món chay
                                        </div>
                                        <p className="text-xs text-gray-400">Hiển thị badge Chay</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    {formData.name && formData.price && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">👁️</span>
                                Xem trước
                            </h3>
                            <div className="bg-gradient-to-br from-orange-600/20 to-amber-600/20 border border-orange-500/30 rounded-xl p-4">
                                <div className="flex items-center gap-4">
                                    {formData.image && (
                                        <img
                                            src={formData.image}
                                            alt={formData.name}
                                            className="w-24 h-24 rounded-lg object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/default-fallback-image.png';
                                            }}
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold text-lg mb-1">{formData.name}</h4>
                                        <p className="text-sm text-gray-300 mb-2">{formData.category}</p>
                                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                                            {formData.price ? parseFloat(formData.price).toLocaleString('vi-VN') : '0'}đ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
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
                            className={`flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isLoading
                                ? 'opacity-75 cursor-not-allowed'
                                : 'hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 cursor-pointer'}`}
                        >
                            {isLoading ? (
                                <>
                                    <ButtonSpinner />
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                isEditMode ? 'Cập nhật' : 'Tạo món mới'
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
