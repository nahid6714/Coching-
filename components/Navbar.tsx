'use client';

import React, {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, X, ChevronDown} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<
    string | null
  >(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(
    null
  );
  const [loggedInName, setLoggedInName] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncAuth = () => {
      try {
        const raw = localStorage.getItem('infinity_current_user');
        if (raw) {
          const parsed = JSON.parse(raw);
          setLoggedInName(parsed?.name || null);
        } else {
          setLoggedInName(null);
        }
      } catch {
        setLoggedInName(null);
      }
    };
    syncAuth();
    window.addEventListener('auth-change', syncAuth);
    return () => window.removeEventListener('auth-change', syncAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDesktopDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDesktopDropdown = (key: string) => {
    setActiveDesktopDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileSubmenu = (key: string) => {
    setActiveMobileSubmenu((prev) => (prev === key ? null : key));
  };

  const closeAll = () => {
    setMobileOpen(false);
    setActiveDesktopDropdown(null);
    setActiveMobileSubmenu(null);
  };

  const dropdownMenus = [
    {
      key: 'academic',
      label: 'ক্লাস ৬–১২',
      items: [
        {href: '/courses/hsc-science', label: 'এইচএসসি ২০২৬ পূর্ণাঙ্গ ব্যাচ'},
        {href: '/courses/ssc-class10', label: 'এসএসসি (দশম শ্রেণি) ব্যাচ'},
        {href: '/courses/class-9', label: 'নবম শ্রেণি ফাউন্ডেশন ব্যাচ'},
        {href: '/courses/class-6-8', label: 'ষষ্ঠ–অষ্টম শ্রেণি ব্যাচ'},
        {href: '/courses?category=ক্লাস ৬–১২', label: 'সব একাডেমিক কোর্স দেখুন →'},
      ],
    },
    {
      key: 'skills',
      label: 'ইংরেজি ও স্কিল',
      items: [
        {href: '/courses/spoken-english', label: 'স্পোকেন ইংলিশ কোর্স'},
        {href: '/courses/ielts-prep', label: 'আইইএলটিএস (IELTS) প্রস্তুতি'},
        {href: '/courses/kids-english', label: 'কিডস ইংলিশ কোর্স'},
        {href: '/courses/mock-test', label: 'অনলাইন মক টেস্ট সিরিজ'},
        {href: '/courses?category=ইংরেজি ও স্কিল', label: 'সব স্কিল কোর্স দেখুন →'},
      ],
    },
    {
      key: 'more',
      label: 'আরও',
      items: [
        {href: '/courses/admission-prep', label: 'ভর্তি প্রস্তুতি (মেডিকেল ও বুয়েট)'},
        {href: '/free-classes', label: 'ফ্রি ডেমো ক্লাস'},
        {href: '/teachers', label: 'শিক্ষক পরিচিতি'},
        {href: '/about', label: 'আমাদের সম্পর্কে ও যোগাযোগ'},
        {href: '/enroll', label: 'ভর্তি আবেদন ফরম'},
        {href: '/register', label: 'নতুন শিক্ষার্থী রেজিস্ট্রেশন'},
      ],
    },
  ];

  return (
    <div ref={navRef} className="sticky top-0 z-40">
      {/* Top Dark Utility Bar */}
      <div className="bg-[#141A38] text-slate-200 text-sm py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span>হেল্পলাইন: ০৯৬১০-০০১১২২</span>
          <div className="flex items-center gap-6">
            <Link
              href="/free-classes"
              onClick={closeAll}
              className="hover:text-[#F5A623] transition-colors"
            >
              ফ্রি রিসোর্স
            </Link>
            <Link
              href="/about"
              onClick={closeAll}
              className="hover:text-[#F5A623] transition-colors"
            >
              অফলাইন সেন্টার
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="bg-white border-b border-slate-200 shadow-xs px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeAll}
            className="flex items-center gap-3 shrink-0"
          >
            <svg
              width="40"
              height="24"
              viewBox="0 0 36 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#F5A623]"
            >
              <path
                d="M9.5 3C5.35786 3 2 6.13401 2 10C2 13.866 5.35786 17 9.5 17C12.85 17 15.65 14.6 18 11.5C20.35 14.6 23.15 17 26.5 17C30.6421 17 34 13.866 34 10C34 6.13401 30.6421 3 26.5 3C23.15 3 20.35 5.4 18 8.5C15.65 5.4 12.85 3 9.5 3Z"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-latin)] font-extrabold text-lg tracking-[0.06em] text-[#1F2A7C]">
                INFINITY
              </span>
              <span className="font-[family-name:var(--font-latin)] font-semibold text-[10px] tracking-[0.32em] text-slate-500 mt-0.5">
                ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Smooth Exclusive Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6 text-base font-semibold text-slate-700">
            <Link
              href="/"
              onClick={closeAll}
              className={`hover:text-[#1F2A7C] transition-colors ${
                pathname === '/' ? 'text-[#1F2A7C] font-bold' : ''
              }`}
            >
              হোম
            </Link>

            {dropdownMenus.map((menu) => {
              const isOpen = activeDesktopDropdown === menu.key;
              return (
                <div key={menu.key} className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDesktopDropdown(menu.key)}
                    className={`flex items-center gap-1.5 py-1 hover:text-[#1F2A7C] transition-colors cursor-pointer ${
                      isOpen ? 'text-[#1F2A7C] font-bold' : ''
                    }`}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180 text-[#F5A623]' : ''
                      }`}
                    />
                  </button>

                  {/* Smooth Desktop Dropdown Panel */}
                  <div
                    className={`absolute left-0 top-full pt-3 w-64 transition-all duration-300 ease-in-out origin-top ${
                      isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-[#F5A623] shadow-lg py-2 overflow-hidden">
                      {menu.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeAll}
                          className="block px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#EEF1FA] hover:text-[#1F2A7C] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <Link
              href="/free-classes"
              onClick={closeAll}
              className={`hover:text-[#1F2A7C] transition-colors ${
                pathname === '/free-classes' ? 'text-[#1F2A7C] font-bold' : ''
              }`}
            >
              ফ্রি ক্লাস
            </Link>

            <Link
              href="/teachers"
              onClick={closeAll}
              className={`hover:text-[#1F2A7C] transition-colors ${
                pathname === '/teachers' ? 'text-[#1F2A7C] font-bold' : ''
              }`}
            >
              শিক্ষকবৃন্দ
            </Link>
          </nav>

          {/* Right Action Buttons: "কোর্সসমূহ" + "লগইন" + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Link
              href="/courses"
              onClick={closeAll}
              className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] text-sm sm:text-base font-bold px-4 sm:px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              কোর্সসমূহ
            </Link>
            <Link
              href="/login"
              onClick={closeAll}
              className="bg-[#1F2A7C] hover:bg-[#151d57] text-white text-sm sm:text-base font-bold px-4 sm:px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              {loggedInName ? loggedInName.split(' ')[0] : 'লগইন'}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen((prev) => !prev);
                setActiveMobileSubmenu(null);
              }}
              aria-label="মেনু"
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-[#141A38] hover:bg-slate-100 cursor-pointer transition-colors"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Smooth Accordion Dropdowns (One open at a time) */}
        <div
          className={`lg:hidden grid transition-all duration-300 ease-in-out ${
            mobileOpen
              ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100'
              : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 pb-2">
              <Link
                href="/"
                onClick={closeAll}
                className="px-3 py-2.5 rounded-lg text-base font-bold text-[#141A38] hover:bg-slate-100 transition-colors"
              >
                হোম
              </Link>

              {dropdownMenus.map((menu) => {
                const isSubOpen = activeMobileSubmenu === menu.key;
                return (
                  <div
                    key={menu.key}
                    className="rounded-lg border border-slate-100 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu(menu.key)}
                      className={`w-full px-3 py-2.5 flex items-center justify-between text-left text-base font-bold transition-colors cursor-pointer ${
                        isSubOpen
                          ? 'bg-[#EEF1FA] text-[#1F2A7C]'
                          : 'text-[#141A38] hover:bg-slate-50'
                      }`}
                    >
                      <span>{menu.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                          isSubOpen ? 'rotate-180 text-[#1F2A7C]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isSubOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden bg-[#F8F9FC]">
                        <div className="py-1.5 px-3 flex flex-col gap-1 border-t border-slate-100">
                          {menu.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={closeAll}
                              className="py-2 px-2 rounded-md text-sm font-semibold text-slate-700 hover:text-[#1F2A7C] hover:bg-white transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link
                href="/enroll"
                onClick={closeAll}
                className="mt-2 px-3 py-2.5 rounded-lg text-base font-bold bg-[#1F2A7C] text-white text-center transition-colors"
              >
                ভর্তি আবেদন ফরম
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
