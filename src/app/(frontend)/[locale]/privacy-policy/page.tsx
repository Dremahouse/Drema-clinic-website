import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import { getRouteLocale } from '@/lib/routeLocale';

type Props = { params: Promise<{ locale: string }> };

export default async function PrivacyPolicyPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const isEn = locale === 'en';

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale as 'th' | 'en'),
            {
              label: getBreadcrumbLabel(locale as 'th' | 'en', 'privacyPolicy'),
            },
          ]}
          locale={locale as 'th' | 'en'}
          className="mb-5"
        />
        <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
          {isEn ? 'Privacy Policy' : 'นโยบายความเป็นส่วนตัว'}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {isEn
            ? `Last updated: February 27, 2026`
            : `อัปเดตล่าสุด: 27 กุมภาพันธ์ 2026`}
        </p>

        <div className="space-y-8 text-foreground/90">
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '1. Information We Collect' : '1. ข้อมูลที่เราเก็บรวบรวม'}
            </h2>
            <p>
              {isEn
                ? 'We may collect contact details, appointment information, and website usage data to provide and improve our services.'
                : 'เราอาจเก็บข้อมูลติดต่อ ข้อมูลการนัดหมาย และข้อมูลการใช้งานเว็บไซต์ เพื่อให้บริการและพัฒนาคุณภาพการให้บริการ'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '2. How We Use Information' : '2. วัตถุประสงค์การใช้ข้อมูล'}
            </h2>
            <p>
              {isEn
                ? 'Your information is used for appointment management, customer support, communication, and service quality improvement.'
                : 'ข้อมูลของท่านจะถูกใช้เพื่อการจัดการนัดหมาย การให้บริการลูกค้า การสื่อสาร และการพัฒนาคุณภาพการรักษา'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '3. Data Sharing' : '3. การเปิดเผยข้อมูล'}
            </h2>
            <p>
              {isEn
                ? 'We do not sell personal data. Information may be shared only with necessary service providers or when required by law.'
                : 'เราไม่มีการขายข้อมูลส่วนบุคคล ข้อมูลจะถูกเปิดเผยเฉพาะเท่าที่จำเป็นต่อการให้บริการ หรือเมื่อกฎหมายกำหนด'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '4. Data Security' : '4. ความปลอดภัยของข้อมูล'}
            </h2>
            <p>
              {isEn
                ? 'We implement reasonable security measures to protect personal data from unauthorized access, loss, or misuse.'
                : 'เรามีมาตรการรักษาความปลอดภัยที่เหมาะสม เพื่อป้องกันการเข้าถึง สูญหาย หรือใช้ข้อมูลโดยไม่ได้รับอนุญาต'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '5. Your Rights' : '5. สิทธิของเจ้าของข้อมูล'}
            </h2>
            <p>
              {isEn
                ? 'You may request access, correction, or deletion of your personal data in accordance with applicable law.'
                : 'ท่านสามารถขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่านได้ ตามสิทธิที่กฎหมายกำหนด'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '6. Contact Us' : '6. ติดต่อเรา'}
            </h2>
            <p>
              {isEn
                ? 'If you have questions about this policy, please contact us via phone or LINE as listed in the footer.'
                : 'หากมีข้อสงสัยเกี่ยวกับนโยบายนี้ กรุณาติดต่อเราทางโทรศัพท์หรือ LINE ตามข้อมูลในส่วนท้ายเว็บไซต์'}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
