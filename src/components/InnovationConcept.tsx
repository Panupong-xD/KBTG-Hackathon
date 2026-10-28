'use client';

import { ArrowRight } from 'lucide-react';

export default function InnovationConcept() {
  return (
    <section id="concept" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* INNOVATION CONCEPT · K-RUNWAY Card */}
        <div className="rounded-3xl bg-[#00A950] text-white p-8 sm:p-14 text-center shadow-xl shadow-emerald-700/20">
          
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-4 py-1.5 rounded-full mb-4">
            INNOVATION CONCEPT · K-RUNWAY
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            ให้เงินพอถึงก้อนถัดไป<br />
            ให้เงินเหลือไปถึงเป้าหมาย
          </h2>

          <p className="mt-4 text-emerald-50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            เพิ่มมุมมอง “วันนี้ใช้ได้เท่าไหร่” ให้การจัดการเงินในแอปธนาคาร คิดเผื่อวันที่เงินเข้าช้า ช่วยวางแผนก่อนต้องดึงเงินเก็บมาใช้ และเติมเงินออมจากส่วนที่ใช้ไม่ถึงงบ
          </p>

          {/* Action Buttons (Restored without Early Prototype) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#how-it-works"
              className="w-full sm:w-auto bg-white text-[#008744] hover:bg-emerald-50 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>ลองใช้ K-Runway</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#features"
              className="w-full sm:w-auto border border-white/40 hover:bg-white/10 text-white px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all"
            >
              ดูเบื้องหลังไอเดีย
            </a>
          </div>

          <p className="mt-6 text-emerald-50 text-xs leading-relaxed max-w-2xl mx-auto">เป้าหมายที่ต้องทดสอบต่อ: ผู้ใช้มีเงินพอระหว่างรอรับเงินและเก็บออมได้ต่อเนื่องขึ้น ส่วนแอปธนาคารมีโอกาสเพิ่มการใช้งานและการออมใน Pocket จากบริการที่ช่วยผู้ใช้วางแผนได้ทุกวัน</p>

          <p className="mt-6 text-emerald-50 text-xs leading-relaxed max-w-2xl mx-auto">
            ทำไมต้องเตือนก่อน? งานวิจัย FCA ในอังกฤษพบว่า การสมัครแจ้งเตือนให้อัตโนมัติลดค่าธรรมเนียมเบิกเกินบัญชีแบบไม่มีวงเงินได้ 25%*
            {' '}<a className="underline" href="https://www.fca.org.uk/publication/occasional-papers/occasional-paper-36.pdf" target="_blank" rel="noopener noreferrer">FCA Paper 36 (2018)</a> · *ผลวิจัยต่างประเทศ ไม่ใช่ผลของ K-Runway
          </p>
          {/* Protection Subtext */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100">
            <span>• ยอดใช้ได้วันนี้ + โอกาสเงินพอ</span>
            <span>• เตือนเมื่อความเสี่ยงเพิ่ม</span>
            <span>• ออมเข้า Pocket</span>
            <span>• ทุกการออม คุณยืนยันเอง</span>
          </div>

        </div>

      </div>
    </section>
  );
}
