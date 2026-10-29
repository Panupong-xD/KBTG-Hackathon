import { ArrowDown, Check, Info } from 'lucide-react';
import SectionHeading from './SectionHeading';
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
    <section id="problem" className="py-20 sm:py-24 bg-kt-paper border-y border-kt-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="First Jobber pain points"
          mascot="surprised"
          title={<>ยอดเงินยังเหลือ <span className="text-kt-leaf-strong">ทำไมถึงไปต่อไม่ไหว?</span></>}
          intro="4 ปัญหาที่กะตังค์ตั้งใจช่วยแก้ให้คนเริ่มทำงานที่รายได้ไม่แน่นอน ทั้งเรื่องเงินพอใช้และเงินเก็บ"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {problems.map((item) => (
            <article key={item.id} className="bg-kt-cream rounded-[24px] p-5 sm:p-7 flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-brand text-4xl text-kt-leaf-strong leading-none">{item.id}</span>
                  <span className="text-[11px] font-semibold text-kt-muted uppercase tracking-wider">{item.title}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-kt-ink mb-2 leading-snug">{item.thaiTitle}</h3>
                <p className="text-sm text-kt-muted leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-auto text-sm">
                <div className="flex items-start gap-3 bg-kt-paper p-3.5 rounded-2xl border border-kt-line">
                  <span className="w-6 h-6 rounded-full bg-kt-line text-kt-muted flex items-center justify-center shrink-0">
                    <Info className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <div className="text-kt-muted">
                    <span className="font-semibold text-kt-ink block mb-0.5">ปัญหาที่เจอ</span>
                    {item.painPoint}
                  </div>
                </div>
                <div className="flex justify-center -my-1.5 relative z-10" aria-hidden="true">
                  <span className="w-7 h-7 rounded-full bg-kt-paper border border-kt-line flex items-center justify-center">
                    <ArrowDown className="w-3.5 h-3.5 text-kt-leaf-strong" />
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-kt-sage p-3.5 rounded-2xl border border-kt-tint">
                  <span className="w-6 h-6 rounded-full bg-kt-leaf-strong text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <div className="text-kt-ink">
                    <span className="font-semibold text-kt-leaf-strong block mb-0.5">กะตังค์ช่วยอย่างไร</span>
                    {item.aiSolution}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
