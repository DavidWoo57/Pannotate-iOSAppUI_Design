import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  ChevronLeft,
  Sun,
  Moon,
  Monitor,
  Bell,
  Zap,
  CreditCard,
  Shield,
  Info,
  ChevronRight,
  Sparkles,
  ToggleLeft,
  type LucideIcon,
} from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

type Screen = 'home' | 'studio' | 'outputs' | 'storyboard' | 'profile' | 'settings';

interface SettingsScreenProps {
  isIPad: boolean;
  onNavigate: (screen: Screen) => void;
}

export function SettingsScreen({ isIPad, onNavigate }: SettingsScreenProps) {
  const { isDark, theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [generationQuality, setGenerationQuality] = useState<'draft' | 'standard' | 'high'>('standard');
  const [autoChain, setAutoChain] = useState(false);
  const [motionSmoothing, setMotionSmoothing] = useState(true);

  const bg = isDark ? 'bg-black' : 'bg-slate-100';
  const surfaceClass = isDark
    ? 'bg-zinc-900/70 backdrop-blur-xl border border-white/[0.08]'
    : 'bg-white/90 backdrop-blur-xl border border-zinc-200/80';
  const glassTopBar = isDark
    ? 'bg-zinc-950/90 backdrop-blur-2xl border-b border-white/[0.08]'
    : 'bg-white/85 backdrop-blur-2xl border-b border-zinc-200/80';
  const textPrimary = isDark ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const textMuted = isDark ? 'text-zinc-600' : 'text-zinc-400';
  const divider = isDark ? 'border-white/[0.06]' : 'border-zinc-200/80';
  const rowHover = isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-zinc-50';
  const accentText = isDark ? 'text-blue-400' : 'text-blue-600';

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-7 rounded-full transition-colors ${value ? 'bg-blue-500' : isDark ? 'bg-zinc-700' : 'bg-gray-300'}`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );

  const ThemeOption = ({
    id,
    label,
    icon: Icon,
  }: {
    id: ThemeMode;
    label: string;
    icon: LucideIcon;
  }) => {
    const isSelected = theme === id;
    return (
      <button
        onClick={() => setTheme(id)}
        className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-medium transition-colors ${
          isSelected
            ? isDark
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-blue-50 text-blue-600 border border-blue-200'
            : isDark
            ? 'bg-zinc-800/60 text-zinc-400 border border-white/[0.06] hover:bg-zinc-700/60'
            : 'bg-gray-100 text-zinc-500 border border-zinc-200 hover:bg-gray-200'
        }`}
      >
        <Icon className="w-5 h-5" />
        {label}
      </button>
    );
  };

  const QualityOption = ({ id, label, desc }: { id: 'draft' | 'standard' | 'high'; label: string; desc: string }) => {
    const isSelected = generationQuality === id;
    return (
      <button
        onClick={() => setGenerationQuality(id)}
        className={`flex-1 p-3 rounded-xl text-left transition-colors ${
          isSelected
            ? isDark
              ? 'bg-blue-500/20 border border-blue-500/30'
              : 'bg-blue-50 border border-blue-200'
            : isDark
            ? 'bg-zinc-800/60 border border-white/[0.06]'
            : 'bg-gray-100 border border-zinc-200'
        }`}
      >
        <p className={`text-xs font-semibold ${isSelected ? accentText : textPrimary}`}>{label}</p>
        <p className={`text-xs ${textMuted} mt-0.5`}>{desc}</p>
      </button>
    );
  };

  const SectionRow = ({
    icon: Icon,
    label,
    sublabel,
    right,
  }: {
    icon: LucideIcon;
    label: string;
    sublabel?: string;
    right?: ReactNode;
  }) => (
    <div className={`flex items-center gap-3.5 px-4 py-3.5 ${rowHover} transition-colors`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-zinc-800/80' : 'bg-gray-100'}`}>
        <Icon className={`w-4.5 h-4.5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} />
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${textPrimary}`}>{label}</p>
        {sublabel && <p className={`text-xs ${textMuted}`}>{sublabel}</p>}
      </div>
      {right ?? <ChevronRight className={`w-4 h-4 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`} />}
    </div>
  );

  const content = (
    <div className={`${bg} flex-1 overflow-auto`}>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">

        {/* Appearance */}
        <section className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3 px-1`}>Appearance</h3>
          <div className={`${surfaceClass} rounded-2xl p-4`}>
            <p className={`text-sm font-medium ${textSecondary} mb-3`}>Theme</p>
            <div className="flex gap-2">
              <ThemeOption id="light" label="Light" icon={Sun} />
              <ThemeOption id="dark" label="Dark" icon={Moon} />
              <ThemeOption id="system" label="System" icon={Monitor} />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3 px-1`}>Notifications</h3>
          <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
            <div className={`flex items-center gap-3.5 px-4 py-3.5`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-zinc-800/80' : 'bg-gray-100'}`}>
                <Bell className={`w-4.5 h-4.5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${textPrimary}`}>Push Notifications</p>
                <p className={`text-xs ${textMuted}`}>Generation complete, exports ready</p>
              </div>
              <Toggle value={notifications} onChange={setNotifications} />
            </div>
          </div>
        </section>

        {/* Generation Preferences */}
        <section className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3 px-1`}>Generation</h3>
          <div className={`${surfaceClass} rounded-2xl p-4`}>
            <p className={`text-sm font-medium ${textSecondary} mb-3`}>Output Quality</p>
            <div className="flex gap-2 mb-4">
              <QualityOption id="draft" label="Draft" desc="Fast, 480p" />
              <QualityOption id="standard" label="Standard" desc="720p" />
              <QualityOption id="high" label="High" desc="1080p" />
            </div>
            <div className={`h-px ${divider} my-1 -mx-4`} />
            <div className={`flex items-center gap-3.5 pt-3`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-zinc-800/80' : 'bg-gray-100'}`}>
                <Zap className={`w-4.5 h-4.5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${textPrimary}`}>Auto-chain Clips</p>
                <p className={`text-xs ${textMuted}`}>Continue from last frame automatically</p>
              </div>
              <Toggle value={autoChain} onChange={setAutoChain} />
            </div>
            <div className={`h-px ${divider} my-1 -mx-4 mt-3`} />
            <div className={`flex items-center gap-3.5 pt-3`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-zinc-800/80' : 'bg-gray-100'}`}>
                <Sparkles className={`w-4.5 h-4.5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${textPrimary}`}>Motion Smoothing</p>
                <p className={`text-xs ${textMuted}`}>Interpolate frames for smoother output</p>
              </div>
              <Toggle value={motionSmoothing} onChange={setMotionSmoothing} />
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3 px-1`}>Account</h3>
          <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
            <SectionRow
              icon={CreditCard}
              label="Subscription"
              sublabel="Pro Creator · Renews Jan 2025"
              right={
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium mr-1 ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                  Pro
                </span>
              }
            />
            <div className={`h-px mx-4 ${divider}`} />
            <SectionRow icon={Shield} label="Privacy & Data" sublabel="Control how your data is used" />
            <div className={`h-px mx-4 ${divider}`} />
            <SectionRow icon={ToggleLeft} label="Connected Accounts" sublabel="Manage linked services" />
          </div>
        </section>

        {/* About */}
        <section className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider ${textMuted} mb-3 px-1`}>About</h3>
          <div className={`${surfaceClass} rounded-2xl overflow-hidden`}>
            <div className="px-4 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${textPrimary}`}>Pannotate</p>
                <p className={`text-xs ${textMuted}`}>Version 1.0.0 (Build 42)</p>
              </div>
            </div>
            <div className={`h-px mx-4 ${divider}`} />
            <SectionRow icon={Info} label="Terms of Service" />
            <div className={`h-px mx-4 ${divider}`} />
            <SectionRow icon={Shield} label="Privacy Policy" />
          </div>
        </section>

        <p className={`text-center text-xs ${textMuted}`}>© 2025 Pannotate Inc. All rights reserved.</p>
      </div>
    </div>
  );

  return (
    <div className={`size-full flex flex-col ${bg}`}>
      {/* Top navigation bar */}
      <div className={`${glassTopBar} flex items-center px-4 h-14 flex-shrink-0`}>
        <button
          onClick={() => onNavigate('profile')}
          className={`flex items-center gap-1 py-2 pr-3 ${isDark ? 'text-blue-400' : 'text-blue-600'} transition-opacity active:opacity-60`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Profile</span>
        </button>
        <h1 className={`flex-1 text-center text-base font-semibold ${textPrimary}`}>Settings</h1>
        <div className="w-16" />
      </div>
      {content}
    </div>
  );
}