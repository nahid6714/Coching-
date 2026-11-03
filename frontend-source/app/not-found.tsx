import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FC] text-[#141A38] p-6 text-center">
      <h1 className="text-2xl font-bold text-[#212B6B]">পৃষ্ঠাটি পাওয়া যায়নি</h1>
      <p className="text-xs text-slate-500 mt-2">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই।
      </p>
      <Link
        href="/"
        className="mt-5 bg-[#212B6B] text-white text-xs font-semibold px-5 py-2.5 rounded-md hover:bg-[#182052] transition-colors"
      >
        হোমপেজে ফিরে যান
      </Link>
    </div>
  );
}
