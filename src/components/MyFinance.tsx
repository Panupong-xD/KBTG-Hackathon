'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronRight, Clock3, FileSearch, LifeBuoy, ShoppingBag, Umbrella, SquarePen, Ticket, User, Utensils, Wallet, X } from 'lucide-react';
import { previousRoundDemo as round } from '../data/previousRound';
import { demoFinance, demoToday, forecastPlan, formatDemoAmount, formatDemoDay, formatPocketBalance, type MoneyPlan, type PocketId } from '../lib/pocket-saving';
import RoundSummary from './RoundSummary';
import PlanCustomize from './PlanCustomize';
import AccountSummary from './AccountSummary';
import planStyles from './MoneyPlan.module.css';
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
  plan: MoneyPlan;
  planEdited: boolean;
  savedToday: number;
  spentToday: number;
  showProbability: boolean;
  onSavePlan: (plan: MoneyPlan) => void;
  onClose: () => void;
}

export default function MyFinance({ accountBalance, pocketSnapshots, plan, planEdited, savedToday, spentToday, showProbability, onSavePlan, onClose }: MyFinanceProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [detail, setDetail] = useState<'incoming' | 'outgoing' | 'pockets' | 'budget' | null>(null);
  const [page, setPage] = useState<{ kind: 'customize'; focus?: 'income' } | { kind: 'account' } | null>(null);
  const [featuredPockets, setFeaturedPockets] = useState<PocketId[]>(['main', 'bills', 'emergency']);
  const pageTrigger = useRef<HTMLButtonElement | null>(null);
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  const detailClose = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const summaryTrigger = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const forecast = forecastPlan(plan);
  const budgetToday = forecast.budget - savedToday;
  const chartMaximum = Math.max(forecast.budget, spentToday, 1);

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
  const openPage = (next: NonNullable<typeof page>, trigger: HTMLButtonElement) => {
    // Opening Customize from the Account Summary page returns to My Finance, not to that page.
    if (!page) pageTrigger.current = trigger;
    setPage(next);
  };
  const closePage = () => {
    setPage(null);
    requestAnimationFrame(() => pageTrigger.current?.focus({ preventScroll: true }));
  };
  const detailTitle = detail === 'incoming' ? 'สรุปขาเข้า' : detail === 'outgoing' ? 'สรุปขาออก' : detail === 'budget' ? 'ตั้งงบรายจ่าย' : 'กระเป๋าทั้งหมด';

  return <>
    <section className={styles.page} aria-label="การเงินของฉัน" inert={showSummary || detail !== null || page !== null} onKeyDown={event => {
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
        <section className={planStyles.todayCard} aria-labelledby={`${id}-today-title`}>
          <div className={planStyles.cardHeading}><h4 id={`${id}-today-title`}>ยอดใช้ได้วันนี้</h4><span className={`${planStyles.sourceChip} ${planEdited ? planStyles.edited : ''}`}>{planEdited ? 'ปรับตามที่คุณแก้' : 'ระบบประเมินให้'}</span></div>
          <p className={planStyles.todayAmount}>฿{formatDemoAmount(budgetToday)}<small>/ วัน · โดยประมาณ</small></p>
          <p className={planStyles.todayMeta}>{savedToday > 0 ? `ออมแล้ว ฿${savedToday} จาก ฿${formatDemoAmount(forecast.budget)} · ` : ''}เผื่อค่าจ้างเข้าช้าแล้ว · คาดเข้า {formatDemoDay(plan.incomeDay)} (อีก {forecast.daysUntilIncome} วัน)</p>
          <div className={planStyles.probability}>
            <div className={planStyles.probabilityHeading}><span>โอกาสเงินพอ {demoFinance.daysIncludingToday} วัน</span>{showProbability ? <strong>{demoFinance.illustrativeProbability}%*</strong> : <em>รอประเมินใหม่*</em>}</div>
            <div className={planStyles.meter} role={showProbability ? 'meter' : 'img'} aria-label={showProbability ? `โอกาสเงินพอใน ${demoFinance.daysIncludingToday} วัน ค่าตัวอย่าง` : 'โอกาสเงินพอ ต้องประเมินใหม่หลังแผนเปลี่ยน'} aria-valuemin={showProbability ? 0 : undefined} aria-valuemax={showProbability ? 100 : undefined} aria-valuenow={showProbability ? demoFinance.illustrativeProbability : undefined}><span style={{ width: showProbability ? `${demoFinance.illustrativeProbability}%` : '0%' }} /></div>
          </div>
          <div className={planStyles.cardActions}>
            <button type="button" onClick={event => openPage({ kind: 'account' }, event.currentTarget)} aria-haspopup="dialog">ดูที่มาของยอด <ChevronRight /></button>
            <button type="button" onClick={event => openPage({ kind: 'customize' }, event.currentTarget)} aria-haspopup="dialog"><SquarePen /> แก้ข้อมูล</button>
          </div>
        </section>
        <section className={planStyles.roundCard} aria-labelledby={`${id}-round-title`}>
          <div className={planStyles.cardHeading}><div><h4 id={`${id}-round-title`}>สรุปรอบที่แล้ว</h4><p>{round.period} · ข้อมูลจำลอง</p></div><button ref={summaryTrigger} type="button" onClick={() => setShowSummary(true)} aria-label="ดูสรุปรอบที่แล้วฉบับเต็ม" aria-haspopup="dialog">ดูทั้งหมด <ChevronRight /></button></div>
          <dl className={planStyles.roundStats}>
            <div className={planStyles.good}><dt>ใช้ตามแผน</dt><dd>{round.daysWithinPlan}<small>/{round.days} วัน</small></dd></div>
            <div className={planStyles.late}><dt>ค่าจ้างเข้าช้า</dt><dd>{round.incomeDelayDays}<small> วัน</small></dd></div>
            <div><dt>ยกมารอบนี้</dt><dd>฿{formatDemoAmount(round.carriedAmount)}</dd></div>
          </dl>
          <div className={planStyles.roundNudge}><span><Clock3 size={13} aria-hidden="true" /><span>รอบก่อนค่าจ้างช้า {round.incomeDelayDays} วัน<br />ยังเข้าวันที่ {plan.incomeDay} อยู่ไหม?</span></span><button type="button" onClick={event => openPage({ kind: 'customize', focus: 'income' }, event.currentTarget)} aria-haspopup="dialog">ปรับวันเงินเข้า <ChevronRight /></button></div>
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
          <div className={styles.flowChart} role="img" aria-label={`วันนี้ในเดโม เงินเข้า 0 บาท ใช้จ่าย ${spentToday} บาท`}>
            <div className={styles.chartGrid} aria-hidden="true"><span>฿{formatDemoAmount(chartMaximum)}</span><span>฿{formatDemoAmount(chartMaximum / 2)}</span><span>฿0</span></div>
            <div className={styles.columns} aria-hidden="true"><div><div className={styles.columnTrack}><span className={styles.incomingBar} /></div><span>เงินเข้า</span></div><div><div className={styles.columnTrack}><span className={styles.outgoingBar} style={{ height: `${spentToday / chartMaximum * 100}%` }} /></div><span>ใช้จ่าย</span></div></div>
          </div>
          <div className={styles.flowTotals}>
            <div><span>เงินเข้าวันนี้</span><strong>0.00</strong><button type="button" onClick={event => openDetail('incoming', event.currentTarget)} aria-haspopup="dialog">สรุปขาเข้า</button></div>
            <div><span>ใช้จ่ายวันนี้</span><strong>{formatPocketBalance(spentToday)}</strong><button type="button" onClick={event => openDetail('outgoing', event.currentTarget)} aria-haspopup="dialog">สรุปขาออก</button></div>
          </div>
          <button type="button" className={planStyles.transactionsLink} onClick={event => openPage({ kind: 'account' }, event.currentTarget)} aria-haspopup="dialog">ที่มาของยอดวันนี้ และ {demoFinance.daysIncludingToday} วันข้างหน้า <ChevronRight /></button>
          <p className={styles.flowUpdated}>ข้อมูลตัวอย่างสำหรับเดโม · {formatDemoDay(demoToday)}</p>
        </section>

        <section id={`${id}-pockets`} ref={element => { sectionRefs.current.pockets = element; }} className={`${styles.card} ${styles.pocketsCard}`} aria-labelledby={`${id}-pockets-title`}>
          <div className={styles.sectionHeading}><h4 id={`${id}-pockets-title`}>กระเป๋าของฉัน</h4><button type="button" className={styles.sectionLink} onClick={event => openDetail('pockets', event.currentTarget)} aria-haspopup="dialog">ดูกระเป๋าทั้งหมด <ChevronRight /></button></div>
          <div className={styles.pocketCarousel} tabIndex={0} role="region" aria-label="กระเป๋าที่เลือกแสดง เลื่อนซ้ายขวาเพื่อดูทั้งหมด">
            {featuredPockets.map(pocketId => {
              const pocket = pocketSnapshots.find(item => item.id === pocketId)!;
              return <article key={pocket.id} className={styles.pocketTile}><span className={`${styles.pocketArt} ${styles[pocket.id]}`}><PocketIllustration pocket={pocket.id} /></span><span title={pocket.name}>{pocket.name}</span><strong>{formatPocketBalance(pocket.balance)}</strong>{pocket.id === 'emergency' && <span className={planStyles.destinationTag}>ปลายทางชวนเก็บ</span>}</article>;
            })}
            {featuredPockets.length === 0 && <button type="button" className={styles.emptyPockets} onClick={event => openPage({ kind: 'customize' }, event.currentTarget)}>เลือกกระเป๋าของคุณมาแสดงที่นี่</button>}
          </div>
        </section>

        <section id={`${id}-budget`} ref={element => { sectionRefs.current.budget = element; }} className={styles.card} aria-labelledby={`${id}-budget-title`}>
          <div className={styles.sectionHeading}><h4 id={`${id}-budget-title`}>ตั้งงบรายจ่าย</h4><button type="button" className={styles.startBudget} onClick={event => openDetail('budget', event.currentTarget)} aria-haspopup="dialog">เริ่มตั้งงบ</button></div>
          <p className={styles.budgetIntro}>คุมค่าใช้จ่ายรายเดือนด้วย การตั้งค่างบได้ตามหมวดหมู่</p>
          <div className={styles.budgetArt} aria-hidden="true"><div className={styles.budgetRing} />{[{ Icon: ShoppingBag, tone: 'shopping' }, { Icon: Utensils, tone: 'food' }, { Icon: Ticket, tone: 'leisure' }].map(({ Icon, tone }) => <div key={tone} className={`${styles.budgetMini} ${styles[tone]}`}><span><Icon /></span><i /><b /></div>)}</div>
        </section>
        <button type="button" className={styles.customize} onClick={event => openPage({ kind: 'customize' }, event.currentTarget)} aria-haspopup="dialog">ปรับแต่งการเงินของฉัน</button>
        </div>
      </div>
    </section>
    {showSummary && <RoundSummary onClose={closeSummary} />}
    {page?.kind === 'account' && <AccountSummary plan={plan} spentToday={spentToday} savedToday={savedToday} showProbability={showProbability} onEdit={() => setPage({ kind: 'customize' })} onBack={closePage} />}
    {page?.kind === 'customize' && <PlanCustomize plan={plan} featuredPockets={featuredPockets} focus={page.focus} onCancel={closePage} onSave={(nextPlan, nextFeatured) => { onSavePlan(nextPlan); setFeaturedPockets(nextFeatured); closePage(); }} />}
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
        {detail === 'outgoing' && <div className={styles.detailAmount}>ใช้จ่ายวันนี้ <strong>฿{formatPocketBalance(spentToday)}</strong></div>}
        {detail === 'pockets' && <div className={styles.pocketDetails}>{pocketSnapshots.map(pocket => <div key={pocket.id}><span>{pocket.name}</span><strong>฿{formatPocketBalance(pocket.balance)}</strong></div>)}</div>}
        {detail === 'budget' && <><div className={styles.detailAmount}>ยอดใช้ได้วันนี้ <strong>฿{formatDemoAmount(budgetToday)}</strong></div><p>คิดเผื่อบิล เงินสำรอง และช่วงที่รอรับเงิน การตั้งงบรายหมวดยังเป็นตัวอย่างหน้าจอในเดโมนี้</p></>}
        <button type="button" className={styles.detailDone} onClick={closeDetail}>กลับไปการเงินของฉัน</button>
      </section>
    </div>}
  </>;
}
