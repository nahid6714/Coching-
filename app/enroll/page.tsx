'use client';

import React, {useState, Suspense} from 'react';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {ALL_COURSES, AdmissionApplication} from '@/lib/academy-data';
import {CheckCircle2, PhoneCall} from 'lucide-react';

function EnrollFormContent() {
  const searchParams = useSearchParams();
  const initialCourse =
    searchParams.get('course') || ALL_COURSES[0].title;

  const [courseTitle, setCourseTitle] = useState(initialCourse);
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [className, setClassName] = useState('এইচএসসি');
  const [institution, setInstitution] = useState('');
  const [address, setAddress] = useState('');
  const [submittedApp, setSubmittedApp] =
    useState<AdmissionApplication | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: AdmissionApplication = {
      id: `APP-${Date.now().toString().slice(-6)}`,
      studentName: studentName.trim(),
      phone: phone.trim(),
      guardianPhone: guardianPhone.trim(),
      courseTitle,
      className,
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
        : [];
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
      <main className="flex-1 py-14 px-4 sm:px-8 max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 border-t-4 border-t-emerald-600 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#141A38]">
            আপনার ভর্তির আবেদন সফলভাবে জমা হয়েছে!
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            আপনার দেওয়া তথ্যগুলো আমাদের সিস্টেমে সংরক্ষিত হয়েছে। আমাদের প্রতিনিধি খুব শীঘ্রই আপনার{' '}
            <span className="font-bold text-[#1F2A7C]">
              {submittedApp.phone}
            </span>{' '}
            নম্বরে ফোন করে বিস্তারিত জেনে ভর্তি কনফার্ম করবেন।
          </p>

          <div className="bg-[#F8F9FC] rounded-xl p-5 border border-slate-200 text-left space-y-2 text-base text-slate-700">
            <p>
              <span className="font-bold text-[#141A38]">আবেদন আইডি:</span>{' '}
              {submittedApp.id}
            </p>
            <p>
              <span className="font-bold text-[#141A38]">শিক্ষার্থীর নাম:</span>{' '}
              {submittedApp.studentName}
            </p>
            <p>
              <span className="font-bold text-[#141A38]">নির্বাচিত কোর্স:</span>{' '}
              {submittedApp.courseTitle}
            </p>
            <p>
              <span className="font-bold text-[#141A38]">মোবাইল নম্বর:</span>{' '}
              {submittedApp.phone}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/courses"
              className="bg-[#1F2A7C] hover:bg-[#151d57] text-white font-bold text-base px-6 py-3 rounded-lg transition-colors"
            >
              অন্যান্য কোর্স দেখুন
            </Link>
            <button
              type="button"
              onClick={() => setSubmittedApp(null)}
              className="border border-slate-200 hover:bg-slate-50 text-[#141A38] font-bold text-base px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              নতুন আরেকটি আবেদন করুন
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12 px-4 sm:px-8 max-w-3xl mx-auto w-full">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs">
        <div className="mb-6 pb-5 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-[#141A38]">
            ভর্তি আবেদন ফরম (Admission Form)
          </h2>
          <p className="text-base text-slate-600 mt-1.5 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#1F2A7C] shrink-0" />
            <span>
              নিচের ফরমটি পূরণ করে এপ্লাই করুন — আমাদের টিম আপনাকে ফোনে কল করে ভর্তি চূড়ান্ত করবে।
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Course Selection */}
          <div>
            <label className="block text-base font-bold text-[#141A38] mb-2">
              পছন্দের কোর্স বা ব্যাচ নির্বাচন করুন *
            </label>
            <select
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base text-[#141A38] focus:outline-none focus:border-[#1F2A7C]"
            >
              {ALL_COURSES.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title} — ({c.fee})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-base font-bold text-[#141A38] mb-2">
                শিক্ষার্থীর পূর্ণ নাম *
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="তোমার নাম লেখো"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-[#141A38] mb-2">
                শ্রেণি / বিভাগ *
              </label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base text-[#141A38] focus:outline-none focus:border-[#1F2A7C]"
              >
                <option value="এইচএসসি (বিজ্ঞান)">এইচএসসি (বিজ্ঞান)</option>
                <option value="এইচএসসি (মানবিক / ব্যবসায়)">
                  এইচএসসি (মানবিক / ব্যবসায়)
                </option>
                <option value="এসএসসি (দশম শ্রেণি)">এসএসসি (দশম শ্রেণি)</option>
                <option value="নবম শ্রেণি">নবম শ্রেণি</option>
                <option value="ষষ্ঠ–অষ্টম শ্রেণি">ষষ্ঠ–অষ্টম শ্রেণি</option>
                <option value="ইংরেজি ও স্কিল কোর্স">ইংরেজি ও স্কিল কোর্স</option>
                <option value="ভর্তি প্রস্তুতি">ভর্তি প্রস্তুতি</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-base font-bold text-[#141A38] mb-2">
                শিক্ষার্থীর মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-[#141A38] mb-2">
                অভিভাবকের মোবাইল নম্বর (ঐচ্ছিক)
              </label>
              <input
                type="tel"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-bold text-[#141A38] mb-2">
              স্কুল বা কলেজের নাম *
            </label>
            <input
              type="text"
              required
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="তোমার স্কুল বা কলেজের নাম লেখো"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
            />
          </div>

          <div>
            <label className="block text-base font-bold text-[#141A38] mb-2">
              বর্তমান ঠিকানা / কোনো প্রশ্ন থাকলে লিখুন
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="আপনার জেলা, থানা বা কোনো মন্তব্য..."
              className="w-full rounded-lg border border-slate-300 p-4 text-base focus:outline-none focus:border-[#1F2A7C]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-lg py-3.5 rounded-lg transition-colors cursor-pointer"
          >
            আবেদন জমা দিন (Apply Now)
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

      <section className="bg-[#1F2A7C] text-white py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-[#F5A623] font-bold mb-1">
            হোম / ভর্তি আবেদন ফরম
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            কোর্স ও ব্যাচে ভর্তির আবেদন
          </h1>
          <p className="text-base text-slate-200 mt-2">
            ফরমটি পূরণ করে সাবমিট করুন, আমাদের প্রতিনিধি আপনাকে ফোন করে ভর্তি কনফার্ম করবেন।
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="py-16 text-center text-base text-slate-600">
            ফরম লোড হচ্ছে...
          </div>
        }
      >
        <EnrollFormContent />
      </Suspense>

      <Footer />
    </div>
  );
}
