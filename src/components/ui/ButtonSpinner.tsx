interface ButtonSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function ButtonSpinner({ size = 'md', className = '' }: ButtonSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    return (
        <div
            className={`${sizeClasses[size]} border-2 border-white/30 border-t-white rounded-full animate-spin ${className}`}
            role="status"
            aria-label="Loading"
        />
    );
}
