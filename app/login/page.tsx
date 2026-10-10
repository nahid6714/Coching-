'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {CheckCircle2} from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-14 px-4 sm:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs max-w-md w-full">
          {loggedIn ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-2xl font-bold text-[#141A38]">
                সফলভাবে লগইন হয়েছে!
              </h2>
              <p className="text-base text-slate-600">
                আপনার অ্যাকাউন্ট: <span className="font-bold">{phone}</span>
              </p>
              <div className="pt-3 flex flex-col gap-3">
                <Link
                  href="/courses"
                  className="w-full bg-[#1F2A7C] text-white font-bold text-base py-3 rounded-lg"
                >
                  কোর্সসমূহ দেখুন
                </Link>
                <Link
                  href="/"
                  className="w-full border border-slate-200 text-[#141A38] font-bold text-base py-3 rounded-lg"
                >
                  হোমপেজে ফিরে যান
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#141A38]">
                  লগইন করুন
                </h1>
                <p className="text-base text-slate-600 mt-1.5">
                  তোমার মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে অ্যাকাউন্টে প্রবেশ করো
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (phone.trim()) setLoggedIn(true);
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-base font-bold text-[#141A38] mb-2">
                    মোবাইল নম্বর
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
                    পাসওয়ার্ড / পিন
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1F2A7C] hover:bg-[#151d57] text-white font-bold text-base py-3.5 rounded-lg transition-colors cursor-pointer"
                >
                  লগইন
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center text-base text-slate-600">
                নতুন ব্যাচে ভর্তি হতে চাও?{' '}
                <Link
                  href="/enroll"
                  className="text-[#1F2A7C] font-bold hover:underline"
                >
                  ভর্তি আবেদন ফরম পূরণ করো
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
