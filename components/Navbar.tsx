'use client';

import React, {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, X, Phone} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAll = () => {
    setMobileOpen(false);
  };

  const navItems = [
    {href: '/', label: 'হোম'},
    {href: '/courses', label: 'কোর্সসমূহ'},
    {href: '/free-classes', label: 'ফ্রি ক্লাস'},
    {href: '/teachers', label: 'শিক্ষক'},
    {href: '/about', label: 'যোগাযোগ'},
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div ref={navRef} className="sticky top-0 z-40">
      {/* Top Dark Utility Bar */}
      <div className="bg-[#141A38] text-slate-200 text-sm py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a
            href="tel:09610001122"
            className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>হেল্পলাইন: ০৯৬১০-০০১১২২</span>
          </a>
          <div className="flex items-center gap-5">
            <Link
              href="/free-classes"
              onClick={closeAll}
              className="hover:text-[#F5A623] transition-colors"
            >
              ফ্রি ক্লাস
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
          {/* Brand Logo */}
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

          {/* Clean 5-Item Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-base sm:text-lg font-semibold text-slate-700">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className={`py-1 transition-colors relative ${
                    active
                      ? 'text-[#1F2A7C] font-bold after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-[#F5A623] after:rounded-full'
                      : 'hover:text-[#1F2A7C]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Single Prominent CTA Button: "ভর্তি হও" + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/enroll"
              onClick={closeAll}
              className="bg-[#F5A623] hover:bg-[#e09416] text-[#141A38] text-base sm:text-lg font-bold px-5 sm:px-7 py-2.5 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              ভর্তি হও
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
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

        {/* Smooth Mobile Drawer */}
        <div
          className={`lg:hidden grid transition-all duration-300 ease-in-out ${
            mobileOpen
              ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100'
              : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1.5 pb-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className={`px-3.5 py-2.5 rounded-lg text-base font-bold transition-colors ${
                      active
                        ? 'bg-[#EEF1FA] text-[#1F2A7C]'
                        : 'text-[#141A38] hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/enroll"
                onClick={closeAll}
                className="mt-2 px-4 py-3 rounded-lg text-base font-bold bg-[#1F2A7C] text-white text-center transition-colors"
              >
                ভর্তি হও →
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
