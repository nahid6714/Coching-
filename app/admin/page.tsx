'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {ALL_COURSES, AdmissionApplication, BatchStatus, CourseItem} from '@/lib/academy-data';
import {RegisteredUser} from '@/app/register/page';
import {
  ShieldCheck,
  LogOut,
  Users,
  FileText,
  BookOpen,
  Phone,
  CheckCircle2,
  Clock,
  Trash2,
  AlertCircle,
  Lock,
  Home,
} from 'lucide-react';

const ADMIN_ID = '01931866636';
const ADMIN_PASS = '3012024';

interface ExtendedApplication extends AdmissionApplication {
  status?: 'পেন্ডিং' | 'ভর্তি কনফার্মড' | 'বাতিল';
}

const DEFAULT_APPLICATIONS: ExtendedApplication[] = [
  {
    id: 'APP-849201',
    studentName: 'তানভীর ইসলাম',
    phone: '01712345678',
    guardianPhone: '01711998877',
    courseTitle: 'এইচএসসি ২০২৬ পূর্ণাঙ্গ একাডেমিক ব্যাচ',
    className: 'এইচএসসি (বিজ্ঞান)',
    institution: 'নটর ডেম কলেজ, ঢাকা',
    address: 'ফার্মগেট, ঢাকা',
    createdAt: '১০ অক্টোবর ২০২৬',
    status: 'পেন্ডিং',
  },
  {
    id: 'APP-849185',
    studentName: 'সাদিয়া আফরিন',
    phone: '01819334455',
    guardianPhone: '01811223344',
    courseTitle: 'এসএসসি (দশম শ্রেণি) পূর্ণাঙ্গ প্রস্তুতি ও রিভিশন',
    className: 'এসএসসি (দশম শ্রেণি)',
    institution: 'ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ',
    address: 'বেইলি রোড, ঢাকা',
    createdAt: '১০ অক্টোবর ২০২৬',
    status: 'ভর্তি কনফার্মড',
  },
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'applications' | 'students' | 'courses'
  >('applications');

  const [applications, setApplications] = useState<ExtendedApplication[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>(ALL_COURSES);

  useEffect(() => {
    const loadAdminData = () => {
      try {
        const savedAuth = localStorage.getItem('infinity_admin_auth');
        if (savedAuth === 'authenticated') {
          setIsLoggedIn(true);
        }

        const rawApps = localStorage.getItem('infinity_academy_applications');
        if (rawApps) {
          const parsed: ExtendedApplication[] = JSON.parse(rawApps);
          setApplications(
            parsed.length > 0 ? parsed : DEFAULT_APPLICATIONS
          );
        } else {
          setApplications(DEFAULT_APPLICATIONS);
        }

        const rawUsers = localStorage.getItem('infinity_registered_users');
        if (rawUsers) {
          setRegisteredUsers(JSON.parse(rawUsers));
        }
      } catch {
        setApplications(DEFAULT_APPLICATIONS);
      }
    };
    loadAdminData();
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (loginId.trim() === ADMIN_ID && password === ADMIN_PASS) {
      setIsLoggedIn(true);
      try {
        localStorage.setItem('infinity_admin_auth', 'authenticated');
      } catch {
        // ignore
      }
    } else {
      setLoginError('ভুল অ্যাডমিন আইডি অথবা পাসওয়ার্ড! আবার চেষ্টা করুন।');
    }
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setLoginId('');
    setPassword('');
    try {
      localStorage.removeItem('infinity_admin_auth');
    } catch {
      // ignore
    }
  };

  const updateApplicationStatus = (
    id: string,
    newStatus: 'পেন্ডিং' | 'ভর্তি কনফার্মড' | 'বাতিল'
  ) => {
    setApplications((prev) => {
      const updated = prev.map((app) =>
        app.id === id ? {...app, status: newStatus} : app
      );
      try {
        localStorage.setItem(
          'infinity_academy_applications',
          JSON.stringify(updated)
        );
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => {
      const updated = prev.filter((app) => app.id !== id);
      try {
        localStorage.setItem(
          'infinity_academy_applications',
          JSON.stringify(updated)
        );
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const updateCourseStatus = (id: string, newStatus: BatchStatus) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? {...c, status: newStatus} : c))
    );
  };

  // ===========================================================================
  // 1. ADMIN LOGIN VIEW (/admin when not logged in)
  // ===========================================================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#141A38] px-4 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border-t-4 border-[#F5A623] shadow-2xl max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF1FA] text-[#1F2A7C] flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#141A38]">
              অ্যাডমিন প্যানেল লগইন
            </h1>
            <p className="text-base text-slate-600 mt-1">
              INFINITY ACADEMY কন্ট্রোল প্যানেল
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-base flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-base font-bold text-[#141A38] mb-2">
                অ্যাডমিন আইডি / মোবাইল নম্বর
              </label>
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="01931866636"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base text-[#141A38] focus:outline-none focus:border-[#1F2A7C]"
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
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base text-[#141A38] focus:outline-none focus:border-[#1F2A7C]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1F2A7C] hover:bg-[#151d57] text-white font-bold text-lg py-3.5 rounded-lg transition-colors cursor-pointer"
            >
              অ্যাডমিন লগইন করুন
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-base font-bold text-slate-600 hover:text-[#1F2A7C]"
            >
              <Home className="w-4 h-4" />
              <span>মূল ওয়েবসাইটে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // 2. ADMIN DASHBOARD VIEW (/admin when logged in)
  // ===========================================================================
  const pendingCount = applications.filter(
    (a) => (a.status || 'পেন্ডিং') === 'পেন্ডিং'
  ).length;
  const confirmedCount = applications.filter(
    (a) => a.status === 'ভর্তি কনফার্মড'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] text-[#141A38]">
      {/* Admin Top Header */}
      <header className="bg-[#141A38] text-white px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5A623] text-[#141A38] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl leading-none">
                INFINITY ACADEMY — অ্যাডমিন প্যানেল
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                লগইনকৃত অ্যাডমিন: {ADMIN_ID}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              ওয়েবসাইট দেখুন
            </Link>
            <button
              type="button"
              onClick={handleAdminLogout}
              className="bg-rose-600 hover:bg-rose-700 text-white text-sm sm:text-base font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 sm:px-8 max-w-6xl mx-auto w-full space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623]">
            <p className="text-base text-slate-600 font-medium">
              মোট ভর্তি আবেদন
            </p>
            <p className="text-3xl font-bold text-[#141A38] mt-2">
              {applications.length} টি
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-amber-500">
            <p className="text-base text-slate-600 font-medium">
              ফোন করা বাকি (পেন্ডিং)
            </p>
            <p className="text-3xl font-bold text-amber-600 mt-2">
              {pendingCount} টি
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-emerald-600">
            <p className="text-base text-slate-600 font-medium">
              ভর্তি কনফার্মড
            </p>
            <p className="text-3xl font-bold text-emerald-700 mt-2">
              {confirmedCount} জন
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#1F2A7C]">
            <p className="text-base text-slate-600 font-medium">
              রেজিস্টারকৃত অ্যাকাউন্ট
            </p>
            <p className="text-3xl font-bold text-[#1F2A7C] mt-2">
              {registeredUsers.length} জন
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 bg-white p-2 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-bold transition-colors cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-[#1F2A7C] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>ভর্তি আবেদন তালিকা ({applications.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-bold transition-colors cursor-pointer ${
              activeTab === 'students'
                ? 'bg-[#1F2A7C] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>রেজিস্টারকৃত শিক্ষার্থী ({registeredUsers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-bold transition-colors cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-[#1F2A7C] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>কোর্স ও ব্যাচসমূহ ({courses.length})</span>
          </button>
        </div>

        {/* TAB 1: ADMISSION APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#141A38]">
                ভর্তি আবেদনের তালিকা (ফোন করে ভর্তি কনফার্ম করুন)
              </h2>
            </div>

            {applications.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center border border-slate-200 text-base text-slate-600">
                এখনো কোনো ভর্তির আবেদন জমা পড়েনি।
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {applications.map((app) => {
                  const currentStatus = app.status || 'পেন্ডিং';
                  return (
                    <div
                      key={app.id}
                      className="bg-white rounded-xl p-6 border border-slate-200 border-t-4 border-t-[#F5A623] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-sm font-bold text-[#1F2A7C] bg-[#EEF1FA] px-3 py-1 rounded-md">
                            {app.id}
                          </span>
                          <span
                            className={`text-sm font-bold px-3 py-1 rounded-md ${
                              currentStatus === 'ভর্তি কনফার্মড'
                                ? 'bg-emerald-50 text-emerald-700'
                                : currentStatus === 'বাতিল'
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {currentStatus}
                          </span>
                          <span className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{app.createdAt}</span>
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-[#141A38]">
                          {app.studentName}{' '}
                          <span className="text-base font-medium text-slate-600">
                            ({app.className})
                          </span>
                        </h3>

                        <p className="text-base font-bold text-[#1F2A7C]">
                          কোর্স: {app.courseTitle}
                        </p>

                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-base text-slate-700 pt-1">
                          <p>
                            <span className="font-bold">মোবাইল:</span>{' '}
                            <a
                              href={`tel:${app.phone}`}
                              className="text-[#1F2A7C] font-bold hover:underline"
                            >
                              {app.phone}
                            </a>
                          </p>
                          {app.guardianPhone && (
                            <p>
                              <span className="font-bold">অভিভাবক:</span>{' '}
                              {app.guardianPhone}
                            </p>
                          )}
                          {app.institution && (
                            <p>
                              <span className="font-bold">প্রতিষ্ঠান:</span>{' '}
                              {app.institution}
                            </p>
                          )}
                          {app.address && (
                            <p>
                              <span className="font-bold">ঠিকানা/মন্তব্য:</span>{' '}
                              {app.address}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <a
                          href={`tel:${app.phone}`}
                          className="bg-[#EEF1FA] hover:bg-[#dfe6f7] text-[#1F2A7C] font-bold text-sm px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>কল করুন</span>
                        </a>

                        <button
                          type="button"
                          onClick={() =>
                            updateApplicationStatus(app.id, 'ভর্তি কনফার্মড')
                          }
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>ভর্তি কনফার্ম</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateApplicationStatus(app.id, 'পেন্ডিং')
                          }
                          className="border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer"
                        >
                          পেন্ডিং
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteApplication(app.id)}
                          aria-label="মুছে ফেলুন"
                          className="p-2.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REGISTERED STUDENTS */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-[#141A38]">
              ওয়েবসাইটে রেজিস্টারকৃত শিক্ষার্থীদের তালিকা
            </h2>
            {registeredUsers.length === 0 ? (
              <p className="text-base text-slate-600 py-6">
                এখনো কোনো শিক্ষার্থী নতুন অ্যাকাউন্ট রেজিস্ট্রেশন করেনি। `/register` পেজ থেকে রেজিস্ট্রেশন করলে এখানে দেখা যাবে।
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-base">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-3 pr-4">নাম</th>
                      <th className="py-3 pr-4">মোবাইল নম্বর</th>
                      <th className="py-3 pr-4">শ্রেণি</th>
                      <th className="py-3 pr-4">প্রতিষ্ঠান</th>
                      <th className="py-3">তারিখ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {registeredUsers.map((u, idx) => (
                      <tr key={idx}>
                        <td className="py-3.5 pr-4 font-bold text-[#141A38]">
                          {u.name}
                        </td>
                        <td className="py-3.5 pr-4 font-semibold text-[#1F2A7C]">
                          {u.phone}
                        </td>
                        <td className="py-3.5 pr-4">{u.className}</td>
                        <td className="py-3.5 pr-4">{u.institution}</td>
                        <td className="py-3.5 text-slate-500">{u.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COURSES & BATCHES */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-[#141A38]">
              কোর্স ও ব্যাচ স্ট্যাটাস ম্যানেজমেন্ট
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-[#F8F9FC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-bold text-lg text-[#141A38]">{c.title}</p>
                    <p className="text-sm text-slate-600">
                      {c.category} · ফি: {c.fee}
                    </p>
                  </div>
                  <select
                    value={c.status}
                    onChange={(e) =>
                      updateCourseStatus(c.id, e.target.value as BatchStatus)
                    }
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-base font-bold text-[#1F2A7C]"
                  >
                    <option value="ভর্তি চলছে">ভর্তি চলছে</option>
                    <option value="শীঘ্রই আসছে">শীঘ্রই আসছে</option>
                    <option value="ভর্তি বন্ধ">ভর্তি বন্ধ</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
