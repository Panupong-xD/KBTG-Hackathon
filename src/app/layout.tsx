import type { Metadata } from 'next';
import './globals.css';

const title = 'กะตังค์ KaTang | กะให้เป๊ะ ใช้ให้พอ เหลือก็เก็บ · Concept Demo';
const description = 'กะตังค์ (KaTang) แนวคิดผู้ช่วยการเงิน AI ในแอปธนาคาร สำหรับ First Jobber ที่รายได้ไม่แน่นอน แนะนำยอดใช้ได้วันนี้และโอกาสเงินพอ คิดเผื่อบิลและเงินเข้าช้า พร้อมชวนออมเข้ากระเป๋าเงินเก็บ (Pocket) ที่คุณเลือกเอง';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, siteName: 'KaTang', locale: 'th_TH', type: 'website' },
  twitter: { card: 'summary', title, description },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Itim&family=Sarabun:wght@400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-kt-cream text-kt-ink antialiased min-h-screen selection:bg-kt-leaf selection:text-white font-['Prompt',sans-serif]">
        {children}
      </body>
    </html>
  );
}
