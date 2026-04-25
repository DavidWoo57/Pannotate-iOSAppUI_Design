import { useState } from 'react';
import { GripVertical, Plus, Play, Link, Scissors, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Screen } from '../App';

interface StoryboardScreenProps {
  isIPad: boolean;
  onNavigate: (screen: Screen) => void;
}

export function StoryboardScreen({ isIPad, onNavigate }: StoryboardScreenProps) {
  const { isDark } = useTheme();
  const [clips] = useState([
    {
      id: 1,
      title: 'Urban Sunset - Scene 1',
      thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop',
      duration: 4,
      continuesFrom: null,
    },
    {
      id: 2,
      title: 'Urban Sunset - Scene 2',
      thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop',
      duration: 3,
      continuesFrom: 1,
    },
    {
      id: 3,
      title: 'Ocean Waves',
      thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
      duration: 5,
      continuesFrom: null,
    },
    {
      id: 4,
      title: 'Forest Path',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      duration: 4,
      continuesFrom: null,
    },
  ]);

  const totalDuration = clips.reduce((sum, clip) => sum + clip.duration, 0);

  // Theme tokens
  const bg = isDark ? 'bg-black' : 'bg-slate-100';
  const topBarGlass = isDark
    ? 'bg-zinc-950/90 backdrop-blur-2xl border-b border-white/[0.08]'
    : 'bg-white/85 backdrop-blur-2xl border-b border-zinc-200/80';
  const bottomBarGlass = isDark
    ? 'bg-zinc-950/90 backdrop-blur-2xl border-t border-white/[0.08]'
    : 'bg-white/85 backdrop-blur-2xl border-t border-zinc-200/80';
  const surfaceClass = isDark
    ? 'bg-zinc-900/70 backdrop-blur-xl border border-white/[0.08]'
    : 'bg-white/90 backdrop-blur-xl border border-zinc-200/80';
  const textPrimary = isDark ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const textMuted = isDark ? 'text-zinc-600' : 'text-zinc-400';
  const accentText = isDark ? 'text-blue-400' : 'text-blue-600';
  const divider = isDark ? 'border-white/[0.06]' : 'border-zinc-200/80';
  const cardHover = isDark ? 'hover:border-white/15' : 'hover:border-zinc-300';
  const btnSecondary = isDark
    ? 'bg-zinc-800/70 hover:bg-zinc-700/80 text-zinc-200 border border-white/[0.08]'
    : 'bg-gray-100 hover:bg-gray-200 text-zinc-700 border border-zinc-200';
  const addBtn = isDark
    ? 'border-zinc-700/70 hover:border-blue-500/50 text-zinc-600 hover:text-zinc-400'
    : 'border-zinc-300 hover:border-blue-400 text-zinc-400 hover:text-zinc-500';
  const clipRowSurface = isDark
    ? 'bg-zinc-900/60 border border-white/[0.07]'
    : 'bg-white/90 border border-zinc-200/80';
  const gripColor = isDark ? 'text-zinc-600' : 'text-zinc-400';
  const indexBadge = isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-zinc-500';
  const scissorsBtn = isDark
    ? 'hover:bg-zinc-800/80 text-zinc-500'
    : 'hover:bg-gray-100 text-zinc-400';

  if (isIPad) {
    return (
      <div className={`size-full flex flex-col ${bg}`}>
        {/* Top bar */}
        <div className={`h-14 ${topBarGlass} flex items-center justify-between px-6 flex-shrink-0`}>
          <div>
            <h2 className={`text-sm font-semibold ${textPrimary}`}>Video Sequence</h2>
            <p className={`text-xs ${textMuted}`}>{clips.length} clips · {totalDuration}s total</p>
          </div>
          <div className="flex gap-2">
            <button className={`px-4 py-2 ${btnSecondary} rounded-xl text-sm font-medium flex items-center gap-2 transition-colors`}>
              <Play className="w-4 h-4" />
              Preview
            </button>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-medium flex items-center gap-2 text-white transition-colors shadow-md shadow-blue-500/20">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Sequence grid */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-4 gap-4">
              {clips.map((clip, index) => (
                <div key={clip.id}>
                  {clip.continuesFrom && (
                    <div className="flex items-center justify-center py-2">
                      <div className={`flex items-center gap-1.5 text-xs ${accentText}`}>
                        <Link className="w-3.5 h-3.5" />
                        Continues from prev.
                      </div>
                    </div>
                  )}
                  <div className={`${surfaceClass} rounded-xl overflow-hidden ${cardHover} transition-all shadow-sm`}>
                    <div className="relative aspect-video bg-zinc-800">
                      <img src={clip.thumbnail} alt={clip.title} className="size-full object-cover" />
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-xs font-semibold text-white">
                        {index + 1}
                      </div>
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-xs font-medium text-white">
                        {clip.duration}s
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-start gap-2">
                        <button className={`p-0.5 -ml-1 -mt-0.5 cursor-grab active:cursor-grabbing ${gripColor}`}>
                          <GripVertical className="w-4 h-4" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-xs font-medium truncate ${textPrimary}`}>{clip.title}</h3>
                        </div>
                      </div>
                      <div className="flex gap-1.5 mt-2.5">
                        <button className={`flex-1 py-1.5 ${isDark ? 'bg-zinc-800/70 hover:bg-zinc-700/70' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                          <Scissors className={`w-3 h-3 mx-auto ${textSecondary}`} />
                        </button>
                        <button className={`flex-1 py-1.5 ${isDark ? 'bg-zinc-800/70 hover:bg-zinc-700/70' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                          <Link className={`w-3 h-3 mx-auto ${textSecondary}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => onNavigate('outputs')}
                className={`aspect-square rounded-xl border-2 border-dashed ${addBtn} flex flex-col items-center justify-center gap-2 transition-colors`}
              >
                <Plus className="w-7 h-7" />
                <span className="text-xs font-medium">Add Clip</span>
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
      <div className="px-5 pt-14 pb-4 flex-shrink-0">
        <h1 className={`text-3xl font-semibold mb-0.5 ${textPrimary}`}>Sequence</h1>
        <p className={`text-sm ${textSecondary}`}>{clips.length} clips · {totalDuration}s total</p>
      </div>

      <div className="flex-1 overflow-auto px-5 pb-4">
        <div className="space-y-2.5">
          {clips.map((clip, index) => (
            <div key={clip.id}>
              {clip.continuesFrom && (
                <div className="flex items-center justify-center py-1.5">
                  <div className={`flex items-center gap-1.5 text-xs ${accentText}`}>
                    <Link className="w-3.5 h-3.5" />
                    Continues from previous frame
                  </div>
                </div>
              )}
              <div className={`${clipRowSurface} rounded-2xl overflow-hidden flex items-center gap-3 p-3 shadow-sm`}>
                <button className={`p-1 cursor-grab active:cursor-grabbing ${gripColor}`}>
                  <GripVertical className="w-5 h-5" />
                </button>
                <div className={`w-8 h-8 rounded-lg ${indexBadge} flex items-center justify-center text-xs font-semibold flex-shrink-0`}>
                  {index + 1}
                </div>
                <div className="w-[72px] h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={clip.thumbnail} alt={clip.title} className="size-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium truncate ${textPrimary}`}>{clip.title}</h3>
                  <p className={`text-xs ${textMuted}`}>{clip.duration}s</p>
                </div>
                <button className={`p-2 ${scissorsBtn} rounded-xl transition-colors`}>
                  <Scissors className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => onNavigate('outputs')}
            className={`w-full py-6 border-2 border-dashed ${addBtn} rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors`}
          >
            <Plus className="w-7 h-7" />
            <span className="text-sm font-medium">Add Clip to Sequence</span>
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`${bottomBarGlass} p-4 flex gap-2.5 flex-shrink-0`}>
        <button className={`flex-1 px-5 py-3.5 ${btnSecondary} rounded-xl font-medium flex items-center justify-center gap-2 transition-colors`}>
          <Play className="w-4.5 h-4.5" />
          Preview
        </button>
        <button className="flex-1 px-5 py-3.5 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex items-center justify-center gap-2 text-white transition-colors shadow-lg shadow-blue-500/25">
          <Download className="w-4.5 h-4.5" />
          Export
        </button>
      </div>
    </div>
  );
}
