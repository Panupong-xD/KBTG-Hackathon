'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './MoneyPlan.module.css';

// A full-screen page inside My Finance, opened over it like a pushed screen in the app.
export default function PlanPage({ title, caption, onBack, footer, children }: { title: string; caption?: string; onBack: () => void; footer?: ReactNode; children: ReactNode }) {
  const titleId = useId();
  const back = useRef<HTMLButtonElement>(null);

  useEffect(() => { back.current?.focus({ preventScroll: true }); }, []);

  return <section className={styles.planPage} role="dialog" aria-modal="true" aria-labelledby={titleId} onKeyDown={event => {
    if (event.key === 'Escape') { event.stopPropagation(); onBack(); }
    if (event.key !== 'Tab') return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), [tabindex="0"]'));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }}>
    <header className={styles.planHeader}>
      <button ref={back} type="button" onClick={onBack} aria-label={`กลับจาก${title}`}><ArrowLeft /></button>
      <div><h4 id={titleId}>{title}</h4>{caption && <p>{caption}</p>}</div>
    </header>
    <div className={styles.planBody}>{children}</div>
    {footer && <footer className={styles.planFooter}>{footer}</footer>}
  </section>;
}
