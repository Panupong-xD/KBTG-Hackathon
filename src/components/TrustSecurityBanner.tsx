import { Lock, FileCheck, ShieldCheck, RefreshCw, Check } from 'lucide-react';

export default function TrustSecurityBanner() {
  const trustPillars = [
    { icon: FileCheck, title: 'DATA WITH CONSENT', subtitle: 'ใช้ข้อมูลอะไร เพื่ออะไร',
      description: 'ออกแบบให้แจ้งประเภทข้อมูลและวัตถุประสงค์ก่อนเปิดใช้ ให้ถอนความยินยอมได้ โดยแยกจากการยืนยันย้ายเงินแต่ละครั้ง' },
    { icon: Lock, title: 'YOU DECIDE', subtitle: 'คุณกดเอง เงินถึงจะย้าย',
      description: 'เลือก Pocket ตรวจยอด แล้วยืนยันทุกครั้ง หากยังไม่ออม เงินสะสมก็ยังอยู่บัญชีหลัก ไม่มีหักอัตโนมัติ' },
    { icon: ShieldCheck, title: 'LIFE BEFORE SAVING', subtitle: 'ค่าใช้ชีวิตต้องมาก่อน',
      description: 'ตรวจเงินที่มี กันบิล เงินสำรอง และค่าใช้จ่ายระหว่างรอรับเงินก่อนชวนออม เพื่อให้ยังมีเงินพอสำหรับชีวิตประจำวัน' },
    { icon: RefreshCw, title: 'CLEAR ABOUT UNCERTAINTY', subtitle: 'เห็นโอกาส เข้าใจความเสี่ยง',
      description: 'เปอร์เซ็นต์เป็นการประเมินตามข้อมูลและช่วงเวลาที่ระบุ ไม่ใช่คำรับประกัน หากใช้เงินหลายบัญชีหรือมีภาระจากช่องทางอื่น แผนต้องอาศัยข้อมูลเพิ่มเติม' },
  ];

  return (
    <section id="security" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-[#00A950] bg-[#00A950]/10 px-3 py-1 rounded-full mb-3">
            TRUST BY DESIGN
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI ช่วยคิด คุณคุมเงิน
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            ความยินยอมและสิทธิ์ตัดสินใจ คือหลักการที่เราใช้ตั้งแต่ต้นในการออกแบบ K-Runway
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
                  <span>หลักการออกแบบ</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
