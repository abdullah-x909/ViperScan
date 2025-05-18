import { useState } from 'react';
import { Send, Plus, Trash, Copy, Clock } from 'lucide-react';

interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
}

const RepeaterTab = () => {
  const [activeRequest, setActiveRequest] = useState<SavedRequest>({
    id: '1',
    name: 'New Request',
    method: 'GET',
    url: 'https://example.com/api',
    headers: { 'Content-Type': 'application/json' },
    body: ''
  });
  
  const [savedRequests, setSavedRequests] = useState<SavedRequest[]>([]);
  const [responseData, setResponseData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const sendRequest = () => {
    setLoading(true);
    
    // Simulate request
    setTimeout(() => {
      setResponseData(JSON.stringify({
        status: 200,
        headers: {
          'content-type': 'application/json',
          'server': 'nginx/1.18.0'
        },
        body: {
          message: 'This is a simulated response',
          timestamp: new Date().toISOString()
        }
      }, null, 2));
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            className="flex items-center space-x-1 px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            onClick={() => {
              const newRequest = {
                id: Date.now().toString(),
                name: 'New Request',
                method: 'GET',
                url: 'https://example.com/api',
                headers: { 'Content-Type': 'application/json' },
                body: ''
              };
              setSavedRequests([...savedRequests, newRequest]);
              setActiveRequest(newRequest);
            }}
          >
            <Plus size={16} />
            <span>New</span>
          </button>
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Trash size={16} />
          </button>
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Copy size={16} />
          </button>
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Clock size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Saved requests sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search requests..."
              className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            {savedRequests.length === 0 ? (
              <div className="p-4 text-sm text-gray-400 text-center">
                No saved requests yet
              </div>
            ) : (
              savedRequests.map(request => (
                <button
                  key={request.id}
                  className={`w-full text-left p-3 border-b border-gray-700 text-sm ${
                    activeRequest.id === request.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveRequest(request)}
                >
                  <div className="font-medium truncate">{request.name}</div>
                  <div className="flex mt-1">
                    <span className={`text-xs px-1.5 rounded ${
                      request.method === 'GET' ? 'bg-blue-900 text-blue-300' :
                      request.method === 'POST' ? 'bg-green-900 text-green-300' :
                      request.method === 'PUT' ? 'bg-yellow-900 text-yellow-300' :
                      request.method === 'DELETE' ? 'bg-red-900 text-red-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {request.method}
                    </span>
                    <span className="text-xs text-gray-400 ml-2 truncate">{request.url}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
        
        {/* Request/response area */}
        <div className="flex-1 flex flex-col">
          {/* Request editor */}
          <div className="flex-1 border-b border-gray-700 overflow-auto">
            <div className="p-4">
              <div className="flex mb-4">
                <select
                  value={activeRequest.method}
                  onChange={(e) => setActiveRequest({...activeRequest, method: e.target.value})}
                  className="bg-gray-700 text-gray-200 border border-gray-600 rounded-l px-3 py-2"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                  <option>PATCH</option>
                  <option>OPTIONS</option>
                </select>
                <input
                  type="text"
                  value={activeRequest.url}
                  onChange={(e) => setActiveRequest({...activeRequest, url: e.target.value})}
                  placeholder="https://example.com/api"
                  className="flex-1 bg-gray-700 text-gray-200 border-t border-b border-gray-600 px-3 py-2"
                />
                <button
                  onClick={sendRequest}
                  disabled={loading}
                  className={`flex items-center bg-emerald-600 text-white px-4 py-2 rounded-r
                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-500'}`}
                >
                  <Send className="mr-2" size={16} />
                  Send
                </button>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Headers</div>
                <textarea
                  className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded p-3 font-mono text-sm"
                  rows={4}
                  value={Object.entries(activeRequest.headers).map(([key, value]) => `${key}: ${value}`).join('\n')}
                  onChange={(e) => {
                    const headers: Record<string, string> = {};
                    e.target.value.split('\n').forEach(line => {
                      const [key, ...valueParts] = line.split(':');
                      if (key && valueParts.length) {
                        headers[key.trim()] = valueParts.join(':').trim();
                      }
                    });
                    setActiveRequest({...activeRequest, headers});
                  }}
                ></textarea>
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-2">Body</div>
                <textarea
                  className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded p-3 font-mono text-sm"
                  rows={6}
                  value={activeRequest.body}
                  onChange={(e) => setActiveRequest({...activeRequest, body: e.target.value})}
                  placeholder={activeRequest.method === 'GET' ? 'GET requests typically don\'t have a body' : '{\n  "key": "value"\n}'}
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Response viewer */}
          <div className="flex-1 overflow-auto">
            <div className="p-4">
              <div className="text-sm text-gray-400 mb-2">Response</div>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              ) : responseData ? (
                <pre className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded p-3 font-mono text-sm overflow-auto">
                  {responseData}
                </pre>
              ) : (
                <div className="w-full bg-gray-700 text-gray-500 border border-gray-600 rounded p-3 text-center h-40 flex items-center justify-center">
                  <p>Send a request to see the response</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeaterTab;