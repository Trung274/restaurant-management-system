'use client';

import { Order } from '../mockData';
import {
    ClockIcon,
    FireIcon,
    CheckCircleIcon,
    XCircleIcon,
    TruckIcon
} from '@heroicons/react/24/outline';

interface OrderListItemProps {
    order: Order;
    config: any; // Using the statusConfig type from parent would be better but keeping it loose for now or export it
}

export default function OrderListItem({ order, config }: OrderListItemProps) {
    const StatusIcon = config.icon;

    return (
        <div
            className={`group relative bg-gradient-to-br ${config.bg} backdrop-blur-sm border ${config.border} rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 cursor-pointer`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Order Icon/Avatar */}
                    <div className="relative hidden sm:block">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center text-white shadow-lg`}>
                            <StatusIcon className="w-8 h-8" />
                        </div>
                    </div>

                    {/* Order Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{order.id}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${config.gradient} text-white flex items-center gap-1`}>
                                {config.label}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                                👤 {order.customerName}
                            </span>
                            <span className="flex items-center gap-1">
                                🪑 {order.tableName}
                            </span>
                            <span className="flex items-center gap-1">
                                📦 {order.items.reduce((acc, item) => acc + item.quantity, 0)} món
                            </span>
                            <span className="flex items-center gap-1">
                                🕐 {new Date(order.orderTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Total */}
                    <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Tổng tiền</p>
                        <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}>
                            {order.totalAmount.toLocaleString('vi-VN')}đ
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all">
                            Chi tiết
                        </button>

                        {/* Logic: 
                            - Pending/In-progress: Kitchen manages these.
                            - Ready: Kitchen is done. Waiter marks as "Completed" (Served).
                            - Completed: Customer is eating/done. Waiter marks as "Payment" (Send to cashier).
                        */}
                        {order.status === 'ready' && (
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white hover:shadow-lg transition-all shadow-blue-500/20">
                                Hoàn thành
                            </button>
                        )}

                        {order.status === 'completed' && (
                            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white hover:shadow-lg transition-all shadow-green-500/20">
                                Thanh toán
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
