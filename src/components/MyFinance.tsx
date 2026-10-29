'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Check, ChevronRight, FileSearch, LifeBuoy, ShoppingBag, Umbrella, SquarePen, Ticket, User, Utensils, Wallet, X } from 'lucide-react';
import { previousRoundDemo as round } from '../data/previousRound';
import { dailyBudget, demoFinance, formatDemoAmount, formatPocketBalance, type PocketId } from '../lib/pocket-saving';
import RoundSummary from './RoundSummary';
import PocketIllustration from './PocketIllustration';
import styles from './MyFinance.module.css';

const sections = [
  { label: 'สินทรัพย์ของฉัน', Icon: LifeBuoy, target: 'assets' },
  { label: 'สรุปรายรับรายจ่าย', Icon: FileSearch, target: 'transactions' },
  { label: 'กระเป๋าของฉัน', Icon: Wallet, target: 'pockets' },
  { label: 'ตั้งงบรายจ่าย', Icon: Umbrella, target: 'budget' },
];

interface MyFinanceProps {
  accountBalance: number;
  pocketSnapshots: { id: PocketId; name: string; balance: number }[];
  onClose: () => void;
}

export default function MyFinance({ accountBalance, pocketSnapshots, onClose }: MyFinanceProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [detail, setDetail] = useState<'incoming' | 'outgoing' | 'pockets' | 'budget' | 'customize' | null>(null);
  const [featuredPockets, setFeaturedPockets] = useState<PocketId[]>(['main', 'bills', 'savings']);
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  const detailClose = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const summaryTrigger = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const chartMaximum = Math.max(dailyBudget, demoFinance.spentToday, 1);

  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => { if (detail) detailClose.current?.focus({ preventScroll: true }); }, [detail]);

  const goToSection = (section: string) => {
    const area = content.current;
    const target = sectionRefs.current[section];
    if (!area || !target) return;
    setActiveSection(sections.findIndex(item => item.target === section));
    area.scrollTo({ top: target.getBoundingClientRect().top - area.getBoundingClientRect().top + area.scrollTop - 96, behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  const closeSummary = () => {
    setShowSummary(false);
    requestAnimationFrame(() => summaryTrigger.current?.focus({ preventScroll: true }));
  };
  const openDetail = (kind: NonNullable<typeof detail>, trigger: HTMLButtonElement) => {
    detailTrigger.current = trigger;
    setDetail(kind);
  };
  const closeDetail = () => {
    setDetail(null);
    requestAnimationFrame(() => detailTrigger.current?.focus({ preventScroll: true }));
  };
  const detailTitle = detail === 'incoming' ? 'สรุปขาเข้า' : detail === 'outgoing' ? 'สรุปขาออก' : detail === 'budget' ? 'ตั้งงบรายจ่าย' : detail === 'customize' ? 'ปรับแต่งการเงินของฉัน' : 'กระเป๋าทั้งหมด';

  return <>
    <section className={styles.page} aria-label="การเงินของฉัน" inert={showSummary || detail !== null} onKeyDown={event => {
      if (event.key === 'Escape') { event.stopPropagation(); onClose(); }
    }}>
      <div ref={content} className={styles.content} onScroll={() => {
        const area = content.current;
        if (!area) return;
        setScrolled(area.scrollTop > 60);
      }}>
        <header className={`${styles.header} ${scrolled ? styles.compact : ''}`}>
          <h3 ref={heading} tabIndex={-1} className={styles.pageTitle}>การเงินของฉัน</h3>
          <div className={styles.profile}>
            <span className={styles.avatar} aria-hidden="true"><User /></span>
            <p>ผู้ใช้เดโม <SquarePen aria-hidden="true" /></p>
          </div>
          <div className={styles.compactIdentity} aria-hidden="true"><span><User /></span><strong>การเงินของฉัน</strong></div>
          <button type="button" onClick={onClose} aria-label="ปิดการเงินของฉัน" className={styles.close}><X /></button>
        </header>

        <nav className={styles.tabs} aria-label="หมวดในการเงินของฉัน">
          {sections.map(({ label, Icon, target }, index) => <button key={label} type="button" aria-pressed={activeSection === index} aria-controls={`${id}-${target}`} onClick={() => goToSection(target)}><Icon />{label}</button>)}
        </nav>

        <div className={styles.cards}>
        <section id={`${id}-summary`} ref={element => { sectionRefs.current.summary = element; }} className={`${styles.card} ${styles.summary}`} aria-labelledby={`${id}-summary-title`}>
          <div className={styles.summaryHeading}><div><h4 id={`${id}-summary-title`}>สรุปรอบเดือน</h4><p className={styles.period}>{round.month} · ข้อมูลจำลอง</p></div><button ref={summaryTrigger} type="button" className={styles.summaryButton} onClick={() => setShowSummary(true)} aria-label="ดูสรุปรอบเดือน" aria-haspopup="dialog">ดูสรุป <ChevronRight /></button></div>
          <div className={styles.summaryMetric}><span>ใช้ไม่เกินยอดที่วางแผนไว้</span><strong>{round.daysWithinPlan}<small> / {round.days} วัน</small></strong></div>
          <div className={styles.progress} aria-hidden="true"><span style={{ width: `${round.daysWithinPlan / round.days * 100}%` }} /></div>
          <div className={styles.summaryFooter}><span><Check /> เงินสะสมยกมารอบนี้</span><strong>฿{formatDemoAmount(round.carriedAmount)}</strong></div>
        </section>
        <section id={`${id}-assets`} ref={element => { sectionRefs.current.assets = element; }} className={`${styles.card} ${styles.assetsCard}`} aria-labelledby={`${id}-assets-title`}>
          <div className={styles.sectionHeading}><h4 id={`${id}-assets-title`}>สินทรัพย์ของฉัน</h4></div>
          <div className={styles.assetSubheading}><strong>สินทรัพย์รวม</strong><button type="button" onClick={() => goToSection('pockets')}>ดู Pocket <ChevronRight /></button></div>
          <div className={styles.assetTotal}><span>มูลค่ารวม</span><strong>{formatPocketBalance(accountBalance)}</strong></div>
          <div className={styles.assetChart}><div className={styles.donut} role="img" aria-label="สินทรัพย์ในเดโมทั้งหมดเป็นเงินฝาก" /><span className={styles.depositLegend}><i /> เงินฝาก</span></div>
          <p className={styles.updated}>ข้อมูลจำลอง · ยอดรวมทุก Pocket</p>
        </section>

        <section id={`${id}-transactions`} ref={element => { sectionRefs.current.transactions = element; }} className={styles.card} aria-labelledby={`${id}-transactions-title`}>
          <div className={styles.sectionHeading}><h4 id={`${id}-transactions-title`}>สรุปรายรับรายจ่าย</h4></div>
          <p className={styles.accountLabel}>บัญชีออมทรัพย์ตัวอย่าง<span>รายการที่จำลองวันนี้</span></p>
          <div className={styles.flowChart} role="img" aria-label={`วันนี้ในเดโม เงินเข้า 0 บาท ใช้จ่าย ${demoFinance.spentToday} บาท`}>
            <div className={styles.chartGrid} aria-hidden="true"><span>฿{formatDemoAmount(chartMaximum)}</span><span>฿{formatDemoAmount(chartMaximum / 2)}</span><span>฿0</span></div>
            <div className={styles.columns} aria-hidden="true"><div><div className={styles.columnTrack}><span className={styles.incomingBar} /></div><span>เงินเข้า</span></div><div><div className={styles.columnTrack}><span className={styles.outgoingBar} style={{ height: `${demoFinance.spentToday / chartMaximum * 100}%` }} /></div><span>ใช้จ่าย</span></div></div>
          </div>
          <div className={styles.flowTotals}>
            <div><span>เงินเข้าวันนี้</span><strong>0.00</strong><button type="button" onClick={event => openDetail('incoming', event.currentTarget)} aria-haspopup="dialog">สรุปขาเข้า</button></div>
            <div><span>ใช้จ่ายวันนี้</span><strong>{formatPocketBalance(demoFinance.spentToday)}</strong><button type="button" onClick={event => openDetail('outgoing', event.currentTarget)} aria-haspopup="dialog">สรุปขาออก</button></div>
          </div>
          <p className={styles.flowUpdated}>ข้อมูลตัวอย่างสำหรับเดโม</p>
        </section>

        <section id={`${id}-pockets`} ref={element => { sectionRefs.current.pockets = element; }} className={`${styles.card} ${styles.pocketsCard}`} aria-labelledby={`${id}-pockets-title`}>
          <div className={styles.sectionHeading}><h4 id={`${id}-pockets-title`}>กระเป๋าของฉัน</h4><button type="button" className={styles.sectionLink} onClick={event => openDetail('pockets', event.currentTarget)} aria-haspopup="dialog">ดูกระเป๋าทั้งหมด <ChevronRight /></button></div>
          <div className={styles.pocketCarousel} tabIndex={0} role="region" aria-label="กระเป๋าที่เลือกแสดง เลื่อนซ้ายขวาเพื่อดูทั้งหมด">
            {featuredPockets.map(pocketId => {
              const pocket = pocketSnapshots.find(item => item.id === pocketId)!;
              return <article key={pocket.id} className={styles.pocketTile}><span className={`${styles.pocketArt} ${styles[pocket.id]}`}><PocketIllustration pocket={pocket.id} /></span><span title={pocket.name}>{pocket.name}</span><strong>{formatPocketBalance(pocket.balance)}</strong></article>;
            })}
            {featuredPockets.length === 0 && <button type="button" className={styles.emptyPockets} onClick={event => openDetail('customize', event.currentTarget)}>เลือกกระเป๋าของคุณมาแสดงที่นี่</button>}
          </div>
        </section>

        <section id={`${id}-budget`} ref={element => { sectionRefs.current.budget = element; }} className={styles.card} aria-labelledby={`${id}-budget-title`}>
          <div className={styles.sectionHeading}><h4 id={`${id}-budget-title`}>ตั้งงบรายจ่าย</h4><button type="button" className={styles.startBudget} onClick={event => openDetail('budget', event.currentTarget)} aria-haspopup="dialog">เริ่มตั้งงบ</button></div>
          <p className={styles.budgetIntro}>คุมค่าใช้จ่ายรายเดือนด้วย การตั้งค่างบได้ตามหมวดหมู่</p>
          <div className={styles.budgetArt} aria-hidden="true"><div className={styles.budgetRing} />{[{ Icon: ShoppingBag, tone: 'shopping' }, { Icon: Utensils, tone: 'food' }, { Icon: Ticket, tone: 'leisure' }].map(({ Icon, tone }) => <div key={tone} className={`${styles.budgetMini} ${styles[tone]}`}><span><Icon /></span><i /><b /></div>)}</div>
        </section>
        <button type="button" className={styles.customize} onClick={event => openDetail('customize', event.currentTarget)} aria-haspopup="dialog">ปรับแต่งการเงินของฉัน</button>
        </div>
      </div>
    </section>
    {showSummary && <RoundSummary onClose={closeSummary} />}
    {detail && <div className={styles.detailBackdrop} onClick={closeDetail}>
      <section role="dialog" aria-modal="true" aria-labelledby={`${id}-detail-title`} className={styles.detailSheet} onClick={event => event.stopPropagation()} onKeyDown={event => {
        if (event.key === 'Escape') { event.stopPropagation(); closeDetail(); }
        if (event.key === 'Tab') {
          const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));
          const first = buttons[0]; const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}>
        <button ref={detailClose} type="button" className={styles.detailClose} onClick={closeDetail} aria-label={`ปิด${detailTitle}`}><X /></button>
        <h4 id={`${id}-detail-title`}>{detailTitle}</h4>
        <p className={styles.detailCaption}>ข้อมูลตัวอย่างสำหรับเดโม</p>
        {detail === 'incoming' && <><div className={styles.detailAmount}>เงินเข้าวันนี้ <strong>฿0.00</strong></div><p>ค่าจ้างที่รอเข้า ฿{formatDemoAmount(demoFinance.pendingIncome)} ยังไม่รวมเป็นเงินรับแล้ว</p></>}
        {detail === 'outgoing' && <div className={styles.detailAmount}>ใช้จ่ายวันนี้ <strong>฿{formatPocketBalance(demoFinance.spentToday)}</strong></div>}
        {(detail === 'pockets' || detail === 'customize') && <>{detail === 'customize' && <p>เลือก Pocket ที่ต้องการแสดงในการเงินของฉัน</p>}<div className={styles.pocketDetails}>{pocketSnapshots.map(pocket => detail === 'customize' ? <button type="button" key={pocket.id} aria-pressed={featuredPockets.includes(pocket.id)} onClick={() => setFeaturedPockets(previous => previous.includes(pocket.id) ? previous.filter(item => item !== pocket.id) : [...previous, pocket.id])}><span>{pocket.name}</span>{featuredPockets.includes(pocket.id) && <Check />}</button> : <div key={pocket.id}><span>{pocket.name}</span><strong>฿{formatPocketBalance(pocket.balance)}</strong></div>)}</div></>}
        {detail === 'budget' && <><div className={styles.detailAmount}>ยอดใช้ได้วันนี้ <strong>฿{dailyBudget}</strong></div><p>คิดเผื่อบิล เงินสำรอง และช่วงที่รอรับเงิน การตั้งงบรายหมวดยังเป็นตัวอย่างหน้าจอในเดโมนี้</p></>}
        <button type="button" className={styles.detailDone} onClick={closeDetail}>{detail === 'customize' ? 'เสร็จสิ้น' : 'กลับไปการเงินของฉัน'}</button>
      </section>
    </div>}
  </>;
}
