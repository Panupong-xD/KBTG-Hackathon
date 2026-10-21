'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu } from 'lucide-react';

export default function FeatureDeepDive() {
  const [showTechDetails, setShowTechDetails] = useState<boolean>(false);

  return (
    <section id="features" className="py-20 bg-slate-50/50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold text-[#00A950] bg-[#00A950]/10 px-3.5 py-1 rounded-full mb-3 tracking-wider uppercase border border-[#00A950]/20">
            THE IDEA BEHIND K-RUNWAY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            คิดเผื่อเงินตึง เปิดทางให้เงินเก็บ
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            ต่อยอดข้อมูลธุรกรรมให้ช่วยตัดสินใจก่อนเงินขาด และต่อยอด K-ePocket ให้เก็บเงินได้ถูกจังหวะ
          </p>
        </div>

        {/* 2 Architecture Cards with Meaningful Visual Shapes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* ========================================================= */}
          {/* PILLAR 1: The Runway & Glide Slope (Aeronautical Metaphor) */}
          {/* ========================================================= */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#008744] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  01 · PREDICT BEFORE YOU SPEND
                </span>
                <span className="text-xs font-medium text-slate-400">Runway Intelligence</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
                Runway Intelligence · เห็นก่อน ปรับทัน
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
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
                        <stop offset="0%" stopColor="#00A950" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#00A950" stopOpacity="0.01" />
                      </linearGradient>
                      {/* Runway Danger Zone Gradient */}
                      <linearGradient id="runwayDangerZone" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.18" />
                      </linearGradient>
                    </defs>

                    {/* Top Legend */}
                    <line x1="45" y1="22" x2="62" y2="22" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 2" />
                    <text x="68" y="26" fill="#64748B" fontSize="10.5" fontWeight="600">
                      ก่อนปรับแผน
                    </text>
                    <line x1="220" y1="22" x2="238" y2="22" stroke="#00A950" strokeWidth="3" strokeLinecap="round" />
                    <text x="244" y="26" fill="#0F172A" fontSize="10.5" fontWeight="700">
                      เมื่อปรับงบ
                    </text>
                    <text x="500" y="26" textAnchor="end" fill="#94A3B8" fontSize="10">
                      Concept Illustration*
                    </text>

                    {/* Altitude Radar Horizon Grid Lines */}
                    <line x1="40" y1="52" x2="500" y2="52" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="35" y="55" textAnchor="end" fill="#94A3B8" fontSize="8.5">฿9k</text>

                    <line x1="40" y1="86" x2="500" y2="86" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="35" y="89" textAnchor="end" fill="#94A3B8" fontSize="8.5">฿5.5k</text>

                    <line x1="40" y1="140" x2="500" y2="140" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="35" y="143" textAnchor="end" fill="#94A3B8" fontSize="8.5">฿3k</text>

                    <line x1="40" y1="190" x2="500" y2="190" stroke="#FCA5A5" strokeWidth="1.2" strokeDasharray="4 4" />
                    <text x="35" y="193" textAnchor="end" fill="#EF4444" fontSize="8.5" fontWeight="bold">฿1k</text>

                    {/* Danger Zone Floor (Below ฿1,000) */}
                    <rect x="40" y="190" width="460" height="50" rx="8" fill="url(#runwayDangerZone)" />
                    <text x="48" y="218" fill="#DC2626" fontSize="10" fontWeight="bold" letterSpacing="0.4">
                      DANGER ZONE : ยอดคงเหลือต่ำกว่า ฿1,000
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

                    {/* AI Controlled Glide Path (Solid KBank Green Curve, passing ฿15k at Day 12) */}
                    <path
                      d="M 45 52 C 175 75, 300 115, 475 165"
                      fill="none"
                      stroke="#00A950"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* AI Safe-to-Spend Floating Badge */}
                    <rect x="175" y="68" width="152" height="26" rx="13" fill="#00A950" filter="drop-shadow(0 2px 4px rgba(0,169,80,0.25))" />
                    <text x="251" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                      Safe-to-Spend : ฿280 / วัน
                    </text>

                    {/* Payday Safe Touchdown (Day 30) */}
                    <circle cx="475" cy="165" r="6" fill="#00A950" stroke="#FFFFFF" strokeWidth="2" />
                    <rect x="405" y="122" width="95" height="26" rx="6" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1" />
                    <text x="452" y="139" textAnchor="middle" fill="#065F46" fontSize="10.5" fontWeight="bold">
                      มอง 30 วัน
                    </text>

                    {/* Timeline Milestones */}
                    <text x="45" y="262" textAnchor="start" fill="#64748B" fontSize="10" fontWeight="bold">
                      วันนี้
                    </text>
                    <text x="195" y="262" textAnchor="middle" fill="#94A3B8" fontSize="10">
                      คาดเงินเข้า
                    </text>
                    <text x="330" y="262" textAnchor="middle" fill="#DC2626" fontSize="10" fontWeight="bold">
                      ถ้าเงินเข้าช้า
                    </text>
                    <text x="500" y="262" textAnchor="end" fill="#008744" fontSize="10" fontWeight="bold">
                      ครบ 30 วัน
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom 2 Clean Metric Badges */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-2.5 text-center">
                <span className="text-slate-500 block text-[11px] font-medium">ก่อนปรับแผน</span>
                <strong className="text-rose-700 font-bold">เงินเข้าช้า อาจเริ่มแตะเงินสำรอง</strong>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5 text-center">
                <span className="text-slate-500 block text-[11px] font-medium">เมื่อปรับงบ</span>
                <strong className="text-[#008744] font-bold">โอกาสเงินพอ 30 วัน 87%*</strong>
              </div>
            </div>
            <div className="mt-2 text-right">
              <span className="text-[10px] text-slate-400 font-normal">*กราฟและ 87% เป็นตัวอย่างประกอบแนวคิด ไม่ใช่ผลโมเดลจริงหรือการรับประกัน</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PILLAR 2: UI Wallet Container to Bank Safe Vault          */}
          {/* ========================================================= */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  02 · SAVE ON YOUR TERMS
                </span>
                <span className="text-xs font-medium text-slate-400">Pocket Co-pilot</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
                Pocket Co-pilot · เงินเหลือมีเป้าหมาย
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                ใช้ต่ำกว่างบ ฿50? เปลี่ยนเป็นเงินเก็บใน K-ePocket ที่คุณเลือก หรือสะสมไว้ก่อน ทุกการออมเริ่มจากคุณยืนยัน
              </p>

              {/* Stage: Clean Symbolic Vector Infographic (Wallet ➔ Smart Sweep ➔ Locked Vault) */}
              <div className="w-full flex items-center justify-center my-auto py-2">
                <div className="w-full max-w-[580px]">
                  <svg viewBox="0 0 560 280" className="w-full h-auto drop-shadow-xs select-none">
                    <defs>
                      <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 1 L 8 5 L 0 9 z" fill="#00A950" />
                      </marker>
                      <marker id="arrowBlue" viewBox="0 0 10 10" refX="4" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 10 1 L 2 5 L 10 9 z" fill="#3B82F6" />
                      </marker>
                    </defs>

                    {/* Top Legend / Header Bar */}
                    <text x="22" y="22" fill="#0F172A" fontSize="11" fontWeight="bold">
                      K-ePocket : กระเป๋าหลัก
                    </text>
                    
                    <text x="280" y="22" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontWeight="bold" letterSpacing="0.4">
                      USER CONFIRMED
                    </text>

                    <text x="360" y="22" fill="#0F172A" fontSize="11" fontWeight="bold">
                      Pocket ที่คุณเลือก
                    </text>

                    {/* ========================================================= */}
                    {/* LEFT CONTAINER: K+ Checking Wallet                        */}
                    {/* ========================================================= */}
                    <rect x="20" y="36" width="185" height="232" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                    <text x="34" y="54" fill="#64748B" fontSize="9" fontWeight="bold" letterSpacing="0.4">
                      DAILY BUDGET & RESERVE
                    </text>

                    {/* Tier 1: Micro-Surplus (Outflow) */}
                    <rect x="30" y="66" width="165" height="48" rx="10" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
                    <text x="42" y="86" fill="#065F46" fontSize="10" fontWeight="bold">Micro-Surplus</text>
                    <text x="183" y="87" textAnchor="end" fill="#008744" fontSize="13" fontWeight="900">+฿50</text>
                    <text x="42" y="102" fill="#059669" fontSize="8">เงินเหลือหลังใช้ ฿230</text>

                    {/* Tier 2: Daily Budget (Operating) */}
                    <rect x="30" y="126" width="165" height="48" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                    <text x="42" y="146" fill="#334155" fontSize="10" fontWeight="bold">Daily Budget</text>
                    <text x="183" y="147" textAnchor="end" fill="#0F172A" fontSize="13" fontWeight="900">฿280</text>
                    <text x="42" y="162" fill="#64748B" fontSize="8">งบต้นวัน รวมส่วนที่เหลือ ฿50</text>

                    {/* Tier 3: Hard Floor Shield (Protection) */}
                    <rect x="30" y="186" width="165" height="68" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
                    <text x="42" y="208" fill="#1E40AF" fontSize="10" fontWeight="bold">Hard Floor</text>
                    <text x="183" y="209" textAnchor="end" fill="#1D4ED8" fontSize="13" fontWeight="900">฿1,000</text>
                    <text x="42" y="226" fill="#3B82F6" fontSize="8">เงินก้นบัญชี (กันชนฉุกเฉิน)</text>
                    <text x="42" y="240" fill="#60A5FA" fontSize="7.5">ตรวจงบวันถัดไปก่อนย้ายเงิน</text>

                    {/* ========================================================= */}
                    {/* CENTER BRIDGE: Transfer Streams                           */}
                    {/* ========================================================= */}
                    {/* Top Stream: Smart Sweep Arrow */}
                    <path d="M 205 90 L 228 90" fill="none" stroke="#00A950" strokeWidth="2" strokeDasharray="3 2" />
                    <rect x="228" y="76" width="104" height="28" rx="14" fill="#00A950" filter="drop-shadow(0 2px 4px rgba(0,169,80,0.22))" />
                    <text x="280" y="90" dominantBaseline="central" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="bold">
                      ยืนยัน ฿50 ➔
                    </text>
                    <path d="M 332 90 L 350 90" fill="none" stroke="#00A950" strokeWidth="2" markerEnd="url(#arrowGreen)" />

                    {/* Bottom Stream: ย้ายกลับเอง* Arrow */}
                    <path d="M 355 220 L 336 220" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2" />
                    <rect x="224" y="206" width="112" height="28" rx="14" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1" />
                    
                    {/* Clean SVG Vector Return Arrow Icon inside pill (Perfect vertical & horizontal alignment) */}
                    <g transform="translate(241, 220)">
                      <path 
                        d="M 4.2 0.8 C 4.2 -2 2.5 -4.2 0 -4.2 C -2.5 -4.2 -4.2 -2 -4.2 0.8 L -4.2 3.8 M -2 1.6 L -4.2 4.2 L -6.4 1.6" 
                        fill="none" 
                        stroke="#1D4ED8" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </g>
                    <text x="288" y="220" dominantBaseline="central" textAnchor="middle" fill="#1D4ED8" fontSize="10" fontWeight="bold">
                      ย้ายกลับเอง*
                    </text>
                    <path d="M 224 220 L 210 220" fill="none" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowBlue)" />

                    {/* ========================================================= */}
                    {/* RIGHT CONTAINER: selected Pocket within K-ePocket        */}
                    {/* ========================================================= */}
                    <rect x="355" y="36" width="185" height="232" rx="16" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.5" />
                    <text x="447.5" y="54" textAnchor="middle" fill="#008744" fontSize="9" fontWeight="bold" letterSpacing="0.4">
                      YOUR POCKET, YOUR CHOICE
                    </text>

                    {/* The Symbolic Padlock (Refined & Compact with clear 20px+ spacing) */}
                    {/* Shackle */}
                    <path d="M 439 85 A 8.5 8.5 0 0 1 456 85 V 93 H 439 Z" fill="none" stroke="#00A950" strokeWidth="2.8" strokeLinecap="round" />
                    {/* Lock Body */}
                    <rect x="429.5" y="93" width="36" height="26" rx="7" fill="#00A950" filter="drop-shadow(0 2px 4px rgba(0,169,80,0.22))" />
                    {/* Keyhole */}
                    <circle cx="447.5" cy="103" r="2.4" fill="#FFFFFF" />
                    <path d="M 446.3 104 L 448.7 104 L 449.5 111 L 445.5 111 Z" fill="#FFFFFF" />

                    {/* High-Yield Rate */}
                    <text x="447.5" y="145" textAnchor="middle" fill="#0F172A" fontSize="18" fontWeight="900" letterSpacing="-0.5">
                      เลือกเอง
                    </text>
                    <text x="447.5" y="159" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="bold" letterSpacing="0.5">
                      K-ePocket · POCKET
                    </text>

                    {/* Accumulated Reserve Box */}
                    <rect x="367" y="180" width="161" height="74" rx="12" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1" />
                    <text x="447.5" y="202" textAnchor="middle" fill="#065F46" fontSize="9" fontWeight="600">
                      เงินที่จัดสรรจากวันนี้
                    </text>
                    <text x="447.5" y="224" textAnchor="middle" fill="#064E3B" fontSize="14" fontWeight="900">
                      ฿50 / ครั้งนี้
                    </text>
                    <text x="447.5" y="240" textAnchor="middle" fill="#059669" fontSize="8">
                      ยอดรวมทุก Pocket เท่าเดิม
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom 2 Clean Metric Badges */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5 text-center flex flex-col justify-center">
                <span className="text-slate-500 block text-[11px] font-medium">RESERVE BEFORE SAVING</span>
                <strong className="text-blue-800 font-bold">
                  กันเงินสำรองก่อนเสนอออม <br />
                  (บิล + เงินสำรอง + งบวันถัดไป)
                </strong>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5 text-center flex flex-col justify-center">
                <span className="text-slate-500 block text-[11px] font-medium">K-ePocket Allocation</span>
                <strong className="text-[#008744] font-bold">
                  เลือก Pocket และยืนยันเอง <br />
                  (ไม่มีการหักเงินอัตโนมัติ)
                </strong>
              </div>
            </div>
            <div className="mt-2 text-right">
              <span className="text-[10px] text-slate-400 font-normal">*เงินสำรอง ฿1,000 และเพดาน ฿150 เป็นค่าตัวอย่าง; การย้ายกลับเป็นแนวคิดต่อยอด ยังไม่มีในเดโม</span>
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
            className="w-full bg-white hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl p-4 text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-between shadow-sm transition-all"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00A950]" />
              <span>เบื้องหลังไอเดีย: AI คิดและกันความเสี่ยงอย่างไร</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400 text-xs font-normal">
              {showTechDetails ? 'ย่อรายละเอียด' : 'ขยายดูรายละเอียด'}
              {showTechDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {/* Collapsible Content */}
          {showTechDetails && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-[#00A950] mb-1 uppercase tracking-wide">
                  1. Predictive Time-Series
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Monte Carlo & Smooth Re-balancing
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  พยากรณ์ยอดและจังหวะเงินเข้า–ออก แล้วใช้ Monte Carlo ประเมินหลายสถานการณ์ใน 30 วัน เพื่อแนะนำงบที่สอดคล้องกับความเสี่ยง หากรายรับเลื่อน แนวคิดระบบจะปรับงบและเตือนให้ทัน
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wide">
                  2. Micro-Surplus Detection
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  End-of-Day Surplus & Pocket Selection
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  เสนอเฉพาะเงินเหลือที่ไม่แตะบิล เงินสำรอง และงบวันถัดไป จำกัด ฿150/ครั้ง ให้เลือก Pocket และยืนยันก่อนย้ายทุกครั้ง แนวคิดย้ายกลับก็ต้องให้ผู้ใช้ยืนยันเอง
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-emerald-700 mb-1 uppercase tracking-wide">
                  3. Anti-Feedback Loop
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  เงินสะสม ไม่เพิ่มงบให้ใช้เอง
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  แยกเงินสะสมออกจากงบวันนี้ ลดเงินสะสมตามยอดที่ออมแล้ว และใช้ชดเชยวันที่เกินงบก่อนเกลี่ยส่วนที่ขาด แนวคิดสิ้นรอบเปิดให้เลือกเก็บเข้า K-ePocket หรือยกยอดต่อ ยังไม่อยู่ในเดโม
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wide">
                  4. Consent by Design
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  PDPA & Bounded Consent
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  แนวทางระบบจริงให้ผู้ใช้ตั้งเพดานและเงื่อนไขได้ รวมถึงปิดคำแนะนำหรือถอนความยินยอม เดโมแสดงการเลือก Pocket และยืนยันยอด โดยยังไม่มีหน้าตั้งค่าเงื่อนไข
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
