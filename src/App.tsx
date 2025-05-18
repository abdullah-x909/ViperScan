import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProxyTab from './tabs/ProxyTab';
import ScannerTab from './tabs/ScannerTab';
import RepeaterTab from './tabs/RepeaterTab';
import FuzzerTab from './tabs/FuzzerTab';
import LoggerTab from './tabs/LoggerTab';
import ToolsTab from './tabs/ToolsTab';
import { AppContext } from './contexts/AppContext';

// Tab type definition
export type TabType = 'proxy' | 'scanner' | 'repeater' | 'fuzzer' | 'logger' | 'tools';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('proxy');
  const [darkMode, setDarkMode] = useState(true);
  const [interceptActive, setInterceptActive] = useState(false);

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'proxy':
        return <ProxyTab interceptActive={interceptActive} />;
      case 'scanner':
        return <ScannerTab />;
      case 'repeater':
        return <RepeaterTab />;
      case 'fuzzer':
        return <FuzzerTab />;
      case 'logger':
        return <LoggerTab />;
      case 'tools':
        return <ToolsTab />;
      default:
        return <ProxyTab interceptActive={interceptActive} />;
    }
  };

  return (
    <AppContext.Provider value={{ 
      darkMode, 
      setDarkMode, 
      interceptActive, 
      setInterceptActive 
    }}>
      <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          interceptActive={interceptActive}
          setInterceptActive={setInterceptActive}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 overflow-auto">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;