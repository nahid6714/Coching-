'use client';

import React, {useState, Suspense} from 'react';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {ALL_COURSES, DEMO_APPLICATIONS, AdmissionApplication} from '@/lib/academy-data';
import {useAcademyCourses} from '@/lib/use-academy-courses';
import {CheckCircle2, PhoneCall, ArrowRight} from 'lucide-react';

function EnrollFormContent() {
  const courses = useAcademyCourses();
  const searchParams = useSearchParams();
  const initialCourseTitle =
    searchParams.get('course') || ALL_COURSES[0].title;

  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [address, setAddress] = useState('');
  const [className, setClassName] = useState('');
  const [courseTitle, setCourseTitle] = useState(initialCourseTitle);
  const [submittedApp, setSubmittedApp] =
    useState<AdmissionApplication | null>(null);

  const selectedCourseObj =
    courses.find((c) => c.title === courseTitle) || courses[0] || ALL_COURSES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: AdmissionApplication = {
      id: `APP-${Date.now().toString().slice(-6)}`,
      studentName: studentName.trim(),
      phone: phone.trim(),
      guardianPhone: guardianPhone.trim(),
      courseTitle: selectedCourseObj.title,
      className: className.trim() || selectedCourseObj.className,
      institution: institution.trim(),
      address: address.trim(),
      createdAt: new Date().toLocaleString('bn-BD'),
    };

    try {
      const existingRaw = localStorage.getItem(
        'infinity_academy_applications'
      );
      const existing: AdmissionApplication[] = existingRaw
        ? JSON.parse(existingRaw)
        : DEMO_APPLICATIONS;
      localStorage.setItem(
        'infinity_academy_applications',
        JSON.stringify([newApplication, ...existing])
      );
    } catch {
      // Ignore storage errors in restricted environments
    }

    setSubmittedApp(newApplication);
  };

  if (submittedApp) {
    return (
      <main className="flex-1 py-12 px-4 sm:px-8 max-w-xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 border-t-4 border-t-emerald-600 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#141A38]">
            ধন্যবাদ! আপনার আবেদন জমা হয়েছে
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            আমাদের প্রতিনিধি খুব শীঘ্রই আপনার{' '}
            <span className="font-bold text-[#1F2A7C]">
              {submittedApp.phone}
            </span>{' '}
            নম্বরে কল করে বিস্তারিত জানিয়ে ভর্তি কনফার্ম করবেন।
          </p>

          <div className="bg-[#F8F9FC] rounded-xl p-5 border border-slate-200 text-left space-y-2.5 text-base text-slate-700">
            <p>
              <span className="font-bold text-[#141A38]">শিক্ষার্থীর নাম:</span>{' '}
              {submittedApp.studentName}
            </p>
            <p>
              <span className="font-bold text-[#141A38]">মোবাইল নম্বর:</span>{' '}
              {submittedApp.phone}
            </p>
            <p>
              <span className="font-bold text-[#141A38]">নির্বাচিত কোর্স:</span>{' '}
              {submittedApp.courseTitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/courses"
              className="bg-[#1F2A7C] hover:bg-[#151d57] text-white font-bold text-base px-6 py-3 rounded-lg transition-colors"
            >
              সব কোর্স দেখুন
            </Link>
            <button
              type="button"
              onClick={() => {
                setSubmittedApp(null);
                setStudentName('');
                setPhone('');
                setGuardianPhone(''); setInstitution(''); setAddress(''); setClassName('');
              }}
              className="border border-slate-200 hover:bg-slate-50 text-[#141A38] font-bold text-base px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              নতুন আবেদন করুন
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-10 sm:py-14 px-4 sm:px-8 max-w-xl mx-auto w-full">
      {/* 3 Simple Steps Banner */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 text-center">
        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <span className="w-6 h-6 rounded-full bg-[#1F2A7C] text-white text-xs font-bold inline-flex items-center justify-center mb-1">
            ১
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#141A38]">
            ছোট ফর্ম পূরণ
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <span className="w-6 h-6 rounded-full bg-[#F5A623] text-[#141A38] text-xs font-bold inline-flex items-center justify-center mb-1">
            ২
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#141A38]">
            ফোনে কথা বলা
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-slate-200">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold inline-flex items-center justify-center mb-1">
            ৩
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#141A38]">
            ভর্তি কনফার্ম
          </p>
        </div>
      </div>

      {/* Short 3-Field Form Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-9 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-[#141A38]">
            ভর্তি হওয়ার ফর্ম
          </h2>
          <p className="text-base text-slate-600 mt-1.5 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#1F2A7C] shrink-0" />
            <span>
              শুধু নাম, মোবাইল নম্বর ও কোর্স দিন — আমরাই আপনাকে কল করব।
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Name */}
          <div>
            <label className="block text-base sm:text-lg font-bold text-[#141A38] mb-2">
              ১. শিক্ষার্থীর নাম *
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="তোমার পূর্ণ নাম লেখো"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-base sm:text-lg focus:outline-none focus:border-[#1F2A7C]"
            />
          </div>

          {/* 2. Mobile Number */}
          <div>
            <label className="block text-base sm:text-lg font-bold text-[#141A38] mb-2">
              ২. মোবাইল নম্বর *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-base sm:text-lg focus:outline-none focus:border-[#1F2A7C]"
            />
          </div>

          <div>
            <label className="block text-base sm:text-lg font-bold text-[#141A38] mb-2">অভিভাবকের মোবাইল নম্বর</label>
            <input type="tel" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} placeholder="01XXXXXXXXX (ঐচ্ছিক)" className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-base sm:text-lg focus:outline-none focus:border-[#1F2A7C]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-base font-bold text-[#141A38]">বর্তমান শ্রেণি<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="যেমন: এইচএসসি ১ম বর্ষ" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:border-[#1F2A7C]" /></label>
            <label className="block text-base font-bold text-[#141A38]">শিক্ষাপ্রতিষ্ঠান<input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="প্রতিষ্ঠানের নাম (ঐচ্ছিক)" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:border-[#1F2A7C]" /></label>
          </div>
          <div><label className="block text-base font-bold text-[#141A38] mb-2">ঠিকানা / অতিরিক্ত তথ্য</label><textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="এলাকা, জেলা বা অন্য তথ্য (ঐচ্ছিক)" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:border-[#1F2A7C]" /></div>

          {/* 3. Class / Course */}
          <div>
            <label className="block text-base sm:text-lg font-bold text-[#141A38] mb-2">
              ৩. ক্লাস / পছন্দের কোর্স *
            </label>
            <select
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-base sm:text-lg text-[#141A38] bg-white focus:outline-none focus:border-[#1F2A7C]"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title} ({c.fee})
                </option>
              ))}
            </select>
            <p className="text-sm text-slate-500 mt-2">
              নির্বাচিত ব্যাচের ফি:{' '}
              <span className="font-bold text-[#1F2A7C]">
                {selectedCourseObj.fee}
              </span>{' '}
              · সময়সূচি: {selectedCourseObj.schedule}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span>ভর্তি কনফার্ম করতে জমা দিন</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </main>
  );
}

export default function EnrollPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      <section className="bg-[#1F2A7C] text-white py-9 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            পছন্দের কোর্সে ভর্তি হও
          </h1>
          <p className="text-base sm:text-lg text-slate-200 mt-2">
            মাত্র ৩০ সেকেন্ডে নিচের ৩টি তথ্য দিন, বাকি কাজ আমাদের টিম ফোনে সম্পন্ন করবে।
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="py-16 text-center text-base text-slate-600">
            ফর্ম লোড হচ্ছে...
          </div>
        }
      >
        <EnrollFormContent />
      </Suspense>

      <Footer />
    </div>
  );
}
