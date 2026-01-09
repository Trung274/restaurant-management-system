'use client';

import { useState } from 'react';
import type { Order } from '@/types/order.types';
import { useOrdersStore } from '@/stores/ordersStore';
import ConfirmActionOverlay from '@/components/forms/ConfirmActionOverlay';
import {
    XMarkIcon,
    ClockIcon,
    UserCircleIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline'; // Check if other icons needed

interface OrderDetailModalProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function OrderDetailModal({ order, isOpen, onClose }: OrderDetailModalProps) {
    const { serveOrder, cancelOrder } = useOrdersStore();
    const [isServing, setIsServing] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false); // Used for loading state
    const [showCancelConfirm, setShowCancelConfirm] = useState(false); // Used for overlay visibility

    if (!isOpen || !order) return null;

    const handleServe = async () => {
        setIsServing(true);
        await serveOrder(order._id);
        setIsServing(false);
        onClose();
    };

    const handleCancelClick = () => {
        setShowCancelConfirm(true);
    };

    const handleConfirmCancel = async () => {
        setIsCancelling(true);
        await cancelOrder(order._id, 'Cancelled by user');
        setIsCancelling(false);
        setShowCancelConfirm(false);
        onClose();
    };

    const statusColors = {
        pending: 'text-gray-400 bg-gray-500/20',
        'in-progress': 'text-orange-400 bg-orange-500/20',
        ready: 'text-green-400 bg-green-500/20',
        completed: 'text-blue-400 bg-blue-500/20',
        cancelled: 'text-red-400 bg-red-500/20'
    };

    const statusLabels = {
        pending: 'Chờ xác nhận',
        'in-progress': 'Đang thực hiện',
        ready: 'Sẵn sàng',
        completed: 'Hoàn thành',
        cancelled: 'Đã hủy'
    };

    const kitchenStatusLabels = {
        queued: 'Chờ xử lý',
        preparing: 'Đang nấu',
        ready: 'Sẵn sàng',
        served: 'Đã phục vụ'
    };

    const kitchenStatusColors = {
        queued: 'text-gray-400',
        preparing: 'text-orange-400',
        ready: 'text-green-400',
        served: 'text-blue-400'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-800 to-slate-800 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Chi tiết đơn hàng</h2>
                            <p className="text-gray-400 text-sm">#{order._id}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Order Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Bàn</p>
                            <p className="text-lg font-bold text-white">{order.tableNumber}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Số khách</p>
                            <p className="text-lg font-bold text-white">{order.numberOfGuests}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Trạng thái</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                            </span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Tiến độ bếp</p>
                            <p className="text-lg font-bold text-white">{order.kitchenProgress || 0}%</p>
                        </div>
                    </div>

                    {/* Time Info */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">Thông tin thời gian</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Check-in</p>
                                <p className="text-sm text-white">
                                    {new Date(order.checkInTime).toLocaleString('vi-VN')}
                                </p>
                            </div>
                            {order.checkOutTime && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Check-out</p>
                                    <p className="text-sm text-white">
                                        {new Date(order.checkOutTime).toLocaleString('vi-VN')}
                                    </p>
                                </div>
                            )}
                            {order.completedAt && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Hoàn thành</p>
                                    <p className="text-sm text-white">
                                        {new Date(order.completedAt).toLocaleString('vi-VN')}
                                    </p>
                                </div>
                            )}
                            {order.duration && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Tổng thời gian</p>
                                    <p className="text-sm text-green-400 font-medium">
                                        {order.duration}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Staff Info */}
                    {(order.createdBy || order.servedBy) && (
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                            <h4 className="text-sm font-semibold text-white mb-3">Thông tin nhân viên</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {order.createdBy && (
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Người tạo đơn</p>
                                        <div className="flex items-center gap-1.5">
                                            <UserCircleIcon className="w-4 h-4 text-gray-400" />
                                            <p className="text-sm text-white">
                                                {order.createdBy.name}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {order.servedBy && (
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Người phục vụ</p>
                                        <div className="flex items-center gap-1.5">
                                            <UserCircleIcon className="w-4 h-4 text-gray-400" />
                                            <p className="text-sm text-white">
                                                {order.servedBy.name}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Items List */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-white mb-4">Món ăn ({order.items?.length || 0})</h3>
                        <div className="space-y-3">
                            {order.items?.map((item) => (
                                <div key={item._id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-white">{item.name}</span>
                                                <span className="text-gray-400">x{item.quantity}</span>
                                            </div>
                                            {item.notes && (
                                                <p className="text-xs text-red-400 italic">Ghi chú: {item.notes}</p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-medium">
                                                {item.subtotal.toLocaleString('vi-VN')}đ
                                            </p>
                                        </div>
                                    </div>

                                    {/* Kitchen Status */}
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                                        <div className="flex items-center gap-4 text-xs flex-wrap">
                                            <span className={`font-medium ${kitchenStatusColors[item.kitchenStatus]}`}>
                                                {kitchenStatusLabels[item.kitchenStatus]}
                                            </span>

                                            {item.assignedTo && (
                                                <span className="text-gray-400 flex items-center gap-1">
                                                    <UserCircleIcon className="w-3 h-3" />
                                                    {item.assignedTo.name}
                                                </span>
                                            )}

                                            {item.estimatedTime && (
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <ClockIcon className="w-3 h-3" />
                                                    Dự kiến: ~{item.estimatedTime} phút
                                                </span>
                                            )}

                                            {item.actualTime && (
                                                <span className="text-xs text-green-400 flex items-center gap-1 font-medium">
                                                    <ClockIcon className="w-3 h-3" />
                                                    Thực tế: {item.actualTime} phút
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Item Timeline */}
                                    {(item.queuedAt || item.startedAt || item.readyAt || item.servedAt) && (
                                        <div className="mt-3 pt-3 border-t border-white/5">
                                            <p className="text-xs text-gray-400 mb-2">Timeline:</p>
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                {item.queuedAt && (
                                                    <div className="flex items-center gap-1 text-gray-400">
                                                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                                        <span>Vào hàng: {new Date(item.queuedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                )}
                                                {item.startedAt && (
                                                    <div className="flex items-center gap-1 text-orange-400">
                                                        <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                                        <span>Bắt đầu: {new Date(item.startedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                )}
                                                {item.readyAt && (
                                                    <div className="flex items-center gap-1 text-green-400">
                                                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                                        <span>Sẵn sàng: {new Date(item.readyAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                )}
                                                {item.servedAt && (
                                                    <div className="flex items-center gap-1 text-blue-400">
                                                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                                        <span>Phục vụ: {new Date(item.servedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-500/20">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Tạm tính</span>
                                <span className="text-white">{order.subtotal.toLocaleString('vi-VN')}đ</span>
                            </div>
                            {order.tax > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Thuế</span>
                                    <span className="text-white">{order.tax.toLocaleString('vi-VN')}đ</span>
                                </div>
                            )}
                            {order.serviceCharge > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Phí dịch vụ</span>
                                    <span className="text-white">{order.serviceCharge.toLocaleString('vi-VN')}đ</span>
                                </div>
                            )}
                            {order.discount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Giảm giá</span>
                                    <span className="text-red-400">-{order.discount.toLocaleString('vi-VN')}đ</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-2 border-t border-white/10">
                                <span className="text-lg font-bold text-white">Tổng cộng</span>
                                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                    {order.totalAmount.toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                        </div>
                    </div>

                    {order.notes && (
                        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                            <p className="text-xs text-yellow-400 mb-1">Ghi chú đơn hàng</p>
                            <p className="text-sm text-white">{order.notes}</p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-gradient-to-r from-gray-800 to-slate-800 border-t border-white/10 p-6">
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
                        >
                            Đóng
                        </button>

                        {order.status === 'pending' && (
                            <button
                                onClick={handleCancelClick}
                                disabled={isCancelling}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCancelling ? 'Đang hủy...' : 'Hủy đơn'}
                            </button>
                        )}

                        {order.status === 'ready' && (
                            <button
                                onClick={handleServe}
                                disabled={isServing}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isServing ? 'Đang xử lý...' : 'Hoàn thành phục vụ'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmActionOverlay
                isOpen={showCancelConfirm}
                onClose={() => setShowCancelConfirm(false)}
                onConfirm={handleConfirmCancel}
                title="Xác nhận hủy đơn"
                description={`Bạn có chắc chắn muốn hủy đơn hàng #${order._id.slice(-8)} không? hành động này không thể hoàn tác.`}
                confirmText="Hủy đơn"
                cancelText="Quay lại"
                type="danger"
                isLoading={isCancelling}
            />
        </div >
    );
}
