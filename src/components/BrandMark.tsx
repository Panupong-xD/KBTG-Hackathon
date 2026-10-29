import Image from 'next/image';

// The KaTang lettering (492×172) beside the mascot app mark.
export default function BrandMark({ className = '', tagline = false }: { className?: string; tagline?: boolean }) {
  return <span className={`flex items-center gap-2.5 ${className}`}>
    <Image src="/brand/katang-mark.svg" alt="" width={44} height={44} className="w-11 h-11 shrink-0" />
    <span className="flex flex-col justify-center">
      <Image src="/brand/katang-logo.svg" alt="KaTang" width={92} height={32} className="h-8 w-[92px]" />
      {tagline && <span className="font-brand text-[13px] leading-none text-kt-leaf-strong mt-0.5">กะให้เป๊ะ ใช้ให้พอ เหลือก็เก็บ</span>}
    </span>
  </span>;
}
