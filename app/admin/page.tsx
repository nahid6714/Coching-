'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {ALL_COURSES, DEMO_APPLICATIONS, AdmissionApplication, BatchStatus, CourseItem} from '@/lib/academy-data';
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
  Eye,
  Pencil,
  Plus,
  X,
  GraduationCap,
  Save,
} from 'lucide-react';

const ADMIN_ID = '01931866636';
const ADMIN_PASS = '3012024';

interface ExtendedApplication extends AdmissionApplication {
  status?: 'পেন্ডিং' | 'ভর্তি কনফার্মড' | 'বাতিল';
}

const DEFAULT_APPLICATIONS: ExtendedApplication[] = DEMO_APPLICATIONS;


interface ManagedTeacher { id: string; name: string; subject: string; institution: string; experience: string; bio: string; courseIds: string[]; }
const DEFAULT_TEACHERS: ManagedTeacher[] = [
  {id:'teacher-tanvir', name:'ড. তানভীর আহমেদ', subject:'পদার্থবিজ্ঞান', institution:'বুয়েট (BUET)', experience:'৮+ বছরের অভিজ্ঞতা', bio:'বেসিক থেকে অ্যাডভান্সড পদার্থবিজ্ঞান পড়ান।', courseIds:['hsc-science']},
  {id:'teacher-sadia', name:'সাদিয়া ইসলাম', subject:'ইংরেজি ও স্পোকেন ইংলিশ', institution:'ঢাকা বিশ্ববিদ্যালয় (DU)', experience:'৭+ বছরের অভিজ্ঞতা', bio:'ইংরেজি গ্রামার, স্পোকেন ইংলিশ ও IELTS প্রস্তুতি করান।', courseIds:['spoken-english','ielts-prep']},
  {id:'teacher-rafsan', name:'রাফসান জানি', subject:'জীববিজ্ঞান ও রসায়ন', institution:'ঢাকা মেডিকেল কলেজ', experience:'৬+ বছরের অভিজ্ঞতা', bio:'মেডিকেল ভর্তি প্রস্তুতি ও জীববিজ্ঞান পড়ান।', courseIds:['admission-prep']},
];
function TeacherManager() {
  const [teachers, setTeachers] = useState<ManagedTeacher[]>(DEFAULT_TEACHERS);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState<ManagedTeacher | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [courseChoices, setCourseChoices] = useState<CourseItem[]>(ALL_COURSES);
  useEffect(() => { try { const raw=localStorage.getItem('infinity_academy_teachers'); if(raw) { const parsed=JSON.parse(raw); if(Array.isArray(parsed)) setTeachers(parsed); } const rawCourses=localStorage.getItem('infinity_academy_courses'); if(rawCourses) { const parsed=JSON.parse(rawCourses); if(Array.isArray(parsed)&&parsed.length) setCourseChoices(parsed); } } catch {} setLoaded(true); }, []);
  const persist = (next: ManagedTeacher[]) => { setTeachers(next); try { localStorage.setItem('infinity_academy_teachers', JSON.stringify(next)); } catch {} window.dispatchEvent(new Event('infinity-teachers-updated')); };
  const saveTeacher = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const fd=new FormData(e.currentTarget); const id=editing?.id || `teacher-${Date.now()}`; const item:ManagedTeacher={id,name:String(fd.get('name')||'').trim(),subject:String(fd.get('subject')||'').trim(),institution:String(fd.get('institution')||'').trim(),experience:String(fd.get('experience')||'').trim(),bio:String(fd.get('bio')||'').trim(),courseIds:fd.getAll('courseIds').map(String)}; persist(editing?teachers.map(t=>t.id===id?item:t):[item,...teachers]); setOpenForm(false); setEditing(null); };
  if(!loaded) return <div className="rounded-xl bg-white p-6">শিক্ষকের তথ্য লোড হচ্ছে…</div>;
  return <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">শিক্ষক ব্যবস্থাপনা</h2><p className="mt-1 text-sm text-slate-500">শিক্ষকের প্রোফাইল তৈরি করুন এবং এক বা একাধিক কোর্সের সঙ্গে যুক্ত করুন।</p></div><button type="button" onClick={()=>{setEditing(null);setOpenForm(true)}} className="inline-flex items-center gap-2 rounded-lg bg-[#F5A623] px-4 py-2.5 font-bold"><Plus className="h-4 w-4"/> শিক্ষক যোগ করুন</button></div><div className="grid grid-cols-1 gap-3">{teachers.map(t=><div key={t.id} className="flex flex-col gap-3 rounded-xl border bg-slate-50 p-4 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="font-bold text-lg">{t.name}</h3><p className="font-semibold text-[#1F2A7C]">{t.subject}</p><p className="text-sm text-slate-600">{t.institution} · {t.experience}</p><p className="mt-2 text-sm text-slate-700">{t.bio}</p><p className="mt-2 text-sm"><b>কোর্স:</b> {t.courseIds.map(id=>courseChoices.find(c=>c.id===id)?.title).filter(Boolean).join(', ') || 'কোর্স যুক্ত নেই'}</p></div><div className="flex gap-2"><button type="button" onClick={()=>{setEditing(t);setOpenForm(true)}} className="rounded-lg border bg-white px-3 py-2 text-sm font-bold">সম্পাদনা</button><button type="button" onClick={()=>persist(teachers.filter(x=>x.id!==t.id))} className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-bold text-rose-600">মুছুন</button></div></div>)}</div>{openForm&&<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"><form onSubmit={saveTeacher} className="my-auto w-full max-w-2xl space-y-4 rounded-2xl bg-white p-5 sm:p-7"><div className="flex items-center justify-between"><h3 className="text-xl font-bold">{editing?'শিক্ষক সম্পাদনা':'নতুন শিক্ষক'}</h3><button type="button" onClick={()=>setOpenForm(false)} aria-label="বন্ধ করুন"><X className="h-5 w-5"/></button></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{([['name','শিক্ষকের নাম',editing?.name],['subject','বিষয়',editing?.subject],['institution','শিক্ষাগত যোগ্যতা/প্রতিষ্ঠান',editing?.institution],['experience','অভিজ্ঞতা',editing?.experience]] as const).map(([name,label,value])=><label key={name} className="text-sm font-semibold">{label}<input name={name} required={name==='name'} defaultValue={value} className="mt-1 w-full rounded-lg border p-3"/></label>)}</div><label className="block text-sm font-semibold">বিস্তারিত পরিচিতি<textarea name="bio" rows={3} defaultValue={editing?.bio||''} className="mt-1 w-full rounded-lg border p-3"/></label><fieldset className="rounded-lg border p-3"><legend className="px-1 text-sm font-bold">শিক্ষকের কোর্স নির্বাচন</legend><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{courseChoices.map(c=><label key={c.id} className="flex items-start gap-2 text-sm"><input type="checkbox" name="courseIds" value={c.id} defaultChecked={editing?.courseIds.includes(c.id)} className="mt-1"/><span>{c.title}</span></label>)}</div></fieldset><div className="flex justify-end gap-2"><button type="button" onClick={()=>setOpenForm(false)} className="rounded-lg border px-4 py-2.5 font-bold">বাতিল</button><button type="submit" className="rounded-lg bg-[#1F2A7C] px-4 py-2.5 font-bold text-white">সংরক্ষণ</button></div></form></div>}</div>;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'applications' | 'students' | 'courses' | 'teachers'
  >('applications');

  const [applications, setApplications] = useState<ExtendedApplication[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>(ALL_COURSES);
  const [selectedApplication, setSelectedApplication] = useState<ExtendedApplication | null>(null);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [courseFormError, setCourseFormError] = useState('');

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
          setApplications(parsed);
        } else {
          setApplications(DEFAULT_APPLICATIONS);
          localStorage.setItem('infinity_academy_applications', JSON.stringify(DEFAULT_APPLICATIONS));
        }

        const rawCourses = localStorage.getItem('infinity_academy_courses');
        if (rawCourses) {
          const parsedCourses: CourseItem[] = JSON.parse(rawCourses);
          if (Array.isArray(parsedCourses) && parsedCourses.length) setCourses(parsedCourses);
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

  const saveCourses = (nextCourses: CourseItem[]) => {
    setCourses(nextCourses);
    try { localStorage.setItem('infinity_academy_courses', JSON.stringify(nextCourses)); } catch { /* browser storage may be unavailable */ }
    window.dispatchEvent(new Event('infinity-courses-updated'));
  };

  const updateCourseStatus = (id: string, newStatus: BatchStatus) => {
    saveCourses(courses.map((c) => (c.id === id ? {...c, status: newStatus} : c)));
  };

  const saveCourseForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get('title') || '').trim();
    if (!title) { setCourseFormError('কোর্সের নাম দিতে হবে।'); return; }
    const id = editingCourse?.id || `course-${Date.now()}`;
    const next: CourseItem = {
      id, title, subtitle: String(data.get('subtitle') || '').trim(),
      category: String(data.get('category') || 'ক্লাস ৬–১২') as CourseItem['category'],
      className: String(data.get('className') || '').trim(), fee: String(data.get('fee') || '').trim(),
      duration: String(data.get('duration') || '').trim(), schedule: String(data.get('schedule') || '').trim(),
      liveClasses: String(data.get('liveClasses') || '').trim(), status: String(data.get('status') || 'ভর্তি চলছে') as BatchStatus,
      image: String(data.get('image') || '').trim(), instructor: String(data.get('instructor') || '').trim(),
      description: String(data.get('description') || '').trim(),
      syllabus: String(data.get('syllabus') || '').split('\n').map((item) => item.trim()).filter(Boolean),
    };
    const nextCourses = editingCourse ? courses.map((c) => c.id === id ? next : c) : [next, ...courses];
    saveCourses(nextCourses); setCourseFormOpen(false); setEditingCourse(null); setCourseFormError('');
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
          <button type="button" onClick={() => setActiveTab('teachers')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-bold transition-colors cursor-pointer ${activeTab === 'teachers' ? 'bg-[#1F2A7C] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
            <GraduationCap className="w-5 h-5" /><span>শিক্ষক ব্যবস্থাপনা</span>
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
                        <button
                          type="button"
                          onClick={() => setSelectedApplication(app)}
                          className="border border-slate-200 hover:bg-slate-50 text-[#141A38] font-bold text-sm px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Eye className="w-4 h-4" /> বিস্তারিত
                        </button>
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="text-xl font-bold text-[#141A38]">কোর্স ও ব্যাচ ব্যবস্থাপনা</h2><p className="text-sm text-slate-500 mt-1">পরিবর্তনগুলো এই ব্রাউজারের Local Storage-এ থাকবে।</p></div>
              <button type="button" onClick={() => { setEditingCourse(null); setCourseFormError(''); setCourseFormOpen(true); }} className="inline-flex items-center gap-2 rounded-lg bg-[#F5A623] px-4 py-2.5 font-bold text-[#141A38]"><Plus className="w-4 h-4"/> নতুন কোর্স</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {courses.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-[#F8F9FC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0"><p className="font-bold text-lg text-[#141A38]">{c.title}</p><p className="text-sm text-slate-600">{c.category} · ফি: {c.fee} · শিক্ষক: {c.instructor}</p></div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <select value={c.status} onChange={(e) => updateCourseStatus(c.id, e.target.value as BatchStatus)} className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-bold text-[#1F2A7C]"><option value="ভর্তি চলছে">ভর্তি চলছে</option><option value="শীঘ্রই আসছে">শীঘ্রই আসছে</option><option value="ভর্তি বন্ধ">ভর্তি বন্ধ</option></select>
                    <button type="button" onClick={() => { setEditingCourse(c); setCourseFormError(''); setCourseFormOpen(true); }} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-bold"><Pencil className="w-4 h-4"/> সম্পাদনা</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'teachers' && <TeacherManager />}

        {courseFormOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 sm:p-8">
            <form onSubmit={saveCourseForm} className="my-auto w-full max-w-3xl rounded-2xl bg-white p-5 sm:p-7 shadow-2xl space-y-4">
              <div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold">{editingCourse ? 'কোর্স সম্পাদনা' : 'নতুন কোর্স যোগ করুন'}</h2><button type="button" onClick={() => setCourseFormOpen(false)} aria-label="বন্ধ করুন"><X className="w-5 h-5"/></button></div>
              {courseFormError && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{courseFormError}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-sm font-semibold">কোর্সের নাম *<input name="title" required defaultValue={editingCourse?.title || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">সাবটাইটেল<input name="subtitle" defaultValue={editingCourse?.subtitle || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">ক্যাটাগরি<select name="category" defaultValue={editingCourse?.category || 'ক্লাস ৬–১২'} className="mt-1 w-full rounded-lg border border-slate-300 p-3"><option>ক্লাস ৬–১২</option><option>ইংরেজি ও স্কিল</option><option>ভর্তি প্রস্তুতি</option></select></label>
                <label className="text-sm font-semibold">শ্রেণি/কোর্স টাইপ<input name="className" defaultValue={editingCourse?.className || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">কোর্স ফি<input name="fee" defaultValue={editingCourse?.fee || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">মেয়াদ<input name="duration" defaultValue={editingCourse?.duration || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">ক্লাসের সময়সূচি<input name="schedule" defaultValue={editingCourse?.schedule || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">লাইভ/ভিডিও ক্লাস<input name="liveClasses" defaultValue={editingCourse?.liveClasses || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">শিক্ষক/ইনস্ট্রাক্টর<input name="instructor" defaultValue={editingCourse?.instructor || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">ছবির URL বা path<input name="image" defaultValue={editingCourse?.image || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
                <label className="text-sm font-semibold">ভর্তি স্ট্যাটাস<select name="status" defaultValue={editingCourse?.status || 'ভর্তি চলছে'} className="mt-1 w-full rounded-lg border border-slate-300 p-3"><option>ভর্তি চলছে</option><option>শীঘ্রই আসছে</option><option>ভর্তি বন্ধ</option></select></label>
              </div>
              <label className="block text-sm font-semibold">কোর্সের বিস্তারিত<textarea name="description" rows={3} defaultValue={editingCourse?.description || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
              <label className="block text-sm font-semibold">সিলেবাস (প্রতি লাইনে একটি বিষয়)<textarea name="syllabus" rows={4} defaultValue={editingCourse?.syllabus.join('\n') || ''} className="mt-1 w-full rounded-lg border border-slate-300 p-3"/></label>
              <div className="flex justify-end gap-2"><button type="button" onClick={() => setCourseFormOpen(false)} className="rounded-lg border px-4 py-2.5 font-bold">বাতিল</button><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#1F2A7C] px-4 py-2.5 font-bold text-white"><Save className="w-4 h-4"/> সংরক্ষণ</button></div>
            </form>
          </div>
        )}

        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-label="আবেদনের বিস্তারিত">
            <div className="my-auto w-full max-w-2xl rounded-2xl bg-white p-5 sm:p-7 shadow-2xl">
              <div className="flex items-start justify-between gap-3 border-b pb-4"><div><p className="text-sm font-bold text-[#1F2A7C]">{selectedApplication.id}</p><h2 className="text-2xl font-bold mt-1">{selectedApplication.studentName}</h2><p className="text-sm text-slate-500 mt-1">আবেদনের তারিখ: {selectedApplication.createdAt}</p></div><button type="button" onClick={() => setSelectedApplication(null)} aria-label="বন্ধ করুন" className="rounded-lg border p-2"><X className="w-5 h-5"/></button></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-5">
                {[['শিক্ষার্থীর নাম', selectedApplication.studentName], ['মোবাইল নম্বর', selectedApplication.phone], ['অভিভাবকের নম্বর', selectedApplication.guardianPhone], ['কোর্স', selectedApplication.courseTitle], ['শ্রেণি', selectedApplication.className], ['প্রতিষ্ঠান', selectedApplication.institution], ['ঠিকানা', selectedApplication.address], ['আবেদনের অবস্থা', selectedApplication.status || 'পেন্ডিং']].map(([label, value]) => <div key={label} className="rounded-lg border bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-1 font-bold break-words">{value || 'তথ্য দেওয়া হয়নি'}</p></div>)}
              </div>
              <div className="flex flex-wrap justify-end gap-2"><a href={`tel:${selectedApplication.phone}`} className="rounded-lg bg-[#EEF1FA] px-4 py-2.5 font-bold text-[#1F2A7C]">ফোন করুন</a><button type="button" onClick={() => { updateApplicationStatus(selectedApplication.id, 'ভর্তি কনফার্মড'); setSelectedApplication({...selectedApplication, status: 'ভর্তি কনফার্মড'}); }} className="rounded-lg bg-emerald-600 px-4 py-2.5 font-bold text-white">ভর্তি কনফার্ম</button><button type="button" onClick={() => setSelectedApplication(null)} className="rounded-lg border px-4 py-2.5 font-bold">বন্ধ করুন</button></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
