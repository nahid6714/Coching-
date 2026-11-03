'use client';
import { useEffect, useState } from 'react';
import { apiGet, listOf } from '@/lib/api';
import type { CourseItem } from '@/lib/types';
export function useAcademyCourses() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    apiGet<any>('/courses').then((value) => { if (active) setCourses(listOf<CourseItem>(value)); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'কোর্স লোড করা যায়নি'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return { courses, loading, error };
}
