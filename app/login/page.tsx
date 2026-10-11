'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {RegisteredUser} from '@/app/register/page';
import {CheckCircle2, AlertCircle, LogIn, LogOut} from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const saved = localStorage.getItem('infinity_current_user');
        setCurrentUser(saved ? JSON.parse(saved) : null);
      } catch {
        // ignore
      }
    };
    loadUser();
    window.addEventListener('auth-change', loadUser);
    return () => window.removeEventListener('auth-change', loadUser);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.trim();
    try {
      const raw = localStorage.getItem('infinity_registered_users');
      const users: RegisteredUser[] = raw ? JSON.parse(raw) : [];

      const matchedUser = users.find((u) => u.phone === cleanPhone);
      if (!matchedUser) {
        setError(
          'এই মোবাইল নম্বর দিয়ে এখনো কোনো অ্যাকাউন্ট খোলা হয়নি। অনুগ্রহ করে আগে নতুন রেজিস্ট্রেশন করুন।'
        );
        return;
      }

      if (matchedUser.password !== password) {
        setError('আপনার দেওয়া পাসওয়ার্ডটি সঠিক নয়। আবার চেষ্টা করুন।');
        return;
      }

      localStorage.setItem(
        'infinity_current_user',
        JSON.stringify(matchedUser)
      );
      window.dispatchEvent(new Event('auth-change'));
      setCurrentUser(matchedUser);
    } catch {
      setError('লগইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('infinity_current_user');
      window.dispatchEvent(new Event('auth-change'));
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setPhone('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs max-w-md w-full">
          {currentUser ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-[#141A38]">
                স্বাগতম, {currentUser.name}!
              </h2>
              <div className="bg-[#F8F9FC] rounded-xl p-4 border border-slate-200 text-left text-base space-y-1.5 text-slate-700">
                <p>
                  <span className="font-bold">মোবাইল:</span> {currentUser.phone}
                </p>
                <p>
                  <span className="font-bold">শ্রেণি:</span>{' '}
                  {currentUser.className}
                </p>
                <p>
                  <span className="font-bold">প্রতিষ্ঠান:</span>{' '}
                  {currentUser.institution}
                </p>
              </div>
              <div className="pt-3 flex flex-col gap-3">
                <Link
                  href="/courses"
                  className="w-full bg-[#1F2A7C] hover:bg-[#151d57] text-white font-bold text-base py-3 rounded-lg transition-colors"
                >
                  কোর্সসমূহ দেখুন
                </Link>
                <Link
                  href="/enroll"
                  className="w-full bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-base py-3 rounded-lg transition-colors"
                >
                  ভর্তি আবেদন ফরম
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-base py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>লগআউট করুন</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Top Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl mb-6">
                <div className="py-2.5 text-center rounded-lg text-base font-bold bg-[#1F2A7C] text-white shadow-xs">
                  লগইন
                </div>
                <Link
                  href="/register"
                  className="py-2.5 text-center rounded-lg text-base font-bold text-slate-600 hover:text-[#141A38] transition-colors"
                >
                  নতুন রেজিস্ট্রেশন
                </Link>
              </div>

              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#141A38] flex items-center justify-center gap-2">
                  <LogIn className="w-7 h-7 text-[#1F2A7C]" />
                  <span>অ্যাকাউন্টে লগইন করুন</span>
                </h1>
                <p className="text-base text-slate-600 mt-1.5">
                  তোমার রেজিস্টারকৃত মোবাইল নম্বর ও পাসওয়ার্ড দাও
                </p>
              </div>

              {error && (
                <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-base space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                  <Link
                    href="/register"
                    className="inline-block bg-[#F5A623] text-[#141A38] font-bold text-sm px-4 py-2 rounded-lg"
                  >
                    নতুন রেজিস্ট্রেশন করুন →
                  </Link>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
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
                    পাসওয়ার্ড
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
                  className="w-full bg-[#1F2A7C] hover:bg-[#151d57] text-white font-bold text-lg py-3.5 rounded-lg transition-colors cursor-pointer"
                >
                  লগইন করুন
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-3">
                <p className="text-base text-slate-600">
                  এখনো কোনো অ্যাকাউন্ট খোলা নেই?
                </p>
                <Link
                  href="/register"
                  className="block w-full bg-[#EEF1FA] hover:bg-[#dfe6f7] text-[#1F2A7C] font-bold text-base py-3 rounded-lg transition-colors"
                >
                  নতুন অ্যাকাউন্ট রেজিস্ট্রেশন করুন
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
