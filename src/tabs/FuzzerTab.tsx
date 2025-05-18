import { useState } from 'react';
import { Play, Save, X, Plus, Copy } from 'lucide-react';

const FuzzerTab = () => {
  const [targetURL, setTargetURL] = useState('https://example.com/api/users/§id§');
  const [httpMethod, setHttpMethod] = useState('GET');
  const [payloads, setPayloads] = useState(['1', '2', '3', '4', '5']);
  const [newPayload, setNewPayload] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [fuzzing, setFuzzing] = useState(false);
  
  const addPayload = () => {
    if (newPayload.trim()) {
      setPayloads([...payloads, newPayload.trim()]);
      setNewPayload('');
    }
  };
  
  const removePayload = (index: number) => {
    setPayloads(payloads.filter((_, i) => i !== index));
  };
  
  const startFuzzing = () => {
    setFuzzing(true);
    setResults([]);
    
    // Simulate fuzzing results
    const simulateResults = async () => {
      for (let i = 0; i < payloads.length; i++) {
        const payload = payloads[i];
        const url = targetURL.replace('§id§', payload);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const statusCode = Math.random() > 0.7 ? 404 : 200;
        const responseTime = Math.floor(Math.random() * 500) + 50;
        const responseSize = Math.floor(Math.random() * 2000) + 500;
        
        setResults(prev => [...prev, {
          id: i + 1,
          payload,
          url,
          statusCode,
          responseTime,
          responseSize,
          timestamp: new Date().toISOString()
        }]);
      }
      
      setFuzzing(false);
    };
    
    simulateResults();
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Target URL (use §parameter§ syntax for insertion points)</label>
            <input 
              type="text" 
              value={targetURL}
              onChange={(e) => setTargetURL(e.target.value)}
              className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">HTTP Method</label>
            <select 
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value)}
              className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-400">Payloads</label>
            <div className="text-xs text-gray-500">{payloads.length} items</div>
          </div>
          
          <div className="bg-gray-700 border border-gray-600 rounded p-2 max-h-32 overflow-y-auto mb-2">
            {payloads.length === 0 ? (
              <div className="text-gray-500 text-center py-2">No payloads added</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {payloads.map((payload, index) => (
                  <div key={index} className="flex items-center bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    <span className="text-sm mr-2">{payload}</span>
                    <button 
                      onClick={() => removePayload(index)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex">
            <input 
              type="text" 
              value={newPayload}
              onChange={(e) => setNewPayload(e.target.value)}
              placeholder="Add new payload..."
              className="flex-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-l px-3 py-2"
              onKeyDown={(e) => e.key === 'Enter' && addPayload()}
            />
            <button 
              onClick={addPayload}
              className="bg-gray-600 text-gray-200 px-3 py-2 rounded-r hover:bg-gray-500"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={startFuzzing}
              disabled={fuzzing || payloads.length === 0}
              className={`flex items-center bg-emerald-600 text-white px-4 py-2 rounded
                ${(fuzzing || payloads.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-500'}`}
            >
              <Play className="mr-2" size={16} />
              Start Fuzzing
            </button>
            <button className="flex items-center bg-gray-700 text-gray-300 px-4 py-2 rounded hover:bg-gray-600">
              <Save className="mr-2" size={16} />
              Save
            </button>
          </div>
          
          <div className="text-sm text-gray-400">
            {fuzzing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-emerald-500 mr-2"></div>
                <span>Fuzzing in progress...</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Results */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-800 text-gray-300 sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Payload</th>
              <th className="px-4 py-3 font-medium">URL</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Length</th>
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {results.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No results yet. Configure and start fuzzing to see results.
                </td>
              </tr>
            ) : (
              results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-800">
                  <td className="px-4 py-3">{result.id}</td>
                  <td className="px-4 py-3 font-mono">{result.payload}</td>
                  <td className="px-4 py-3 truncate max-w-xs">{result.url}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded ${
                      result.statusCode >= 200 && result.statusCode < 300 ? 'bg-green-900 text-green-300' :
                      result.statusCode >= 400 && result.statusCode < 500 ? 'bg-yellow-900 text-yellow-300' :
                      result.statusCode >= 500 ? 'bg-red-900 text-red-300' : 'bg-gray-700 text-gray-300'
                    }`}>
                      {result.statusCode}
                    </span>
                  </td>
                  <td className="px-4 py-3">{result.responseSize} B</td>
                  <td className="px-4 py-3">{result.responseTime} ms</td>
                  <td className="px-4 py-3">
                    <button className="p-1 text-gray-400 hover:text-gray-200">
                      <Copy size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuzzerTab;