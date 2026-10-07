'use client';

import { Lock, FileCheck, ShieldCheck, RefreshCw, Check } from 'lucide-react';

export default function TrustSecurityBanner() {
  const trustPillars = [
    {
      icon: Lock,
      title: 'Bank-Grade Security',
      subtitle: 'การเข้ารหัสระดับสถาบันการเงิน',
      description: 'ส่งข้อมูลผ่าน TLS 1.3 และจัดเก็บด้วย AES-256 Encryption พร้อม Hardware Security Module (HSM) Tokenization'
    },
    {
      icon: FileCheck,
      title: 'PDPA & Bounded Consent',
      subtitle: 'ความยินยอมที่โปร่งใสและตรวจสอบได้',
      description: 'สอดคล้องตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล ผู้ใช้กำหนดเพดานเงินและเงื่อนไขเอง และเพิกถอนได้ตลอด 24 ชม.'
    },
    {
      icon: ShieldCheck,
      title: 'Overdraft Protection',
      subtitle: 'ป้องกันบัญชีติดลบด้วย Hard Floor',
      description: 'มีเงินสำรองก้นบัญชีคุ้มกันเงินติดบัญชี ฿1,000 เสมอ และตรวจสอบตารางหนี้สินและบิลล่วงหน้าก่อนยื่นปุ่มแนะนำออมทุกครั้ง'
    },
    {
      icon: RefreshCw,
      title: 'Anti-Feedback Loop',
      subtitle: 'สถาปัตยกรรมตัดลูปความเสี่ยง',
      description: 'แยกบัญชีเงินออมออกจากระบบคำนวณ Runway ป้องกันไม่ให้การออมเงินไปลดตัวเลข Runway จนเกิดการเข้าใจผิด'
    }
  ];

  return (
    <section id="security" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-[#00A950] bg-[#00A950]/10 px-3 py-1 rounded-full mb-3">
            SECURITY & COMPLIANCE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            มาตรฐานความปลอดภัยระดับธนาคาร
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            ออกแบบตามมาตรฐานความมั่นคงปลอดภัยและธรรมาภิบาลข้อมูลทางการเงิน
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00A950] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#00A950] uppercase tracking-wider mb-1">
                    {item.title}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.subtitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs text-[#00A950] font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
