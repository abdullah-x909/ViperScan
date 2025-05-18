import { useState } from 'react';
import { X, Filter, Download, Trash } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  source: string;
  message: string;
}

const mockLogs: LogEntry[] = [
  {
    id: 1,
    timestamp: '2025-04-20T12:00:00Z',
    level: 'info',
    source: 'Proxy',
    message: 'Proxy service started on port 8080'
  },
  {
    id: 2,
    timestamp: '2025-04-20T12:01:15Z',
    level: 'info',
    source: 'Scanner',
    message: 'New scan initiated for target: https://example.com'
  },
  {
    id: 3,
    timestamp: '2025-04-20T12:02:30Z',
    level: 'warning',
    source: 'Scanner', 
    message: 'Found potential XSS vulnerability at /search?q=<script>alert(1)</script>'
  },
  {
    id: 4,
    timestamp: '2025-04-20T12:03:45Z',
    level: 'error',
    source: 'Fuzzer',
    message: 'Connection refused when attempting to fuzz endpoint /api/users'
  },
  {
    id: 5,
    timestamp: '2025-04-20T12:04:00Z',
    level: 'debug',
    source: 'Core',
    message: 'Plugin "sql-injection-scanner" loaded successfully'
  },
];

const LoggerTab = () => {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [filters, setFilters] = useState({
    info: true,
    warning: true,
    error: true,
    debug: true
  });
  const [sourceFilter, setSourceFilter] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const filteredLogs = logs.filter(log => 
    filters[log.level] && 
    (sourceFilter === '' || log.source.toLowerCase().includes(sourceFilter.toLowerCase()) || 
     log.message.toLowerCase().includes(sourceFilter.toLowerCase()))
  );
  
  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all logs?')) {
      setLogs([]);
    }
  };
  
  const toggleFilter = (level: 'info' | 'warning' | 'error' | 'debug') => {
    setFilters({...filters, [level]: !filters[level]});
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} />
          </button>
          <button 
            className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            onClick={clearLogs}
          >
            <Trash size={16} />
          </button>
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Download size={16} />
          </button>
        </div>
        
        <div className="text-sm text-gray-400">
          {filteredLogs.length} log entries
        </div>
      </div>
      
      {/* Filter panel */}
      {filterOpen && (
        <div className="bg-gray-800 border-b border-gray-700 p-3">
          <div className="flex space-x-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Log Levels</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleFilter('info')}
                  className={`px-2 py-1 rounded text-xs ${
                    filters.info ? 'bg-blue-900 text-blue-300' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  Info
                </button>
                <button
                  onClick={() => toggleFilter('warning')}
                  className={`px-2 py-1 rounded text-xs ${
                    filters.warning ? 'bg-yellow-900 text-yellow-300' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  Warning
                </button>
                <button
                  onClick={() => toggleFilter('error')}
                  className={`px-2 py-1 rounded text-xs ${
                    filters.error ? 'bg-red-900 text-red-300' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  Error
                </button>
                <button
                  onClick={() => toggleFilter('debug')}
                  className={`px-2 py-1 rounded text-xs ${
                    filters.debug ? 'bg-purple-900 text-purple-300' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  Debug
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">Search</label>
              <input 
                type="text" 
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                placeholder="Filter by source or message..." 
                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-1 text-sm"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Log entries */}
      <div className="flex-1 overflow-auto">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-5xl mb-4">📝</div>
            <p>No log entries found</p>
            {Object.values(filters).some(f => !f) && (
              <p className="text-sm mt-1">Try adjusting your filters</p>
            )}
          </div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-800 text-gray-300 sticky top-0">
              <tr>
                <th className="px-4 py-2 font-medium text-left">Time</th>
                <th className="px-4 py-2 font-medium text-left">Level</th>
                <th className="px-4 py-2 font-medium text-left">Source</th>
                <th className="px-4 py-2 font-medium text-left">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-800">
                  <td className="px-4 py-2 text-gray-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      log.level === 'info' ? 'bg-blue-900 text-blue-300' :
                      log.level === 'warning' ? 'bg-yellow-900 text-yellow-300' :
                      log.level === 'error' ? 'bg-red-900 text-red-300' :
                      log.level === 'debug' ? 'bg-purple-900 text-purple-300' : ''
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-300">{log.source}</td>
                  <td className="px-4 py-2 text-gray-300">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LoggerTab;