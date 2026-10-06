# Artwork Guideline

คู่มือขนาดรูปสำหรับทีม artwork / content ของเว็บไซต์ Drema  
อ้างอิงจากขนาดที่หน้าเว็บใช้งานจริง และจากคำแนะนำที่ถูกใส่ไว้ใน Sanity Studio

## เช็กเร็ว: รูปไหนต้องแยก Desktop / Mobile

| พื้นที่ใช้งาน | ต้องแยก Desktop / Mobile | Studio field | หมายเหตุ |
| --- | --- | --- |
| Author hero | ใช่ | `People > Hero Image Desktop`, `People > Hero Image Mobile` | ใช้คนละ crop ระหว่าง desktop กับ mobile |
| Promotions hero | ใช่ | `Promotions Page > Hero Image Desktop`, `Promotions Page > Hero Image Mobile` | hero โปรใช้ portrait crop ไม่เท่ากัน |
| Aesthetic Treatments hero | ใช่ | `Aesthetic Treatments Page > Hero Image Desktop`, `Aesthetic Treatments Page > Hero Image Mobile` | desktop กว้างกว่า mobile ชัดเจน |
| Service page hero | ใช่ | `Service Pages > Hero Image Desktop`, `Service Pages > Hero Image Mobile` | แนะนำทำ 2 ไฟล์ |
| Contact hero | ใช่ | `Contact section > Hero Image Desktop`, `Contact section > Hero Image Mobile` | desktop เหมาะกับ lifestyle/interior กว้างกว่า |
| Promotion item image | ไม่ต้อง | `Promotion Items > Promotion Image` | ใช้รูปเดียว สัดส่วน 6:7 |
| Doctor profile image | ไม่ต้อง | `People > Picture` | ใช้รูปเดียว สัดส่วน 6:7 |
| Certificate image | ไม่ต้อง | `People > Certifications > Certificate Image` | ใช้รูปเดียว สัดส่วน 4:3 |
| Blog card / article thumbnail | ไม่ต้อง | `Posts > Cover Image` | ใช้รูปเดียว |
| Review card | ไม่ต้อง | `Reviews` image field ที่ใช้ในแต่ละรายการ | ใช้รูปเดียว |
| Gallery / content image ทั่วไป | ไม่ต้อง | field รูปใน section หรือ document นั้น ๆ | ใช้รูปเดียว |

## สรุปสำหรับทีม artwork

- ถ้าเป็น `hero หลัก` ให้เช็กก่อนว่า field มี `Desktop` และ `Mobile` หรือไม่
- ถ้าเป็น `card`, `certificate`, `post thumbnail`, `gallery` ให้ใช้รูปเดียวตามสัดส่วนที่กำหนด
- ถ้า artwork มีข้อความในภาพ ควรทำ Desktop / Mobile แยก แม้หน้าจะรองรับรูปเดียวได้

## หลักการใช้งาน

- Hero image ที่สำคัญ ใช้ `Desktop + Mobile` แยกกัน
- รูปทั่วไป เช่น card, post, certificate, gallery ส่วนใหญ่ยังใช้รูปเดียว
- ถ้ารูปมีข้อความอยู่ใน artwork อย่าวางชิดขอบ
- ให้วาง subject หรือจุดสำคัญไว้กลางภาพเสมอ
- ถ้าไม่แน่ใจ ให้ใช้ไฟล์ใหญ่กว่า minimum

## สรุปเร็ว

| ประเภท | สัดส่วน | ขั้นต่ำ | แนะนำ |
| --- | --- | --- | --- |
| Author hero mobile | 6:7 | 1200 x 1400 | 1600 x 1867+ |
| Author hero desktop | 4:5 หรือ 5:6 | 1600 x 2000 | 2000 x 2400+ |
| Promotions hero mobile | 6:7 | 1200 x 1400 | 1600 x 1867+ |
| Promotions hero desktop | 4:5 หรือ 5:6 | 1800 x 2160 | 2200 x 2640+ |
| Aesthetic / Service / Contact hero mobile | 4:5 หรือ 6:7 | 1200 x 1500 | 1600 x 2000+ |
| Aesthetic / Service / Contact hero desktop | 3:2 หรือ 16:10 | 1800 x 1200 | 2400 x 1600+ |
| Promotion card image | 6:7 | 1200 x 1400 | 1500 x 1750+ |
| Doctor profile image | 6:7 | 1200 x 1400 | 1600 x 1867+ |
| Certificate image | 4:3 | 1200 x 900 | 1600 x 1200+ |
| Blog / article card | 3:2 | 1200 x 800 | 1500 x 1000+ |
| Review card | 16:10 | 1200 x 750 | 1600 x 1000+ |
| General gallery / content image | 4:3 หรือ 3:2 | 1200 px ด้านกว้าง | 1600 px ด้านกว้างขึ้นไป |

## แยกตามหน้า

### 1. `/author`

#### Doctor profile image

- ใช้กับรูปโปรไฟล์แพทย์ทั่วไป
- สัดส่วน: `6:7`
- ขั้นต่ำ: `1200 x 1400`
- แนะนำ: `1600 x 1867+`
- ควรวางแพทย์ไว้กึ่งกลาง และเผื่อ safe space รอบภาพ

#### Author hero image

- ใช้เฉพาะ hero ด้านบนของหน้าแพทย์
- ควรแยก `Desktop` และ `Mobile`

Desktop
- สัดส่วน: `4:5` หรือ `5:6`
- ขั้นต่ำ: `1600 x 2000`
- แนะนำ: `2000 x 2400+`
- ต้องเผื่อ headroom และ footroom มากกว่า mobile

Mobile
- สัดส่วน: `6:7`
- ขั้นต่ำ: `1200 x 1400`
- แนะนำ: `1600 x 1867+`
- อย่าวางข้อความสำคัญชิดขอบ

#### Certificate image

- ใช้กับใบประกาศใน section Credentials
- สัดส่วน: `4:3`
- ขั้นต่ำ: `1200 x 900`
- แนะนำ: `1600 x 1200+`
- ปล่อยให้ภาพเต็มกรอบได้ แต่ควรเผื่อขอบเอกสารไว้เพื่อไม่ให้โดนตัดแรงเกินไป

### 2. `/promotions`

#### Promotions hero image

- ใช้เฉพาะ hero ด้านบนของหน้า promotions
- ควรแยก `Desktop` และ `Mobile`

Desktop
- สัดส่วน: `4:5` หรือ `5:6`
- ขั้นต่ำ: `1800 x 2160`
- แนะนำ: `2200 x 2640+`
- เผื่อพื้นที่บนและล่างมากกว่า mobile

Mobile
- สัดส่วน: `6:7`
- ขั้นต่ำ: `1200 x 1400`
- แนะนำ: `1600 x 1867+`
- ให้องค์ประกอบหลักของโปรอยู่กลางภาพ

#### Promotion item image

- ใช้กับ card โปรและ featured promotion
- สัดส่วน: `6:7`
- ขั้นต่ำ: `1200 x 1400`
- แนะนำ: `1500 x 1750+`
- Frontend ใช้กรอบ `6:7` คงที่ จึงควรจัด subject ไว้กลางภาพ
- ถ้ามีข้อความใน artwork อย่าชิดขอบ

### 3. `/aesthetic-treatments`

#### Aesthetic treatments hero

- ควรแยก `Desktop` และ `Mobile`

Desktop
- สัดส่วน: `3:2` หรือ `16:10`
- ขั้นต่ำ: `1800 x 1200`
- แนะนำ: `2400 x 1600+`
- เหมาะกับองค์ประกอบกว้าง เช่น ห้อง, เครื่อง, แพทย์, client scene

Mobile
- สัดส่วน: `4:5` หรือ `6:7`
- ขั้นต่ำ: `1200 x 1500`
- แนะนำ: `1600 x 2000+`

### 4. `/services`

#### Service page hero

- ควรแยก `Desktop` และ `Mobile`

Desktop
- สัดส่วน: `3:2` หรือ `16:10`
- ขั้นต่ำ: `1800 x 1200`
- แนะนำ: `2400 x 1600+`

Mobile
- สัดส่วน: `4:5` หรือ `6:7`
- ขั้นต่ำ: `1200 x 1500`
- แนะนำ: `1600 x 2000+`

### 5. `/contact`

#### Contact hero

- ควรแยก `Desktop` และ `Mobile`

Desktop
- สัดส่วน: `3:2` หรือ `16:10`
- ขั้นต่ำ: `1800 x 1200`
- แนะนำ: `2400 x 1600+`
- ใช้ภาพแนว lifestyle / interior / clinic atmosphere ได้ดี

Mobile
- สัดส่วน: `4:5` หรือ `6:7`
- ขั้นต่ำ: `1200 x 1500`
- แนะนำ: `1600 x 2000+`

### 6. `/blog` และ card บทความ

#### Blog card / article thumbnail

- ใช้รูปเดียว
- สัดส่วนใช้งานจริงใกล้เคียง `3:2`
- ขั้นต่ำ: `1200 x 800`
- แนะนำ: `1500 x 1000+`
- ถ้าเป็น before/after หรือ close-up ควรให้องค์ประกอบหลักอยู่ตรงกลาง

### 7. `/reviews`

#### Review card

- ใช้รูปเดียว
- สัดส่วน: `16:10`
- ขั้นต่ำ: `1200 x 750`
- แนะนำ: `1600 x 1000+`

### 8. รูปประกอบทั่วไป

#### General gallery / content image

- ใช้รูปเดียว
- สัดส่วนที่เหมาะ: `4:3` หรือ `3:2`
- ขั้นต่ำ: `1200 px` ด้านกว้าง
- แนะนำ: `1600 px` ด้านกว้างขึ้นไป

## Logo

- แนะนำให้ใช้ `SVG` ก่อน
- ถ้าเป็น raster ให้ใช้พื้นโปร่งใส
- ความกว้างแนะนำอย่างน้อย `1200 px`

## ข้อห้ามสำคัญ

- อย่าใส่ text สำคัญไว้ชิดขอบภาพ
- อย่าใช้ภาพ hero ไฟล์เดียวกับทุก breakpoint ถ้า artwork มีข้อความในภาพ
- อย่าใช้ไฟล์เล็กกว่าขั้นต่ำ เพราะจะเบลอบนจอใหญ่

## Workflow ที่แนะนำ

1. ถ้าเป็น hero หลัก ให้เตรียม `Desktop` และ `Mobile` แยก
2. ถ้าเป็นรูป card ทั่วไป ใช้รูปเดียวได้
3. เช็กว่า subject อยู่กลางภาพ
4. เช็กว่าไม่มีข้อความสำคัญชิดขอบ
5. อัปโหลดผ่าน Studio ตาม field ที่กำหนดไว้

## ตำแหน่งที่ทีมจะเจอใน Studio

- `People`
  - `Picture`
  - `Hero Image Desktop`
  - `Hero Image Mobile`
  - `Certifications > Certificate Image`

- `Promotions > Promotions Page`
  - `Hero Image`
  - `Hero Image Desktop`
  - `Hero Image Mobile`

- `Promotion Items`
  - `Promotion Image`

- `Aesthetic Treatments Page`
  - `Hero Image`
  - `Hero Image Desktop`
  - `Hero Image Mobile`

- `Service Pages`
  - `Hero Image`
  - `Hero Image Desktop`
  - `Hero Image Mobile`

- `Contact` section ใน page builder
  - `Hero Image`
  - `Hero Image Desktop`
  - `Hero Image Mobile`
