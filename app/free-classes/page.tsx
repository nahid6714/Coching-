import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {PlaySquare} from 'lucide-react';

const FREE_CLASSES = [
  {
    id: 'fc-1',
    title: 'এইচএসসি পদার্থবিজ্ঞান ১ম পত্র: ভেক্টর ও নদী-নৌকার অংক',
    teacher: 'ড. তানভীর আহমেদ (BUET)',
    duration: '৫৫ মিনিট',
    tag: 'এইচএসসি বিজ্ঞান',
    image: '/images/course_mock_test.jpg',
    courseTitle: 'এইচএসসি ২০২৬ পূর্ণাঙ্গ একাডেমিক ব্যাচ',
  },
  {
    id: 'fc-2',
    title: 'এসএসসি সাধারণ গণিত: ত্রিকোণমিতিক দূরত্ব ও উচ্চতা',
    teacher: 'মাহমুদুল হাসান (DU)',
    duration: '৪৮ মিনিট',
    tag: 'এসএসসি গণিত',
    image: '/images/course_spoken_english.jpg',
    courseTitle: 'এসএসসি (দশম শ্রেণি) পূর্ণাঙ্গ প্রস্তুতি ও রিভিশন',
  },
  {
    id: 'fc-3',
    title: 'ইংরেজি গ্রামার: Right Form of Verbs ও Modifiers',
    teacher: 'সাদিয়া ইসলাম (IBA, DU)',
    duration: '৪২ মিনিট',
    tag: 'ইংরেজি',
    image: '/images/course_ielts_prep.jpg',
    courseTitle: 'স্পোকেন ইংলিশ ও প্রেজেন্টেশন কোর্স',
  },
  {
    id: 'fc-4',
    title: 'মেডিকেল জীববিজ্ঞান: মানবদেহ ও রক্ত সংবহনতন্ত্র',
    teacher: 'রাফসান জানি (DMC)',
    duration: '১ ঘণ্টা ১০ মিনিট',
    tag: 'ভর্তি প্রস্তুতি',
    image: '/images/course_kids_english.jpg',
    courseTitle: 'মেডিকেল, ইঞ্জিনিয়ারিং ও বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি',
  },
];

export default function FreeClassesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      <section className="bg-[#1F2A7C] text-white py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-[#F5A623] font-bold mb-1">
            হোম / ফ্রি ক্লাস
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            ফ্রি ডেমো ক্লাস ও লেকচার রিসোর্স
          </h1>
          <p className="text-base text-slate-200 mt-2">
            ভর্তির আগে আমাদের অভিজ্ঞ শিক্ষকদের ক্লাস দেখে নাও।
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FREE_CLASSES.map((fc) => (
            <div
              key={fc.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full bg-[#141A38]">
                  <Image
                    src={fc.image}
                    alt={fc.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#F5A623] text-[#141A38] flex items-center justify-center shadow-lg">
                      <PlaySquare className="w-7 h-7" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 bg-[#1F2A7C] text-white text-xs font-bold px-3 py-1 rounded-md">
                    {fc.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-xl text-[#141A38]">
                    {fc.title}
                  </h2>
                  <p className="text-base text-slate-600 mt-2">
                    শিক্ষক: {fc.teacher} · সময়কাল: {fc.duration}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-base font-bold text-emerald-700">
                  ১০০% ফ্রি ক্লাস
                </span>
                <Link
                  href={`/enroll?course=${encodeURIComponent(fc.courseTitle)}`}
                  className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  ভর্তি হও
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#1F2A7C] text-white rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">
              পূর্ণাঙ্গ ব্যাচে ভর্তি হয়ে তোমার প্রস্তুতি নিশ্চিত করো!
            </h3>
            <p className="text-base text-slate-200 mt-1.5">
              লাইভ ক্লাস, প্রিন্টেড শিট, সাপ্তাহিক মডেল টেস্ট ও ২৪/৭ ডাউট সলভ সাপোর্ট।
            </p>
          </div>
          <Link
            href="/enroll"
            className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-base px-6 py-3.5 rounded-lg shrink-0 transition-colors"
          >
            ভর্তি হও →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
