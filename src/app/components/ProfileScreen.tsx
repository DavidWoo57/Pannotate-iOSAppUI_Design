import {
  Settings,
  HelpCircle,
  Star,
  Shield,
  LogOut,
  ChevronRight,
  Film,
  Layers,
  FolderOpen,
  Zap,
  Bell,
  CreditCard,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type Screen = 'home' | 'studio' | 'outputs' | 'storyboard' | 'profile' | 'settings';

interface ProfileScreenProps {
  isIPad: boolean;
  onNavigate: (screen: Screen) => void;
}

const recentActivity = [
  {
    id: 1,
    type: 'export',
    label: 'Urban Sunset exported',
    time: '2h ago',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=120&h=80&fit=crop',
  },
  {
    id: 2,
    type: 'clip',
    label: 'Ocean Waves clip generated',
    time: '5h ago',
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=120&h=80&fit=crop',
  },
  {
    id: 3,
    type: 'draft',
    label: 'Forest Path — draft saved',
    time: 'Yesterday',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&h=80&fit=crop',
  },
];

export function ProfileScreen({ isIPad, onNavigate }: ProfileScreenProps) {
  const { isDark } = useTheme();

  const bg = isDark ? 'bg-black' : 'bg-slate-100';
  const surfaceClass = isDark
    ? 'bg-zinc-900/70 backdrop-blur-xl border border-white/[0.08]'
    : 'bg-white/90 backdrop-blur-xl border border-zinc-200/80';
  const glassBar = isDark
    ? 'bg-zinc-950/90 backdrop-blur-2xl border-white/[0.08]'
    : 'bg-white/85 backdrop-blur-2xl border-zinc-200/80';
  const textPrimary = isDark ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const textMuted = isDark ? 'text-zinc-600' : 'text-zinc-400';
  const divider = isDark ? 'border-white/[0.06]' : 'border-zinc-200/80';
  const rowHover = isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-zinc-50';
  const btnSecondary = isDark
    ? 'bg-zinc-800/70 hover:bg-zinc-700/80 text-white border border-white/[0.08]'
    : 'bg-gray-100/80 hover:bg-gray-200/80 text-zinc-900 border border-zinc-200';
  const accentText = isDark ? 'text-blue-400' : 'text-blue-600';
  const chevronColor = isDark ? 'text-zinc-600' : 'text-zinc-400';

  const StatCard = ({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) => (
    <div className={`flex-1 ${surfaceClass} rounded-2xl p-4 flex flex-col items-center gap-1.5`}>
      <Icon className={`w-5 h-5 ${accentText}`} />
      <span className={`text-lg font-semibold ${textPrimary}`}>{value}</span>
      <span className={`text-xs ${textSecondary}`}>{label}</span>
    </div>
  );

  const AccountRow = ({
    icon: Icon,
    label,
    sublabel,
    onPress,
    danger,
    badge,
  }: {
    icon: LucideIcon;
    label: string;
    sublabel?: string;
    onPress?: () => void;
    danger?: boolean;
    badge?: string;
  }) => (
    <button
      onClick={onPress}
      className={`w-full flex items-center gap-3.5 px-4 py-3.5 ${rowHover} transition-colors`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          danger
            ? isDark
              ? 'bg-red-500/15'
              : 'bg-red-50'
            : isDark
            ? 'bg-zinc-800/80'
            : 'bg-gray-100'
        }`}
      >
        <Icon
          className={`w-4.5 h-4.5 ${
            danger ? (isDark ? 'text-red-400' : 'text-red-500') : isDark ? 'text-zinc-300' : 'text-zinc-600'
          }`}
        />
      </div>
      <div className="flex-1 text-left">
        <span className={`text-sm font-medium ${danger ? (isDark ? 'text-red-400' : 'text-red-500') : textPrimary}`}>
          {label}
        </span>
        {sublabel && <p className={`text-xs ${textMuted}`}>{sublabel}</p>}
      </div>
      {badge && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'} font-medium`}>
          {badge}
        </span>
      )}
      {!danger && <ChevronRight className={`w-4 h-4 ${chevronColor}`} />}
    </button>
  );

  if (isIPad) {
    return (
      <div className={`size-full flex ${bg}`}>
        {/* Left profile panel */}
        <div className={`w-80 ${isDark ? 'bg-zinc-900/50 backdrop-blur-xl border-r border-white/[0.07]' : 'bg-white/70 backdrop-blur-xl border-r border-zinc-200/80'} flex flex-col overflow-auto`}>
          {/* Pannotate branding */}
          <div className="px-6 pt-8 pb-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className={`text-base font-semibold tracking-tight ${textPrimary}`}>Pannotate</span>
            </div>
            <p className={`text-xs ${textMuted}`}>AI Video Creation Studio</p>
          </div>

          {/* User avatar + info */}
          <div className="px-6 pb-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/80 to-violet-600/80 flex items-center justify-center mb-3 shadow-lg">
              <span className="text-2xl font-semibold text-white">JD</span>
            </div>
            <h2 className={`text-lg font-semibold ${textPrimary}`}>Jordan Davis</h2>
            <p className={`text-sm ${textSecondary}`}>@jordan.davis</p>
            <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gradient-to-r from-blue-500/25 to-violet-500/25 text-blue-300 border border-blue-500/25' : 'bg-gradient-to-r from-blue-50 to-violet-50 text-blue-700 border border-blue-200'}`}>
              Pro Creator
            </span>
          </div>

          {/* Stats */}
          <div className="px-4 pb-6 flex gap-2">
            <StatCard icon={FolderOpen} value="12" label="Projects" />
            <StatCard icon={Film} value="47" label="Clips" />
            <StatCard icon={Layers} value="8" label="Exports" />
          </div>

          {/* Usage */}
          <div className={`mx-4 mb-6 ${surfaceClass} rounded-2xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${textSecondary}`}>Monthly Credits</span>
              <span className={`text-xs font-semibold ${accentText}`}>340 / 500</span>
            </div>
            <div className={`h-1.5 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-gray-200'}`}>
              <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 w-[68%]" />
            </div>
            <p className={`text-xs ${textMuted} mt-2`}>160 credits remaining this month</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-3xl">
            <h2 className={`text-2xl font-semibold mb-6 ${textPrimary}`}>Account</h2>

            {/* Recent Activity */}
            <section className="mb-6">
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3`}>Recent Activity</h3>
              <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
                {recentActivity.map((item, i) => (
                  <div key={item.id}>
                    <div className="flex items-center gap-3 p-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.thumbnail} alt={item.label} className="size-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${textPrimary}`}>{item.label}</p>
                        <p className={`text-xs ${textMuted}`}>{item.time}</p>
                      </div>
                      <Clock className={`w-4 h-4 ${textMuted}`} />
                    </div>
                    {i < recentActivity.length - 1 && <div className={`h-px mx-4 ${divider}`} />}
                  </div>
                ))}
              </div>
            </section>

            {/* Settings section */}
            <section className="mb-6">
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3`}>Preferences</h3>
              <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
                <AccountRow
                  icon={Settings}
                  label="Settings"
                  sublabel="Theme, notifications, generation"
                  onPress={() => onNavigate('settings')}
                />
                <div className={`h-px mx-4 ${divider}`} />
                <AccountRow
                  icon={Bell}
                  label="Notifications"
                  sublabel="Manage alerts and updates"
                  onPress={() => onNavigate('settings')}
                />
                <div className={`h-px mx-4 ${divider}`} />
                <AccountRow
                  icon={CreditCard}
                  label="Subscription"
                  sublabel="Pro Creator · Renews Jan 2025"
                  badge="Pro"
                  onPress={() => onNavigate('settings')}
                />
              </div>
            </section>

            <section className="mb-6">
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3`}>Support</h3>
              <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
                <AccountRow icon={HelpCircle} label="Help & Support" sublabel="Documentation, tutorials, contact" />
                <div className={`h-px mx-4 ${divider}`} />
                <AccountRow icon={Star} label="Rate Pannotate" sublabel="Leave a review on the App Store" />
                <div className={`h-px mx-4 ${divider}`} />
                <AccountRow icon={Shield} label="Privacy & Terms" />
              </div>
            </section>

            <section>
              <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
                <AccountRow icon={LogOut} label="Sign Out" danger />
              </div>
            </section>

            <p className={`text-center text-xs ${textMuted} mt-8`}>Pannotate v1.0.0 · © 2025 Pannotate Inc.</p>
          </div>
        </div>
      </div>
    );
  }

  // iPhone layout
  return (
    <div className={`size-full overflow-auto pb-4 ${bg}`}>
      {/* Header */}
      <div className={`px-6 pt-14 pb-5 border-b ${divider}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className={`text-base font-semibold tracking-tight ${textPrimary}`}>Pannotate</span>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className={`p-2 rounded-xl ${isDark ? 'bg-zinc-800/60 border border-white/[0.08]' : 'bg-white/80 border border-zinc-200'} transition-colors`}
          >
            <Settings className={`w-5 h-5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} />
          </button>
        </div>
      </div>

      {/* User card */}
      <div className="px-4 pt-5 pb-4">
        <div className={`${surfaceClass} rounded-3xl p-5`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/80 to-violet-600/80 flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-xl font-semibold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className={`text-base font-semibold ${textPrimary}`}>Jordan Davis</h2>
              <p className={`text-sm ${textSecondary}`}>@jordan.davis</p>
              <span className={`inline-flex mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-blue-300 border border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-violet-50 text-blue-700 border border-blue-200'}`}>
                Pro Creator
              </span>
            </div>
          </div>

          {/* Credits bar */}
          <div className={`mt-4 pt-4 border-t ${divider}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs ${textSecondary}`}>Monthly Credits</span>
              <span className={`text-xs font-semibold ${accentText}`}>340 / 500</span>
            </div>
            <div className={`h-1.5 rounded-full ${isDark ? 'bg-zinc-700' : 'bg-gray-200'}`}>
              <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 w-[68%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 pb-5 flex gap-2.5">
        <StatCard icon={FolderOpen} value="12" label="Projects" />
        <StatCard icon={Film} value="47" label="Clips" />
        <StatCard icon={Layers} value="8" label="Exports" />
      </div>

      {/* Recent Activity */}
      <div className="px-4 pb-4">
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3 px-1`}>Recent Activity</h3>
        <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
          {recentActivity.map((item, i) => (
            <div key={item.id}>
              <button className={`w-full flex items-center gap-3 p-3.5 ${rowHover} transition-colors`}>
                <div className="w-12 h-9 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.thumbnail} alt={item.label} className="size-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${textPrimary}`}>{item.label}</p>
                  <p className={`text-xs ${textMuted}`}>{item.time}</p>
                </div>
                <ChevronRight className={`w-4 h-4 ${chevronColor}`} />
              </button>
              {i < recentActivity.length - 1 && <div className={`h-px mx-4 ${divider}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Account section */}
      <div className="px-4 pb-4">
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3 px-1`}>Account</h3>
        <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
          <AccountRow
            icon={Settings}
            label="Settings"
            sublabel="Theme, notifications, generation"
            onPress={() => onNavigate('settings')}
          />
          <div className={`h-px mx-4 ${divider}`} />
          <AccountRow
            icon={CreditCard}
            label="Subscription"
            sublabel="Pro Creator · Renews Jan 2025"
            badge="Pro"
            onPress={() => onNavigate('settings')}
          />
        </div>
      </div>

      {/* Support section */}
      <div className="px-4 pb-4">
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3 px-1`}>Support</h3>
        <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
          <AccountRow icon={HelpCircle} label="Help & Support" />
          <div className={`h-px mx-4 ${divider}`} />
          <AccountRow icon={Star} label="Rate Pannotate" />
          <div className={`h-px mx-4 ${divider}`} />
          <AccountRow icon={Shield} label="Privacy & Terms" />
        </div>
      </div>

      {/* Sign out */}
      <div className="px-4 pb-4">
        <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
          <AccountRow icon={LogOut} label="Sign Out" danger />
        </div>
      </div>

      {/* Footer branding */}
      <p className={`text-center text-xs ${textMuted} pb-6`}>Pannotate v1.0.0 · © 2025 Pannotate Inc.</p>
    </div>
  );
}