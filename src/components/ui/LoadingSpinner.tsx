interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
    fullScreen?: boolean;
}

export default function LoadingSpinner({
    message = 'Đang tải...',
    size = 'medium',
    fullScreen = false,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        small: 'w-16 h-16',
        medium: 'w-32 h-32',
        large: 'w-48 h-48',
    };

    const containerClasses = fullScreen
        ? 'min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center'
        : 'flex items-center justify-center py-12';

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center gap-6">
                <img
                    src="/waiting.gif"
                    alt="Loading..."
                    className={`${sizeClasses[size]} object-contain`}
                />
                <div className="text-white text-lg">{message}</div>
            </div>
        </div>
    );
}
