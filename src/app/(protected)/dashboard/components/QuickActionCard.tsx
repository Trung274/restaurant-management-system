'use client';

interface QuickActionCardProps {
  title: string;
  description: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  onClick?: () => void;
}

export default function QuickActionCard({
  title,
  description,
  emoji,
  gradientFrom,
  gradientTo,
  onClick,
}: QuickActionCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom.replace('/20', '/5')} ${gradientTo.replace('/20', '/5')} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className="relative flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        <div className="text-5xl">{emoji}</div>
      </div>
    </div>
  );
}