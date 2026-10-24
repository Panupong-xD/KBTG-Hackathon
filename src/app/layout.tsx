import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'K-Runway | รู้ก่อนเงินตึง · KBTG Hackathon',
  description: 'K-Runway แนวคิดผู้ช่วยการเงิน AI บน K PLUS สำหรับ First Jobber ที่รายได้ไม่แน่นอน แนะนำงบวันนี้และโอกาสเงินพอ คิดเผื่อบิลและเงินเข้าช้า พร้อมชวนออมเข้า K-ePocket ที่คุณเลือกเอง',
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
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-[#00A950] selection:text-white font-['Prompt',sans-serif]">
        {children}
      </body>
    </html>
  );
}
