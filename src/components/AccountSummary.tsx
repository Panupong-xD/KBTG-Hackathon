'use client';

import { ChevronRight } from 'lucide-react';
import { demoFinance, demoMonth, demoToday, forecastPlan, formatDemoAmount, formatDemoDay, pockets, type MoneyPlan } from '../lib/pocket-saving';
import PlanPage from './PlanPage';
import styles from './MoneyPlan.module.css';

type TimelineEvent = { day: number; title: string; amount?: number; status: string; tone: 'today' | 'in' | 'out' | 'muted' | 'buffer' };

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
  const plannedSpending = forecast.budget * forecast.days;
  const leftover = Math.max(0, forecast.available - plannedSpending);
  const base = forecast.usable + demoFinance.hardFloor + forecast.certainIncome;
  const share = (amount: number) => `${amount / base * 100}%`;

  const allEvents: TimelineEvent[] = [
    { day: demoToday, title: `วันนี้ · ใช้ได้ ฿${formatDemoAmount(budgetToday)}`, status: `ใช้ไป ฿${formatDemoAmount(spentToday)}`, tone: 'today' },
    ...plan.bills.filter(bill => bill.repeat === 'monthly' || bill.dueMonth === demoMonth).map((bill): TimelineEvent => ({
      day: bill.dueDay, title: bill.name, amount: -bill.amount, tone: bill.guessed ? 'muted' : 'out',
      status: bill.guessed ? 'ระบบเดา · รอคุณยืนยัน' : bill.reserved >= bill.amount ? `จ่ายจาก Pocket ${billsPocket.name}` : bill.reserved > 0 ? `กันไว้ ฿${formatDemoAmount(bill.reserved)} ส่วนที่เหลือหักจากกระเป๋าหลัก` : 'หักจากกระเป๋าหลัก',
    })),
    { day: extraIncome.day, title: extraIncome.name, amount: extraIncome.amount, tone: extraIncome.certain ? 'in' : 'muted', status: extraIncome.certain ? 'แน่นอน · นับเข้าแผนแล้ว' : 'อาจจะ · ยังไม่นับ' },
    { day: plan.incomeDay, title: 'ค่าจ้างคาดว่าเข้า', amount: demoFinance.pendingIncome, tone: 'in', status: 'ยังไม่นับจนกว่าจะเข้าจริง' },
    { day: forecast.lastDay + 1, title: 'เผื่อค่าจ้างเข้าช้าถึงวันนี้', tone: 'buffer', status: `เงินพอใช้ตามแผนถึง ${formatDemoDay(forecast.lastDay)}` },
    { day: windowEnd, title: `ครบ ${demoFinance.daysIncludingToday} วัน`, tone: 'muted', status: showProbability ? `โอกาสเงินพอ ${demoFinance.illustrativeProbability}%* (ค่าตัวอย่าง)` : 'โอกาสเงินพอ รอประเมินใหม่*' },
  ];
  const events = allEvents.filter(event => event.day >= demoToday && event.day <= windowEnd).sort((a, b) => a.day - b.day);

  const dayTone = (day: number) => day < plan.incomeDay ? styles.planned : day <= forecast.lastDay + 1 ? styles.buffered : styles.later;

  return <PlanPage title="สรุปบัญชี" caption={`ข้อมูลจำลอง · ${formatDemoDay(demoToday)} 2569`} onBack={onBack}>
    <section className={styles.todayStrip} aria-label="วันนี้">
      <div><span>เงินเข้าวันนี้</span><strong>฿0</strong></div>
      <div><span>ใช้จ่ายวันนี้</span><strong>฿{formatDemoAmount(spentToday)}</strong></div>
      <div><span>เหลือจากยอด</span><strong>฿{formatDemoAmount(Math.max(0, budgetToday - spentToday))}</strong></div>
    </section>

    <section className={styles.sourceCard} aria-labelledby="budget-source-title">
      <h5 id="budget-source-title">ที่มาของยอดวันนี้</h5>
      <p className={styles.sourceLead}>เงินที่ใช้ได้จริง หารด้วยจำนวนวันที่ต้องอยู่ให้ได้ก่อนเงินเข้า</p>
      <div className={styles.stack} role="img" aria-label={`กระเป๋าหลัก ฿${formatDemoAmount(base)} แบ่งเป็น เงินสำรอง ฿${formatDemoAmount(demoFinance.hardFloor)} บิลที่ยังไม่ได้กัน ฿${formatDemoAmount(forecast.unreservedBills)} ใช้ตามแผน ฿${formatDemoAmount(plannedSpending)} และเหลือ ฿${formatDemoAmount(leftover)}`}>
        <span className={styles.stackFloor} style={{ width: share(demoFinance.hardFloor) }} />
        {forecast.unreservedBills > 0 && <span className={styles.stackBills} style={{ width: share(forecast.unreservedBills) }} />}
        <span className={styles.stackPlan} style={{ width: share(plannedSpending) }} />
        {leftover > 0 && <span className={styles.stackLeft} style={{ width: share(leftover) }} />}
      </div>
      <div className={styles.stackLegend} aria-hidden="true">
        <span><i className={styles.stackFloor} />เงินสำรอง</span>
        {forecast.unreservedBills > 0 && <span><i className={styles.stackBills} />บิล</span>}
        <span><i className={styles.stackPlan} />ใช้ {forecast.days} วัน</span>
        {leftover > 0 && <span><i className={styles.stackLeft} />เหลือ ฿{formatDemoAmount(leftover)}</span>}
      </div>
      <dl className={styles.sourceRows}>
        <div><dt>เงินในกระเป๋าหลัก</dt><dd>฿{formatDemoAmount(forecast.usable + demoFinance.hardFloor)}</dd></div>
        <div><dt>หัก เงินสำรอง</dt><dd>−฿{formatDemoAmount(demoFinance.hardFloor)}</dd></div>
        <div><dt>หัก บิลที่ยังไม่ได้กัน<small>{reservedBills.length > 0 ? `${reservedBills.map(bill => `${bill.name} ฿${formatDemoAmount(bill.reserved)}`).join(', ')} กันไว้ใน Pocket แล้ว` : 'ไม่มีบิลที่กันไว้'}{guessedBills.length > 0 && ` · ${guessedBills.map(bill => bill.name).join(', ')} รอคุณยืนยัน`}</small></dt><dd>−฿{formatDemoAmount(forecast.unreservedBills)}</dd></div>
        <div><dt>บวก เงินเข้าเพิ่มที่แน่นอน<small>{extraIncome.certain ? `${extraIncome.name} ${formatDemoDay(extraIncome.day)}` : `${extraIncome.name} ฿${formatDemoAmount(extraIncome.amount)} ยังเป็น “อาจจะ”`}</small></dt><dd>+฿{formatDemoAmount(forecast.certainIncome)}</dd></div>
        <div className={styles.sourceSubtotal}><dt>ใช้ได้ถึง {formatDemoDay(forecast.bindingDay)}</dt><dd>฿{formatDemoAmount(forecast.available)}</dd></div>
        <div><dt>หาร {forecast.days} วัน<small>{forecast.bindingDay === forecast.lastDay ? `ค่าจ้างคาดเข้า ${formatDemoDay(plan.incomeDay)} + เผื่อเข้าช้า ${demoFinance.incomeDelayBuffer} วัน` : `ก่อน${extraIncome.name}เข้า ${formatDemoDay(extraIncome.day)}`}</small></dt><dd>÷ {forecast.days}</dd></div>
        <div className={styles.sourceTotal}><dt>ยอดใช้ได้วันนี้<small>ปัดลงเป็นหลักสิบ{savedToday > 0 ? ` · ออมก่อนใช้แล้ว ฿${savedToday}` : ''}</small></dt><dd>฿{formatDemoAmount(forecast.budget)}</dd></div>
      </dl>
      <p className={styles.sourceNote}>ค่าจ้าง ฿{formatDemoAmount(demoFinance.pendingIncome)} ยังไม่นับเป็นเงินใช้ได้ · เดโมใช้สูตรอย่างง่าย ระบบจริงพยากรณ์รายจ่ายและวันเงินเข้า แล้วจำลองหลายสถานการณ์</p>
      <button type="button" className={styles.outlineButton} onClick={onEdit}>ข้อมูลไม่ตรง? แก้ข้อมูลเอง <ChevronRight /></button>
    </section>

    <section className={styles.timelineCard} aria-labelledby="timeline-title">
      <h5 id="timeline-title">{demoFinance.daysIncludingToday} วันข้างหน้า</h5>
      <div className={styles.dayStrip} aria-hidden="true">
        {windowDays.map(day => <span key={day} className={dayTone(day)}>{events.some(event => event.day === day) && <i className={styles[events.find(event => event.day === day)!.tone]} />}</span>)}
      </div>
      <div className={styles.dayAxis} aria-hidden="true"><span>{formatDemoDay(demoToday)}</span><span>{formatDemoDay(plan.incomeDay)}</span><span>{formatDemoDay(windowEnd)}</span></div>
      <div className={styles.stripLegend} aria-hidden="true">
        <span><i className={styles.planned} />ใช้ตามแผน</span><span><i className={styles.buffered} />เผื่อเงินเข้าช้า</span><span><i className={styles.later} />หลังเงินเข้า วางแผนใหม่</span>
      </div>
      <ol className={styles.events}>
        {events.map(event => <li key={`${event.day}-${event.title}`} className={styles[event.tone]}>
          <span className={styles.eventDay}>{formatDemoDay(event.day)}</span>
          <div><strong>{event.title}</strong><span>{event.status}</span></div>
          {event.amount !== undefined && <em>{event.amount > 0 ? '+' : '−'}฿{formatDemoAmount(Math.abs(event.amount))}</em>}
        </li>)}
      </ol>
    </section>
  </PlanPage>;
}
