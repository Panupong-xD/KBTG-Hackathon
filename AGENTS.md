<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# กฎของทีมสำหรับ AI ทุกตัว (Claude, Codex ฯลฯ)

ไฟล์นี้เป็นแหล่งกฎหลักไฟล์เดียวของทีม Codex อ่านไฟล์นี้โดยตรง ส่วน Claude อ่านผ่าน `CLAUDE.md` ที่ import ไฟล์นี้ แก้กฎที่นี่ที่เดียว และเขียนนอก marker `nextjs-agent-rules` ด้านบนเท่านั้น (`next dev` เขียนทับเฉพาะส่วนใน marker)

## โปรเจกต์นี้คืออะไร

เว็บเดโมแนวคิดฟีเจอร์ผู้ช่วยการเงินในแอปธนาคาร สำหรับ First Jobber ที่รายได้ไม่แน่นอน: แนะนำ "ยอดใช้ได้วันนี้" และโอกาสเงินพอ แล้วชวนออมเข้า Pocket ที่ผู้ใช้เลือกเอง

- ชื่อบนเว็บตอนนี้คือ **กะตังค์ (KaTang)** ส่วน README, `docs/` และแพ็กเกจ `ml/krunway` ยังใช้ชื่อเดิม **K-Runway** (เป็นสิ่งเดียวกัน)
- เดโมเป็น browser-only: ไม่มี AI API, banking API หรือฐานข้อมูล ตัวเลขทั้งหมดเป็น fixture ใน `src/lib/pocket-saving.ts` และรีเซ็ตเมื่อรีโหลด
- ขอบเขตปัจจุบันและเหตุผลหลังคุย mentor: `docs/03_CURRENT_PRODUCT_DIRECTION.md` (ใหม่กว่า `docs/01`, `docs/02` เมื่อขัดกัน)
- ความปลอดภัยและ access gate: `docs/04_SECURITY_REVIEW.md`
- ฝั่ง ML/Monte Carlo (Python, ข้อมูลจำลอง): `ml/` มีกฎเพิ่มใน `ml/AGENTS.md`

## โครงสร้าง

- `src/app/` หน้าเว็บ (App Router), `src/app/team-access/` login/logout ของทีม, `src/proxy.ts` ปิดเว็บ production จนถึงเวลาเปิด
- `src/components/` คอมโพเนนต์ (CSS Modules + Tailwind v4), `src/data/` เนื้อหา scrollytelling/สรุปรอบ
- `src/lib/pocket-saving.ts` fixture และ reducer การออม, `src/lib/demo-*.ts|mjs` access gate และเวลาเปิดเว็บ
- `scripts/*.test.mjs` เทสต์ (`node --test`), `scripts/build-css.mjs` สร้าง CSS ก่อน dev/build
- `pitch/` และ `ml/output/` ไม่อยู่ใน git

## คำสั่ง

```bash
npm run dev        # สร้าง CSS แล้วเปิด dev server ที่ http://localhost:3000
npm run check      # typecheck + เทสต์ JS ทั้งหมด (รันก่อนบอกว่างานเสร็จ)
npm run check:ml   # เทสต์ฝั่ง ml/ (ต้องสร้าง ml/.venv ก่อน ดู ml/README.md)
npm run screenshots # ถ่ายภาพ phone mockup ทุกขั้นลง screenshots/ (ต้องเปิด dev server ก่อน)
npm run build      # build production
npm audit --omit=dev
```

ไม่มี lint script ให้ตามสไตล์โค้ดรอบ ๆ แทน

## กฎที่ห้ามพลาด

1. **ห้ามใส่ชื่อหรือโลโก้ของธนาคาร ผู้จัดงาน หรือผลิตภัณฑ์ธนาคารจริง** ในหน้าเว็บ metadata ข้อความแชร์ลิงก์ asset ใน `public/` หรือชื่อคอมโพเนนต์/CSS ให้ใช้คำกลาง เช่น "แอปธนาคาร" "การตั้งงบรายหมวด" "Pocket" (ชื่อเฉพาะใน `docs/` เป็นบันทึกประวัติ ไม่ใช่เนื้อหาบนเว็บ)
2. **ห้ามใส่ข้อมูลลูกค้าจริง คำตอบแบบสำรวจรายคน credential หรือ secret** ลงในซอร์ส `public/` หรือตัวแปร `NEXT_PUBLIC_` repo นี้เป็น public ค่า `DEMO_TEAM_PASSWORD` อยู่ใน environment ของ hosting เท่านั้น ห้ามอ่านหรือพิมพ์ไฟล์ `.env*`
3. **ใช้ตัวอย่างชุดเดียวทั้งเว็บ** และดึงจาก fixture ใน `src/lib/pocket-saving.ts` ไม่ hard-code ซ้ำ: ยอดเปิด ฿9,000 = Pocket หลัก ฿5,500 + บิลที่กันไว้ ฿3,500, เงินรอรับ ฿8,000 ใน 12 วัน (ไม่นับเป็นเงินสด), งบ ฿280/วัน, ใช้จริง ฿250, เหลือ ฿30, สะสมเดิม ฿100, โอกาสเงินพอ 86% ตลอด 30 วัน, เพดานออม ฿150/ครั้ง, เงินสำรอง ฿1,000 ถ้าเปลี่ยนตัวเลขต้องแก้ README และ `docs/03` ให้ตรงกันด้วย
4. **86% เป็นค่าตัวอย่าง ไม่ใช่ผลทำนายของโมเดล** หลังออมหรือใช้เกินงบ ต้องแสดงว่ารอประเมินใหม่ ไม่ใช้เปอร์เซ็นต์เดิม
5. **ผลจาก `ml/` มาจากข้อมูลจำลอง** ห้ามอ้างเป็นความแม่นยำกับผู้ใช้จริง ตัวเลขที่จะใช้ในสไลด์หรือเว็บต้องรันซ้ำได้จากโค้ดใน `ml/`
6. การ์ดปัดบนหน้าแรกมี 2 ขั้นตอนเท่านั้น (ภาพรวมการเงิน → ออม) ห้ามเพิ่มการ์ดที่ 3 หรือ toolbar สลับกรณี ถ้าทีมยังไม่ได้ตัดสินใจ หน้าปรับแต่งและสรุปบัญชีในการเงินของฉันทีมตัดสินใจเพิ่มแล้ว (ดู `docs/03`)
7. ข้อความบนเว็บเป็นภาษาไทยที่ตรงและเป็นธรรมชาติสำหรับ First Jobber เช่น "ยอดใช้ได้วันนี้" "เงินสำรอง"

## Git

- ห้าม commit, push หรือ merge branch ใด ๆ (รวมถึงดึง `origin/main` เข้า branch อื่น) จนกว่าคนในทีมจะสั่งชัด ๆ "อัปเดตโค้ด" ไม่ได้แปลว่าให้ merge
- ถ้ามี commit ใหม่ที่ยังไม่ได้ดึงจาก remote ให้แจ้งแทนการ merge เอง

## ก่อนบอกว่างานเสร็จ

1. `npm run check` ผ่าน (และ `npm run check:ml` ถ้าแก้ `ml/`)
2. ถ้าแก้ UI ให้เปิด `npm run dev` ดูหน้าจริง ทั้งจอกว้างและจอมือถือ
3. ไล่ diff ตามกฎข้อ 1–3 ด้านบน: ไม่มีชื่อแบรนด์จริง ไม่มี secret และตัวเลขตัวอย่างตรงกับ fixture
