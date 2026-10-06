'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SCROLLY_STEPS } from '../data/scrollySteps';
import StepCard from './StepCard';
import KBankPhoneMockup from './KBankPhoneMockup';
import styles from './Scrollytelling.module.css';

export default function Scrollytelling() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const manualSelectionUntil = useRef(0);

  useEffect(() => {
    let frame = 0;
    const updateStep = () => {
      frame = 0;
      // On mobile, keep the selected screen while the user explores the phone.
      if (window.innerWidth < 1024 || performance.now() < manualSelectionUntil.current) return;
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
      setActiveStep(previous => previous === nearest ? previous : nearest);
    };
    const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(updateStep); };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  const selectPhoneStep = (index: number) => {
    manualSelectionUntil.current = performance.now() + 1000;
    setActiveStep(index);
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
    <section ref={sectionRef} id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-[#00A950] bg-[#00A950]/10 px-3 py-1 rounded-full mb-3">HOW IT WORKS</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">ดูเงินและออมง่ายๆ ใน 2 ขั้นตอน</h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">เห็นภาพการเงินในหน้าเดียว แล้วเลือกออมได้ด้วยตัวเอง</p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {SCROLLY_STEPS.map((step, index) => <button key={step.id} type="button" onClick={() => selectWalkthroughStep(index)} aria-pressed={activeStep === index}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${activeStep === index ? 'bg-[#00A950] text-white shadow-sm' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'}`}>
              {step.stepNumber} {step.category}
            </button>)}
          </div>
        </div>
        <div className={styles.walkthroughGrid}>
          <div className="space-y-8">
            {SCROLLY_STEPS.map((step, index) => <div key={step.id} ref={element => { stepRefs.current[index] = element; }} data-step-index={index} className="scroll-mt-32">
              <StepCard step={step} isActive={activeStep === index} onActivate={() => selectWalkthroughStep(index)} />
            </div>)}
          </div>
          <div className={styles.phoneColumn}>
            <KBankPhoneMockup activeStep={activeStep} onSelectStep={selectPhoneStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
