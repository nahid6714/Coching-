const configured = process.env.NEXT_PUBLIC_API_URL?.trim();

// If NEXT_PUBLIC_API_URL is not set at build time, the API address is worked out in the
// browser: https://example.com  ->  https://api.example.com/api
export function getApiBase(): string {
  if (configured) return configured.replace(/\/$/, '');
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') return 'http://localhost:8000/api';
    return `${window.location.protocol}//api.${host.replace(/^www\./, '')}/api`;
  }
  return '';
}
