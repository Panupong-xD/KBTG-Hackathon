'use client';

import { useEffect, useId, useRef } from 'react';
import { ArrowRight, ArrowRightLeft, CalendarDays, Check, Clock3, X } from 'lucide-react';
import { previousRoundDemo as round } from '../data/previousRound';
import { formatDemoAmount } from '../lib/pocket-saving';
import styles from './RoundSummary.module.css';

export default function RoundSummary({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButton = useRef<HTMLButtonElement>(null);
  const daysOverPlan = round.days - round.daysWithinPlan;

  useEffect(() => {
    closeButton.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <section
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={event => event.stopPropagation()}
        onKeyDown={event => {
          if (event.key === 'Escape') { event.stopPropagation(); onClose(); }
          if (event.key !== 'Tab') return;
          const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }}
      >
        <div className={styles.handle} aria-hidden="true" />
        <header className={styles.header}>
          <div>
            <h4 id={titleId}>สรุปรอบก่อน</h4>
            <p id={descriptionId}>{round.period} <span>ข้อมูลจำลอง</span></p>
          </div>
          <button ref={closeButton} type="button" className={styles.close} onClick={onClose} aria-label="ปิดสรุปรอบก่อน"><X /></button>
        </header>

        <div className={styles.body}>
          <section className={styles.plan} aria-label="แผนกับสิ่งที่เกิดขึ้นจริง">
            <span className={styles.eyebrow}><CalendarDays /> แผนกับสิ่งที่เกิดขึ้นจริง</span>
            <h5>ใช้ไม่เกินยอดที่วางแผนไว้</h5>
            <p className={styles.days}><strong>{round.daysWithinPlan}</strong><span>จาก {round.days} วัน</span></p>
            <div className={styles.bar} aria-hidden="true"><span style={{ width: `${round.daysWithinPlan / round.days * 100}%` }} /></div>
            <div className={styles.legend}><span><i />ตามแผน {round.daysWithinPlan} วัน</span><span><i />เกินแผน {daysOverPlan} วัน</span></div>
            <p className={styles.planNote}>เทียบกับยอดใช้ได้ที่ปรับในแต่ละวัน</p>
          </section>

          <section className={styles.events} aria-labelledby={`${titleId}-events`}>
            <h5 id={`${titleId}-events`}>ระหว่างรอบ มีอะไรเปลี่ยนไป</h5>
            <div className={styles.event}>
              <span className={styles.eventIcon}><Clock3 /></span>
              <p><strong>ค่าจ้างเข้าช้า {round.incomeDelayDays} วัน</strong><span>จากวันที่คาดว่าจะได้รับ</span></p>
            </div>
            <div className={styles.event}>
              <span className={styles.eventIcon}><ArrowRightLeft /></span>
              <p><strong>ปรับยอดใช้ได้ลง {round.adjustedPlanDays} วัน</strong><span>ระบบปรับแผนระหว่างรอเงินเข้า</span></p>
            </div>
          </section>

          <section className={styles.carried} aria-label="เงินสะสมจากรอบก่อน">
            <div className={styles.carriedHeading}><span>เงินสะสมที่ยกมารอบนี้</span><strong>฿{formatDemoAmount(round.carriedAmount)}</strong></div>
            <p><Check /> รวมอยู่ในเงินสะสมของรอบนี้แล้ว</p>
          </section>
        </div>

        <footer className={styles.footer}>
          <button type="button" onClick={onClose}>กลับไปดูรอบนี้ <ArrowRight /></button>
        </footer>
      </section>
    </div>
  );
}
