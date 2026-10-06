import type { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import Main from '@/components/layout/Main';

export default function FrontendTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
