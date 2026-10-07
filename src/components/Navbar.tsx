'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Custom K-Runway Concept Mark (No official KBank logo) */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              <BrandMark className="group-hover:scale-105 transition-transform" />
              <div className="flex flex-col justify-center">
                <div className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-none flex items-center gap-1.5">
                  <span>K-Runway</span>
                  <span className="text-[#00A950] font-bold">&</span>
                  <span>Auto-Save</span>
                </div>
                <span className="text-[10px] font-bold text-[#00A950] tracking-wider uppercase leading-none mt-1">
                  Innovation Concept Prototype
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links (Spacious, elegant, non-cramped) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-[#00A950] transition-colors">
              ปัญหาที่พบ
            </a>
            <a href="#how-it-works" className="hover:text-[#00A950] transition-colors">
              ขั้นตอนการทำงาน
            </a>
            <a href="#features" className="hover:text-[#00A950] transition-colors">
              สถาปัตยกรรม AI
            </a>
            <a href="#security" className="hover:text-[#00A950] transition-colors">
              ความปลอดภัย
            </a>
            <a href="#concept" className="hover:text-[#00A950] transition-colors">
              Concept
            </a>
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#how-it-works"
              className="kbank-btn px-4 py-2 text-xs font-bold rounded-xl shadow-sm hover:brightness-105 flex items-center gap-1.5 transition-all"
            >
              <span>ทดลอง Walkthrough</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#00A950]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#problem"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#00A950]"
          >
            ปัญหาที่พบ (Pain Points)
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#00A950]"
          >
            ขั้นตอนการทำงาน (Walkthrough)
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#00A950]"
          >
            สถาปัตยกรรม AI
          </a>
          <a
            href="#security"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#00A950]"
          >
            ความปลอดภัย
          </a>
          <a
            href="#concept"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#00A950]"
          >
            Concept
          </a>
          <div className="pt-2">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl kbank-btn text-xs font-bold block"
            >
              ทดลอง Walkthrough
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
