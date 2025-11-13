'use client'

import { ShieldExclamationIcon, ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function UnauthorizedPage() {
    const handleGoBack = () => {
        // Router logic would go here
        console.log('Navigating back...');
    };

    const handleGoHome = () => {
        // Router logic would go here
        console.log('Navigating to home...');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-8">
            <div className="max-w-4xl w-full">
                {/* Main Card */}
                


                    <div className="relative">
                        {/* Icon Badge */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative p-6 bg-gradient-to-br from-red-600/30 to-orange-600/30 border border-red-500/40 rounded-full">
                                    <ShieldExclamationIcon className="w-16 h-16 text-red-400" />
                                </div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex justify-center mb-6">
                            <span className="px-6 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-bold tracking-wider uppercase flex items-center gap-2">
                                <LockClosedIcon className="w-4 h-4" />
                                Truy cập bị từ chối
                            </span>
                        </div>

                        {/* Main Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-6">
                                Bạn không có quyền truy cập
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Trang này yêu cầu quyền đặc biệt mà tài khoản của bạn chưa được cấp.
                                Vui lòng liên hệ quản trị viên để được hỗ trợ.
                            </p>
                        </div>

                        {/* Image Placeholder */}
                        <div className="mb-10">
                            <div className="relative bg-gradient-to-br from-gray-900/50 to-slate-800/50 rounded-2xl border border-white/10 p-8 min-h-[300px] flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <img
                                        src="/unauthorized-funny.jpg"
                                        alt="Access Denied"
                                        className="w-full h-auto rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleGoBack}
                                className="group px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <ArrowLeftIcon className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                                Quay lại trang trước
                            </button>

                            <button
                                onClick={handleGoHome}
                                className="group px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Về trang chủ
                            </button>
                        </div>

                        {/* Help Text */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-400 text-sm">
                                Mã lỗi: <span className="text-red-400 font-mono">403 FORBIDDEN</span>
                            </p>
                        </div>
                    </div>
                

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với bộ phận hỗ trợ kỹ thuật
                    </p>
                </div>
            </div>
        </div>
    );
}