import { Lock, FileCheck, ShieldCheck, RefreshCw } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function TrustSecurityBanner() {
  const trustPillars = [
    { icon: FileCheck, title: 'DATA WITH CONSENT', subtitle: 'ใช้ข้อมูลอะไร เพื่ออะไร',
      description: 'ออกแบบให้แจ้งประเภทข้อมูลและวัตถุประสงค์ก่อนเปิดใช้ ให้ถอนความยินยอมได้ โดยแยกจากการยืนยันย้ายเงินแต่ละครั้ง' },
    { icon: Lock, title: 'YOU DECIDE', subtitle: 'คุณกดเอง เงินถึงจะย้าย',
      description: 'เลือก Pocket ตรวจยอด แล้วยืนยันทุกครั้ง หากยังไม่ออม เงินสะสมก็ยังอยู่บัญชีหลัก ไม่มีหักอัตโนมัติ' },
    { icon: ShieldCheck, title: 'LIFE BEFORE SAVING', subtitle: 'ค่าใช้ชีวิตต้องมาก่อน',
      description: 'ตรวจเงินที่มี กันบิล เงินสำรอง และค่าใช้จ่ายระหว่างรอรับเงินก่อนชวนออม เพื่อให้ยังมีเงินพอสำหรับชีวิตประจำวัน' },
    { icon: RefreshCw, title: 'CLEAR ABOUT UNCERTAINTY', subtitle: 'เห็นโอกาส เข้าใจความไม่แน่นอน',
      description: 'เปอร์เซ็นต์เป็นการประเมินตามข้อมูลและช่วงเวลาที่ระบุ ไม่ใช่คำรับประกัน หากใช้เงินหลายบัญชีหรือมีภาระจากช่องทางอื่น แผนต้องอาศัยข้อมูลเพิ่มเติม' },
  ];

  return (
    <section id="security" className="py-20 sm:py-24 bg-kt-paper border-y border-kt-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trust by design"
          mascot="thanks"
          title="AI ช่วยคิด คุณคุมเงิน"
          intro="ความยินยอมและสิทธิ์ตัดสินใจ คือหลักการที่เราใช้ตั้งแต่ต้นในการออกแบบกะตังค์"
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustPillars.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="bg-kt-cream rounded-[24px] p-6 flex flex-col">
                <span className="w-12 h-12 rounded-2xl bg-kt-paper border border-kt-tint text-kt-leaf-strong flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <span className="text-[11px] font-semibold text-kt-muted uppercase tracking-wider mb-1">{item.title}</span>
                <h3 className="font-brand text-xl text-kt-ink mb-2 leading-snug">{item.subtitle}</h3>
                <p className="text-sm text-kt-muted leading-relaxed">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
