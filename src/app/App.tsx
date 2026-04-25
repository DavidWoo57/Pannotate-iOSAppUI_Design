import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { StudioEditor } from './components/StudioEditor';
import { OutputsScreen } from './components/OutputsScreen';
import { StoryboardScreen } from './components/StoryboardScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { TabBar } from './components/TabBar';
import { ThemeProvider, useTheme } from './context/ThemeContext';

export type Screen = 'home' | 'studio' | 'outputs' | 'storyboard' | 'profile' | 'settings';

function AppContent() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [isIPad, setIsIPad] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const checkDevice = () => {
      setIsIPad(window.innerWidth >= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen isIPad={isIPad} onNavigate={setActiveScreen} />;
      case 'studio':
        return <StudioEditor isIPad={isIPad} onNavigate={setActiveScreen} />;
      case 'outputs':
        return <OutputsScreen isIPad={isIPad} onNavigate={setActiveScreen} />;
      case 'storyboard':
        return <StoryboardScreen isIPad={isIPad} onNavigate={setActiveScreen} />;
      case 'profile':
        return <ProfileScreen isIPad={isIPad} onNavigate={setActiveScreen} />;
      case 'settings':
        return <SettingsScreen isIPad={isIPad} onNavigate={setActiveScreen} />;
      default:
        return <HomeScreen isIPad={isIPad} onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div
      className={`size-full overflow-hidden flex flex-col transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-slate-100 text-zinc-900'
      }`}
    >
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      {!isIPad && (
        <TabBar
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}