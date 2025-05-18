import { useState } from 'react';
import { Terminal, Power, ExternalLink, Download, Settings } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  command: string;
  integrated: boolean;
  status: 'available' | 'unavailable' | 'running';
  type: 'scanner' | 'fuzzer' | 'discovery' | 'utility';
}

const mockTools: Tool[] = [
  {
    id: 'sqlmap',
    name: 'SQLMap',
    description: 'Automatic SQL injection and database takeover tool',
    command: 'sqlmap',
    integrated: true,
    status: 'available',
    type: 'scanner'
  },
  {
    id: 'nmap',
    name: 'Nmap',
    description: 'Network discovery and security auditing',
    command: 'nmap',
    integrated: true,
    status: 'available',
    type: 'discovery'
  },
  {
    id: 'ffuf',
    name: 'Ffuf',
    description: 'Fast web fuzzer',
    command: 'ffuf',
    integrated: true,
    status: 'available',
    type: 'fuzzer'
  },
  {
    id: 'nikto',
    name: 'Nikto',
    description: 'Web server scanner',
    command: 'nikto',
    integrated: false,
    status: 'unavailable',
    type: 'scanner'
  },
  {
    id: 'wappalyzer',
    name: 'Wappalyzer',
    description: 'Technology profiler',
    command: 'wappalyzer',
    integrated: true,
    status: 'available',
    type: 'utility'
  },
  {
    id: 'dirsearch',
    name: 'Dirsearch',
    description: 'Web path scanner',
    command: 'dirsearch',
    integrated: true,
    status: 'available',
    type: 'discovery'
  },
  {
    id: 'httpx',
    name: 'HTTPx',
    description: 'HTTP toolkit',
    command: 'httpx',
    integrated: false,
    status: 'unavailable',
    type: 'utility'
  }
];

const ToolsTab = () => {
  const [tools, setTools] = useState<Tool[]>(mockTools);
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTools = tools.filter(tool => 
    (activeType === 'all' || tool.type === activeType) &&
    (searchQuery === '' || 
     tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const toggleToolStatus = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id
        ? { ...tool, status: tool.status === 'running' ? 'available' : 'running' }
        : tool
    ));
  };

  const toolTypes = [
    { id: 'all', name: 'All Tools' },
    { id: 'scanner', name: 'Scanners' },
    { id: 'fuzzer', name: 'Fuzzers' },
    { id: 'discovery', name: 'Discovery' },
    { id: 'utility', name: 'Utilities' }
  ];
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">External Tools Integration</h2>
          <button className="flex items-center bg-gray-700 text-gray-300 px-3 py-1.5 rounded hover:bg-gray-600">
            <Settings className="mr-2" size={16} />
            Configure Tools
          </button>
        </div>
        
        <div className="flex space-x-2 mb-4">
          {toolTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-3 py-1.5 rounded text-sm ${
                activeType === type.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2"
        />
      </div>
      
      {/* Tools Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{tool.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    tool.type === 'scanner' ? 'bg-blue-900 text-blue-300' :
                    tool.type === 'fuzzer' ? 'bg-purple-900 text-purple-300' :
                    tool.type === 'discovery' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {tool.type}
                  </span>
                </div>
                
                <div className="flex items-center mt-3 text-sm text-gray-400">
                  <Terminal size={16} className="mr-1" />
                  <code className="font-mono">{tool.command}</code>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-900 flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    tool.status === 'available' ? 'bg-emerald-500' :
                    tool.status === 'running' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}></span>
                  <span className="text-sm">
                    {tool.status === 'available' ? 'Available' :
                     tool.status === 'running' ? 'Running' :
                     'Not installed'}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  {tool.status !== 'unavailable' && (
                    <button
                      onClick={() => toggleToolStatus(tool.id)}
                      className={`p-1.5 rounded ${
                        tool.status === 'running'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <Power size={14} />
                    </button>
                  )}
                  
                  <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
                    <ExternalLink size={14} />
                  </button>
                  
                  {tool.status === 'unavailable' && (
                    <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
                      <Download size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p>No tools match your search criteria</p>
            <p className="text-sm mt-1">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsTab;