'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import Footer from './Footer';
import {ALL_COURSES, BatchStatus, TESTIMONIALS} from '@/lib/academy-data';
import {
  PlaySquare,
  CheckSquare,
  MessageCircle,
  Sparkles,
  X,
  Send,
  Loader2,
} from 'lucide-react';

export function StatusBadge({status}: {status: BatchStatus}) {
  if (status === 'ভর্তি চলছে') {
    return (
      <span className="inline-block bg-[#E6F4EA] text-[#1E7E34] text-xs sm:text-sm font-bold px-3 py-1 rounded-md">
        ভর্তি চলছে
      </span>
    );
  }
  if (status === 'শীঘ্রই আসছে') {
    return (
      <span className="inline-block bg-[#FEF3C7] text-[#B45309] text-xs sm:text-sm font-bold px-3 py-1 rounded-md">
        শীঘ্রই আসছে
      </span>
    );
  }
  return (
    <span className="inline-block bg-rose-50 text-rose-700 text-xs sm:text-sm font-bold px-3 py-1 rounded-md">
      ভর্তি বন্ধ
    </span>
  );
}

export default function InfinityAcademyClient() {
  const [doubtModalOpen, setDoubtModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('ইংরেজি ও স্কিল');

  const academicCourses = ALL_COURSES.filter((c) => c.category === 'ক্লাস ৬–১২');
  const displayedCourses =
    activeCategory === 'সব'
      ? ALL_COURSES
      : ALL_COURSES.filter((c) => c.category === activeCategory);

  const handleDoubtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/doubt-solve', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          grade: 'এইচএসসি ও এসএসসি',
          subject: 'সাধারণ বিজ্ঞান ও গণিত',
          question,
        }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error || 'উত্তর পাওয়া যায়নি।');
    } catch {
      setAnswer('সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="bg-[#1F2A7C] text-white pt-14 pb-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#F5A623] text-base sm:text-lg font-bold mb-3">
            অনলাইন ও অফলাইন লার্নিং প্ল্যাটফর্ম
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold leading-[1.25] max-w-3xl">
            শেখার সীমা নেই, <span className="text-[#F5A623]">অসীম</span>{' '}
            সম্ভাবনার
            <br />
            পথে এগিয়ে চলো।
          </h1>

          <p className="text-slate-200 text-base sm:text-lg mt-5 max-w-2xl leading-relaxed">
            লাইভ ক্লাস, প্র্যাকটিস কুইজ আর ২৪/৭ ডাউট সলভ — এক জায়গায়, তোমার নিজের
            গতিতে।
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href="/courses"
              className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] text-base sm:text-lg font-bold px-6 py-3 rounded-lg transition-colors"
            >
              কোর্সসমূহ দেখুন
            </Link>
            <Link
              href="/free-classes"
              className="border border-slate-300/60 bg-white/10 hover:bg-white/20 text-white text-base sm:text-lg font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              ফ্রি ক্লাস দেখুন
            </Link>
          </div>

          {/* 4 Class Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {academicCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white text-[#141A38] rounded-xl p-5 border-t-4 border-[#F5A623] shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-lg sm:text-xl text-[#141A38]">
                      {course.className === 'এইচএসসি'
                        ? 'এইচএসসি ২০২৬'
                        : course.className}
                    </h2>
                    <StatusBadge status={course.status} />
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 mt-2">
                    {course.subtitle}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-sm font-bold text-[#1F2A7C] hover:underline"
                  >
                    বিস্তারিত দেখুন
                  </Link>
                  <Link
                    href={`/enroll?course=${encodeURIComponent(course.title)}`}
                    className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] text-sm font-bold px-3.5 py-1.5 rounded-lg transition-colors"
                  >
                    ভর্তি হও
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/free-classes"
              className="text-[#F5A623] hover:underline text-base font-semibold inline-block"
            >
              এইচএসসি ও এসএসসি ফ্রি ডেমো ক্লাস দেখুন →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. অনলাইনে শেখার সব সুবিধা */}
      <section className="pt-14 pb-10 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#141A38]">
          অনলাইনে শেখার সব সুবিধা
        </h2>
        <p className="text-base text-slate-600 mt-1.5">
          ক্লাস থেকে পরীক্ষা পর্যন্ত, সবকিছু এক জায়গায়।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
          <Link
            href="/free-classes"
            className="bg-white rounded-xl p-7 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center mb-4">
              <PlaySquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#141A38]">
              লাইভ সুপার ক্লাস
            </h3>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              সরাসরি শিক্ষকের সাথে ক্লাস, প্রশ্ন করার সুযোগ এবং রেকর্ডিং।
            </p>
          </Link>

          <Link
            href="/courses"
            className="bg-white rounded-xl p-7 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#141A38]">
              কুইজ ও প্র্যাকটিস
            </h3>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              প্রতিটি অধ্যায়ের পর কুইজ, মডেল টেস্ট ও লিডারবোর্ড।
            </p>
          </Link>

          <button
            type="button"
            onClick={() => setDoubtModalOpen(true)}
            className="bg-white rounded-xl p-7 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs hover:shadow-md transition-all text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#141A38]">২৪/৭ ডাউট সলভ</h3>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              যেকোনো সময় প্রশ্ন করো, দ্রুত সমাধান পাও।
            </p>
          </button>
        </div>
      </section>

      {/* 3. আমাদের কোর্সসমূহ (ক্যাটাগরি অনুযায়ী) */}
      <section className="py-10 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141A38]">
              আমাদের জনপ্রিয় কোর্সসমূহ
            </h2>
            <p className="text-base text-slate-600 mt-1">
              কোর্স দেখো → &ldquo;ভর্তি হও&rdquo; বাটনে ক্লিক করে সহজেই ভর্তি কনফার্ম করো
            </p>
          </div>
          <Link
            href="/courses"
            className="text-base font-bold text-[#1F2A7C] hover:underline shrink-0"
          >
            সব কোর্স দেখুন →
          </Link>
        </div>

        {/* Clean Category Tabs (including ভর্তি প্রস্তুতি as a course category) */}
        <div className="flex flex-wrap items-center gap-2.5 mb-7">
          {['ইংরেজি ও স্কিল', 'ক্লাস ৬–১২', 'ভর্তি প্রস্তুতি', 'সব'].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-base font-bold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1F2A7C] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <Link
                  href={`/courses/${course.id}`}
                  className="block relative h-44 w-full bg-[#1F2A7C]"
                >
                  {course.image && (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-2.5 right-2.5">
                    <StatusBadge status={course.status} />
                  </div>
                </Link>
                <div className="p-5">
                  <Link href={`/courses/${course.id}`}>
                    <h3 className="font-bold text-lg text-[#141A38] hover:text-[#1F2A7C] transition-colors">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-600 mt-1.5">
                    {course.instructor}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="font-bold text-base text-[#1F2A7C]">
                  {course.fee}
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-sm font-bold text-slate-700 hover:text-[#1F2A7C] px-2.5 py-1.5 rounded-md border border-slate-200"
                  >
                    বিস্তারিত
                  </Link>
                  <Link
                    href={`/enroll?course=${encodeURIComponent(course.title)}`}
                    className="text-sm font-bold text-[#141A38] bg-[#F5A623] hover:bg-[#e09416] px-3.5 py-1.5 rounded-md transition-colors"
                  >
                    ভর্তি হও
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ব্যাচে ভর্তি হলে যা যা পাবে */}
      <section className="bg-white py-14 px-4 sm:px-8 border-y border-slate-200 mt-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141A38]">
              ব্যাচে ভর্তি হলে যা যা পাবে
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              পড়াশোনার পুরো যাত্রায় তোমার সাথে থাকার জন্য সাজানো সুবিধা।
            </p>
            <Link
              href="/enroll"
              className="mt-6 inline-block bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-base sm:text-lg px-7 py-3.5 rounded-lg transition-colors"
            >
              ভর্তি হও →
            </Link>
          </div>

          <div className="md:col-span-7 divide-y divide-slate-100">
            {[
              {num: '১', text: 'সপ্তাহে নিয়মিত লাইভ ক্লাস'},
              {num: '২', text: 'প্রিন্টেড বই ও স্টাডি ম্যাটেরিয়াল'},
              {num: '৩', text: 'প্রশ্নব্যাংক ও মডেল টেস্ট'},
              {num: '৪', text: 'ক্লাস রেকর্ডিং ও হোমওয়ার্ক'},
              {num: '৫', text: '২৪/৭ ডাউট সলভ সাপোর্ট'},
            ].map((benefit, index) => (
              <div
                key={index}
                className="py-4 first:pt-0 last:pb-0 flex items-center gap-4"
              >
                <span className="w-8 h-8 rounded-full bg-[#1F2A7C] text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {benefit.num}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#141A38]">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. শিক্ষার্থীরা যা বলছে */}
      <section className="pt-14 pb-12 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#141A38] mb-6">
          শিক্ষার্থীরা যা বলছে
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs flex flex-col justify-between"
            >
              <p className="text-base text-slate-700 leading-relaxed">
                “{item.quote}”
              </p>
              <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-[#1F2A7C] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {item.name.slice(0, 2)}
                </div>
                <div>
                  <p className="text-base font-bold text-[#141A38]">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {item.institution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. App Download Banner */}
      <section className="px-4 sm:px-8 pb-16 max-w-6xl mx-auto w-full">
        <div className="bg-[#1F2A7C] rounded-2xl p-8 sm:px-12 sm:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              INFINITY ACADEMY অ্যাপ ডাউনলোড করো
            </h2>
            <p className="text-base text-slate-200 mt-2">
              লাইভ ক্লাস, রেকর্ডিং আর পরীক্ষা — সবকিছু হাতের মুঠোয়।
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/courses"
              className="bg-white hover:bg-slate-100 text-[#141A38] font-[family-name:var(--font-latin)] font-bold text-sm sm:text-base px-6 py-3 rounded-lg transition-colors"
            >
              Google Play
            </Link>
            <Link
              href="/courses"
              className="bg-[#F5A623] hover:bg-[#e59718] text-[#141A38] font-[family-name:var(--font-latin)] font-bold text-sm sm:text-base px-6 py-3 rounded-lg transition-colors"
            >
              App Store
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* 24/7 Doubt Solver Modal */}
      {doubtModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#1F2A7C]" />
                <h3 className="font-bold text-lg text-[#141A38]">
                  ২৪/৭ ডাউট সলভ
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDoubtModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDoubtSubmit} className="space-y-4">
              <textarea
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="তোমার যেকোনো প্রশ্ন এখানে লেখো..."
                className="w-full rounded-lg border border-slate-200 p-3.5 text-base focus:outline-none focus:border-[#1F2A7C]"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="bg-[#1F2A7C] text-white text-base font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>সমাধান তৈরি হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>সমাধান দেখো</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {answer && (
              <div className="p-4 rounded-xl bg-[#F8F9FC] border border-slate-200 text-base text-[#141A38] whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">
                {answer}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
