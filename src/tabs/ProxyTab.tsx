import { useState } from 'react';
import { Play, Pause, Save, Filter, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import RequestList from '../components/RequestList';
import RequestViewer from '../components/RequestViewer';
import { Request, mockRequests } from '../data/mockData';

interface ProxyTabProps {
  interceptActive: boolean;
}

const ProxyTab = ({ interceptActive }: ProxyTabProps) => {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            {interceptActive ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            <RefreshCw size={16} />
          </button>
          <button 
            className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} />
          </button>
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Clock size={16} />
          </button>
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Save size={16} />
          </button>
          <button className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
            <ExternalLink size={16} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-400">
            <span className="text-emerald-400 font-medium">127.0.0.1:8080</span> → Listening
          </div>
        </div>
      </div>
      
      {/* Filter panel */}
      {filterOpen && (
        <div className="bg-gray-800 border-b border-gray-700 p-3 grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Method</label>
            <select className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-2 py-1 text-sm">
              <option value="">All</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Status Code</label>
            <select className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-2 py-1 text-sm">
              <option value="">All</option>
              <option value="200">200 OK</option>
              <option value="300">300-399 Redirection</option>
              <option value="400">400-499 Client Error</option>
              <option value="500">500-599 Server Error</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">URL Contains</label>
            <input 
              type="text" 
              className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-2 py-1 text-sm"
              placeholder="Filter by URL..."
            />
          </div>
        </div>
      )}
      
      <div className="flex-1 flex overflow-hidden">
        {/* Request list panel */}
        <div className="w-1/3 border-r border-gray-700 overflow-y-auto">
          <RequestList 
            requests={requests} 
            selectedRequest={selectedRequest} 
            onSelectRequest={setSelectedRequest} 
          />
        </div>
        
        {/* Request details panel */}
        <div className="w-2/3 overflow-y-auto">
          {selectedRequest ? (
            <RequestViewer request={selectedRequest} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Select a request to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProxyTab;