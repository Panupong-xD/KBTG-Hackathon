'use client';

import { ArrowUp } from 'lucide-react';
import BrandMark from './BrandMark';
import Mascot from './Mascot';

const explore = [
  { href: '#problem', label: '01 · โจทย์ของคนเริ่มทำงาน' },
  { href: '#how-it-works', label: '02 · ดูเงินและออมใน 2 ขั้นตอน' },
  { href: '#features', label: '03 · เบื้องหลัง AI & Pocket' },
  { href: '#security', label: '04 · AI ช่วยคิด คุณคุมเงิน' },
  { href: '#concept', label: '05 · เป้าหมายของกะตังค์' },
];

const tech = ['ML สำหรับแนวโน้มเงินเข้า–ออก', 'Monte Carlo จำลองความไม่แน่นอน', 'ชวนออมเมื่อมีเงินพร้อมเก็บ', 'เงินสะสมในบัญชีหลัก', 'เลือก Pocket และยืนยันเอง'];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-kt-paper border-t border-kt-line text-kt-muted text-sm pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          <div className="md:col-span-6 space-y-4">
            <BrandMark tagline />
            <p className="text-kt-muted leading-relaxed max-w-md">
              แนวคิดผู้ช่วยการเงิน AI สำหรับ First Jobber ที่รายได้ไม่แน่นอน ทั้งฟรีแลนซ์และคนทำงานที่รับงานเสริม วางแผนให้เงินพอใช้ พร้อมเก็บเงินเข้า Pocket ที่คุณเลือก
            </p>
            <p className="text-xs text-kt-muted leading-relaxed max-w-md bg-kt-cream border border-kt-line rounded-2xl p-3.5">
              ต้นแบบสำหรับการแข่งขัน Hackathon 2026 ใช้ข้อมูลและเปอร์เซ็นต์ตัวอย่าง ไม่มีการโอนเงินจริง และไม่ใช่บริการทางการของธนาคาร กำลังศึกษากลุ่มเป้าหมายเพิ่มเติม ส่วนการแจ้งเตือน การจัดการเงินสิ้นรอบ และการยกเลิกใน 24 ชั่วโมงยังไม่อยู่ในเดโม
            </p>
          </div>

          <nav aria-label="สำรวจกะตังค์" className="md:col-span-3">
            <h4 className="font-brand text-lg text-kt-ink mb-3">สำรวจกะตังค์</h4>
            <ul className="space-y-2.5">
              {explore.map(item => <li key={item.href}>
                <a href={item.href} className="hover:text-kt-leaf-strong transition-colors">{item.label}</a>
              </li>)}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h4 className="font-brand text-lg text-kt-ink mb-3">เบื้องหลังต้นแบบ</h4>
            <ul className="space-y-2.5">
              {tech.map(item => <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-kt-leaf shrink-0" />{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-kt-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Mascot pose="sleepy" width={36} className="w-9 h-auto" />
            <span>© 2026 กะตังค์ KaTang · ทีมผู้พัฒนา · Hackathon · Data Science & Intelligence</span>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full bg-kt-sage hover:bg-kt-tint text-kt-leaf-strong transition-colors flex items-center gap-1.5 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-kt-leaf-strong"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>กลับขึ้นด้านบน</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
