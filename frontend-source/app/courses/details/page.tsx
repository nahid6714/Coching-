'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StatusBadge } from '@/components/InfinityAcademyClient';
import { apiGet, dataOf } from '@/lib/api';
import type { CourseItem } from '@/lib/types';
import { CheckCircle2, Clock, Video, Calendar, User } from 'lucide-react';

function DetailsContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || '';
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    if (!slug) { setLoading(false); setError('কোর্সের পরিচিতি পাওয়া যায়নি।'); return; }
    apiGet<any>(`/courses/${encodeURIComponent(slug)}`).then((r) => { if (active) setCourse(dataOf<CourseItem>(r)); })
      .catch((e: unknown) => { if (active) setError(e instanceof Error ? e.message : 'কোর্স লোড করা যায়নি।'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  return <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]"><Navbar />
    <section className="bg-[#1F2A7C] text-white py-10 px-4 sm:px-8"><div className="max-w-6xl mx-auto"><p className="text-sm text-[#F5A623] font-bold mb-2"><Link href="/">হোম</Link> / <Link href="/courses">কোর্সসমূহ</Link> / বিস্তারিত</p><h1 className="text-2xl sm:text-4xl font-bold">{course?.title || 'কোর্সের বিস্তারিত'}</h1><p className="text-base sm:text-lg text-slate-200 mt-2">{course?.subtitle || ''}</p></div></section>
    <main className="flex-1 py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full">
      {loading ? <p className="py-16 text-center text-slate-500">কোর্সের তথ্য লোড হচ্ছে...</p> : error || !course ? <div className="py-16 text-center"><p className="text-rose-600 font-semibold">{error || 'কোর্স পাওয়া যায়নি।'}</p><Link href="/courses" className="inline-block mt-5 px-5 py-3 rounded-lg bg-[#1F2A7C] text-white font-bold">সব কোর্স দেখুন</Link></div> :
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div className="lg:col-span-8 space-y-6">
        {course.image && <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-[#1F2A7C] border border-slate-200"><Image src={course.image} alt={course.title} fill unoptimized className="object-cover" /></div>}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-[#F5A623] space-y-4"><h2 className="text-xl sm:text-2xl font-bold">কোর্স সম্পর্কে বিস্তারিত</h2><p className="text-base text-slate-700 leading-relaxed">{course.description || 'বিস্তারিত তথ্য যুক্ত করা হয়নি।'}</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          {[{label:'ক্লাসের সময়সূচি',value:course.schedule,Icon:Clock},{label:'মোট ক্লাস',value:course.liveClasses,Icon:Video},{label:'কোর্সের মেয়াদ',value:course.duration,Icon:Calendar}].map(({label,value,Icon})=><div key={label} className="p-4 rounded-xl bg-[#F8F9FC]"><p className="text-sm text-slate-500 flex items-center gap-1.5"><Icon className="w-4 h-4 text-[#1F2A7C]" />{label}</p><p className="font-bold text-base mt-1">{value || 'তথ্য নেই'}</p></div>)}
        </div></div>
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 space-y-4"><h3 className="text-xl sm:text-2xl font-bold">কোর্স সিলেবাস ও যা যা শেখানো হবে</h3>{course.syllabus?.length ? <ul className="space-y-3 text-base text-slate-700">{course.syllabus.map((item,idx)=><li key={idx} className="p-3.5 rounded-lg bg-[#F8F9FC] border border-slate-100 flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0"/><span>{item}</span></li>)}</ul> : <p className="text-slate-500">সিলেবাস যুক্ত করা হয়নি।</p>}</div>
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 flex items-center gap-4"><div className="w-14 h-14 rounded-full bg-[#1F2A7C] text-white flex items-center justify-center shrink-0"><User className="w-7 h-7"/></div><div><p className="text-sm text-slate-500">কোর্স পরিচালক ও শিক্ষক</p><p className="font-bold text-lg">{course.instructor || 'শিক্ষক নির্ধারণ করা হয়নি'}</p></div></div>
      </div><aside className="lg:col-span-4 bg-white rounded-xl p-6 sm:p-7 border border-slate-200 border-t-4 border-t-[#F5A623] sticky top-24 space-y-5 shadow-xs"><div className="flex items-center justify-between gap-3"><div><span className="text-sm text-slate-500 block">কোর্স ফি</span><span className="text-2xl sm:text-3xl font-bold text-[#1F2A7C]">{course.fee || 'যোগাযোগ করুন'}</span></div><StatusBadge status={course.status}/></div><ul className="space-y-3 pt-4 border-t border-slate-100 text-base text-slate-700">{['সপ্তাহে নিয়মিত লাইভ ক্লাস','প্রিন্টেড বই ও স্টাডি ম্যাটেরিয়াল','প্রশ্নব্যাংক ও মডেল টেস্ট','২৪/৭ ডাউট সলভ সাপোর্ট'].map(x=><li key={x} className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-emerald-600"/>{x}</li>)}</ul><Link href={`/enroll?course=${encodeURIComponent(course.title)}`} className="block text-center bg-[#F5A623] hover:bg-[#e09416] font-bold text-lg py-3.5 rounded-lg">ভর্তি হও →</Link><p className="text-sm text-slate-500 text-center">শুধু নাম ও মোবাইল নম্বর দিন — আমাদের প্রতিনিধি যোগাযোগ করবেন।</p></aside></div>}
    </main><Footer /></div>;
}
export default function CourseDetailsPage() { return <Suspense fallback={<div className="p-12 text-center">লোড হচ্ছে...</div>}><DetailsContent /></Suspense>; }
