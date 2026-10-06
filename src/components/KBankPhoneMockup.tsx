"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls, useDragControls, useReducedMotion } from 'framer-motion';
import { Wifi, Bell, Power, ArrowRightLeft, Download, ScanLine, Banknote, Home, ShoppingBasket, User, ChevronRight, CheckCircle2, Info, ArrowUpRight, ArrowDownRight, PiggyBank, Wallet, ShoppingCart, CalendarDays, ChartColumnIncreasing, Sparkles, X, Navigation, ChartPie } from 'lucide-react';
import styles from './KBankPhoneMockup.module.css';

interface KBankPhoneMockupProps {
  activeStep: number;
  onSelectStep?: (index: number) => void;
}

function ServiceIcon({ kind }: { kind: number }) {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    {kind === 0 && <><rect x="9" y="15" width="33" height="24" rx="4" fill="#457e70"/><rect x="5" y="11" width="33" height="24" rx="4" fill="#7bcbb1"/><circle cx="12" cy="18" r="3" fill="white"/><circle cx="17" cy="18" r="3" fill="white"/><path d="M10 27h17" stroke="white" strokeWidth="2" strokeLinecap="round"/></>}
    {kind === 1 && <><circle cx="17" cy="12" r="7" fill="#e6838d"/><text x="17" y="16" textAnchor="middle" fill="white" fontSize="11">฿</text><path d="M7 28c-4-4-6 0-3 3l9 8h20V26H20c-5 0-5 5 0 5h4L12 29z" fill="#edabb1"/><rect x="33" y="25" width="5" height="18" rx="2" fill="#bf737e"/></>}
    {kind === 2 && <><rect x="6" y="28" width="9" height="16" rx="4" fill="#8ed32b"/><rect x="18" y="16" width="9" height="28" rx="4" fill="#87c931"/><rect x="30" y="10" width="9" height="34" rx="4" fill="#77b329"/><circle cx="14" cy="16" r="8" fill="#78a83b"/><path d="M11 20l7-7m-6 0h6v6" stroke="white" strokeWidth="2" strokeLinecap="round"/></>}
    {kind === 3 && <><path d="M25 7l15 7v13c0 8-15 16-15 16S10 35 10 27V14z" fill="#1979c6"/><path d="M25 7l15 7v13c0 8-15 16-15 16z" fill="#1768aa"/><circle cx="15" cy="32" r="9" fill="#73cce1"/><path d="M11 32l3 3 6-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></>}
  </svg>;
}

const services = ['บัตรเครดิต', 'สินเชื่อ', 'ลงทุน', 'ประกัน'];
const quickActions = [
  { label: 'โอนเงิน', Icon: ArrowRightLeft },
  { label: 'เติมเงิน', Icon: Download },
  { label: 'จ่ายบิล', Icon: ScanLine },
  { label: 'ถอนเงิน/ฝากเงิน', Icon: Banknote },
];

export default function KBankPhoneMockup({ activeStep, onSelectStep }: KBankPhoneMockupProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saved, setSaved] = useState(false);
  const [spentToday, setSpentToday] = useState(338);
  const infoTrigger = useRef<HTMLButtonElement>(null);
  const saveTrigger = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const slideAnimation = useAnimationControls();
  const dragControls = useDragControls();
  const slideGap = 12;
  const slideTransition = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 36 };

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;
    const measure = () => setCardWidth(element.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    slideAnimation.start({
      x: -activeStep * (cardWidth + slideGap),
      transition: reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 36 },
    });
  }, [activeStep, cardWidth, reducedMotion, slideAnimation]);

  const dailyBudget = 380;
  const budgetDifference = dailyBudget - spentToday;
  const withinBudget = budgetDifference >= 0;

  const closeDialog = () => {
    const trigger = showInfo ? infoTrigger : saveTrigger;
    setShowInfo(false);
    setShowSuccess(false);
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  };

  const confirmSaving = () => {
    if (saved) return;
    setSaved(true);
    setShowSuccess(true);
  };

  return (
    <div className={styles.phone} aria-label="หน้าจอแอปธนาคารจำลอง">
      <div className={styles.volumeOne} /><div className={styles.volumeTwo} /><div className={styles.powerButton} />
      <div className={styles.screen}>
        <div className={styles.island} />
            <div className={styles.statusBar}>
              <span className={styles.clock}>00:01 <Navigation fill="currentColor" /></span>
              <div className={styles.statusIcons}>
                <span className={styles.signal}><i/><i/><i/><i/></span>
                <Wifi /><span className={styles.battery}>82</span>
              </div>
            </div>
        <div className={styles.scrollArea} inert={showInfo || showSuccess}>
          <header className={styles.hero}>
            <div className={styles.statusSpacer} />
            <div className={styles.appHeader}>
              <span className={styles.financePill}><span className={styles.financeGrid}><i/><i/><i/><i/></span>การเงินของฉัน</span>
              <div className={styles.headerIcons}><Bell/><Power/></div>
            </div>
            <div className={styles.heroCopy}>
              <strong>ปรับใหม่<br/>รู้ใจเรื่องจัดการเงิน</strong>
              <p>ยกระดับประสบการณ์ใช้งาน<br/>จัดเมนูใหม่ เห็นชัด หาง่าย ใช้คล่อง</p>
            </div>
            <Image src="/images/banking-lifestyle.png" alt="กลุ่มเพื่อนกับแอปจัดการเงิน" width={1536} height={1024} sizes="130px" className={styles.lifestyle} />
            <span className={styles.starOne}>✦</span><span className={styles.starTwo}>✦</span><span className={styles.starThree}>✦</span>
            <div className={styles.bannerDots}><i/><i/></div>
          </header>

          <main className={styles.main}>
            <section aria-label="เรื่องสำคัญวันนี้">
              <div className={styles.sectionHeading}>
                <h3>เรื่องสำคัญวันนี้</h3>
              </div>
              <div
                ref={carouselRef}
                className={styles.carouselViewport}
                role="region"
                aria-roledescription="carousel"
                aria-label="การ์ดภาพรวมการเงินและออมเงิน"
                tabIndex={0}
                onKeyDown={event => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                    event.preventDefault();
                    onSelectStep?.(event.key === 'ArrowRight' ? 1 : 0);
                  }
                }}
              >
                <motion.div
                  className={styles.carouselTrack}
                  animate={slideAnimation}
                  initial={false}
                  drag="x"
                  dragControls={dragControls}
                  dragListener={false}
                  dragConstraints={{ left: -(cardWidth + slideGap), right: 0 }}
                  dragElastic={0.06}
                  dragMomentum={false}
                  onPointerDown={event => {
                    if (event.button === 0 && !(event.target as HTMLElement).closest('button')) {
                      dragControls.start(event);
                    }
                  }}
                  onDragEnd={(_, info) => {
                    const delta = info.offset.x < -cardWidth * .16 || info.velocity.x < -500 ? 1
                      : info.offset.x > cardWidth * .16 || info.velocity.x > 500 ? -1 : 0;
                    const nextStep = Math.max(0, Math.min(1, activeStep + delta));
                    onSelectStep?.(nextStep);
                    slideAnimation.start({ x: -nextStep * (cardWidth + slideGap), transition: slideTransition });
                  }}
                >
                  <div className={styles.featureCard} role="group" aria-roledescription="slide" aria-label="ภาพรวมการเงิน 1 จาก 2" inert={activeStep !== 0}>
                    <div className={styles.balanceHeader}>
                      <div className={styles.balanceIdentity}>
                        <span className={styles.featureIcon}><Wallet /></span>
                        <div className={styles.balanceSummary}>
                        <div className={styles.balanceHeading}>
                          <span>ยอดเงินคงเหลือ</span>
                          <button ref={infoTrigger} type="button" className={styles.infoButton} aria-label="ดูรายละเอียดค่าใช้จ่ายและงบวันนี้" aria-haspopup="dialog" onClick={() => setShowInfo(true)}><Info /></button>
                        </div>
                        <strong className={styles.balanceAmount}>฿15,000.00</strong>
                        </div>
                      </div>
                      <div className={styles.budgetComparison}>
                        <span className={withinBudget ? styles.positiveChange : styles.negativeChange} aria-label={`${withinBudget ? 'ประหยัด' : 'ใช้เกินงบ'} ${Math.abs(budgetDifference)} บาทจากงบวันนี้`}>
                          {withinBudget ? <ArrowUpRight /> : <ArrowDownRight />}
                          {budgetDifference > 0 ? '+' : ''}{budgetDifference}
                        </span>
                        <span>{withinBudget ? 'ต่ำกว่างบวันนี้' : 'เกินงบวันนี้'}</span>
                      </div>
                    </div>
                    <div className={styles.budgetGrid}>
                      <div><span className={styles.metricIcon}><ShoppingCart /></span><div><span>วันนี้ใช้ได้</span><strong>฿380 <small>/ วัน</small></strong></div></div>
                      <div><span className={styles.metricIcon}><CalendarDays /></span><div><span>เงินเดือนออกใน</span><strong>18 <small>วัน</small></strong></div></div>
                    </div>
                    <div className={styles.runway}>
                      <div className={styles.runwayHeading}><strong><ChartColumnIncreasing />Financial Runway</strong><span><i />85% Safe Zone</span></div>
                      <div className={styles.runwayTrack} role="meter" aria-label="Financial Runway Safe Zone" aria-valuemin={0} aria-valuemax={100} aria-valuenow={85}><span /></div>
                    </div>
                  </div>
                  <div className={`${styles.featureCard} ${styles.savingsContent}`} role="group" aria-roledescription="slide" aria-label="ออมเงิน 2 จาก 2" inert={activeStep !== 1}>
                    <div className={styles.savingsHeader}>
                      <span className={styles.featureIcon}><PiggyBank /></span>
                      <div><h4>ออมเงินให้เป้าหมาย</h4><p>กันบิลและเงินสำรองแล้ว</p></div>
                    </div>
                    <div className={styles.savingsSuggestion}>
                      <div className={styles.suggestionCopy}><Sparkles /><p><strong>ลด Delivery ฿80/วัน</strong><span>Safe Zone <b>92%</b> · กระทบชีวิตน้อย</span></p></div>
                      <div className={styles.goalProgress}><span>เงินสำรองฉุกเฉิน</span><strong>เร็วขึ้น 3 วัน</strong></div>
                    </div>
                    <button ref={saveTrigger} type="button" className={styles.saveButton} onClick={confirmSaving} aria-disabled={saved}>
                      {saved ? <><CheckCircle2 /> ออมเรียบร้อย</> : <>ยืนยันออม ฿150 <ChevronRight /></>}
                    </button>
                    <span className={styles.consentNote}>คุณยืนยันก่อนโอนทุกครั้ง</span>
                  </div>
                </motion.div>
              </div>
              <div className={styles.pagination} aria-label="เลือกขั้นตอนเดโม">
                {['ภาพรวมการเงิน', 'ออมเงิน'].map((label, index) => <button key={label} type="button" aria-label={label} aria-pressed={activeStep === index} onClick={() => onSelectStep?.(index)}><span /></button>)}
              </div>
            </section>

            <div className={styles.services}>
              {services.map((label, index) => <div className={styles.service} key={label}><span className={`${styles.serviceTile} ${styles[`service${index}`]}`}><ServiceIcon kind={index}/></span><span>{label}</span></div>)}
            </div>

            <section className={styles.quickSection}>
              <div className={styles.sectionHeading}><h3>ธุรกรรมด่วน</h3><span className={styles.sectionLink}>ดูทั้งหมด <ChevronRight/></span></div>
              <div className={styles.quickGrid}>
                {quickActions.map(({label, Icon}) => <div className={styles.quickAction} key={label}><span className={styles.quickIcon}><Icon strokeWidth={1.65}/></span><span>{label === 'ถอนเงิน/ฝากเงิน' ? <>ถอนเงิน/<br/>ฝากเงิน</> : label}</span></div>)}
              </div>
            </section>

            <section className={styles.shortcuts}>
              <div className={styles.sectionHeading}><h3>ทางลัดของฉัน</h3><span className={styles.sectionLink}>ปรับแต่ง <ChevronRight/></span></div>
              <div className={styles.shortcutGrid}>
                <div>ยังไม่มีรายการโปรด</div><div>จัดการ/ตั้งค่า<br/>บัญชี</div><div><ChartPie fill="#8bce28" stroke="#173e36"/><span>สินทรัพย์<br/>ทั้งหมด</span></div>
              </div>
            </section>
          </main>
        </div>

        <nav className={styles.dock} inert={showInfo || showSuccess} aria-label="เมนูหลักในหน้าจอจำลอง">
          <button className={activeStep === 0 ? styles.activeNav : ''} onClick={() => onSelectStep?.(0)}><Home fill="currentColor"/><span>หน้าแรก</span></button>
          <div className={styles.navItem}><ShoppingBasket/><span>market</span></div>
          <button className={`${styles.transactionNav} ${activeStep === 1 ? styles.activeNav : ''}`} onClick={() => onSelectStep?.(1)}><span className={styles.transactionIcon}>฿</span><span>ธุรกรรม</span></button>
          <div className={styles.navItem}><ScanLine/><span>สแกน/สร้างQR</span></div>
          <div className={`${styles.navItem} ${styles.profileNav}`}><span className={styles.profileIcon}><User fill="white"/></span><span>โปรไฟล์</span></div>
        </nav>
        {(showInfo || showSuccess) && <div className={styles.modalBackdrop} onClick={closeDialog}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-dialog-title"
            aria-describedby="phone-dialog-description"
            className={styles.modal}
            onClick={event => event.stopPropagation()}
            onKeyDown={event => {
              if (event.key === 'Escape') closeDialog();
              if (event.key === 'Tab') {
                const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
                const first = buttons[0];
                const last = buttons[buttons.length - 1];
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
              }
            }}
          >
            <button type="button" autoFocus className={styles.closeDialog} aria-label="ปิดหน้าต่าง" onClick={closeDialog}><X /></button>
            {showInfo ? <>
              <h4 id="phone-dialog-title">ค่าใช้จ่ายและงบวันนี้</h4>
              <p id="phone-dialog-description">กันค่าใช้จ่ายจำเป็นไว้ก่อนคำนวณงบรายวัน</p>
              <dl className={styles.costDetails}>
                <div><dt>ค่าเช่าหอพัก</dt><dd>฿5,500</dd></div>
                <div><dt>ค่าน้ำไฟและอินเทอร์เน็ต</dt><dd>฿1,660</dd></div>
                <div className={styles.costTotal}><dt>รวมค่าใช้จ่ายจำเป็น</dt><dd>฿7,160</dd></div>
                <div><dt>เงินสำรองก้นบัญชี</dt><dd>฿1,000</dd></div>
                <div><dt>งบใช้ได้ถึงเงินเดือนออก</dt><dd>฿6,840</dd></div>
                <div><dt>งบใช้จ่ายวันนี้</dt><dd>฿380</dd></div>
                <div><dt>ใช้ไปแล้ววันนี้</dt><dd>฿{spentToday}</dd></div>
              </dl>
              <p className={styles.comparisonNote}>ลูกศรแสดงส่วนต่างจากงบวันนี้ หน่วยเป็นบาท</p>
              <div className={styles.exampleChoices} aria-label="เลือกข้อมูลใช้จ่ายตัวอย่าง">
                <button type="button" aria-pressed={spentToday === 338} onClick={() => setSpentToday(338)}>ใช้ต่ำกว่างบ</button>
                <button type="button" aria-pressed={spentToday === 432} onClick={() => setSpentToday(432)}>ใช้เกินงบ</button>
              </div>
            </> : <>
              <span className={styles.successIcon}><CheckCircle2 /></span>
              <h4 id="phone-dialog-title">ออมเงินสำเร็จ</h4>
              <p id="phone-dialog-description">โอนเข้าบัญชีเงินออมแล้ว<br/>เป้าหมายของคุณใกล้ขึ้นอีกนิด</p>
              <button type="button" className={styles.saveButton} onClick={closeDialog}>เรียบร้อย</button>
            </>}
          </div>
        </div>}

      </div>
    </div>
  );
}
