import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {ALL_COURSES} from '@/lib/academy-data';
import {StatusBadge} from '@/components/InfinityAcademyClient';
import {CheckCircle2, Clock, Video, Calendar, User} from 'lucide-react';

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const course =
    ALL_COURSES.find((c) => c.id === id) || ALL_COURSES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      {/* Inner Page Banner */}
      <section className="bg-[#1F2A7C] text-white py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-[#F5A623] font-bold mb-2">
            <Link href="/" className="hover:underline">
              হোম
            </Link>{' '}
            / <Link href="/courses" className="hover:underline">কোর্সসমূহ</Link> /{' '}
            {course.title}
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold">{course.title}</h1>
          <p className="text-base sm:text-lg text-slate-200 mt-2">
            {course.subtitle}
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Course Overview & Syllabus */}
          <div className="lg:col-span-8 space-y-6">
            {course.image && (
              <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-[#1F2A7C] border border-slate-200">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
            )}

            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-[#F5A623] space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#141A38]">
                কোর্স সম্পর্কে বিস্তারিত
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                {course.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-[#F8F9FC]">
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#1F2A7C]" />
                    <span>ক্লাসের সময়সূচি</span>
                  </p>
                  <p className="font-bold text-base text-[#141A38] mt-1">
                    {course.schedule}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8F9FC]">
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#1F2A7C]" />
                    <span>মোট ক্লাস</span>
                  </p>
                  <p className="font-bold text-base text-[#141A38] mt-1">
                    {course.liveClasses}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8F9FC]">
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#1F2A7C]" />
                    <span>কোর্সের মেয়াদ</span>
                  </p>
                  <p className="font-bold text-base text-[#141A38] mt-1">
                    {course.duration}
                  </p>
                </div>
              </div>
            </div>

            {/* Syllabus */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#141A38]">
                কোর্স সিলেবাস ও যা যা শেখানো হবে
              </h3>
              <ul className="space-y-3 text-base text-slate-700">
                {course.syllabus.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#F8F9FC] border border-slate-100 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1F2A7C] text-white flex items-center justify-center shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm text-slate-500">কোর্স পরিচালক ও শিক্ষক</p>
                <p className="font-bold text-lg text-[#141A38]">
                  {course.instructor}
                </p>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Sticky Enrollment Card */}
          <aside className="lg:col-span-4 bg-white rounded-xl p-6 sm:p-7 border border-slate-200 border-t-4 border-t-[#F5A623] sticky top-24 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-slate-500 block">কোর্স ফি</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#1F2A7C]">
                  {course.fee}
                </span>
              </div>
              <StatusBadge status={course.status} />
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-100 text-base text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>সপ্তাহে নিয়মিত লাইভ ক্লাস</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>প্রিন্টেড বই ও স্টাডি ম্যাটেরিয়াল</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>প্রশ্নব্যাংক ও মডেল টেস্ট</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>২৪/৭ ডাউট সলভ সাপোর্ট</span>
              </li>
            </ul>

            <Link
              href={`/enroll?course=${encodeURIComponent(course.title)}`}
              className="block w-full text-center bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-lg py-3.5 rounded-lg transition-colors"
            >
              ভর্তি হও →
            </Link>

            <p className="text-sm text-slate-500 text-center leading-relaxed">
              শুধু নাম ও মোবাইল নম্বর দিন — আমাদের প্রতিনিধি ফোন করে ভর্তি কনফার্ম করবেন।
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
