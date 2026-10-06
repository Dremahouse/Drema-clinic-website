import Script from 'next/script';
import { clientEnv } from '@/env/clientEnv';

export default function GoogleTagManagerScripts() {
  const gtmId = clientEnv.NEXT_PUBLIC_GTM_ID;
  const gaMeasurementId = clientEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!gtmId && !gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script id="google-consent-mode-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('consent', 'default', {
            functionality_storage: 'denied',
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>

      {gtmId ? (
        <Script
          id="google-tag-manager"
          src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
          strategy="afterInteractive"
        />
      ) : gaMeasurementId ? (
        <>
          <Script
            id="google-analytics"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { send_page_view: false });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
