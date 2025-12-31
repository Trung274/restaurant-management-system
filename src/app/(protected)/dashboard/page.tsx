'use client';
import MenuStatsSection from './components/MenuStatsSection';
import TableStatsSection from './components/TableStatsSection';
import UserStatsSection from './components/UserStatsSection';
import PageHeader from '@/components/ui/PageHeader';
import { useRestaurantStore } from '@/stores/restaurantStore';

export default function DashboardPage() {
  const restaurant = useRestaurantStore(state => state.restaurant);
  const restaurantName = restaurant?.name || 'Nhà hàng';
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="blue"
        badgeText="Restaurant Overview"
        titleVietnamese="Chào mừng trở lại"
        titleEnglish={restaurantName}
        description="Theo dõi hoạt động kinh doanh và hiệu suất nhà hàng"
      />

      {/* Menu Stats Section */}
      <MenuStatsSection />

      {/* User Stats Section */}
      <UserStatsSection />

      {/* Table Stats Section */}
      <TableStatsSection />

    </div>
  );
}