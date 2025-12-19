'use client';

import { XMarkIcon, ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

type ConfirmationType = 'danger' | 'warning' | 'info' | 'success';

interface ConfirmActionOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    type?: ConfirmationType;
    isLoading?: boolean;
    error?: string;
}

const typeConfig = {
    danger: {
        gradient: 'from-red-600 to-orange-600',
        icon: ExclamationTriangleIcon,
        iconBg: 'bg-white/20',
        buttonGradient: 'from-red-600 to-orange-600',
        buttonShadow: 'hover:shadow-red-500/50',
        subtitle: 'Hành động này không thể hoàn tác'
    },
    warning: {
        gradient: 'from-yellow-600 to-orange-600',
        icon: ExclamationTriangleIcon,
        iconBg: 'bg-white/20',
        buttonGradient: 'from-yellow-600 to-orange-600',
        buttonShadow: 'hover:shadow-yellow-500/50',
        subtitle: 'Vui lòng xác nhận trước khi tiếp tục'
    },
    info: {
        gradient: 'from-blue-600 to-indigo-600',
        icon: InformationCircleIcon,
        iconBg: 'bg-white/20',
        buttonGradient: 'from-blue-600 to-indigo-600',
        buttonShadow: 'hover:shadow-blue-500/50',
        subtitle: 'Xác nhận thông tin'
    },
    success: {
        gradient: 'from-green-600 to-emerald-600',
        icon: CheckCircleIcon,
        iconBg: 'bg-white/20',
        buttonGradient: 'from-green-600 to-emerald-600',
        buttonShadow: 'hover:shadow-green-500/50',
        subtitle: 'Xác nhận hoàn tất'
    }
};

export default function ConfirmActionOverlay({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    type = 'info',
    isLoading = false,
    error
}: ConfirmActionOverlayProps) {
    if (!isOpen) return null;

    const config = typeConfig[type];
    const Icon = config.icon;

    const handleConfirm = async () => {
        await onConfirm();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={isLoading ? undefined : onClose}
            />

            {/* Modal */}
            <div className="relative bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 border border-white/10 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
                {/* Header */}
                <div className={`relative bg-gradient-to-r ${config.gradient} p-6`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 ${config.iconBg} rounded-xl`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
                                <p className="text-white/80 text-sm">{config.subtitle}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className={`p-2 rounded-xl transition-all duration-300 group ${isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-white/10 cursor-pointer'
                                }`}
                        >
                            <XMarkIcon className={`w-6 h-6 text-white transition-transform duration-300 ${isLoading ? '' : 'group-hover:rotate-90'
                                }`} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-gray-300 text-center text-base leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <div className="flex items-start gap-2">
                                <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-300">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className={`flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium transition-all duration-300 ${isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-white/10 cursor-pointer'
                                }`}
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className={`flex-1 px-6 py-3 bg-gradient-to-r ${config.buttonGradient} text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isLoading
                                ? 'opacity-75 cursor-not-allowed'
                                : `hover:shadow-lg ${config.buttonShadow} hover:scale-105 cursor-pointer`
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                confirmText
                            )}
                        </button>
                    </div>
                </div>
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
      `}</style>
        </div>
    );
}
