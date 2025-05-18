import { useState } from 'react';
import { Moon, Sun, Power, Database, Settings, Shield, Zap } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  interceptActive: boolean;
  setInterceptActive: (active: boolean) => void;
}

const Header = ({ darkMode, setDarkMode, interceptActive, setInterceptActive }: HeaderProps) => {
  const [isConnected, setIsConnected] = useState(false);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <header className={`px-4 py-2 flex items-center justify-between border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-emerald-500" />
        <h1 className="font-bold text-xl">ViperScan</h1>
        <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
          v0.1.0
        </span>
      </div>
      
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setInterceptActive(!interceptActive)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
              interceptActive 
                ? 'bg-emerald-500 text-white' 
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Zap size={16} />
            <span>Intercept {interceptActive ? 'On' : 'Off'}</span>
          </button>

          <button
            onClick={toggleConnection}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
              isConnected 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Power size={16} />
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </button>

          <button
            className={`p-2 rounded-md transition-colors ${
              darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Database size={18} />
          </button>

          <button
            className={`p-2 rounded-md transition-colors ${
              darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Settings size={18} />
          </button>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md transition-colors ${
            darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;