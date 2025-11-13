'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function AdminPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Chào mừng trở lại, {user?.name}! 👋
          </h1>
          <p className="text-gray-400">
            Đây là trang Profile cá nhân của hệ thống quản lý nhà hàng
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* User Profile Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <UserCircleIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Thông tin cá nhân</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-400">Tên</p>
                <p className="text-white font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Trạng thái</p>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  {user?.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                </span>
              </div>
            </div>
          </div>

          {/* Role Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <ShieldCheckIcon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Vai trò</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-400">Role</p>
                <p className="text-white font-medium capitalize">{user?.role?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Số quyền</p>
                <p className="text-white font-medium">{user?.role?.permissions?.length || 0} permissions</p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Hoạt động</h3>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-400">Lần đăng nhập gần nhất</p>
                <p className="text-white font-medium">Hôm nay</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Tài khoản được tạo</p>
                <p className="text-white font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions List */}
        {user?.role?.permissions && user.role.permissions.length > 0 && (
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Quyền truy cập của bạn</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {user.role.permissions.map((permission) => (
                <div
                  key={permission._id}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg"
                >
                  <p className="text-sm font-medium text-white">
                    {permission.resource}:{permission.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{permission.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}