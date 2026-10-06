'use client';

import React from 'react';
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
      className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 cursor-pointer border ${
        isActive
          ? 'bg-white border-[#00A950] shadow-md ring-1 ring-[#00A950]/20'
          : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
      }`}
    >
      {/* Active Left Indicator */}
      {isActive && (
        <div className="absolute -left-1 top-6 bottom-6 w-1.5 bg-[#00A950] rounded-full" />
      )}

      {/* Header: Step Number */}
      <div className="mb-3">
        <span
          className={`inline-block font-mono text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
            isActive
              ? 'bg-[#00A950] text-white'
              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
          }`}
        >
          Step {step.stepNumber}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mb-5">
        {step.description}
      </p>

      {/* Key Highlights */}
      <div className="space-y-5 mb-5">
        {step.detailGroups.map(group => <div key={group.title}>
          <h4 className="text-sm font-semibold text-slate-900 mb-2">{group.title}</h4>
          <ul className="space-y-2.5">
            {group.details.map(detail => <li key={detail} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
              <Check className="w-4 h-4 text-[#00A950] shrink-0 mt-0.5" />
              <span>{detail}</span>
            </li>)}
          </ul>
        </div>)}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
        {step.metrics.map((m, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
            <div className="text-[11px] text-slate-500">{m.label}</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{m.value}</div>
            {m.sublabel && <div className="text-[11px] text-slate-500 mt-0.5">{m.sublabel}</div>}
          </div>
        ))}
      </div>
      {step.benchmarkNote && <p className="text-[11px] text-slate-500 leading-relaxed mt-3">{step.benchmarkNote}</p>}
    </div>
  );
}
