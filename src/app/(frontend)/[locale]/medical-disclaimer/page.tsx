import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import { getRouteLocale } from '@/lib/routeLocale';

type Props = { params: Promise<{ locale: string }> };

export default async function MedicalDisclaimerPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const isEn = locale === 'en';

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale as 'th' | 'en'),
            {
              label: getBreadcrumbLabel(
                locale as 'th' | 'en',
                'medicalDisclaimer'
              ),
            },
          ]}
          locale={locale as 'th' | 'en'}
          className="mb-5"
        />
        <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
          {isEn ? 'Medical Disclaimer' : 'ข้อสงวนสิทธิ์ทางการแพทย์'}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {isEn
            ? 'Last updated: February 27, 2026'
            : 'อัปเดตล่าสุด: 27 กุมภาพันธ์ 2026'}
        </p>

        <div className="space-y-8 text-foreground/90">
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '1. Informational Purpose' : '1. วัตถุประสงค์ของข้อมูล'}
            </h2>
            <p>
              {isEn
                ? 'Content on this website is provided for general informational purposes only and does not replace professional medical advice, diagnosis, or treatment.'
                : 'ข้อมูลบนเว็บไซต์นี้จัดทำขึ้นเพื่อวัตถุประสงค์ในการให้ข้อมูลทั่วไปเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์ การวินิจฉัย หรือการรักษาแทนการพบแพทย์'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn
                ? '2. Individual Results May Vary'
                : '2. ผลลัพธ์อาจแตกต่างกันในแต่ละบุคคล'}
            </h2>
            <p>
              {isEn
                ? 'Treatment outcomes depend on individual factors such as skin condition, health status, and adherence to aftercare instructions.'
                : 'ผลลัพธ์ของการรักษาขึ้นอยู่กับปัจจัยเฉพาะบุคคล เช่น สภาพผิว ภาวะสุขภาพ และการปฏิบัติตามคำแนะนำหลังทำหัตถการ'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn
                ? '3. Consultation Requirement'
                : '3. การประเมินโดยแพทย์ก่อนรักษา'}
            </h2>
            <p>
              {isEn
                ? 'All procedures should be assessed by qualified medical professionals before treatment. Suitability is determined case by case.'
                : 'ทุกหัตถการควรได้รับการประเมินโดยแพทย์ผู้มีคุณสมบัติเหมาะสมก่อนเข้ารับบริการ ความเหมาะสมจะพิจารณาเป็นรายกรณี'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '4. Emergency Cases' : '4. กรณีฉุกเฉินทางการแพทย์'}
            </h2>
            <p>
              {isEn
                ? 'If you are experiencing a medical emergency, please contact emergency services or visit the nearest hospital immediately.'
                : 'หากท่านมีอาการฉุกเฉินทางการแพทย์ โปรดติดต่อหน่วยฉุกเฉินหรือไปโรงพยาบาลที่ใกล้ที่สุดทันที'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '5. Contact Us' : '5. ติดต่อเรา'}
            </h2>
            <p>
              {isEn
                ? 'For medical questions related to our services, please contact our clinic through the official channels listed in the footer.'
                : 'หากมีข้อสงสัยเกี่ยวกับบริการทางการแพทย์ของเรา กรุณาติดต่อคลินิกผ่านช่องทางทางการที่ระบุไว้ในส่วนท้ายเว็บไซต์'}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
