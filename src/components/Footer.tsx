'use client';

import { ArrowUp } from 'lucide-react';
import BrandMark from './BrandMark';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-emerald-100 text-slate-500 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand with Custom K-Runway Concept Mark (No official KBank logo) */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <BrandMark />
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-slate-900 text-base leading-none">
                  K-Runway
                </span>
                <span className="text-[10px] font-bold text-[#00A950] tracking-wider uppercase leading-none mt-1">
                  KBTG Hackathon · Concept Demo
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-md">
              AI Co-pilot สำหรับ First Jobber อายุ 22–30 ปี เริ่มจากฟรีแลนซ์ที่รายได้ไม่แน่นอน รู้ก่อนเงินตึง และให้เงินเหลือไปถึงเป้าหมายใน K-ePocket
            </p>
            <div className="text-[11px] text-slate-500 font-medium">
              ต้นแบบสำหรับ KBTG Hackathon ใช้ข้อมูลและเปอร์เซ็นต์จำลอง ไม่มีการโอนเงินจริง และไม่ใช่บริการทางการของธนาคาร กลุ่มหลักยังอยู่ระหว่างยืนยันด้วย survey; การแจ้งเตือนและการเลือกจัดการเงินสิ้นรอบเป็นแนวคิดต่อยอด
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">
              สำรวจ K-Runway
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#problem" className="hover:text-[#00A950] transition-colors">
                  01. ปัญหาของ First Jobbers
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#00A950] transition-colors">
                  02. ดูเงินและออมใน 2 ขั้นตอน
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#00A950] transition-colors">
                  03. เบื้องหลัง AI & K-ePocket
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-[#00A950] transition-colors">
                  04. AI ช่วยคิด คุณคุมเงิน
                </a>
              </li>
              <li>
                <a href="#concept" className="hover:text-[#00A950] transition-colors">
                  05. ไอเดียที่เราอยากสร้าง
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-3">
              เบื้องหลังต้นแบบ
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• Data Science & Time-Series ML</li>
              <li>• Monte Carlo Probabilistic Sim</li>
              <li>• Least-Disruptive Intervention (LDI)</li>
              <li>• Next.js & React (TypeScript)</li>
              <li>• Tailwind CSS & KBank Palette</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 K-Runway Prototype. Designed for KBTG Data Science Track Innovation Concept (Non-official).
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#00A950] transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>กลับขึ้นด้านบน</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
