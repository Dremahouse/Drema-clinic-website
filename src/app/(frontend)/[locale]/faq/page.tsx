import FaqSection from '@/components/sections/Faq';
import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import { getRouteLocale } from '@/lib/routeLocale';
import { sanityFetch } from '@/lib/sanity/client/live';
import { homePageQuery } from '@/lib/sanity/queries/queries';

type Props = { params: Promise<{ locale: string }> };

export default async function FaqPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const isEn = locale === 'en';

  const { data: homePage } = await sanityFetch({
    query: homePageQuery,
  });

  const faqSection = homePage?.pageSections?.find(
    (section) => section?._type === 'faq'
  );

  if (!faqSection) {
    return (
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <Breadcrumbs
            items={[
              homeBreadcrumb(locale as 'th' | 'en'),
              { label: getBreadcrumbLabel(locale as 'th' | 'en', 'faq') },
            ]}
            locale={locale as 'th' | 'en'}
            className="mb-5"
          />
          <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
            FAQ
          </h1>
          <p className="text-muted-foreground">
            {isEn
              ? 'No FAQ content found yet. Please add an FAQ section on the Home page in Sanity.'
              : '?????????????? FAQ ?????????? FAQ section ?????? Home ?? Sanity'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="container mx-auto max-w-7xl px-6 pt-8 md:px-10">
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale as 'th' | 'en'),
            { label: getBreadcrumbLabel(locale as 'th' | 'en', 'faq') },
          ]}
          locale={locale as 'th' | 'en'}
        />
      </div>
      <FaqSection section={faqSection} />
    </>
  );
}
