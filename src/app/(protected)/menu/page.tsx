'use client';

import { useState, useMemo } from 'react';
import { menuItems, categories, categoryConfig, menuStats } from './mockData';
import StatsCard from '@/components/ui/StatsCard';
import {
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import { MenuItem, AddMenuItemOverlay, type MenuItemData } from './components';
import ConfirmDeleteOverlay from '@/components/forms/ConfirmDeleteOverlay';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItemData | null>(null);
  const [deleteItem, setDeleteItem] = useState<MenuItemData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string>('');

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

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;

    setIsDeleting(true);
    setDeleteError('');

    try {
      // TODO: Replace with actual API call
      // await deleteMenuItemAPI(deleteItem.id);

      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate random error for testing (remove in production)
      if (Math.random() < 0.3) {
        throw new Error('Không thể xóa món ăn. Vui lòng thử lại.');
      }

      console.log('Deleted menu item:', deleteItem);

      // Only close on success
      setDeleteItem(null);
      setDeleteError('');
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Không thể xóa món ăn. Vui lòng thử lại.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="amber"
        badgeText="Menu Management"
        titleVietnamese="Quản lý thực đơn"
        titleEnglish="Menu Management"
        description="Quản lý món ăn, đồ uống và giá cả trong nhà hàng"
      />

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
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Tìm kiếm món ăn theo tên, mô tả..."
          theme="amber"
        />

        {/* Add Menu Button */}
        <button
          onClick={() => setIsAddOverlayOpen(true)}
          className="group relative px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
        >
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
        {filteredItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onEdit={(item) => {
              setEditItem(item);
              setIsAddOverlayOpen(true);
            }}
            onDelete={(item) => {
              setDeleteItem(item);
            }}
          />
        ))}
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

      {/* Add Menu Item Overlay */}
      <AddMenuItemOverlay
        isOpen={isAddOverlayOpen}
        onClose={() => {
          setIsAddOverlayOpen(false);
          setEditItem(null);
        }}
        onSubmit={(menuItemData) => {
          if (editItem) {
            console.log('Update menu item:', menuItemData);
            // TODO: Implement actual menu item update logic
          } else {
            console.log('New menu item:', menuItemData);
            // TODO: Implement actual menu item creation logic
          }
        }}
        editItem={editItem}
      />

      {/* Confirm Delete Overlay */}
      <ConfirmDeleteOverlay
        isOpen={!!deleteItem}
        onClose={() => {
          setDeleteItem(null);
          setDeleteError('');
        }}
        onConfirm={handleDeleteConfirm}
        title="Xóa món ăn"
        description={`Bạn có chắc chắn muốn xóa món "${deleteItem?.name}" không?`}
        isLoading={isDeleting}
        error={deleteError}
      />
    </div>
  );
}