'use client';

import React, {useEffect, useState} from 'react';
import {apiDelete, apiGet, apiPatch, apiPost, apiPut, listOf} from '@/lib/api';
import type {AdmissionApplication, ApplicationStatus, CourseItem} from '@/lib/types';

type FormState = {
  studentName: string;
  phone: string;
  guardianPhone: string;
  courseId: string;
  className: string;
  institution: string;
  address: string;
  status: ApplicationStatus;
};

const emptyForm: FormState = {
  studentName: '', phone: '', guardianPhone: '', courseId: '', className: '',
  institution: '', address: '', status: 'পেন্ডিং',
};

export default function ApplicationsManager({token}: {token: string}) {
  const [items, setItems] = useState<AdmissionApplication[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState<string | number | null>(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdmissionApplication | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const load = async () => {
    setLoading(true);
    try {
      const [applicationResult, courseResult] = await Promise.all([
        apiGet<any>('/admin/applications', token),
        apiGet<any>('/admin/courses', token),
      ]);
      setItems(listOf<AdmissionApplication>(applicationResult));
      setCourses(listOf<CourseItem>(courseResult));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'আবেদন লোড করা যায়নি।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, [token]);

  const start = (item?: AdmissionApplication) => {
    setEditing(item || null);
    setForm(item ? {
      studentName: item.studentName || '',
      phone: item.phone || '',
      guardianPhone: item.guardianPhone || '',
      courseId: item.courseId || '',
      className: item.className || '',
      institution: item.institution || '',
      address: item.address || '',
      status: item.status || 'পেন্ডিং',
    } : {...emptyForm, courseId: courses[0]?.id || ''});
    setFormOpen(true);
    setError('');
  };

  const change = (key: keyof FormState, value: string) => {
    setForm((current) => ({...current, [key]: value}));
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const payload = {
      student_name: form.studentName.trim(),
      phone: form.phone.trim(),
      guardian_phone: form.guardianPhone.trim() || null,
      course_id: form.courseId,
      class_name: form.className.trim() || null,
      institution: form.institution.trim() || null,
      address: form.address.trim() || null,
      status: form.status,
    };
    try {
      if (editing) await apiPut(`/admin/applications/${editing.id}`, payload, token);
      else await apiPost('/admin/applications', payload, token);
      setFormOpen(false);
      setEditing(null);
      setForm(emptyForm);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'আবেদন সংরক্ষণ করা যায়নি।');
    } finally {
      setBusy(false);
    }
  };

  const updateStatus = async (item: AdmissionApplication, status: ApplicationStatus) => {
    setBusyId(item.id);
    try {
      await apiPatch(`/admin/applications/${item.id}`, {status}, token);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'স্ট্যাটাস আপডেট হয়নি।');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item: AdmissionApplication) => {
    if (!window.confirm('এই আবেদনটি মুছে ফেলবেন?')) return;
    try {
      await apiDelete(`/admin/applications/${item.id}`, token);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'আবেদন মোছা যায়নি।');
    }
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold">ভর্তি আবেদন</h2>
          <p className="mt-1 text-sm text-slate-500">অনলাইন ও অফলাইন ভর্তি আবেদন তৈরি, সম্পাদনা ও স্ট্যাটাস পরিচালনা করুন।</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => void load()} className="rounded-lg border px-4 py-2 font-semibold">রিফ্রেশ</button>
          <button type="button" onClick={() => start()} className="rounded-lg bg-[#F5A623] px-4 py-2 font-bold text-[#141A38]">+ নতুন ভর্তি</button>
        </div>
      </div>

      {error && <div className="rounded-lg bg-rose-50 p-3 text-rose-700">{error}</div>}

      {formOpen && (
        <form onSubmit={save} className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-2">
          <div className="md:col-span-2 flex items-center justify-between">
            <h3 className="text-lg font-bold">{editing ? 'আবেদন সম্পাদনা' : 'নতুন অফলাইন / অনলাইন ভর্তি আবেদন'}</h3>
            <button type="button" onClick={() => {setFormOpen(false); setEditing(null);}} className="text-sm text-slate-500">বন্ধ করুন ✕</button>
          </div>
          <label className="block"><span className="mb-1 block text-sm font-semibold">শিক্ষার্থীর নাম *</span><input required value={form.studentName} onChange={e => change('studentName', e.target.value)} className="w-full rounded-lg border px-3 py-2.5" /></label>
          <label className="block"><span className="mb-1 block text-sm font-semibold">মোবাইল নম্বর *</span><input required pattern="01[0-9]{9}" title="১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন" value={form.phone} onChange={e => change('phone', e.target.value)} className="w-full rounded-lg border px-3 py-2.5" placeholder="01XXXXXXXXX" /></label>
          <label className="block"><span className="mb-1 block text-sm font-semibold">অভিভাবকের মোবাইল</span><input value={form.guardianPhone} onChange={e => change('guardianPhone', e.target.value)} className="w-full rounded-lg border px-3 py-2.5" /></label>
          <label className="block"><span className="mb-1 block text-sm font-semibold">কোর্স *</span><select required value={form.courseId} onChange={e => change('courseId', e.target.value)} className="w-full rounded-lg border px-3 py-2.5"><option value="">কোর্স নির্বাচন করুন</option>{courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}</select></label>
          <label className="block"><span className="mb-1 block text-sm font-semibold">শ্রেণি / গ্রুপ</span><input value={form.className} onChange={e => change('className', e.target.value)} className="w-full rounded-lg border px-3 py-2.5" /></label>
          <label className="block"><span className="mb-1 block text-sm font-semibold">প্রতিষ্ঠান</span><input value={form.institution} onChange={e => change('institution', e.target.value)} className="w-full rounded-lg border px-3 py-2.5" /></label>
          <label className="block md:col-span-2"><span className="mb-1 block text-sm font-semibold">ঠিকানা</span><textarea rows={2} value={form.address} onChange={e => change('address', e.target.value)} className="w-full rounded-lg border px-3 py-2.5" /></label>
          <label className="block"><span className="mb-1 block text-sm font-semibold">স্ট্যাটাস *</span><select value={form.status} onChange={e => change('status', e.target.value)} className="w-full rounded-lg border px-3 py-2.5"><option>পেন্ডিং</option><option>ভর্তি কনফার্মড</option><option>বাতিল</option></select></label>
          <div className="flex items-end gap-2"><button disabled={busy || courses.length === 0} className="rounded-lg bg-[#1F2A7C] px-5 py-2.5 font-bold text-white disabled:opacity-50">{busy ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}</button><button type="button" onClick={() => {setFormOpen(false); setEditing(null);}} className="rounded-lg border px-5 py-2.5 font-semibold">বাতিল</button></div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50"><tr>{['নাম / ফোন','কোর্স','শিক্ষার্থী তথ্য','আবেদনের তারিখ','স্ট্যাটাস','অ্যাকশন'].map(x=><th key={x} className="px-4 py-3 text-left">{x}</th>)}</tr></thead>
          <tbody className="divide-y">
            {loading ? <tr><td colSpan={6} className="p-8 text-center">লোড হচ্ছে...</td></tr> : items.length === 0 ? <tr><td colSpan={6} className="p-8 text-center text-slate-500">এখনো কোনো আবেদন জমা হয়নি। নতুন ভর্তি আবেদন বাটন থেকে অফলাইন আবেদন যোগ করুন।</td></tr> : items.map(item => (
              <tr key={item.id} className="align-top">
                <td className="px-4 py-3"><b>{item.studentName}</b><p className="text-slate-500">{item.phone}</p>{item.guardianPhone && <p className="text-slate-400">অভিভাবক: {item.guardianPhone}</p>}</td>
                <td className="px-4 py-3">{item.courseTitle || '—'}</td>
                <td className="px-4 py-3">{item.className}<p className="text-slate-500">{item.institution}</p><p className="text-slate-500">{item.address}</p></td>
                <td className="px-4 py-3">{item.createdAt || '—'}</td>
                <td className="px-4 py-3"><select disabled={busyId===item.id} value={item.status || 'পেন্ডিং'} onChange={e=>void updateStatus(item,e.target.value as ApplicationStatus)} className="rounded-lg border px-2 py-2"><option>পেন্ডিং</option><option>ভর্তি কনফার্মড</option><option>বাতিল</option></select></td>
                <td className="whitespace-nowrap px-4 py-3"><button onClick={() => start(item)} className="mr-3 font-bold text-blue-700">এডিট</button><button onClick={() => void remove(item)} className="font-bold text-rose-600">মুছুন</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
