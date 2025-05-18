import { ChevronRight } from 'lucide-react';
import { Request } from '../data/mockData';

interface RequestListProps {
  requests: Request[];
  selectedRequest: Request | null;
  onSelectRequest: (request: Request) => void;
}

const RequestList = ({ requests, selectedRequest, onSelectRequest }: RequestListProps) => {
  return (
    <div className="divide-y divide-gray-700">
      {requests.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <p>No requests captured</p>
          <p className="text-sm mt-1">Start browsing to capture HTTP traffic</p>
        </div>
      ) : (
        requests.map((request) => (
          <button
            key={request.id}
            className={`w-full text-left py-3 px-4 hover:bg-gray-800 ${
              selectedRequest?.id === request.id ? 'bg-gray-800' : ''
            }`}
            onClick={() => onSelectRequest(request)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className={`text-xs mr-2 px-1.5 py-0.5 rounded ${
                  request.method === 'GET' ? 'bg-blue-900 text-blue-300' :
                  request.method === 'POST' ? 'bg-green-900 text-green-300' :
                  request.method === 'PUT' ? 'bg-yellow-900 text-yellow-300' :
                  request.method === 'DELETE' ? 'bg-red-900 text-red-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {request.method}
                </span>
                <span className={`text-xs mr-2 px-1.5 py-0.5 rounded ${
                  request.status >= 200 && request.status < 300 ? 'bg-green-900 text-green-300' :
                  request.status >= 300 && request.status < 400 ? 'bg-blue-900 text-blue-300' :
                  request.status >= 400 && request.status < 500 ? 'bg-yellow-900 text-yellow-300' :
                  request.status >= 500 ? 'bg-red-900 text-red-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {request.status}
                </span>
              </div>
              <ChevronRight size={16} className="text-gray-500" />
            </div>
            <div className="truncate text-sm text-gray-300 mt-1">{request.url}</div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{request.time}ms</span>
              <span>{request.size}B</span>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default RequestList;