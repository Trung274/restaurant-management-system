'use client';

import { useState } from 'react';
import { settingsSections } from './mockData';
import {
  Cog6ToothIcon,
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ServerIcon,
  KeyIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/PageHeader';
import { GeneralSettingsSection } from './components/GeneralSettingsSection';
import { SecuritySettingsSection } from './components/SecuritySettingsSection';

export default function SettingsPage() {
  const [selectedSection, setSelectedSection] = useState('general');
  const selectedConfig = settingsSections.find(s => s.id === selectedSection);

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'general':
        return <GeneralSettingsSection gradient={selectedConfig?.gradient} />;

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/120"
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-purple-500/30"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white hover:shadow-lg transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Admin User</h3>
                <p className="text-gray-400 text-sm">Quản trị viên hệ thống</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Chức vụ
                </label>
                <input
                  type="text"
                  defaultValue="Quản trị viên"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="admin@restaurant.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                defaultValue="0901234567"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                rows={3}
                defaultValue="Quản lý nhà hàng với hơn 10 năm kinh nghiệm trong ngành F&B."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none"
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Thông báo Email</h3>
              <div className="space-y-4">
                {[
                  { label: 'Đơn hàng mới', desc: 'Nhận email khi có đơn hàng mới', checked: true },
                  { label: 'Thanh toán', desc: 'Thông báo về các giao dịch thanh toán', checked: true },
                  { label: 'Khách hàng mới', desc: 'Khi có khách hàng đăng ký mới', checked: false },
                  { label: 'Báo cáo hàng ngày', desc: 'Tổng kết doanh thu cuối ngày', checked: true }
                ].map((item, index) => (
                  <label key={index} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                      <div className="w-14 h-7 bg-white/10 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-orange-600 peer-checked:to-amber-600 transition-all"></div>
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Thông báo Push</h3>
              <div className="space-y-4">
                {[
                  { label: 'Cảnh báo hệ thống', desc: 'Thông báo về lỗi và sự cố', checked: true },
                  { label: 'Hoạt động nhân viên', desc: 'Check-in/out và ca làm việc', checked: true },
                  { label: 'Tồn kho thấp', desc: 'Cảnh báo nguyên liệu sắp hết', checked: true },
                  { label: 'Review từ khách hàng', desc: 'Đánh giá và phản hồi mới', checked: false }
                ].map((item, index) => (
                  <label key={index} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                      <div className="w-14 h-7 bg-white/10 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600 transition-all"></div>
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return <SecuritySettingsSection />;

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Chủ đề giao diện</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Tối (Dark)', active: true, preview: 'from-gray-900 to-slate-800' },
                  { name: 'Sáng (Light)', active: false, preview: 'from-gray-100 to-white' },
                  { name: 'Tự động', active: false, preview: 'from-blue-500 to-purple-500' }
                ].map((theme, index) => (
                  <div
                    key={index}
                    className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${theme.active
                      ? 'border-pink-500/50 bg-gradient-to-br from-pink-500/10 to-rose-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                  >
                    <div className={`w-full h-24 bg-gradient-to-br ${theme.preview} rounded-xl mb-4`}></div>
                    <p className="text-white font-medium">{theme.name}</p>
                    {theme.active && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Màu chủ đạo</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'from-blue-500 to-cyan-500',
                  'from-green-500 to-emerald-500',
                  'from-purple-500 to-pink-500',
                  'from-orange-500 to-amber-500',
                  'from-red-500 to-rose-500',
                  'from-indigo-500 to-violet-500'
                ].map((color, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 bg-gradient-to-r ${color} rounded-xl hover:scale-110 transition-all ${index === 2 ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-gray-900' : ''
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Tùy chọn hiển thị</h3>
              <div className="space-y-4">
                {[
                  { label: 'Hiển thị ảnh sidebar', checked: true },
                  { label: 'Animation chuyển trang', checked: true },
                  { label: 'Âm thanh thông báo', checked: false },
                  { label: 'Compact mode', checked: false }
                ].map((option, index) => (
                  <label key={index} className="flex items-center justify-between cursor-pointer group">
                    <p className="text-white font-medium">{option.label}</p>
                    <div className="relative">
                      <input type="checkbox" defaultChecked={option.checked} className="sr-only peer" />
                      <div className="w-14 h-7 bg-white/10 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-600 transition-all"></div>
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Tiền mặt', icon: '💵', enabled: true, color: 'from-green-500 to-emerald-500' },
                { name: 'Chuyển khoản', icon: '🏦', enabled: true, color: 'from-blue-500 to-cyan-500' },
                { name: 'Thẻ tín dụng', icon: '💳', enabled: true, color: 'from-purple-500 to-pink-500' },
                { name: 'Ví điện tử', icon: '📱', enabled: false, color: 'from-orange-500 to-amber-500' }
              ].map((method, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all ${method.enabled
                    ? `bg-gradient-to-br ${method.color}/10 border-${method.color.split(' ')[1]}/20`
                    : 'bg-white/5 border-white/10'
                    }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{method.icon}</span>
                      <div>
                        <p className="text-white font-semibold">{method.name}</p>
                        <p className="text-xs text-gray-400">
                          {method.enabled ? 'Đang hoạt động' : 'Chưa kích hoạt'}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <input type="checkbox" defaultChecked={method.enabled} className="sr-only peer" />
                      <div className={`w-14 h-7 bg-white/10 rounded-full peer-checked:bg-gradient-to-r peer-checked:${method.color} transition-all`}></div>
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7"></div>
                    </div>
                  </div>
                  {method.enabled && (
                    <button className={`w-full py-2 rounded-lg bg-gradient-to-r ${method.color} text-white text-sm font-medium hover:shadow-lg transition-all`}>
                      Cấu hình
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Cài đặt thuế & Phí</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Thuế VAT (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phí dịch vụ (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Ngôn ngữ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Tiếng Việt', code: 'vi', flag: '🇻🇳', active: true },
                  { name: 'English', code: 'en', flag: '🇺🇸', active: false },
                  { name: 'Français', code: 'fr', flag: '🇫🇷', active: false },
                  { name: '日本語', code: 'ja', flag: '🇯🇵', active: false }
                ].map((lang, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${lang.active
                      ? 'bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-cyan-500/30'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{lang.flag}</span>
                        <div>
                          <p className="text-white font-semibold">{lang.name}</p>
                          <p className="text-xs text-gray-400">{lang.code.toUpperCase()}</p>
                        </div>
                      </div>
                      {lang.active && (
                        <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Múi giờ & Định dạng</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Múi giờ
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all">
                    <option value="Asia/Ho_Chi_Minh" className="bg-gray-800">GMT+7 (Asia/Ho_Chi_Minh)</option>
                    <option value="Asia/Bangkok" className="bg-gray-800">GMT+7 (Asia/Bangkok)</option>
                    <option value="Asia/Tokyo" className="bg-gray-800">GMT+9 (Asia/Tokyo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Định dạng ngày tháng
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all">
                    <option value="dd/mm/yyyy" className="bg-gray-800">DD/MM/YYYY</option>
                    <option value="mm/dd/yyyy" className="bg-gray-800">MM/DD/YYYY</option>
                    <option value="yyyy-mm-dd" className="bg-gray-800">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Định dạng giờ
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all">
                    <option value="24h" className="bg-gray-800">24 giờ (14:30)</option>
                    <option value="12h" className="bg-gray-800">12 giờ (2:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Đơn vị tiền tệ
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all">
                    <option value="VND" className="bg-gray-800">VND (₫)</option>
                    <option value="USD" className="bg-gray-800">USD ($)</option>
                    <option value="EUR" className="bg-gray-800">EUR (€)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integration':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Google Analytics', desc: 'Phân tích lượng truy cập', icon: '📊', connected: true, color: 'from-yellow-500 to-orange-500' },
                { name: 'Facebook Pixel', desc: 'Theo dõi chuyển đổi', icon: '📱', connected: true, color: 'from-blue-500 to-cyan-500' },
                { name: 'Zalo OA', desc: 'Kết nối Zalo Official', icon: '💬', connected: false, color: 'from-blue-600 to-blue-700' },
                { name: 'Payment Gateway', desc: 'Cổng thanh toán', icon: '💳', connected: true, color: 'from-green-500 to-emerald-500' },
                { name: 'SMS Marketing', desc: 'Gửi SMS tự động', icon: '📧', connected: false, color: 'from-purple-500 to-pink-500' },
                { name: 'Cloud Storage', desc: 'Lưu trữ đám mây', icon: '☁️', connected: true, color: 'from-indigo-500 to-violet-500' }
              ].map((integration, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border transition-all ${integration.connected
                    ? `bg-gradient-to-br from-white/5 to-white/0 border-white/20`
                    : 'bg-white/5 border-white/10'
                    }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${integration.color}/20`}>
                        <span className="text-2xl">{integration.icon}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{integration.name}</p>
                        <p className="text-xs text-gray-400">{integration.desc}</p>
                      </div>
                    </div>
                    {integration.connected && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                        Đã kết nối
                      </span>
                    )}
                  </div>
                  <button
                    className={`w-full py-2.5 rounded-lg font-medium transition-all ${integration.connected
                      ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                      : `bg-gradient-to-r ${integration.color} text-white hover:shadow-lg`
                      }`}
                  >
                    {integration.connected ? 'Cấu hình' : 'Kết nối'}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">API Keys</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Public Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="pk_live_51xxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Secret Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="sk_live_51xxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                    />
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all">
                      Show
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8">
      {/* Header */}
      <PageHeader
        theme="slate"
        badgeText="System Settings"
        titleVietnamese="Cài đặt hệ thống"
        titleEnglish="System Settings"
        description="Tùy chỉnh và quản lý cấu hình hệ thống"
      />

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-3">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            const isActive = selectedSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`w-full group relative bg-gradient-to-br cursor-pointer ${isActive ? section.bg : 'from-white/5 to-white/0'
                  } backdrop-blur-sm border ${isActive ? section.border : 'border-white/10'
                  } rounded-xl p-4 hover:scale-105 transition-all duration-300 text-left overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                <div className="relative flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${section.bg} border ${section.border}`}>
                    <span className="text-xl">{section.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold truncate ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}>
                      {section.name}
                    </p>
                  </div>
                  {isActive && (
                    <div className={`w-2 h-2 bg-gradient-to-r ${section.gradient} rounded-full animate-pulse`}></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className={`relative bg-gradient-to-br ${selectedConfig?.bg} backdrop-blur-xl border ${selectedConfig?.border} rounded-3xl p-8 overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

            <div className="relative">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedConfig?.bg} border ${selectedConfig?.border}`}>
                    <span className="text-4xl">{selectedConfig?.emoji}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {selectedConfig?.name}
                    </h2>
                    <p className="text-gray-300">
                      {selectedConfig?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              {renderSectionContent()}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}