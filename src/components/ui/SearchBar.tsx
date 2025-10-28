'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  theme?: 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'amber' | 'sky';
}

const themeConfig = {
  blue: {
    gradient: 'from-blue-500/20 to-purple-500/20',
    iconHover: 'group-hover:text-blue-400',
    focusBorder: 'focus:border-blue-500/50'
  },
  green: {
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconHover: 'group-hover:text-green-400',
    focusBorder: 'focus:border-green-500/50'
  },
  orange: {
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconHover: 'group-hover:text-orange-400',
    focusBorder: 'focus:border-orange-500/50'
  },
  purple: {
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconHover: 'group-hover:text-purple-400',
    focusBorder: 'focus:border-purple-500/50'
  },
  pink: {
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconHover: 'group-hover:text-pink-400',
    focusBorder: 'focus:border-pink-500/50'
  },
  amber: {
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconHover: 'group-hover:text-orange-400',
    focusBorder: 'focus:border-orange-500/50'
  },
  sky: {
    gradient: 'from-sky-500/20 to-blue-500/20',
    iconHover: 'group-hover:text-sky-400',
    focusBorder: 'focus:border-sky-500/50'
  }
};

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder, 
  theme = 'blue' 
}: SearchBarProps) {
  const config = themeConfig[theme];

  return (
    <div className="flex-1">
      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity`}></div>
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className={`absolute left-4 w-5 h-5 text-gray-400 ${config.iconHover} transition-colors`} />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none ${config.focusBorder} focus:bg-white/10 transition-all`}
          />
        </div>
      </div>
    </div>
  );
}