'use client';

import React, {useState, Suspense} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {useAcademyCourses} from '@/lib/use-academy-courses';
import {StatusBadge} from '@/components/InfinityAcademyClient';
import {Search, Clock, Video} from 'lucide-react';

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'সব';

  const courses = useAcademyCourses();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['সব', 'ক্লাস ৬–১২', 'ইংরেজি ও স্কিল', 'ভর্তি প্রস্তুতি'];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'সব' || course.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.className.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-1 py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full space-y-8">
      {/* Search & Category Tabs */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="কোর্স বা ব্যাচের নাম লিখে খুঁজুন (যেমন: এইচএসসি, এসএসসি, স্পোকেন ইংলিশ)..."
            className="w-full rounded-lg border border-slate-200 pl-12 pr-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-base font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1F2A7C] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {course.image && (
                <div className="relative h-48 w-full bg-[#1F2A7C]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={course.status} />
                  </div>
                </div>
              )}
              <div className="p-6">
                <span className="inline-block bg-[#EEF1FA] text-[#1F2A7C] text-xs font-bold px-3 py-1 rounded-md mb-2.5">
                  {course.category}
                </span>
                <h2 className="font-bold text-xl text-[#141A38]">
                  {course.title}
                </h2>
                <p className="text-base text-slate-600 mt-1.5">
                  {course.subtitle}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1F2A7C] shrink-0" />
                    <span>{course.schedule}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#1F2A7C] shrink-0" />
                    <span>{course.liveClasses}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 block">কোর্স ফি</span>
                <span className="font-bold text-lg text-[#1F2A7C]">
                  {course.fee}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/courses/${course.id}`}
                  className="border border-slate-200 hover:bg-slate-50 text-[#141A38] text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  বিস্তারিত
                </Link>
                <Link
                  href={`/enroll?course=${encodeURIComponent(course.title)}`}
                  className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  ভর্তি হও
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      {/* Page Banner */}
      <section className="bg-[#1F2A7C] text-white py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-[#F5A623] font-bold mb-1">
            হোম / কোর্সসমূহ
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            আমাদের সকল কোর্স ও একাডেমিক ব্যাচ
          </h1>
          <p className="text-base text-slate-200 mt-2">
            তোমার শ্রেণি বা পছন্দের কোর্সটি বেছে নিয়ে বিস্তারিত দেখো এবং ভর্তির আবেদন করো।
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="py-16 text-center text-base text-slate-600">
            কোর্সসমূহ লোড হচ্ছে...
          </div>
        }
      >
        <CoursesContent />
      </Suspense>

      <Footer />
    </div>
  );
}
