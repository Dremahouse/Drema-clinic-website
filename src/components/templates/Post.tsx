import Link from 'next/link';
import type { PortableTextBlock } from 'next-sanity';
import Byline from '@/components/modules/Byline';
import CoverImage from '@/components/modules/CoverImage';
import CustomPortableText from '@/components/modules/PortableText';
import ReferencesSection from '@/components/modules/ReferencesSection';
import {
  Breadcrumbs,
  getBreadcrumbLabel,
  homeBreadcrumb,
} from '@/components/shared/Breadcrumbs';
import { getLocalizedDocumentLink } from '@/lib/links';
import { buildLocalizedPath } from '@/lib/locale';
import { urlForImage } from '@/lib/sanity/client/utils';
import type { PostFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

type ImageLike = {
  alt?: string | null;
  asset?: { _id?: string | null; _ref?: string | null } | null;
} | null;

type Reference = {
  _key?: string;
  titleTh?: string | null;
  titleEn?: string | null;
  authors?: string | null;
  source?: string | null;
  year?: string | null;
  url?: string | null;
  doi?: string | null;
  pmid?: string | null;
  volume?: string | null;
  issue?: string | null;
  pages?: string | null;
};

type Props = {
  post: PostFragmentType;
  locale: 'th' | 'en';
  blogHeroBackgroundImage?: ImageLike;
  siblingNav?: {
    previous?: any | null;
    next?: any | null;
  };
};

const Post = ({ post, locale, blogHeroBackgroundImage, siblingNav }: Props) => {
  const isEn = locale === 'en';
  const typedPost = post as any;
  const postSlug =
    typeof typedPost?.slug === 'string'
      ? typedPost.slug
      : (typedPost?.slug?.current ?? '');

  const localizedTitle = isEn ? typedPost.titleEn || post.title : post.title;
  const localizedSummary = isEn
    ? typedPost.excerptEn || post.excerpt
    : post.excerpt;
  const thContent = Array.isArray(post.content)
    ? (post.content as PortableTextBlock[])
    : [];
  const enContent = Array.isArray(typedPost.contentEn)
    ? (typedPost.contentEn as PortableTextBlock[])
    : [];
  const localizedContent = isEn
    ? enContent.length
      ? enContent
      : thContent
    : thContent.length
      ? thContent
      : enContent;
  const localizedQuote = isEn
    ? typedPost.highlightQuoteEn || typedPost.highlightQuote
    : typedPost.highlightQuote;
  const localizedQuickFacts = (
    isEn
      ? typedPost.quickFactsEn || typedPost.quickFacts
      : typedPost.quickFacts || typedPost.quickFactsEn
  )?.filter?.((item: unknown) => typeof item === 'string' && item.trim()) as
    | string[]
    | undefined;
  const localizedSourceReferences = isEn
    ? typedPost.sourceReferencesEn
    : typedPost.sourceReferences;

  const localizedFaqs = (typedPost.faqItems || [])
    .map((item: any) => {
      const question = isEn ? item.questionEn : item.questionTh;
      const shortAnswer = isEn ? item.shortAnswerEn : item.shortAnswerTh;
      const detail = isEn ? item.detailEn : item.detailTh;
      if (!question || !shortAnswer) return null;
      return {
        key: item._key || `${question}-${shortAnswer}`,
        question,
        shortAnswer,
        detail,
      };
    })
    .filter(Boolean) as Array<{
    key: string;
    question: string;
    shortAnswer: string;
    detail?: string;
  }>;

  const safeLocalizedContent = Array.isArray(localizedContent)
    ? localizedContent
    : [];
  const renderedContent = safeLocalizedContent;

  const extractBlockText = (block: any) =>
    Array.isArray(block?.children)
      ? block.children
          .map((child: any) => child?.text || '')
          .join(' ')
          .trim()
      : '';

  const tableMarkerAliases = [
    '[[RESTYLANE_TABLE]]',
    '[[RESTYLANE_TABLE]]',
    '[RESTYLANE_TABLE]',
  ];
  const normalizeMarker = (value: string) =>
    value
      .replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '')
      .replace(/\s+/g, '')
      .trim()
      .toLowerCase();
  const normalizedMarkerAliases = tableMarkerAliases.map(normalizeMarker);
  const restylaneTableIndex =
    postSlug === 'restylane-filler'
      ? renderedContent.findIndex((block: any) =>
          normalizedMarkerAliases.includes(
            normalizeMarker(extractBlockText(block))
          )
        )
      : -1;

  const contentBeforeTable =
    restylaneTableIndex >= 0
      ? renderedContent.slice(0, restylaneTableIndex)
      : renderedContent;
  const contentAfterTable =
    restylaneTableIndex >= 0
      ? renderedContent.slice(restylaneTableIndex + 1)
      : [];

  const fallbackRestylaneRows = [
    {
      model: 'Restylane Perlane Lyft',
      textureTh: 'เนื้อแข็ง ไม่ฟู คงตัวสูง (มียาชา)',
      textureEn: 'Firm, low-fluff, high structural support (with lidocaine)',
      areasTh: 'ใต้ตา จมูก คาง แก้มส้ม',
      areasEn: 'Under-eye, nose, chin, anterior cheek',
      durationTh: '12 เดือน',
      durationEn: '12 months',
    },
    {
      model: 'Restylane Defyne',
      textureTh: 'เนื้อนิ่มปานกลาง ยืดหยุ่นสูง (มียาชา)',
      textureEn: 'Medium-soft, highly flexible gel (with lidocaine)',
      areasTh: 'ขมับ หน้าแก้ม คาง ริมฝีปาก',
      areasEn: 'Temple, cheek, chin, lips',
      durationTh: '18 เดือน',
      durationEn: '18 months',
    },
    {
      model: 'Restylane Vital Light',
      textureTh: 'อนุภาคเล็ก เนื้อละเอียด นิ่ม (มียาชา)',
      textureEn: 'Small-particle, fine and soft gel (with lidocaine)',
      areasTh: 'ร่องใต้ตา ริมฝีปาก ผิวชั้นตื้น/งานผิว',
      areasEn: 'Tear trough, lips, superficial skin-hydration work',
      durationTh: '6-12 เดือน',
      durationEn: '6-12 months',
    },
    {
      model: 'Restylane Volyme',
      textureTh: 'เนื้อนิ่ม มีความฟู (มียาชา)',
      textureEn: 'Soft, volumizing gel (with lidocaine)',
      areasTh: 'ร่องแก้ม ร่องน้ำหมาก ริ้วรอยเล็ก',
      areasEn: 'Nasolabial folds, marionette area, fine volume deficits',
      durationTh: '18 เดือน',
      durationEn: '18 months',
    },
    {
      model: 'Restylane Refyne',
      textureTh: 'โมเลกุลเล็ก ยืดหยุ่นดี (มียาชา)',
      textureEn: 'Small-molecule, dynamic-flex gel (with lidocaine)',
      areasTh: 'ร่องแก้ม ร่องน้ำหมาก มุมปาก',
      areasEn: 'Nasolabial folds, marionette lines, oral commissure',
      durationTh: '8-12 เดือน',
      durationEn: '8-12 months',
    },
    {
      model: 'Restylane Classic',
      textureTh: 'อนุภาคใหญ่ เนื้อค่อนข้างแข็ง (มียาชา)',
      textureEn: 'Larger-particle, relatively firm gel (with lidocaine)',
      areasTh: 'ร่องแก้ม รอยขมวดคิ้ว ใต้ตา ปาก',
      areasEn: 'Moderate-to-deep lines: folds, frown lines, under-eye, lips',
      durationTh: '8-12 เดือน',
      durationEn: '8-12 months',
    },
    {
      model: 'Restylane Vital',
      textureTh: 'เนื้อละเอียด เกลี่ยง่าย เน้นเพิ่มความชุ่มชื้น',
      textureEn: 'Fine, spreadable skinbooster-style hydration gel',
      areasTh: 'หน้าผาก/งานเติมความชุ่มชื้นผิว',
      areasEn: 'Forehead and hydration-focused skin quality work',
      durationTh: '12 เดือน',
      durationEn: '12 months',
    },
    {
      model: 'Restylane Kysse',
      textureTh: 'เนื้อละเอียด คงตัวสูง เหมาะงานปาก',
      textureEn: 'Fine yet stable lip-focused gel',
      areasTh: 'ริมฝีปาก ปรับทรงปาก เพิ่มความชุ่มชื้น',
      areasEn: 'Lips for shape refinement and hydration',
      durationTh: '12 เดือน',
      durationEn: '12 months',
    },
  ] as const;

  const studioRestylaneRows = Array.isArray(typedPost?.restylaneTableRows)
    ? typedPost.restylaneTableRows
        .map((row: any) => ({
          model: row?.model || '',
          textureTh: row?.profileTh || '',
          textureEn: row?.profileEn || '',
          areasTh: row?.areasTh || '',
          areasEn: row?.areasEn || '',
          durationTh: row?.durationTh || '',
          durationEn: row?.durationEn || '',
        }))
        .filter(
          (row: any) =>
            row.model &&
            row.textureTh &&
            row.textureEn &&
            row.areasTh &&
            row.areasEn &&
            row.durationTh &&
            row.durationEn
        )
    : [];

  const restylaneRows =
    studioRestylaneRows.length > 0
      ? studioRestylaneRows
      : fallbackRestylaneRows;

  const previousPost = siblingNav?.previous || null;
  const nextPost = siblingNav?.next || null;
  const previousTitle = previousPost
    ? isEn
      ? previousPost.titleEn || previousPost.title
      : previousPost.title
    : null;
  const nextTitle = nextPost
    ? isEn
      ? nextPost.titleEn || nextPost.title
      : nextPost.title
    : null;
  const heroBackgroundUrl =
    blogHeroBackgroundImage?.asset?._id || blogHeroBackgroundImage?.asset?._ref
      ? (urlForImage(blogHeroBackgroundImage)
          ?.width(2400)
          .height(1200)
          // biome-ignore lint/suspicious/noFocusedTests: Sanity image URL builder uses fit() for crop mode.
          .fit('crop')
          .auto('format')
          .url() as string)
      : null;

  return (
    <div className="container relative isolate mx-auto max-w-7xl px-4 pb-14 pt-6 md:pb-20 md:pt-10">
      {heroBackgroundUrl ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 z-0 h-[42rem] w-screen -translate-x-1/2 overflow-hidden md:h-[48rem] lg:h-[46rem]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url(${heroBackgroundUrl})`,
              maskImage:
                'linear-gradient(180deg,#000 0%,#000 66%,rgba(0,0,0,0.35) 84%,transparent 96%)',
              WebkitMaskImage:
                'linear-gradient(180deg,#000 0%,#000 66%,rgba(0,0,0,0.35) 84%,transparent 96%)',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,241,0.08)_0%,rgba(250,247,241,0.18)_66%,rgba(250,247,241,0.48)_84%,rgba(250,247,241,0)_100%)]" />
        </div>
      ) : null}

      <div className="relative z-10">
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale),
            { label: getBreadcrumbLabel(locale, 'blog'), href: '/blog' },
            { label: localizedTitle },
          ]}
          locale={locale}
          className="mb-5"
        />
        <section className="mx-auto mb-8 max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--marketing-border)] bg-[image:var(--marketing-gradient-soft)] shadow-[var(--marketing-card-shadow)] md:mb-12">
          <div
            className={`grid gap-8 p-6 md:gap-10 md:p-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center ${
              post.image?.asset?._ref ? '' : 'max-w-4xl'
            }`}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-xs tracking-[0.22em] text-[#9a805f] uppercase">
                  {isEn ? 'Knowledge Article' : 'บทความความรู้'}
                </p>
                <h1 className="font-serif text-3xl leading-[1.1] text-[#3f3124] md:text-5xl">
                  {localizedTitle}
                </h1>
                {post.author ? (
                  <div className="rounded-[1.5rem] border border-[#dfd3bf] bg-[rgba(255,255,255,0.72)] px-5 py-4 backdrop-blur-sm">
                    <Byline post={post} locale={isEn ? 'en' : 'th'} centered />
                  </div>
                ) : null}
                {localizedQuote ? (
                  <div className="max-w-2xl rounded-[1.5rem] border border-[#e0d1bb] bg-[rgba(255,255,255,0.58)] px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-10 w-px shrink-0 bg-[#b7966c]" />
                      <div className="space-y-2">
                        <p className="text-[11px] tracking-[0.22em] text-[#9a805f] uppercase">
                          {isEn ? 'Key Takeaway' : 'ประเด็นสำคัญ'}
                        </p>
                        <p className="text-sm leading-relaxed text-[#4f3f2f] md:text-base">
                          {localizedQuote}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
                {post.image?.asset?._ref ? (
                  <div className="md:hidden">
                    <CoverImage
                      image={post.image}
                      priority
                      aspectRatio="4 / 5"
                      sizes="100vw"
                      className="overflow-hidden rounded-[1.5rem] border border-[#e4d8c5] bg-[var(--marketing-surface-1)]"
                      imageClassName="object-cover object-center"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {post.image?.asset?._ref ? (
              <div className="mx-auto hidden w-full max-w-[30rem] md:block lg:ml-auto lg:max-w-none">
                <CoverImage
                  image={post.image}
                  priority
                  aspectRatio="4 / 5"
                  sizes="(min-width: 1024px) 34rem, (min-width: 768px) 42vw, 100vw"
                  className="overflow-hidden rounded-[1.75rem] border border-[#e4d8c5] bg-[var(--marketing-surface-1)]"
                  imageClassName="object-cover object-center"
                />
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article data-reveal-ignore="true">
          <CustomPortableText
            className="article-content"
            value={contentBeforeTable}
          />

          {restylaneTableIndex >= 0 ? (
            <section className="mb-10 rounded-2xl border border-[#deceb7] bg-[#f9f2e7] p-4 md:p-6">
              <h3 className="mb-4 font-serif text-2xl text-[#4a3a2b] md:text-3xl">
                {isEn
                  ? 'Restylane Models (Thailand): Easy Comparison Table'
                  : 'ตารางสรุป Restylane ทั้ง 8 รุ่น'}
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#dccab1] bg-white/70">
                <table className="min-w-[920px] w-full text-left text-sm">
                  <thead className="bg-[#efe3d2] text-[#4a3a2b]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Model</th>
                      <th className="px-4 py-3 font-semibold">
                        {isEn ? 'Texture / Profile' : 'ลักษณะเนื้อ / จุดเด่น'}
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        {isEn ? 'Recommended Areas' : 'บริเวณที่เหมาะ'}
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        {isEn ? 'Duration' : 'ระยะเวลาผลลัพธ์'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6d9c6] text-[#564635]">
                    {restylaneRows.map((row) => (
                      <tr key={row.model} className="align-top">
                        <td className="px-4 py-3 font-medium">{row.model}</td>
                        <td className="px-4 py-3">
                          {isEn ? row.textureEn : row.textureTh}
                        </td>
                        <td className="px-4 py-3">
                          {isEn ? row.areasEn : row.areasTh}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isEn ? row.durationEn : row.durationTh}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-[#7c6851]">
                {isEn
                  ? 'Note: Final model selection should be physician-assessed case by case.'
                  : 'หมายเหตุ: การเลือกรุ่นสุดท้ายควรประเมินโดยแพทย์เป็นรายบุคคล'}
              </p>
            </section>
          ) : null}

          {contentAfterTable.length ? (
            <CustomPortableText
              className="article-content"
              value={contentAfterTable}
            />
          ) : null}
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {localizedQuickFacts?.length ? (
            <div className="rounded-2xl border border-[#dfd3bf] bg-[#f9f3e9] p-5">
              <p className="text-xs tracking-[0.2em] text-[#9a805f] uppercase">
                {isEn ? 'Quick Facts' : 'ข้อควรรู้โดยย่อ'}
              </p>
              <ul className="mt-3 space-y-3">
                {localizedQuickFacts.map((fact, index) => (
                  <li
                    key={`${fact}-${index}`}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#5f5244]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b7966c]" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-2xl border border-[#dfd3bf] bg-[#f9f3e9] p-5">
            <p className="text-xs tracking-[0.2em] text-[#9a805f] uppercase">
              {isEn ? 'Summary' : 'ข้อมูลโดยสรุป'}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5f5244]">
              {localizedSummary ||
                (isEn
                  ? 'Add a concise Studio summary so the article can be cited more clearly in search and answer surfaces.'
                  : 'เพิ่มสรุปใน Studio เพื่อให้ AI Search ดึงใจความสำคัญไปอ้างอิงได้ชัดเจน')}
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8c8af] bg-[var(--primary)] p-5 text-[var(--primary-foreground)]">
            <p className="text-lg font-semibold">
              {isEn
                ? 'Need a personalized consultation?'
                : 'ต้องการคำปรึกษาแบบเฉพาะบุคคล?'}
            </p>
            <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--primary-foreground)_86%,transparent)]">
              {isEn
                ? 'Speak with our team to assess suitable treatment options.'
                : 'ปรึกษาทีมแพทย์เพื่อประเมินแนวทางการรักษาที่เหมาะกับคุณ'}
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                href={buildLocalizedPath(locale, '/contact')}
                className="inline-flex rounded-full border border-white/55 bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
              >
                {isEn ? 'Contact Drema Clinic' : 'ติดต่อ Drema Clinic'}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {localizedFaqs.length ? (
        <section className="mx-auto mt-14 max-w-5xl">
          <div className="mb-8 border-t border-[#dcccb6] pt-6">
            <h2 className="font-serif text-4xl text-[#3f3124] md:text-5xl">
              FAQ
            </h2>
          </div>
          <div className="space-y-1">
            {localizedFaqs.map((item) => (
              <article
                key={item.key}
                className="border-b border-[#e2d5c2] py-7 last:border-b-0"
              >
                <h3 className="font-serif text-2xl leading-tight text-[#4a3a2b] md:text-3xl">
                  {item.question}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#5f5041] md:text-lg">
                  {item.shortAnswer}
                </p>
                {item.detail ? (
                  <p className="mt-3 text-base leading-relaxed text-[#5f5041] md:text-lg">
                    {item.detail}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <ReferencesSection
        legacy={localizedSourceReferences}
        references={(typedPost.references || []) as Reference[]}
        locale={locale}
      />

      {post.categories?.length ? (
        <div className="mx-auto mt-10 max-w-6xl border-t border-[#e3d8c6] pt-6">
          <div className="flex flex-wrap gap-2">
            {post.categories.filter(Boolean).map((category) => (
              <span
                key={category._id}
                className="rounded-full border border-[#d7c6ad] bg-[#f6efe4] px-3 py-1 text-sm text-[#6a5a49]"
              >
                {category.title}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {previousPost || nextPost ? (
        <section className="mx-auto mt-10 max-w-6xl border-t border-[#dcccb6] pt-6 md:pt-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <div className="min-h-[72px] md:border-r md:border-[#e1d3bf] md:pr-8">
              {previousPost?.slug ? (
                <Link
                  href={getLocalizedDocumentLink(
                    { _type: 'post', slug: previousPost.slug },
                    locale
                  )}
                  className="block group"
                >
                  <p className="text-sm font-semibold tracking-[0.12em] text-[#6b543d] uppercase">
                    {isEn ? '← Previous' : '← บทความก่อนหน้า'}
                  </p>
                  <p className="mt-2 truncate text-lg text-[#3f3124] transition-colors group-hover:text-[#8b6b4a]">
                    {previousTitle}
                  </p>
                </Link>
              ) : null}
            </div>

            <div className="min-h-[72px] md:pl-8">
              {nextPost?.slug ? (
                <Link
                  href={getLocalizedDocumentLink(
                    { _type: 'post', slug: nextPost.slug },
                    locale
                  )}
                  className="block text-left md:text-right group"
                >
                  <p className="text-sm font-semibold tracking-[0.12em] text-[#6b543d] uppercase">
                    {isEn ? 'Next →' : 'บทความถัดไป →'}
                  </p>
                  <p className="mt-2 truncate text-lg text-[#3f3124] transition-colors group-hover:text-[#8b6b4a]">
                    {nextTitle}
                  </p>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Post;
