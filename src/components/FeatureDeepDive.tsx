'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { dailyBudget, demoFinance, demoSavingExample, formatDemoAmount } from '../lib/pocket-saving';

export default function FeatureDeepDive() {
  const [showTechDetails, setShowTechDetails] = useState<boolean>(false);

  return (
    <section id="features" className="py-20 sm:py-24 bg-kt-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="The idea behind KaTang"
          mascot="think"
          title="คิดเผื่อเงินตึง เปิดทางให้เงินเก็บ"
          intro="ต่อยอดแนวคิดการตั้งงบรายหมวด ด้วยคำแนะนำจากข้อมูลเงินเข้า–ออก สำหรับคนที่รายได้ไม่แน่นอน พร้อมเชื่อมการออมเข้า Pocket"
        />

        {/* 2 Architecture Cards with Meaningful Visual Shapes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* ========================================================= */}
          {/* PILLAR 1: The Runway & Glide Slope (Aeronautical Metaphor) */}
          {/* ========================================================= */}
          <div className="bg-kt-paper border border-kt-line rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-kt-leaf-strong bg-kt-sage px-3 py-1 rounded-full border border-kt-tint">
                  01 · PREDICT BEFORE YOU SPEND
                </span>
                <span className="text-xs font-medium text-kt-muted">Runway Intelligence</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-kt-ink tracking-tight mb-1">
                Runway Intelligence · เห็นก่อน ปรับทัน
              </h3>
              <p className="text-xs sm:text-sm text-kt-muted mb-6">
                AI ที่คิดเผื่อค่าจ้างเข้าช้า แปลงเงินเข้า–ออกเป็นงบรายวันและโอกาสเงินพอ พร้อมเตือนเมื่อความเสี่ยงเพิ่ม
              </p>

              {/* Aeronautical Glide-Slope SVG Stage (Frameless) */}
              {/* Aeronautical Glide-Slope SVG Stage (Frameless) */}
              <div className="w-full flex items-center justify-center my-auto py-2">
                <div className="w-full max-w-[580px]">
                  <svg viewBox="0 0 540 280" className="w-full h-auto drop-shadow-xs select-none">
                    <defs>
                      {/* Safe Glide Area Gradient */}
                      <linearGradient id="glideGreenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#5FA057" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#5FA057" stopOpacity="0.01" />
                      </linearGradient>
                      {/* Runway Danger Zone Gradient */}
                      <linearGradient id="runwayDangerZone" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.18" />
                      </linearGradient>
                    </defs>

                    {/* Top Legend */}
                    <line x1="45" y1="22" x2="62" y2="22" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x="68" y="26" fill="#66705A" fontSize="10.5" fontWeight="600">
                      ก่อนปรับแผน
                    </text>
                    <line x1="220" y1="22" x2="238" y2="22" stroke="#5FA057" strokeWidth="3" strokeLinecap="round" />
                    <text x="244" y="26" fill="#263321" fontSize="10.5" fontWeight="700">
                      เมื่อปรับงบ
                    </text>
                    <text x="500" y="26" textAnchor="end" fill="#8F957E" fontSize="10">
                      Concept Illustration*
                    </text>

                    {/* Altitude Radar Horizon Grid Lines */}
                    <line x1="40" y1="52" x2="500" y2="52" stroke="#E6DCC8" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="35" y="55" textAnchor="end" fill="#8F957E" fontSize="8.5">สูง</text>

                    <line x1="40" y1="86" x2="500" y2="86" stroke="#E6DCC8" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="35" y="89" textAnchor="end" fill="#8F957E" fontSize="8.5">พอใช้</text>

                    <line x1="40" y1="140" x2="500" y2="140" stroke="#E6DCC8" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="35" y="143" textAnchor="end" fill="#8F957E" fontSize="8.5">ลดลง</text>

                    <line x1="40" y1="190" x2="500" y2="190" stroke="#FCA5A5" strokeWidth="1.2" strokeDasharray="4 4" />
                    <text x="35" y="193" textAnchor="end" fill="#EF4444" fontSize="8.5" fontWeight="bold">สำรอง</text>

                    {/* Danger Zone Floor (Below ฿1,000) */}
                    <rect x="40" y="190" width="460" height="50" rx="8" fill="url(#runwayDangerZone)" />
                    <text x="48" y="218" fill="#DC2626" fontSize="10" fontWeight="bold" letterSpacing="0.4">
                      ช่วงที่เริ่มใช้เงินสำรอง
                    </text>

                    {/* Safe Glide Slope Shaded Area (Passes through ฿15k at Day 12) */}
                    <polygon 
                      points="45,52 195,86 330,124 475,165 475,190 45,190" 
                      fill="url(#glideGreenGlow)" 
                    />

                    {/* Unmanaged Descent Path (Starts close at Day 1, diverges progressively, dropping on Day 21) */}
                    <path
                      d="M 45 52 C 165 72, 235 110, 330 190 L 355 228"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                    />

                    {/* Crash Impact Marker on Day 21 */}
                    <circle cx="330" cy="190" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                    <rect x="255" y="148" width="150" height="26" rx="6" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1" />
                    <text x="330" y="165" textAnchor="middle" fill="#B91C1C" fontSize="10.5" fontWeight="bold">
                      เงินเข้าช้า : เริ่มแตะเงินสำรอง
                    </text>

                    {/* AI Controlled Glide Path (Solid green Curve, passing ฿15k at Day 12) */}
                    <path
                      d="M 45 52 C 175 75, 300 115, 475 165"
                      fill="none"
                      stroke="#5FA057"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* AI Safe-to-Spend Floating Badge */}
                    <rect x="175" y="68" width="152" height="26" rx="13" fill="#5FA057" filter="drop-shadow(0 2px 4px rgba(95,160,87,0.25))" />
                    <text x="251" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                      ยอดใช้ได้วันนี้ : ฿{dailyBudget} / วัน
                    </text>

                    {/* Payday Safe Touchdown (Day 30) */}
                    <circle cx="475" cy="165" r="6" fill="#5FA057" stroke="#FFFFFF" strokeWidth="2" />
                    <rect x="405" y="122" width="95" height="26" rx="6" fill="#EEF3E2" stroke="#B5D59A" strokeWidth="1" />
                    <text x="452" y="139" textAnchor="middle" fill="#3E5A2E" fontSize="10.5" fontWeight="bold">
                      มอง {demoFinance.daysIncludingToday} วัน
                    </text>

                    {/* Timeline Milestones */}
                    <text x="45" y="262" textAnchor="start" fill="#66705A" fontSize="10" fontWeight="bold">
                      วันนี้
                    </text>
                    <text x="195" y="262" textAnchor="middle" fill="#8F957E" fontSize="10">
                      คาดเงินเข้า
                    </text>
                    <text x="330" y="262" textAnchor="middle" fill="#DC2626" fontSize="10" fontWeight="bold">
                      ถ้าเงินเข้าช้า
                    </text>
                    <text x="500" y="262" textAnchor="end" fill="#3F7A3F" fontSize="10" fontWeight="bold">
                      ครบ {demoFinance.daysIncludingToday} วัน
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom 2 Clean Metric Badges */}
            <div className="mt-6 pt-4 border-t border-kt-line grid grid-cols-2 gap-3 text-xs">
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-2.5 text-center">
                <span className="text-kt-muted block text-[11px] font-medium">ก่อนปรับแผน</span>
                <strong className="text-rose-700 font-bold">เงินเข้าช้า อาจเริ่มแตะเงินสำรอง</strong>
              </div>
              <div className="bg-kt-sage border border-kt-tint rounded-xl p-2.5 text-center">
                <span className="text-kt-muted block text-[11px] font-medium">เมื่อปรับงบ</span>
                <strong className="text-kt-leaf-strong font-bold">โอกาสเงินพอใน {demoFinance.daysIncludingToday} วัน {demoFinance.illustrativeProbability}%*</strong>
              </div>
            </div>
            <div className="mt-2 text-right">
              <span className="text-[10px] text-kt-muted font-normal">*เส้นกราฟสื่อแนวคิด ไม่ใช่ยอดเงินจริงตามสัดส่วน ส่วน {demoFinance.illustrativeProbability}% เป็นค่าตัวอย่างที่ยังไม่ได้ทดสอบกับข้อมูลจริง</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PILLAR 2: UI Wallet Container to Bank Safe Vault          */}
          {/* ========================================================= */}
          <div className="bg-kt-paper border border-kt-line rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  02 · SAVE ON YOUR TERMS
                </span>
                <span className="text-xs font-medium text-kt-muted">Pocket Co-pilot</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-kt-ink tracking-tight mb-1">
                Pocket Co-pilot · ออมก่อนใช้
              </h3>
              <p className="text-xs sm:text-sm text-kt-muted mb-6">
                วันนี้ใช้ได้ ฿{dailyBudget} ถ้าใช้แค่ ฿{demoSavingExample.budgetAfterSaving} ออมได้ ฿{demoSavingExample.offer} เลือกเองว่าจะออมตอนนี้หรือไม่ เงินจะย้ายเมื่อคุณยืนยัน
              </p>

              {/* Stage: Clean Symbolic Vector Infographic (Wallet ➔ Smart Sweep ➔ Locked Vault) */}
              <div className="w-full flex items-center justify-center my-auto py-2">
                <div className="w-full max-w-[580px]">
                  <svg viewBox="0 0 560 280" className="w-full h-auto drop-shadow-xs select-none">
                    <defs>
                      <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 1 L 8 5 L 0 9 z" fill="#5FA057" />
                      </marker>
                      <marker id="arrowBlue" viewBox="0 0 10 10" refX="4" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 10 1 L 2 5 L 10 9 z" fill="#D9962B" />
                      </marker>
                    </defs>

                    {/* Top Legend / Header Bar */}
                    <text x="22" y="22" fill="#263321" fontSize="11" fontWeight="bold">
                      Pocket : กระเป๋าหลัก
                    </text>
                    
                    <text x="280" y="22" textAnchor="middle" fill="#8F957E" fontSize="9.5" fontWeight="bold" letterSpacing="0.4">
                      USER CONFIRMED
                    </text>

                    <text x="360" y="22" fill="#263321" fontSize="11" fontWeight="bold">
                      Pocket ที่คุณเลือก
                    </text>

                    {/* ========================================================= */}
                    {/* LEFT CONTAINER: K+ Checking Wallet                        */}
                    {/* ========================================================= */}
                    <rect x="20" y="36" width="185" height="232" rx="16" fill="#FFFFFF" stroke="#E6DCC8" strokeWidth="1.5" />
                    <text x="34" y="54" fill="#66705A" fontSize="9" fontWeight="bold" letterSpacing="0.4">
                      DAILY BUDGET & RESERVE
                    </text>

                    {/* Tier 1: Micro-Surplus (Outflow) */}
                    <rect x="30" y="66" width="165" height="48" rx="10" fill="#EEF3E2" stroke="#CFE3B8" strokeWidth="1" />
                    <text x="42" y="86" fill="#3E5A2E" fontSize="10" fontWeight="bold">ออมก่อนใช้</text>
                    <text x="183" y="87" textAnchor="end" fill="#3F7A3F" fontSize="13" fontWeight="900">฿{demoSavingExample.offer}</text>
                    <text x="42" y="102" fill="#4F8B48" fontSize="8">ชวนออมตั้งแต่ต้นวัน</text>

                    {/* Tier 2: Daily Budget (Operating) */}
                    <rect x="30" y="126" width="165" height="48" rx="10" fill="#FBF8F0" stroke="#E6DCC8" strokeWidth="1" />
                    <text x="42" y="146" fill="#3D4A35" fontSize="10" fontWeight="bold">ยอดใช้ได้วันนี้</text>
                    <text x="183" y="147" textAnchor="end" fill="#263321" fontSize="13" fontWeight="900">฿{demoSavingExample.budgetAfterSaving}</text>
                    <text x="42" y="162" fill="#66705A" fontSize="8">หลังออม จากเดิม ฿{dailyBudget}</text>

                    {/* Tier 3: Hard Floor Shield (Protection) */}
                    <rect x="30" y="186" width="165" height="68" rx="10" fill="#FDF6E3" stroke="#F2DDA6" strokeWidth="1" />
                    <text x="42" y="208" fill="#7A4806" fontSize="10" fontWeight="bold">เงินสำรองขั้นต่ำ*</text>
                    <text x="183" y="209" textAnchor="end" fill="#8A5208" fontSize="13" fontWeight="900">฿{formatDemoAmount(demoFinance.hardFloor)}</text>
                    <text x="42" y="226" fill="#D9962B" fontSize="8">กันไว้เผื่อค่าใช้จ่ายจำเป็น</text>
                    <text x="42" y="240" fill="#E0B050" fontSize="7.5">เผื่องบระหว่างรอรับเงินก่อนออม</text>

                    {/* ========================================================= */}
                    {/* CENTER BRIDGE: Transfer Streams                           */}
                    {/* ========================================================= */}
                    {/* Top Stream: Smart Sweep Arrow */}
                    <path d="M 205 90 L 228 90" fill="none" stroke="#5FA057" strokeWidth="2" strokeDasharray="3 2" />
                    <rect x="228" y="76" width="104" height="28" rx="14" fill="#5FA057" filter="drop-shadow(0 2px 4px rgba(0,169,80,0.22))" />
                    <text x="280" y="90" dominantBaseline="central" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="bold">
                      ยืนยัน ฿{demoSavingExample.offer} ➔
                    </text>
                    <path d="M 332 90 L 350 90" fill="none" stroke="#5FA057" strokeWidth="2" markerEnd="url(#arrowGreen)" />

                    {/* Bottom Stream: ย้ายกลับเอง* Arrow */}
                    <path d="M 355 220 L 336 220" fill="none" stroke="#D9962B" strokeWidth="2" strokeDasharray="4 2" />
                    <rect x="224" y="206" width="112" height="28" rx="14" fill="#FDF6E3" stroke="#E9C77A" strokeWidth="1" />
                    
                    {/* Clean SVG Vector Return Arrow Icon inside pill (Perfect vertical & horizontal alignment) */}
                    <g transform="translate(241, 220)">
                      <path 
                        d="M 4.2 0.8 C 4.2 -2 2.5 -4.2 0 -4.2 C -2.5 -4.2 -4.2 -2 -4.2 0.8 L -4.2 3.8 M -2 1.6 L -4.2 4.2 L -6.4 1.6" 
                        fill="none" 
                        stroke="#8A5208" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </g>
                    <text x="288" y="220" dominantBaseline="central" textAnchor="middle" fill="#8A5208" fontSize="10" fontWeight="bold">
                      ย้ายกลับเอง*
                    </text>
                    <path d="M 224 220 L 210 220" fill="none" stroke="#D9962B" strokeWidth="2" markerEnd="url(#arrowBlue)" />

                    {/* ========================================================= */}
                    {/* RIGHT CONTAINER: selected Pocket within Pocket        */}
                    {/* ========================================================= */}
                    <rect x="355" y="36" width="185" height="232" rx="16" fill="#FFFFFF" stroke="#CFE3B8" strokeWidth="1.5" />
                    <text x="447.5" y="54" textAnchor="middle" fill="#3F7A3F" fontSize="9" fontWeight="bold" letterSpacing="0.4">
                      YOUR POCKET, YOUR CHOICE
                    </text>

                    {/* The Symbolic Padlock (Refined & Compact with clear 20px+ spacing) */}
                    {/* Shackle */}
                    <path d="M 439 85 A 8.5 8.5 0 0 1 456 85 V 93 H 439 Z" fill="none" stroke="#5FA057" strokeWidth="2.8" strokeLinecap="round" />
                    {/* Lock Body */}
                    <rect x="429.5" y="93" width="36" height="26" rx="7" fill="#5FA057" filter="drop-shadow(0 2px 4px rgba(0,169,80,0.22))" />
                    {/* Keyhole */}
                    <circle cx="447.5" cy="103" r="2.4" fill="#FFFFFF" />
                    <path d="M 446.3 104 L 448.7 104 L 449.5 111 L 445.5 111 Z" fill="#FFFFFF" />

                    {/* High-Yield Rate */}
                    <text x="447.5" y="145" textAnchor="middle" fill="#263321" fontSize="18" fontWeight="900" letterSpacing="-0.5">
                      เลือกเอง
                    </text>
                    <text x="447.5" y="159" textAnchor="middle" fill="#4F8B48" fontSize="9" fontWeight="bold" letterSpacing="0.5">
                      กระเป๋าเงินเก็บ
                    </text>

                    {/* Accumulated Reserve Box */}
                    <rect x="367" y="180" width="161" height="74" rx="12" fill="#EEF3E2" stroke="#B5D59A" strokeWidth="1" />
                    <text x="447.5" y="202" textAnchor="middle" fill="#3E5A2E" fontSize="9" fontWeight="600">
                      เงินที่จัดสรรจากวันนี้
                    </text>
                    <text x="447.5" y="224" textAnchor="middle" fill="#2F4A23" fontSize="14" fontWeight="900">
                      ฿{demoSavingExample.offer} / ครั้งนี้
                    </text>
                    <text x="447.5" y="240" textAnchor="middle" fill="#4F8B48" fontSize="8">
                      ยอดรวมทุก Pocket เท่าเดิม
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom 2 Clean Metric Badges */}
            <div className="mt-6 pt-4 border-t border-kt-line grid grid-cols-2 gap-3 text-xs">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center flex flex-col justify-center">
                <span className="text-kt-muted block text-[11px] font-medium">RESERVE BEFORE SAVING</span>
                <strong className="text-amber-900 font-bold">
                  กันเงินสำรองก่อนเสนอออม <br />
                  (บิล + เงินสำรอง + งบระหว่างรอรับเงิน)
                </strong>
              </div>
              <div className="bg-kt-sage border border-kt-tint rounded-xl p-2.5 text-center flex flex-col justify-center">
                <span className="text-kt-muted block text-[11px] font-medium">Pocket Allocation</span>
                <strong className="text-kt-leaf-strong font-bold">
                  เลือก Pocket และยืนยันเอง <br />
                  (ไม่มีการหักเงินอัตโนมัติ)
                </strong>
              </div>
            </div>
            <div className="mt-2 text-right">
              <span className="text-[10px] text-kt-muted font-normal">*เงินสำรอง ฿{formatDemoAmount(demoFinance.hardFloor)} และกติกาชวนเก็บ {demoFinance.sweepMinRate * 100}–{demoFinance.sweepMaxRate * 100}% ของยอดใช้ได้วันนี้ ไม่เกิน ฿{formatDemoAmount(demoFinance.sweepCap)} ต่อครั้ง เป็นค่าทดลองของทีม การยกเลิกใน 24 ชั่วโมงเป็นแนวคิดที่ยังไม่มีในเดโม</span>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* SEPARATE COLLAPSIBLE: Technical Architecture Details */}
        {/* ========================================================= */}
        <div className="mt-10 max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => setShowTechDetails(!showTechDetails)}
            aria-expanded={showTechDetails}
            aria-controls={showTechDetails ? 'technical-details' : undefined}
            className="w-full bg-kt-paper hover:bg-kt-sage border border-kt-line rounded-2xl p-4 text-xs sm:text-sm font-bold text-kt-ink flex items-center justify-between shadow-sm transition-all"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-kt-leaf-strong" />
              <span>ข้อมูล โมเดล และหลักการทำงาน</span>
            </span>
            <span className="flex items-center gap-1 text-kt-muted text-xs font-normal">
              {showTechDetails ? 'ย่อรายละเอียด' : 'ขยายดูรายละเอียด'}
              {showTechDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {/* Collapsible Content */}
          {showTechDetails && (
            <div id="technical-details" className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-kt-paper border border-kt-line rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-kt-leaf-strong mb-1 uppercase tracking-wide">
                  1. Data & Model
                </div>
                <h4 className="text-sm font-bold text-kt-ink mb-1">
                  ML พยากรณ์ · Monte Carlo ประเมินความเสี่ยง
                </h4>
                <p className="text-xs text-kt-muted leading-relaxed">
                  แนวคิดระบบใช้ข้อมูล 3 ส่วน: ยอดเงินและธุรกรรม บิลและภาระผ่อน ประวัติรายรับ พร้อมให้เติมเงินรอรับได้ตามสมัครใจ โดยไม่นับเป็นยอดเงินในบัญชี
                </p>
                <p className="mt-2 text-xs text-kt-muted leading-relaxed">ML ช่วยพยากรณ์รายจ่าย บิลประจำ และโอกาสเงินเข้าช้า จากนั้น Monte Carlo จำลองเงินเข้า–ออกหลายพันสถานการณ์ใน {demoFinance.daysIncludingToday} วัน เพื่อหางบที่สอดคล้องกับระดับความเสี่ยง ทั้งสองส่วนยังต้องทดสอบกับข้อมูลจริง</p>
              </div>

              <div className="bg-kt-paper border border-kt-line rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-amber-800 mb-1 uppercase tracking-wide">
                  2. Saving Guardrails
                </div>
                <h4 className="text-sm font-bold text-kt-ink mb-1">
                  ออมได้ โดยยังมีเงินพร้อมใช้
                </h4>
                <p className="text-xs text-kt-muted leading-relaxed">
                  เสนอออมจากส่วนที่ใช้ไม่ถึงงบ หลังกันบิล เงินสำรอง และงบระหว่างรอรับเงิน ชวนเก็บ {demoFinance.sweepMinRate * 100}–{demoFinance.sweepMaxRate * 100}% ของยอดใช้ได้วันนี้ ไม่เกิน ฿{formatDemoAmount(demoFinance.sweepCap)} ต่อครั้ง และเหลือเงินสำรองอย่างน้อย ฿{formatDemoAmount(demoFinance.hardFloor)} ตามค่าทดลองของทีม เลือก Pocket และยืนยันก่อนย้ายทุกครั้ง
                </p>
              </div>

              <div className="bg-kt-paper border border-kt-line rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-kt-leaf-strong mb-1 uppercase tracking-wide">
                  3. Virtual Accumulation
                </div>
                <h4 className="text-sm font-bold text-kt-ink mb-1">
                  เงินสะสม ไม่เพิ่มงบให้ใช้เอง
                </h4>
                <p className="text-xs text-kt-muted leading-relaxed">
                  เงินสะสมเป็นยอดที่ติดตามในบัญชีหลัก ไม่ใช่เงินเพิ่ม ลดตามยอดที่ออมแล้ว และใช้รองรับวันที่เกินงบก่อนเกลี่ยส่วนที่ขาด โดยไม่ดึงเงินจาก Pocket ออม แนวคิดสิ้นรอบให้เลือกเก็บหรือยกยอดต่อ ยังไม่อยู่ในเดโม
                </p>
              </div>

              <div className="bg-kt-paper border border-kt-line rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-amber-800 mb-1 uppercase tracking-wide">
                  4. Consent by Design
                </div>
                <h4 className="text-sm font-bold text-kt-ink mb-1">
                  รู้ขอบเขตข้อมูล คุณเลือกให้ใช้ได้
                </h4>
                <p className="text-xs text-kt-muted leading-relaxed">
                  แนวทางระบบจริงจะแจ้งประเภทข้อมูลและวัตถุประสงค์ก่อนขอความยินยอม ผู้ใช้ใหม่เริ่มจากคำถามสั้น ๆ 4 ข้อ ส่วนเงินและภาระจากช่องทางอื่นต้องให้ผู้ใช้ช่วยยืนยัน เพื่อไม่ให้แผนประเมินจากข้อมูลเพียงบางส่วน
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
