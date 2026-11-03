const configured = process.env.NEXT_PUBLIC_API_URL?.trim();

if (!configured && process.env.NODE_ENV === 'production') {
  throw new Error('NEXT_PUBLIC_API_URL is not set. Set it (e.g. https://api.yourdomain.com/api) before running the production build.');
}

export const API_BASE_URL = (configured || 'http://localhost:8000/api').replace(/\/$/, '');
