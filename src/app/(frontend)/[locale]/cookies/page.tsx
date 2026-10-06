import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import { getRouteLocale } from '@/lib/routeLocale';

type Props = { params: Promise<{ locale: string }> };

export default async function CookiePolicyPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const isEn = locale === 'en';

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale as 'th' | 'en'),
            { label: getBreadcrumbLabel(locale as 'th' | 'en', 'cookies') },
          ]}
          locale={locale as 'th' | 'en'}
          className="mb-5"
        />
        <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
          {isEn ? 'Cookie Policy' : 'นโยบายคุกกี้'}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {isEn
            ? 'Last updated: February 27, 2026'
            : 'อัปเดตล่าสุด: 27 กุมภาพันธ์ 2026'}
        </p>

        <div className="space-y-8 text-foreground/90">
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '1. What Are Cookies?' : '1. คุกกี้คืออะไร'}
            </h2>
            <p>
              {isEn
                ? 'Cookies are small text files stored on your device when you visit our website. They help improve your browsing experience and site performance.'
                : 'คุกกี้คือไฟล์ข้อความขนาดเล็กที่ถูกบันทึกลงในอุปกรณ์ของท่านเมื่อเข้าใช้งานเว็บไซต์ เพื่อช่วยให้การใช้งานสะดวกขึ้นและเพิ่มประสิทธิภาพของเว็บไซต์'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '2. Types of Cookies We Use' : '2. ประเภทคุกกี้ที่เราใช้'}
            </h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                {isEn
                  ? 'Necessary cookies: Required for core website functionality.'
                  : 'คุกกี้ที่จำเป็น: ใช้เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง'}
              </li>
              <li>
                {isEn
                  ? 'Analytics cookies: Help us understand website usage and improve content.'
                  : 'คุกกี้เพื่อการวิเคราะห์: ช่วยให้เราเข้าใจการใช้งานเว็บไซต์และปรับปรุงเนื้อหา'}
              </li>
              <li>
                {isEn
                  ? 'Preference cookies: Remember language and display preferences.'
                  : 'คุกกี้เพื่อการตั้งค่า: จดจำภาษาและการตั้งค่าการใช้งานของผู้ใช้'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '3. How to Manage Cookies' : '3. การจัดการคุกกี้'}
            </h2>
            <p>
              {isEn
                ? 'You can control or delete cookies from your browser settings. Disabling some cookies may affect website functionality.'
                : 'ท่านสามารถจัดการหรือลบคุกกี้ได้จากการตั้งค่าเบราว์เซอร์ ทั้งนี้การปิดคุกกี้บางประเภทอาจทำให้การทำงานของเว็บไซต์บางส่วนไม่สมบูรณ์'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '4. Third-Party Cookies' : '4. คุกกี้จากบุคคลที่สาม'}
            </h2>
            <p>
              {isEn
                ? 'Some cookies may be set by external services, such as analytics tools or embedded content providers.'
                : 'บางคุกกี้อาจถูกติดตั้งโดยผู้ให้บริการภายนอก เช่น เครื่องมือวิเคราะห์สถิติหรือบริการเนื้อหาที่ฝังในหน้าเว็บไซต์'}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {isEn ? '5. Contact Us' : '5. ติดต่อเรา'}
            </h2>
            <p>
              {isEn
                ? 'If you have questions about our cookie usage, please contact us via the channels listed in the footer.'
                : 'หากท่านมีข้อสงสัยเกี่ยวกับการใช้งานคุกกี้ กรุณาติดต่อเราผ่านช่องทางที่ระบุไว้ในส่วนท้ายเว็บไซต์'}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
