import { useId } from 'react';
import type { PocketId } from '@/lib/pocket-saving';

/** Filled pocket artwork without bank branding. */
export default function PocketIllustration({ pocket }: { pocket: PocketId }) {
  const gradient = useId();
  const wallet = pocket === 'main' || pocket === 'bills';
  const green = pocket === 'main';
  return (
    <svg viewBox="0 0 150 112" fill="none" aria-hidden="true">
      <defs><linearGradient id={gradient} x1="37" y1="32" x2="113" y2="94" gradientUnits="userSpaceOnUse"><stop stopColor={wallet ? green ? '#29b54c' : '#1cb8bb' : '#fff9f2'} /><stop offset="1" stopColor={wallet ? green ? '#119939' : '#05969c' : '#f4d9d4'} /></linearGradient></defs>
      {wallet ? <>
        <path d="M35 31c0-3 2-5 5-5l64-8c3 0 5 2 5 5v49H35V31Z" fill={green ? '#08772b' : '#096c73'} />
        <path d="M37 33h73c3 0 5 2 5 5v53c0 3-2 5-5 5H37c-3 0-5-2-5-5V38c0-3 2-5 5-5Z" fill={`url(#${gradient})`} />
        <path d="M32 40c0-4 2-7 6-7h72c3 0 5 2 5 5" stroke={green ? '#59c66c' : '#58cfd0'} strokeWidth="2" />
        <path d="M46 46h55" stroke={green ? '#167d33' : '#08717a'} strokeWidth="5" />
        {green && <><rect x="48" y="59" width="26" height="20" rx="3" fill="#e2f7e7" /><path d="M53 66h16m-16 6h9" stroke="#53a66c" strokeWidth="2" strokeLinecap="round" /></>}
      </> : pocket === 'travel' ? <>
        <path d="M42 26v-9h23v9" stroke="#235caf" strokeWidth="6" strokeLinejoin="round" />
        <rect x="26" y="25" width="53" height="69" rx="5" fill="#2869d5" /><path d="M69 25h10v69H69z" fill="#1c50b6" />
        <path d="M38 38v43m12-43v43m12-43v43" stroke="#1e55bd" strokeWidth="4" strokeLinecap="round" /><path d="M35 95v5m32-5v5" stroke="#194eac" strokeWidth="5" strokeLinecap="round" />
        <path d="M95 54v-9h18v9" stroke="#235caf" strokeWidth="5" strokeLinejoin="round" /><rect x="84" y="54" width="44" height="41" rx="4" fill="#2d75e2" /><path d="M119 54h9v41h-9z" fill="#1f52b5" />
        <path d="M94 64v22m11-22v22" stroke="#205dcb" strokeWidth="3" strokeLinecap="round" /><path d="M91 96v4m29-4v4" stroke="#194eac" strokeWidth="4" strokeLinecap="round" />
      </> : <>
        <path d="m46 43-2-15 19 9c7-3 18-4 27-1l15-9 1 16c7 7 11 15 12 25l7 2v13l-10 2-9 17H90l-3-11H64l-4 11H45l-7-19-10-3V65l10-3c0-7 3-14 8-19Z" fill={`url(#${gradient})`} />
        <path d="M58 42h22" stroke="#deb3a5" strokeWidth="3" strokeLinecap="round" />
        {pocket === 'emergency' ? <>
          <circle cx="76" cy="68" r="22" stroke="#d98b44" strokeWidth="2.5" /><circle cx="76" cy="68" r="12" stroke="#d98b44" strokeWidth="2.5" /><circle cx="76" cy="68" r="5" fill="#d98b44" />
          <path d="m77 66 31-42" stroke="#ad663b" strokeWidth="4" strokeLinecap="round" /><path d="m99 34-9-10 13-18 7 13 14 4-16 17Z" fill="#de8128" /><path d="m99 34 11-15" stroke="#ac5b26" strokeWidth="2" /><path d="M76 39v6m0 46v6m-35-29h7m56 0h7" stroke="#be946c" strokeWidth="2" />
        </> : <><circle cx="80" cy="29" r="17" fill="#d39a34" /><circle cx="80" cy="29" r="14" stroke="#eab958" strokeWidth="1.5" /><text x="80" y="38" textAnchor="middle" fill="white" fontSize="25" fontFamily="Arial, sans-serif">฿</text></>}
      </>}
    </svg>
  );
}
