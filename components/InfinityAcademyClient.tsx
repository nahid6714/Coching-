'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import {
  ALL_PAGES,
  AcademicBatch,
  BatchStatus,
  BlogNoticeItem,
  INITIAL_BATCHES,
  INITIAL_BLOGS,
  INITIAL_SKILL_COURSES,
  INITIAL_TESTIMONIALS,
  PageId,
  SkillCourse,
  TEACHERS_LIST,
  TeacherProfile,
  TestimonialItem,
} from '@/lib/academy-data';
import DashboardsAndAuth from './DashboardsAndAuth';
import {
  PlaySquare,
  CheckSquare,
  MessageCircle,
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Clock,
  Users,
  BookOpen,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Award,
  Sparkles,
  Video,
  Calendar,
  Send,
  Loader2,
  LayoutGrid,
} from 'lucide-react';

export function StatusBadge({status}: {status: BatchStatus}) {
  if (status === 'ভর্তি চলছে') {
    return (
      <span className="inline-flex items-center gap-1 bg-[#E6F4EA] text-[#1E7E34] text-[11px] font-bold px-2.5 py-0.5 rounded">
        <span>●</span>
        <span>ভর্তি চলছে</span>
      </span>
    );
  }
  if (status === 'শীঘ্রই আসছে') {
    return (
      <span className="inline-flex items-center gap-1 bg-[#FEF3C7] text-[#B45309] text-[11px] font-bold px-2.5 py-0.5 rounded">
        <span>▲</span>
        <span>শীঘ্রই আসছে</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[11px] font-bold px-2.5 py-0.5 rounded">
      <span>■</span>
      <span>ভর্তি বন্ধ</span>
    </span>
  );
}

export default function InfinityAcademyClient() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Shared live state (editable from Admin Panel!)
  const [batches, setBatches] = useState<AcademicBatch[]>(INITIAL_BATCHES);
  const [courses] = useState<SkillCourse[]>(INITIAL_SKILL_COURSES);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(
    INITIAL_TESTIMONIALS
  );
  const [blogs, setBlogs] = useState<BlogNoticeItem[]>(INITIAL_BLOGS);
  const [heroSubtitle, setHeroSubtitle] = useState(
    'লাইভ ক্লাস, প্র্যাকটিস কুইজ আর ২৪/৭ ডাউট সলভ — এক জায়গায়, তোমার নিজের গতিতে।'
  );

  // Selected items for details & checkout pages
  const [selectedBatch, setSelectedBatch] = useState<AcademicBatch>(
    INITIAL_BATCHES[0]
  );
  const [selectedCourse, setSelectedCourse] = useState<SkillCourse>(
    INITIAL_SKILL_COURSES[0]
  );
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile | null>(
    null
  );
  const [selectedBlog, setSelectedBlog] = useState<BlogNoticeItem | null>(null);
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState<{
    title: string;
    fee: number;
    type: string;
  } | null>(null);

  // Page 2 (Classes 6-12) Filters
  const [classSearch, setClassSearch] = useState('');
  const [classFilter, setClassFilter] = useState<string>('সব');
  const [statusFilter, setStatusFilter] = useState<string>('সব');

  // Page 4 (Skills) Category Tab
  const [skillCategory, setSkillCategory] = useState<string>('সব');

  // Page 5 & 12 Accordion state
  const [openAccordion, setOpenAccordion] = useState<number>(0);

  // Page 13 Legal Tab state
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'refund'>(
    'privacy'
  );

  // Page 10 Contact Form state
  const [contactSent, setContactSent] = useState(false);

  // Quick 24/7 AI Doubt Solver Modal (accessible from Home or anywhere)
  const [doubtModalOpen, setDoubtModalOpen] = useState(false);
  const [quickQuestion, setQuickQuestion] = useState('');
  const [quickAnswer, setQuickAnswer] = useState('');
  const [quickLoading, setQuickLoading] = useState(false);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const openBatchDetails = (batch: AcademicBatch) => {
    setSelectedBatch(batch);
    navigateTo('batch-details');
  };

  const openCourseDetails = (course: SkillCourse) => {
    setSelectedCourse(course);
    navigateTo('course-details');
  };

  const startEnrollment = (title: string, fee: number, type: string) => {
    setSelectedCheckoutItem({title, fee, type});
    navigateTo('checkout');
  };

  const handleQuickDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    setQuickLoading(true);
    setQuickAnswer('');
    try {
      const res = await fetch('/api/doubt-solve', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          grade: 'এইচএসসি ও এসএসসি',
          subject: 'সাধারণ বিজ্ঞান ও গণিত',
          question: quickQuestion,
        }),
      });
      const data = await res.json();
      setQuickAnswer(data.answer || data.error || 'সমাধান পাওয়া যায়নি।');
    } catch {
      setQuickAnswer('সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।');
    } finally {
      setQuickLoading(false);
    }
  };

  const currentPageMeta =
    ALL_PAGES.find((p) => p.id === activePage) || ALL_PAGES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38] selection:bg-[#F5A623] selection:text-[#141A38]">
      {/* =====================================================================
          0. ALL 18 PAGES QUICK SWITCHER BAR (For instant preview of all 18 pages)
      ===================================================================== */}
      <div className="bg-[#0E1329] text-white px-3 sm:px-6 py-2 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1 text-[11px] font-bold text-[#F5A623] shrink-0 pr-2 border-r border-white/15">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>১৮টি পেজ নেভিগেটর:</span>
          </span>
          {ALL_PAGES.map((p) => {
            const isActive = activePage === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => navigateTo(p.id)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#F5A623] text-[#141A38]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white'
                }`}
              >
                {p.num}. {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          1. TOP UTILITY BAR
      ===================================================================== */}
      <div className="bg-[#141A38] text-slate-300 text-[11px] sm:text-xs py-2 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span>হেল্পলাইন: ০৯৬১০-০০১১২২ (সকাল ৯টা – রাত ১০টা)</span>
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => navigateTo('free-classes')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ফ্রি রিসোর্স
            </button>
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              অফলাইন সেন্টার
            </button>
            <button
              type="button"
              onClick={() => navigateTo('admin-dashboard')}
              className="text-[#F5A623] font-semibold hover:underline cursor-pointer hidden sm:inline"
            >
              অ্যাডমিন প্যানেল
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. STICKY MAIN HEADER (With Mobile Hamburger Menu)
      ===================================================================== */}
      <header className="bg-white sticky top-0 z-30 border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer focus:outline-none"
          >
            <svg
              width="34"
              height="20"
              viewBox="0 0 36 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#F5A623]"
            >
              <path
                d="M9.5 3C5.35786 3 2 6.13401 2 10C2 13.866 5.35786 17 9.5 17C12.85 17 15.65 14.6 18 11.5C20.35 14.6 23.15 17 26.5 17C30.6421 17 34 13.866 34 10C34 6.13401 30.6421 3 26.5 3C23.15 3 20.35 5.4 18 8.5C15.65 5.4 12.85 3 9.5 3Z"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col leading-none text-left">
              <span className="font-[family-name:var(--font-latin)] font-extrabold text-[15px] tracking-[0.06em] text-[#1F2A7C]">
                INFINITY
              </span>
              <span className="font-[family-name:var(--font-latin)] font-semibold text-[8px] tracking-[0.34em] text-slate-500 mt-0.5">
                ACADEMY
              </span>
            </div>
          </button>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-slate-700">
            <button
              type="button"
              onClick={() => navigateTo('classes')}
              className={`hover:text-[#1F2A7C] transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'classes' ? 'text-[#1F2A7C] underline underline-offset-4' : ''
              }`}
            >
              ক্লাস ৬–১২
            </button>
            <button
              type="button"
              onClick={() => navigateTo('skills')}
              className={`hover:text-[#1F2A7C] transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'skills' ? 'text-[#1F2A7C] underline underline-offset-4' : ''
              }`}
            >
              ইংরেজি
            </button>
            <button
              type="button"
              onClick={() => navigateTo('admission')}
              className={`hover:text-[#1F2A7C] transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'admission' ? 'text-[#1F2A7C] underline underline-offset-4' : ''
              }`}
            >
              ভর্তি প্রস্তুতি
            </button>
            <button
              type="button"
              onClick={() => navigateTo('teachers')}
              className={`hover:text-[#1F2A7C] transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'teachers' ? 'text-[#1F2A7C] underline underline-offset-4' : ''
              }`}
            >
              শিক্ষকবৃন্দ
            </button>
            <button
              type="button"
              onClick={() => navigateTo('blog')}
              className={`hover:text-[#1F2A7C] transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'blog' ? 'text-[#1F2A7C] underline underline-offset-4' : ''
              }`}
            >
              নোটিশ ও ব্লগ
            </button>
          </nav>

          {/* Zone 3: Primary CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('login')}
              className="bg-[#1F2A7C] hover:bg-[#161e5c] text-white text-xs sm:text-[13px] font-semibold px-5 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              লগইন
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="মেনু খুলুন"
              className="md:hidden p-2 rounded-lg border border-slate-200 text-[#141A38] hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (1-Column stack) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 gap-1.5 pb-2">
            {ALL_PAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigateTo(p.id)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  activePage === p.id
                    ? 'bg-[#EEF1FA] text-[#1F2A7C]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>
                  {p.num}. {p.label}
                </span>
                <span className="text-[10px] text-slate-400">{p.group}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =====================================================================
          3. INNER PAGE COMPACT NAVY BANNER & BREADCRUMB (For Pages 2–18)
      ===================================================================== */}
      {activePage !== 'home' && (
        <section className="bg-[#1F2A7C] text-white py-6 px-4 sm:px-8 border-b border-white/10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mb-1">
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="hover:text-[#F5A623] transition-colors cursor-pointer"
                >
                  হোম
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-300">{currentPageMeta.group}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#F5A623] font-semibold">
                  {currentPageMeta.label}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                {currentPageMeta.label}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigateTo('student-dashboard')}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-md transition-colors cursor-pointer"
              >
                স্টুডেন্ট ড্যাশবোর্ড
              </button>
              <button
                type="button"
                onClick={() => navigateTo('checkout')}
                className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] text-xs font-bold px-4 py-2 rounded-md transition-colors cursor-pointer"
              >
                ভর্তি হও
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          4. MAIN PAGE ROUTER CONTENT (Pages 1 to 18)
      ===================================================================== */}
      <main className="flex-1 flex flex-col">
        {/* -----------------------------------------------------------------
            PAGE 1: হোম (আপনার ডিজাইন + আসল কোর্স ছবি, আসল রিভিউ ও স্ট্যাটাস ব্যাজ)
        ----------------------------------------------------------------- */}
        {activePage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="bg-[#1F2A7C] text-white pt-12 pb-12 px-4 sm:px-8">
              <div className="max-w-5xl mx-auto">
                <p className="text-[#F5A623] text-xs sm:text-[13px] font-semibold mb-3 tracking-wide">
                  অনলাইন ও অফলাইন লার্নিং প্ল্যাটফর্ম
                </p>

                <h1 className="text-3xl sm:text-[42px] font-bold leading-[1.22] tracking-tight max-w-2xl">
                  শেখার সীমা নেই, <span className="text-[#F5A623]">অসীম</span>{' '}
                  সম্ভাবনার
                  <br />
                  পথে এগিয়ে চলো।
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm mt-4 max-w-xl leading-relaxed">
                  {heroSubtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3.5 mt-7">
                  <button
                    type="button"
                    onClick={() => navigateTo('classes')}
                    className="bg-[#F5A623] hover:bg-[#e59718] text-[#141A38] text-xs sm:text-[13px] font-bold px-5 py-2.5 rounded-md transition-colors cursor-pointer"
                  >
                    কোর্স খুঁজুন
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('free-classes')}
                    className="border border-slate-400/60 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-[13px] font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer"
                  >
                    ফ্রি ক্লাস দেখুন
                  </button>
                </div>

                {/* 4 Hero Class Cards with Yellow Top Line & Status Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                  {batches.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      onClick={() => openBatchDetails(b)}
                      className="bg-white text-[#141A38] rounded-lg p-4 border-t-4 border-[#F5A623] shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[122px]"
                    >
                      <div>
                        <h2 className="font-bold text-[15px] text-[#141A38]">
                          {b.classLevel === 'এইচএসসি'
                            ? 'এইচএসসি ২০২৬'
                            : b.classLevel === 'এসএসসি'
                            ? 'এসএসসি (দশম শ্রেণি)'
                            : b.classLevel}
                        </h2>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {b.group}
                        </p>
                      </div>
                      <div className="mt-3.5 flex items-center justify-between">
                        <StatusBadge status={b.status} />
                        <span className="text-[11px] font-semibold text-[#1F2A7C]">
                          বিস্তারিত →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => navigateTo('free-classes')}
                    className="text-[#F5A623] hover:underline text-xs font-medium cursor-pointer"
                  >
                    এইচএসসি ফ্রি ক্লাস দেখুন →
                  </button>
                </div>
              </div>
            </section>

            {/* Section: অনলাইনে শেখার সব সুবিধা */}
            <section className="pt-12 pb-8 px-4 sm:px-8 max-w-5xl mx-auto w-full">
              <h2 className="text-xl sm:text-[22px] font-bold text-[#141A38]">
                অনলাইনে শেখার সব সুবিধা
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                ক্লাস থেকে পরীক্ষা পর্যন্ত, সবকিছু এক অ্যাপে।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                <div
                  onClick={() => navigateTo('free-classes')}
                  className="bg-white rounded-xl p-6 border border-slate-200/80 border-t-4 border-t-[#F5A623] shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center mb-4">
                    <PlaySquare className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[15px] text-[#141A38]">
                    লাইভ সুপার ক্লাস
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    সরাসরি শিক্ষকের সাথে ক্লাস, প্রশ্ন করার সুযোগ এবং রেকর্ডিং।
                  </p>
                </div>

                <div
                  onClick={() => navigateTo('student-dashboard')}
                  className="bg-white rounded-xl p-6 border border-slate-200/80 border-t-4 border-t-[#F5A623] shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center mb-4">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[15px] text-[#141A38]">
                    কুইজ ও প্র্যাকটিস
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    প্রতিটি অধ্যায়ের পর কুইজ, মডেল টেস্ট ও লিডারবোর্ড।
                  </p>
                </div>

                <div
                  onClick={() => setDoubtModalOpen(true)}
                  className="bg-white rounded-xl p-6 border border-slate-200/80 border-t-4 border-t-[#F5A623] shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center mb-4">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[15px] text-[#141A38]">
                    ২৪/৭ ডাউট সলভ
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    যেকোনো সময় প্রশ্ন করো, দ্রুত সমাধান পাও।
                  </p>
                </div>
              </div>
            </section>

            {/* Section: ইংরেজি ও স্কিল কোর্স (এখন আসল ছবিসহ!) */}
            <section className="py-8 px-4 sm:px-8 max-w-5xl mx-auto w-full">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl sm:text-[22px] font-bold text-[#141A38]">
                  ইংরেজি ও স্কিল কোর্স
                </h2>
                <button
                  type="button"
                  onClick={() => navigateTo('skills')}
                  className="text-xs font-semibold text-[#1F2A7C] hover:underline cursor-pointer"
                >
                  সব কোর্স দেখুন →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => openCourseDetails(course)}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200/80 border-t-4 border-t-[#F5A623] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-36 w-full bg-[#1F2A7C] overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <StatusBadge status={course.status} />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-xs sm:text-[13px] text-[#141A38] line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1">
                          প্রশিক্ষক: {course.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 pb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1F2A7C] tabular-nums">
                        ৳{course.fee}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600">
                        বিস্তারিত →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: সব ব্যাচ এক নজরে (স্ট্যাটাস ব্যাজসহ) */}
            <section className="pt-8 pb-12 px-4 sm:px-8 max-w-5xl mx-auto w-full">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl sm:text-[22px] font-bold text-[#141A38]">
                  সব ব্যাচ এক নজরে
                </h2>
                <button
                  type="button"
                  onClick={() => navigateTo('classes')}
                  className="text-xs font-semibold text-[#1F2A7C] hover:underline cursor-pointer"
                >
                  ব্যাচ ফিল্টার ও সার্চ →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Col 1 */}
                <div className="bg-white rounded-xl p-6 border border-slate-200/80 border-t-4 border-t-[#F5A623]">
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="font-bold text-sm text-[#1F2A7C]">
                      ষষ্ঠ–অষ্টম শ্রেণি
                    </h3>
                    <StatusBadge status="শীঘ্রই আসছে" />
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {[
                      'ষষ্ঠ শ্রেণি একাডেমিক ফাউন্ডেশন ব্যাচ',
                      'সপ্তম শ্রেণি গণিত ও বিজ্ঞান স্পেশাল ব্যাচ',
                      'অষ্টম শ্রেণি পূর্ণাঙ্গ প্রস্তুতি ব্যাচ',
                    ].map((item, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => openBatchDetails(batches[3])}
                          className="hover:text-[#1F2A7C] hover:underline transition-colors cursor-pointer text-left"
                        >
                          • {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 2 */}
                <div className="bg-white rounded-xl p-6 border border-slate-200/80 border-t-4 border-t-[#F5A623]">
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="font-bold text-sm text-[#1F2A7C]">এসএসসি</h3>
                    <StatusBadge status="ভর্তি চলছে" />
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openBatchDetails(batches[1])}
                        className="hover:text-[#1F2A7C] hover:underline text-left cursor-pointer"
                      >
                        • নবম–দশম ফাইনাল রিভিশন ব্যাচ
                      </button>
                    </li>
                    <li className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openBatchDetails(batches[2])}
                        className="hover:text-[#1F2A7C] hover:underline text-left cursor-pointer"
                      >
                        • নবম শ্রেণি বিজ্ঞান ও সাধারণ ব্যাচ
                      </button>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => openBatchDetails(batches[5] || batches[1])}
                        className="hover:text-[#1F2A7C] hover:underline text-left cursor-pointer"
                      >
                        • টেস্ট পেপার সলভ ১ম পর্ব
                      </button>
                      <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                        ভর্তি বন্ধ
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Col 3 */}
                <div className="bg-white rounded-xl p-6 border border-slate-200/80 border-t-4 border-t-[#F5A623]">
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="font-bold text-sm text-[#1F2A7C]">
                      এইচএসসি
                    </h3>
                    <StatusBadge status="ভর্তি চলছে" />
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {[
                      'এইচএসসি ২০২৬ বিজ্ঞান পূর্ণাঙ্গ ব্যাচ',
                      'এইচএসসি মানবিক স্পেশাল ব্যাচ',
                      'এইচএসসি ব্যবসায় শিক্ষা পূর্ণাঙ্গ ব্যাচ',
                    ].map((item, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => openBatchDetails(batches[0])}
                          className="hover:text-[#1F2A7C] hover:underline transition-colors cursor-pointer text-left"
                        >
                          • {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Full Width Admission Card */}
              <div className="bg-white rounded-xl p-6 border border-slate-200/80 border-t-4 border-t-[#F5A623] mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-sm text-[#1F2A7C]">
                      ভর্তি প্রস্তুতি (মেডিকেল · ইঞ্জিনিয়ারিং · বিশ্ববিদ্যালয়)
                    </h3>
                    <StatusBadge status="ভর্তি চলছে" />
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-2">
                    <button
                      type="button"
                      onClick={() => navigateTo('admission')}
                      className="hover:text-[#1F2A7C] font-medium hover:underline cursor-pointer"
                    >
                      • মেডিকেল ও ডেন্টাল ভর্তি ব্যাচ
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo('admission')}
                      className="hover:text-[#1F2A7C] font-medium hover:underline cursor-pointer"
                    >
                      • বুয়েট ও ইঞ্জিনিয়ারিং ভর্তি ব্যাচ
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo('admission')}
                      className="hover:text-[#1F2A7C] font-medium hover:underline cursor-pointer"
                    >
                      • ঢাবি ক, খ, গ ইউনিট ও গুচ্ছ প্রস্তুতি
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('admission')}
                  className="bg-[#1F2A7C] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shrink-0 cursor-pointer"
                >
                  ভর্তি প্রস্তুতি পেজ দেখুন →
                </button>
              </div>
            </section>

            {/* Section: ব্যাচে ভর্তি হলে যা যা পাবে */}
            <section className="bg-white py-12 px-4 sm:px-8 border-y border-slate-200/70">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5">
                  <h2 className="text-xl sm:text-[22px] font-bold text-[#141A38]">
                    ব্যাচে ভর্তি হলে যা যা পাবে
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs">
                    পড়াশোনার পুরো যাত্রায় তোমার সাথে থাকার জন্য সাজানো সুবিধা।
                  </p>
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
                      onClick={() => navigateTo('batch-details')}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5 cursor-pointer group"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#1F2A7C] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {benefit.num}
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-[#141A38] group-hover:text-[#1F2A7C] transition-colors">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section: শিক্ষার্থীরা যা বলছে (আসল রিভিউসহ!) */}
            <section className="pt-12 pb-10 px-4 sm:px-8 max-w-5xl mx-auto w-full">
              <h2 className="text-xl sm:text-[22px] font-bold text-[#141A38] mb-5">
                শিক্ষার্থীরা যা বলছে
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {testimonials.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-xl p-6 border border-slate-200/80 border-t-4 border-t-[#F5A623] shadow-sm flex flex-col justify-between"
                  >
                    <p className="text-xs text-slate-700 leading-relaxed">
                      “{rev.quote}”
                    </p>
                    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-[#1F2A7C] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {rev.initials}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#141A38]">
                          {rev.name}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {rev.institution} · {rev.batch}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: App Download Banner */}
            <section className="px-4 sm:px-8 pb-14 max-w-5xl mx-auto w-full">
              <div className="bg-[#1F2A7C] rounded-2xl p-7 sm:px-10 sm:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    INFINITY ACADEMY অ্যাপ ডাউনলোড করো
                  </h2>
                  <p className="text-xs text-slate-300 mt-1.5">
                    লাইভ ক্লাস, রেকর্ডিং আর পরীক্ষা — সবকিছু হাতের মুঠোয়।
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigateTo('student-dashboard')}
                    className="bg-white hover:bg-slate-100 text-[#141A38] font-[family-name:var(--font-latin)] font-bold text-xs px-5 py-2.5 rounded-md transition-colors cursor-pointer"
                  >
                    Google Play
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('student-dashboard')}
                    className="bg-[#F5A623] hover:bg-[#e59718] text-[#141A38] font-[family-name:var(--font-latin)] font-bold text-xs px-5 py-2.5 rounded-md transition-colors cursor-pointer"
                  >
                    App Store
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* -----------------------------------------------------------------
            PAGE 2: ক্লাস ৬–১২ (লিস্টিং) - সার্চ বার + ফিল্টার (ক্লাস, বিষয়, ব্যাচ স্ট্যাটাস)
        ----------------------------------------------------------------- */}
        {activePage === 'classes' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={classSearch}
                  onChange={(e) => setClassSearch(e.target.value)}
                  placeholder="ব্যাচ বা বিষয়ের নাম লিখে খুঁজুন (যেমন: এইচএসসি, পদার্থ, দশম শ্রেণি)..."
                  className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#1F2A7C]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-600 mr-1">
                    শ্রেণি:
                  </span>
                  {[
                    'সব',
                    'এইচএসসি',
                    'এসএসসি',
                    'নবম শ্রেণি',
                    'ষষ্ঠ–অষ্টম শ্রেণি',
                  ].map((cl) => (
                    <button
                      key={cl}
                      type="button"
                      onClick={() => setClassFilter(cl)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        classFilter === cl
                          ? 'bg-[#1F2A7C] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cl}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-600 mr-1">
                    স্ট্যাটাস:
                  </span>
                  {['সব', 'ভর্তি চলছে', 'শীঘ্রই আসছে', 'ভর্তি বন্ধ'].map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                          statusFilter === st
                            ? 'bg-[#F5A623] text-[#141A38]'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Batches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {batches
                .filter(
                  (b) =>
                    (classFilter === 'সব' || b.classLevel === classFilter) &&
                    (statusFilter === 'সব' || b.status === statusFilter) &&
                    (!classSearch.trim() ||
                      b.title.includes(classSearch) ||
                      b.subject.includes(classSearch))
                )
                .map((batch) => (
                  <div
                    key={batch.id}
                    className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-[#1F2A7C] bg-[#EEF1FA] px-2.5 py-0.5 rounded">
                          {batch.classLevel}
                        </span>
                        <StatusBadge status={batch.status} />
                      </div>
                      <h3 className="font-bold text-sm text-[#141A38]">
                        {batch.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5">
                        বিষয়: {batch.subject}
                      </p>
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#1F2A7C]" />
                          <span>{batch.schedule}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-[#1F2A7C]" />
                          <span>
                            {batch.liveClassesCount} · {batch.duration}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-base text-[#1F2A7C] tabular-nums">
                          ৳{batch.fee}
                        </span>
                        {batch.oldFee && (
                          <span className="text-xs text-slate-400 line-through ml-1.5 tabular-nums">
                            ৳{batch.oldFee}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => openBatchDetails(batch)}
                        className="bg-[#1F2A7C] hover:bg-[#151d57] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        ব্যাচ ডিটেইলস
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 3: ক্লাস/ব্যাচ ডিটেইলস (ব্যানার, ফি, সময়সূচি, সিলেবাস, শিক্ষক, স্টিকি সাইডবার)
        ----------------------------------------------------------------- */}
        {activePage === 'batch-details' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
              {/* Left 8 Cols */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623]">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-[#EEF1FA] text-[#1F2A7C] text-xs font-bold px-2.5 py-0.5 rounded">
                      {selectedBatch.classLevel}
                    </span>
                    <StatusBadge status={selectedBatch.status} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#141A38]">
                    {selectedBatch.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-2">
                    অন্তর্ভুক্ত বিষয়সমূহ: {selectedBatch.subject}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-100 text-xs">
                    <div className="p-3 rounded-lg bg-[#F8F9FC]">
                      <p className="text-slate-500 text-[11px]">ক্লাসের সময়সূচি</p>
                      <p className="font-bold text-[#141A38] mt-0.5">
                        {selectedBatch.schedule}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F8F9FC]">
                      <p className="text-slate-500 text-[11px]">মোট লাইভ ক্লাস</p>
                      <p className="font-bold text-[#141A38] mt-0.5">
                        {selectedBatch.liveClassesCount}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F8F9FC]">
                      <p className="text-slate-500 text-[11px]">কোর্সের মেয়াদ</p>
                      <p className="font-bold text-[#141A38] mt-0.5">
                        {selectedBatch.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Syllabus Section */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                  <h3 className="font-bold text-base text-[#141A38]">
                    পূর্ণাঙ্গ সিলেবাস ও লেকচার প্ল্যান
                  </h3>
                  <div className="space-y-3">
                    {selectedBatch.syllabus.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#F8F9FC] border border-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs sm:text-sm text-[#1F2A7C]">
                            {s.chapter}
                          </h4>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {s.lectures}টি লেকচার
                          </span>
                        </div>
                        <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                          {s.topics.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teachers in this Batch */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                  <h3 className="font-bold text-base text-[#141A38]">
                    ক্লাস নেবেন যেসব অভিজ্ঞ শিক্ষক
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedBatch.teachers.map((tName, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigateTo('teachers')}
                        className="p-3.5 rounded-xl bg-[#F8F9FC] border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-[#1F2A7C]"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#1F2A7C] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          শিক্ষক
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#141A38]">
                            {tName}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            প্রোফাইল দেখুন →
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Sticky Enrollment Sidebar */}
              <aside className="lg:col-span-4 bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623] sticky top-20 space-y-4 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">
                      পূর্ণাঙ্গ ব্যাচ ফি
                    </span>
                    <span className="text-2xl font-bold text-[#1F2A7C] tabular-nums">
                      ৳{selectedBatch.fee}
                    </span>
                    {selectedBatch.oldFee && (
                      <span className="text-xs text-slate-400 line-through ml-2 tabular-nums">
                        ৳{selectedBatch.oldFee}
                      </span>
                    )}
                  </div>
                  <StatusBadge status={selectedBatch.status} />
                </div>

                <ul className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>সপ্তাহে নিয়মিত জুম ও অ্যাপ লাইভ ক্লাস</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>কুরিয়ারে প্রিন্টেড মাস্টার বই ও লেকচার শিট</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>অধ্যায়ভিত্তিক সৃজনশীল ও MCQ মডেল টেস্ট</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>২৪/৭ ডাউট সলভ ও ওয়ান-টু-ওয়ান মেন্টরশিপ</span>
                  </li>
                </ul>

                <button
                  type="button"
                  disabled={selectedBatch.status === 'ভর্তি বন্ধ'}
                  onClick={() =>
                    startEnrollment(
                      selectedBatch.title,
                      selectedBatch.fee,
                      'একাডেমিক ব্যাচ'
                    )
                  }
                  className="w-full bg-[#F5A623] hover:bg-[#e09416] disabled:opacity-50 text-[#141A38] font-bold text-xs py-3 rounded-lg transition-colors cursor-pointer"
                >
                  {selectedBatch.status === 'ভর্তি বন্ধ'
                    ? 'এই ব্যাচে ভর্তি বন্ধ আছে'
                    : 'এখনই ব্যাচে ভর্তি হও'}
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('free-classes')}
                  className="w-full border border-slate-200 hover:bg-slate-50 text-[#141A38] font-semibold text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  ফ্রি ডেমো ক্লাস দেখুন
                </button>
              </aside>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 4: ইংরেজি ও স্কিল কোর্স (লিস্টিং) - ইমেজ কার্ড গ্রিড ও ক্যাটাগরি ট্যাব
        ----------------------------------------------------------------- */}
        {activePage === 'skills' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex flex-wrap gap-2">
                {['সব', 'ইংরেজি', 'আইইএলটিএস', 'কিডস', 'মক টেস্ট'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSkillCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      skillCategory === cat
                        ? 'bg-[#1F2A7C] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500">
                লাইফটাইম ভিডিও অ্যাক্সেস ও কোর্স শেষে ভেরিফায়েড সার্টিফিকেট
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {courses
                .filter(
                  (c) =>
                    skillCategory === 'সব' || c.category === skillCategory
                )
                .map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 border-t-4 border-t-[#F5A623] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-40 w-full bg-[#1F2A7C]">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                        <div className="absolute top-2.5 right-2.5">
                          <StatusBadge status={course.status} />
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-bold text-[#1F2A7C] bg-[#EEF1FA] px-2 py-0.5 rounded">
                          {course.category}
                        </span>
                        <h3 className="font-bold text-sm text-[#141A38] mt-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {course.instructor} · {course.instructorRole}
                        </p>
                        <p className="text-[11px] text-slate-600 mt-2">
                          ★ {course.rating} · {course.studentsCount}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-base text-[#1F2A7C] tabular-nums">
                        ৳{course.fee}
                      </span>
                      <button
                        type="button"
                        onClick={() => openCourseDetails(course)}
                        className="bg-[#1F2A7C] text-white text-xs font-semibold px-3.5 py-2 rounded-lg cursor-pointer"
                      >
                        কোর্স ডিটেইলস
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 5: কোর্স ডিটেইলস (ভিডিও প্রিভিউ, কারিকুলাম অ্যাকর্ডিয়ন, রিভিউ, FAQ)
        ----------------------------------------------------------------- */}
        {activePage === 'course-details' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
              {/* Left 8 Cols */}
              <div className="lg:col-span-8 space-y-6">
                {/* Video Preview Card */}
                <div className="bg-white rounded-xl overflow-hidden border border-slate-200 border-t-4 border-t-[#F5A623]">
                  <div className="relative h-64 sm:h-72 w-full bg-[#141A38]">
                    <Image
                      src={selectedCourse.image}
                      alt={selectedCourse.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover opacity-65"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <button
                        type="button"
                        onClick={() => navigateTo('free-classes')}
                        className="w-14 h-14 rounded-full bg-[#F5A623] text-[#141A38] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer mb-3"
                      >
                        <PlaySquare className="w-7 h-7" />
                      </button>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">
                        ফ্রি ইন্ট্রো ভিডিও প্রিভিউ
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold mt-1">
                        {selectedCourse.title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <span>প্রশিক্ষক: {selectedCourse.instructor}</span>
                      <span>·</span>
                      <span>রেটিং: ★ {selectedCourse.rating}</span>
                      <span>·</span>
                      <span>{selectedCourse.lessonsCount}</span>
                    </div>
                  </div>
                </div>

                {/* Curriculum Accordion */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                  <h3 className="font-bold text-base text-[#141A38]">
                    কোর্স কারিকুলাম (অ্যাকর্ডিয়ন)
                  </h3>
                  <div className="space-y-2.5">
                    {selectedCourse.curriculum.map((mod, idx) => {
                      const isOpen = openAccordion === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-xl border border-slate-200 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenAccordion(isOpen ? -1 : idx)
                            }
                            className="w-full p-4 bg-[#F8F9FC] flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#141A38] cursor-pointer"
                          >
                            <span>{mod.module}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <ul className="p-4 bg-white space-y-2 text-xs text-slate-600 border-t border-slate-100">
                              {mod.lessons.map((l, lIdx) => (
                                <li
                                  key={lIdx}
                                  className="flex items-center justify-between py-1"
                                >
                                  <span className="flex items-center gap-2">
                                    <PlaySquare className="w-3.5 h-3.5 text-[#1F2A7C]" />
                                    <span>{l}</span>
                                  </span>
                                  <span className="text-[10px] text-emerald-700 font-semibold">
                                    প্রিভিউ
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Course Reviews & FAQ */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                  <h3 className="font-bold text-base text-[#141A38]">
                    কোর্স সম্পর্কিত সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-lg bg-[#F8F9FC]">
                      <p className="font-bold text-[#141A38]">
                        ১. কোর্সের ভিডিওগুলো কতদিন দেখা যাবে?
                      </p>
                      <p className="text-slate-600 mt-1">
                        ভর্তি হওয়ার পর স্টুডেন্ট ড্যাশবোর্ডে পুরো ১ বছর আনলিমিটেড বার সব রেকর্ডেড ভিডিও ও রিসোর্স দেখা যাবে।
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#F8F9FC]">
                      <p className="font-bold text-[#141A38]">
                        ২. কোর্স শেষে কি সার্টিফিকেট দেওয়া হবে?
                      </p>
                      <p className="text-slate-600 mt-1">
                        হ্যাঁ, কোর্স ও ফাইনাল কুইজ সম্পন্ন করলেই অনলাইনে ভেরিফায়েবল সার্টিফিকেট পাবে।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 4 Cols Sticky Sidebar */}
              <aside className="lg:col-span-4 bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623] sticky top-20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#1F2A7C] tabular-nums">
                    ৳{selectedCourse.fee}
                  </span>
                  <StatusBadge status={selectedCourse.status} />
                </div>
                <p className="text-xs text-slate-600">
                  {selectedCourse.lessonsCount} · ভেরিফায়েড সার্টিফিকেট ও প্র্যাকটিস শিটসহ
                </p>
                <button
                  type="button"
                  onClick={() =>
                    startEnrollment(
                      selectedCourse.title,
                      selectedCourse.fee,
                      'স্কিল কোর্স'
                    )
                  }
                  className="w-full bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-xs py-3 rounded-lg cursor-pointer"
                >
                  কোর্সটি কিনুন (৳{selectedCourse.fee})
                </button>
              </aside>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 6: ভর্তি প্রস্তুতি (মেডিকেল, ইঞ্জিনিয়ারিং, বিশ্ববিদ্যালয় আলাদা সেকশনে)
        ----------------------------------------------------------------- */}
        {activePage === 'admission' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
            {[
              {
                title: 'মেডিকেল ও ডেন্টাল ভর্তি প্রস্তুতি ২০২৬',
                badge: 'ভর্তি চলছে' as BatchStatus,
                mentor: 'রাফসান জানি (ঢাকা মেডিকেল কলেজ) ও মেডিকেল প্যানেল',
                fee: 4500,
                features: [
                  'জীববিজ্ঞান, রসায়ন ও পদার্থবিজ্ঞান দাগানো বই ও মেমোরি ট্রিকস ক্লাস',
                  'সাধারণ জ্ঞান ও ইংরেজি স্পেশাল মাস্টার শিট',
                  '৫০টি পেপার ফাইনাল, সাবজেক্ট ফাইনাল ও OMR মডেল টেস্ট',
                ],
              },
              {
                title: 'বুয়েট (BUET) ও সমন্বিত ইঞ্জিনিয়ারিং ভর্তি প্রস্তুতি',
                badge: 'ভর্তি চলছে' as BatchStatus,
                mentor: 'ড. তানভীর আহমেদ (BUET) ও ইঞ্জিনিয়ারিং মেন্টর টিম',
                fee: 5000,
                features: [
                  'উচ্চতর গণিত, পদার্থ ও রসায়ন কনসেপ্ট ও লিখিত প্রশ্ন সমাধান',
                  'বিগত ২০ বছরের ইঞ্জিনিয়ারিং প্রশ্নব্যাংক এনালাইসিস ক্লাস',
                  'প্রিলিমিনারি ও লিখিত পরীক্ষার অনুরূপ সাপ্তাহিক মক টেস্ট',
                ],
              },
              {
                title: 'ঢাকা বিশ্ববিদ্যালয় (ক, খ, গ ইউনিট) ও গুচ্ছ ভর্তি প্রস্তুতি',
                badge: 'ভর্তি চলছে' as BatchStatus,
                mentor: 'মাহমুদুল হাসান (DU) ও সাদিয়া ইসলাম (IBA, DU)',
                fee: 3800,
                features: [
                  'MCQ ও লিখিত অংশের সমান গুরুত্ব দিয়ে বিশেষ সিলেবাস',
                  'ক্যালকুলেটর ছাড়া দ্রুত গাণিতিক হিসাব করার কৌশল',
                  'বাংলা, ইংরেজি ও সাধারণ জ্ঞান স্পেশাল প্রশ্নব্যাংক সলভ',
                ],
              },
            ].map((adm, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 border-t-4 border-t-[#F5A623] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={adm.badge} />
                    <span className="text-xs font-semibold text-[#1F2A7C]">
                      অ্যাডমিশন স্পেশাল প্রোগ্রাম
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#141A38]">
                    {adm.title}
                  </h2>
                  <p className="text-xs text-slate-500">মেন্টর: {adm.mentor}</p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                    {adm.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full md:w-auto shrink-0 bg-[#F8F9FC] p-5 rounded-xl border border-slate-200 text-center space-y-3">
                  <p className="text-xs text-slate-500">পূর্ণাঙ্গ প্রোগ্রাম ফি</p>
                  <p className="text-2xl font-bold text-[#1F2A7C] tabular-nums">
                    ৳{adm.fee}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      startEnrollment(adm.title, adm.fee, 'ভর্তি প্রস্তুতি')
                    }
                    className="w-full bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-xs px-6 py-2.5 rounded-lg cursor-pointer"
                  >
                    ভর্তি হও
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 7: ফ্রি ক্লাস (ফ্রি ক্লাসের লিস্ট, ভিডিও কার্ড, নিচে "কোর্স কিনুন" CTA)
        ----------------------------------------------------------------- */}
        {activePage === 'free-classes' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: 'এইচএসসি পদার্থবিজ্ঞান ১ম পত্র: ভেক্টর ও নদী-নৌকার অংক',
                  teacher: 'ড. তানভীর আহমেদ (BUET)',
                  duration: '৫৫ মিনিট',
                  tag: 'এইচএসসি বিজ্ঞান',
                  img: '/images/course_mock_test.jpg',
                },
                {
                  title: 'এসএসসি সাধারণ গণিত: ত্রিকোণমিতিক দূরত্ব ও উচ্চতা',
                  teacher: 'মাহমুদুল হাসান (DU)',
                  duration: '৪৮ মিনিট',
                  tag: 'এসএসসি গণিত',
                  img: '/images/course_spoken_english.jpg',
                },
                {
                  title: 'ইংরেজি গ্রামার: Right Form of Verbs ও Modifiers',
                  teacher: 'সাদিয়া ইসলাম (IBA, DU)',
                  duration: '৪২ মিনিট',
                  tag: 'ইংরেজি',
                  img: '/images/course_ielts_prep.jpg',
                },
                {
                  title: 'মেডিকেল জীববিজ্ঞান: মানবদেহ ও রক্ত সংবহনতন্ত্র',
                  teacher: 'রাফসান জানি (DMC)',
                  duration: '১ ঘণ্টা ১০ মিনিট',
                  tag: 'ভর্তি প্রস্তুতি',
                  img: '/images/course_kids_english.jpg',
                },
                {
                  title: 'এইচএসসি রসায়ন: সংকরায়ন ও অরবিটাল চিত্র বিশ্লেষণ',
                  teacher: 'রাফসান জানি (DMC)',
                  duration: '৫০ মিনিট',
                  tag: 'এইচএসসি রসায়ন',
                  img: '/images/course_mock_test.jpg',
                },
                {
                  title: 'IELTS Speaking Cue Card: ২ মিনিট নন-স্টপ কথা বলার কৌশল',
                  teacher: 'তানভীর হাসান',
                  duration: '৩৮ মিনিট',
                  tag: 'IELTS',
                  img: '/images/course_ielts_prep.jpg',
                },
              ].map((fc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 border-t-4 border-t-[#F5A623] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full bg-[#141A38]">
                      <Image
                        src={fc.img}
                        alt={fc.title}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-[#F5A623] text-[#141A38] flex items-center justify-center shadow">
                          <PlaySquare className="w-5 h-5" />
                        </div>
                      </div>
                      <span className="absolute top-2.5 left-2.5 bg-[#1F2A7C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded">
                        {fc.tag}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-xs sm:text-sm text-[#141A38]">
                        {fc.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {fc.teacher} · {fc.duration}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-bold">
                      ১০০% ফ্রি ক্লাস
                    </span>
                    <button
                      type="button"
                      onClick={() => navigateTo('student-dashboard')}
                      className="text-[#1F2A7C] font-bold hover:underline cursor-pointer"
                    >
                      এখনই দেখুন →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Banner */}
            <div className="bg-[#1F2A7C] text-white rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">
                  ফ্রি ক্লাস ভালো লেগেছে? পূর্ণাঙ্গ ব্যাচে ভর্তি হয়ে প্রস্তুতি ১০০% নিশ্চিত করো!
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  লাইভ ক্লাস, প্রিন্টেড শিট, সাপ্তাহিক মডেল টেস্ট ও ২৪/৭ ডাউট সলভ সাপোর্ট।
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('classes')}
                className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-xs px-6 py-3 rounded-lg shrink-0 cursor-pointer"
              >
                পূর্ণাঙ্গ কোর্স কিনুন →
              </button>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 8: শিক্ষক পরিচিতি (ছবিসহ কার্ড গ্রিড, ক্লিক করলে শিক্ষকের প্রোফাইল)
        ----------------------------------------------------------------- */}
        {activePage === 'teachers' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEACHERS_LIST.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTeacher(t)}
                  className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-sm hover:shadow-md transition-all cursor-pointer text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="w-20 h-20 rounded-full bg-[#1F2A7C] text-[#F5A623] font-bold text-lg flex items-center justify-center mx-auto mb-3 border-4 border-[#EEF1FA]">
                      {t.initials}
                    </div>
                    <h3 className="font-bold text-sm text-[#141A38]">
                      {t.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#1F2A7C] mt-0.5">
                      {t.subject}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {t.institution}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                    <p>{t.experience} · {t.studentsTaught}</p>
                    <span className="inline-block mt-2 text-[#1F2A7C] font-bold">
                      বিস্তারিত প্রোফাইল দেখুন →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedTeacher && (
              <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-[#1F2A7C] space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#1F2A7C] text-[#F5A623] font-bold text-base flex items-center justify-center shrink-0">
                      {selectedTeacher.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#141A38]">
                        {selectedTeacher.name}
                      </h3>
                      <p className="text-xs text-[#1F2A7C] font-semibold">
                        {selectedTeacher.designation} · {selectedTeacher.institution}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTeacher(null)}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedTeacher.bio}
                </p>
                <div className="pt-2">
                  <p className="text-xs font-bold text-[#141A38] mb-2">
                    চলমান ব্যাচসমূহ:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeacher.batches.map((b, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => navigateTo('classes')}
                        className="bg-[#EEF1FA] text-[#1F2A7C] text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        {b} →
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 9: আমাদের সম্পর্কে (মিশন, ভিশন, টিম, সংখ্যা)
        ----------------------------------------------------------------- */}
        {activePage === 'about' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
            {/* Impact Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {num: '২.৫ লাখ+', label: 'সক্রিয় শিক্ষার্থী'},
                {num: '১,৮০০+', label: 'লাইভ ও রেকর্ডেড ক্লাস'},
                {num: '৬০+ জন', label: 'দেশসেরা শিক্ষক প্যানেল'},
                {num: '৯৮.৫%', label: 'বোর্ড পরীক্ষায় সাফল্যের হার'},
              ].map((st, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-[#F5A623] text-center"
                >
                  <p className="text-2xl font-bold text-[#1F2A7C] tabular-nums">
                    {st.num}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-2">
                <h3 className="font-bold text-base text-[#1F2A7C]">
                  আমাদের মিশন (Mission)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  বাংলাদেশের যেকোনো প্রান্তের একজন শিক্ষার্থী যেন ঘরে বসেই বুয়েট, ঢাকা মেডিকেল ও ঢাকা বিশ্ববিদ্যালয়ের অভিজ্ঞ শিক্ষকদের কাছে সবচেয়ে কম খরচে মানসম্মত শিক্ষা, প্রিন্টেড গাইডবুক এবং ২৪/৭ ডাউট সলভ সুবিধা পায়।
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-2">
                <h3 className="font-bold text-base text-[#1F2A7C]">
                  আমাদের ভিশন (Vision)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  মুখস্থনির্ভর পড়াশোনার পরিবর্তে কনসেপ্টভিত্তিক লার্নিং, স্মার্ট অ্যানালিটিক্স কুইজ এবং এআই-চালিত তাৎক্ষণিক ডাউট সলভিংয়ের মাধ্যমে আগামী প্রজন্মের শিক্ষার্থীদেরকে একাডেমিক ও স্কিল উভয় ক্ষেত্রে আত্মবিশ্বাসী করে গড়ে তোলা।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 10: যোগাযোগ (ফর্ম, ফোন, ঠিকানা, ম্যাপ, সোশ্যাল লিংক)
        ----------------------------------------------------------------- */}
        {activePage === 'contact' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 space-y-4">
                <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623] space-y-4 text-xs">
                  <h3 className="font-bold text-base text-[#141A38]">
                    সরাসরি যোগাযোগ ও অফলাইন সেন্টার
                  </h3>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#1F2A7C] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#141A38]">হেল্পলাইন নম্বর</p>
                      <p className="text-slate-600">০৯৬১০-০০১১২২, ০১৭১১-০০১১২২</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#1F2A7C] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#141A38]">ইমেইল</p>
                      <p className="text-slate-600">support@infinityacademy.edu.bd</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#1F2A7C] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#141A38]">প্রধান কার্যালয় ও পাঠদান কেন্দ্র</p>
                      <p className="text-slate-600">
                        লেভেল ৪, গ্রিন রোড, ফার্মগেট, ঢাকা-১২১৫ (শাখা: মিরপুর-১০ ও চট্টগ্রাম চকবাজার)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623]">
                <h3 className="font-bold text-base text-[#141A38] mb-4">
                  আমাদের মেসেজ পাঠান
                </h3>
                {contactSent ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="font-bold text-sm text-emerald-900">
                      আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!
                    </p>
                    <p className="text-xs text-emerald-700">
                      আমাদের স্টুডেন্ট কাউন্সেলর খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSent(true);
                    }}
                    className="space-y-3.5 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <input
                        type="text"
                        required
                        placeholder="আপনার নাম"
                        className="rounded-lg border border-slate-200 px-3.5 py-2.5"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="মোবাইল নম্বর"
                        className="rounded-lg border border-slate-200 px-3.5 py-2.5"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="বিষয় (যেমন: ভর্তি তথ্য / বই ডেলিভারি)"
                      className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5"
                    />
                    <textarea
                      rows={4}
                      required
                      placeholder="আপনার প্রশ্ন বা মতামত বিস্তারিত লিখুন..."
                      className="w-full rounded-lg border border-slate-200 p-3.5"
                    />
                    <button
                      type="submit"
                      className="bg-[#1F2A7C] text-white font-bold px-6 py-2.5 rounded-lg cursor-pointer"
                    >
                      বার্তা পাঠান
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 11: ব্লগ / নোটিশ (লিস্ট ও ডিটেইলস — পরীক্ষার রুটিন, আপডেট)
        ----------------------------------------------------------------- */}
        {activePage === 'blog' && (
          <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-6">
            {selectedBlog ? (
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-[#F5A623] space-y-4">
                <button
                  type="button"
                  onClick={() => setSelectedBlog(null)}
                  className="text-xs font-bold text-[#1F2A7C] hover:underline cursor-pointer"
                >
                  ← সব নোটিশ ও ব্লগে ফিরে যান
                </button>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-[#EEF1FA] text-[#1F2A7C] font-bold px-2.5 py-0.5 rounded">
                    {selectedBlog.category}
                  </span>
                  <span className="text-slate-500">{selectedBlog.date}</span>
                </div>
                <h2 className="text-xl font-bold text-[#141A38]">
                  {selectedBlog.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedBlog.content}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {blogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBlog(b)}
                    className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2.5">
                        <span className="bg-[#EEF1FA] text-[#1F2A7C] font-bold px-2.5 py-0.5 rounded">
                          {b.category}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{b.date}</span>
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[#141A38]">
                        {b.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {b.summary}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#1F2A7C] mt-4 inline-block">
                      বিস্তারিত পড়ুন →
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 12: FAQ / হেল্প সেন্টার (অ্যাকর্ডিয়ন ডিজাইন)
        ----------------------------------------------------------------- */}
        {activePage === 'faq' && (
          <div className="py-10 px-4 sm:px-8 max-w-3xl mx-auto w-full space-y-4">
            {[
              {
                q: '১. অনলাইনে কীভাবে ব্যাচে ভর্তি হব?',
                a: 'যেকোনো ব্যাচ বা কোর্সের "ভর্তি হও" বাটনে ক্লিক করে তোমার নাম ও মোবাইল নম্বর দিয়ে বিকাশ, নগদ অথবা কার্ডের মাধ্যমে পেমেন্ট সম্পন্ন করলেই সাথে সাথে স্টুডেন্ট ড্যাশবোর্ডে ক্লাস অ্যাক্সেস পেয়ে যাবে।',
              },
              {
                q: '২. লাইভ ক্লাস মিস হয়ে গেলে কি রেকর্ডিং পাওয়া যাবে?',
                a: 'হ্যাঁ! প্রতিটি লাইভ ক্লাস শেষ হওয়ার ৩০ মিনিটের মধ্যে স্টুডেন্ট ড্যাশবোর্ডে HD রেকর্ডেড ভিডিও এবং শিক্ষকের হাতে লেখা ক্লাস নোট (PDF) যুক্ত হয়ে যায়।',
              },
              {
                q: '৩. প্রিন্টেড বই ও লেকচার শিট কীভাবে পাব?',
                a: 'ভর্তির সময় তোমার দেওয়া ঠিকানায় সুন্দরবন বা পাঠাও কুরিয়ারের মাধ্যমে ৩–৫ কর্মদিবসের মধ্যে প্রিন্টেড বই ও শিট পৌঁছে দেওয়া হয়।',
              },
              {
                q: '৪. ২৪/৭ ডাউট সলভ কীভাবে কাজ করে?',
                a: 'পড়তে বসে যেকোনো সময়ে কোনো অংক বা টপিক বুঝতে সমস্যা হলে আমাদের ২৪/৭ ডাউট সলভ প্যানেলে প্রশ্ন করলেই এআই মেন্টর ও বিষয়ভিত্তিক শিক্ষকরা ধাপে ধাপে সমাধান বুঝিয়ে দেবেন।',
              },
            ].map((item, idx) => {
              const open = openAccordion === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-[#F5A623] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(open ? -1 : idx)}
                    className="w-full p-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#141A38] cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGE 13: প্রাইভেসি পলিসি / টার্মস / রিফান্ড পলিসি
        ----------------------------------------------------------------- */}
        {activePage === 'legal' && (
          <div className="py-10 px-4 sm:px-8 max-w-4xl mx-auto w-full space-y-6">
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-slate-200">
              {[
                {id: 'privacy', label: 'গোপনীয়তা নীতি (Privacy Policy)'},
                {id: 'terms', label: 'ব্যবহারের শর্তাবলি (Terms of Service)'},
                {id: 'refund', label: 'রিফান্ড নীতিমালা (Refund Policy)'},
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setLegalTab(t.id as 'privacy' | 'terms' | 'refund')
                  }
                  className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                    legalTab === t.id
                      ? 'bg-[#1F2A7C] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-[#F5A623] space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {legalTab === 'privacy' && (
                <>
                  <h2 className="text-lg font-bold text-[#141A38]">
                    গোপনীয়তা নীতি (Privacy Policy)
                  </h2>
                  <p>
                    INFINITY ACADEMY শিক্ষার্থীদের ব্যক্তিগত তথ্যের সর্বোচ্চ গোপনীয়তা ও নিরাপত্তা বজায় রাখে। আপনার মোবাইল নম্বর, ইমেইল ও শিক্ষা প্রতিষ্ঠানের তথ্য শুধুমাত্র ক্লাস অ্যাক্সেস, পরীক্ষার ফলাফল SMS এবং প্রিন্টেড বই কুরিয়ার করার কাজে ব্যবহৃত হয়। কোনো তৃতীয় পক্ষের কাছে শিক্ষার্থীদের তথ্য হস্তান্তর করা হয় না।
                  </p>
                </>
              )}
              {legalTab === 'terms' && (
                <>
                  <h2 className="text-lg font-bold text-[#141A38]">
                    ব্যবহারের শর্তাবলি (Terms of Service)
                  </h2>
                  <p>
                    একটি স্টুডেন্ট অ্যাকাউন্ট শুধুমাত্র একজন শিক্ষার্থীর ব্যবহারের জন্য নির্ধারিত। পেইড কোর্সের ভিডিও বা পিডিএফ লেকচার শিট সামাজিক যোগাযোগ মাধ্যমে অবৈধভাবে বিতরণ করা কপিরাইট আইনের পরিপন্থী।
                  </p>
                </>
              )}
              {legalTab === 'refund' && (
                <>
                  <h2 className="text-lg font-bold text-[#141A38]">
                    রিফান্ড নীতিমালা (Refund Policy)
                  </h2>
                  <p>
                    যেকোনো একাডেমিক ব্যাচ বা স্কিল কোর্সে ভর্তির ৭২ ঘণ্টার মধ্যে যদি কোনো কারিগরি ত্রুটি বা ডাবল পেমেন্ট হয়ে থাকে, তবে হেল্পলাইনে যোগাযোগ করলে ৫–৭ কর্মদিবসের মধ্যে বিকাশ/নগদ বা ব্যাংক অ্যাকাউন্টে রিফান্ড প্রদান করা হয়।
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
            PAGES 14, 15, 16, 17, 18: অ্যাকাউন্ট, চেকআউট, স্টুডেন্ট ড্যাশবোর্ড ও অ্যাডমিন প্যানেল
        ----------------------------------------------------------------- */}
        {(activePage === 'login' ||
          activePage === 'checkout' ||
          activePage === 'student-dashboard' ||
          activePage === 'admin-dashboard' ||
          activePage === 'admin-manage') && (
          <DashboardsAndAuth
            activePage={activePage}
            navigateTo={navigateTo}
            batches={batches}
            setBatches={setBatches}
            courses={courses}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            blogs={blogs}
            setBlogs={setBlogs}
            heroSubtitle={heroSubtitle}
            setHeroSubtitle={setHeroSubtitle}
            selectedCheckoutItem={selectedCheckoutItem}
          />
        )}
      </main>

      {/* =====================================================================
          5. CONSISTENT FOOTER ACROSS ALL 18 PAGES
      ===================================================================== */}
      <footer className="bg-[#141A38] text-white pt-12 pb-8 px-4 sm:px-8 mt-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1 */}
            <div>
              <h3 className="font-[family-name:var(--font-latin)] font-bold text-sm tracking-wider text-white">
                INFINITY ACADEMY
              </h3>
              <ul className="text-[11px] text-slate-400 space-y-2 mt-4">
                <li>হেল্পলাইন: ০৯৬১০-০০১১২২</li>
                <li>ইমেইল: support@infinityacademy.edu.bd</li>
                <li>অফিস/পাঠদান: ফার্মগেট ও মিরপুর-১০, ঢাকা</li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 mb-3.5">
                কোম্পানি ও তথ্য
              </h4>
              <ul className="text-[11px] text-slate-400 space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    আমাদের সম্পর্কে
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('teachers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    শিক্ষক পরিচিতি
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    যোগাযোগ ও শাখা
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('legal')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    গোপনীয়তা ও রিফান্ড নীতি
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 mb-3.5">
                রিসোর্স ও হেল্প
              </h4>
              <ul className="text-[11px] text-slate-400 space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('free-classes')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    ফ্রি ক্লাস ও ডাউনলোড
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('blog')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    ব্লগ ও পরীক্ষার রুটিন
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('faq')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    FAQ / হেল্প সেন্টার
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('student-dashboard')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    স্টুডেন্ট ড্যাশবোর্ড
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 mb-3.5">
                সোশ্যাল মিডিয়া ও প্যানেল
              </h4>
              <ul className="text-[11px] text-slate-400 space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Facebook Page
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('free-classes')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    YouTube Channel
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('admin-dashboard')}
                    className="text-[#F5A623] hover:underline transition-colors cursor-pointer"
                  >
                    অ্যাডমিন ড্যাশবোর্ড (১৭–১৮)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>© ২০২৬ INFINITY ACADEMY. সর্বস্বত্ব সংরক্ষিত।</span>
            <span>মোট ১৮টি পেজ সক্রিয় রয়েছে</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          QUICK 24/7 HIGH-THINKING AI DOUBT SOLVE MODAL
      ===================================================================== */}
      {doubtModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#1F2A7C]" />
                <h3 className="font-bold text-base text-[#141A38]">
                  ২৪/৭ ডাউট সলভ (High-Thinking AI Mentor)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDoubtModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleQuickDoubt} className="space-y-3">
              <textarea
                rows={3}
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                placeholder="তোমার যেকোনো জটিল প্রশ্ন লেখো (যেমন: প্রাসের সর্বোচ্চ উচ্চতার সূত্রটি কীভাবে আসে?)..."
                className="w-full rounded-lg border border-slate-200 p-3 text-xs focus:outline-none focus:border-[#1F2A7C]"
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setDoubtModalOpen(false);
                    navigateTo('student-dashboard');
                  }}
                  className="text-xs font-semibold text-[#1F2A7C] hover:underline cursor-pointer"
                >
                  স্টুডেন্ট ড্যাশবোর্ডে পূর্ণাঙ্গ ডাউট প্যানেল →
                </button>
                <button
                  type="submit"
                  disabled={quickLoading || !quickQuestion.trim()}
                  className="bg-[#1F2A7C] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {quickLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>সমাধান তৈরি হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>সমাধান দেখো</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {quickAnswer && (
              <div className="p-4 rounded-xl bg-[#F8F9FC] border border-slate-200 text-xs text-[#141A38] whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                {quickAnswer}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
