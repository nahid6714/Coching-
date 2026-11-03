'use client';
import { useEffect, useState } from 'react';
import { apiGet, dataOf } from '@/lib/api';
import type { SiteSettings } from '@/lib/types';
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  useEffect(() => {
    let active = true;
    apiGet<any>('/settings').then((result) => { if (active) setSettings(dataOf<SiteSettings>(result) || {}); }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  return settings;
}
