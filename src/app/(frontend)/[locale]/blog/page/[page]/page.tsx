import { redirect } from 'next/navigation';
import { getBlogPaginationRedirectPath } from '@/lib/paginationRedirects';
import { getRouteLocale } from '@/lib/routeLocale';

type Props = {
  params: Promise<{ locale: string; page: string }>;
};

export default async function BlogPaginationPage(props: Props) {
  redirect(getBlogPaginationRedirectPath(await getRouteLocale(props.params)));
}
