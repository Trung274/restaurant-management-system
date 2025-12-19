'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from '@/utils/toast';

interface AddTableOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (tableData: any) => Promise<void>;
    isLoading?: boolean;
    initialData?: {
        number: string;
        capacity: number;
        floor: string;
        section: string;
    };
}

export default function AddTableOverlay({ isOpen, onClose, onSubmit, isLoading = false, initialData }: AddTableOverlayProps) {
    const [formData, setFormData] = useState({
        number: '',
        capacity: '',
        floor: 'Tầng 1',
        section: 'Main',
        status: 'available'
    });

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                number: initialData.number,
                capacity: initialData.capacity.toString(),
                floor: initialData.floor,
                section: initialData.section,
                status: 'available'
            });
        } else if (!isOpen) {
            // Reset form when closing
            setFormData({
                number: '',
                capacity: '',
                floor: 'Tầng 1',
                section: 'Main',
                status: 'available'
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.number.trim()) {
            toast.warning('Vui lòng nhập số bàn');
            return;
        }

        const capacity = parseInt(formData.capacity);
        if (isNaN(capacity) || capacity <= 0) {
            toast.warning('Vui lòng nhập sức chứa hợp lệ');
            return;
        }

        // Submit data
        await onSubmit({
            ...formData,
            capacity,
            number: formData.number.trim()
        });

        // Reset form handled by effect or manually if needed, 
        // but typically parent closes modal which triggers reset if we implemented it that way.
        // For now, let's reset manually on success if we want, or rely on unmount/remount if parent conditions render.
        // But since it's an overlay always mounted usually, we should reset.
        setFormData({
            number: '',
            capacity: '',
            floor: 'Tầng 1',
            section: 'Thường',
            status: 'available'
        });
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
            <div className="relative bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 border border-white/10 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                {initialData ? 'Sửa thông tin bàn' : 'Thêm bàn mới'}
                            </h2>
                            <p className="text-green-100 text-sm">
                                {initialData ? 'Cập nhật thông tin bàn ăn' : 'Tạo bàn ăn mới cho nhà hàng'}
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
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Table Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Số bàn <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.number}
                                onChange={(e) => handleInputChange('number', e.target.value)}
                                placeholder="Ví dụ: 01, V1, 102"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                                required
                            />
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Sức chứa (người) <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={formData.capacity}
                                onChange={(e) => handleInputChange('capacity', e.target.value)}
                                placeholder="Ví dụ: 4"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                                required
                            />
                        </div>

                        {/* Floor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tầng <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={formData.floor}
                                onChange={(e) => handleInputChange('floor', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all cursor-pointer"
                            >
                                <option value="Tầng 1" className="bg-gray-800">Tầng 1</option>
                                <option value="Tầng 2" className="bg-gray-800">Tầng 2</option>
                            </select>
                        </div>

                        {/* Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Khu vực <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={formData.section}
                                onChange={(e) => handleInputChange('section', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all cursor-pointer"
                            >
                                <option value="Main" className="bg-gray-800">Thường</option>
                                <option value="VIP" className="bg-gray-800">VIP</option>
                                <option value="Outdoor" className="bg-gray-800">Ngoài trời</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
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
                            className={`flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isLoading
                                ? 'opacity-75 cursor-not-allowed'
                                : 'hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 cursor-pointer'}`}
                        >
                            {isLoading ? 'Đang xử lý...' : (initialData ? 'Cập nhật' : 'Thêm bàn')}
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
            `}</style>
        </div>
    );
}
