import Image from 'next/image';

export default function BrandMark({ className = '' }: { className?: string }) {
  return <Image src="/brand-mark.svg" alt="" width={40} height={40}
    className={`w-10 h-10 shrink-0 rounded-xl shadow-sm ${className}`} />;
}
