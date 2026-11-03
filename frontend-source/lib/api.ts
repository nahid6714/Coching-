import { API_BASE_URL } from './config';

export class ApiError extends Error {
  constructor(message: string, public status: number, public errors?: Record<string, string[]>) {
    super(message); this.name = 'ApiError';
  }
}

export async function api<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
      ...options, headers, cache: 'no-store',
    });
  } catch {
    throw new ApiError('API সার্ভারের সাথে সংযোগ করা যাচ্ছে না। API URL ও সার্ভার পরীক্ষা করুন।', 0);
  }
  const payload: any = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.message || (response.status === 401 ? 'সেশন শেষ হয়েছে। আবার লগইন করুন।' : `অনুরোধ সম্পন্ন হয়নি (${response.status})`);
    throw new ApiError(message, response.status, payload?.errors);
  }
  return payload as T;
}
export const apiGet = <T>(path: string, token?: string) => api<T>(path, { method: 'GET' }, token);
export const apiPost = <T>(path: string, body: unknown, token?: string) => api<T>(path, { method: 'POST', body: JSON.stringify(body) }, token);
export const apiPut = <T>(path: string, body: unknown, token?: string) => api<T>(path, { method: 'PUT', body: JSON.stringify(body) }, token);
export const apiPatch = <T>(path: string, body: unknown, token?: string) => api<T>(path, { method: 'PATCH', body: JSON.stringify(body) }, token);
export const apiDelete = <T>(path: string, token?: string) => api<T>(path, { method: 'DELETE' }, token);
export async function apiUpload<T>(path: string, file: File, token: string): Promise<T> {
  const body = new FormData(); body.append('file', file);
  return api<T>(path, { method: 'POST', body }, token);
}
export function dataOf<T>(result: any): T {
  if (result && typeof result === 'object' && 'data' in result) return result.data as T;
  return result as T;
}
export function listOf<T>(result: any): T[] {
  const value = dataOf<any>(result);
  return Array.isArray(value) ? value : [];
}
