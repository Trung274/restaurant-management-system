'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, UserGroupIcon, ClockIcon, UserIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { toast } from '@/utils/toast';

interface TableStatusOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    table: any | null;
    isLoading?: boolean;
}

type Mode = 'check-in' | 'reservation';

export default function TableStatusOverlay({ isOpen, onClose, onSubmit, table, isLoading = false }: TableStatusOverlayProps) {
    const [mode, setMode] = useState<Mode>('check-in');

    const [formData, setFormData] = useState({
        guests: 1,
        time: '',
        customerName: '',
        customerPhone: '',
        note: ''
    });

    useEffect(() => {
        if (isOpen) {
            // Set default time to next 30 mins rounded if reservation
            const now = new Date();
            now.setMinutes(now.getMinutes() + 30);
            const timeString = now.toTimeString().slice(0, 5);

            setFormData({
                guests: table?.capacity || 2,
                time: timeString,
                customerName: '',
                customerPhone: '',
                note: ''
            });
            setMode('check-in'); // Default mode
        }
    }, [isOpen, table]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        if (formData.guests < 1) {
            toast.warning('Số lượng khách không hợp lệ');
            return;
        }

        if (mode === 'reservation') {
            if (!formData.time) {
                toast.warning('Vui lòng chọn thời gian đặt');
                return;
            }
            if (!formData.customerName.trim()) {
                toast.warning('Vui lòng nhập tên khách hàng');
                return;
            }
            if (!formData.customerPhone.trim()) {
                toast.warning('Vui lòng nhập số điện thoại');
                return;
            }
        }

        await onSubmit({
            mode,
            ...formData,
            tableId: table?.id
        });
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!isOpen || !table) return null;

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
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                Bàn {table.number}
                            </h2>
                            <p className="text-blue-100 text-sm">
                                {table.floor} - {table.section}
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

                {/* Mode Tabs */}
                <div className="p-2 bg-gray-900/50 flex gap-2 border-b border-white/5">
                    <button
                        type="button"
                        onClick={() => setMode('check-in')}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${mode === 'check-in'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <UserGroupIcon className="w-5 h-5" />
                        Vào bàn ngay
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('reservation')}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${mode === 'reservation'
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <ClockIcon className="w-5 h-5" />
                        Đặt trước
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Common Fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Số lượng khách
                        </label>
                        <div className="relative">
                            <UserGroupIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                min="1"
                                max={table.capacity * 2} // Allow slightly over capacity
                                value={formData.guests}
                                onChange={(e) => handleInputChange('guests', parseInt(e.target.value) || 0)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                                required
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                / {table.capacity} ghế
                            </div>
                        </div>
                    </div>

                    {mode === 'reservation' && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                                <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
                                    <ClockIcon className="w-4 h-4" />
                                    Thông tin đặt bàn
                                </h4>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1.5">Giờ đến</label>
                                        <input
                                            type="time"
                                            value={formData.time}
                                            onChange={(e) => handleInputChange('time', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500/50 transition-all"
                                            required={mode === 'reservation'}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1.5">Tên khách</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <input
                                                    type="text"
                                                    value={formData.customerName}
                                                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                                                    placeholder="Tên khách"
                                                    className="w-full pl-9 pr-3 py-2.5 bg-gray-900/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all"
                                                    required={mode === 'reservation'}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1.5">SĐT</label>
                                            <div className="relative">
                                                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <input
                                                    type="tel"
                                                    value={formData.customerPhone}
                                                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                                                    placeholder="09..."
                                                    className="w-full pl-9 pr-3 py-2.5 bg-gray-900/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all"
                                                    required={mode === 'reservation'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Ghi chú
                        </label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                            placeholder="Ghi chú thêm (khách quen, dị ứng, v.v.)"
                            rows={2}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
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
                            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${mode === 'check-in'
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/50'
                                    : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:shadow-lg hover:shadow-orange-500/50'
                                } text-white ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}`}
                        >
                            {isLoading ? 'Đang xử lý...' : (mode === 'check-in' ? 'Xác nhận vào bàn' : 'Hoàn tất đặt bàn')}
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
