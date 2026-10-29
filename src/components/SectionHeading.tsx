import { Sprout } from 'lucide-react';
import Mascot, { type MascotPose } from './Mascot';

// Shared section header: a hand-lettered eyebrow, the title, an intro line and an optional mascot.
export default function SectionHeading({ eyebrow, title, intro, mascot, mascotAlt = '' }: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  mascot?: MascotPose;
  mascotAlt?: string;
}) {
  return (
    <div className="max-w-3xl mx-auto mb-12 sm:mb-14 flex flex-col items-center text-center">
      {mascot && <Mascot pose={mascot} width={104} alt={mascotAlt} className="mb-2 w-[88px] sm:w-[104px] h-auto" />}
      <span className="inline-flex items-center gap-1.5 font-brand text-base sm:text-lg text-kt-leaf-strong mb-2">
        <Sprout className="w-4 h-4" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-kt-ink tracking-tight leading-[1.3]">{title}</h2>
      {intro && <p className="mt-3 text-kt-muted text-sm sm:text-base leading-relaxed max-w-2xl">{intro}</p>}
    </div>
  );
}
