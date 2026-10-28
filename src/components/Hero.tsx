import { ArrowDown, ArrowRight, Clock, Bell, Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-white border-b border-emerald-100 overflow-hidden">
      {/* Background Subtle Green Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none -z-10">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#00A950]/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-emerald-200/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Tagline Badge for Data Science Track & First Jobbers */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#008744] border border-emerald-200 mb-6 shadow-xs">
            <span>AI Cash-Flow Intelligence for First Jobbers</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight max-w-5xl leading-[1.22] sm:leading-[1.18]">
            <span className="inline-block">เงินยังไม่เข้า </span><span className="inline-block">แต่ค่าใช้จ่ายไม่เคยรอ</span> <br className="hidden sm:inline" />
            <span className="inline-block">รู้ว่าวันนี้ใช้ได้เท่าไหร่</span> <br className="hidden sm:inline" />
            <span className="text-[#00A950] inline-block">ให้เงินพอถึงก้อนถัดไป</span>
          </h1>

          {/* Sub-headline tailored to First Jobbers */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            <strong className="text-slate-900 font-bold">K-Runway</strong> แนวคิดผู้ช่วยการเงิน AI ในแอปธนาคาร สำหรับ First Jobber ที่รายได้ไม่แน่นอน แนะนำ <strong className="text-slate-900 font-bold">ยอดใช้ได้วันนี้และโอกาสเงินพอ</strong> คิดเผื่อบิลและเงินเข้าช้า พร้อมชวนเก็บเงินที่ใช้ไม่ถึงงบเข้ากระเป๋าเงินเก็บ <span className="whitespace-nowrap">(Pocket)</span> ที่คุณเลือก
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="#how-it-works"
              className="w-full sm:w-auto demo-btn px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all"
            >
              <span>ลองใช้เดโม 2 ขั้นตอน</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#problem"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 font-bold text-sm sm:text-base border border-emerald-200 flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>ทำไมยอดเงินอย่างเดียวไม่พอ</span>
              <ArrowRight className="w-4 h-4 text-[#00A950]" />
            </a>
          </div>

          {/* Metric Badges แนวนอน */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl text-left">
            
            <div className="bg-white border-2 border-emerald-100 hover:border-[#00A950] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#00A950] border border-emerald-200 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">รู้ก่อนเงินตึง</div>
                <div className="text-xs text-slate-500 mt-0.5">เห็นยอดใช้ได้วันนี้ คิดเผื่อวันที่เงินเข้าช้า</div>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-100 hover:border-[#00A950] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">เตือนถูกจังหวะ</div>
                <div className="text-xs text-slate-500 mt-0.5">เตือนเมื่อเสี่ยงขึ้น พร้อมงบที่ปรับตามสถานการณ์</div>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-100 hover:border-[#00A950] rounded-2xl p-4 shadow-sm flex items-center gap-3.5 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">เงินเหลือมีเป้าหมาย</div>
                <div className="text-xs text-slate-500 mt-0.5">เก็บเข้า Pocket หรือสะสมไว้ คุณเลือกเอง</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
