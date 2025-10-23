import { ReactNode } from "react";

export interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  colorScheme: 'green' | 'blue' | 'purple' | 'orange' | 'pink' | 'red' | 'yellow' | 'cyan' | 'emerald';
  subtitle?: string;
  onClick?: () => void;
}

const colorSchemes = {
  green: {
    bg: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/20',
    text: 'bg-gradient-to-r from-green-400 to-emerald-400'
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-500/10 to-green-500/10',
    border: 'border-emerald-500/20',
    text: 'bg-gradient-to-r from-emerald-400 to-green-400'
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    text: 'bg-gradient-to-r from-blue-400 to-cyan-400'
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10',
    border: 'border-cyan-500/20',
    text: 'bg-gradient-to-r from-cyan-400 to-blue-400'
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    text: 'bg-gradient-to-r from-purple-400 to-pink-400'
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    text: 'bg-gradient-to-r from-orange-400 to-amber-400'
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/20',
    text: 'bg-gradient-to-r from-pink-400 to-rose-400'
  },
  red: {
    bg: 'bg-gradient-to-br from-red-500/10 to-rose-500/10',
    border: 'border-red-500/20',
    text: 'bg-gradient-to-r from-red-400 to-rose-400'
  },
  yellow: {
    bg: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10',
    border: 'border-yellow-500/20',
    text: 'bg-gradient-to-r from-yellow-400 to-orange-400'
  }
};

export default function StatsCard({ label, value, icon, colorScheme, subtitle, onClick }: StatsCardProps) {
  const colors = colorSchemes[colorScheme];
  
  return (
    <div 
      className={`group relative ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-300">{label}</h2>
          {icon && <div className="text-3xl">{icon}</div>}
        </div>
        
        <p className={`text-4xl font-bold text-transparent bg-clip-text ${colors.text} mb-2`}>
          {value}
        </p>
        
        {subtitle && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}