'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {CheckCircle2, UserPlus, AlertCircle} from 'lucide-react';

export interface RegisteredUser {
  name: string;
  phone: string;
  className: string;
  institution: string;
  password: string;
  createdAt: string;
}

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [className, setClassName] = useState('এইচএসসি (বিজ্ঞান)');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(
    null
  );

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.trim();
    if (cleanPhone.length < 11) {
      setError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।');
      return;
    }

    if (password.length < 4) {
      setError('পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।');
      return;
    }

    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলেনি।');
      return;
    }

    try {
      const raw = localStorage.getItem('infinity_registered_users');
      const users: RegisteredUser[] = raw ? JSON.parse(raw) : [];

      const exists = users.some((u) => u.phone === cleanPhone);
      if (exists) {
        setError(
          'এই মোবাইল নম্বর দিয়ে ইতোমধ্যে রেজিস্ট্রেশন করা হয়েছে। অনুগ্রহ করে লগইন করুন।'
        );
        return;
      }

      const newUser: RegisteredUser = {
        name: name.trim(),
        phone: cleanPhone,
        className,
        institution: institution.trim(),
        password,
        createdAt: new Date().toLocaleDateString('bn-BD'),
      };

      const updatedUsers = [newUser, ...users];
      localStorage.setItem(
        'infinity_registered_users',
        JSON.stringify(updatedUsers)
      );
      localStorage.setItem('infinity_current_user', JSON.stringify(newUser));
      window.dispatchEvent(new Event('auth-change'));
      setRegisteredUser(newUser);
    } catch {
      setError('রেজিস্ট্রেশন সম্পন্ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs max-w-lg w-full">
          {registeredUser ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141A38]">
                রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে!
              </h2>
              <p className="text-base text-slate-600">
                স্বাগতম, <span className="font-bold text-[#1F2A7C]">{registeredUser.name}</span>! আপনার অ্যাকাউন্ট তৈরি এবং লগইন সম্পন্ন হয়েছে।
              </p>
              <div className="bg-[#F8F9FC] rounded-xl p-4 border border-slate-200 text-left text-base space-y-1.5 text-slate-700">
                <p>
                  <span className="font-bold">মোবাইল নম্বর:</span>{' '}
                  {registeredUser.phone}
                </p>
                <p>
                  <span className="font-bold">শ্রেণি:</span>{' '}
                  {registeredUser.className}
                </p>
                <p>
                  <span className="font-bold">প্রতিষ্ঠান:</span>{' '}
                  {registeredUser.institution}
                </p>
              </div>
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/courses"
                  className="flex-1 bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-base py-3 rounded-lg text-center transition-colors"
                >
                  কোর্সসমূহ দেখুন
                </Link>
                <Link
                  href="/"
                  className="flex-1 bg-[#1F2A7C] hover:bg-[#151d57] text-white font-bold text-base py-3 rounded-lg text-center transition-colors"
                >
                  হোমপেজে যান
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Top Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl mb-6">
                <Link
                  href="/login"
                  className="py-2.5 text-center rounded-lg text-base font-bold text-slate-600 hover:text-[#141A38] transition-colors"
                >
                  লগইন
                </Link>
                <div className="py-2.5 text-center rounded-lg text-base font-bold bg-[#1F2A7C] text-white shadow-xs">
                  নতুন রেজিস্ট্রেশন
                </div>
              </div>

              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#141A38] flex items-center justify-center gap-2">
                  <UserPlus className="w-7 h-7 text-[#1F2A7C]" />
                  <span>নতুন অ্যাকাউন্ট তৈরি করুন</span>
                </h1>
                <p className="text-base text-slate-600 mt-1.5">
                  মাত্র ১ মিনিটে রেজিস্ট্রেশন করে ফ্রি ক্লাস ও কোর্সে যুক্ত হও
                </p>
              </div>

              {error && (
                <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-base flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-base font-bold text-[#141A38] mb-1.5">
                    শিক্ষার্থীর পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="তোমার পূর্ণ নাম লেখো"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-[#141A38] mb-1.5">
                    মোবাইল নম্বর (১১ ডিজিট) *
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-bold text-[#141A38] mb-1.5">
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
                      <option value="এসএসসি (দশম শ্রেণি)">
                        এসএসসি (দশম শ্রেণি)
                      </option>
                      <option value="নবম শ্রেণি">নবম শ্রেণি</option>
                      <option value="ষষ্ঠ–অষ্টম শ্রেণি">ষষ্ঠ–অষ্টম শ্রেণি</option>
                      <option value="ভর্তি প্রস্তুতি">ভর্তি প্রস্তুতি</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-base font-bold text-[#141A38] mb-1.5">
                      স্কুল / কলেজের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="প্রতিষ্ঠানের নাম"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-bold text-[#141A38] mb-1.5">
                      নতুন পাসওয়ার্ড *
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="কমপক্ষে ৪ অক্ষর"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
                    />
                  </div>

                  <div>
                    <label className="block text-base font-bold text-[#141A38] mb-1.5">
                      পাসওয়ার্ড নিশ্চিত করুন *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="পুনরায় পাসওয়ার্ড দিন"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:outline-none focus:border-[#1F2A7C]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] font-bold text-lg py-3.5 rounded-lg transition-colors cursor-pointer mt-2"
                >
                  রেজিস্ট্রেশন সম্পন্ন করুন
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center text-base text-slate-600">
                ইতোমধ্যে অ্যাকাউন্ট আছে?{' '}
                <Link
                  href="/login"
                  className="text-[#1F2A7C] font-bold hover:underline"
                >
                  এখানে লগইন করুন
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
