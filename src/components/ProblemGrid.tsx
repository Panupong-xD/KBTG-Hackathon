'use client';

import { Check, X } from 'lucide-react';
import { dailyBudget, demoFinance } from '../lib/pocket-saving';

export default function ProblemGrid() {
  const problems = [
    { id: '01', title: 'INCOME TIMING GAP', thaiTitle: 'งานจบแล้ว แต่เงินยังไม่มา',
      description: 'รายจ่ายและบิลตัดตรงเวลาทุกเดือน แต่ค่าจ้างฟรีแลนซ์เข้าไม่แน่นอน ช่วงรอยต่อที่เงินก้อนถัดไปยังไม่เข้า จึงมักจบด้วยการรูดบัตร ผ่อน หรือยืมประคอง',
      traditionalApp: 'เห็นแค่ยอดคงเหลือวันนี้ แต่ไม่เห็นช่วงรอยต่อที่เงินจะขาดมือ',
      aiSolution: 'พยากรณ์ทั้งเงินเข้าและเงินออกล่วงหน้า เพื่อวางแผนข้ามช่วงรอยต่อได้อย่างปลอดภัย' },
    { id: '02', title: 'AVERAGE BUDGET TRAP', thaiTitle: 'หารเฉลี่ยดูเหมือนพอ แต่ใช้จริงเงินช็อต',
      description: `ยอดต้นวัน ฿${demoFinance.openingBalance.toLocaleString('en-US')} กันบิล ฿${demoFinance.fixedBills.toLocaleString('en-US')} รอค่าจ้าง ฿${demoFinance.pendingIncome.toLocaleString('en-US')} อีก ${demoFinance.daysUntilIncome} วัน หากนับเงินที่ยังไม่เข้าแล้วหารใช้ทุกวัน เงินสดอาจหมดก่อนรับค่าจ้าง`,
      traditionalApp: 'การหารเท่ากันทุกวัน นับรวมเงินอนาคตเหมือนได้มาแล้ว',
      aiSolution: <>แนะนำ <strong>“ยอดวันนี้ใช้ได้” </strong> พร้อม <strong>“โอกาสเงินพอ”</strong> โดยคิดเผื่อรายรับที่อาจเลื่อน</> },
    { id: '03', title: 'LATE WARNING', thaiTitle: 'แผนเปลี่ยนเงียบๆ รู้ตัวอีกทีตอนเงินตึง',
      description: 'เมื่อค่าจ้างเลื่อนหรือมีรายจ่ายแทรก แผนที่คิดไว้ก็รวนทันที ยิ่งตอนเงินน้อยคนยิ่งเลี่ยงเปิดแอปดูยอด รู้ตัวอีกทีตอนเงินไม่พอจ่ายบิลแล้ว',
      traditionalApp: 'ต้องคอยเปิดแอปมาคำนวณใหม่เอง ไม่มีสัญญาณเตือนล่วงหน้า',
      aiSolution: 'เตือนเชิงรุกเฉพาะเมื่อความเสี่ยงเพิ่ม พร้อมปรับงบรายวันใหม่ให้รับมือทัน' },
    { id: '04', title: 'MISSED SAVING MOMENTS', thaiTitle: 'ประหยัดได้เป็นบางวัน แต่เงินเก็บไม่โต',
      description: 'วันไหนใช้ต่ำกว่างบ เงินที่อุตส่าห์ประหยัดได้ก็ยังปนอยู่ในบัญชีเดิม พอวันรุ่งขึ้นเผลอใช้เพลิน โอกาสสร้างเงินสำรองก้อนแรกจึงหลุดมือ',
      traditionalApp: 'เงินที่ประหยัดได้ปนกับเงินรอใช้ จนไม่รู้ว่าแยกเก็บได้เท่าไหร่',
      aiSolution: <>มีการ์ดชวนออมเข้า Pocket ใน K-ePocket แบบกดเอง และพักส่วนที่ใช้ไม่ถึงงบเป็น <strong>“เงินสะสม”</strong> ไว้ให้เลือกเก็บหรือยกไปรอบถัดไป</> },
  ];

  return (
    <section id="problem" className="py-20 bg-emerald-50/30 border-b border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-[#00A950] bg-[#00A950]/10 px-3.5 py-1 rounded-full mb-3 border border-[#00A950]/20">
            FIRST JOBBER PAIN POINTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            ยอดเงินยังเหลือ <span className="text-[#00A950]">ทำไมถึงไปต่อไม่ไหว?</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            4 ช่องว่างที่เราอยากแก้ให้คนเริ่มทำงาน เมื่อวันรับเงินไม่แน่นอน แต่ค่าใช้จ่ายยังเดินต่อ
          </p>
        </div>

        {/* 4 Cards Grid with Bold KBank Green Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-emerald-100 hover:border-[#00A950] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group"
            >
              <div>
                {/* Top Row: Green Number */}
                <div className="mb-3">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-[#00A950] group-hover:scale-105 transition-transform inline-block">
                    {item.id}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#00A950] uppercase tracking-wider mb-1">
                  {item.title}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {item.thaiTitle}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Comparison Box with Enhanced Contrast and Icons */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2.5 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">จุดบอดของการกะงบแบบเดิม</span>
                    <span>{item.traditionalApp}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                  <div className="w-5 h-5 rounded-full bg-[#00A950] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-[#008744] block mb-0.5">K-Runway ช่วยอย่างไร</span>
                    <span>{item.aiSolution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
