'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatsCard from '@/components/ui/StatsCard';
import { statusConfig } from './mockData';
import {
  PlusIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import AddTableOverlay from './components/AddTableOverlay';
import TableStatusOverlay from './components/TableStatusOverlay';
import ConfirmActionOverlay from '@/components/forms/ConfirmActionOverlay';
import { toast } from '@/utils/toast';
import { useTablesStore } from '@/stores/tablesStore';

export default function TablesPage() {
  const router = useRouter();

  // Get store state and actions
  const {
    tables,
    stats,
    isLoading,
    fetchTables,
    fetchStats,
    addTable,
    editTable,
    removeTable,
    checkIn,
    reserve,
    checkout,
    clean
  } = useTablesStore();

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Overlays state
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);
  const [selectedTableForAction, setSelectedTableForAction] = useState<any>(null); // For Check-in/Book
  const [tableForPayment, setTableForPayment] = useState<any>(null); // For Payment confirmation
  const [tableForCheckIn, setTableForCheckIn] = useState<any>(null); // For Check-in confirmation
  const [tableForEdit, setTableForEdit] = useState<any>(null); // For Edit
  const [tableForDelete, setTableForDelete] = useState<any>(null); // For Delete confirmation
  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // For kebab menu
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchTables();
    fetchStats();
  }, [fetchTables, fetchStats]);

  const handleTableAction = async (table: any, action: 'book' | 'view' | 'payment' | 'finish' | 'check-in') => {
    switch (action) {
      case 'book':
        setSelectedTableForAction(table);
        break;

      case 'check-in':
        // Direct check-in for reserved tables
        setTableForCheckIn(table);
        break;

      case 'payment':
        setTableForPayment(table);
        break;

      case 'finish':
        try {
          await clean(table.id);
          toast.success(`Bàn ${table.number} đã sẵn sàng đón khách`);
        } catch (error) {
          toast.error('Không thể hoàn tất dọn dẹp');
        }
        break;

      case 'view':
        // Navigate or show details
        toast.info(`Xem chi tiết bàn ${table.number}`);
        break;
    }
  };

  // Calculate dynamic stats from store stats
  const calculatedStats = useMemo(() => {
    if (!stats) {
      return [
        { id: 'total', label: 'Tổng số bàn', value: 0, colorScheme: 'blue' as const },
        { id: 'available', label: 'Bàn trống', value: 0, colorScheme: 'green' as const },
        { id: 'occupied', label: 'Đang phục vụ', value: 0, colorScheme: 'cyan' as const },
        { id: 'reserved', label: 'Đã đặt trước', value: 0, colorScheme: 'orange' as const },
        { id: 'cleaning', label: 'Đang dọn dẹp', value: 0, colorScheme: 'purple' as const },
      ];
    }

    return [
      { id: 'total', label: 'Tổng số bàn', value: stats.summary.totalTables, colorScheme: 'blue' as const },
      { id: 'available', label: 'Bàn trống', value: stats.summary.availableTables, colorScheme: 'green' as const },
      { id: 'occupied', label: 'Đang phục vụ', value: stats.summary.occupiedTables, colorScheme: 'cyan' as const },
      { id: 'reserved', label: 'Đã đặt trước', value: stats.summary.reservedTables, colorScheme: 'orange' as const },
      { id: 'cleaning', label: 'Đang dọn dẹp', value: stats.summary.cleaningTables, colorScheme: 'purple' as const },
    ];
  }, [stats]);

  const filteredTables = tables.filter(table => {
    const statusMatch = selectedStatus === 'all' || table.status === selectedStatus;
    const floorMatch = selectedFloor === 'all' || table.floor === selectedFloor;
    return statusMatch && floorMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="green"
        badgeText="Tables management"
        titleVietnamese="Quản lý bàn ăn"
        titleEnglish="Tables Management"
        description="Theo dõi trạng thái và phân bổ bàn ăn trong nhà hàng"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {calculatedStats.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            colorScheme={stat.colorScheme}
          />
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Tìm kiếm bàn theo số, tầng, khu vực..."
          theme="green"
        />

        {/* Floor Filter */}
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 focus:outline-none focus:border-green-500/50 cursor-pointer"
        >
          <option value="all" className="bg-gray-800">Tất cả tầng</option>
          <option value="Tầng 1" className="bg-gray-800">Tầng 1</option>
          <option value="Tầng 2" className="bg-gray-800">Tầng 2</option>
          <option value="Sân thượng" className="bg-gray-800">Sân thượng</option>
        </select>

        {/* Add Table Button */}
        <button
          onClick={() => setIsAddTableOpen(true)}
          className="group relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer">
          <PlusIcon className="w-5 h-5" />
          <span>Thêm bàn mới</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${selectedStatus === 'all'
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
        >
          Tất cả bàn
        </button>
        {Object.entries(statusConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedStatus(key)}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${selectedStatus === key
              ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
              : `bg-gradient-to-r ${config.bg} border ${config.border} ${config.text} hover:scale-105`
              }`}
          >
            <config.icon className="w-4 h-4" />
            <span>{config.label}</span>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && tables.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="text-gray-400 mt-4">Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Tables Grid */}
      {!isLoading || tables.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTables.map((table) => {
            const config = statusConfig[table.status as keyof typeof statusConfig] || statusConfig.available;
            const StatusIcon = config?.icon || CheckCircleIcon;

            return (
              <div
                key={table.id}
                className={`group relative bg-gradient-to-br ${config.bg} backdrop-blur-sm border ${config.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                {/* Pulse effect for available tables */}
                {config.pulse && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-20 animate-pulse rounded-2xl`}></div>
                )}

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}>
                          {table.number}
                        </h3>
                        {table.section === 'VIP' && (
                          <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-full">
                            VIP
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{table.floor}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${config.bg} border ${config.border}`}>
                        <StatusIcon className={`w-6 h-6 ${config.text}`} />
                      </div>

                      {/* Kebab Menu */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === table.id ? null : table.id);
                          }}
                          className="p-2 rounded-lg hover:bg-white/10 transition-all"
                        >
                          <EllipsisVerticalIcon className="w-5 h-5 text-gray-400 hover:text-white" />
                        </button>

                        {openMenuId === table.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-48 bg-gray-800 border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTableForEdit(table);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-all text-left"
                              >
                                <PencilIcon className="w-4 h-4 text-blue-400" />
                                <span className="text-white text-sm">Sửa thông tin</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (table.status !== 'available') {
                                    toast.warning('Chỉ có thể xóa bàn đang trống');
                                    return;
                                  }
                                  setTableForDelete(table);
                                  setOpenMenuId(null);
                                }}
                                disabled={table.status !== 'available'}
                                className={`w-full px-4 py-3 flex items-center gap-3 transition-all text-left ${table.status !== 'available'
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:bg-red-500/10 cursor-pointer'
                                  }`}
                              >
                                <TrashIcon className="w-4 h-4 text-red-400" />
                                <span className="text-red-400 text-sm">Xóa bàn</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${config.gradient} text-white mb-4`}>
                    <span className={config.pulse ? 'w-1.5 h-1.5 bg-white rounded-full animate-pulse' : ''}></span>
                    {config.label}
                  </div>

                  {/* Table Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Sức chứa:</span>
                      <span className="text-white font-medium flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        {table.capacity} người
                      </span>
                    </div>

                    {table.status === 'occupied' && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Khách hiện tại:</span>
                          <span className={`font-medium ${config.text}`}>
                            {table.currentGuests}/{table.capacity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Thời gian:</span>
                          <span className={`font-medium ${config.text} flex items-center gap-1`}>
                            <ClockIcon className="w-4 h-4" />
                            {table.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Mã đơn:</span>
                          <span className="text-white font-mono text-xs">
                            {typeof table.orderId === 'object' && table.orderId !== null
                              ? (table.orderId as any)._id || (table.orderId as any).id || 'N/A'
                              : table.orderId || 'N/A'}
                          </span>
                        </div>
                      </>
                    )}

                    {table.status === 'reserved' && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Thời gian đặt:</span>
                          <span className={`font-medium ${config.text}`}>
                            {table.reservedTime
                              ? new Date(table.reservedTime).toLocaleString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit'
                              })
                              : 'N/A'}
                          </span>
                        </div>
                        {table.activeSession?.customerName && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Khách hàng:</span>
                            <span className="text-white font-medium text-xs">
                              {table.activeSession.customerName}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {table.status === 'available' && (
                      <button
                        onClick={() => handleTableAction(table, 'book')}
                        className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white font-`}>
                        Đặt bàn
                      </button>
                    )}
                    {table.status === 'occupied' && (
                      <>

                        <button
                          onClick={() => handleTableAction(table, 'payment')}
                          className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium hover:shadow-lg hover:shadow-red-500/50 transition-all">
                          Thanh toán
                        </button>
                      </>
                    )}
                    {table.status === 'reserved' && (
                      <>
                        <button
                          onClick={() => handleTableAction(table, 'view')}
                          className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                          Chi tiết
                        </button>
                        <button
                          onClick={() => handleTableAction(table, 'check-in')}
                          className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white font-medium hover:shadow-lg transition-all`}>
                          Check-in
                        </button>
                      </>
                    )}
                    {table.status === 'cleaning' && (
                      <button
                        onClick={() => handleTableAction(table, 'finish')}
                        className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white font-medium hover:shadow-lg transition-all`}>
                        Hoàn tất
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Empty State */}
      {filteredTables.length === 0 && !isLoading && (
        <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-16 text-center">
          <div className="text-7xl mb-6">🪑</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Không tìm thấy bàn nào
          </h3>
          <p className="text-gray-400 mb-6">
            Không có bàn nào phù hợp với bộ lọc hiện tại
          </p>
          <button
            onClick={() => {
              setSelectedStatus('all');
              setSelectedFloor('all');
            }}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Add Table Overlay */}
      <AddTableOverlay
        isOpen={isAddTableOpen}
        onClose={() => setIsAddTableOpen(false)}
        onSubmit={async (data) => {
          setIsSubmitting(true);
          try {
            await addTable({
              number: data.number,
              capacity: data.capacity,
              floor: data.floor,
              section: data.section
            });
            toast.success(`Đã thêm bàn ${data.number} thành công`);
            setIsAddTableOpen(false);
          } catch (error) {
            toast.error('Không thể thêm bàn');
          } finally {
            setIsSubmitting(false);
          }
        }}
        isLoading={isSubmitting}
      />

      {/* Table Status Overlay */}
      <TableStatusOverlay
        isOpen={!!selectedTableForAction}
        onClose={() => setSelectedTableForAction(null)}
        table={selectedTableForAction}
        onSubmit={async (data) => {
          setIsSubmitting(true);
          try {
            if (data.mode === 'check-in') {
              await checkIn(data.tableId, { guests: data.guests, note: data.note });
              toast.success('Đã check-in thành công');
            } else {
              // Convert time (HH:mm) to ISO datetime
              const today = new Date();
              const [hours, minutes] = data.time.split(':');
              const reservationDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(hours), parseInt(minutes));

              await reserve(data.tableId, {
                guests: data.guests,
                reservationTime: reservationDate.toISOString(), // Backend expects 'reservationTime' field
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                note: data.note
              });
              toast.success('Đã đặt bàn thành công');
            }
            setSelectedTableForAction(null);
          } catch (error) {
            toast.error('Không thể xử lý');
          } finally {
            setIsSubmitting(false);
          }
        }}
        isLoading={isSubmitting}
      />

      {/* Payment Confirmation */}
      <ConfirmActionOverlay
        isOpen={!!tableForPayment}
        onClose={() => setTableForPayment(null)}
        title="Xác nhận thanh toán"
        description={`Bạn có chắc chắn muốn thanh toán cho bàn ${tableForPayment?.number}? Bàn sẽ chuyển sang trạng thái dọn dẹp.`}
        confirmText="Thanh toán"
        type="warning"
        onConfirm={async () => {
          if (tableForPayment) {
            try {
              await checkout(tableForPayment.id);
              toast.success(`Đã thanh toán bàn ${tableForPayment.number}. Chuyển sang dọn dẹp.`);
              setTableForPayment(null);
            } catch (error) {
              toast.error('Không thể thanh toán');
            }
          }
        }}
      />

      {/* Check-in Confirmation */}
      <ConfirmActionOverlay
        isOpen={!!tableForCheckIn}
        onClose={() => setTableForCheckIn(null)}
        title="Xác nhận vào bàn"
        description={`Bàn ${tableForCheckIn?.number} đã được đặt trước. Bạn có muốn check-in ngay bây giờ?`}
        confirmText="Xác nhận"
        type="info"
        onConfirm={async () => {
          if (!tableForCheckIn) return;
          setIsSubmitting(true);
          try {
            await checkIn(tableForCheckIn.id, {
              guests: tableForCheckIn.activeSession?.currentGuests || tableForCheckIn.capacity
            });
            toast.success('Đã check-in thành công');
            setTableForCheckIn(null);
          } catch (error) {
            toast.error('Không thể check-in');
          } finally {
            setIsSubmitting(false);
          }
        }}
        isLoading={isSubmitting}
      />

      {/* Edit Table Overlay */}
      <AddTableOverlay
        isOpen={!!tableForEdit}
        onClose={() => setTableForEdit(null)}
        onSubmit={async (data) => {
          if (!tableForEdit) return;
          setIsSubmitting(true);
          try {
            await editTable(tableForEdit.id, {
              number: data.number,
              capacity: data.capacity,
              floor: data.floor,
              section: data.section
            });
            toast.success(`Đã cập nhật bàn ${data.number} thành công`);
            setTableForEdit(null);
          } catch (error) {
            toast.error('Không thể cập nhật bàn');
          } finally {
            setIsSubmitting(false);
          }
        }}
        isLoading={isSubmitting}
        initialData={tableForEdit ? {
          number: tableForEdit.number,
          capacity: tableForEdit.capacity,
          floor: tableForEdit.floor,
          section: tableForEdit.section
        } : undefined}
      />

      {/* Delete Confirmation */}
      <ConfirmActionOverlay
        isOpen={!!tableForDelete}
        onClose={() => setTableForDelete(null)}
        title="Xác nhận xóa bàn"
        description={`Bạn có chắc chắn muốn xóa bàn ${tableForDelete?.number}? Hành động này không thể hoàn tác.`}
        confirmText="Xóa bàn"
        type="danger"
        onConfirm={async () => {
          if (!tableForDelete) return;
          setIsSubmitting(true);
          try {
            await removeTable(tableForDelete.id);
            toast.success(`Đã xóa bàn ${tableForDelete.number} thành công`);
            setTableForDelete(null);
          } catch (error) {
            toast.error('Không thể xóa bàn');
          } finally {
            setIsSubmitting(false);
          }
        }}
        isLoading={isSubmitting}
      />
    </div>
  );
}