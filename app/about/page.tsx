import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {Phone, Mail, MapPin} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      <section className="bg-[#1F2A7C] text-white py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-[#F5A623] font-bold mb-1">
            হোম / যোগাযোগ
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            যোগাযোগ ও আমাদের সম্পর্কে
          </h1>
          <p className="text-base text-slate-200 mt-2">
            যেকোনো তথ্যের জন্য আমাদের হেল্পলাইনে কল করুন অথবা অফলাইন সেন্টারে চলে আসুন।
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            {num: '২.৫ লাখ+', label: 'সক্রিয় শিক্ষার্থী'},
            {num: '১,৮০০+', label: 'লাইভ ও রেকর্ডেড ক্লাস'},
            {num: '৬০+ জন', label: 'অভিজ্ঞ শিক্ষক'},
            {num: '৯৮.৫%', label: 'বোর্ড পরীক্ষায় সাফল্য'},
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623] text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-[#1F2A7C]">
                {item.num}
              </p>
              <p className="text-base text-slate-600 mt-1 font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-7 border border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-[#1F2A7C]">আমাদের লক্ষ্য</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              বাংলাদেশের যেকোনো প্রান্তের একজন শিক্ষার্থী যেন ঘরে বসেই দেশসেরা শিক্ষকদের কাছে সহজ ভাষায় লাইভ ক্লাস, প্রিন্টেড গাইডবুক এবং ২৪/৭ ডাউট সলভ সুবিধা পায়।
            </p>
          </div>
          <div className="bg-white rounded-xl p-7 border border-slate-200 space-y-3">
            <h2 className="text-xl font-bold text-[#1F2A7C]">
              অফলাইন সেন্টার ও সাপোর্ট
            </h2>
            <div className="space-y-2.5 text-base text-slate-700">
              <p className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-[#1F2A7C] shrink-0" />
                <span>হেল্পলাইন: ০৯৬১০-০০১১২২, ০১৭১১-০০১১২২</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-[#1F2A7C] shrink-0" />
                <span>ইমেইল: info@infinityacademy.edu.bd</span>
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#1F2A7C] shrink-0" />
                <span>অফিস: ফার্মগেট ও মিরপুর-১০, ঢাকা</span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/enroll"
            className="inline-block bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-base px-8 py-3.5 rounded-lg transition-colors"
          >
            ভর্তি আবেদন ফরম পূরণ করুন →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
