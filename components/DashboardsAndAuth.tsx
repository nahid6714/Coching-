'use client';

import React, {useState} from 'react';
import {
  AcademicBatch,
  BatchStatus,
  BlogNoticeItem,
  PageId,
  SkillCourse,
  TestimonialItem,
} from '@/lib/academy-data';
import {
  BookOpen,
  Video,
  FileText,
  CheckSquare,
  MessageCircle,
  CreditCard,
  User,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  Plus,
  Tag,
  TrendingUp,
  Users,
  Layers,
  Award,
  PlaySquare,
  Download,
  ShieldCheck,
} from 'lucide-react';

interface DashboardsProps {
  activePage: PageId;
  navigateTo: (page: PageId) => void;
  batches: AcademicBatch[];
  setBatches: React.Dispatch<React.SetStateAction<AcademicBatch[]>>;
  courses: SkillCourse[];
  testimonials: TestimonialItem[];
  setTestimonials: React.Dispatch<React.SetStateAction<TestimonialItem[]>>;
  blogs: BlogNoticeItem[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogNoticeItem[]>>;
  heroSubtitle: string;
  setHeroSubtitle: React.Dispatch<React.SetStateAction<string>>;
  selectedCheckoutItem: {title: string; fee: number; type: string} | null;
}

const DASHBOARD_QUIZ = [
  {
    q: '১. নিউটনের গতির দ্বিতীয় সূত্র থেকে কোনটির পরিমাপ পাওয়া যায়?',
    options: ['জড়তা', 'বল (F = ma)', 'ভরবেগের সংরক্ষণ', 'মহাকর্ষীয় ধ্রুবক'],
    answer: 1,
    explanation: 'নিউটনের ২য় সূত্রানুসারে প্রযুক্ত বল বস্তুর ভরবেগের পরিবর্তনের হারের সমানুপাতিক (F = ma)।',
  },
  {
    q: '২. যদি ভেক্টর A ও B পরস্পর লম্ব হয়, তবে A · B এর মান কত?',
    options: ['1', '0', 'AB', '-1'],
    answer: 1,
    explanation: 'দুটি লম্ব ভেক্টরের মধ্যবর্তী কোণ 90° হওয়ায় cos(90°) = 0, তাই ডট গুণফল শূন্য।',
  },
  {
    q: '৩. Choose the correct sentence:',
    options: [
      'He has been ill since five days.',
      'He has been ill for five days.',
      'He is ill for five days.',
      'He was ill since five days.',
    ],
    answer: 1,
    explanation: 'নির্দিষ্ট সময়কাল (Period of time) বোঝাতে Present Perfect Continuous বা Perfect tense-এ "for" বসে।',
  },
];

export default function DashboardsAndAuth({
  activePage,
  navigateTo,
  batches,
  setBatches,
  courses,
  testimonials,
  setTestimonials,
  blogs,
  setBlogs,
  heroSubtitle,
  setHeroSubtitle,
  selectedCheckoutItem,
}: DashboardsProps) {
  // Page 14: Login / Register State
  const [authStep, setAuthStep] = useState<'phone' | 'otp' | 'done'>('phone');
  const [phone, setPhone] = useState('01712345678');
  const [studentName, setStudentName] = useState('তানভীর ইসলাম');
  const [otp, setOtp] = useState('4829');

  // Page 15: Checkout State
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');
  const [buyerName, setBuyerName] = useState('তানভীর ইসলাম');
  const [buyerPhone, setBuyerPhone] = useState('01712345678');
  const [buyerCollege, setBuyerCollege] = useState('নটর ডেম কলেজ, ঢাকা');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [couponInput, setCouponInput] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [checkoutDone, setCheckoutDone] = useState(false);

  // Page 16: Student Dashboard Tab State
  const [studentTab, setStudentTab] = useState<
    'courses' | 'recorded' | 'quiz' | 'doubt' | 'payments' | 'profile'
  >('courses');

  // Student Quiz State
  const [quizAns, setQuizAns] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Student 24/7 Doubt Solve State (Gemini 3.1 Pro High Thinking)
  const [doubtGrade, setDoubtGrade] = useState('এইচএসসি');
  const [doubtSubject, setDoubtSubject] = useState('পদার্থবিজ্ঞান');
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtAnswer, setDoubtAnswer] = useState('');
  const [doubtLoading, setDoubtLoading] = useState(false);
  const [doubtError, setDoubtError] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 'TK-104',
      subject: 'পদার্থবিজ্ঞান ১ম পত্র',
      question: 'নদী ও নৌকার ন্যূনতম সময়ে নদী পারাপারের শর্ত কী?',
      status: 'সমাধানকৃত',
      date: 'আজ, সকাল ১০:৩০',
    },
    {
      id: 'TK-103',
      subject: 'উচ্চতর গণিত',
      question: 'লিমিটের L’Hospital Rule কখন প্রয়োগ করা যায়?',
      status: 'সমাধানকৃত',
      date: 'গতকাল',
    },
  ]);

  // Page 18: Admin Management Tab State
  const [adminTab, setAdminTab] = useState<
    'batches' | 'students' | 'blogs' | 'cms' | 'coupons'
  >('batches');
  const [newBatchTitle, setNewBatchTitle] = useState('');
  const [newBatchClass, setNewBatchClass] = useState<AcademicBatch['classLevel']>('এইচএসসি');
  const [newBatchFee, setNewBatchFee] = useState('3000');
  const [newBatchStatus, setNewBatchStatus] = useState<BatchStatus>('ভর্তি চলছে');

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState<BlogNoticeItem['category']>('নোটিশ');
  const [newBlogSummary, setNewBlogSummary] = useState('');

  const [newRevName, setNewRevName] = useState('');
  const [newRevInst, setNewRevInst] = useState('');
  const [newRevQuote, setNewRevQuote] = useState('');

  const [coupons, setCoupons] = useState([
    {code: 'INFINITY20', discount: 500, active: true},
    {code: 'HSC2026', discount: 300, active: true},
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDisc, setNewCouponDisc] = useState('400');

  const handleDoubtAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;
    setDoubtLoading(true);
    setDoubtError('');
    setDoubtAnswer('');

    try {
      const res = await fetch('/api/doubt-solve', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          grade: doubtGrade,
          subject: doubtSubject,
          question: doubtQuestion,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setDoubtError(data.error || 'সমাধান আনতে সমস্যা হয়েছে।');
      } else {
        setDoubtAnswer(data.answer);
        setTickets((prev) => [
          {
            id: `TK-${105 + prev.length}`,
            subject: doubtSubject,
            question: doubtQuestion,
            status: 'সমাধানকৃত',
            date: 'এইমাত্র',
          },
          ...prev,
        ]);
      }
    } catch {
      setDoubtError('সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।');
    } finally {
      setDoubtLoading(false);
    }
  };

  // =========================================================================
  // PAGE 14: লগইন / রেজিস্টার
  // =========================================================================
  if (activePage === 'login') {
    return (
      <div className="py-12 px-4 sm:px-8 max-w-md mx-auto w-full">
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-sm">
          <div className="text-center mb-6">
            <span className="inline-block bg-[#EEF1FA] text-[#1F2A7C] text-xs font-bold px-3 py-1 rounded-md mb-2">
              শিক্ষার্থী ও অভিভাবক পোর্টাল
            </span>
            <h2 className="text-xl font-bold text-[#141A38]">
              লগইন অথবা রেজিস্টার করো
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              মোবাইল নম্বর এবং ওটিপি (OTP) দিয়ে সহজেই তোমার অ্যাকাউন্টে প্রবেশ করো
            </p>
          </div>

          {authStep === 'phone' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthStep('otp');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  তোমার পূর্ণ নাম
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="তোমার নাম লেখো"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1F2A7C]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  মোবাইল নম্বর (১১ ডিজিট)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1F2A7C] tabular-nums"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-xs py-3 rounded-lg transition-colors cursor-pointer"
              >
                ওটিপি (OTP) পাঠান
              </button>
            </form>
          )}

          {authStep === 'otp' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthStep('done');
              }}
              className="space-y-4"
            >
              <div className="p-3 rounded-lg bg-[#F8F9FC] border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-[#141A38]">{phone}</span> নম্বরে ৪ সংখ্যার ভেরিফিকেশন কোড পাঠানো হয়েছে।
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ওটিপি (OTP) কোড
                </label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-center tracking-[0.5em] font-bold text-sm focus:outline-none focus:border-[#1F2A7C] tabular-nums"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1F2A7C] hover:bg-[#161f5c] text-white font-bold text-xs py-3 rounded-lg transition-colors cursor-pointer"
              >
                যাচাই করে লগইন করুন
              </button>
              <button
                type="button"
                onClick={() => setAuthStep('phone')}
                className="w-full text-xs text-slate-500 hover:text-[#1F2A7C] cursor-pointer"
              >
                মোবাইল নম্বর পরিবর্তন করুন
              </button>
            </form>
          )}

          {authStep === 'done' && (
            <div className="text-center py-4 space-y-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div>
                <h3 className="font-bold text-base text-[#141A38]">
                  স্বাগতম, {studentName}!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  তোমার অ্যাকাউন্ট সফলভাবে যাচাইকৃত হয়েছে।
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('student-dashboard')}
                  className="w-full bg-[#1F2A7C] text-white font-bold text-xs py-2.5 rounded-lg cursor-pointer"
                >
                  স্টুডেন্ট ড্যাশবোর্ডে যাও
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('admin-dashboard')}
                  className="w-full bg-slate-100 text-[#141A38] font-semibold text-xs py-2.5 rounded-lg cursor-pointer"
                >
                  অ্যাডমিন প্যানেল দেখুন
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <button
              type="button"
              onClick={() => navigateTo('student-dashboard')}
              className="text-[#1F2A7C] font-semibold hover:underline cursor-pointer"
            >
              সরাসরি স্টুডেন্ট ড্যাশবোর্ড ডেমো →
            </button>
            <button
              type="button"
              onClick={() => navigateTo('admin-dashboard')}
              className="text-slate-600 font-semibold hover:underline cursor-pointer"
            >
              অ্যাডমিন ভিউ →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // PAGE 15: ভর্তি / চেকআউট
  // =========================================================================
  if (activePage === 'checkout') {
    const activeBatch =
      batches.find((b) => b.id === selectedBatchId) || batches[0];
    const baseFee = selectedCheckoutItem
      ? selectedCheckoutItem.fee
      : activeBatch.fee;
    const itemTitle = selectedCheckoutItem
      ? selectedCheckoutItem.title
      : activeBatch.title;
    const finalPayable = Math.max(0, baseFee - discountAmount);

    const applyCoupon = () => {
      const found = coupons.find(
        (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase()
      );
      if (found) {
        setDiscountAmount(found.discount);
      } else {
        setDiscountAmount(200);
      }
    };

    return (
      <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto w-full">
        {checkoutDone ? (
          <div className="bg-white rounded-xl p-8 border border-slate-200 border-t-4 border-t-emerald-500 max-w-xl mx-auto text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-[#141A38]">
              অভিনন্দন! তোমার ভর্তি সফলভাবে সম্পন্ন হয়েছে
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              কোর্স/ব্যাচ: <span className="font-bold">{itemTitle}</span> · পরিশোধিত ফি:{' '}
              <span className="font-bold">৳{finalPayable}</span> ({paymentMethod.toUpperCase()})
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => navigateTo('student-dashboard')}
                className="bg-[#1F2A7C] text-white font-bold text-xs px-6 py-2.5 rounded-lg cursor-pointer"
              >
                স্টুডেন্ট ড্যাশবোর্ডে ক্লাস শুরু করো
              </button>
              <button
                type="button"
                onClick={() => setCheckoutDone(false)}
                className="border border-slate-200 text-xs font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
              >
                রিসিট দেখুন
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Cols: Steps */}
            <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623] space-y-6">
              <div>
                <h2 className="text-base font-bold text-[#141A38]">
                  ধাপ ১: ব্যাচ বা কোর্স নির্বাচন
                </h2>
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs text-[#141A38] focus:outline-none focus:border-[#1F2A7C]"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} — ৳{b.fee} ({b.status})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-[#141A38] mb-3">
                  ধাপ ২: শিক্ষার্থীর তথ্য
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      শিক্ষার্থীর নাম
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="text"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs tabular-nums"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      স্কুল / কলেজের নাম ও ঠিকানা (প্রিন্টেড বই পাঠানোর জন্য)
                    </label>
                    <input
                      type="text"
                      value={buyerCollege}
                      onChange={(e) => setBuyerCollege(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-[#141A38] mb-3">
                  ধাপ ৩: পেমেন্ট মাধ্যম নির্বাচন করো
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {id: 'bkash', label: 'বিকাশ (bKash)', sub: 'ইনস্ট্যান্ট পেমেন্ট'},
                    {id: 'nagad', label: 'নগদ (Nagad)', sub: 'ক্যাশব্যাক অফার'},
                    {id: 'card', label: 'ভিসা / মাস্টারকার্ড', sub: 'ডেবিট ও ক্রেডিট কার্ড'},
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() =>
                        setPaymentMethod(pm.id as 'bkash' | 'nagad' | 'card')
                      }
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'border-[#1F2A7C] bg-[#EEF1FA]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <p className="font-bold text-xs text-[#141A38]">
                        {pm.label}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {pm.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Summary Card */}
            <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200 sticky top-20 space-y-4">
              <h3 className="font-bold text-base text-[#141A38] pb-3 border-b border-slate-100">
                ভর্তি সামারি
              </h3>
              <div>
                <p className="text-xs font-bold text-[#1F2A7C]">{itemTitle}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  লাইভ ক্লাস + প্রিন্টেড শিট + ২৪/৭ ডাউট সলভ + মডেল টেস্ট
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="কুপন কোড (যেমন: INFINITY20)"
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-slate-100 hover:bg-slate-200 text-[#141A38] text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer"
                >
                  অ্যাপ্লাই
                </button>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>কোর্স / ব্যাচ ফি</span>
                  <span className="tabular-nums font-semibold">৳{baseFee}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>বিশেষ ছাড় / কুপন</span>
                  <span className="tabular-nums font-semibold">
                    - ৳{discountAmount}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#141A38] pt-2 border-t border-slate-100">
                  <span>সর্বমোট পরিশোধযোগ্য</span>
                  <span className="tabular-nums text-[#1F2A7C]">
                    ৳{finalPayable}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutDone(true)}
                className="w-full bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-xs py-3 rounded-lg transition-colors cursor-pointer"
              >
                ৳{finalPayable} পেমেন্ট ও ভর্তি সম্পন্ন করুন
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>১০০% নিরাপদ SSL এনক্রিপ্টেড পেমেন্ট গেটওয়ে</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // PAGE 16: স্টুডেন্ট ড্যাশবোর্ড (বাম সাইডবার মেনুসহ)
  // =========================================================================
  if (activePage === 'student-dashboard') {
    return (
      <div className="py-8 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar Menu */}
          <aside className="md:col-span-3 bg-white rounded-xl p-4 border border-slate-200 border-t-4 border-t-[#1F2A7C]">
            <div className="flex items-center gap-3 pb-4 mb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-[#1F2A7C] text-white font-bold text-xs flex items-center justify-center">
                তাই
              </div>
              <div>
                <p className="font-bold text-xs text-[#141A38]">
                  {studentName}
                </p>
                <p className="text-[11px] text-slate-500">
                  এইচএসসি ২০২৬ · বিজ্ঞান
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                {
                  id: 'courses',
                  label: 'আমার কোর্স ও লাইভ ক্লাস',
                  icon: Video,
                },
                {
                  id: 'recorded',
                  label: 'রেকর্ডেড ক্লাস ও রিসোর্স',
                  icon: BookOpen,
                },
                {
                  id: 'quiz',
                  label: 'কুইজ / পরীক্ষা ও রেজাল্ট',
                  icon: CheckSquare,
                },
                {
                  id: 'doubt',
                  label: '২৪/৭ ডাউট সলভ (AI ও টিকেট)',
                  icon: MessageCircle,
                },
                {
                  id: 'payments',
                  label: 'পেমেন্ট হিস্টরি',
                  icon: CreditCard,
                },
                {
                  id: 'profile',
                  label: 'আমার প্রোফাইল',
                  icon: User,
                },
              ].map((item) => {
                const Icon = item.icon;
                const active = studentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setStudentTab(
                        item.id as
                          | 'courses'
                          | 'recorded'
                          | 'quiz'
                          | 'doubt'
                          | 'payments'
                          | 'profile'
                      )
                    }
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#1F2A7C] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Main Content */}
          <div className="md:col-span-9 space-y-6">
            {studentTab === 'courses' && (
              <>
                {/* Today's Live Class Banner */}
                <div className="bg-[#1F2A7C] text-white rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="inline-block bg-[#F5A623] text-[#141A38] text-[10px] font-bold px-2.5 py-0.5 rounded mb-2">
                      আজকের লাইভ সুপার ক্লাস · রাত ৮:০০টা
                    </span>
                    <h3 className="text-base sm:text-lg font-bold">
                      পদার্থবিজ্ঞান ১ম পত্র: গতিবিদ্যা ও প্রাসের গাণিতিক সমস্যা
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      শিক্ষক: ড. তানভীর আহমেদ (BUET)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStudentTab('recorded')}
                    className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-xs px-5 py-2.5 rounded-lg shrink-0 cursor-pointer"
                  >
                    ক্লাসে জয়েন করো
                  </button>
                </div>

                {/* Enrolled Courses */}
                <div>
                  <h3 className="font-bold text-base text-[#141A38] mb-3">
                    আমার ভর্তিকৃত ব্যাচ ও কোর্সসমূহ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-[#F5A623]">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        চলমান ব্যাচ
                      </span>
                      <h4 className="font-bold text-sm text-[#141A38] mt-2">
                        এইচএসসি ২০২৬ পূর্ণাঙ্গ একাডেমিক ব্যাচ (বিজ্ঞান)
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        সম্পন্ন: ৪২/১৮০ ক্লাস (২৩%)
                      </p>
                      <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                        <div className="w-1/4 h-full bg-[#1F2A7C] rounded-full" />
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-[#F5A623]">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        স্কিল কোর্স
                      </span>
                      <h4 className="font-bold text-sm text-[#141A38] mt-2">
                        স্পোকেন ইংলিশ ও প্রেজেন্টেশন মাস্টারক্লাস
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        সম্পন্ন: ২৮/৪৫ লেসন (৬২%)
                      </p>
                      <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                        <div className="w-3/5 h-full bg-[#F5A623] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {studentTab === 'recorded' && (
              <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-5">
                <h3 className="font-bold text-base text-[#141A38]">
                  রেকর্ডেড ক্লাস আর্কাইভ ও লেকচার শিট (PDF)
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      title: 'লেকচার ১৪: ভেক্টর ক্যালকুলাস (গ্রেডিয়েন্ট, ডাইভারজেন্স ও কার্ল)',
                      teacher: 'ড. তানভীর আহমেদ',
                      duration: '১ ঘণ্টা ১৫ মিনিট',
                    },
                    {
                      title: 'লেকচার ১৩: নদী ও নৌকার ন্যূনতম দূরত্ব ও ন্যূনতম সময়',
                      teacher: 'ড. তানভীর আহমেদ',
                      duration: '১ ঘণ্টা ০৫ মিনিট',
                    },
                    {
                      title: 'লেকচার ১২: বোর পরমাণু মডেল ও বর্ণালি রেখা বিশ্লেষণ',
                      teacher: 'রাফসান জানি',
                      duration: '৫৫ মিনিট',
                    },
                  ].map((rec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#F8F9FC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center shrink-0">
                          <PlaySquare className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#141A38]">
                            {rec.title}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {rec.teacher} · {rec.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          className="bg-[#1F2A7C] text-white text-[11px] font-semibold px-3 py-1.5 rounded-md cursor-pointer"
                        >
                          ভিডিও দেখুন
                        </button>
                        <button
                          type="button"
                          className="border border-slate-200 bg-white text-[#141A38] text-[11px] font-semibold px-3 py-1.5 rounded-md flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>নোট PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {studentTab === 'quiz' && (
              <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-bold text-base text-[#141A38]">
                      অধ্যায়ভিত্তিক কুইজ ও মডেল টেস্ট রেজাল্ট
                    </h3>
                    <p className="text-xs text-slate-500">
                      গত সপ্তাহের পরীক্ষায় তোমার মেধাক্রম: ২৪তম (৩,৪০০ শিক্ষার্থীর মধ্যে)
                    </p>
                  </div>
                  <span className="bg-[#EEF1FA] text-[#1F2A7C] text-xs font-bold px-3 py-1.5 rounded-lg">
                    গড় নম্বর: ৮৮%
                  </span>
                </div>

                <div className="space-y-4">
                  {DASHBOARD_QUIZ.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F8F9FC] border border-slate-200"
                    >
                      <p className="font-bold text-xs text-[#141A38]">
                        {item.q}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {item.options.map((opt, oIdx) => {
                          const selected = quizAns[idx] === oIdx;
                          const correct = item.answer === oIdx;
                          let cls =
                            'border-slate-200 bg-white text-slate-700 hover:border-[#1F2A7C]';
                          if (quizSubmitted) {
                            if (correct)
                              cls =
                                'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                            else if (selected)
                              cls = 'border-red-400 bg-red-50 text-red-700';
                          } else if (selected) {
                            cls =
                              'border-[#1F2A7C] bg-[#EEF1FA] text-[#1F2A7C] font-bold';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={quizSubmitted}
                              onClick={() =>
                                setQuizAns((prev) => ({...prev, [idx]: oIdx}))
                              }
                              className={`text-left text-xs px-3 py-2 rounded-lg border transition-colors cursor-pointer ${cls}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizSubmitted && (
                        <p className="text-[11px] text-slate-600 mt-2.5 pt-2 border-t border-slate-200">
                          <span className="font-bold text-[#1F2A7C]">
                            ব্যাখ্যা:
                          </span>{' '}
                          {item.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-3">
                  {quizSubmitted && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuizAns({});
                        setQuizSubmitted(false);
                      }}
                      className="text-xs font-semibold text-slate-600 hover:underline cursor-pointer"
                    >
                      আবার পরীক্ষা দাও
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setQuizSubmitted(true)}
                    className="bg-[#1F2A7C] text-white text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer"
                  >
                    উত্তর সাবমিট করো
                  </button>
                </div>
              </div>
            )}

            {studentTab === 'doubt' && (
              <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-[#1F2A7C] text-[#F5A623] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#141A38]">
                      ২৪/৭ ডাউট সলভ ও টিকেট সাপোর্ট (High-Thinking AI Mentor)
                    </h3>
                    <p className="text-xs text-slate-500">
                      যেকোনো জটিল গাণিতিক বা তাত্ত্বিক প্রশ্ন লিখে পাঠাও — তাৎক্ষণিক ধাপে ধাপে সমাধান পাও
                    </p>
                  </div>
                </div>

                <form onSubmit={handleDoubtAsk} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={doubtGrade}
                      onChange={(e) => setDoubtGrade(e.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs"
                    >
                      <option value="এইচএসসি">এইচএসসি</option>
                      <option value="এসএসসি">এসএসসি</option>
                      <option value="নবম শ্রেণি">নবম শ্রেণি</option>
                      <option value="ভর্তি প্রস্তুতি">ভর্তি প্রস্তুতি</option>
                    </select>
                    <select
                      value={doubtSubject}
                      onChange={(e) => setDoubtSubject(e.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs"
                    >
                      <option value="পদার্থবিজ্ঞান">পদার্থবিজ্ঞান</option>
                      <option value="উচ্চতর গণিত">উচ্চতর গণিত</option>
                      <option value="রসায়ন">রসায়ন</option>
                      <option value="জীববিজ্ঞান">জীববিজ্ঞান</option>
                      <option value="ইংরেজি">ইংরেজি</option>
                    </select>
                  </div>

                  <textarea
                    rows={3}
                    value={doubtQuestion}
                    onChange={(e) => setDoubtQuestion(e.target.value)}
                    placeholder="তোমার প্রশ্নটি বিস্তারিত লেখো..."
                    className="w-full rounded-lg border border-slate-200 p-3 text-xs focus:outline-none focus:border-[#1F2A7C]"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={doubtLoading || !doubtQuestion.trim()}
                      className="bg-[#1F2A7C] hover:bg-[#161e5c] disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      {doubtLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>গভীরভাবে সমাধান তৈরি হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>প্রশ্ন পাঠাও</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {doubtError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {doubtError}
                  </div>
                )}

                {doubtAnswer && (
                  <div className="p-4 rounded-xl bg-[#F8F9FC] border border-slate-200 text-xs text-[#141A38] whitespace-pre-wrap leading-relaxed">
                    {doubtAnswer}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-xs text-slate-700 mb-3">
                    তোমার সাম্প্রতিক ডাউট টিকেটসমূহ
                  </h4>
                  <div className="space-y-2">
                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 rounded-lg bg-[#F8F9FC] border border-slate-200 flex items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <span className="font-bold text-[#1F2A7C]">
                            [{t.id}] {t.subject}:
                          </span>{' '}
                          <span className="text-slate-700">{t.question}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {t.date}
                          </p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded shrink-0">
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {studentTab === 'payments' && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-base text-[#141A38] mb-4">
                  পেমেন্ট হিস্টরি ও ইনভয়েস
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2.5 pr-4">ট্রানজেকশন আইডি</th>
                        <th className="py-2.5 pr-4">কোর্স / ব্যাচ</th>
                        <th className="py-2.5 pr-4">মাধ্যম</th>
                        <th className="py-2.5 pr-4">পরিমাণ</th>
                        <th className="py-2.5">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 tabular-nums">
                      <tr>
                        <td className="py-3 pr-4 font-semibold">#INF-89210</td>
                        <td className="py-3 pr-4">এইচএসসি ২০২৬ বিজ্ঞান ব্যাচ</td>
                        <td className="py-3 pr-4">bKash</td>
                        <td className="py-3 pr-4 font-bold">৳৩,৫০০</td>
                        <td className="py-3">
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                            পরিশোধিত
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-semibold">#INF-74102</td>
                        <td className="py-3 pr-4">স্পোকেন ইংলিশ মাস্টারক্লাস</td>
                        <td className="py-3 pr-4">Nagad</td>
                        <td className="py-3 pr-4 font-bold">৳১,২৫০</td>
                        <td className="py-3">
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                            পরিশোধিত
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {studentTab === 'profile' && (
              <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                <h3 className="font-bold text-base text-[#141A38]">
                  শিক্ষার্থী প্রোফাইল সেটিংস
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      পূর্ণ নাম
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 tabular-nums"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-600 mb-1">
                      শিক্ষা প্রতিষ্ঠান
                    </label>
                    <input
                      type="text"
                      value={buyerCollege}
                      onChange={(e) => setBuyerCollege(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-[#1F2A7C] text-white text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer"
                >
                  প্রোফাইল আপডেট করো
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // PAGE 17: অ্যাডমিন ড্যাশবোর্ড (পরিসংখ্যান কার্ড + চার্ট)
  // =========================================================================
  if (activePage === 'admin-dashboard') {
    const monthlyBars = [
      {month: 'মে', val: 55, amount: '৳৪.২ লাখ'},
      {month: 'জুন', val: 68, amount: '৳৫.১ লাখ'},
      {month: 'জুলাই', val: 74, amount: '৳৫.৮ লাখ'},
      {month: 'আগস্ট', val: 82, amount: '৳৬.৪ লাখ'},
      {month: 'সেপ্টেম্বর', val: 91, amount: '৳৭.২ লাখ'},
      {month: 'অক্টোবর', val: 100, amount: '৳৮.৫ লাখ'},
    ];

    return (
      <div className="py-8 px-4 sm:px-8 max-w-6xl mx-auto w-full space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#141A38]">
              অ্যাডমিন ওভারভিউ ড্যাশবোর্ড
            </h2>
            <p className="text-xs text-slate-500">
              ইনফিনিটি একাডেমির মোট শিক্ষার্থী, ভর্তি, পেমেন্ট ও কোর্স পরিসংখ্যান
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('admin-manage')}
            className="bg-[#F5A623] text-[#141A38] font-bold text-xs px-4 py-2.5 rounded-lg cursor-pointer"
          >
            কোর্স, ব্যাচ ও সাইট ম্যানেজ করুন →
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'মোট নিবন্ধিত শিক্ষার্থী',
              val: '২৪,৮৫০',
              delta: '+১২% এই মাসে',
              icon: Users,
            },
            {
              title: 'সক্রিয় একাডেমিক ও স্কিল ব্যাচ',
              val: `${batches.length + courses.length}টি`,
              delta: 'সবগুলো সচল',
              icon: Layers,
            },
            {
              title: 'চলতি মাসের টিউশন ও কোর্স ফি',
              val: '৳৮,৫৪,২০০',
              delta: '+১৮.৪% প্রবৃদ্ধি',
              icon: TrendingUp,
            },
            {
              title: '২৪/৭ ডাউট সলভ সমাধান হার',
              val: '৯৮.৬%',
              delta: 'গড় সময় ২ মিনিট',
              icon: Award,
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-slate-200 border-t-4 border-t-[#F5A623]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {stat.title}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#141A38] mt-2 tabular-nums">
                  {stat.val}
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  {stat.delta}
                </p>
              </div>
            );
          })}
        </div>

        {/* Chart + Recent Enrollments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Monthly Revenue Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-sm text-[#141A38] mb-1">
              মাসিক ভর্তি ও রেভিনিউ চার্ট (২০২৬)
            </h3>
            <p className="text-[11px] text-slate-500 mb-6">
              বিগত ৬ মাসের অনলাইন ও অফলাইন ব্যাচে ভর্তির প্রবৃদ্ধি
            </p>
            <div className="grid grid-cols-6 gap-3 items-end h-44 pt-4 px-2 border-b border-slate-200">
              {monthlyBars.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-end h-full gap-1.5"
                >
                  <span className="text-[10px] font-bold text-[#1F2A7C] tabular-nums">
                    {b.amount}
                  </span>
                  <div
                    className="w-full max-w-[42px] bg-[#1F2A7C] hover:bg-[#F5A623] transition-colors rounded-t-md"
                    style={{height: `${b.val}%`}}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-6 gap-3 pt-2 text-center text-[11px] font-semibold text-slate-600">
              {monthlyBars.map((b, i) => (
                <span key={i}>{b.month}</span>
              ))}
            </div>
          </div>

          {/* Batch Distribution */}
          <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200 space-y-4">
            <h3 className="font-bold text-sm text-[#141A38]">
              ব্যাচভিত্তিক শিক্ষার্থী অংশগ্রহণ
            </h3>
            {[
              {name: 'এইচএসসি ২০২৬ বিজ্ঞান ব্যাচ', pct: 42, count: '১০,৪০০ জন'},
              {name: 'এসএসসি ফাইনাল রিভিশন ব্যাচ', pct: 28, count: '৬,৯৫০ জন'},
              {name: 'স্পোকেন ইংলিশ ও IELTS', pct: 18, count: '৪,৫০০ জন'},
              {name: 'মেডিকেল ও ইঞ্জিনিয়ারিং ভর্তি', pct: 12, count: '৩,০০০ জন'},
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#141A38]">
                    {row.name}
                  </span>
                  <span className="text-slate-500 tabular-nums">
                    {row.count} ({row.pct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F5A623] rounded-full"
                    style={{width: `${row.pct}%`}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // PAGE 18: অ্যাডমিন ম্যানেজমেন্ট প্যানেল (কোর্স, পেমেন্ট, ব্লগ, CMS, কুপন)
  // =========================================================================
  return (
    <div className="py-8 px-4 sm:px-8 max-w-6xl mx-auto w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#141A38]">
            কোর্স, ব্যাচ ও ওয়েবসাইট কন্ট্রোল প্যানেল
          </h2>
          <p className="text-xs text-slate-500">
            এখান থেকে কোনো ব্যাচ, স্ট্যাটাস ব্যাজ, নোটিশ বা রিভিউ পরিবর্তন করলে তা সাথে সাথে ওয়েবসাইটে আপডেট হবে
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
          {[
            {id: 'batches', label: 'কোর্স ও ব্যাচ ম্যানেজ'},
            {id: 'students', label: 'শিক্ষার্থী ও পেমেন্ট'},
            {id: 'blogs', label: 'ব্লগ ও নোটিশ'},
            {id: 'cms', label: 'হিরো ও রিভিউ এডিট'},
            {id: 'coupons', label: 'কুপন কোড'},
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                setAdminTab(
                  t.id as
                    | 'batches'
                    | 'students'
                    | 'blogs'
                    | 'cms'
                    | 'coupons'
                )
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                adminTab === t.id
                  ? 'bg-[#1F2A7C] text-white'
                  : 'text-slate-600 hover:text-[#141A38]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Batches Management */}
      {adminTab === 'batches' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623] space-y-4">
            <h3 className="font-bold text-sm text-[#141A38] flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#1F2A7C]" />
              <span>নতুন একাডেমিক ব্যাচ যোগ করুন</span>
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newBatchTitle.trim()) return;
                setBatches((prev) => [
                  {
                    id: `batch-${Date.now()}`,
                    title: newBatchTitle.trim(),
                    classLevel: newBatchClass,
                    group: 'বিজ্ঞান ও সাধারণ বিভাগ',
                    subject: 'সকল আবশ্যিক বিষয়',
                    fee: Number(newBatchFee) || 2500,
                    schedule: 'রবি, মঙ্গল, বৃহস্পতি (রাত ৮:০০টা)',
                    duration: '৬ মাস',
                    liveClassesCount: '১০০+ লাইভ ক্লাস',
                    status: newBatchStatus,
                    teachers: ['ড. তানভীর আহমেদ (BUET)'],
                    syllabus: [
                      {
                        chapter: 'অধ্যায় ১: মৌলিক ধারণা ও গাণিতিক সমস্যা',
                        topics: ['মূল তত্ত্ব', 'বোর্ড প্রশ্ন সমাধান'],
                        lectures: 12,
                      },
                    ],
                  },
                  ...prev,
                ]);
                setNewBatchTitle('');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  ব্যাচের নাম
                </label>
                <input
                  type="text"
                  required
                  value={newBatchTitle}
                  onChange={(e) => setNewBatchTitle(e.target.value)}
                  placeholder="যেমন: এইচএসসি ২০২৬ ফাইনাল মডেল টেস্ট ব্যাচ"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    শ্রেণি
                  </label>
                  <select
                    value={newBatchClass}
                    onChange={(e) =>
                      setNewBatchClass(
                        e.target.value as AcademicBatch['classLevel']
                      )
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2"
                  >
                    <option value="এইচএসসি">এইচএসসি</option>
                    <option value="এসএসসি">এসএসসি</option>
                    <option value="নবম শ্রেণি">নবম শ্রেণি</option>
                    <option value="ষষ্ঠ–অষ্টম শ্রেণি">ষষ্ঠ–অষ্টম শ্রেণি</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    কোর্স ফি (৳)
                  </label>
                  <input
                    type="number"
                    value={newBatchFee}
                    onChange={(e) => setNewBatchFee(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 tabular-nums"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  ভর্তি স্ট্যাটাস ব্যাজ
                </label>
                <select
                  value={newBatchStatus}
                  onChange={(e) =>
                    setNewBatchStatus(e.target.value as BatchStatus)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2"
                >
                  <option value="ভর্তি চলছে">ভর্তি চলছে (সবুজ ব্যাজ)</option>
                  <option value="শীঘ্রই আসছে">শীঘ্রই আসছে (হলুদ ব্যাজ)</option>
                  <option value="ভর্তি বন্ধ">ভর্তি বন্ধ (লাল ব্যাজ)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1F2A7C] text-white font-bold py-2.5 rounded-lg cursor-pointer"
              >
                ব্যাচ সংরক্ষণ করুন
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 space-y-3">
            <h3 className="font-bold text-sm text-[#141A38]">
              বর্তমান ব্যাচসমূহ ও স্ট্যাটাস পরিবর্তন
            </h3>
            <div className="space-y-2.5">
              {batches.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-[#F8F9FC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-bold text-[#141A38]">{b.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {b.classLevel} · ফি: ৳{b.fee}
                    </p>
                  </div>
                  <select
                    value={b.status}
                    onChange={(e) => {
                      const nextStatus = e.target.value as BatchStatus;
                      setBatches((prev) =>
                        prev.map((item) =>
                          item.id === b.id ? {...item, status: nextStatus} : item
                        )
                      );
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1F2A7C]"
                  >
                    <option value="ভর্তি চলছে">ভর্তি চলছে</option>
                    <option value="শীঘ্রই আসছে">শীঘ্রই আসছে</option>
                    <option value="ভর্তি বন্ধ">ভর্তি বন্ধ</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Students & Payments */}
      {adminTab === 'students' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="font-bold text-sm text-[#141A38] mb-4">
            সাম্প্রতিক শিক্ষার্থী ভর্তি ও পেমেন্ট অনুমোদন তালিকা
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2.5 pr-4">শিক্ষার্থীর নাম</th>
                  <th className="py-2.5 pr-4">মোবাইল</th>
                  <th className="py-2.5 pr-4">ভর্তিকৃত ব্যাচ</th>
                  <th className="py-2.5 pr-4">পেমেন্ট</th>
                  <th className="py-2.5">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums">
                {[
                  {
                    name: 'নাফিস ইকবাল',
                    phone: '01711-223344',
                    batch: 'এইচএসসি ২০২৬ বিজ্ঞান ব্যাচ',
                    amount: '৳৩,৫০০ (bKash)',
                    status: 'অনুমোদিত',
                  },
                  {
                    name: 'তাসনিম জারিন',
                    phone: '01819-556677',
                    batch: 'এসএসসি দশম শ্রেণি রিভিশন',
                    amount: '৳২,৫০০ (Nagad)',
                    status: 'অনুমোদিত',
                  },
                  {
                    name: 'মেহেদী হাসান রাকিব',
                    phone: '01914-889900',
                    batch: 'আইইএলটিএস ৭.৫+ ব্যান্ড কোর্স',
                    amount: '৳২,২০০ (Card)',
                    status: 'অনুমোদিত',
                  },
                ].map((st, idx) => (
                  <tr key={idx}>
                    <td className="py-3 pr-4 font-bold text-[#141A38]">
                      {st.name}
                    </td>
                    <td className="py-3 pr-4">{st.phone}</td>
                    <td className="py-3 pr-4">{st.batch}</td>
                    <td className="py-3 pr-4 font-semibold">{st.amount}</td>
                    <td className="py-3">
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded">
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Blogs & Notices */}
      {adminTab === 'blogs' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newBlogTitle.trim()) return;
              setBlogs((prev) => [
                {
                  id: `b-${Date.now()}`,
                  title: newBlogTitle.trim(),
                  category: newBlogCategory,
                  date: '১০ অক্টোবর ২০২৬',
                  summary:
                    newBlogSummary.trim() ||
                    'বিস্তারিত নোটিশ ও রুটিন ড্যাশবোর্ডে যুক্ত করা হয়েছে।',
                  content:
                    newBlogSummary.trim() ||
                    'বিস্তারিত নোটিশ ও রুটিন ড্যাশবোর্ডে যুক্ত করা হয়েছে।',
                },
                ...prev,
              ]);
              setNewBlogTitle('');
              setNewBlogSummary('');
            }}
            className="md:col-span-5 bg-white rounded-xl p-6 border border-slate-200 space-y-3 text-xs"
          >
            <h3 className="font-bold text-sm text-[#141A38]">
              নতুন ব্লগ বা নোটিশ প্রকাশ করুন
            </h3>
            <input
              type="text"
              required
              value={newBlogTitle}
              onChange={(e) => setNewBlogTitle(e.target.value)}
              placeholder="নোটিশ বা আর্টিকেলের শিরোনাম"
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
            />
            <select
              value={newBlogCategory}
              onChange={(e) =>
                setNewBlogCategory(
                  e.target.value as BlogNoticeItem['category']
                )
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option value="নোটিশ">নোটিশ</option>
              <option value="পরীক্ষার রুটিন">পরীক্ষার রুটিন</option>
              <option value="প্রস্তুতি গাইড">প্রস্তুতি গাইড</option>
            </select>
            <textarea
              rows={3}
              value={newBlogSummary}
              onChange={(e) => setNewBlogSummary(e.target.value)}
              placeholder="সংক্ষিপ্ত বিবরণ লিখুন..."
              className="w-full rounded-lg border border-slate-200 p-3"
            />
            <button
              type="submit"
              className="w-full bg-[#1F2A7C] text-white font-bold py-2.5 rounded-lg cursor-pointer"
            >
              প্রকাশ করুন
            </button>
          </form>

          <div className="md:col-span-7 bg-white rounded-xl p-6 border border-slate-200 space-y-3">
            <h3 className="font-bold text-sm text-[#141A38]">
              প্রকাশিত নোটিশ ও ব্লগসমূহ ({blogs.length})
            </h3>
            {blogs.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-[#F8F9FC] border border-slate-200 text-xs"
              >
                <span className="text-[10px] font-bold text-[#1F2A7C]">
                  {b.category} · {b.date}
                </span>
                <p className="font-bold text-[#141A38] mt-1">{b.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Hero & Testimonial Editor */}
      {adminTab === 'cms' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 bg-white rounded-xl p-6 border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-[#141A38]">
              হোমপেজ হিরো সাবটাইটেল এডিট করুন
            </h3>
            <textarea
              rows={3}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-3"
            />
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="bg-[#F5A623] text-[#141A38] font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              হোমপেজে প্রিভিউ দেখুন
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newRevName.trim() || !newRevQuote.trim()) return;
              setTestimonials((prev) => [
                {
                  id: `rev-${Date.now()}`,
                  name: newRevName.trim(),
                  institution: newRevInst.trim() || 'ঢাকা কলেজ',
                  batch: 'এইচএসসি ব্যাচ',
                  quote: newRevQuote.trim(),
                  initials: newRevName.trim().slice(0, 2),
                },
                ...prev,
              ]);
              setNewRevName('');
              setNewRevInst('');
              setNewRevQuote('');
            }}
            className="md:col-span-6 bg-white rounded-xl p-6 border border-slate-200 space-y-3 text-xs"
          >
            <h3 className="font-bold text-sm text-[#141A38]">
              নতুন শিক্ষার্থী রিভিউ যোগ করুন
            </h3>
            <input
              type="text"
              required
              value={newRevName}
              onChange={(e) => setNewRevName(e.target.value)}
              placeholder="শিক্ষার্থীর নাম"
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
            />
            <input
              type="text"
              value={newRevInst}
              onChange={(e) => setNewRevInst(e.target.value)}
              placeholder="প্রতিষ্ঠানের নাম (যেমন: ঢাকা কলেজ)"
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
            />
            <textarea
              rows={2}
              required
              value={newRevQuote}
              onChange={(e) => setNewRevQuote(e.target.value)}
              placeholder="শিক্ষার্থীর মতামত লিখুন..."
              className="w-full rounded-lg border border-slate-200 p-3"
            />
            <button
              type="submit"
              className="w-full bg-[#1F2A7C] text-white font-bold py-2.5 rounded-lg cursor-pointer"
            >
              রিভিউ যুক্ত করুন
            </button>
          </form>
        </div>
      )}

      {/* Tab 5: Coupons */}
      {adminTab === 'coupons' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4 max-w-xl">
          <h3 className="font-bold text-sm text-[#141A38] flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-[#1F2A7C]" />
            <span>ডিসকাউন্ট কুপন কোড ম্যানেজার</span>
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newCouponCode.trim()) return;
              setCoupons((prev) => [
                ...prev,
                {
                  code: newCouponCode.trim().toUpperCase(),
                  discount: Number(newCouponDisc) || 300,
                  active: true,
                },
              ]);
              setNewCouponCode('');
            }}
            className="flex gap-2 text-xs"
          >
            <input
              type="text"
              value={newCouponCode}
              onChange={(e) => setNewCouponCode(e.target.value)}
              placeholder="কুপন কোড (যেমন: EID500)"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2"
            />
            <input
              type="number"
              value={newCouponDisc}
              onChange={(e) => setNewCouponDisc(e.target.value)}
              placeholder="ছাড় (৳)"
              className="w-28 rounded-lg border border-slate-200 px-3 py-2 tabular-nums"
            />
            <button
              type="submit"
              className="bg-[#1F2A7C] text-white font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              যোগ করুন
            </button>
          </form>

          <div className="space-y-2 text-xs">
            {coupons.map((c, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#F8F9FC] border border-slate-200 flex items-center justify-between"
              >
                <span className="font-bold text-[#1F2A7C]">{c.code}</span>
                <span className="tabular-nums font-semibold">
                  ৳{c.discount} ছাড়
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  সক্রিয়
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
