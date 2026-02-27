'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMenuStore } from '@/stores/menuStore';
import { useTablesStore } from '@/stores/tablesStore';
import { useOrdersStore } from '@/stores/ordersStore';
import { toast } from '@/utils/toast';
import type { CreateOrderPayload } from '@/types/order.types';

interface OrderItem {
    id: string;
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
    notes: string;

    estimatedTime?: number;
    priority: 'normal' | 'high' | 'urgent';
}

interface CreateOrderOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateOrderOverlay({ isOpen, onClose }: CreateOrderOverlayProps) {
    const [selectedTableId, setSelectedTableId] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [orderNotes, setOrderNotes] = useState('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { id: '1', menuItemId: '', name: '', quantity: 1, price: 0, notes: '', priority: 'normal' }
    ]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    // Get data from stores
    const { items: menuItems, isLoading: isLoadingMenu, fetchMenuItems } = useMenuStore();
    const { tables, fetchTables } = useTablesStore();
    const { createOrder, isLoading: isCreatingOrder } = useOrdersStore();

    // Get unique categories from menu items
    const categories = ['Tất cả', ...Array.from(new Set(menuItems.map(item => item.category)))];

    // Fetch data when overlay opens
    useEffect(() => {
        if (isOpen) {
            if (menuItems.length === 0) {
                fetchMenuItems({ status: 'available' });
            }
            if (tables.length === 0) {
                fetchTables();
            }
        }
    }, [isOpen]);

    // Auto-calculate total
    const total = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    // Filter menu items by category
    const filteredMenuItems = selectedCategory === 'Tất cả'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    // Get OCCUPIED tables only
    const occupiedTables = tables.filter(t => t.status === 'occupied');

    // Reset form when overlay closes
    useEffect(() => {
        if (!isOpen) {
            setSelectedTableId('');
            setNumberOfGuests(1);
            setOrderNotes('');
            setOrderItems([{ id: '1', menuItemId: '', name: '', quantity: 1, price: 0, notes: '', priority: 'normal' }]);
            setSelectedCategory('Tất cả');
        }
    }, [isOpen]);

    const addOrderItem = () => {
        const newId = (orderItems.length + 1).toString();
        setOrderItems([...orderItems, { id: newId, menuItemId: '', name: '', quantity: 1, price: 0, notes: '', priority: 'normal' }]);
    };

    const removeOrderItem = (id: string) => {
        if (orderItems.length > 1) {
            setOrderItems(orderItems.filter(item => item.id !== id));
        }
    };

    const updateOrderItem = (id: string, field: keyof OrderItem, value: any) => {
        setOrderItems(orderItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleMenuItemSelect = (orderId: string, menuItemId: string) => {
        const selectedMenuItem = menuItems.find(item => item.id === menuItemId);
        if (selectedMenuItem) {
            setOrderItems(orderItems.map(item =>
                item.id === orderId
                    ? {
                        ...item,
                        menuItemId,
                        name: selectedMenuItem.name,
                        price: selectedMenuItem.price,

                        estimatedTime: selectedMenuItem.estimatedTime
                    }
                    : item
            ));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!selectedTableId) {
            toast.warning('Vui lòng chọn bàn');
            return;
        }

        if (numberOfGuests < 1) {
            toast.warning('Số khách phải lớn hơn 0');
            return;
        }

        const validItems = orderItems.filter(item => item.menuItemId && item.price > 0);
        if (validItems.length === 0) {
            toast.warning('Vui lòng chọn ít nhất một món ăn');
            return;
        }

        // Find selected table
        const selectedTable = occupiedTables.find(t => t.id === selectedTableId);
        if (!selectedTable) {
            toast.error('Không tìm thấy thông tin bàn');
            return;
        }

        // Build payload matching backend schema
        const payload: CreateOrderPayload = {
            tableId: selectedTableId,
            tableNumber: selectedTable.number,
            numberOfGuests,
            items: validItems.map(item => ({
                menuItemId: item.menuItemId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                notes: item.notes || undefined,

                estimatedTime: item.estimatedTime,
                priority: item.priority
            })),
            notes: orderNotes || undefined
        };

        // Call API
        const result = await createOrder(payload);

        if (result) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 border border-white/10 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Tạo đơn hàng mới</h2>
                            <p className="text-blue-100 text-sm">Nhập thông tin đơn hàng của khách</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group cursor-pointer"
                        >
                            <XMarkIcon className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
                    {/* Table & Guest Info Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">🪑</span>
                            Thông tin bàn
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Table Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Chọn bàn <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={selectedTableId}
                                    onChange={(e) => {
                                        const tableId = e.target.value;
                                        setSelectedTableId(tableId);
                                        const table = occupiedTables.find(t => t.id === tableId);
                                        if (table?.activeSession?.currentGuests) {
                                            setNumberOfGuests(table.activeSession.currentGuests);
                                        }
                                    }}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all cursor-pointer"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Chọn bàn...</option>
                                    {occupiedTables.map((t) => (
                                        <option key={t.id} value={t.id} className="bg-gray-800">
                                            Bàn {t.number} - {t.capacity} chỗ ({t.section}, {t.floor})
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-blue-400 mt-1">
                                    {occupiedTables.length === 0 ? 'Chưa có bàn nào check-in' : `${occupiedTables.length} bàn đang hoạt động`}
                                </p>
                            </div>

                            {/* Number of Guests */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Số khách <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={numberOfGuests}
                                    onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
                                    placeholder="Nhập số khách"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all opacity-70 cursor-not-allowed"
                                    required
                                    disabled
                                    title="Số khách được lấy từ thông tin check-in bàn"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Số lượng khách ngồi bàn (đã check-in)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <span className="text-2xl">🍽️</span>
                                Món ăn
                            </h3>
                            <button
                                type="button"
                                onClick={addOrderItem}
                                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Thêm món
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-3">
                            {orderItems.map((item) => {
                                const selectedMenuItem = item.menuItemId ? menuItems.find(m => m.id === item.menuItemId) : undefined;

                                return (
                                    <div
                                        key={item.id}
                                        className="relative bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                                    >
                                        <div className="grid grid-cols-12 gap-3 items-start">
                                            {/* Menu Item Selection */}
                                            <div className="col-span-12 md:col-span-5">
                                                <label className="block text-xs font-medium text-gray-400 mb-1">
                                                    Chọn món <span className="text-red-400">*</span>
                                                </label>
                                                <select
                                                    value={item.menuItemId}
                                                    onChange={(e) => handleMenuItemSelect(item.id, e.target.value)}
                                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                    required
                                                    disabled={isLoadingMenu}
                                                >
                                                    <option value="" className="bg-gray-800">
                                                        {isLoadingMenu ? 'Đang tải menu...' : 'Chọn món ăn...'}
                                                    </option>
                                                    {filteredMenuItems.map((menuItem) => (
                                                        <option key={menuItem.id} value={menuItem.id} className="bg-gray-800">
                                                            {menuItem.name} - {menuItem.price.toLocaleString('vi-VN')}đ
                                                        </option>
                                                    ))}
                                                </select>
                                                {selectedMenuItem?.popular && (
                                                    <div className="mt-1">
                                                        <span className="text-[10px] px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">⭐ Món phổ biến</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-span-6 md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-400 mb-1">
                                                    Số lượng
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => updateOrderItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                                                />
                                            </div>

                                            {/* Price (Read-only) */}
                                            <div className="col-span-6 md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-400 mb-1">
                                                    Đơn giá
                                                </label>
                                                <div className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm">
                                                    {item.price > 0 ? `${item.price.toLocaleString('vi-VN')}đ` : '-'}
                                                </div>
                                            </div>

                                            {/* Note Input */}
                                            <div className="col-span-12 md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-400 mb-1">
                                                    Ghi chú
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.notes}
                                                    onChange={(e) => updateOrderItem(item.id, 'notes', e.target.value)}
                                                    placeholder="VD: Ít cay..."
                                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm placeholder-gray-600"
                                                />
                                            </div>

                                            {/* Remove Button */}
                                            <div className="col-span-12 md:col-span-1 flex justify-end md:justify-center pt-6 md:pt-0">
                                                <button
                                                    type="button"
                                                    onClick={() => removeOrderItem(item.id)}
                                                    disabled={orderItems.length === 1}
                                                    className={`p-2 rounded-lg transition-all ${orderItems.length === 1
                                                        ? 'opacity-30 cursor-not-allowed'
                                                        : 'hover:bg-red-500/20 text-red-400 hover:text-red-300 cursor-pointer'
                                                        }`}
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal */}
                                        {item.menuItemId && item.price > 0 && (
                                            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                                                <div className="text-xs text-gray-500 italic">
                                                    {item.notes && `Ghi chú: ${item.notes}`}
                                                </div>
                                                <p className="text-sm text-gray-400">
                                                    Thành tiền: <span className="text-blue-400 font-semibold text-base">
                                                        {(item.quantity * item.price).toLocaleString('vi-VN')}đ
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Notes */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Ghi chú đơn hàng
                        </label>
                        <textarea
                            value={orderNotes}
                            onChange={(e) => setOrderNotes(e.target.value)}
                            placeholder="Ghi chú đặc biệt cho đơn hàng..."
                            rows={2}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                        />
                    </div>

                    {/* Total Section */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-300 mb-1">Tổng cộng</p>
                                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    {total.toLocaleString('vi-VN')}đ
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-300 mb-1">Số món</p>
                                <p className="text-2xl font-bold text-white">
                                    {orderItems.filter(item => item.menuItemId && item.price > 0).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isCreatingOrder}
                            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isCreatingOrder}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreatingOrder ? 'Đang tạo...' : 'Tạo đơn hàng'}
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
