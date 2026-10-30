'use client';

import { useState } from 'react';
import { Check, Minus, Plus, RotateCcw } from 'lucide-react';
import { defaultPlan, demoFinance, forecastPlan, formatDemoAmount, formatDemoDay, monthNames, planSavingOffer, pockets, samePlan, savingGoals, type MoneyPlan, type PlanBill, type PocketId } from '../lib/pocket-saving';
import PlanPage from './PlanPage';
import styles from './MoneyPlan.module.css';

const emergencyPocket = pockets.find(pocket => pocket.id === 'emergency')!;

function Stepper({ label, value, display, min, max, step, onChange }: { label: string; value: number; display: string; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return <div className={styles.stepper} role="group" aria-label={label}>
    <span>{label}</span>
    <button type="button" onClick={() => onChange(Math.max(min, value - step))} disabled={value <= min} aria-label={`ลด${label}`}><Minus /></button>
    <strong aria-live="polite">{display}</strong>
    <button type="button" onClick={() => onChange(Math.min(max, value + step))} disabled={value >= max} aria-label={`เพิ่ม${label}`}><Plus /></button>
  </div>;
}

function Choice<T extends string>({ label, options, value, onChange }: { label: string; options: readonly { id: T; label: string }[]; value: T; onChange: (value: T) => void }) {
  return <div className={styles.choice} role="group" aria-label={label}>
    {options.map(option => <button key={option.id} type="button" aria-pressed={value === option.id} onClick={() => onChange(option.id)}>{option.label}</button>)}
  </div>;
}

const billSchedule = (bill: PlanBill) => bill.repeat === 'monthly' ? `ทุกเดือน · วันที่ ${bill.dueDay}` : `รายปี · ${bill.dueDay} ${monthNames[bill.dueMonth - 1]}`;

interface PlanCustomizeProps {
  plan: MoneyPlan;
  featuredPockets: PocketId[];
  focus?: 'income';
  onCancel: () => void;
  onSave: (plan: MoneyPlan, featuredPockets: PocketId[]) => void;
}

export default function PlanCustomize({ plan, featuredPockets, focus, onCancel, onSave }: PlanCustomizeProps) {
  const [draft, setDraft] = useState(plan);
  const [featured, setFeatured] = useState(featuredPockets);
  const [editing, setEditing] = useState<string | null>(focus === 'income' ? 'income' : null);
  const current = forecastPlan(plan);
  const next = forecastPlan(draft);
  const nextOffer = planSavingOffer(draft, next);
  const goal = savingGoals.find(item => item.id === draft.goal)!;
  const planChanged = !samePlan(draft, plan);
  const changed = planChanged || featured.join() !== featuredPockets.join();
  const budgetChange = next.budget - current.budget;

  const updateBill = (id: string, change: Partial<PlanBill>) => setDraft(previous => ({ ...previous, bills: previous.bills.map(bill => bill.id === id ? { ...bill, ...change } : bill) }));
  const toggleEditing = (id: string) => setEditing(previous => previous === id ? null : id);

  const footer = <>
    <div className={styles.preview} aria-live="polite">
      <span>ถ้าบันทึกแบบนี้</span>
      <p>ยอดใช้ได้วันนี้ <strong>฿{formatDemoAmount(next.budget)}</strong>{budgetChange !== 0 && <small className={budgetChange > 0 ? styles.up : styles.down}> (เดิม ฿{formatDemoAmount(current.budget)})</small>}</p>
      <p>ชวนเก็บ <strong>฿{nextOffer}</strong> ต่อวัน → {emergencyPocket.name} · โอกาสเงินพอ {planChanged ? <em>ประเมินใหม่หลังบันทึก</em> : 'เท่าเดิม'}</p>
    </div>
    <button type="button" className={styles.primaryButton} disabled={!changed} onClick={() => onSave(draft, featured)}>{changed ? 'บันทึก' : 'ยังไม่มีการเปลี่ยนแปลง'}</button>
  </>;

  return <PlanPage title="ปรับแต่งการเงินของฉัน" caption="ระบบเดาจากประวัติ คุณแก้ให้ตรงชีวิตจริงได้ตลอด" onBack={onCancel} footer={footer}>
    <section className={styles.group} aria-labelledby="plan-income-title">
      <h5 id="plan-income-title">เงินเข้า <span className={styles.newTag}>ใหม่</span></h5>
      <div className={`${styles.row} ${focus === 'income' ? styles.highlight : ''}`}>
        <div className={styles.rowMain}>
          <div><strong>ค่าจ้าง ฿{formatDemoAmount(demoFinance.pendingIncome)}</strong><span>มักเข้าวันที่ {draft.incomeDay} · ระบบเผื่อเข้าช้าถึง {formatDemoDay(draft.incomeDay + demoFinance.incomeDelayBuffer)}</span></div>
          <button type="button" className={styles.editButton} aria-expanded={editing === 'income'} onClick={() => toggleEditing('income')}>{editing === 'income' ? 'เสร็จ' : 'แก้'}</button>
        </div>
        {editing === 'income' && <div className={styles.editor}>
          <Stepper label="วันที่มักเข้า" value={draft.incomeDay} display={`วันที่ ${draft.incomeDay}`} min={2} max={28} step={1} onChange={incomeDay => setDraft(previous => ({ ...previous, incomeDay }))} />
          <p>ไม่นับค่าจ้างเป็นเงินใช้ได้จนกว่าจะเข้าจริง</p>
        </div>}
      </div>
      <div className={styles.row}>
        <div className={styles.rowMain}>
          <div><strong>เงินที่อาจเข้าเพิ่ม · {draft.extraIncome.name} ฿{formatDemoAmount(draft.extraIncome.amount)}</strong><span>ราว {formatDemoDay(draft.extraIncome.day)} · {draft.extraIncome.certain ? 'นับเข้าแผนเมื่อถึงวัน' : 'ยังไม่นับเข้าแผน'}</span></div>
          <button type="button" className={styles.editButton} aria-expanded={editing === 'extra'} onClick={() => toggleEditing('extra')}>{editing === 'extra' ? 'เสร็จ' : 'แก้'}</button>
        </div>
        <Choice label="เงินก้อนนี้แน่นอนไหม" options={[{ id: 'certain', label: 'แน่นอน' }, { id: 'maybe', label: 'อาจจะ' }]} value={draft.extraIncome.certain ? 'certain' : 'maybe'} onChange={value => setDraft(previous => ({ ...previous, extraIncome: { ...previous.extraIncome, certain: value === 'certain' } }))} />
        {editing === 'extra' && <div className={styles.editor}>
          <Stepper label="ยอดเงิน" value={draft.extraIncome.amount} display={`฿${formatDemoAmount(draft.extraIncome.amount)}`} min={500} max={20000} step={500} onChange={amount => setDraft(previous => ({ ...previous, extraIncome: { ...previous.extraIncome, amount } }))} />
          <Stepper label="วันที่คาดว่าเข้า" value={draft.extraIncome.day} display={formatDemoDay(draft.extraIncome.day)} min={2} max={30} step={1} onChange={day => setDraft(previous => ({ ...previous, extraIncome: { ...previous.extraIncome, day } }))} />
        </div>}
      </div>
    </section>

    <section className={styles.group} aria-labelledby="plan-bills-title">
      <h5 id="plan-bills-title">บิลประจำ <span className={styles.newTag}>ใหม่</span></h5>
      {draft.bills.map(bill => <div key={bill.id} className={styles.row}>
        <div className={styles.rowMain}>
          <div><strong>{bill.name} ฿{formatDemoAmount(bill.amount)}{bill.guessed && <span className={styles.guessTag}>ระบบเดา</span>}</strong><span>{billSchedule(bill)}{bill.guessed ? ' · ใช่ไหม?' : bill.reserved > 0 ? ` · กันไว้แล้ว ฿${formatDemoAmount(bill.reserved)}` : ''}</span></div>
          {bill.guessed ? <div className={styles.guessActions}>
            <button type="button" className={styles.editButton} onClick={() => updateBill(bill.id, { guessed: false })}>ยืนยัน</button>
            <button type="button" className={styles.textButton} onClick={() => setDraft(previous => ({ ...previous, bills: previous.bills.filter(item => item.id !== bill.id) }))} aria-label={`ไม่ใช่บิล ${bill.name}`}>ไม่ใช่</button>
          </div> : <button type="button" className={styles.editButton} aria-expanded={editing === bill.id} onClick={() => toggleEditing(bill.id)}>{editing === bill.id ? 'เสร็จ' : 'แก้'}</button>}
        </div>
        {editing === bill.id && <div className={styles.editor}>
          <Stepper label="ยอด" value={bill.amount} display={`฿${formatDemoAmount(bill.amount)}`} min={100} max={20000} step={100} onChange={amount => updateBill(bill.id, { amount })} />
          <Choice label="รอบจ่าย" options={[{ id: 'monthly', label: 'รายเดือน' }, { id: 'yearly', label: 'รายปี' }] as const} value={bill.repeat} onChange={repeat => updateBill(bill.id, { repeat })} />
          <Stepper label="วันที่จ่าย" value={bill.dueDay} display={`วันที่ ${bill.dueDay}`} min={1} max={28} step={1} onChange={dueDay => updateBill(bill.id, { dueDay })} />
          {bill.repeat === 'yearly' && <Stepper label="เดือนที่จ่าย" value={bill.dueMonth} display={monthNames[bill.dueMonth - 1]} min={1} max={12} step={1} onChange={dueMonth => updateBill(bill.id, { dueMonth })} />}
          {bill.reserved > 0 && <p>ส่วนที่เกินยอดที่กันไว้ ฿{formatDemoAmount(bill.reserved)} จะหักจากกระเป๋าหลัก</p>}
        </div>}
      </div>)}
    </section>

    <section className={styles.group} aria-labelledby="plan-goal-title">
      <h5 id="plan-goal-title">เป้าเก็บเงิน <span className={styles.newTag}>ใหม่</span></h5>
      <div className={styles.row}>
        <Choice label="เป้าเก็บเงิน" options={savingGoals} value={draft.goal} onChange={goal => setDraft(previous => ({ ...previous, goal }))} />
        <p className={styles.rowNote}>ชวนเก็บราว {goal.rate * 100}% ของยอดใช้ได้ (฿{nextOffer}/วัน) → Pocket “{emergencyPocket.name}” ไม่เกิน ฿{demoFinance.sweepCap} ต่อครั้ง และคุณยืนยันเองทุกครั้ง</p>
      </div>
    </section>

    <section className={styles.group} aria-labelledby="plan-pockets-title">
      <h5 id="plan-pockets-title">Pocket ที่แสดงในหน้านี้</h5>
      <div className={`${styles.row} ${styles.pocketToggles}`}>
        {pockets.map(pocket => <button type="button" key={pocket.id} aria-pressed={featured.includes(pocket.id)} onClick={() => setFeatured(previous => previous.includes(pocket.id) ? previous.filter(item => item !== pocket.id) : [...previous, pocket.id])}><span>{pocket.name}</span>{featured.includes(pocket.id) && <Check />}</button>)}
      </div>
    </section>

    <button type="button" className={styles.resetButton} disabled={samePlan(draft, defaultPlan)} onClick={() => setDraft(defaultPlan)}><RotateCcw /> กลับไปใช้ค่าที่ระบบเดาให้</button>
    <p className={styles.footnote}>ข้อมูลจำลอง · เดโมคิดยอดใหม่ด้วยสูตรอย่างง่าย ระบบจริงจะพยากรณ์และประเมินโอกาสเงินพอใหม่</p>
  </PlanPage>;
}
