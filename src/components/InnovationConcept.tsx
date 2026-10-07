'use client';

import { ArrowRight } from 'lucide-react';

export default function InnovationConcept() {
  return (
    <section id="concept" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* K PLUS Innovation Concept Card */}
        <div className="rounded-3xl bg-[#00A950] text-white p-8 sm:p-14 text-center shadow-xl shadow-emerald-700/20">
          
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-4 py-1.5 rounded-full mb-4">
            K PLUS Innovation Concept
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            มองเห็นเส้นทางการเงินล่วงหน้า<br />
            สร้างเงินออมก้อนแรกอย่างมั่นใจ
          </h2>

          <p className="mt-4 text-emerald-50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            โดยที่คุณเป็นผู้ควบคุมและตัดสินใจเอง 100% ปราศจากการบังคับตัดเงินส่วนตัว ลื่นไหล ปลอดภัยตามมาตรฐานสถาบันการเงิน
          </p>

          {/* Action Buttons (Restored without Early Prototype) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#how-it-works"
              className="w-full sm:w-auto bg-white text-[#008744] hover:bg-emerald-50 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>ดูขั้นตอนการทำงานอีกครั้ง</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#features"
              className="w-full sm:w-auto border border-white/40 hover:bg-white/10 text-white px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all"
            >
              สำรวจ 2 เสาหลักนวัตกรรม AI
            </a>
          </div>

          {/* Protection Subtext */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100">
            <span>• Overdraft Protection (Hard Floor ฿1,000)</span>
            <span>• PDPA Bounded Consent</span>
            <span>• Data Science & ML Driven</span>
            <span>• สิทธิการอนุมัติ 100% โดยผู้ใช้ (ไม่หักเงินเอง)</span>
          </div>

        </div>

      </div>
    </section>
  );
}
