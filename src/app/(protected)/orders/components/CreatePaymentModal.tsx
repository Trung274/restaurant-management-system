'use client';

import { useState } from 'react';
import type { Order } from '@/types/order.types';
import type { PaymentMethod } from '@/types/payment.types';
import { usePaymentsStore } from '@/stores/paymentsStore';
import { XMarkIcon, CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface CreatePaymentModalProps {
    order: Order;
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const paymentMethodOptions: Array<{ value: PaymentMethod; label: string; icon: string }> = [
    { value: 'cash', label: 'Tiền mặt', icon: '💵' },
    { value: 'card', label: 'Thẻ', icon: '💳' },
    { value: 'bank-transfer', label: 'Chuyển khoản', icon: '🏦' },
    { value: 'others', label: 'Khác', icon: '💰' },
];

export default function CreatePaymentModal({ order, isOpen, onClose, onSuccess }: CreatePaymentModalProps) {
    const { createPayment } = usePaymentsStore();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await createPayment({
            orderId: order._id,
            paymentMethod,
            notes: notes.trim() || undefined,
        });

        setIsSubmitting(false);

        if (result) {
            // Reset form
            setPaymentMethod('cash');
            setNotes('');
            onClose();
            onSuccess?.();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
                onClick={isSubmitting ? undefined : onClose}
            />

            {/* Modal */}
            <div className="relative bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 border border-white/10 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <CurrencyDollarIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Thanh toán</h2>
                                <p className="text-green-100 text-sm">Xác nhận thanh toán đơn hàng</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className={`p-2 rounded-xl transition-all duration-300 group ${isSubmitting
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-white/10 cursor-pointer'
                                }`}
                        >
                            <XMarkIcon className={`w-6 h-6 text-white transition-transform duration-300 ${isSubmitting ? '' : 'group-hover:rotate-90'
                                }`} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Order Summary */}
                    <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">Thông tin đơn hàng</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Bàn:</span>
                                <span className="text-white font-medium">{order.tableNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Số món:</span>
                                <span className="text-white font-medium">{order.items?.length || 0} món</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-white/10">
                                <span className="text-gray-400 font-semibold">Tổng tiền:</span>
                                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                                    {(order.totalAmount || 0).toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            Phương thức thanh toán <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {paymentMethodOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setPaymentMethod(option.value)}
                                    className={`p-4 rounded-xl border transition-all duration-300 ${paymentMethod === option.value
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-500 text-white shadow-lg shadow-green-500/30'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">{option.icon}</div>
                                    <div className="text-sm font-medium">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Ghi chú (tùy chọn)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Nhập ghi chú nếu cần..."
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className={`flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium transition-all duration-300 ${isSubmitting
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-white/10 cursor-pointer'
                                }`}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting
                                    ? 'opacity-75 cursor-not-allowed'
                                    : 'hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 cursor-pointer'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircleIcon className="w-5 h-5" />
                                    <span>Xác nhận thanh toán</span>
                                </>
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
            `}</style>
        </div>
    );
}
