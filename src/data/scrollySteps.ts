import { dailyBudget, demoFinance, demoSavingExample, formatDemoAmount, savingGoals } from '../lib/pocket-saving';
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
        'แนวคิดระบบจริงจะปรับงบตามข้อมูลล่าสุด และเตือนเมื่อโอกาสเงินพอลดลงชัดเจน',
      ] },
    ],
    benchmarkNote: '*ข้อมูลและเปอร์เซ็นต์เป็นตัวอย่างสำหรับเดโม ยังไม่ใช่ผลโมเดลที่ทดสอบกับข้อมูลจริง การแจ้งเตือนยังไม่อยู่ในเดโม',
    metrics: [
      { label: 'วันนี้ใช้ได้โดยประมาณ', value: `฿${dailyBudget} / วัน` },
      { label: `โอกาสเงินพอใน ${demoFinance.daysIncludingToday} วัน`, value: `${demoFinance.illustrativeProbability}%`, sublabel: 'ตัวอย่างจำลอง' },
      { label: 'คาดว่าเงินเข้าใน', value: `${demoFinance.daysUntilIncome} วัน`, sublabel: 'วันรับเงินอาจเลื่อน' },
    ],
  },
  {
    id: 2, stepNumber: '02', category: 'ออมเงิน',
    title: 'ออมก่อนใช้ เลือกได้ตั้งแต่ต้นวัน',
    description: 'ระบบบอกยอดใช้ได้วันนี้ พร้อมชวนว่าถ้าใช้น้อยลงอีกนิดจะออมได้เท่าไหร่ แล้วให้คุณเลือกเองว่าจะออมตอนนี้เลย หรือไม่ออม',
    detailGroups: [
      { title: 'ชวนออมตั้งแต่แรก ไม่ต้องรอให้เงินเหลือ', details: [
        `วันนี้ใช้ได้ ฿${dailyBudget} ถ้าตั้งใจใช้แค่ ฿${demoSavingExample.budgetAfterSaving} จะออมได้ ฿${demoSavingExample.offer} ทันที`,
        `กดออม ฿${demoSavingExample.offer} → เลือก Pocket → ยืนยัน เงินย้ายเข้า Pocket ทันที และยอดใช้ได้วันนี้ปรับเป็น ฿${demoSavingExample.budgetAfterSaving}`,
      ] },
      { title: 'ยอดชวนออมไม่เบียดค่าใช้ชีวิต', details: [
        'คิดหลังกันบิล เงินสำรอง และยอดใช้ได้จนถึงวันเงินเข้าแล้ว จึงไม่ชวนออมจนเงินไม่พอใช้',
        `ไม่ออมวันนี้ก็ได้ ยอดใช้ได้เท่าเดิม ฿${dailyBudget} ไม่มีการย้ายเงิน และเปลี่ยนใจกลับมาออมได้ภายในวัน`,
      ] },
    ],
    benchmarkNote: `*เดโมไม่โอนเงินจริง ชวนออม ${demoFinance.sweepMinRate * 100}–${demoFinance.sweepMaxRate * 100}% ของยอดใช้ได้วันนี้ ปัดขึ้นเป็นหลักสิบ และเงินสำรอง ฿${formatDemoAmount(demoFinance.hardFloor)} เป็นค่าตัวอย่าง`,
    metrics: [
      { label: 'ยอดใช้ได้วันนี้', value: `฿${dailyBudget}` },
      { label: `ใช้แค่ ฿${demoSavingExample.budgetAfterSaving} ออมได้`, value: `฿${demoSavingExample.offer}` },
      { label: 'ออมตอนนี้หรือไม่', value: 'คุณเลือกเอง' },
    ],
  },
];

export const SUMMARY_VIEW: ScrollyStep = {
  id: 3, stepNumber: 'Summary', kind: 'summary', category: 'สรุปรอบเดือน',
  title: 'ระบบพยากรณ์ คุณตัดสินใจ ในการเงินของฉัน',
  description: 'เปิดการเงินของฉัน เห็นยอดใช้ได้วันนี้ ที่มาของยอด และสรุปรอบที่ผ่านมา ถ้ายอดไม่ตรงชีวิตจริง แก้วันเงินเข้า บิล และเป้าเก็บเงินได้เองตลอด',
  detailGroups: [
    { title: 'เห็นทั้งแผนและจังหวะที่เปลี่ยนไป', details: [
      `ตัวอย่างเดือน${previousRoundDemo.month} ใช้ไม่เกินยอดที่วางแผนไว้ ${previousRoundDemo.daysWithinPlan} จาก ${previousRoundDemo.days} วัน โดยเทียบกับยอดใช้ได้ที่ปรับในแต่ละวัน`,
      `ค่าจ้างเข้าช้า ${previousRoundDemo.incomeDelayDays} วัน ระบบจึงปรับยอดใช้ได้ลง ${previousRoundDemo.adjustedPlanDays} วันระหว่างรอเงินเข้า`,
    ] },
    { title: 'เงินสะสมเชื่อมต่อกับรอบปัจจุบัน', details: [
      `เงินสะสม ฿${previousRoundDemo.carriedAmount} ที่ยกมารวมอยู่ในเงินสะสมเดิมของรอบนี้แล้ว ไม่เพิ่มยอดบัญชีหรือชวนย้ายเงินซ้ำ`,
      'เปิดดูสรุปได้จากหน้าการเงินของฉัน โดยไม่ต้องผ่านขั้นตอนออมเงินก่อน',
    ] },
    { title: 'แก้ข้อมูลเองได้ เห็นผลก่อนบันทึก', details: [
      `ยืนยันบิลที่ระบบเดา บอกว่าเงินเพิ่มแน่นอนหรืออาจจะ และเลือกเป้าเก็บเงิน ${savingGoals.map(goal => `${goal.label} ${goal.rate * 100}%`).join(' / ')}`,
      'ก่อนบันทึกจะเห็นว่ายอดใช้ได้วันนี้เปลี่ยนเป็นเท่าไหร่ หลังบันทึกโอกาสเงินพอต้องประเมินใหม่ ไม่ใช้เปอร์เซ็นต์เดิม',
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
