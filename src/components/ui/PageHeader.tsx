// components/PageHeader.tsx
import React, { ReactNode } from 'react';

export type HeaderTheme = 
  | 'blue'
  | 'pink'
  | 'red'
  | 'amber'
  | 'purple'
  | 'indigo'
  | 'green'
  | 'slate'
  | 'sky';

interface PageHeaderProps {
  // Badge props
  badgeText: string;
  
  // Title props
  titleVietnamese: string;
  titleEnglish: string;
  
  // Description
  description: string;
  
  // Theme color
  theme?: HeaderTheme;
  
  // Optional action buttons (for reports, revenue pages)
  actions?: ReactNode;
}

const themeColors: Record<HeaderTheme, {
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  badgeDot: string;
  gradientFrom: string;
  gradientTo: string;
}> = {
  blue: {
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/20',
    badgeText: 'text-blue-400',
    badgeDot: 'bg-blue-400',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-cyan-400',
  },
  pink: {
    badgeBg: 'bg-pink-500/10',
    badgeBorder: 'border-pink-500/20',
    badgeText: 'text-pink-400',
    badgeDot: 'bg-pink-400',
    gradientFrom: 'from-pink-400',
    gradientTo: 'to-rose-500',
  },
  red: {
    badgeBg: 'bg-red-500/10',
    badgeBorder: 'border-red-500/20',
    badgeText: 'text-red-400',
    badgeDot: 'bg-red-400',
    gradientFrom: 'from-red-400',
    gradientTo: 'to-orange-500',
  },
  amber: {
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/20',
    badgeText: 'text-amber-400',
    badgeDot: 'bg-amber-400',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-yellow-400',
  },
  purple: {
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/20',
    badgeText: 'text-purple-400',
    badgeDot: 'bg-purple-400',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-fuchsia-400',
  },
  indigo: {
    badgeBg: 'bg-indigo-500/10',
    badgeBorder: 'border-indigo-500/20',
    badgeText: 'text-indigo-400',
    badgeDot: 'bg-indigo-400',
    gradientFrom: 'from-indigo-400',
    gradientTo: 'to-violet-500',
  },
  green: {
    badgeBg: 'bg-green-500/10',
    badgeBorder: 'border-green-500/20',
    badgeText: 'text-green-400',
    badgeDot: 'bg-green-400',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-emerald-500',
  },
  slate: {
    badgeBg: 'bg-slate-500/10',
    badgeBorder: 'border-slate-500/20',
    badgeText: 'text-slate-400',
    badgeDot: 'bg-slate-400',
    gradientFrom: 'from-slate-400',
    gradientTo: 'to-gray-500',
  },
  sky: {
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/20',
    badgeText: 'text-sky-400',
    badgeDot: 'bg-sky-400',
    gradientFrom: 'from-sky-400',
    gradientTo: 'to-blue-400',
  },
};

export default function PageHeader({
  badgeText,
  titleVietnamese,
  titleEnglish,
  description,
  theme = 'blue',
  actions,
}: PageHeaderProps) {
  const colors = themeColors[theme];

  return (
    <div className="mb-12">
      <div className="inline-block mb-4">
        <span
          className={`inline-flex items-center gap-2 px-4 py-2 ${colors.badgeBg} border ${colors.badgeBorder} rounded-full ${colors.badgeText} text-sm font-medium`}
        >
          <span
            className={`w-2 h-2 ${colors.badgeDot} rounded-full animate-pulse`}
          ></span>
          {badgeText}
        </span>
      </div>

      {actions ? (
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">
              {titleVietnamese}
              <span
                className={`block text-transparent bg-clip-text bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} mt-2`}
              >
                {titleEnglish}
              </span>
            </h1>
            <p className="text-gray-400 text-lg">{description}</p>
          </div>
          <div className="flex gap-3">{actions}</div>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-bold text-white mb-4">
            {titleVietnamese}
            <span
              className={`block text-transparent bg-clip-text bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} mt-2`}
            >
              {titleEnglish}
            </span>
          </h1>
          <p className="text-gray-400 text-lg">{description}</p>
        </>
      )}
    </div>
  );
}