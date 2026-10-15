'use client';

import {useEffect, useState} from 'react';
import {ALL_COURSES, CourseItem} from '@/lib/academy-data';

export function useAcademyCourses() {
  const [courses, setCourses] = useState<CourseItem[]>(ALL_COURSES);
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('infinity_academy_courses');
        if (!raw) return;
        const parsed: CourseItem[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setCourses(parsed);
      } catch {
        // Keep the bundled demo courses if local storage is malformed.
      }
    };
    load();
    window.addEventListener('storage', load);
    window.addEventListener('infinity-courses-updated', load);
    return () => {
      window.removeEventListener('storage', load);
      window.removeEventListener('infinity-courses-updated', load);
    };
  }, []);
  return courses;
}
