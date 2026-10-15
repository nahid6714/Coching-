'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {ALL_COURSES, CourseItem} from '@/lib/academy-data';

type Teacher = {id: string; name: string; subject: string; institution: string; experience: string; bio: string; courseIds: string[]};
const DEFAULT_TEACHERS: Teacher[] = [
  {id:'teacher-tanvir', name:'ড. তানভীর আহমেদ', subject:'পদার্থবিজ্ঞান', institution:'বিএসসি ইঞ্জিনিয়ারিং, বুয়েট (BUET)', experience:'৮+ বছরের শিক্ষকতা অভিজ্ঞতা', bio:'পদার্থবিজ্ঞানের জটিল সূত্র ও গাণিতিক সমস্যাগুলো বাস্তব উদাহরণ দিয়ে সহজ করে তোলেন।', courseIds:['hsc-science']},
  {id:'teacher-rafsan', name:'রাফসান জানি', subject:'জীববিজ্ঞান ও রসায়ন', institution:'এমবিবিএস, ঢাকা মেডিকেল কলেজ (DMC)', experience:'৬+ বছরের শিক্ষকতা অভিজ্ঞতা', bio:'মেডিকেল ভর্তি প্রস্তুতি এবং এইচএসসি জীববিজ্ঞানের চিত্রভিত্তিক কৌশল শেখান।', courseIds:['admission-prep']},
  {id:'teacher-sadia', name:'সাদিয়া ইসলাম', subject:'ইংরেজি ও স্পোকেন ইংলিশ', institution:'এমবিএ, আইবিএ, ঢাকা বিশ্ববিদ্যালয় (IBA, DU)', experience:'৭+ বছরের শিক্ষকতা অভিজ্ঞতা', bio:'ইংরেজি গ্রামার, স্পোকেন ইংলিশ ও IELTS প্রস্তুতির সাজানো কারিকুলাম পরিচালনা করেন।', courseIds:['spoken-english','ielts-prep']},
  {id:'teacher-mahmud', name:'মাহমুদুল হাসান', subject:'উচ্চতর গণিত ও সাধারণ গণিত', institution:'ফলিত গণিত, ঢাকা বিশ্ববিদ্যালয় (DU)', experience:'৭+ বছরের শিক্ষকতা অভিজ্ঞতা', bio:'ক্যালকুলাস, ত্রিকোণমিতি ও বীজগণিত বিস্তারিত ও সহজ পদ্ধতিতে শেখান।', courseIds:['hsc-science','ssc-class10']},
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(DEFAULT_TEACHERS);
  const [courses, setCourses] = useState<CourseItem[]>(ALL_COURSES);
  useEffect(() => {
    const load = () => {
      try { const t = localStorage.getItem('infinity_academy_teachers'); if (t) { const parsed = JSON.parse(t); if (Array.isArray(parsed)) setTeachers(parsed); } } catch {}
      try { const c = localStorage.getItem('infinity_academy_courses'); if (c) { const parsed = JSON.parse(c); if (Array.isArray(parsed) && parsed.length) setCourses(parsed); } } catch {}
    };
    load(); window.addEventListener('storage', load); window.addEventListener('infinity-courses-updated', load); window.addEventListener('infinity-teachers-updated', load);
    return () => { window.removeEventListener('storage', load); window.removeEventListener('infinity-courses-updated', load); window.removeEventListener('infinity-teachers-updated', load); };
  }, []);
  return <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]"><Navbar />
    <section className="bg-[#1F2A7C] text-white py-10 px-4 sm:px-8"><div className="max-w-6xl mx-auto"><p className="text-sm text-[#F5A623] font-bold mb-1">হোম / শিক্ষক পরিচিতি</p><h1 className="text-3xl sm:text-4xl font-bold">আমাদের অভিজ্ঞ শিক্ষক প্যানেল</h1><p className="text-base text-slate-200 mt-2">কোর্সভিত্তিক শিক্ষক পরিচিতি, অভিজ্ঞতা ও শিক্ষাগত যোগ্যতা।</p></div></section>
    <main className="flex-1 py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full"><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{teachers.map((t) => { const assigned = t.courseIds.map(id => courses.find(c => c.id === id)).filter((c): c is CourseItem => Boolean(c)); return <article key={t.id} className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs flex flex-col gap-4"><div className="flex items-start gap-4"><div className="w-16 h-16 rounded-full bg-[#1F2A7C] text-[#F5A623] font-bold text-xl flex items-center justify-center shrink-0">{t.name.slice(0,2)}</div><div><h2 className="font-bold text-xl">{t.name}</h2><p className="text-base font-bold text-[#1F2A7C] mt-0.5">{t.subject}</p><p className="text-sm text-slate-600 mt-0.5">{t.institution} · {t.experience}</p></div></div><p className="text-base text-slate-700 leading-relaxed">{t.bio}</p><div className="pt-3 border-t border-slate-100"><p className="font-bold text-sm mb-2">এই শিক্ষকের কোর্স</p>{assigned.length ? <div className="flex flex-wrap gap-2">{assigned.map(c=><Link key={c.id} href={`/courses/${c.id}`} className="rounded-lg bg-[#EEF1FA] px-3 py-2 text-sm font-semibold text-[#1F2A7C] hover:bg-[#dfe6f7]">{c.title}</Link>)}</div> : <p className="text-sm text-slate-500">এখনো কোনো কোর্স যুক্ত করা হয়নি।</p>}</div></article>; })}</div></main><Footer /></div>;
}
