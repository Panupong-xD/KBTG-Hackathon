'use client';

import { useState, useEffect, useRef } from 'react';
import { DEMO_VIEWS } from '../data/scrollySteps';
import StepCard from './StepCard';
import SectionHeading from './SectionHeading';
import BankPhoneMockup from './BankPhoneMockup';
import styles from './Scrollytelling.module.css';

export default function Scrollytelling() {
  const [stepIndex, setStepIndex] = useState(0);
  const activeStep = Math.min(stepIndex, DEMO_VIEWS.length - 1);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const manualSelection = useRef(false);

  useEffect(() => {
    let frame = 0;
    const updateStep = () => {
      frame = 0;
      // On mobile, keep the selected screen while the user explores the phone.
      if (window.innerWidth < 1024 || manualSelection.current) return;
      const section = sectionRef.current?.getBoundingClientRect();
      if (!section || section.top > window.innerHeight * .5 || section.bottom < window.innerHeight * .25) return;
      const focalY = window.innerHeight * .45;
      let nearest = 0;
      let distance = Infinity;
      stepRefs.current.forEach((element, index) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const currentDistance = Math.abs(rect.top + rect.height * .45 - focalY);
        if (currentDistance < distance) { distance = currentDistance; nearest = index; }
      });
      setStepIndex(previous => previous === nearest ? previous : nearest);
    };
    const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(updateStep); };
    // Keep a manually chosen phone screen while it is being used. Focus scrolling
    // and viewport changes should not send the carousel back to the other card.
    const resumePageSelection = (event: Event) => {
      if (!(event.target instanceof Element && event.target.closest('[data-phone-mockup]'))) manualSelection.current = false;
    };
    const resumeWithKeyboard = (event: KeyboardEvent) => {
      if (['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) resumePageSelection(event);
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('wheel', resumePageSelection, { passive: true });
    window.addEventListener('touchmove', resumePageSelection, { passive: true });
    window.addEventListener('pointerdown', resumePageSelection);
    window.addEventListener('keydown', resumeWithKeyboard);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('wheel', resumePageSelection);
      window.removeEventListener('touchmove', resumePageSelection);
      window.removeEventListener('pointerdown', resumePageSelection);
      window.removeEventListener('keydown', resumeWithKeyboard);
      cancelAnimationFrame(frame);
    };
  }, []);

  const selectPhoneStep = (index: number) => {
    manualSelection.current = true;
    setStepIndex(index);
  };

  const selectWalkthroughStep = (index: number) => {
    selectPhoneStep(index);
    if (window.innerWidth >= 1024) {
      stepRefs.current[index]?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 sm:py-24 bg-kt-sage/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Try the demo"
          title="ดูเงินและออมใน 2 ขั้นตอน พร้อมสรุปรอบเดือน"
          intro="ดูยอดใช้ได้วันนี้ เลือกเก็บเข้า Pocket และเปิด Summary ในการเงินของฉันเพื่อทบทวนรอบที่ผ่านมา"
        />
        <div role="group" aria-label="เลือกขั้นตอนของเดโม" className="flex flex-wrap items-center justify-center gap-2 -mt-6 mb-12">
          {DEMO_VIEWS.map((step, index) => <button key={step.id} type="button" onClick={() => selectWalkthroughStep(index)} aria-pressed={activeStep === index}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kt-leaf-strong ${activeStep === index ? 'kt-btn shadow-sm' : 'bg-kt-paper text-kt-muted hover:text-kt-ink border border-kt-line'}`}>
            {step.kind === 'summary' ? 'Summary' : `${step.stepNumber} ${step.category}`}
          </button>)}
        </div>
        <div className={styles.walkthroughGrid}>
          <div className="space-y-8">
            {DEMO_VIEWS.map((step, index) => <div key={step.id} ref={element => { stepRefs.current[index] = element; }} data-step-index={index} className="scroll-mt-32">
              <StepCard step={step} isActive={activeStep === index} onActivate={() => selectWalkthroughStep(index)} />
            </div>)}
          </div>
          <div className={styles.phoneColumn}>
            <BankPhoneMockup activeStep={activeStep} onSelectStep={selectPhoneStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
