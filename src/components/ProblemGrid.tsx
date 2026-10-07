'use client';

import { Check, X } from 'lucide-react';

export default function ProblemGrid() {
  const problems = [
    {
      id: '01',
      title: 'Static Balance Trap',
      thaiTitle: 'กับดักยอดเงินคงเหลือ',
      description: 'First Jobber เห็นเงินในบัญชีเหลือ 15,000 บาทแล้วคิดว่ารอด แต่ความจริงมีค่าเช่าหอพัก ค่าน้ำไฟ และบิลประจำรอตัดก่อนเงินเดือนรอบใหม่อีก 7,160 บาท ทำให้เหลือเงินกินใช้จริงสำหรับ 18 วันที่เหลือแค่วันละ ฿380',
      traditionalApp: 'แสดงแค่ยอดเงินปัจจุบัน ไม่บอกว่าเงินนี้จะอยู่รอดได้อีกกี่วัน',
      aiSolution: 'คำนวณ Financial Runway เป็นหน่วย “จำนวนวัน” และ Safe Zone % ทันที'
    },
    {
      id: '02',
      title: 'Income & Lifestyle Volatility',
      thaiTitle: 'ค่าใช้จ่ายเข้าสังคมและไลฟ์สไตล์ผันผวน',
      description: 'ช่วงเริ่มทำงานมีค่าสังสรรค์เลี้ยงฉลองงานใหม่ และค่ากินเที่ยววันหยุดไม่แน่นอน การจัดงบประมาณแบบตายตัว (Fixed Budget 50/30/20) จึงล้มเหลวเสมอ',
      traditionalApp: 'บังคับแบ่งงบตายตัว พอมีเหตุฉุกเฉินงบก็แตกทันที',
      aiSolution: 'แปลงเป็นยอดใช้ได้ต่อวัน พร้อมระบบเกลี่ยชดเชยอย่างนุ่มนวลเมื่อใช้เกิน ไม่ทำให้ตกใจ'
    },
    {
      id: '03',
      title: 'Present Bias & Failed Savings',
      thaiTitle: 'ตั้งใจเก็บเงินก้อนแรก แต่ไม่เคยมีเหลือ',
      description: 'ตั้งใจสร้างเงินสำรองฉุกเฉินก้อนแรก แต่รอเงินเหลือสิ้นเดือนมักไม่เคยเหลือ หรือถ้าเก็บก่อนใช้แบบหักดิบก็ช็อตกลางเดือนจนต้องดึงเงินออมกลับมาใช้อยู่ดี',
      traditionalApp: 'แอบหักเงินอัตโนมัติ ทำให้ผู้ใช้รู้สึกสูญเสียการควบคุมเงินตัวเอง',
      aiSolution: 'ตรวจพบเงินเหลือสิ้นวัน แล้วยื่นปุ่มถามให้กดยืนยันออมเองใน 1 คลิก ไม่หักเงินสุ่มสี่สุ่มห้า'
    },
    {
      id: '04',
      title: 'Blind Recommendation',
      thaiTitle: 'คำแนะนำแบบกว้างๆ ไม่รู้จะเริ่มตรงไหน',
      description: 'แอปทั่วไปชอบเตือนแค่ “คุณควรประหยัดเงิน” แต่ First Jobbers ไม่รู้ว่าต้องเริ่มตัดค่าใช้จ่ายหมวดไหน วันละกี่บาท ที่กระทบคุณภาพชีวิตน้อยที่สุด',
      traditionalApp: 'เตือนกว้างๆ ไร้คำแนะนำที่ปฏิบัติได้จริง',
      aiSolution: 'แนะนำปรับพฤติกรรมที่กระทบชีวิตน้อยที่สุด (LDI) เช่น “ลด Food Delivery ฿80/วัน เพิ่มระดับความปลอดภัย +7%” (ตัวอย่างผลลัพธ์จากระบบ)'
    }
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
            ทำไม First Jobbers ถึง <span className="text-[#00A950]">“เงินช็อตสิ้นเดือน”</span> ?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            4 ปัญหาเชิงพฤติกรรมและการตัดสินใจทางการเงินของคนเริ่มทำงาน ที่แอปธนาคารแบบเดิมยังตอบโจทย์ได้ไม่ตรงจุด
          </p>
        </div>

        {/* 4 Cards Grid with Bold KBank Green Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-emerald-100 hover:border-[#00A950] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Green Number */}
                <div className="mb-4">
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

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Comparison Box with Enhanced Contrast and Icons */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2.5 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-0.5">แอปธนาคารแบบเดิม</span>
                    <span>{item.traditionalApp}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                  <div className="w-5 h-5 rounded-full bg-[#00A950] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-[#008744] block mb-0.5">K-Runway Solution</span>
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
