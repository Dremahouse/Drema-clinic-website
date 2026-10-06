import { redirect } from 'next/navigation';
import { resolveCategorySlugAlias } from '@/lib/categorySlugAliases';
import { getCategoryPaginationRedirectPath } from '@/lib/paginationRedirects';
import { getRouteLocale } from '@/lib/routeLocale';

type Props = {
  params: Promise<{ locale: string; categorySlug: string; page: string }>;
};

export default async function CategoryPaginationRedirectPage(props: Props) {
  const { categorySlug } = await props.params;
  const locale = await getRouteLocale(props.params);
  const alias = resolveCategorySlugAlias(categorySlug);
  redirect(getCategoryPaginationRedirectPath(locale, alias || categorySlug));
}
