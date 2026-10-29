import { dailyBudget, demoFinance, demoSavingExample, formatDemoAmount } from '../lib/pocket-saving';
import { previousRoundDemo } from './previousRound';

export interface ScrollyStep {
  id: number;
  stepNumber: string;
  kind?: 'summary';
  category: string;
  title: string;
  description: string;
  detailGroups: { title: string; details: string[] }[];
  benchmarkNote?: string;
  metrics: { label: string; value: string; sublabel?: string }[];
}
export const SCROLLY_STEPS: ScrollyStep[] = [
  {
    id: 1, stepNumber: '01', category: 'ภาพรวมการเงิน',
    title: 'วันนี้ใช้ได้เท่าไหร่? ให้ AI ช่วยคิด',
    description: 'วางแผนให้เงินพอถึงรอบรับเงินถัดไป โดยคิดเผื่อบิลและค่าจ้างที่อาจเข้าช้า เห็นยอดใช้ได้วันนี้กับโอกาสเงินพอในหน้าเดียว',
    detailGroups: [
      { title: 'คิดเผื่อวันที่เงินไม่ได้มาตามนัด', details: [
        'ใช้ประวัติธุรกรรมจับรอบบิลและพฤติกรรมใช้เงิน พร้อมเผื่อค่าจ้างเข้าช้าหรือได้ไม่ครบ',
        'แนวทางสำหรับผู้ใช้ใหม่: ตอบข้อมูลสั้น ๆ เรื่องรายได้ รอบเงินเข้า และภาระค่าใช้จ่าย เพื่อเริ่มประเมินก่อนมีประวัติธุรกรรมเพียงพอ',
      ] },
      { title: 'รู้วันนี้ เพื่อปรับตัวทันพรุ่งนี้', details: [
        `ตัวอย่างงบ ฿${dailyBudget}/วัน คู่กับโอกาสเงินพอตลอด ${demoFinance.daysIncludingToday} วัน ${demoFinance.illustrativeProbability}%* โดยมองเผื่อวันรับเงินที่อาจเลื่อน (กด i เพื่อดูรายละเอียด)`,
        'แนวคิดระบบจริงจะปรับงบตามข้อมูลล่าสุด และเตือนเฉพาะเมื่อความเสี่ยงเพิ่มขึ้นชัดเจน',
      ] },
    ],
    benchmarkNote: '*ข้อมูลและเปอร์เซ็นต์เป็นตัวอย่างสำหรับเดโม ยังไม่ใช่ผลโมเดลที่ทดสอบกับข้อมูลจริง การแจ้งเตือนยังไม่อยู่ในเดโม',
    metrics: [
      { label: 'วันนี้ใช้ได้', value: `฿${dailyBudget} / วัน` },
      { label: `โอกาสเงินพอใน ${demoFinance.daysIncludingToday} วัน`, value: `${demoFinance.illustrativeProbability}%`, sublabel: 'ตัวอย่างจำลอง' },
      { label: 'คาดว่าเงินเข้าใน', value: `${demoFinance.daysUntilIncome} วัน`, sublabel: 'วันรับเงินอาจเลื่อน' },
    ],
  },
  {
    id: 2, stepNumber: '02', category: 'ออมเงิน',
    title: 'เปลี่ยนเงินเหลือ ให้เป็นเงินเก็บ',
    description: 'วันที่ใช้ไม่ถึงงบ เงินส่วนที่เหลือช่วยเติมเงินสำรองได้ เลือก Pocket แล้วยืนยันเก็บด้วยตัวเอง',
    detailGroups: [
      { title: 'ชวนเก็บถูกจังหวะ ไม่เบียดค่าใช้ชีวิต', details: [
        `กันบิล เงินสำรอง และค่าใช้จ่ายระหว่างรอรับเงินก่อนชวนออม วันนี้ใช้ ฿${demoFinance.spentToday} จากงบ ฿${dailyBudget} เหลือ ฿${demoSavingExample.difference} รวมเงินสะสมเดิม ฿${demoFinance.openingAccumulated} เป็น ฿${demoSavingExample.accumulated}`,
        `เลือก Pocket → ยืนยันเก็บ ฿${demoSavingExample.suggestedAmount} → ดูผล เงินสะสมเหลือ ฿${demoSavingExample.accumulatedAfterSaving} ยอดรวมทุกกระเป๋าเท่าเดิม ไม่ได้นับเงินออมซ้ำเป็นเงินพร้อมใช้`,
      ] },
      { title: 'ยังไม่ออมวันนี้ เงินเหลือก็มีแผน', details: [
        'เงินสะสมยังอยู่บัญชีหลัก ช่วยรองรับวันที่ใช้เกินงบก่อนเกลี่ยส่วนที่ขาดไปวันถัด ๆ ไป',
        'เมื่อถึงรอบรับเงิน แนวคิดต่อยอดคือให้เลือกเก็บเงินสะสมเข้า Pocket หรือยกยอดไปรอบถัดไป โดยคุณเป็นคนตัดสินใจ',
      ] },
    ],
    benchmarkNote: `*เดโมไม่โอนเงินจริง ชวนเก็บ ${demoFinance.sweepMinRate * 100}–${demoFinance.sweepMaxRate * 100}% ของยอดใช้ได้วันนี้ ไม่เกิน ฿${formatDemoAmount(demoFinance.sweepCap)} ต่อครั้ง และเงินสำรอง ฿${formatDemoAmount(demoFinance.hardFloor)} เป็นค่าตัวอย่าง การเลือกสิ้นรอบเป็นแนวคิดต่อยอด`,
    metrics: [
      { label: 'ชวนเก็บวันนี้', value: `฿${demoSavingExample.suggestedAmount}` },
      { label: 'เงินสะสมก่อนออม', value: `฿${demoSavingExample.accumulated}` },
      { label: 'Pocket เป้าหมาย', value: 'สำรองฉุกเฉิน' },
    ],
  },
];

export const SUMMARY_VIEW: ScrollyStep = {
  id: 3, stepNumber: 'Summary', kind: 'summary', category: 'สรุปรอบเดือน',
  title: 'ทบทวนรอบเดือน ในการเงินของฉัน',
  description: 'เปิดการเงินของฉัน เพื่อดูภาพรวมบัญชีและสรุปรอบเดือนที่ผ่านมา เทียบแผนกับสิ่งที่เกิดขึ้นจริงในที่เดียว',
  detailGroups: [
    { title: 'เห็นทั้งแผนและจังหวะที่เปลี่ยนไป', details: [
      `ตัวอย่างเดือน${previousRoundDemo.month} ใช้ไม่เกินยอดที่วางแผนไว้ ${previousRoundDemo.daysWithinPlan} จาก ${previousRoundDemo.days} วัน โดยเทียบกับยอดใช้ได้ที่ปรับในแต่ละวัน`,
      `ค่าจ้างเข้าช้า ${previousRoundDemo.incomeDelayDays} วัน ระบบจึงปรับยอดใช้ได้ลง ${previousRoundDemo.adjustedPlanDays} วันระหว่างรอเงินเข้า`,
    ] },
    { title: 'เงินสะสมเชื่อมต่อกับรอบปัจจุบัน', details: [
      `เงินสะสม ฿${previousRoundDemo.carriedAmount} ที่ยกมารวมอยู่ในเงินสะสมเดิมของรอบนี้แล้ว ไม่เพิ่มยอดบัญชีหรือชวนย้ายเงินซ้ำ`,
      'เปิดดูสรุปได้จากหน้าการเงินของฉัน โดยไม่ต้องผ่านขั้นตอนออมเงินก่อน',
    ] },
  ],
  metrics: [
    { label: 'ใช้ตามแผน', value: `${previousRoundDemo.daysWithinPlan}/${previousRoundDemo.days} วัน` },
    { label: 'ปรับแผนระหว่างรอเงิน', value: `${previousRoundDemo.adjustedPlanDays} วัน` },
    { label: 'เงินสะสมยกมา', value: `฿${previousRoundDemo.carriedAmount}` },
  ],
  benchmarkNote: '*Summary เป็นการทบทวนข้อมูลจำลองของรอบที่ผ่านมา ไม่ใช่ขั้นตอนที่ต้องทำต่อจากการออม และยังไม่ใช่ผลทดสอบโมเดลจริง',
};

export const DEMO_VIEWS = [...SCROLLY_STEPS, SUMMARY_VIEW];
