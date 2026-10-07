'use client';

import { ArrowDown, ArrowRight, ShieldCheck, Lock, Gauge } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-white border-b border-emerald-100 overflow-hidden">
      {/* Background Subtle Green Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none -z-10">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#00A950]/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-emerald-200/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Tagline Badge for Data Science Track & First Jobbers */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#008744] border border-emerald-200 mb-6 shadow-xs">
            <span>AI Cash-Flow Intelligence for First Jobbers</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight max-w-5xl leading-[1.22] sm:leading-[1.18]">
            <span className="inline-block">รู้ล่วงหน้าว่าเงินจะพอ</span><span className="inline-block">ถึงสิ้นเดือนไหม</span> <br className="hidden sm:inline" />
            <span className="inline-block">พร้อม AI แนะนำออมเงินที่คุณอนุมัติเองได้</span> <br className="hidden sm:inline" />
            <span className="text-[#00A950] inline-block">แบบปลอดภัย ไร้กังวล</span>
          </h1>

          {/* Sub-headline tailored to First Jobbers */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            เปลี่ยนแอป <strong className="text-slate-900 font-bold">K PLUS</strong> ให้ไม่ใช่แค่สมุดบัญชีที่ดูเงินในอดีต แต่ใช้ Machine Learning คำนวณ <strong className="text-slate-900 font-bold">ยอดใช้จ่ายที่ปลอดภัยต่อวัน</strong> ล่วงหน้าถึงวันเงินเดือนออก พร้อมตรวจจับเงินเหลือจริง <span className="text-[#00A950] font-bold underline decoration-[#00A950] decoration-2 underline-offset-4">(Safe-to-Sweep)</span> และยื่นปุ่มแนะนำให้คุณกดยืนยันออมด้วยตัวเอง 100% ไม่หักเงินโดยพลการ ช่วยให้ <span className="text-slate-900 font-bold">First Jobbers</span> คุมเงินได้อย่างมั่นใจ
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="#how-it-works"
              className="w-full sm:w-auto kbank-btn px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all"
            >
              <span>ดูขั้นตอนการทำงาน</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#problem"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 font-bold text-sm sm:text-base border border-emerald-200 flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>สำรวจปัญหาของ First Jobbers</span>
              <ArrowRight className="w-4 h-4 text-[#00A950]" />
            </a>
          </div>

          {/* Metric Badges แนวนอน */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl text-left">
            
            <div className="bg-white border-2 border-emerald-100 hover:border-[#00A950] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#00A950] border border-emerald-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Overdraft Protection</div>
                <div className="text-xs text-slate-500 mt-0.5">ออกแบบมาเพื่อป้องกันเงินติดลบด้วยเงินสำรองก้นบัญชี (Hard Floor)</div>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-100 hover:border-[#00A950] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">100% User Consent</div>
                <div className="text-xs text-slate-500 mt-0.5">ไม่หักเงินเองเด็ดขาด คุณกดยืนยันเองทุกครั้ง</div>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-100 hover:border-[#00A950] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Dynamic Runway Intelligence</div>
                <div className="text-xs text-slate-500 mt-0.5">บอกยอดใช้ได้ต่อวัน เกลี่ยชดเชยนุ่มนวลเมื่อเกิน</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
