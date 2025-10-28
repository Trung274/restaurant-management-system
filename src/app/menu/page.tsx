'use client';

import { useState, useMemo } from 'react';
import { menuItems, categories, categoryConfig, menuStats } from './mockData';
import StatsCard from '@/components/ui/StatsCard';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  StarIcon,
  FireIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const totalItems = menuItems.length;
  const availableItems = menuItems.filter(i => i.status === 'available').length;
  const popularItems = menuItems.filter(i => i.popular).length;
  const outOfStockItems = menuItems.filter(i => i.status === 'out_of_stock').length;

  // Tính toán stats động
  const statsData = useMemo(() => {
    return menuStats.map(stat => {
      let value = stat.value;

      switch (stat.id) {
        case 'total':
          value = totalItems;
          break;
        case 'available':
          value = availableItems;
          break;
        case 'popular':
          value = popularItems;
          break;
        case 'out_of_stock':
          value = outOfStockItems;
          break;
      }

      return { ...stat, value };
    });
  }, [totalItems, availableItems, popularItems, outOfStockItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            Menu Management
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Quản lý thực đơn
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mt-2">
            Menu Management
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Quản lý món ăn, đồ uống và giá cả trong nhà hàng
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            colorScheme={stat.colorScheme}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm món ăn theo tên, mô tả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Add Menu Button */}
        <button className="group relative px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
          <PlusIcon className="w-5 h-5" />
          <span>Thêm món mới</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => {
          const config = categoryConfig[category as keyof typeof categoryConfig];
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${selectedCategory === category
                  ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:scale-105'
                }`}
            >
              <span className="text-lg">{config.icon}</span>
              <span>{category}</span>
            </button>
          );
        })}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const isOutOfStock = item.status === 'out_of_stock';

          return (
            <div
              key={item.id}
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
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-red-400 hover:border-red-500/30 transition-all">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
          <div className="text-7xl mb-6">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Không tìm thấy món ăn nào
          </h3>
          <p className="text-gray-400 mb-6">
            Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Tất cả');
              setSearchQuery('');
            }}
            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Best Sellers Section */}
      <div className="mt-12 relative bg-gradient-to-br from-orange-600/20 to-amber-600/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                🏆 Món bán chạy nhất
              </h2>
              <p className="text-gray-300">
                Top các món ăn được khách hàng yêu thích nhất
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
              Xem báo cáo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuItems.filter(i => i.popular).slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r ${index === 0 ? 'from-yellow-500 to-amber-500' :
                        index === 1 ? 'from-gray-400 to-gray-500' :
                          'from-orange-500 to-amber-600'
                      } rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {index + 1}
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">{item.reviews} đánh giá</p>
                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                      {item.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}