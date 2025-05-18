export interface Request {
  id: string;
  method: string;
  url: string;
  status: number;
  time: number;
  size: number;
  contentType: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body: string | null;
  response: string | null;
  timestamp: string;
}

export const mockRequests: Request[] = [
  {
    id: '1',
    method: 'GET',
    url: 'https://example.com/api/users',
    status: 200,
    time: 150,
    size: 1240,
    contentType: 'application/json',
    headers: {
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Connection': 'keep-alive'
    },
    params: {},
    body: null,
    response: JSON.stringify({
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]
    }, null, 2),
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    method: 'POST',
    url: 'https://example.com/api/users/create',
    status: 201,
    time: 230,
    size: 520,
    contentType: 'application/json',
    headers: {
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
      'Content-Length': '45',
      'Connection': 'keep-alive'
    },
    params: {},
    body: JSON.stringify({
      name: 'New User',
      email: 'user@example.com'
    }, null, 2),
    response: JSON.stringify({
      id: 3,
      name: 'New User',
      email: 'user@example.com',
      created_at: '2025-04-20T12:00:00Z'
    }, null, 2),
    timestamp: new Date().toISOString()
  },
  {
    id: '3',
    method: 'GET',
    url: 'https://example.com/api/users/1',
    status: 200,
    time: 125,
    size: 380,
    contentType: 'application/json',
    headers: {
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Connection': 'keep-alive'
    },
    params: {},
    body: null,
    response: JSON.stringify({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    }, null, 2),
    timestamp: new Date().toISOString()
  },
  {
    id: '4',
    method: 'PUT',
    url: 'https://example.com/api/users/2',
    status: 200,
    time: 180,
    size: 410,
    contentType: 'application/json',
    headers: {
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
      'Content-Length': '42',
      'Connection': 'keep-alive'
    },
    params: {},
    body: JSON.stringify({
      name: 'Jane Smith Updated',
      role: 'editor'
    }, null, 2),
    response: JSON.stringify({
      id: 2,
      name: 'Jane Smith Updated',
      email: 'jane@example.com',
      role: 'editor',
      updated_at: '2025-04-20T14:30:00Z'
    }, null, 2),
    timestamp: new Date().toISOString()
  },
  {
    id: '5',
    method: 'DELETE',
    url: 'https://example.com/api/users/3',
    status: 204,
    time: 95,
    size: 0,
    contentType: 'application/json',
    headers: {
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Connection': 'keep-alive'
    },
    params: {},
    body: null,
    response: null,
    timestamp: new Date().toISOString()
  },
  {
    id: '6',
    method: 'GET',
    url: 'https://example.com/api/products?category=electronics&sort=price',
    status: 200,
    time: 210,
    size: 1850,
    contentType: 'application/json',
    headers: {
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Connection': 'keep-alive'
    },
    params: {
      'category': 'electronics',
      'sort': 'price'
    },
    body: null,
    response: JSON.stringify({
      products: [
        { id: 101, name: 'Smartphone', price: 599.99 },
        { id: 102, name: 'Laptop', price: 1299.99 },
        { id: 103, name: 'Headphones', price: 149.99 }
      ],
      total: 3,
      page: 1
    }, null, 2),
    timestamp: new Date().toISOString()
  },
  {
    id: '7',
    method: 'GET',
    url: 'https://example.com/api/nonexistent',
    status: 404,
    time: 75,
    size: 220,
    contentType: 'application/json',
    headers: {
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Connection': 'keep-alive'
    },
    params: {},
    body: null,
    response: JSON.stringify({
      error: 'Resource not found',
      code: 404
    }, null, 2),
    timestamp: new Date().toISOString()
  },
  {
    id: '8',
    method: 'POST',
    url: 'https://example.com/api/auth/login',
    status: 401,
    time: 110,
    size: 240,
    contentType: 'application/json',
    headers: {
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json',
      'Content-Length': '58',
      'Connection': 'keep-alive'
    },
    params: {},
    body: JSON.stringify({
      username: 'user',
      password: 'incorrect_password'
    }, null, 2),
    response: JSON.stringify({
      error: 'Invalid credentials',
      code: 'AUTH_FAILED'
    }, null, 2),
    timestamp: new Date().toISOString()
  }
];