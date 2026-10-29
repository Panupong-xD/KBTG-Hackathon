import { ArrowDown, ArrowRight } from 'lucide-react';
import Mascot, { type MascotPose } from './Mascot';
import { dailyBudget, demoFinance } from '../lib/pocket-saving';

const promises: { word: string; pose: MascotPose; title: string; body: string }[] = [
  { word: 'กะ', pose: 'think', title: 'รู้ก่อนเงินตึง', body: 'เห็นยอดใช้ได้วันนี้ คิดเผื่อวันที่เงินเข้าช้า' },
  { word: 'พอ', pose: 'enough', title: 'เตือนถูกจังหวะ', body: 'เตือนเมื่อเสี่ยงขึ้น พร้อมงบที่ปรับตามสถานการณ์' },
  { word: 'เก็บ', pose: 'save', title: 'เงินเหลือมีเป้าหมาย', body: 'เก็บเข้า Pocket หรือสะสมไว้ คุณเลือกเอง' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-kt-cream pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-kt-sage" />
      <div aria-hidden="true" className="pointer-events-none absolute top-64 -left-40 w-[360px] h-[360px] rounded-full bg-kt-sage/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-6 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-kt-paper text-kt-leaf-strong border border-kt-tint">
              ผู้ช่วยวางแผนเงินสำหรับ First Jobber · Concept Demo
            </span>

            <p className="mt-6 font-brand text-2xl sm:text-3xl text-kt-leaf-strong">กะให้เป๊ะ ใช้ให้พอ เหลือก็เก็บ</p>
            <svg aria-hidden="true" viewBox="0 0 320 12" className="w-56 sm:w-72 h-3 mt-1 mx-auto lg:mx-0">
              <path d="M4 9C90 3 210 2 316 5" fill="none" stroke="#A7C957" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <h1 className="mt-5 text-[2rem] sm:text-5xl lg:text-[3.4rem] font-bold text-kt-ink tracking-tight leading-[1.25]">
              <span className="inline-block">เงินยังไม่เข้า</span>{' '}
              <span className="inline-block">แต่ค่าใช้จ่ายไม่เคยรอ</span>
              <span className="block text-kt-leaf-strong">รู้ว่าวันนี้ใช้ได้เท่าไหร่</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-kt-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <strong className="text-kt-ink font-semibold">กะตังค์</strong> แนวคิดผู้ช่วยการเงิน AI ในแอปธนาคาร สำหรับคนเริ่มทำงานที่รายได้ไม่แน่นอน
              แนะนำ<strong className="text-kt-ink font-semibold">ยอดใช้ได้วันนี้และโอกาสเงินพอ</strong> คิดเผื่อบิลและเงินเข้าช้า
              แล้วชวนเก็บเงินที่ใช้ไม่ถึงงบเข้า <span className="whitespace-nowrap">Pocket</span> ที่คุณเลือก
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a href="#how-it-works"
                className="kt-btn w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-base flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(63,122,63,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kt-leaf-strong">
                <span>ลองใช้เดโม 2 ขั้นตอน</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#problem"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-kt-paper hover:bg-kt-sage text-kt-ink font-semibold text-base border border-kt-line flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kt-leaf-strong">
                <span>ทำไมยอดเงินอย่างเดียวไม่พอ</span>
                <ArrowRight className="w-4 h-4 text-kt-leaf-strong" />
              </a>
            </div>
            <p className="mt-4 text-xs text-kt-muted">ใช้ข้อมูลตัวอย่าง ไม่มีการโอนเงินจริง</p>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-[280px] sm:w-[360px] lg:w-[400px] aspect-square rounded-full bg-kt-tint/70 flex items-end justify-center">
              <Mascot pose="hello" width={340} preload alt="น้องตังค์ มาสคอตของกะตังค์ ขยิบตา ถือถุงผ้าและมือถือที่มีเช็กลิสต์"
                className="kt-float w-[240px] sm:w-[310px] lg:w-[340px] h-auto -mb-4" />
              <div className="absolute -top-2 -left-3 sm:left-0 bg-kt-paper border border-kt-line rounded-3xl rounded-bl-md px-4 py-3 shadow-[0_8px_24px_rgba(62,90,46,0.10)]">
                <p className="font-brand text-lg sm:text-xl text-kt-ink leading-snug">วันนี้ใช้ได้ ฿{dailyBudget} นะ!</p>
                <p className="text-[11px] text-kt-muted">อีก {demoFinance.daysUntilIncome} วันเงินเข้า · ตัวอย่าง</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {promises.map(item => <li key={item.word}
            className="bg-kt-paper border border-kt-line rounded-[20px] p-4 pr-5 flex items-center gap-3 shadow-[0_2px_10px_rgba(62,90,46,0.05)]">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-kt-sage flex items-end justify-center overflow-hidden">
              <Mascot pose={item.pose} width={64} className="w-16 h-auto translate-y-1" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-brand text-2xl text-kt-leaf-strong leading-none">{item.word}</span>
                <span className="text-sm font-semibold text-kt-ink">{item.title}</span>
              </div>
              <p className="text-xs text-kt-muted mt-1 leading-relaxed">{item.body}</p>
            </div>
          </li>)}
        </ul>
      </div>
    </section>
  );
}
