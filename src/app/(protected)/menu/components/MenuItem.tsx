'use client';

import {
    PencilSquareIcon,
    TrashIcon,
    FireIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export interface MenuItemData {
    id: string | number; // Support both API (string) and legacy (number)
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    reviews: number;
    status: 'available' | 'out_of_stock';
    popular: boolean;
    spicy: boolean;
    vegetarian: boolean;
}

interface MenuItemProps {
    item: MenuItemData;
    onEdit?: (item: MenuItemData) => void;
    onDelete?: (item: MenuItemData) => void;
}

export default function MenuItem({ item, onEdit, onDelete }: MenuItemProps) {
    const isOutOfStock = item.status === 'out_of_stock';

    return (
        <div
            className={`group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer ${isOutOfStock ? 'opacity-60' : ''
                }`}
        >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.popular && (
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                            <SparklesIcon className="w-3 h-3" />
                            Popular
                        </span>
                    )}
                    {item.spicy && (
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                            <FireIcon className="w-3 h-3" />
                            Cay
                        </span>
                    )}
                    {item.vegetarian && (
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                            🌱 Chay
                        </span>
                    )}
                </div>

                {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-xl shadow-lg">
                            Hết hàng
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="relative p-5">
                {/* Category */}
                <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 mb-3">
                    {item.category}
                </span>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {item.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
                    {item.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <StarIconSolid
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(item.rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-400">
                        {item.rating} ({item.reviews})
                    </span>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400">Giá</p>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                            {item.price.toLocaleString('vi-VN')}đ
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.(item);
                            }}
                            className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-pointer"
                        >
                            <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.(item);
                            }}
                            className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
