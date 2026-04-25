import { Plus, Clock, Folder, MoreHorizontal, Zap, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Screen } from '../App';

interface HomeScreenProps {
  isIPad: boolean;
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ isIPad, onNavigate }: HomeScreenProps) {
  const { isDark } = useTheme();

  const projects = [
    {
      id: 1,
      title: 'Urban Sunset',
      thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop',
      clips: 8,
      lastEdited: '2 hours ago',
    },
    {
      id: 2,
      title: 'Ocean Waves',
      thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
      clips: 5,
      lastEdited: 'Yesterday',
    },
    {
      id: 3,
      title: 'Forest Path',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      clips: 12,
      lastEdited: '3 days ago',
    },
    {
      id: 4,
      title: 'City Lights',
      thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
      clips: 6,
      lastEdited: '1 week ago',
    },
  ];

  // Theme tokens
  const bg = isDark ? 'bg-black' : 'bg-slate-100';
  const sidebarGlass = isDark
    ? 'bg-zinc-900/60 backdrop-blur-xl border-r border-white/[0.07]'
    : 'bg-white/70 backdrop-blur-xl border-r border-zinc-200/80';
  const surfaceClass = isDark
    ? 'bg-zinc-900/70 backdrop-blur-xl border border-white/[0.08]'
    : 'bg-white/90 backdrop-blur-xl border border-zinc-200/80';
  const textPrimary = isDark ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const textMuted = isDark ? 'text-zinc-600' : 'text-zinc-400';
  const accentText = isDark ? 'text-blue-400' : 'text-blue-600';
  const accentSurface = isDark
    ? 'bg-blue-500/10 text-blue-400'
    : 'bg-blue-50 text-blue-600';
  const rowHover = isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-zinc-100/60';
  const cardBorder = isDark
    ? 'border border-white/[0.07] hover:border-white/15'
    : 'border border-zinc-200 hover:border-zinc-300';
  const btnSecondary = isDark
    ? 'bg-zinc-800/70 hover:bg-zinc-700/80 text-zinc-300 border border-white/[0.07]'
    : 'bg-gray-100/80 hover:bg-gray-200/80 text-zinc-600 border border-zinc-200';

  if (isIPad) {
    return (
      <div className={`size-full flex ${bg}`}>
        {/* Sidebar */}
        <div className={`w-64 ${sidebarGlass} flex flex-col`}>
          {/* Pannotate branding */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h1 className={`text-lg font-semibold tracking-tight ${textPrimary}`}>Pannotate</h1>
            </div>
            <p className={`text-xs ${textMuted} pl-9`}>Video Studio</p>
          </div>

          <nav className="flex-1 px-3">
            <button className={`w-full px-3 py-2.5 rounded-xl ${accentSurface} text-sm font-medium flex items-center gap-3 mb-1`}>
              <Folder className="w-4.5 h-4.5" />
              All Projects
            </button>
            <button className={`w-full px-3 py-2.5 rounded-xl ${textSecondary} ${rowHover} text-sm font-medium flex items-center gap-3 transition-colors`}>
              <Clock className="w-4.5 h-4.5" />
              Recent
            </button>
          </nav>

          {/* User pill at bottom of sidebar */}
          <div className="p-4">
            <button
              onClick={() => onNavigate('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${btnSecondary} transition-colors`}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/70 to-violet-600/70 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-white">JD</span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className={`text-xs font-medium ${textPrimary} truncate`}>Jordan Davis</p>
                <p className={`text-xs ${textMuted}`}>Pro Creator</p>
              </div>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-3xl font-semibold mb-1 ${textPrimary}`}>Projects</h2>
                <p className={textSecondary}>Create and manage your video projects</p>
              </div>
              <button
                onClick={() => onNavigate('studio')}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex items-center gap-2 text-white transition-colors shadow-lg shadow-blue-500/25"
              >
                <Plus className="w-4.5 h-4.5" />
                New Project
              </button>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onNavigate('studio')}
                  className="group text-left"
                >
                  <div className={`aspect-video rounded-2xl overflow-hidden mb-3 ${isDark ? 'bg-zinc-800/50' : 'bg-gray-100'} ${cardBorder} transition-all duration-200 shadow-sm`}>
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className={`text-sm font-medium mb-0.5 group-hover:${accentText} transition-colors ${textPrimary}`}>
                    {project.title}
                  </h3>
                  <p className={`text-xs ${textMuted}`}>
                    {project.clips} clips · {project.lastEdited}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // iPhone layout
  return (
    <div className={`size-full overflow-auto pb-4 ${bg}`}>
      {/* Header */}
      <div className="px-5 pt-14 pb-3">
        <div className="flex items-center justify-between mb-1">
          {/* Pannotate branding */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className={`text-base font-semibold tracking-tight ${textPrimary}`}>Pannotate</span>
          </div>
          <button className={`p-2 rounded-xl ${isDark ? 'bg-zinc-800/60 border border-white/[0.08]' : 'bg-white/80 border border-zinc-200'}`}>
            <Search className={`w-4.5 h-4.5 ${textSecondary}`} />
          </button>
        </div>
        <div className="mt-4">
          <h1 className={`text-3xl font-semibold ${textPrimary}`}>Projects</h1>
          <p className={`text-sm ${textSecondary}`}>Your creative workspace</p>
        </div>
      </div>

      {/* New project CTA */}
      <div className="px-5 pb-5">
        <button
          onClick={() => onNavigate('studio')}
          className={`w-full aspect-video rounded-2xl ${
            isDark
              ? 'bg-gradient-to-br from-blue-500/20 to-violet-500/15 border-2 border-dashed border-blue-500/30 hover:border-blue-500/50'
              : 'bg-gradient-to-br from-blue-50 to-violet-50 border-2 border-dashed border-blue-200 hover:border-blue-400/60'
          } flex flex-col items-center justify-center gap-3 transition-colors`}
        >
          <div className={`w-14 h-14 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center`}>
            <Plus className={`w-7 h-7 ${accentText}`} />
          </div>
          <span className={`text-sm font-medium ${accentText}`}>Create New Project</span>
        </button>
      </div>

      {/* Recent projects */}
      <div className="px-5">
        <h2 className={`text-base font-semibold mb-3 ${textPrimary}`}>Recent Projects</h2>
        <div className="space-y-2.5">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onNavigate('studio')}
              className={`w-full ${surfaceClass} rounded-2xl overflow-hidden flex items-center gap-3.5 ${rowHover} transition-colors shadow-sm`}
            >
              <div className="w-24 h-[68px] bg-zinc-800 flex-shrink-0 rounded-l-2xl overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1 text-left py-3">
                <h3 className={`text-sm font-medium mb-0.5 ${textPrimary}`}>{project.title}</h3>
                <p className={`text-xs ${textMuted}`}>
                  {project.clips} clips · {project.lastEdited}
                </p>
              </div>
              <MoreHorizontal className={`w-5 h-5 ${textMuted} mr-4`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
