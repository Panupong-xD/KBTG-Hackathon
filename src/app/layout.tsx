import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'K-Runway & Predictive Auto-Saving | Innovation Concept Prototype',
  description: 'นวัตกรรมพยากรณ์กระแสเงินสดล่วงหน้าและระบบออมเงินกึ่งอัตโนมัติสำหรับคนเริ่มทำงาน (Prototype Concept)',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
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
