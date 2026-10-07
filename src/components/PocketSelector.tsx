import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, Bell, Check, ChevronDown, ChevronRight, Home, Power, RefreshCw, ScanLine, ShoppingBasket, User } from 'lucide-react';
import { pockets, savingAmount, formatPocketBalance, type SavingPocketId } from '@/lib/pocket-saving';
import PocketIllustration from './PocketIllustration';
import phoneStyles from './KBankPhoneMockup.module.css';
import styles from './PocketSelector.module.css';

interface PocketSelectorProps {
  onCancel: () => void;
  onConfirm: (pocket: SavingPocketId) => void;
}

export default function PocketSelector({ onCancel, onConfirm }: PocketSelectorProps) {
  const [selected, setSelected] = useState<SavingPocketId | null>(null);
  const destination = pockets.find(pocket => pocket.id === selected);
  const contentRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Open at the pocket list, like the scrolled reference. The account remains above it.
    if (contentRef.current && accountRef.current) contentRef.current.scrollTop = accountRef.current.offsetHeight - 24;
  }, []);

  useLayoutEffect(() => {
    if (!selected || !selectedRef.current || !contentRef.current || !confirmationRef.current) return;
    const keepSelectionVisible = () => {
      if (!selectedRef.current || !confirmationRef.current || !contentRef.current) return;
      const bottom = selectedRef.current.getBoundingClientRect().bottom;
      const visibleBottom = confirmationRef.current.getBoundingClientRect().top - 8;
      if (bottom > visibleBottom) contentRef.current.scrollBy({ top: bottom - visibleBottom, behavior: 'instant' });
    };
    keepSelectionVisible();
    let frame = 0;
    const scheduleVisibilityCheck = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(keepSelectionVisible);
    };
    const observer = new ResizeObserver(scheduleVisibilityCheck);
    observer.observe(contentRef.current);
    observer.observe(selectedRef.current);
    window.addEventListener('resize', scheduleVisibilityCheck);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', scheduleVisibilityCheck);
      cancelAnimationFrame(frame);
    };
  }, [selected]);

  return (
    <section
      className={styles.page}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pocket-title"
      aria-describedby="pocket-description"
      onKeyDown={event => {
        if (event.key === 'Escape') { event.stopPropagation(); onCancel(); }
        if (event.key === 'Tab') {
          const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}
    >
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button type="button" autoFocus onClick={onCancel} aria-label="กลับไปหน้าออมเงิน" className={styles.backButton}><ArrowLeft /></button>
          <span className={phoneStyles.financePill}><span className={phoneStyles.financeGrid}><i /><i /><i /><i /></span>การเงินของฉัน</span>
        </div>
        <div className={styles.headerIcons} aria-hidden="true"><Bell /><Power /></div>
      </header>
      <div className={styles.categories} aria-label="ประเภทบริการ">
        {['บัญชี', 'บัตรเครดิต', 'สินเชื่อ', 'ลงทุน', 'ประกัน'].map((label, index) => <span key={label} className={index === 0 ? styles.currentCategory : ''}>{label}</span>)}
      </div>

      <div ref={contentRef} className={`${styles.content} ${selected ? styles.hasSelection : ''}`}>
        <div ref={accountRef} className={styles.accountCarousel}>
          <div className={styles.account}>
            <div className={styles.accountIdentity}><strong>ออมทรัพย์ e-Pocket <ChevronDown /></strong><small>xxx-x-x3253-x</small><span className={styles.accountWallet}><PocketIllustration pocket="bills" /></span></div>
            <div className={styles.accountBalance}><span>ยอดเงินที่ใช้ได้</span><strong>15,000.00</strong><span className={styles.latest}>ดูรายการล่าสุด <ChevronRight /></span></div>
          </div>
        </div>
        <div className={styles.updated}><span><RefreshCw />ข้อมูล ณ เวลา 00:01 น.</span><span className={styles.accountDots}><i /><i /><i /><i /></span></div>
        <div className={styles.pocketTabs}><span>กระเป๋าของฉัน</span><span>ธุรกรรม</span></div>
        <div className={styles.selectionHeading}><h3 id="pocket-title">เลือกกระเป๋าปลายทาง</h3><span id="pocket-description">แตะ Pocket เพื่อออม</span></div>

        {(['spending', 'saving'] as const).map(kind => (
          <section className={styles.group} key={kind} aria-label={kind === 'spending' ? 'กระเป๋าใช้จ่าย' : 'กระเป๋าออม'}>
            <div className={styles.groupHeading}><h4>{kind === 'spending' ? 'กระเป๋าใช้จ่าย (3)' : 'กระเป๋าออม (2)'}</h4><span>{formatPocketBalance(pockets.filter(pocket => pocket.kind === kind).reduce((sum, pocket) => sum + pocket.balance, 0))}</span></div>
            <div className={styles.grid}>
              {pockets.filter(pocket => pocket.kind === kind).map(({ id, name, tone, balance }) => (
                <button
                  key={id}
                  ref={selected === id ? selectedRef : undefined}
                  type="button"
                  className={styles.pocket}
                  disabled={id === 'main'}
                  aria-pressed={selected === id}
                  aria-label={`${name} ยอด ${formatPocketBalance(balance)} บาท${id === 'main' ? ' กระเป๋าต้นทาง' : ''}`}
                  onClick={() => { if (id !== 'main') setSelected(id); }}
                >
                  <span className={`${styles.art} ${styles[tone]}`}><PocketIllustration pocket={id} /></span>
                  {id === 'main' && <span className={styles.sourceBadge}>ต้นทาง</span>}
                  {selected === id && <span className={styles.selectedMark}><Check /></span>}
                  <span className={styles.pocketDetails}><span className={styles.pocketName}>{name}{id === 'savings' && <><br />(กระเป๋าออม)</>}</span><strong>{formatPocketBalance(balance)}</strong></span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {destination && <div ref={confirmationRef} className={styles.confirmation}>
        <div aria-live="polite"><span>ออมเข้า</span><strong>{destination.name}</strong></div>
        <button type="button" onClick={() => { if (selected) onConfirm(selected); }}>ยืนยัน ฿{savingAmount} <ChevronRight aria-hidden="true" /></button>
      </div>}

      <nav className={phoneStyles.dock} aria-label="เมนูหลักในหน้า Pocket">
        <button type="button" onClick={onCancel} aria-label="กลับหน้าแรก"><Home fill="currentColor" /><span>หน้าแรก</span></button>
        <div className={phoneStyles.navItem}><ShoppingBasket /><span>market</span></div>
        <div className={`${phoneStyles.navItem} ${phoneStyles.transactionNav} ${phoneStyles.activeNav}`}><span className={phoneStyles.transactionIcon}>฿</span><span>ธุรกรรม</span></div>
        <div className={phoneStyles.navItem}><ScanLine /><span>สแกน/สร้างQR</span></div>
        <div className={phoneStyles.navItem}><span className={phoneStyles.profileIcon}><User fill="white" /></span><span>โปรไฟล์</span></div>
      </nav>
    </section>
  );
}
