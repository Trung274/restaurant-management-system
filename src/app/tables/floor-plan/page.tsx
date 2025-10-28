'use client'

import { useState, useRef, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
  ArrowsPointingOutIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';

interface FloorTable {
  id: string;
  number: string;
  status: TableStatus;
  capacity: number;
  floor: string;
  section: string;
  x: number;
  y: number;
  currentGuests?: number;
  duration?: string;
  reservedTime?: string;
  orderId?: string;
}

// Mock data for tables with positions
const floorTables: FloorTable[] = [
  // Tầng 1 - Main Area
  { id: 'T1-01', number: '01', status: 'available', capacity: 4, floor: 'Tầng 1', section: 'Main', x: 100, y: 100, currentGuests: 0 },
  { id: 'T1-02', number: '02', status: 'occupied', capacity: 4, floor: 'Tầng 1', section: 'Main', x: 250, y: 100, currentGuests: 4, duration: '45 phút' },
  { id: 'T1-03', number: '03', status: 'available', capacity: 2, floor: 'Tầng 1', section: 'Main', x: 400, y: 100, currentGuests: 0 },
  { id: 'T1-04', number: '04', status: 'reserved', capacity: 6, floor: 'Tầng 1', section: 'Main', x: 550, y: 100, reservedTime: '19:30' },
  
  { id: 'T1-05', number: '05', status: 'occupied', capacity: 2, floor: 'Tầng 1', section: 'Main', x: 100, y: 250, currentGuests: 2, duration: '20 phút' },
  { id: 'T1-06', number: '06', status: 'cleaning', capacity: 4, floor: 'Tầng 1', section: 'Main', x: 250, y: 250 },
  { id: 'T1-07', number: '07', status: 'available', capacity: 4, floor: 'Tầng 1', section: 'Main', x: 400, y: 250, currentGuests: 0 },
  { id: 'T1-08', number: '08', status: 'available', capacity: 8, floor: 'Tầng 1', section: 'Main', x: 550, y: 250, currentGuests: 0 },
  
  // Tầng 1 - VIP Area
  { id: 'T1-V1', number: 'V1', status: 'occupied', capacity: 10, floor: 'Tầng 1', section: 'VIP', x: 100, y: 450, currentGuests: 8, duration: '1h 20m' },
  { id: 'T1-V2', number: 'V2', status: 'reserved', capacity: 12, floor: 'Tầng 1', section: 'VIP', x: 350, y: 450, reservedTime: '20:00' },
  { id: 'T1-V3', number: 'V3', status: 'available', capacity: 8, floor: 'Tầng 1', section: 'VIP', x: 550, y: 450, currentGuests: 0 },
  
  // Tầng 2
  { id: 'T2-01', number: '01', status: 'available', capacity: 4, floor: 'Tầng 2', section: 'Main', x: 150, y: 100, currentGuests: 0 },
  { id: 'T2-02', number: '02', status: 'occupied', capacity: 4, floor: 'Tầng 2', section: 'Main', x: 300, y: 100, currentGuests: 3, duration: '30 phút' },
  { id: 'T2-03', number: '03', status: 'available', capacity: 6, floor: 'Tầng 2', section: 'Main', x: 450, y: 100, currentGuests: 0 },
  
  { id: 'T2-04', number: '04', status: 'reserved', capacity: 2, floor: 'Tầng 2', section: 'Main', x: 150, y: 250, reservedTime: '18:45' },
  { id: 'T2-05', number: '05', status: 'available', capacity: 4, floor: 'Tầng 2', section: 'Main', x: 300, y: 250, currentGuests: 0 },
  { id: 'T2-06', number: '06', status: 'occupied', capacity: 4, floor: 'Tầng 2', section: 'Main', x: 450, y: 250, currentGuests: 4, duration: '55 phút' },
];

const statusConfig = {
  available: {
    label: 'Trống',
    bg: 'from-green-600/30 to-emerald-600/30',
    border: 'border-green-500/40',
    text: 'text-green-400',
    gradient: 'from-green-500 to-emerald-500',
    pulse: true,
    icon: CheckCircleIcon
  },
  occupied: {
    label: 'Đang dùng',
    bg: 'from-red-600/30 to-rose-600/30',
    border: 'border-red-500/40',
    text: 'text-red-400',
    gradient: 'from-red-500 to-rose-500',
    pulse: false,
    icon: UserGroupIcon
  },
  reserved: {
    label: 'Đã đặt',
    bg: 'from-blue-600/30 to-cyan-600/30',
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-500',
    pulse: false,
    icon: ClockIcon
  },
  cleaning: {
    label: 'Đang dọn',
    bg: 'from-yellow-600/30 to-amber-600/30',
    border: 'border-yellow-500/40',
    text: 'text-yellow-400',
    gradient: 'from-yellow-500 to-amber-500',
    pulse: false,
    icon: SparklesIcon
  }
};

export default function FloorPlanPage() {
  const [selectedFloor, setSelectedFloor] = useState('Tầng 1');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedTable, setSelectedTable] = useState<FloorTable | null>(null);
  const [hoveredTable, setHoveredTable] = useState<FloorTable | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const currentFloorTables = floorTables.filter(t => t.floor === selectedFloor);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const stats = {
    total: currentFloorTables.length,
    available: currentFloorTables.filter(t => t.status === 'available').length,
    occupied: currentFloorTables.filter(t => t.status === 'occupied').length,
    reserved: currentFloorTables.filter(t => t.status === 'reserved').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-green-500/30 transition-all"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <div className="inline-block mb-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Floor Plan View
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white">
                Sơ đồ mặt bằng
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mt-1 text-3xl">
                  {selectedFloor}
                </span>
              </h1>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleZoomOut}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
            >
              <MinusIcon className="w-5 h-5" />
            </button>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-medium min-w-[80px] text-center">
              {Math.round(zoom * 100)}%
            </div>
            <button 
              onClick={handleZoomIn}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={handleResetView}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
            >
              <ArrowsPointingOutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floor Tabs */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedFloor('Tầng 1')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedFloor === 'Tầng 1'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            Tầng 1
          </button>
          <button
            onClick={() => setSelectedFloor('Tầng 2')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedFloor === 'Tầng 2'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            Tầng 2
          </button>

          <div className="flex-1"></div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-green-400 font-medium">{stats.available} Trống</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-red-400 font-medium">{stats.occupied} Đang dùng</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400 font-medium">{stats.reserved} Đã đặt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="relative bg-gradient-to-br from-gray-800/50 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
        style={{ height: '70vh' }}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center'
          }}
        ></div>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="absolute inset-0 cursor-move"
          onMouseDown={handleMouseDown}
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }}
        >
          {/* Section Labels */}
          {selectedFloor === 'Tầng 1' && (
            <>
              <div className="absolute left-10 top-10 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold backdrop-blur-sm">
                Khu vực chính
              </div>
              <div className="absolute left-10 top-[400px] px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl text-yellow-400 font-bold backdrop-blur-sm">
                ⭐ Khu VIP
              </div>
            </>
          )}

          {/* Tables */}
          {currentFloorTables.map((table) => {
            const config = statusConfig[table.status];
            const isSelected = selectedTable?.id === table.id;
            const isHovered = hoveredTable?.id === table.id;
            const StatusIcon = config.icon;

            return (
              <div
                key={table.id}
                className={`absolute group cursor-pointer transition-all duration-300 ${
                  isSelected ? 'z-50' : 'z-10'
                }`}
                style={{
                  left: `${table.x}px`,
                  top: `${table.y}px`,
                  transform: isHovered || isSelected ? 'scale(1.1)' : 'scale(1)'
                }}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setSelectedTable(table);
                }}
                onMouseEnter={() => setHoveredTable(table)}
                onMouseLeave={() => setHoveredTable(null)}
              >
                {/* Table Card */}
                <div className={`relative w-32 h-32 bg-gradient-to-br ${config.bg} backdrop-blur-sm border-2 ${config.border} rounded-2xl p-3 ${
                  config.pulse ? 'animate-pulse' : ''
                }`}>
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-20 rounded-2xl blur-xl`}></div>
                  
                  <div className="relative h-full flex flex-col">
                    {/* Table Number */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}>
                        {table.number}
                      </span>
                      {table.section === 'VIP' && (
                        <span className="text-xs px-1.5 py-0.5 bg-yellow-500/30 border border-yellow-500/50 rounded text-yellow-400 font-bold">
                          VIP
                        </span>
                      )}
                    </div>

                    {/* Status Icon */}
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${config.bg} border ${config.border} mb-2`}>
                      <StatusIcon className={`w-5 h-5 ${config.text}`} />
                    </div>

                    {/* Capacity */}
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <UserGroupIcon className="w-3 h-3" />
                      <span>{table.capacity}</span>
                    </div>

                    {/* Status Badge */}
                    <div className={`mt-auto text-xs font-medium ${config.text}`}>
                      {config.label}
                    </div>
                  </div>
                </div>

                {/* Hover Tooltip */}
                {isHovered && !isSelected && (
                  <div className="absolute left-full ml-4 top-0 w-64 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl z-50">
                    <h4 className="text-lg font-bold text-white mb-2">Bàn {table.number}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sức chứa:</span>
                        <span className="text-white font-medium">{table.capacity} người</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trạng thái:</span>
                        <span className={`font-medium ${config.text}`}>{config.label}</span>
                      </div>
                      {table.currentGuests && table.currentGuests > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Khách:</span>
                            <span className="text-white font-medium">{table.currentGuests}/{table.capacity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Thời gian:</span>
                            <span className="text-white font-medium">{table.duration}</span>
                          </div>
                        </>
                      )}
                      {table.reservedTime && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Đặt lúc:</span>
                          <span className="text-white font-medium">{table.reservedTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-6 left-6 px-4 py-2 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm text-gray-400">
          💡 Kéo để di chuyển • Click bàn để xem chi tiết • Scroll để zoom
        </div>
      </div>

      {/* Selected Table Detail Panel */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedTable(null)}
        >
          <div 
            className={`relative bg-gradient-to-br ${statusConfig[selectedTable.status].bg} backdrop-blur-xl border-2 ${statusConfig[selectedTable.status].border} rounded-3xl p-8 max-w-2xl w-full shadow-2xl`}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedTable(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-start gap-6 mb-6">
              <div className={`p-6 bg-gradient-to-r ${statusConfig[selectedTable.status].bg} border ${statusConfig[selectedTable.status].border} rounded-2xl`}>
                <div className={`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${statusConfig[selectedTable.status].gradient}`}>
                  {selectedTable.number}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-3xl font-bold text-white">Bàn {selectedTable.number}</h2>
                  {selectedTable.section === 'VIP' && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-bold rounded-full">
                      VIP
                    </span>
                  )}
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${statusConfig[selectedTable.status].gradient} text-white`}>
                    {statusConfig[selectedTable.status].label}
                  </span>
                </div>
                <p className="text-gray-400">{selectedTable.floor} • {selectedTable.section}</p>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-sm text-gray-400 mb-1">Sức chứa</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <UserGroupIcon className="w-6 h-6" />
                  {selectedTable.capacity} người
                </div>
              </div>
              
                                    {selectedTable.currentGuests && selectedTable.currentGuests > 0 && (
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-sm text-gray-400 mb-1">Khách hiện tại</div>
                  <div className={`text-2xl font-bold ${statusConfig[selectedTable.status].text}`}>
                    {selectedTable.currentGuests}/{selectedTable.capacity}
                  </div>
                </div>
              )}
              
              {selectedTable.duration && (
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-sm text-gray-400 mb-1">Thời gian</div>
                  <div className="text-2xl font-bold text-white flex items-center gap-2">
                    <ClockIcon className="w-6 h-6" />
                    {selectedTable.duration}
                  </div>
                </div>
              )}
              
              {selectedTable.reservedTime && (
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-sm text-gray-400 mb-1">Giờ đặt</div>
                  <div className="text-2xl font-bold text-white flex items-center gap-2">
                    <ClockIcon className="w-6 h-6" />
                    {selectedTable.reservedTime}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {selectedTable.status === 'available' && (
                <button className={`flex-1 py-4 rounded-xl bg-gradient-to-r ${statusConfig[selectedTable.status].gradient} text-white font-semibold text-lg hover:shadow-lg transition-all`}>
                  Đặt bàn
                </button>
              )}
              {selectedTable.status === 'occupied' && (
                <>
                  <button className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all">
                    Xem chi tiết đơn
                  </button>
                  <button className="flex-1 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all">
                    Thanh toán
                  </button>
                </>
              )}
              {selectedTable.status === 'reserved' && (
                <button className={`flex-1 py-4 rounded-xl bg-gradient-to-r ${statusConfig[selectedTable.status].gradient} text-white font-semibold text-lg hover:shadow-lg transition-all`}>
                  Check-in khách
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}