import type { RegisteredUser } from './types';

const USER_TOKEN_KEY = 'infinity_user_token';
const USER_KEY = 'infinity_user_profile';
const ADMIN_TOKEN_KEY = 'infinity_admin_token';
const ADMIN_KEY = 'infinity_admin_profile';

export const getUserToken = () => typeof window === 'undefined' ? null : localStorage.getItem(USER_TOKEN_KEY);
export const getAdminToken = () => typeof window === 'undefined' ? null : localStorage.getItem(ADMIN_TOKEN_KEY);
export const getUserProfile = (): RegisteredUser | null => {
  if (typeof window === 'undefined') return null;
  try { const value = localStorage.getItem(USER_KEY); return value ? JSON.parse(value) : null; } catch { return null; }
};
export const getAdminProfile = () => {
  if (typeof window === 'undefined') return null;
  try { const value = localStorage.getItem(ADMIN_KEY); return value ? JSON.parse(value) : null; } catch { return null; }
};
export function saveUserSession(token: string, user: RegisteredUser) {
  localStorage.setItem(USER_TOKEN_KEY, token); localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('auth-change'));
}
export function clearUserSession() { localStorage.removeItem(USER_TOKEN_KEY); localStorage.removeItem(USER_KEY); window.dispatchEvent(new Event('auth-change')); }
export function saveAdminSession(token: string, admin: unknown) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token); localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}
export function clearAdminSession() { localStorage.removeItem(ADMIN_TOKEN_KEY); localStorage.removeItem(ADMIN_KEY); }
