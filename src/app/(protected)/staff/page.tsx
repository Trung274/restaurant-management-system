'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatsCard from '@/components/ui/StatsCard';
import { staffStats, statusConfig, positionConfig } from './mockData';
import {
  PlusIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import { getAllUsers, getUserStats, createUser, deleteUser, updateUserProfile } from '@/lib/userService';
import { User, UserStatsResponse, CreateUserPayload, UpdateUserProfilePayload } from '@/types/auth.types';
import { toast } from '@/utils/toast';
import StaffCard from './components/StaffCard';
import AddStaffOverlay from './components/AddStaffOverlay';
import EditStaffOverlay from './components/EditStaffOverlay';
import ConfirmDeleteOverlay from '@/components/forms/ConfirmDeleteOverlay';
import { useAuth } from '@/hooks/useAuth';

export default function StaffPage() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [staffList, setStaffList] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStatsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);

  // Create state
  const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Edit state
  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Delete state
  const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string, name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch staff data and stats
  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersResponse, statsResponse] = await Promise.all([
        getAllUsers(),
        getUserStats()
      ]);

      if (usersResponse.success && usersResponse.data) {
        setStaffList(usersResponse.data);
      }
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }
    } catch (error: any) {
      console.error('Failed to fetch data:', error);
      if (error?.response?.data?.error?.includes('not authorized') || error?.message?.includes('not authorized')) {
        router.push('/unauthorized');
        return;
      }
      toast.error('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = async (payload: CreateUserPayload) => {
    try {
      setIsCreating(true);
      const response = await createUser(payload);

      if (response.success) {
        toast.success(response.message || 'Thêm nhân viên thành công');
        setIsAddOverlayOpen(false);
        fetchData(); // Refresh data
      }
    } catch (error: any) {
      console.error('Failed to create user:', error);
      toast.error(error.response?.data?.message || 'Không thể tạo nhân viên');
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditUser = async (id: string, payload: UpdateUserProfilePayload) => {
    try {
      setIsEditing(true);
      const response = await updateUserProfile(id, payload);

      if (response.success) {
        toast.success(response.message || 'Cập nhật thành công');
        setIsEditOverlayOpen(false);
        setUserToEdit(null);
        fetchData(); // Refresh data
      }
    } catch (error: any) {
      console.error('Failed to update user:', error);
      toast.error(error.response?.data?.message || 'Không thể cập nhật thông tin');
    } finally {
      setIsEditing(false);
    }
  };

  const openEditOverlay = (staff: User) => {
    setUserToEdit(staff);
    setIsEditOverlayOpen(true);
  };

  const confirmDeleteUser = (id: string, name: string) => {
    setUserToDelete({ id, name });
    setIsDeleteOverlayOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setIsDeleting(true);
      await deleteUser(userToDelete.id);
      toast.success('Đã xóa nhân viên thành công');
      setIsDeleteOverlayOpen(false);
      setUserToDelete(null);
      fetchData(); // Refresh data
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      toast.error(error.response?.data?.message || 'Không thể xóa nhân viên');
    } finally {
      setIsDeleting(false);
    }
  };

  // Map stats to display format
  const displayStats = useMemo(() => {
    if (!stats) return staffStats;

    return staffStats.map(stat => {
      let value = stat.value;
      switch (stat.id) {
        case 'total':
          value = stats.total;
          break;
        case 'active':
          const activeCount = stats.byWorkStatus.find(s => s.status === 'active')?.count || 0;
          value = activeCount;
          break;
        case 'on_leave':
          const onLeaveCount = stats.byWorkStatus.find(s => s.status === 'on_leave')?.count || 0;
          value = onLeaveCount;
          break;
        case 'inactive':
          const inactiveCount = stats.byWorkStatus.find(s => s.status === 'inactive')?.count || 0;
          value = inactiveCount;
          break;
      }
      return { ...stat, value };
    });
  }, [stats]);

  const filteredStaff = staffList.filter(staff => {
    // Map backend status to frontend status keys
    let currentStatus = 'active';
    if (staff.workStatus) {
      currentStatus = staff.workStatus;
    } else {
      currentStatus = staff.isActive ? 'active' : 'inactive';
    }

    const statusMatch = selectedStatus === 'all' || currentStatus === selectedStatus;
    const positionMatch = selectedPosition === 'all' || staff.role?.name === selectedPosition;

    // Safety checks for searching
    const nameMatch = staff.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const emailMatch = staff.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const searchMatch = nameMatch || emailMatch;

    return statusMatch && positionMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="sky"
        badgeText="Staff Management"
        titleVietnamese="Quản lý nhân viên"
        titleEnglish="Staff Management"
        description="Quản lý thông tin và hiệu suất làm việc của nhân viên"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {displayStats.map((stat) => (
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
          placeholder="Tìm kiếm nhân viên theo tên, email..."
          theme="sky"
        />

        {/* Add Staff Button */}
        <button
          onClick={() => setIsAddOverlayOpen(true)}
          className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Thêm nhân viên</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Status Filter */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${selectedStatus === 'all'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            Tất cả
          </button>
          {Object.entries(statusConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedStatus(key)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${selectedStatus === key
                  ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                  : `bg-gradient-to-r ${config.bg} border ${config.border} ${config.text} hover:scale-105`
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Position Filter */}
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 focus:outline-none focus:border-purple-500/50 cursor-pointer"
        >
          <option value="all" className="bg-gray-800">Tất cả vị trí</option>
          {Object.entries(positionConfig).map(([key, config]) => (
            <option key={key} value={key} className="bg-gray-800">
              {config.icon} {config.label}
            </option>
          ))}
        </select>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStaff.map((staff) => (
          <StaffCard
            key={staff._id}
            staff={staff}
            onDelete={confirmDeleteUser}
            onEdit={openEditOverlay}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredStaff.length === 0 && (
        <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
          <div className="text-7xl mb-6">👤</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Không tìm thấy nhân viên nào
          </h3>
          <p className="text-gray-400 mb-6">
            Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
          </p>
          <button
            onClick={() => {
              setSelectedStatus('all');
              setSelectedPosition('all');
              setSearchQuery('');
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Add Staff Overlay */}
      <AddStaffOverlay
        isOpen={isAddOverlayOpen}
        onClose={() => setIsAddOverlayOpen(false)}
        onSubmit={handleCreateUser}
        isLoading={isCreating}
      />

      {/* Edit Staff Overlay */}
      <EditStaffOverlay
        isOpen={isEditOverlayOpen}
        onClose={() => setIsEditOverlayOpen(false)}
        onSubmit={handleEditUser}
        currentUser={currentUser}
        targetUser={userToEdit}
        isLoading={isEditing}
      />

      {/* Delete Confirmation Overlay */}
      <ConfirmDeleteOverlay
        isOpen={isDeleteOverlayOpen}
        onClose={() => setIsDeleteOverlayOpen(false)}
        onConfirm={handleDeleteUser}
        title="Xóa nhân viên"
        itemName={userToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}
