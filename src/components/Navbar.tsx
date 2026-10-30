'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';

const links = [
  { href: '#problem', label: 'ทำไมต้องกะตังค์' },
  { href: '#how-it-works', label: 'เดโม 2 ขั้นตอน' },
  { href: '#features', label: 'เบื้องหลัง AI' },
  { href: '#security', label: 'ความยินยอมและข้อมูล' },
  { href: '#concept', label: 'เป้าหมาย' },
];

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
        scrolled || mobileMenuOpen
          ? 'bg-kt-paper/95 backdrop-blur-md border-b border-kt-line shadow-sm'
          : 'bg-kt-cream border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <a href="#" aria-label="กะตังค์ KaTang กลับด้านบน" className="shrink-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kt-leaf-strong">
            <BrandMark tagline />
          </a>

          <nav aria-label="เมนูหลัก" className="hidden lg:flex items-center gap-1 text-sm font-medium text-kt-muted">
            {links.map(link => <a key={link.href} href={link.href}
              className="px-3.5 py-2 rounded-full hover:bg-kt-sage hover:text-kt-leaf-strong transition-colors focus-visible:outline-2 focus-visible:outline-kt-leaf-strong">
              {link.label}
            </a>)}
          </nav>

          <div className="hidden sm:flex items-center shrink-0">
            <a href="#how-it-works" className="kt-btn px-5 py-2.5 text-sm font-semibold rounded-full flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kt-leaf-strong">
              <span>ลองใช้เดโม</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-2.5 rounded-full text-kt-ink hover:bg-kt-sage focus-visible:outline-2 focus-visible:outline-kt-leaf-strong"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-menu" aria-label="เมนูหลัก" className="lg:hidden border-t border-kt-line px-4 pt-3 pb-6">
          <ul className="space-y-1">
            {links.map(link => <li key={link.href}>
              <a href={link.href} onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl text-base font-medium text-kt-ink hover:bg-kt-sage">
                {link.label}
              </a>
            </li>)}
          </ul>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}
            className="kt-btn mt-4 w-full text-center py-3 rounded-full text-sm font-semibold block">
            ลองใช้เดโม
          </a>
        </nav>
      )}
    </header>
  );
}
