import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import { getRouteLocale } from '@/lib/routeLocale';

type Props = { params: Promise<{ locale: string }> };

export default async function TermsPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const isEn = locale === 'en';

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale as 'th' | 'en'),
            { label: getBreadcrumbLabel(locale as 'th' | 'en', 'terms') },
          ]}
          locale={locale as 'th' | 'en'}
          className="mb-5"
        />
        <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
          {isEn ? 'Terms of Service' : 'เงื่อนไขการใช้บริการ'}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {isEn
            ? 'Last updated: February 27, 2026'
            : 'อัปเดตล่าสุด: 27 กุมภาพันธ์ 2026'}
        </p>

        <div className="space-y-8 text-foreground/90">
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '1. Scope of Service' : '1. ขอบเขตการให้บริการ'}
            </h2>
            <p>
              {isEn
                ? 'Drema Clinic provides aesthetic and laser-related medical services under the supervision of licensed medical professionals.'
                : 'Drema Clinic ให้บริการด้านความงามและเลเซอร์ภายใต้การดูแลของผู้ประกอบวิชาชีพทางการแพทย์ที่ได้รับอนุญาต'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn
                ? '2. Appointments and Cancellations'
                : '2. การนัดหมายและการยกเลิก'}
            </h2>
            <p>
              {isEn
                ? 'Clients are encouraged to book in advance. Changes or cancellations should be made as early as possible to ensure slot availability.'
                : 'แนะนำให้นัดหมายล่วงหน้า และหากต้องการเปลี่ยนหรือยกเลิก กรุณาแจ้งล่วงหน้าโดยเร็วที่สุดเพื่อความสะดวกในการจัดคิว'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '3. Medical Assessment' : '3. การประเมินทางการแพทย์'}
            </h2>
            <p>
              {isEn
                ? 'Treatment suitability depends on individual medical assessment. Results may vary by skin condition, health status, and aftercare compliance.'
                : 'ความเหมาะสมของหัตถการขึ้นอยู่กับการประเมินรายบุคคล และผลลัพธ์อาจแตกต่างกันตามสภาพผิว สุขภาพ และการดูแลหลังทำ'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '4. Pricing and Payments' : '4. ราคาและการชำระเงิน'}
            </h2>
            <p>
              {isEn
                ? 'Service fees are subject to current clinic pricing and may change without prior notice. Promotional conditions follow each campaign terms.'
                : 'ค่าบริการเป็นไปตามราคาปัจจุบันของคลินิก และอาจมีการปรับเปลี่ยนโดยไม่ต้องแจ้งล่วงหน้า เงื่อนไขโปรโมชันเป็นไปตามแต่ละแคมเปญ'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '5. User Conduct' : '5. การใช้งานเว็บไซต์'}
            </h2>
            <p>
              {isEn
                ? 'Users agree not to misuse the website, submit false information, or perform actions that may disrupt clinic systems or services.'
                : 'ผู้ใช้งานตกลงที่จะไม่ใช้เว็บไซต์ในทางที่ผิด ไม่ให้ข้อมูลเท็จ และไม่กระทำการที่อาจรบกวนระบบหรือการให้บริการของคลินิก'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '6. Contact' : '6. ช่องทางติดต่อ'}
            </h2>
            <p>
              {isEn
                ? 'For questions about these terms, please contact us through the phone numbers or LINE account listed in the footer.'
                : 'หากมีข้อสงสัยเกี่ยวกับเงื่อนไขการใช้บริการ กรุณาติดต่อผ่านหมายเลขโทรศัพท์หรือ LINE ที่ระบุไว้ในส่วนท้ายเว็บไซต์'}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
