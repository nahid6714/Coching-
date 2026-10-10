'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {ChevronDown} from 'lucide-react';

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const footerGroups = [
    {
      key: 'company',
      title: 'কোম্পানি',
      links: [
        {href: '/about', label: 'আমাদের সম্পর্কে'},
        {href: '/teachers', label: 'শিক্ষক পরিচিতি'},
        {href: '/about', label: 'গোপনীয়তা নীতি'},
      ],
    },
    {
      key: 'resources',
      title: 'কোর্স ও রিসোর্স',
      links: [
        {href: '/courses', label: 'সব কোর্সসমূহ'},
        {href: '/free-classes', label: 'ফ্রি ক্লাস দেখুন'},
        {href: '/enroll', label: 'ভর্তি আবেদন ফরম'},
      ],
    },
    {
      key: 'social',
      title: 'সোশ্যাল মিডিয়া ও যোগাযোগ',
      links: [
        {href: '/about', label: 'Facebook'},
        {href: '/free-classes', label: 'YouTube'},
        {href: '/about', label: 'Instagram'},
      ],
    },
  ];

  return (
    <footer className="bg-[#141A38] text-white pt-8 md:pt-12 pb-6 md:pb-8 px-4 sm:px-8 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 pb-6 md:pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Compact Contact */}
          <div className="pb-3 md:pb-0 border-b border-slate-800/80 md:border-none">
            <h3 className="font-[family-name:var(--font-latin)] font-extrabold text-base md:text-lg tracking-wider text-white">
              INFINITY ACADEMY
            </h3>
            <p className="text-xs md:text-sm text-slate-300 mt-1.5 md:mt-3">
              হেল্পলাইন: ০৯৬১০-০০১১২২ · ফার্মগেট, ঢাকা
            </p>
            <p className="hidden md:block text-sm text-slate-400 mt-1.5">
              ইমেইল: info@infinityacademy.edu.bd
            </p>
          </div>

          {/* Cols 2, 3, 4: Smoothly Animated Exclusive Accordion on Mobile, Expanded on Desktop */}
          {footerGroups.map((group) => {
            const isOpen = openSection === group.key;
            return (
              <div
                key={group.key}
                className="border-b border-slate-800/80 md:border-none"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(group.key)}
                  aria-expanded={isOpen}
                  className="w-full py-2.5 md:py-0 flex items-center justify-between text-left text-sm md:text-base font-bold text-white md:mb-3.5 cursor-pointer md:cursor-default"
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ease-in-out md:hidden ${
                      isOpen ? 'rotate-180 text-[#F5A623]' : ''
                    }`}
                  />
                </button>

                {/* Smooth Height & Opacity Transition on Mobile, Always Open on Desktop */}
                <div
                  className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 pb-3 md:pb-0'
                      : 'grid-rows-[0fr] opacity-0 pb-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="text-sm text-slate-300 space-y-2 pt-1 md:pt-0">
                      {group.links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            href={link.href}
                            className="hover:text-[#F5A623] transition-colors block py-0.5"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 md:pt-6 text-xs md:text-sm text-slate-400 text-center md:text-left">
          © ২০২৬ INFINITY ACADEMY. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
