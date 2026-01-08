'use client';

import { useState, useEffect } from 'react';
import type { Order, OrderItem } from '@/types/order.types';
import { useKitchenStore } from '@/stores/kitchenStore';
import PageHeader from '@/components/ui/PageHeader';
import {
    FireIcon,
    CheckCircleIcon,
    ClockIcon,
    UserCircleIcon,
    PlayIcon,
    CheckIcon
} from '@heroicons/react/24/outline';

export default function KitchenPage() {
    const { kitchenQueue, fetchQueue, startItem, markItemReady, isLoading } = useKitchenStore();

    // Fetch kitchen queue on mount
    useEffect(() => {
        fetchQueue();
        // Poll every 30 seconds for updates
        const interval = setInterval(() => fetchQueue(), 30000);
        return () => clearInterval(interval);
    }, [fetchQueue]);

    const pendingOrders = kitchenQueue.filter(o => o.status === 'pending');
    const cookingOrders = kitchenQueue.filter(o => o.status === 'in-progress');
    const readyOrders = kitchenQueue.filter(o => o.status === 'ready');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
            <PageHeader
                theme="red"
                badgeText="Kitchen Display System"
                titleVietnamese="Màn hình bếp"
                titleEnglish="Kitchen Display"
                description="Quản lý trạng thái món ăn theo thời gian thực"
            />

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-400">Chờ xác nhận</p>
                            <p className="text-3xl font-bold text-white">{pendingOrders.length}</p>
                        </div>
                        <ClockIcon className="w-10 h-10 text-blue-400" />
                    </div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-orange-400">Đang chế biến</p>
                            <p className="text-3xl font-bold text-white">{cookingOrders.length}</p>
                        </div>
                        <FireIcon className="w-10 h-10 text-orange-400" />
                    </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-400">Sẵn sàng</p>
                            <p className="text-3xl font-bold text-white">{readyOrders.length}</p>
                        </div>
                        <CheckCircleIcon className="w-10 h-10 text-green-400" />
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <KitchenColumn
                    title="Mới / Chờ xác nhận"
                    orders={pendingOrders}
                    icon={ClockIcon}
                    color="blue"
                    onStartItem={startItem}
                    onMarkReady={markItemReady}
                />

                <KitchenColumn
                    title="Đang chế biến"
                    orders={cookingOrders}
                    icon={FireIcon}
                    color="orange"
                    onStartItem={startItem}
                    onMarkReady={markItemReady}
                />

                <KitchenColumn
                    title="Sẵn sàng phục vụ"
                    orders={readyOrders}
                    icon={CheckCircleIcon}
                    color="green"
                    onStartItem={startItem}
                    onMarkReady={markItemReady}
                />
            </div>
        </div>
    );
}

function KitchenColumn({
    title,
    orders,
    icon: Icon,
    color,
    onStartItem,
    onMarkReady
}: {
    title: string;
    orders: Order[];
    icon: any;
    color: 'blue' | 'orange' | 'green';
    onStartItem: (itemId: string, orderId: string) => Promise<void>;
    onMarkReady: (itemId: string, orderId: string) => Promise<void>;
}) {
    const colorStyles = {
        blue: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            text: 'text-blue-400',
            headerBg: 'from-blue-600/20 to-cyan-600/20',
        },
        orange: {
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            text: 'text-orange-400',
            headerBg: 'from-orange-600/20 to-amber-600/20',
        },
        green: {
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            text: 'text-green-400',
            headerBg: 'from-green-600/20 to-emerald-600/20',
        }
    };

    const style = colorStyles[color];

    return (
        <div className="flex flex-col h-full">
            <div className={`p-4 rounded-t-2xl bg-gradient-to-r ${style.headerBg} border-t border-x ${style.border} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${style.text}`} />
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full ${style.bg} ${style.text} font-bold text-sm border ${style.border}`}>
                    {orders.length}
                </span>
            </div>

            <div className={`flex-1 p-4 bg-white/5 border-x border-b border-white/10 rounded-b-2xl space-y-4 min-h-[500px]`}>
                {orders.map(order => (
                    <KitchenOrderCard
                        key={order._id}
                        order={order}
                        color={color}
                        onStartItem={onStartItem}
                        onMarkReady={onMarkReady}
                    />
                ))}
                {orders.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 py-10">
                        <Icon className="w-12 h-12 mb-2" />
                        <p className="text-sm">Không có đơn hàng</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function KitchenOrderCard({
    order,
    color,
    onStartItem,
    onMarkReady
}: {
    order: Order;
    color: string;
    onStartItem: (itemId: string, orderId: string) => Promise<void>;
    onMarkReady: (itemId: string, orderId: string) => Promise<void>;
}) {
    // Helper to format time relative
    const getTimeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins} phút trước`;
        const hours = Math.floor(mins / 60);
        return `${hours} giờ ${mins % 60} phút trước`;
    };

    return (
        <div className="bg-gray-800 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start mb-3 pb-3 border-b border-white/5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-white">{order.tableNumber}</span>
                        <span className="text-xs text-gray-400">#{order._id.slice(-6)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <UserCircleIcon className="w-3 h-3" />
                        {order.numberOfGuests} khách
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-yellow-400 font-medium bg-yellow-400/10 px-2 py-1 rounded-lg">
                        <ClockIcon className="w-3 h-3" />
                        {getTimeAgo(order.createdAt)}
                    </div>
                </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
                {order.items.map((item) => (
                    <KitchenItemCard
                        key={item._id}
                        item={item}
                        orderId={order._id}
                        onStartItem={onStartItem}
                        onMarkReady={onMarkReady}
                    />
                ))}
            </div>
        </div>
    );
}

function KitchenItemCard({
    item,
    orderId,
    onStartItem,
    onMarkReady
}: {
    item: OrderItem;
    orderId: string;
    onStartItem: (itemId: string, orderId: string) => Promise<void>;
    onMarkReady: (itemId: string, orderId: string) => Promise<void>;
}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { updatePriority } = useKitchenStore();

    const handleStart = async () => {
        setIsProcessing(true);
        await onStartItem(item._id, orderId);
        setIsProcessing(false);
    };

    const handleReady = async () => {
        setIsProcessing(true);
        await onMarkReady(item._id, orderId);
        setIsProcessing(false);
    };

    const handlePriorityChange = async (newPriority: 'normal' | 'high' | 'urgent') => {
        if (newPriority === item.priority) return;
        await updatePriority(item._id, orderId, newPriority);
    };

    const priorityColors = {
        normal: 'text-gray-400 bg-gray-500/20',
        high: 'text-yellow-400 bg-yellow-500/20',
        urgent: 'text-red-400 bg-red-500/20'
    };

    const priorityLabels = {
        normal: 'Bình thường',
        high: 'Cao',
        urgent: 'Khẩn cấp'
    };

    return (
        <div className="bg-gray-700/30 rounded-lg p-3 border border-white/5">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-2 flex-1">
                    <span className="font-bold text-white w-6 text-center bg-white/10 rounded px-1">
                        {item.quantity}
                    </span>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-gray-200 font-medium">{item.name}</span>

                            {/* Priority Dropdown */}
                            <select
                                value={item.priority}
                                onChange={(e) => handlePriorityChange(e.target.value as 'normal' | 'high' | 'urgent')}
                                className={`text-xs font-bold uppercase px-2 py-0.5 rounded border border-white/10 transition-colors cursor-pointer ${priorityColors[item.priority]}`}
                            >
                                <option value="normal" className="bg-gray-800">Bình thường</option>
                                <option value="high" className="bg-gray-800">Cao</option>
                                <option value="urgent" className="bg-gray-800">Khẩn cấp</option>
                            </select>
                        </div>
                        {item.notes && (
                            <span className="text-xs text-red-400 italic block mt-1">
                                Ghi chú: {item.notes}
                            </span>
                        )}

                    </div>
                </div>
            </div>

            {/* Item Status & Actions */}
            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-400 flex items-center gap-3 flex-wrap">
                    {item.assignedTo && (
                        <span className="flex items-center gap-1">
                            <UserCircleIcon className="w-3 h-3" />
                            {item.assignedTo.name}
                        </span>
                    )}
                    {item.estimatedTime && (
                        <span className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            ~{item.estimatedTime}p
                        </span>
                    )}
                    {item.actualTime && (
                        <span className="flex items-center gap-1 text-green-400 font-medium">
                            <ClockIcon className="w-3 h-3" />
                            ✓ {item.actualTime}p
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                {item.kitchenStatus === 'queued' && (
                    <button
                        onClick={handleStart}
                        disabled={isProcessing}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <PlayIcon className="w-3 h-3" />
                        {isProcessing ? 'Đang xử lý...' : 'Bắt đầu'}
                    </button>
                )}

                {item.kitchenStatus === 'preparing' && (
                    <button
                        onClick={handleReady}
                        disabled={isProcessing}
                        className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CheckIcon className="w-3 h-3" />
                        {isProcessing ? 'Đang xử lý...' : 'Sẵn sàng'}
                    </button>
                )}

                {item.kitchenStatus === 'ready' && (
                    <span className="text-xs text-green-400 font-medium">
                        ✓ Đã sẵn sàng
                    </span>
                )}
            </div>
        </div>
    );
}
