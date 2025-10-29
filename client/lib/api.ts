// client/lib/api.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5050';

/** Get token from localStorage (client only) */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('token');
}

/** Fetch with Authorization header when token exists */
export async function authFetch(input: string, init: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}