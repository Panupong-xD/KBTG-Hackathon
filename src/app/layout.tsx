import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'K-Runway | รู้ก่อนเงินตึง · KBTG Hackathon',
  description: 'เงินยังไม่เข้า แต่ค่าใช้จ่ายไม่เคยรอ พบกับ K-Runway แนวคิด AI Co-pilot สำหรับ First Jobber รู้วันนี้ใช้ได้เท่าไหร่ ให้เงินพอถึงก้อนถัดไป พร้อมออมเข้า K-ePocket ที่คุณเลือกเอง',
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
