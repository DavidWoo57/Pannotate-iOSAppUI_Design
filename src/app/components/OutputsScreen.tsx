import { Play, RotateCw, ArrowRight, Download, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Screen } from '../App';

interface OutputsScreenProps {
  isIPad: boolean;
  onNavigate: (screen: Screen) => void;
}

export function OutputsScreen({ isIPad, onNavigate }: OutputsScreenProps) {
  const { isDark } = useTheme();

  const jobs = [
    {
      id: 1,
      title: 'Urban Sunset - Scene 1',
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop',
      duration: '4s',
      createdAt: '5 min ago',
    },
    {
      id: 2,
      title: 'Ocean Waves - Shot 2',
      status: 'processing',
      thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
      duration: '3s',
      createdAt: '12 min ago',
      progress: 65,
    },
    {
      id: 3,
      title: 'Forest Path - Scene 3',
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      duration: '5s',
      createdAt: '1 hour ago',
    },
    {
      id: 4,
      title: 'City Lights - Opening',
      status: 'queued',
      thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
      duration: '4s',
      createdAt: '2 hours ago',
    },
  ];

  // Theme tokens
  const bg = isDark ? 'bg-black' : 'bg-slate-100';
  const surfaceClass = isDark
    ? 'bg-zinc-900/70 backdrop-blur-xl border border-white/[0.08]'
    : 'bg-white/90 backdrop-blur-xl border border-zinc-200/80';
  const textPrimary = isDark ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDark ? 'text-zinc-400' : 'text-zinc-500';
  const textMuted = isDark ? 'text-zinc-600' : 'text-zinc-400';
  const divider = isDark ? 'border-white/[0.06]' : 'border-zinc-200/80';
  const btnSecondary = isDark
    ? 'bg-zinc-800/70 hover:bg-zinc-700/80 text-zinc-200 border border-white/[0.08]'
    : 'bg-gray-100 hover:bg-gray-200 text-zinc-700 border border-zinc-200';
  const cardHover = isDark ? 'hover:border-white/15' : 'hover:border-zinc-300';

  const StatusBadge = ({ status, progress }: { status: string; progress?: number }) => {
    if (status === 'completed') {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium backdrop-blur-sm">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Done
        </div>
      );
    }
    if (status === 'processing') {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium backdrop-blur-sm">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          {progress}%
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-500/20 text-zinc-400 text-xs font-medium backdrop-blur-sm">
        <Clock className="w-3.5 h-3.5" />
        Queued
      </div>
    );
  };

  if (isIPad) {
    return (
      <div className={`size-full overflow-auto ${bg}`}>
        <div className="p-8">
          <div className="mb-8">
            <h2 className={`text-3xl font-semibold mb-1 ${textPrimary}`}>Outputs & Jobs</h2>
            <p className={textSecondary}>Manage your generated clips and rendering queue</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`${surfaceClass} rounded-2xl overflow-hidden ${cardHover} transition-all duration-200 shadow-sm`}
              >
                <div className="relative aspect-video bg-zinc-800">
                  <img src={job.thumbnail} alt={job.title} className="size-full object-cover" />
                  {job.status === 'completed' && (
                    <button className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <Play className="w-7 h-7 text-white ml-0.5" />
                      </div>
                    </button>
                  )}
                  {job.status === 'processing' && job.progress && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-400 mx-auto mb-2" />
                        <p className="text-sm text-white font-medium">{job.progress}%</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={job.status} progress={job.progress} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`text-sm font-semibold mb-1.5 ${textPrimary}`}>{job.title}</h3>
                  <div className={`flex items-center justify-between text-xs ${textMuted} mb-4`}>
                    <span>{job.duration}</span>
                    <span>{job.createdAt}</span>
                  </div>
                  {job.status === 'completed' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onNavigate('studio')}
                        className={`flex-1 px-3 py-2.5 ${btnSecondary} rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors`}
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        Continue
                      </button>
                      <button
                        onClick={() => onNavigate('storyboard')}
                        className="flex-1 px-3 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl text-xs font-medium flex items-center justify-center gap-2 text-white transition-colors shadow-md shadow-blue-500/20"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        Add to Sequence
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // iPhone layout
  return (
    <div className={`size-full overflow-auto pb-4 ${bg}`}>
      <div className="px-5 pt-14 pb-5">
        <h1 className={`text-3xl font-semibold mb-1 ${textPrimary}`}>Outputs</h1>
        <p className={`text-sm ${textSecondary}`}>Your generated clips</p>
      </div>
      <div className="px-5 space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`${surfaceClass} rounded-2xl overflow-hidden shadow-sm`}
          >
            <div className="relative aspect-video bg-zinc-800">
              <img src={job.thumbnail} alt={job.title} className="size-full object-cover" />
              {job.status === 'completed' && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </div>
              )}
              {job.status === 'processing' && job.progress && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-9 h-9 animate-spin text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-white font-medium">{job.progress}%</p>
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <StatusBadge status={job.status} progress={job.progress} />
              </div>
              {job.status === 'completed' && (
                <button className={`absolute top-3 right-3 w-8 h-8 rounded-lg ${isDark ? 'bg-zinc-900/70' : 'bg-white/70'} backdrop-blur-sm flex items-center justify-center`}>
                  <Download className={`w-4 h-4 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} />
                </button>
              )}
            </div>
            <div className="p-4">
              <h3 className={`text-sm font-semibold mb-1 ${textPrimary}`}>{job.title}</h3>
              <div className={`flex items-center gap-2 text-xs ${textMuted} mb-4`}>
                <span>{job.duration}</span>
                <span>·</span>
                <span>{job.createdAt}</span>
              </div>
              {job.status === 'completed' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigate('studio')}
                    className={`flex-1 px-3 py-2.5 ${btnSecondary} rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Continue
                  </button>
                  <button
                    onClick={() => onNavigate('storyboard')}
                    className="flex-1 px-3 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl text-xs font-medium flex items-center justify-center gap-2 text-white transition-colors shadow-md shadow-blue-500/20"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    Sequence
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
