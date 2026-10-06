'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Wifi,
  Signal,
  Bell,
  Sparkles,
  Power,
  ArrowRightLeft,
  Download,
  ScanLine,
  Banknote,
  Home,
  ShoppingBag,
  QrCode,
  User,
  CreditCard,
  Coins,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

interface KBankPhoneMockupProps {
  activeStep: number;
  onSelectStep?: (index: number) => void;
}

const cardSwipeVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 32 : direction < 0 ? -32 : 0,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 360, damping: 32 },
      opacity: { duration: 0.22, ease: 'easeOut' },
      scale: { duration: 0.22, ease: 'easeOut' },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -32 : direction < 0 ? 32 : 0,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 360, damping: 32 },
      opacity: { duration: 0.18, ease: 'easeIn' },
      scale: { duration: 0.18, ease: 'easeIn' },
    },
  }),
};

export default function KBankPhoneMockup({ activeStep, onSelectStep }: KBankPhoneMockupProps) {
  const [slideConfirmed, setSlideConfirmed] = useState(false);
  const [undone, setUndone] = useState(false);

  // Direction tracking for smooth horizontal swipe transition between steps
  const [direction, setDirection] = useState(0);
  const [prevStep, setPrevStep] = useState(activeStep);

  if (activeStep !== prevStep) {
    setDirection(activeStep > prevStep ? 1 : -1);
    setPrevStep(activeStep);
  }

  return (
    <div className="relative mx-auto flex flex-col items-center select-none">
      
      {/* Smartphone Hardware Frame (Matte Black Titanium iPhone with Side Buttons) */}
      <div className="relative w-[320px] sm:w-[355px] h-[700px] bg-[#0A0D10] rounded-[52px] p-[10px] shadow-2xl shadow-slate-900/40 border-[4px] border-[#1C2127] ring-1 ring-white/10">
        
        {/* Left Side Volume Buttons on Hardware Frame */}
        <div className="absolute -left-[6px] top-[110px] w-[3px] h-[28px] bg-[#1C2127] rounded-l-sm" />
        <div className="absolute -left-[6px] top-[148px] w-[3px] h-[48px] bg-[#1C2127] rounded-l-sm" />
        <div className="absolute -left-[6px] top-[204px] w-[3px] h-[48px] bg-[#1C2127] rounded-l-sm" />
        
        {/* Right Side Power Button on Hardware Frame */}
        <div className="absolute -right-[6px] top-[140px] w-[3px] h-[65px] bg-[#1C2127] rounded-r-sm" />

        {/* Screen Display Container */}
        <div className="relative w-full h-full bg-[#0E383C] text-white rounded-[42px] overflow-hidden flex flex-col font-sans">
          
          {/* iPhone Floating Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-[22px] w-[92px] bg-black rounded-full flex items-center justify-between px-3 z-50 shadow-sm pointer-events-none">
            {/* Camera sensor */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d] ring-1 ring-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1a2b3c]/60" />
            </div>
            {/* Ambient sensor */}
            <div className="w-2 h-2 rounded-full bg-[#151515] ring-1 ring-white/5" />
          </div>

          {/* iOS Status Bar (Pinned at top with beige lifestyle background) */}
          <div className="h-10 px-5 flex items-center justify-between text-xs text-slate-800 z-40 bg-[#F4EEDF] pt-1 shrink-0 select-none">
            {/* Clock with Location arrow */}
            <div className="flex items-center gap-1 pl-1">
              <span className="font-semibold text-xs tracking-tight">00:01</span>
              <svg className="w-2.5 h-2.5 text-slate-800 fill-current -rotate-45" viewBox="0 0 24 24">
                <path d="M12 2L2 22l10-4 10 4L12 2z" />
              </svg>
            </div>
            
            {/* Status Icons: Cellular, Wifi, Battery with percentage 82 */}
            <div className="flex items-center gap-1.5 text-slate-800 pr-1">
              <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <div className="flex items-center gap-0.5">
                <div className="relative w-5 h-2.5 rounded-[3px] border-[1.2px] border-slate-800 flex items-center p-0.5">
                  <div className="h-full bg-slate-800 rounded-[1px] w-[82%]" />
                  <div className="absolute -right-[3px] top-0.5 w-[1.5px] h-1.5 bg-slate-800 rounded-r-xs" />
                </div>
                <span className="text-[9px] font-bold text-slate-800 tracking-tight">82</span>
              </div>
            </div>
          </div>

          {/* App Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto pb-20 select-none scrollbar-none">
            
            {/* Top Beige Lifestyle Section (Brand-new K PLUS 2025 Theme) */}
            <div className="bg-gradient-to-b from-[#F4EEDF] via-[#EFE7D5] to-[#E5DAC1] px-4 pt-1.5 pb-4 text-slate-900 border-b border-[#0E383C]/20">
              
              {/* Header Navigation Bar */}
              <div className="relative flex items-center justify-between mb-3">
                {/* Left: 'การเงินของฉัน' Capsule Button with 4-Color Grid */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 hover:bg-white rounded-full shadow-xs border border-white/70 transition-colors"
                >
                  <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-emerald-500" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-rose-400" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-sky-400" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-800 tracking-tight">
                    การเงินของฉัน
                  </span>
                </button>

                {/* Center: K-Runway Concept Mark (No official KBank logo) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#00A950] to-[#007A3A] flex items-center justify-center shadow-xs">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19L19 4" />
                      <path d="M11 4H19V12" />
                      <path d="M4 12V19H11" opacity="0.6" />
                    </svg>
                  </div>
                  <span className="text-xs font-black tracking-tight text-slate-800">
                    K-Runway
                  </span>
                </div>

                {/* Right: Bell, Sparkles, Power Icons */}
                <div className="flex items-center gap-2.5 text-slate-700 pr-0.5">
                  <Bell className="w-4 h-4 stroke-[1.8] hover:text-slate-900 cursor-pointer" />
                  <Sparkles className="w-4 h-4 stroke-[1.8] hover:text-amber-600 cursor-pointer text-amber-600/80" />
                  <Power className="w-4 h-4 stroke-[1.8] hover:text-rose-600 cursor-pointer" />
                </div>
              </div>

              {/* Hero Lifestyle Promotional Banner */}
              <div className="relative flex items-center justify-between pt-1">
                {/* Banner Text on Left */}
                <div className="space-y-0.5 max-w-[190px]">
                  <div className="text-[11px] font-semibold text-slate-700 tracking-tight">
                    K-Runway ปรับใหม่
                  </div>
                  <div className="text-[13px] font-bold text-slate-900 leading-snug">
                    รู้ใจเรื่องจัดการเงิน
                  </div>
                  <div className="text-[10px] text-slate-600 leading-tight pt-0.5">
                    ยกระดับประสบการณ์ใช้งาน
                  </div>
                  <div className="text-[10px] text-slate-600 leading-tight">
                    จัดเมนูใหม่ เห็นชัด หาง่าย ใช้คล่อง
                  </div>
                </div>

                {/* Right Side: First Jobbers Stylized Lifestyle Composition */}
                <div className="relative w-24 h-16 shrink-0 flex items-center justify-center">
                  {/* Subtle golden ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/35 via-emerald-300/25 to-teal-400/25 rounded-2xl blur-sm" />
                  
                  {/* Stylized Avatars */}
                  <div className="relative flex items-center">
                    <div className="w-7 h-7 rounded-full bg-[#E57373] border-2 border-white shadow-xs flex items-center justify-center text-white">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#00A950] border-2 border-white shadow-sm -ml-2 z-10 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#1976D2] border-2 border-white shadow-xs -ml-2 flex items-center justify-center text-white">
                      <div className="w-2.5 h-3.5 rounded-[1px] bg-white/30 border border-white flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-emerald-300" />
                      </div>
                    </div>
                  </div>

                  {/* Golden Sparkle Accents */}
                  <div className="absolute -top-1 -right-0.5 text-amber-500">
                    <Sparkles className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="absolute bottom-0 -left-1 text-amber-400">
                    <Sparkles className="w-2 h-2 fill-amber-300 text-amber-300" />
                  </div>
                </div>
              </div>

              {/* Carousel Pagination Dots */}
              <div className="flex items-center gap-1 mt-2.5 pl-0.5">
                <span className="w-3 h-1 rounded-full bg-slate-800" />
                <span className="w-1 h-1 rounded-full bg-slate-400/70" />
              </div>

            </div>

            {/* Main Deep Teal Section (Dark Theme #0E383C) */}
            <div className="p-4 space-y-4 text-slate-100">
              
              {/* Section 1: 'เรื่องสำคัญวันนี้' / Interactive Innovation Card */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white tracking-wide">
                      เรื่องสำคัญวันนี้
                    </span>
                  </div>

                  {/* 5-step animated card indicators */}
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((stepIdx) => (
                      <button
                        type="button"
                        key={stepIdx}
                        onClick={() => onSelectStep && onSelectStep(stepIdx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          stepIdx === activeStep
                            ? 'w-4 bg-[#00A950]'
                            : 'w-1.5 bg-teal-800 hover:bg-teal-600'
                        }`}
                        title={`Step ${stepIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Dynamic Feature Card (Smooth Swiping Transition) */}
                <div className="relative bg-white text-slate-900 rounded-2xl shadow-lg min-h-[154px] overflow-hidden flex flex-col justify-center border border-slate-100/90 transition-all duration-300">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={activeStep}
                      custom={direction}
                      variants={cardSwipeVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="p-3.5 w-full h-full flex flex-col justify-center"
                    >
                      {/* State 1: Data Ingestion & Classification */}
                      {activeStep === 0 && (
                        <div className="my-auto">
                          <div className="flex items-start justify-between mb-2 pb-1.5 border-b border-slate-100">
                            <div>
                              <div className="text-[11px] font-medium text-slate-500">
                                ยอดเงินคงเหลือ
                              </div>
                              <div className="text-lg font-extrabold text-slate-900">฿15,000.00</div>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-semibold text-[#00A950] block">
                                AI Tagged
                              </span>
                              <span className="text-[9px] text-slate-400">Fixed รวม ฿7,160</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-700 font-medium text-[11px]">ค่าเช่าหอพัก & ห้องพัก</span>
                              <span className="text-[11px] text-blue-700 font-semibold">
                                Fixed -฿5,500
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-700 font-medium text-[11px]">ค่าน้ำไฟ + เน็ต & บิลประจำ</span>
                              <span className="text-[11px] text-blue-700 font-semibold">
                                Fixed -฿1,660
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* State 2: Probabilistic Cash-Flow Runway */}
                      {activeStep === 1 && (
                        <div className="my-auto py-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-900">Financial Runway</span>
                            <span className="text-xs font-extrabold text-[#00A950]">
                              85% Safe Zone
                            </span>
                          </div>

                          <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3.5 overflow-hidden">
                            <div className="bg-[#00A950] h-2.5 rounded-full transition-all duration-500" style={{ width: '85%' }} />
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                            <div>
                              <div className="text-[11px] text-slate-500 font-medium">ยอดใช้ได้วันนี้</div>
                              <div className="font-extrabold text-slate-900 text-sm mt-0.5">฿380 / วัน</div>
                            </div>
                            <div className="border-l border-slate-100 pl-3">
                              <div className="text-[11px] text-slate-500 font-medium">เงินเดือนออกใน</div>
                              <div className="font-extrabold text-[#00A950] text-sm mt-0.5">18 วัน <span className="text-[10px] text-slate-400 font-normal">(28 ก.ย.)</span></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* State 3: Safe-to-Sweep Detection & Recommendation */}
                      {activeStep === 2 && (
                        <div className="my-auto">
                          <div className="flex items-baseline justify-between mb-2 pb-1.5 border-b border-slate-100">
                            <span className="text-[11px] font-medium text-slate-500">ตรวจพบเงินเหลือจริงวันนี้</span>
                            <span className="text-lg font-extrabold text-[#00A950]">฿150.00</span>
                          </div>
                          
                          <div className="py-0.5 text-xs">
                            <div className="font-semibold text-slate-800 text-[11px] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A950]" />
                              แนะแนว Least-Disruptive Action
                            </div>
                            <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                              ลด Delivery ลง ฿80/วัน ดัน Safe Zone สู่ 92% โดยไม่กระทบชีวิต
                            </p>
                          </div>

                          <div className="pt-2 mt-1 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                            <span>เป้าหมาย: เงินสำรองฉุกเฉิน</span>
                            <span className="text-[#00A950] font-bold">เร็วขึ้น 3 วัน</span>
                          </div>
                        </div>
                      )}

                      {/* State 4: User Approval with Bounded Consent */}
                      {activeStep === 3 && (
                        <div className="my-auto">
                          <div className="flex items-baseline justify-between mb-2 pb-1.5 border-b border-slate-100">
                            <div>
                              <div className="text-[11px] font-medium text-slate-500">ยืนยันนำเงินเหลือไปออม</div>
                              <div className="text-base font-extrabold text-slate-900">฿150.00</div>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700">
                              Runway &gt; 80%
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSlideConfirmed(!slideConfirmed)}
                            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 my-1 ${
                              slideConfirmed
                                ? 'bg-[#00A950] text-white shadow-sm'
                                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                            }`}
                          >
                            {slideConfirmed ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> ยืนยันการออมเรียบร้อย
                              </>
                            ) : (
                              <>
                                <span>แตะเพื่อยืนยันออม ฿150</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>

                          <div className="text-[10px] text-slate-400 text-center font-medium mt-1">
                            ระบบไม่หักเงินเอง • ผู้ใช้เป็นคนกดยืนยัน 100%
                          </div>
                        </div>
                      )}

                      {/* State 5: Liquidity Shield & Multi-tier Routing */}
                      {activeStep === 4 && (
                        <div className="my-auto">
                          <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00A950]" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">โอนเข้าบัญชีเงินออมสำเร็จ!</div>
                              <div className="text-[10px] text-[#00A950] font-medium">รับดอกเบี้ย 1.25% ต่อปี* (เปิดบัญชีให้อัตโนมัติ)</div>
                            </div>
                          </div>

                          <div className="py-0.5 text-[11px] text-slate-600 space-y-0.5 mb-2">
                            <div className="font-semibold text-slate-800">Liquidity Shield คุ้มกัน ฿1,000 เสมอ</div>
                            <div className="text-slate-500">หากมีบิลด่วนฉุกเฉิน สามารถดึงเงินคืนได้ทันที</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setUndone(!undone)}
                            className="w-full py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{undone ? 'ดึงเงินกลับเรียบร้อย' : 'ยกเลิก / Undo (ภายใน 24 ชม.)'}</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Section 2: 4 Service Category Tiles (Directly Matching the New UI) */}
              <div className="grid grid-cols-4 gap-2 pt-0.5 text-center">
                {/* บัตรเครดิต */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-[#14484A] border border-teal-500/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <CreditCard className="w-5 h-5 text-teal-200" />
                  </div>
                  <span className="text-[10px] text-white font-medium mt-1.5">บัตรเครดิต</span>
                </div>

                {/* สินเชื่อ */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-[#442224] border border-rose-500/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Coins className="w-5 h-5 text-rose-200" />
                  </div>
                  <span className="text-[10px] text-white font-medium mt-1.5">สินเชื่อ</span>
                </div>

                {/* ลงทุน */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A4522] border border-emerald-500/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-5 h-5 text-emerald-200" />
                  </div>
                  <span className="text-[10px] text-white font-medium mt-1.5">ลงทุน</span>
                </div>

                {/* ประกัน */}
                <div className="flex flex-col items-center cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-[#113A5C] border border-blue-500/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5 text-sky-200" />
                  </div>
                  <span className="text-[10px] text-white font-medium mt-1.5">ประกัน</span>
                </div>
              </div>

              {/* Section 3: ธุรกรรมด่วน (Quick Transactions) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white tracking-wide">
                    ธุรกรรมด่วน
                  </span>
                  <span className="text-[11px] text-teal-200/80 hover:text-white flex items-center gap-0.5 cursor-pointer">
                    ดูทั้งหมด <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {/* โอนเงิน */}
                  <div className="flex flex-col items-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-teal-600/40 bg-[#143E42] flex items-center justify-center text-teal-100 group-hover:border-[#00A950] group-hover:text-white transition-colors">
                      <ArrowRightLeft className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-slate-200 font-medium mt-1.5">โอนเงิน</span>
                  </div>

                  {/* เติมเงิน */}
                  <div className="flex flex-col items-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-teal-600/40 bg-[#143E42] flex items-center justify-center text-teal-100 group-hover:border-[#00A950] group-hover:text-white transition-colors">
                      <Download className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-slate-200 font-medium mt-1.5">เติมเงิน</span>
                  </div>

                  {/* จ่ายบิล */}
                  <div className="flex flex-col items-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-teal-600/40 bg-[#143E42] flex items-center justify-center text-teal-100 group-hover:border-[#00A950] group-hover:text-white transition-colors">
                      <ScanLine className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-slate-200 font-medium mt-1.5">จ่ายบิล</span>
                  </div>

                  {/* ถอนเงิน/ฝากเงิน */}
                  <div className="flex flex-col items-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-teal-600/40 bg-[#143E42] flex items-center justify-center text-teal-100 group-hover:border-[#00A950] group-hover:text-white transition-colors">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-slate-200 font-medium mt-1.5 leading-tight">ถอนเงิน/<br />ฝากเงิน</span>
                  </div>
                </div>
              </div>

              {/* Section 4: ทางลัดของฉัน (My Shortcuts) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white tracking-wide">
                    ทางลัดของฉัน
                  </span>
                  <span className="text-[11px] text-teal-200/80 hover:text-white flex items-center gap-0.5 cursor-pointer">
                    ปรับแต่ง <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* ยังไม่มีรายการโปรด */}
                  <div className="bg-[#133A3E]/90 border border-teal-700/40 rounded-xl p-2.5 flex items-center justify-center min-h-[58px]">
                    <span className="text-[10px] text-slate-300 text-center leading-snug">
                      ยังไม่มีรายการโปรด
                    </span>
                  </div>

                  {/* จัดการ/ตั้งค่าบัญชี */}
                  <div className="bg-[#133A3E]/90 border border-teal-700/40 rounded-xl p-2.5 flex items-center justify-center min-h-[58px]">
                    <span className="text-[10px] text-slate-300 text-center leading-snug">
                      จัดการ/ตั้งค่าบัญชี
                    </span>
                  </div>

                  {/* สินทรัพย์ทั้งหมด with Pie Chart */}
                  <div className="bg-[#133A3E]/90 border border-teal-700/40 rounded-xl p-2.5 flex items-center gap-2 min-h-[58px]">
                    <div className="w-5 h-5 shrink-0 relative">
                      <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
                        <circle cx="16" cy="16" r="12" fill="none" stroke="#84CC16" strokeWidth="8" strokeDasharray="50 100" />
                        <circle cx="16" cy="16" r="12" fill="none" stroke="#EAB308" strokeWidth="8" strokeDasharray="25 100" strokeDashoffset="-50" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-white font-medium leading-tight">
                      สินทรัพย์ทั้งหมด
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Floating Navigation Bar (Authentic 2025 K PLUS Style - Dark Petrol Teal Dock) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0B2527]/95 backdrop-blur-md border-t border-teal-800/40 flex items-center justify-between px-3 z-40 text-slate-300">
            {/* หน้าแรก */}
            <div className="flex flex-col items-center cursor-pointer text-[#00A950]">
              <Home className="w-5 h-5 fill-[#00A950]" />
              <span className="text-[9px] font-bold mt-0.5">หน้าแรก</span>
            </div>

            {/* K+ market */}
            <div className="flex flex-col items-center cursor-pointer hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[9px] font-medium mt-0.5">K+ market</span>
            </div>

            {/* Elevated Banking Button (Round Center ฿) */}
            <div className="flex flex-col items-center -mt-6 cursor-pointer group">
              <div className="w-13 h-13 rounded-full bg-[#3B4D54] group-hover:bg-[#00A950] p-1 shadow-xl transition-colors flex items-center justify-center border-2 border-white/20">
                <div className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white font-extrabold text-base">
                  ฿
                </div>
              </div>
              <span className="text-[9px] font-medium text-slate-200 mt-0.5">ธุรกรรม</span>
            </div>

            {/* สแกน/สร้างQR */}
            <div className="flex flex-col items-center cursor-pointer hover:text-white transition-colors">
              <QrCode className="w-5 h-5" />
              <span className="text-[9px] font-medium mt-0.5">สแกน/สร้างQR</span>
            </div>

            {/* โปรไฟล์ */}
            <div className="flex flex-col items-center cursor-pointer hover:text-white transition-colors">
              <User className="w-5 h-5" />
              <span className="text-[9px] font-medium mt-0.5">โปรไฟล์</span>
            </div>
          </div>

          {/* Home Indicator Bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-50 pointer-events-none" />

        </div>
      </div>

    </div>
  );
}
