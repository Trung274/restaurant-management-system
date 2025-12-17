'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { categories } from '../../menu/mockData';
import { tables } from '../../tables/mockData';
import { customers } from '../../customers/mockData';
import { useMenuStore } from '@/stores/menuStore';
import { toast } from '@/utils/toast';

interface OrderItem {
    id: string;
    menuItemId: string | '';
    name: string;
    quantity: number;
    price: number;
}

interface CreateOrderOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (orderData: any) => void;
}

export default function CreateOrderOverlay({ isOpen, onClose, onSubmit }: CreateOrderOverlayProps) {
    const [customer, setCustomer] = useState('');
    const [table, setTable] = useState('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { id: '1', menuItemId: '' as const, name: '', quantity: 1, price: 0 }
    ]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    // Get menu items from store
    const { items: menuItems, isLoading: isLoadingMenu, fetchMenuItems } = useMenuStore();

    // Fetch menu items when overlay opens (if not already loaded)
    useEffect(() => {
        if (isOpen && menuItems.length === 0) {
            fetchMenuItems({ status: 'available' });
        }
    }, [isOpen, menuItems.length]);

    // Auto-calculate total
    const total = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    // Filter menu items by category
    const filteredMenuItems = selectedCategory === 'Tất cả'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    // Reset form when overlay closes
    useEffect(() => {
        if (!isOpen) {
            setCustomer('');
            setTable('');
            setOrderItems([{ id: '1', menuItemId: '' as const, name: '', quantity: 1, price: 0 }]);
            setSelectedCategory('Tất cả');
        }
    }, [isOpen]);

    const addOrderItem = () => {
        const newId = (orderItems.length + 1).toString();
        setOrderItems([...orderItems, { id: newId, menuItemId: '' as const, name: '', quantity: 1, price: 0 }]);
    };

    const removeOrderItem = (id: string) => {
        if (orderItems.length > 1) {
            setOrderItems(orderItems.filter(item => item.id !== id));
        }
    };

    const updateOrderItem = (id: string, field: keyof OrderItem, value: string | number) => {
        setOrderItems(orderItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleMenuItemSelect = (orderId: string, menuItemId: string) => {
        const selectedMenuItem = menuItems.find(item => item.id === menuItemId);
        if (selectedMenuItem) {
            setOrderItems(orderItems.map(item =>
                item.id === orderId
                    ? { ...item, menuItemId, name: selectedMenuItem.name, price: selectedMenuItem.price }
                    : item
            ));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!customer.trim() || !table.trim()) {
            toast.warning('Vui lòng nhập tên khách hàng và số bàn');
            return;
        }

        const validItems = orderItems.filter(item => item.menuItemId && item.price > 0);
        if (validItems.length === 0) {
            toast.warning('Vui lòng chọn ít nhất một món ăn');
            return;
        }

        const orderData = {
            customer,
            table,
            items: validItems.length,
            total,
            status: 'pending',
            orderItems: validItems
        };

        onSubmit(orderData);
        onClose();
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
                    {/* Customer Info Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">👤</span>
                            Thông tin khách hàng
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Customer Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tên khách hàng <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    list="customers-list"
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                    placeholder="Chọn hoặc nhập tên khách hàng"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    required
                                />
                                <datalist id="customers-list">
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.name}>
                                            {c.name} - {c.membershipLevel.toUpperCase()} ({c.phone})
                                        </option>
                                    ))}
                                </datalist>
                                <p className="text-xs text-gray-500 mt-1">
                                    Gõ để tìm khách quen hoặc nhập tên mới
                                </p>
                            </div>

                            {/* Table */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Chọn bàn <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={table}
                                    onChange={(e) => setTable(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all cursor-pointer"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Chọn bàn...</option>
                                    {tables
                                        .filter(t => t.status === 'available')
                                        .map((t) => (
                                            <option key={t.id} value={`Bàn ${t.number}`} className="bg-gray-800">
                                                Bàn {t.number} - {t.capacity} chỗ ({t.section}, {t.floor})
                                            </option>
                                        ))
                                    }
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    Chỉ hiển thị bàn trống
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
                            {categories.map((category: string) => (
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
                            {orderItems.map((item, index) => {
                                const selectedMenuItem = item.menuItemId ? menuItems.find(m => m.id === item.menuItemId) : undefined;

                                return (
                                    <div
                                        key={item.id}
                                        className="relative bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                                    >
                                        <div className="grid grid-cols-12 gap-3 items-center">
                                            {/* Menu Item Selection */}
                                            <div className="col-span-12 md:col-span-6">
                                                <label className="block text-xs font-medium text-gray-400 mb-1">
                                                    Chọn món <span className="text-red-400">*</span>
                                                </label>
                                                <select
                                                    value={item.menuItemId === '' ? '' : item.menuItemId}
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
                                            <div className="col-span-6 md:col-span-3">
                                                <label className="block text-xs font-medium text-gray-400 mb-1">
                                                    Đơn giá
                                                </label>
                                                <div className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm">
                                                    {item.price > 0 ? `${item.price.toLocaleString('vi-VN')}đ` : '-'}
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <div className="col-span-12 md:col-span-1 flex justify-end md:justify-center">
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
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-300">{item.name}</span>
                                                    {selectedMenuItem?.popular && (
                                                        <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">⭐ Popular</span>
                                                    )}
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
                            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            Tạo đơn hàng
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
