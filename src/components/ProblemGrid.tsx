'use client';

import { Check, Info } from 'lucide-react';
import { demoFinance } from '../lib/pocket-saving';

export default function ProblemGrid() {
  const problems = [
    { id: '01', title: 'INCOME TIMING GAP', thaiTitle: 'งานจบแล้ว แต่เงินยังไม่มา',
      description: 'บิลมีวันครบกำหนด แต่ค่าจ้างอาจเข้าช้าหรือได้ไม่เต็มจำนวน คนเริ่มทำงานที่รับงานอิสระหรือมีรายได้เสริมจึงต้องวางแผนให้เงินพอระหว่างรอรับเงิน',
      painPoint: 'บิลถึงกำหนดก่อนค่าจ้างเข้า จึงเสี่ยงเงินไม่พอระหว่างรอรับเงิน',
      aiSolution: 'ประเมินจังหวะเงินเข้า–ออกล่วงหน้า เพื่อแนะนำงบที่เผื่อความไม่แน่นอน' },
    { id: '02', title: 'TIMING MATTERS', thaiTitle: 'ยอดรวมดูเหมือนพอ แต่จังหวะเงินเข้าอาจไม่ทัน',
      description: `ยอดต้นวัน ฿${demoFinance.openingBalance.toLocaleString('en-US')} กันบิล ฿${demoFinance.fixedBills.toLocaleString('en-US')} รอค่าจ้าง ฿${demoFinance.pendingIncome.toLocaleString('en-US')} อีก ${demoFinance.daysUntilIncome} วัน หากนับเงินที่ยังไม่เข้าแล้วหารใช้ทุกวัน เงินสดอาจหมดก่อนรับค่าจ้าง`,
      painPoint: 'กะงบจากยอดรวมแล้ว อาจใช้เกินเงินที่มีพร้อมจ่ายจริง',
      aiSolution: <>แนะนำ <strong>“วันนี้ใช้ได้เท่าไหร่” </strong> คู่กับ <strong>“โอกาสเงินพอ”</strong> โดยไม่นับเงินรอรับเป็นเงินสดในบัญชี</> },
    { id: '03', title: 'UNCLEAR DAILY BUDGET', thaiTitle: 'รู้ว่าเงินจะตึง แต่ไม่รู้ควรใช้วันละเท่าไหร่',
      description: 'แม้รู้ล่วงหน้าว่าเงินอาจไม่พอ ก็ยังต้องคิดว่าจะปรับการใช้จ่ายอย่างไร เมื่อค่าจ้างเลื่อนหรือมีรายจ่ายแทรก แผนรายวันจึงควรปรับตามสถานการณ์',
      painPoint: 'รู้ว่าเงินอาจไม่พอ แต่ไม่รู้ต้องลดใช้วันละเท่าไหร่',
      aiSolution: 'คำนวณงบรายวันใหม่ และแจ้งเตือนเฉพาะเมื่อความเสี่ยงเพิ่มขึ้นชัดเจน' },
    { id: '04', title: 'SAVINGS UNDER PRESSURE', thaiTitle: 'ออมอยู่แล้ว แต่ต้องดึงเงินเก็บมาใช้ซ้ำ',
      description: 'เมื่อเงินไม่พอก่อนรอบรับเงิน คนที่มีเงินเก็บอาจต้องถอนมาประคอง ส่วนคนที่ยังไม่มีเงินสำรองอาจต้องยืมหรือพึ่งเครดิต จึงควรดูแลสภาพคล่องควบคู่กับการออม',
      painPoint: 'เงินที่ตั้งใจเก็บ ถูกดึงกลับมาใช้เมื่อรายจ่ายเกินแผน',
      aiSolution: <>ชวนเก็บเงินที่ใช้ไม่ถึงงบเข้า Pocket เมื่อพร้อม หรือคงเป็น <strong>“เงินสะสม”</strong> ในบัญชีหลักเพื่อรองรับวันที่ใช้เกินงบ</> },
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
            4 ปัญหาที่ K-Runway ตั้งใจช่วยแก้ให้คนเริ่มทำงานที่รายได้ไม่แน่นอน ทั้งเรื่องเงินพอใช้และเงินเก็บ
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
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">ปัญหาที่เจอ</span>
                    <span>{item.painPoint}</span>
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
