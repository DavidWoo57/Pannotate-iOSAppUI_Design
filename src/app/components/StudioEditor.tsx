import { useState } from 'react';
import {
  ChevronLeft,
  Wand2,
  PenTool,
  Circle,
  Type,
  ArrowRight,
  Crop,
  Eraser,
  Sparkles,
  User,
  BookOpen,
  MoreVertical,
  Play,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Screen } from '../App';

interface StudioEditorProps {
  isIPad: boolean;
  onNavigate: (screen: Screen) => void;
}

export function StudioEditor({ isIPad, onNavigate }: StudioEditorProps) {
  const { isDark } = useTheme();
  const [selectedTool, setSelectedTool] = useState<string>('pan');
  const [motionText, setMotionText] = useState('');

  const tools = [
    { id: 'pan', label: 'Pan', icon: Wand2 },
    { id: 'draw', label: 'Draw', icon: PenTool },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'arrow', label: 'Arrow', icon: ArrowRight },
    { id: 'crop', label: 'Crop', icon: Crop },
    { id: 'erase', label: 'Erase', icon: Eraser },
  ];

  const characters = [
    { name: 'Character 1', thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    { name: 'Character 2', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Character 3', thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  ];

  const recipes = [
    'Slow zoom in',
    'Dolly forward',
    'Parallax reveal',
    'Focus shift',
    'Orbital rotation',
  ];

  // Theme tokens
  const bg = isDark ? 'bg-black' : 'bg-slate-100';
  const sidebarGlass = isDark
    ? 'bg-zinc-900/60 backdrop-blur-xl border-r border-white/[0.07]'
    : 'bg-white/70 backdrop-blur-xl border-r border-zinc-200/80';
  const topBarGlass = isDark
    ? 'bg-zinc-950/90 backdrop-blur-2xl border-b border-white/[0.08]'
    : 'bg-white/85 backdrop-blur-2xl border-b border-zinc-200/80';
  const bottomBarGlass = isDark
    ? 'bg-zinc-950/90 backdrop-blur-2xl border-t border-white/[0.08]'
    : 'bg-white/85 backdrop-blur-2xl border-t border-zinc-200/80';
  const textPrimary = isDark ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const textMuted = isDark ? 'text-zinc-600' : 'text-zinc-400';
  const accentText = isDark ? 'text-blue-400' : 'text-blue-600';
  const divider = isDark ? 'border-white/[0.06]' : 'border-zinc-200/80';

  const toolActive = isDark
    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    : 'bg-blue-50 text-blue-600 border border-blue-200';
  const toolInactive = isDark
    ? 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700/60 border border-transparent'
    : 'bg-gray-100 text-zinc-500 hover:bg-gray-200 border border-transparent';

  const inputClass = isDark
    ? 'bg-zinc-800/60 border border-white/10 text-white placeholder-zinc-500 focus:border-blue-500/50'
    : 'bg-gray-100 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-blue-400';

  const btnSecondary = isDark
    ? 'bg-zinc-800/70 hover:bg-zinc-700/80 text-zinc-200 border border-white/[0.08]'
    : 'bg-gray-100 hover:bg-gray-200 text-zinc-700 border border-zinc-200';

  const recipeBtn = isDark
    ? 'bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300'
    : 'bg-gray-100 hover:bg-gray-200 text-zinc-600';

  if (isIPad) {
    return (
      <div className={`size-full flex ${bg}`}>
        {/* Left sidebar */}
        <div className={`w-72 ${sidebarGlass} flex flex-col overflow-auto`}>
          <div className={`p-4 border-b ${divider}`}>
            <button
              onClick={() => onNavigate('home')}
              className={`w-full px-4 py-2.5 rounded-xl ${btnSecondary} text-sm font-medium flex items-center gap-2 transition-colors`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Projects
            </button>
          </div>

          <div className="p-4">
            <h3 className={`text-[10px] font-semibold ${textMuted} uppercase tracking-widest mb-3`}>
              Annotation Tools
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = selectedTool === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${
                      isActive ? toolActive : toolInactive
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tool.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`p-4 border-t ${divider}`}>
            <h3 className={`text-[10px] font-semibold ${textMuted} uppercase tracking-widest mb-3 flex items-center gap-2`}>
              <User className="w-3.5 h-3.5" />
              Characters
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {characters.map((char, idx) => (
                <button
                  key={idx}
                  className={`aspect-square rounded-xl overflow-hidden border ${isDark ? 'border-white/10 hover:border-blue-500/50' : 'border-zinc-200 hover:border-blue-400'} transition-colors`}
                >
                  <img src={char.thumbnail} alt={char.name} className="size-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className={`p-4 border-t ${divider}`}>
            <h3 className={`text-[10px] font-semibold ${textMuted} uppercase tracking-widest mb-3 flex items-center gap-2`}>
              <BookOpen className="w-3.5 h-3.5" />
              Cinematic Recipes
            </h3>
            <div className="space-y-1.5">
              {recipes.map((recipe, idx) => (
                <button
                  key={idx}
                  className={`w-full px-3 py-2 rounded-xl ${recipeBtn} text-sm text-left transition-colors`}
                >
                  {recipe}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main canvas area */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <div className={`h-14 ${topBarGlass} flex items-center justify-between px-6`}>
            <h2 className={`text-sm font-semibold ${textPrimary}`}>Urban Sunset — Scene 1</h2>
            <button
              onClick={() => onNavigate('outputs')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-medium flex items-center gap-2 text-white transition-colors shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Generate
            </button>
          </div>

          {/* Canvas */}
          <div className={`flex-1 flex items-center justify-center p-8 ${isDark ? 'bg-zinc-950/40' : 'bg-slate-200/40'}`}>
            <div className="relative max-w-5xl w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop"
                alt="Canvas"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none">
                <svg className="size-full">
                  <circle cx="40%" cy="50%" r="60" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.7" />
                  <path d="M 60% 30% L 80% 50%" stroke="#3b82f6" strokeWidth="3" opacity="0.7" markerEnd="url(#arrowhead)" />
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" opacity="0.7" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom motion bar */}
          <div className={`${bottomBarGlass} p-5`}>
            <label className={`block text-xs font-semibold ${textMuted} uppercase tracking-wider mb-2`}>
              Motion Description
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={motionText}
                onChange={(e) => setMotionText(e.target.value)}
                placeholder="Describe the motion… (e.g., camera slowly zooms in on the sunset)"
                className={`flex-1 px-4 py-3 ${inputClass} rounded-xl focus:outline-none transition-colors`}
              />
              <button className="px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex items-center gap-2 text-white transition-colors shadow-md shadow-blue-500/20">
                <Play className="w-4 h-4" />
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // iPhone layout
  return (
    <div className={`size-full flex flex-col ${bg}`}>
      {/* Top nav bar */}
      <div className={`h-14 ${topBarGlass} flex items-center px-4 flex-shrink-0`}>
        <button
          onClick={() => onNavigate('home')}
          className={`flex items-center gap-1 py-2 pr-2 ${isDark ? 'text-blue-400' : 'text-blue-600'} transition-opacity active:opacity-60`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Projects</span>
        </button>
        <h2 className={`flex-1 text-center text-sm font-semibold ${textPrimary}`}>Studio</h2>
        <button className={`p-2 -mr-2 ${textSecondary}`}>
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Canvas */}
      <div className={`flex-1 flex items-center justify-center p-4 ${isDark ? 'bg-zinc-950/30' : 'bg-slate-200/30'}`}>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop"
            alt="Canvas"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none">
            <svg className="size-full">
              <circle cx="30%" cy="40%" r="40" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.75" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className={`${bottomBarGlass} flex-shrink-0`}>
        <div className="px-4 pt-3 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = selectedTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${
                    isActive ? toolActive : toolInactive
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tool.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="px-4 pb-4">
          <input
            type="text"
            value={motionText}
            onChange={(e) => setMotionText(e.target.value)}
            placeholder="Describe the motion…"
            className={`w-full px-4 py-3 ${inputClass} rounded-xl focus:outline-none transition-colors mb-3`}
          />
          <button
            onClick={() => onNavigate('outputs')}
            className="w-full px-6 py-3.5 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex items-center justify-center gap-2 text-white transition-colors shadow-lg shadow-blue-500/25"
          >
            <Sparkles className="w-5 h-5" />
            Generate Video
          </button>
        </div>
      </div>
    </div>
  );
}
