import { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { Request } from '../data/mockData';

interface RequestViewerProps {
  request: Request;
}

const RequestViewer = ({ request }: RequestViewerProps) => {
  const [activeTab, setActiveTab] = useState<'headers' | 'params' | 'body' | 'response'>('headers');

  const tabs = [
    { id: 'headers', label: 'Headers' },
    { id: 'params', label: 'Parameters' },
    { id: 'body', label: 'Request Body' },
    { id: 'response', label: 'Response' },
  ] as const;

  return (
    <div className="h-full flex flex-col">
      {/* Request info */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            request.method === 'GET' ? 'bg-blue-900 text-blue-300' :
            request.method === 'POST' ? 'bg-green-900 text-green-300' :
            request.method === 'PUT' ? 'bg-yellow-900 text-yellow-300' :
            request.method === 'DELETE' ? 'bg-red-900 text-red-300' :
            'bg-gray-700 text-gray-300'
          }`}>
            {request.method}
          </span>
          <ArrowRight size={14} className="text-gray-500" />
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            request.status >= 200 && request.status < 300 ? 'bg-green-900 text-green-300' :
            request.status >= 300 && request.status < 400 ? 'bg-blue-900 text-blue-300' :
            request.status >= 400 && request.status < 500 ? 'bg-yellow-900 text-yellow-300' :
            request.status >= 500 ? 'bg-red-900 text-red-300' :
            'bg-gray-700 text-gray-300'
          }`}>
            {request.status}
          </span>
        </div>
        <div className="text-gray-300 break-all font-mono text-sm">{request.url}</div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <div className="flex items-center">
            <Layers size={14} className="mr-1" />
            <span>{request.contentType}</span>
          </div>
          <div>
            <span className="mr-3">{request.time}ms</span>
            <span>{request.size}B</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-3 text-sm border-b-2 ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'headers' && (
          <div className="font-mono text-sm">
            {Object.entries(request.headers).map(([key, value]) => (
              <div key={key} className="mb-1">
                <span className="text-gray-400">{key}:</span>{' '}
                <span className="text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'params' && (
          <div className="font-mono text-sm">
            {Object.keys(request.params).length === 0 ? (
              <div className="text-gray-500">No URL parameters</div>
            ) : (
              Object.entries(request.params).map(([key, value]) => (
                <div key={key} className="mb-1">
                  <span className="text-gray-400">{key}:</span>{' '}
                  <span className="text-gray-300">{value}</span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'body' && (
          <div className="font-mono text-sm">
            {request.body ? (
              <pre className="whitespace-pre-wrap text-gray-300">{request.body}</pre>
            ) : (
              <div className="text-gray-500">No request body</div>
            )}
          </div>
        )}

        {activeTab === 'response' && (
          <div className="font-mono text-sm">
            {request.response ? (
              <pre className="whitespace-pre-wrap text-gray-300">{request.response}</pre>
            ) : (
              <div className="text-gray-500">No response body</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestViewer;