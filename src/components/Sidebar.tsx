import { Activity, Shield, Repeat, Search, List, PenTool as Tool } from 'lucide-react';
import { TabType } from '../App';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

interface NavItemProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ title, icon, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 w-full p-3 rounded-md transition-colors ${
      isActive
        ? 'bg-emerald-500 text-white'
        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
    }`}
  >
    {icon}
    <span className="font-medium">{title}</span>
  </button>
);

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const tabs: { id: TabType; title: string; icon: React.ReactNode }[] = [
    { id: 'proxy', title: 'Proxy', icon: <Activity size={20} /> },
    { id: 'scanner', title: 'Scanner', icon: <Shield size={20} /> },
    { id: 'repeater', title: 'Repeater', icon: <Repeat size={20} /> },
    { id: 'fuzzer', title: 'Fuzzer', icon: <Search size={20} /> },
    { id: 'logger', title: 'Logger', icon: <List size={20} /> },
    { id: 'tools', title: 'Tools', icon: <Tool size={20} /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 p-4 flex flex-col">
      <div className="space-y-1">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            title={tab.title}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
      
      <div className="mt-auto">
        <div className="bg-gray-800 rounded-md p-3 text-xs text-gray-400">
          <div className="font-semibold text-gray-300 mb-1">Project Status</div>
          <div className="flex justify-between">
            <span>Requests:</span>
            <span className="text-gray-200">24</span>
          </div>
          <div className="flex justify-between">
            <span>Vulnerabilities:</span>
            <span className="text-red-400">3</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-emerald-400">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;