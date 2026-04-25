import { Home, Video, Film, Layers, User, type LucideIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Screen } from '../App';

interface TabBarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function TabBar({ activeScreen, onNavigate }: TabBarProps) {
  const { isDark } = useTheme();

  const tabs: { id: Screen; label: string; icon: LucideIcon }[] = [
    { id: 'home', label: 'Projects', icon: Home },
    { id: 'studio', label: 'Studio', icon: Video },
    { id: 'outputs', label: 'Outputs', icon: Film },
    { id: 'storyboard', label: 'Sequence', icon: Layers },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const barClass = isDark
    ? 'bg-zinc-950/90 backdrop-blur-2xl border-t border-white/[0.08]'
    : 'bg-white/88 backdrop-blur-2xl border-t border-zinc-200/80 shadow-sm';

  const activeColor = isDark ? 'text-blue-400' : 'text-blue-600';
  const inactiveColor = isDark ? 'text-zinc-500' : 'text-zinc-400';

  // For settings pushed from profile, highlight profile tab
  const resolvedActive = activeScreen === 'settings' ? 'profile' : activeScreen;

  return (
    <div className={`h-20 ${barClass} flex items-center justify-around px-1 pb-safe`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = resolvedActive === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center justify-center gap-1 px-2 py-2 min-w-[60px] transition-all active:scale-95"
          >
            <div className={`relative flex items-center justify-center w-10 h-7 rounded-xl transition-colors ${isActive ? (isDark ? 'bg-blue-500/15' : 'bg-blue-50') : ''}`}>
              <Icon
                className={`w-5 h-5 transition-colors ${isActive ? activeColor : inactiveColor}`}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
            </div>
            <span
              className={`text-[10px] font-medium transition-colors ${isActive ? activeColor : inactiveColor}`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}