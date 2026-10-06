import { redirect } from 'next/navigation';
import { getAuthorPaginationRedirectPath } from '@/lib/paginationRedirects';
import { getRouteLocale } from '@/lib/routeLocale';

type Props = {
  params: Promise<{ locale: string; personSlug: string; page: string }>;
};

export async function generateMetadata() {
  return {};
}

export async function generateStaticParams() {
  return [];
}

export default async function AuthorPaginationRedirect(props: Props) {
  const { personSlug } = await props.params;
  const locale = await getRouteLocale(props.params);

  redirect(getAuthorPaginationRedirectPath(locale, personSlug));
}
