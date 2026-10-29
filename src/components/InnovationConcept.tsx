import { ArrowRight } from 'lucide-react';
import Mascot from './Mascot';

const outcomes = ['ยอดใช้ได้วันนี้ + โอกาสเงินพอ', 'เตือนเมื่อความเสี่ยงเพิ่ม', 'ออมเข้า Pocket', 'ทุกการออม คุณยืนยันเอง'];

export default function InnovationConcept() {
  return (
    <section id="concept" className="py-20 sm:py-24 bg-kt-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-kt-deep text-kt-paper px-6 py-10 sm:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-32 w-[420px] h-[420px] rounded-full bg-kt-leaf/25" />

          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="text-center lg:text-left">
              <span className="font-brand text-lg text-kt-tint">Innovation concept · กะตังค์</span>
              <h2 className="mt-3 text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.3]">
                ให้เงินพอถึงก้อนถัดไป<br />
                ให้เงินเหลือไปถึงเป้าหมาย
              </h2>
              <p className="mt-4 text-kt-tint text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                เพิ่มมุมมอง “วันนี้ใช้ได้เท่าไหร่” ให้การจัดการเงินในแอปธนาคาร คิดเผื่อวันที่เงินเข้าช้า ช่วยวางแผนก่อนต้องดึงเงินเก็บมาใช้ และเติมเงินออมจากส่วนที่ใช้ไม่ถึงงบ
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a href="#how-it-works"
                  className="w-full sm:w-auto bg-kt-paper text-kt-deep hover:bg-kt-sage px-7 py-3.5 rounded-full font-semibold text-base transition-colors flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kt-paper">
                  <span>ลองใช้กะตังค์</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#features"
                  className="w-full sm:w-auto border border-kt-tint/50 hover:bg-white/10 text-kt-paper px-6 py-3.5 rounded-full font-semibold text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kt-paper">
                  ดูเบื้องหลังไอเดีย
                </a>
              </div>
            </div>

            <Mascot pose="happy" width={240} alt="น้องตังค์กระโดดดีใจ" className="kt-float mx-auto w-[180px] sm:w-[240px] h-auto" />
          </div>

          <ul className="relative mt-10 flex flex-wrap justify-center lg:justify-start gap-2">
            {outcomes.map(item => <li key={item} className="px-3.5 py-1.5 rounded-full bg-white/10 text-sm text-kt-paper">{item}</li>)}
          </ul>

          <div className="relative mt-8 pt-6 border-t border-white/15 grid gap-3 text-xs text-kt-tint leading-relaxed">
            <p>เป้าหมายที่ต้องทดสอบต่อ: ผู้ใช้มีเงินพอระหว่างรอรับเงินและเก็บออมได้ต่อเนื่องขึ้น ส่วนแอปธนาคารมีโอกาสเพิ่มการใช้งานและการออมใน Pocket จากบริการที่ช่วยผู้ใช้วางแผนได้ทุกวัน</p>
            <p>
              ทำไมต้องเตือนก่อน? งานวิจัย FCA ในอังกฤษพบว่า การสมัครแจ้งเตือนให้อัตโนมัติลดค่าธรรมเนียมเบิกเกินบัญชีแบบไม่มีวงเงินได้ 25%*
              {' '}<a className="underline text-kt-paper" href="https://www.fca.org.uk/publication/occasional-papers/occasional-paper-36.pdf" target="_blank" rel="noopener noreferrer">FCA Paper 36 (2018)</a> · *ผลวิจัยต่างประเทศ ไม่ใช่ผลของกะตังค์
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
