import { useState } from 'react';
import { Play, AlertTriangle, CheckCircle, Info, RefreshCw, Settings } from 'lucide-react';

const ScannerTab = () => {
  const [targetURL, setTargURL] = useState('');
  const [scanActive, setScanActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  const startScan = () => {
    if (!targetURL) return;
    
    setScanActive(true);
    setScanProgress(0);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanActive(false);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Target URL</label>
            <div className="flex">
              <input 
                type="text" 
                value={targetURL}
                onChange={(e) => setTargURL(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-l px-3 py-2"
              />
              <button 
                onClick={startScan}
                disabled={scanActive || !targetURL}
                className={`flex items-center bg-emerald-600 text-white px-4 py-2 rounded-r
                  ${(scanActive || !targetURL) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-500'}`}
              >
                <Play className="mr-2" size={16} />
                Scan
              </button>
            </div>
          </div>
          <div className="w-48">
            <label className="block text-sm text-gray-400 mb-1">Scan Profile</label>
            <select className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2">
              <option>Quick Scan</option>
              <option>Full Scan</option>
              <option>OWASP Top 10</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="p-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        {scanActive && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Scanning in progress...</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${scanProgress}%` }}></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Scan Summary</h3>
              <RefreshCw size={16} className="text-gray-500" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={scanActive ? "text-blue-400" : "text-emerald-400"}>
                  {scanActive ? "In Progress" : "Ready"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Scan:</span>
                <span>Never</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Target:</span>
                <span className="truncate max-w-[120px]">{targetURL || "-"}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <AlertTriangle className="mr-2 text-red-500" size={20} />
              <h3 className="text-lg font-semibold">High Risk</h3>
            </div>
            <div className="text-3xl font-bold mt-2">0</div>
            <div className="text-xs text-gray-400 mt-1">No high risk vulnerabilities detected</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <AlertTriangle className="mr-2 text-yellow-500" size={20} />
              <h3 className="text-lg font-semibold">Medium Risk</h3>
            </div>
            <div className="text-3xl font-bold mt-2">0</div>
            <div className="text-xs text-gray-400 mt-1">No medium risk vulnerabilities detected</div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center mb-2">
              <Info className="mr-2 text-blue-500" size={20} />
              <h3 className="text-lg font-semibold">Low Risk</h3>
            </div>
            <div className="text-3xl font-bold mt-2">0</div>
            <div className="text-xs text-gray-400 mt-1">No low risk vulnerabilities detected</div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="px-4 py-3 border-b border-gray-700">
            <h3 className="font-semibold">Detected Vulnerabilities</h3>
          </div>
          <div className="p-6 flex flex-col items-center justify-center text-gray-400">
            <CheckCircle size={48} className="mb-3 text-gray-600" />
            <p className="text-center">No vulnerabilities detected yet</p>
            <p className="text-center text-sm mt-1">Enter a target URL and start a scan to find vulnerabilities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerTab;