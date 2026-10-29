'use client';

import { Check } from 'lucide-react';
import { ScrollyStep } from '../data/scrollySteps';

interface StepCardProps {
  step: ScrollyStep;
  isActive: boolean;
  onActivate: () => void;
}

export default function StepCard({ step, isActive, onActivate }: StepCardProps) {
  return (
    <div
      onClick={onActivate}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onActivate();
        }
      }}
      className={`group relative rounded-[24px] p-6 sm:p-8 transition-all duration-300 cursor-pointer border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kt-leaf-strong ${
        isActive
          ? 'bg-kt-paper border-kt-leaf shadow-md'
          : 'bg-kt-paper/70 hover:bg-kt-paper border-transparent'
      }`}
    >

      {/* Header: Step Number */}
      <div className="mb-3">
        <span
          className={`inline-block font-brand text-base px-3 py-0.5 rounded-full transition-colors ${
            isActive
              ? 'bg-kt-leaf-strong text-white'
              : 'bg-kt-sage text-kt-leaf-strong group-hover:bg-kt-tint'
          }`}
        >
          {step.kind === 'summary' ? 'Summary' : `Step ${step.stepNumber}`}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-kt-ink mb-2 leading-snug">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-kt-muted leading-relaxed mb-5">
        {step.description}
      </p>

      {/* Key Highlights */}
      <div className="space-y-5 mb-5">
        {step.detailGroups.map(group => <div key={group.title}>
          <h4 className="text-sm font-semibold text-kt-ink mb-2">{group.title}</h4>
          <ul className="space-y-2.5">
            {group.details.map(detail => <li key={detail} className="flex items-start gap-2 text-sm text-kt-muted leading-relaxed">
              <Check className="w-4 h-4 text-kt-leaf-strong shrink-0 mt-0.5" aria-hidden="true" />
              <span>{detail}</span>
            </li>)}
          </ul>
        </div>)}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-kt-line">
        {step.metrics.map((m, idx) => (
          <div key={idx} className="bg-kt-cream rounded-2xl p-3">
            <div className="text-[11px] text-kt-muted">{m.label}</div>
            <div className="text-sm font-semibold text-kt-ink mt-0.5">{m.value}</div>
            {m.sublabel && <div className="text-[11px] text-kt-muted mt-0.5">{m.sublabel}</div>}
          </div>
        ))}
      </div>
      {step.benchmarkNote && <p className="text-[11px] text-kt-muted leading-relaxed mt-3">{step.benchmarkNote}</p>}
    </div>
  );
}
