'use client';

import { SquarePen } from 'lucide-react';
import { demoFinance, demoMonth, demoToday, forecastPlan, formatDemoAmount, formatDemoDay, pockets, type MoneyPlan } from '../lib/pocket-saving';
import PlanPage from './PlanPage';
import styles from './MoneyPlan.module.css';

type TimelineEvent = { day: number; title: string; amount?: number; status: string; tone: 'today' | 'in' | 'out' | 'muted' | 'buffer'; counted?: boolean };

const billsPocket = pockets.find(pocket => pocket.id === 'bills')!;
const windowDays = Array.from({ length: demoFinance.daysIncludingToday }, (_, index) => demoToday + index);
const windowEnd = windowDays[windowDays.length - 1];

interface AccountSummaryProps {
  plan: MoneyPlan;
  spentToday: number;
  savedToday: number;
  showProbability: boolean;
  onEdit: () => void;
  onBack: () => void;
}

export default function AccountSummary({ plan, spentToday, savedToday, showProbability, onEdit, onBack }: AccountSummaryProps) {
  const forecast = forecastPlan(plan);
  const budgetToday = forecast.budget - savedToday;
  const reservedBills = plan.bills.filter(bill => !bill.guessed && bill.reserved > 0);
  const guessedBills = plan.bills.filter(bill => bill.guessed);
  const { extraIncome } = plan;
  const waitsForWage = forecast.bindingDay === forecast.lastDay;

  const allEvents: TimelineEvent[] = [
    { day: demoToday, title: 'วันนี้', status: `ใช้ไป ฿${formatDemoAmount(spentToday)} จาก ฿${formatDemoAmount(budgetToday)}`, tone: 'today' },
    ...plan.bills.filter(bill => bill.repeat === 'monthly' || bill.dueMonth === demoMonth).map((bill): TimelineEvent => ({
      day: bill.dueDay, title: bill.name, amount: -bill.amount, tone: bill.guessed ? 'muted' : 'out', counted: !bill.guessed,
      status: bill.guessed ? 'ระบบเดา · ยังไม่นับจนกว่าคุณยืนยัน' : bill.reserved >= bill.amount ? `จ่ายจาก Pocket ${billsPocket.name}` : bill.reserved > 0 ? `แยกไว้ ฿${formatDemoAmount(bill.reserved)} ส่วนที่เหลือจ่ายจากกระเป๋าหลัก` : 'จ่ายจากกระเป๋าหลัก',
    })),
    { day: extraIncome.day, title: extraIncome.name, amount: extraIncome.amount, tone: extraIncome.certain ? 'in' : 'muted', counted: extraIncome.certain, status: extraIncome.certain ? 'แน่นอน · นับในยอดแล้ว' : 'อาจจะ · ยังไม่นับในยอด' },
    { day: plan.incomeDay, title: 'ค่าจ้าง (คาดว่าเข้า)', amount: demoFinance.pendingIncome, tone: 'in', counted: false, status: 'นับเมื่อเงินเข้าจริง' },
    { day: forecast.lastDay + 1, title: 'เผื่อค่าจ้างช้าได้ถึงวันนี้', tone: 'buffer', status: `ยอดวันละ ฿${formatDemoAmount(forecast.budget)} ใช้ได้ถึง ${formatDemoDay(forecast.lastDay)}` },
    { day: windowEnd, title: `ครบ ${demoFinance.daysIncludingToday} วัน`, tone: 'muted', status: showProbability ? `โอกาสเงินพอ ${demoFinance.illustrativeProbability}%* (ค่าตัวอย่าง)` : 'โอกาสเงินพอ รอประเมินใหม่*' },
  ];
  const events = allEvents.filter(event => event.day >= demoToday && event.day <= windowEnd).sort((a, b) => a.day - b.day);
  const dayTone = (day: number) => day < plan.incomeDay ? styles.planned : day <= forecast.lastDay + 1 ? styles.buffered : styles.later;

  return <PlanPage title="สรุปบัญชี" caption={`วันนี้ ${formatDemoDay(demoToday)} 2569 · ข้อมูลจำลอง`} onBack={onBack}>
    <section className={styles.todayStrip} aria-label="วันนี้">
      <div><span>เงินเข้า</span><strong>฿0</strong></div>
      <div><span>ใช้ไป</span><strong>฿{formatDemoAmount(spentToday)}</strong></div>
      <div><span>เหลือวันนี้</span><strong>฿{formatDemoAmount(Math.max(0, budgetToday - spentToday))}</strong></div>
    </section>

    <section className={styles.sourceCard} aria-labelledby="budget-source-title">
      <h5 id="budget-source-title">ยอด ฿{formatDemoAmount(forecast.budget)} มาจากไหน</h5>
      <p className={styles.sourceLead}>เงินที่ใช้ได้จริง เกลี่ยให้พอทุกวันจนกว่าค่าจ้างจะเข้า</p>
      <div className={styles.equation} role="img" aria-label={`฿${formatDemoAmount(forecast.available)} หาร ${forecast.days} วัน ได้ประมาณ ฿${formatDemoAmount(forecast.budget)} ต่อวัน`}>
        <div><strong>฿{formatDemoAmount(forecast.available)}</strong><span>ใช้ได้จริง</span></div>
        <b aria-hidden="true">÷</b>
        <div><strong>{forecast.days} วัน</strong><span>{waitsForWage ? 'รอค่าจ้างเข้า' : `ก่อน${extraIncome.name}เข้า`}</span></div>
        <b aria-hidden="true">≈</b>
        <div className={styles.equationResult}><strong>฿{formatDemoAmount(forecast.budget)}</strong><span>ต่อวัน</span></div>
      </div>

      <dl className={styles.sourceRows}>
        <div><dt>เงินในกระเป๋าหลัก</dt><dd>฿{formatDemoAmount(forecast.usable + demoFinance.hardFloor)}</dd></div>
        <div><dt>กันเป็นเงินสำรอง<small>ไม่นำมาใช้ เผื่อเหตุฉุกเฉิน</small></dt><dd>−฿{formatDemoAmount(demoFinance.hardFloor)}</dd></div>
        <div className={forecast.unreservedBills === 0 ? styles.zeroRow : undefined}><dt>บิลที่ต้องจ่ายจากกระเป๋าหลัก<small>{reservedBills.length > 0 ? `${reservedBills.map(bill => `${bill.name} ฿${formatDemoAmount(bill.reserved)}`).join(', ')} แยกไว้ใน Pocket แล้ว` : 'ยังไม่มีบิลที่แยกไว้'}{guessedBills.length > 0 && ` · ${guessedBills.map(bill => bill.name).join(', ')} รอคุณยืนยัน`}</small></dt><dd>−฿{formatDemoAmount(forecast.unreservedBills)}</dd></div>
        <div className={forecast.certainIncome === 0 ? styles.zeroRow : undefined}><dt>เงินเข้าเพิ่มที่แน่นอน<small>{extraIncome.certain ? `${extraIncome.name} ${formatDemoDay(extraIncome.day)}` : `${extraIncome.name} ฿${formatDemoAmount(extraIncome.amount)} ยังเป็น “อาจจะ” จึงยังไม่นับ`}</small></dt><dd>+฿{formatDemoAmount(forecast.certainIncome)}</dd></div>
        <div className={styles.sourceSubtotal}><dt>ใช้ได้จริงถึง {formatDemoDay(forecast.bindingDay)}</dt><dd>฿{formatDemoAmount(forecast.available)}</dd></div>
      </dl>
      <p className={styles.sourceNote}>{waitsForWage ? `${forecast.days} วัน = ค่าจ้างคาดเข้า ${formatDemoDay(plan.incomeDay)} (อีก ${forecast.daysUntilIncome} วัน) + เผื่อช้า ${demoFinance.incomeDelayBuffer} วัน · ` : ''}ปัดลงเป็นหลักสิบ{savedToday > 0 ? ` · ออมแล้ว ฿${savedToday} วันนี้จึงใช้ได้ ฿${formatDemoAmount(budgetToday)}` : ''}</p>
      <p className={styles.sourceNote}>ค่าจ้าง ฿{formatDemoAmount(demoFinance.pendingIncome)} ยังไม่นับจนกว่าจะเข้าจริง · เดโมใช้สูตรอย่างง่าย ระบบจริงประเมินจากหลายสถานการณ์</p>
      <button type="button" className={styles.outlineButton} onClick={onEdit}><SquarePen /> ข้อมูลไม่ตรง? แก้ข้อมูล</button>
    </section>

    <section className={styles.timelineCard} aria-labelledby="timeline-title">
      <h5 id="timeline-title">{demoFinance.daysIncludingToday} วันข้างหน้า</h5>
      <p className={styles.sourceLead}>เงินเข้า–ออกที่ระบบคาดไว้ รายการสีจางยังไม่นับในยอด</p>
      <div className={styles.dayStrip} aria-hidden="true">
        {windowDays.map(day => <span key={day} className={dayTone(day)}>{events.some(event => event.day === day) && <i className={styles[events.find(event => event.day === day)!.tone]} />}</span>)}
      </div>
      <div className={styles.dayAxis} aria-hidden="true"><span>{formatDemoDay(demoToday)}</span><span>ค่าจ้าง {formatDemoDay(plan.incomeDay)}</span><span>{formatDemoDay(windowEnd)}</span></div>
      <div className={styles.stripLegend} aria-hidden="true">
        <span><i className={styles.planned} />ใช้ตามยอด</span><span><i className={styles.buffered} />เผื่อค่าจ้างช้า</span><span><i className={styles.later} />หลังเงินเข้า คิดยอดใหม่</span>
      </div>
      <ol className={styles.events}>
        {events.map(event => <li key={`${event.day}-${event.title}`} className={`${styles[event.tone]} ${event.counted === false ? styles.notCounted : ''}`}>
          <span className={styles.eventDay}>{formatDemoDay(event.day)}</span>
          <div><strong>{event.title}</strong><span>{event.status}</span></div>
          {event.amount !== undefined && <em>{event.amount > 0 ? '+' : '−'}฿{formatDemoAmount(Math.abs(event.amount))}</em>}
        </li>)}
      </ol>
    </section>
  </PlanPage>;
}
